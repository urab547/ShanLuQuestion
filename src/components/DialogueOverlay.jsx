import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { addKeyLine, recordTalkedTo } from '../data/dialogueHistory';
import { streamChat, buildMessages, isAiConfigured } from '../ai/apiClient';
import { getNpcPrompt } from '../ai/npcPrompts';
import { audioManager, SOUNDS } from '../utils/audioManager';
import './DialogueOverlay.css';

/** 从 dialogueId 中提取 NPC ID（如 dlg_danzeng_listener → 'danzeng'） */
const KNOWN_NPCS = ['danzeng', 'zhuoma', 'gesang', 'baima', 'renqing'];

function deriveNpcId(dialogueId) {
  if (!dialogueId) return null;
  const parts = dialogueId.split('_');
  if (parts[0] === 'dlg' && parts.length >= 2) {
    const candidate = parts[1];
    if (KNOWN_NPCS.includes(candidate)) return candidate;
  }
  return null;
}

/** 从 dialogueId 中提取信任阶段（如 dlg_danzeng_listener → 'listener'） */
const TRUST_STAGES = ['stranger', 'listener', 'acknowledged', 'confidant'];

function deriveStage(dialogueId) {
  if (!dialogueId) return '对话';
  const parts = dialogueId.split('_');
  // 尝试最后一个词块
  if (parts.length >= 3) {
    const candidate = parts[parts.length - 1];
    if (TRUST_STAGES.includes(candidate)) return candidate;
  }
  // 尝试第三个词块（兼容 dlg_xxx_stage → 索引2）
  if (parts.length >= 3 && TRUST_STAGES.includes(parts[2])) {
    return parts[2];
  }
  return '对话';
}

/** 从 line 获取纯文本（兼容字符串/对象） */
function getLineText(line) {
  if (typeof line === 'string') return line;
  return line?.text ?? '';
}

/** 判断是否为关键台词 */
function isKeyLine(line) {
  return typeof line === 'object' && line !== null && line.isKeyLine === true;
}

/**
 * DialogueOverlay —— 对话弹出层
 *
 * - 底部滑入，不遮挡场景上半
 * - 逐行显示文字，点击推进
 * - 最后一行点击关闭
 * - 支持 ESC / 点击遮罩关闭
 * - 自动记录关键台词至对话历史
 * - 支持 AI 自由对话模式（随时切换，退出后恢复固定对话进度）
 */
export default function DialogueOverlay({ dialogue, itemLabel, isNpc, startInAi, npcIdOverride, onClose, onKeyLineAdded, onAdvanceDialogue }) {
  const [lineIndex, setLineIndex] = useState(0);
  const lines = dialogue?.lines ?? [];
  const isLast = lineIndex >= lines.length - 1;

  // AI 模式状态
  const [mode, setMode] = useState('fixed'); // 'fixed' | 'ai'
  const [aiMessages, setAiMessages] = useState([]); // {role, content}
  const [aiInput, setAiInput] = useState('');
  const [aiStreaming, setAiStreaming] = useState(false);
  const [aiError, setAiError] = useState(null);
  const abortRef = useRef(null);
  const aiBodyRef = useRef(null);
  const prevNpcIdRef = useRef(null);

  const npcId = useMemo(() => {
    if (npcIdOverride) return npcIdOverride;
    return isNpc ? deriveNpcId(dialogue?.id) : null;
  }, [dialogue?.id, isNpc, npcIdOverride]);
  const systemPrompt = useMemo(() => (npcId ? getNpcPrompt(npcId) : ''), [npcId]);
  const aiAvailable = isNpc && npcId && isAiConfigured() && systemPrompt;

  // ─── 隐性引导：对话框首次使用提示 ───
  const isFirstDialogue = useMemo(() => {
    try { return localStorage.getItem('shanglu_has_opened_dialogue') !== '1'; }
    catch { return true; }
  }, []);
  // 首次打开即标记，确保只显示一次
  useEffect(() => {
    if (isFirstDialogue) {
      try { localStorage.setItem('shanglu_has_opened_dialogue', '1'); }
      catch { /* ignore */ }
    }
  }, [isFirstDialogue]);

  // 切换对话时重置行号和 UI 状态；NPC 换人才清空 AI 对话历史
  useEffect(() => {
    setLineIndex(0);
    setMode('fixed');
    setAiInput('');
    setAiError(null);
    if (npcId !== prevNpcIdRef.current) {
      setAiMessages([]);
      prevNpcIdRef.current = npcId;
    }
  }, [dialogue?.id, npcId]);

  // startInAi：直接进入自由对话模式
  useEffect(() => {
    if (!startInAi) return;
    setMode('ai');
    // 初始 NPC 引导语：各 NPC 统一用"你想问什么？"风格，但仁青更主动
    const greeting = npcId === 'renqing'
      ? '你想问什么？尽管问——我对这幅唐卡的事知道不少。不过我也有些问题想问你。'
      : '……你想问什么？';
    setAiMessages([{ role: 'assistant', content: greeting }]);
  }, [startInAi, npcId]);

  // 对话打开时：记录与 NPC 交谈过
  useEffect(() => {
    if (npcId) recordTalkedTo(npcId);
  }, [dialogue?.id]);

  // 对话打开时播放音效
  useEffect(() => {
    audioManager.playSfx(SOUNDS.SFX.DIALOGUE_OPEN);
    return () => {
      // 对话关闭时播放音效
      audioManager.playSfx(SOUNDS.SFX.DIALOGUE_CLOSE);
    };
  }, []);

  // 每展示一行：若为关键台词，自动追加至对话历史
  useEffect(() => {
    const line = lines[lineIndex];
    if (!isKeyLine(line)) return;
    const stage = deriveStage(dialogue?.id);
    addKeyLine(npcId, getLineText(line), stage);
    if (onKeyLineAdded) onKeyLineAdded();
  }, [lineIndex, lines, dialogue?.id]);

  const handleAdvance = useCallback(() => {
    if (mode !== 'fixed') return; // AI 模式下点击不推进
    if (isLast) {
      // 有玩家选项时，不因点击而关闭——等玩家选选项
      if (dialogue?.playerOptions) return;
      onClose();
    } else {
      setLineIndex((i) => i + 1);
    }
  }, [isLast, onClose, mode, dialogue?.playerOptions]);

  // 玩家选择选项：有 nextDialogueId 则链式推进，否则关闭
  const handleSelectOption = useCallback(() => {
    if (dialogue?.nextDialogueId && onAdvanceDialogue) {
      onAdvanceDialogue(dialogue.nextDialogueId);
    } else {
      onClose();
    }
  }, [dialogue?.nextDialogueId, onAdvanceDialogue, onClose]);

  // ESC 关闭
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        // 先中止 AI 请求
        if (abortRef.current) abortRef.current.abort();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // 组件卸载时中止 AI 请求
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // AI 消息列表变化时自动滚动到底部
  useEffect(() => {
    if (aiBodyRef.current) {
      aiBodyRef.current.scrollTop = aiBodyRef.current.scrollHeight;
    }
  }, [aiMessages]);

  // ─── AI 对话发送 ───
  const handleSendAi = useCallback(async () => {
    const text = aiInput.trim();
    if (!text || aiStreaming || !aiAvailable) return;

    setAiInput('');
    setAiError(null);
    setAiStreaming(true);

    // 构建消息历史（包含本轮用户输入）
    const userMsg = { role: 'user', content: text };
    const newMessages = [...aiMessages, userMsg];
    setAiMessages(newMessages);

    // 添加一个空的 assistant 消息，流式填充
    setAiMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const ac = new AbortController();
    abortRef.current = ac;

    const messages = buildMessages(systemPrompt, newMessages);

    try {
      await streamChat(
        { messages, signal: ac.signal },
        {
          onToken: (token) => {
            setAiMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last && last.role === 'assistant') {
                next[next.length - 1] = { ...last, content: last.content + token };
              }
              return next;
            });
          },
          onComplete: (fullText) => {
            // 确保最终内容完整
            setAiMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last && last.role === 'assistant') {
                next[next.length - 1] = { role: 'assistant', content: fullText };
              }
              return next;
            });
            setAiStreaming(false);
          },
          onError: (err) => {
            setAiError(err.message || 'AI 请求失败');
            // 移除空的 assistant 消息
            setAiMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last && last.role === 'assistant' && !last.content) {
                next.pop();
              }
              return next;
            });
            setAiStreaming(false);
          },
        }
      );
    } catch (err) {
      if (!ac.signal.aborted) {
        setAiError(err.message || 'AI 请求失败');
      }
      setAiStreaming(false);
    }

    abortRef.current = null;
  }, [aiInput, aiStreaming, aiAvailable, aiMessages, systemPrompt]);

  // 回车发送
  const handleAiKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendAi();
    }
  }, [handleSendAi]);

  // 切换到 AI 模式
  const handleEnterAi = useCallback(() => {
    if (!aiAvailable) return;
    setMode('ai');
    const lastLine = getLineText(lines[lineIndex]);
    const openingMsg = lastLine || '……你有什么想问的？';

    if (aiMessages.length === 0) {
      // 首次进入自由对话 — 直接初始化
      setAiMessages([{ role: 'assistant', content: openingMsg }]);
    } else {
      // 已有对话历史 — 将当前剧情台词作为 NPC 的最新发言追加
      setAiMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        // 避免重复追加（连续多次点自由对话不堆叠同一句）
        if (lastMsg && lastMsg.role === 'assistant' && lastMsg.content === openingMsg) {
          return prev;
        }
        return [...prev, { role: 'assistant', content: openingMsg }];
      });
    }
  }, [aiAvailable, aiMessages, lineIndex, lines]);

  // 切回固定对话
  const handleExitAi = useCallback(() => {
    // 中止正在进行的请求
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setAiStreaming(false);
    setMode('fixed');

    // 如果玩家在自由对话中有发言，自动推进到下一句
    const hasUserSpoken = aiMessages.some((m) => m.role === 'user');
    if (hasUserSpoken) {
      if (isLast) {
        // 已是最后一行 — 有选项则留选项，无选项则关闭
        if (!dialogue?.playerOptions) onClose();
      } else {
        setLineIndex((i) => i + 1);
      }
    }
  }, [isLast, onClose, dialogue?.playerOptions, aiMessages]);

  const hasOptions = isLast && dialogue?.playerOptions && mode === 'fixed';

  return (
    <div className="dialogue-overlay" onClick={handleAdvance}>

      {/* 玩家选项面板（对话框上方） */}
      {hasOptions && (
        <div className="dialogue-overlay__options-panel" onClick={(e) => e.stopPropagation()}>
          {dialogue.playerOptions.map((option, i) => (
            <button
              key={i}
              className="dialogue-overlay__option-btn"
              onClick={handleSelectOption}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* 对话框 */}
      <div className={`dialogue-overlay__box ${mode === 'ai' ? 'dialogue-overlay__box--ai' : ''}`}>
        {/* 标题栏 */}
        <div className="dialogue-overlay__title-bar">
          <span className="dialogue-overlay__deco" />
          <span className="dialogue-overlay__title">
            {dialogue?.title || itemLabel}
          </span>

          {/* AI 模式切换按钮 */}
          {aiAvailable && (
            <button
              className="dialogue-overlay__ai-toggle"
              onClick={(e) => {
                e.stopPropagation();
                mode === 'fixed' ? handleEnterAi() : handleExitAi();
              }}
            >
              {mode === 'fixed' ? '💬 自由对话' : '◀ 返回剧情'}
            </button>
          )}

          <button
            className="dialogue-overlay__close"
            onClick={(e) => {
              e.stopPropagation();
              if (abortRef.current) abortRef.current.abort();
              onClose();
            }}
            aria-label="关闭对话"
          >
            ×
          </button>
        </div>

        {mode === 'fixed' ? (
          <>
            {/* 固定对话正文 */}
            <div className="dialogue-overlay__body">
              {dialogue?.image && (
                <div className="dialogue-overlay__image">
                  <img src={dialogue.image} alt={dialogue?.title || ''} />
                </div>
              )}
              <p className="dialogue-overlay__line" key={lineIndex}>
                {getLineText(lines[lineIndex])}
              </p>
              {isFirstDialogue && (
                <p className="dialogue-overlay__first-placeholder">试着问问他……</p>
              )}
            </div>

            {/* 底部提示：有选项时不显示"点击关闭" */}
            {!hasOptions && (
              <div className="dialogue-overlay__hint">
                {isLast ? '点击关闭' : `点击继续 (${lineIndex + 1}/${lines.length})`}
              </div>
            )}
          </>
        ) : (
          <>
            {/* AI 聊天正文 */}
            <div className="dialogue-overlay__ai-body" ref={aiBodyRef} onClick={(e) => e.stopPropagation()}>
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`dialogue-overlay__ai-bubble dialogue-overlay__ai-bubble--${msg.role}`}
                >
                  {msg.content}
                  {aiStreaming && i === aiMessages.length - 1 && msg.role === 'assistant' && (
                    <span className="dialogue-overlay__ai-cursor">▌</span>
                  )}
                </div>
              ))}
              {aiError && (
                <div className="dialogue-overlay__ai-error">
                  ⚠ {aiError}
                </div>
              )}
            </div>

            {/* 输入栏 */}
            <div className="dialogue-overlay__ai-input-bar" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                className="dialogue-overlay__ai-input"
                placeholder="问点什么……"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={handleAiKeyDown}
                disabled={aiStreaming}
                autoFocus
              />
              <button
                className="dialogue-overlay__ai-send"
                onClick={handleSendAi}
                disabled={aiStreaming || !aiInput.trim()}
              >
                {aiStreaming ? '…' : '发送'}
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
