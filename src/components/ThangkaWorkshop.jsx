import { useState, useCallback, useRef, useEffect } from 'react';
import { PIGMENTS } from '../data/pigments';
import { TANGKA_IMAGES } from '../data/assets';
import { createStuckTimer, checkStuckErrors } from '../utils/stuckDetector';
import './ThangkaWorkshop.css';

const GRID_SIZE = 16;
const DRAFT_KEY = 'thangka_draft';

// ===== Step1: 构图谜题 — 部位元素定义 =====
const BODY_PARTS = [
  { id: 'head',  label: '头部',   rows: 3, cols: 5, emoji: '👤' },
  { id: 'torso', label: '躯干',   rows: 7, cols: 9, emoji: '🧍' },
  { id: 'hand',  label: '手势',   rows: 4, cols: 4, emoji: '🖐' },
  { id: 'lotus', label: '莲花座', rows: 4, cols: 7, emoji: '🪷' },
];

// ===== Step1: gridRules（残卷第一页量度规范） =====
const GRID_RULES = {
  head:  { row: [1, 3],  col: [6, 10] },
  torso: { row: [4, 10], col: [4, 12] },
  hand:  { row: [5, 8],  col: [2, 5]  },
  lotus: { row: [11, 14],col: [5, 11] },
};
const TOLERANCE = 1;

// ===== Step2: 颜色填充 — 5 大区域（度母唐卡真实比例，百分比绝对定位） =====
const COLOR_REGIONS = [
  { id: 'background', label: '背景',   top: '0%',  height: '100%', left: '0%',  width: '100%', correct: 'songshi_green', zIndex: 0 },
  { id: 'protector',  label: '护法',   top: '10%', height: '15%',  left: '21.875%', width: '56.25%', correct: 'cinnabar_red',  zIndex: 2 },
  { id: 'face',       label: '面部',   top: '25%', height: '10%',  left: '36.67%', width: '26.67%', correct: 'gubai_white',   zIndex: 5 },
  { id: 'robe',       label: '衣纹',   top: '35%', height: '35%',  left: '12.5%',  width: '75%',   correct: 'foqing_blue',   zIndex: 3 },
  { id: 'lotus',      label: '莲花座', top: '70%', height: '20%',  left: '25%', width: '50%', correct: 'zangjin_gold',  zIndex: 4 },
];

// ===== localStorage 读写 =====
function loadDraft() {
  try {
    const raw = localStorage.getItem('shanglu_thangka_draft') || localStorage.getItem(DRAFT_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveDraft(data) {
  try {
    const json = JSON.stringify({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem('shanglu_thangka_draft', json);
    localStorage.setItem(DRAFT_KEY, json);
  } catch { /* ignore */ }
}

function createEmptyGrid() {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null),
  );
}

// ===== 判定函数 =====
// 以元素中心点是否落在目标区域扩展范围内来判定
// 元素占据 [dropRow, dropRow+rows-1] × [dropCol, dropCol+cols-1]
// 中心点 = (dropRow + floor(rows/2), dropCol + floor(cols/2))
function checkPlacement(partId, dropRow, dropCol) {
  const rule = GRID_RULES[partId];
  if (!rule) return false;

  const part = BODY_PARTS.find((p) => p.id === partId);
  if (!part) return false;

  // 元素中心点
  const centerRow = dropRow + Math.floor(part.rows / 2);
  const centerCol = dropCol + Math.floor(part.cols / 2);

  const [rMin, rMax] = rule.row;
  const [cMin, cMax] = rule.col;

  return (
    centerRow >= rMin - TOLERANCE && centerRow <= rMax + TOLERANCE &&
    centerCol >= cMin - TOLERANCE && centerCol <= cMax + TOLERANCE
  );
}

/**
 * ThangkaWorkshop — 唐卡制作界面
 *
 * 两阶段状态机：
 * - 'composition'：Step1 构图谜题（拖放度母部位到正确位置）
 * - 'coloring'：   Step2 颜色填充（为预定义区域选择颜料）
 */
export default function ThangkaWorkshop({ pigments, inventory, onClose, onComplete, onStuck }) {
  // ===== 草稿恢复 =====
  const draft = loadDraft();

  // ===== 状态 =====
  const [step, setStep] = useState(() => {
    if (draft?.step === 'eye_opening' || draft?.step3Done) return 'eye_opening';
    if (draft?.step === 'reveal') return 'eye_opening';
    if (draft?.step2Done && draft?.step === 'coloring') return 'eye_opening';
    if (draft?.step === 'coloring') return 'coloring';
    return 'composition';
  });

  const [grid, setGrid] = useState(() => {
    if (draft?.grid && Array.isArray(draft.grid) && draft.grid.length === GRID_SIZE) {
      return draft.grid;
    }
    return createEmptyGrid();
  });

  const [placements, setPlacements] = useState(() => {
    if (draft?.placements) return draft.placements;
    return { head: 'pending', torso: 'pending', hand: 'pending', lotus: 'pending' };
  });

  const [selectedPigment, setSelectedPigment] = useState(null);
  const [hintMessage, setHintMessage] = useState(null);
  const [narration, setNarration] = useState(() => draft?.narration || null);
  // Step2: 区域颜色映射（替代 16×16 grid 判断）
  const [regionColors, setRegionColors] = useState(() => draft?.regionColors || {});
  // Step2 错误反馈
  const [errors, setErrors] = useState([]);
  const [feedbackDialogue, setFeedbackDialogue] = useState(null);
  const [step2Done, setStep2Done] = useState(() => draft?.step2Done || false);
  const [step3Done, setStep3Done] = useState(() => draft?.step3Done || false);
  const [step3Choice, setStep3Choice] = useState(() => draft?.step3Choice || null);

  const hintTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const saveTimerRef = useRef(null);
  const [saveToast, setSaveToast] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  // 用 ref 保持 placements 最新值，避免 handleDrop 闭包过期
  const placementsRef = useRef(placements);
  placementsRef.current = placements;

  // ─── 卡关检测 ───
  const [stuckErrorsStep1, setStuckErrorsStep1] = useState(0);
  const [stuckErrorsStep2, setStuckErrorsStep2] = useState(0);
  const stuckTimerRef = useRef(null);
  const stuckFiredRef = useRef(false);

  // 每次 step 切换时重置卡关状态
  useEffect(() => {
    stuckFiredRef.current = false;
    setStuckErrorsStep1(0);
    setStuckErrorsStep2(0);
    if (stuckTimerRef.current) stuckTimerRef.current.stop();

    if (!onStuck) return;

    const npc = step === 'composition' ? 'gesang' : step === 'coloring' ? 'baima' : null;
    if (!npc) return;

    stuckTimerRef.current = createStuckTimer(() => {
      if (!stuckFiredRef.current) {
        stuckFiredRef.current = true;
        onStuck({ npc });
      }
    });
    stuckTimerRef.current.start();

    return () => {
      if (stuckTimerRef.current) stuckTimerRef.current.stop();
    };
  }, [step, onStuck]);

  // 错误阈值判定
  const triggerStuckIfNeeded = useCallback((count, npc) => {
    if (!stuckFiredRef.current && checkStuckErrors(count) && onStuck) {
      stuckFiredRef.current = true;
      onStuck({ npc });
    }
  }, [onStuck]);

  // ===== 前置条件：检查残卷第一页 =====
  const hasScroll1 = inventory?.includes('scroll_page_1') ?? false;

  // ===== 颜料数据 =====
  const craftablePigments = Object.values(PIGMENTS).filter((p) => {
    const st = pigments?.[p.id];
    return st?.rawMaterialFound && st?.recipeUnderstood;
  });

  // ===== 已填区域数（Step2，排除背景，统计有颜色的区域） =====
  const filledCount = COLOR_REGIONS.filter(
    (r) => r.id !== 'background' && regionColors[r.id],
  ).length;
  const totalRegions = COLOR_REGIONS.length - 1; // 排除背景
  const allFilled = filledCount >= totalRegions;

  const allPlaced = Object.values(placements).every((s) => s === 'placed');

  // ===== 持久化 =====
  const persist = useCallback((updates) => {
    const current = loadDraft() || {};
    saveDraft({ ...current, ...updates });
  }, []);

  // ===== Step2 颜色填充逻辑 =====
  const handleRegionClick = useCallback(
    (region) => {
      if (step !== 'coloring' || !selectedPigment || step2Done) return;

      setRegionColors((prev) => {
        const next = { ...prev, [region.id]: selectedPigment };
        persist({ regionColors: next });
        return next;
      });
      // 清除之前的错误状态
      setErrors([]);
      setFeedbackDialogue(null);
    },
    [step, selectedPigment, persist, step2Done],
  );

  // ===== Step2 提交判定 =====
  const handleSubmit = useCallback(() => {
    const wrongRegions = [];
    for (const region of COLOR_REGIONS) {
      if (regionColors[region.id] !== region.correct) {
        wrongRegions.push(region.id);
      }
    }

    if (wrongRegions.length === 0) {
      // 全部正确 → 自动过渡到 Step3
      setErrors([]);
      setFeedbackDialogue(null);
      setStep2Done(true);
      setNarration('唐卡已成。五种颜色各归其位，度母在画布上静静注视着你。');
      persist({ regionColors, step2Done: true, step: 'reveal', narration: '唐卡已成。五种颜色各归其位，度母在画布上静静注视着你。' });
      setTimeout(() => setStep('reveal'), 2000);
    } else {
      // 有错误
      setErrors(wrongRegions);
      setStuckErrorsStep2(prev => {
        const next = prev + 1;
        triggerStuckIfNeeded(next, 'baima');
        return next;
      });

      // 生成白玛旁白
      const wrongLabels = wrongRegions.map((id) => {
        const r = COLOR_REGIONS.find((cr) => cr.id === id);
        return r ? r.label : id;
      });
      const fbText = wrongRegions.length === 1
        ? `白玛捻动念珠，轻声道：「${wrongLabels[0]}的颜色不对。再想想——每种颜料都有它该去的地方。」`
        : `白玛看了一眼画布，微微摇头：「${wrongLabels.join('、')}——这些地方的颜色还需斟酌。唐卡之色，各有其义。」`;

      setFeedbackDialogue(fbText);

      // 清除之前的 timer
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = setTimeout(() => {
        setFeedbackDialogue(null);
      }, 4000);
    }
  }, [regionColors, persist, onComplete]);

  // Step3: 暂存待确认的选项
  const [pendingChoice, setPendingChoice] = useState(() => draft?.pendingChoice || null);

  // ===== Step3 选择逻辑 =====
  const handleStep3Choice = useCallback((choice) => {
    if (step3Done) return;
    setPendingChoice(choice);
    persist({ pendingChoice: choice });
  }, [step3Done, persist]);

  const handleConfirmChoice = useCallback(() => {
    if (!pendingChoice || step3Done) return;
    const choice = pendingChoice;
    const quality = choice === 'B' ? '深刻理解' : '基本完成';
    const replica = { completed: true, quality, step3Choice: choice, completedAt: Date.now() };
    try {
      localStorage.setItem('shanglu_thangka_replica', JSON.stringify(replica));
      localStorage.setItem('thangka_replica', JSON.stringify(replica));
    } catch { /* ignore */ }

    setStep3Choice(choice);
    setStep3Done(true);

    const choiceNarrations = {
      A: '你凝视度母的左眼——那是对山川自然的敬畏。画师的笔触里，确实藏着对这片土地最深沉的凝视。',
      B: '你凝视度母的左眼，忽然明白了——那不是对山川的敬畏，也不是对技艺的执念。那是一双望着远方、望着逝去之人的眼睛。\n\n旦增站在你身后，沉默了很久。\n「你看到了。」他的声音很轻。「我画她的眼睛时，用了整整一个月。每一笔，都怕画错她。」',
      C: '你凝视度母的左眼——那是对技艺传承的执念。每一笔都承载着画师毕生的心血，不容半分差池。',
    };
    setNarration(choiceNarrations[choice] || '');

    persist({ grid, step: 'eye_opening', step3Done: true, step3Choice: choice });
  }, [pendingChoice, step3Done, grid, persist]);

  const handleStep3Complete = useCallback(() => {
    if (onComplete) onComplete({ quality: step3Choice === 'B' ? '深刻理解' : '基本完成', choice: step3Choice });
  }, [onComplete, step3Choice]);

  // ===== Step1 拖拽逻辑 =====
  const handleDragStart = useCallback((e, partId) => {
    e.dataTransfer.setData('text/plain', partId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e, dropRow, dropCol) => {
    e.preventDefault();
    const partId = e.dataTransfer.getData('text/plain');
    if (!partId) return;

    // 使用 ref 获取最新 placements
    const currentPlacements = placementsRef.current;
    if (currentPlacements[partId] === 'placed') return;

    if (checkPlacement(partId, dropRow, dropCol)) {
      // 正确放置
      setPlacements((prev) => {
        const next = { ...prev, [partId]: 'placed' };
        persist({ placements: next });
        // 检查是否全部完成
        const allDone = Object.values(next).every((s) => s === 'placed');
        if (allDone) {
          setNarration('度母身形已定，接下来该为她披上颜色了。');
          persist({ placements: next, step: 'coloring', narration: '度母身形已定，接下来该为她披上颜色了。' });
          // 延迟切换 step，让玩家看到旁白
          setTimeout(() => setStep('coloring'), 2000);
        }
        return next;
      });
    } else {
      // 错误放置 → 显示提示
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      setHintMessage('比例有误，请参照量度规范');
      setStuckErrorsStep1(prev => {
        const next = prev + 1;
        triggerStuckIfNeeded(next, 'gesang');
        return next;
      });
      hintTimerRef.current = setTimeout(() => setHintMessage(null), 2000);
    }
  }, [persist]);

  // 清理 timer
  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  // reveal — PNG 清晰后允许点击进入 eye_opening
  const [revealReady, setRevealReady] = useState(false);
  useEffect(() => {
    if (step !== 'reveal') return;
    setRevealReady(false);
    const timer = setTimeout(() => setRevealReady(true), 4800);
    return () => clearTimeout(timer);
  }, [step]);

  const handleRevealClick = () => {
    if (!revealReady) return;
    setStep('eye_opening');
    persist({ step: 'eye_opening' });
  };

  // ===== 工具栏 =====
  const handleBack = () => {
    setShowBackConfirm(true);
  };

  const handleBackConfirm = () => {
    setShowBackConfirm(false);
    onClose();
  };

  const handleBackCancel = () => {
    setShowBackConfirm(false);
  };

  const handleSave = () => {
    persist({ grid, placements, regionColors, step, narration });
    setSaveToast(true);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => setSaveToast(false), 2000);
  };

  // ===== 渲染：未收集残卷第一页 =====
  if (!hasScroll1) {
    return (
      <div className="thangka-workshop">
        <div className="thangka-workshop__mask" onClick={handleBack} />
        <div className="thangka-workshop__panel" onClick={(e) => e.stopPropagation()}>
          <div className="thangka-workshop__toolbar">
            <button className="thangka-workshop__btn-back" onClick={handleBack}>← 返回</button>
            <span className="thangka-workshop__title">唐卡绘制</span>
            <span />
          </div>
          <div className="thangka-workshop__body">
            <div className="thangka-workshop__canvas thangka-workshop__canvas--locked">
              <div className="thangka-workshop__locked-hint">
                <span className="thangka-workshop__locked-icon">📜</span>
                <p>需要找到绘制规范才能开始构图</p>
                <p className="thangka-workshop__locked-sub">请先在场景中收集残卷第一页</p>
              </div>
            </div>
            <div className="thangka-workshop__palette thangka-workshop__palette--locked" />
          </div>
          {saveToast && <div className="thangka-workshop__toast">草稿已保存</div>}
          {showBackConfirm && (
            <div className="thangka-workshop__confirm-overlay" onClick={handleBackCancel}>
              <div className="thangka-workshop__confirm-box" onClick={(e) => e.stopPropagation()}>
                <p className="thangka-workshop__confirm-text">离开后草稿会自动保留，确定返回吗？</p>
                <div className="thangka-workshop__confirm-actions">
                  <button className="thangka-workshop__confirm-btn thangka-workshop__confirm-btn--cancel" onClick={handleBackCancel}>留下继续</button>
                  <button className="thangka-workshop__confirm-btn thangka-workshop__confirm-btn--ok" onClick={handleBackConfirm}>确定返回</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===== Reveal: 唐卡成品浮现（Step2→Step3 过渡动画） =====
  if (step === 'reveal') {
    return (
      <div className="thangka-workshop thangka-workshop--reveal">
        <div className="thangka-workshop__mask thangka-workshop__mask--dim" />
        <div
          className={`thangka-workshop__panel thangka-workshop__panel--reveal${revealReady ? ' thangka-workshop__panel--reveal-ready' : ''}`}
          onClick={handleRevealClick}
        >
          <div className="thangka-workshop__reveal-container">
            {/* 粗糙色块（底层，渐隐） */}
            <div className="thangka-workshop__reveal-rough">
              {COLOR_REGIONS.map((region) => {
                const pigmentId = regionColors[region.id];
                const filledColor = pigmentId ? PIGMENTS[pigmentId]?.color : null;
                return (
                  <div
                    key={region.id}
                    style={{
                      position: 'absolute',
                      top: region.top,
                      height: region.height,
                      left: region.left,
                      width: region.width,
                      zIndex: region.zIndex,
                      backgroundColor: filledColor || 'transparent',
                    }}
                  />
                );
              })}
            </div>
            {/* 精制 PNG（顶层，渐显） */}
            <div className="thangka-workshop__reveal-refined">
              <img
                src={TANGKA_IMAGES.THANGKA_REFINED}
                alt="精制度母唐卡"
                className="thangka-workshop__reveal-refined-img"
              />
            </div>
            {/* 仪式文字 + 点击提示 */}
            <div className="thangka-workshop__reveal-text">
              <p className="thangka-workshop__reveal-text-line">颜料渗入绢帛</p>
              <p className="thangka-workshop__reveal-text-line">度母在五色交汇中浮现</p>
              {revealReady && (
                <p className="thangka-workshop__reveal-click-hint">— 点击落笔 —</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== Step3: 度母左眼谜题（early return，独立布局） =====
  if (step === 'eye_opening') {
    return (
      <div className="thangka-workshop">
        <div className="thangka-workshop__mask" onClick={handleBack} />
        <div className="thangka-workshop__panel" onClick={(e) => e.stopPropagation()}>
          <div className="thangka-workshop__toolbar">
            <button className="thangka-workshop__btn-back" onClick={handleBack}>← 返回</button>
            <span className="thangka-workshop__title">唐卡绘制 — 开眼</span>
            <button className="thangka-workshop__btn-save" onClick={handleSave}>保存草稿</button>
          </div>
          <div className="thangka-workshop__body thangka-workshop__body--step3">
            {/* 残卷原文引用 — 仪式感引文 */}
            <div className="thangka-workshop__ritual-quote">
              <p className="thangka-workshop__ritual-quote-text">残卷有云：此眼需画师以心中所念入笔</p>
            </div>
            {/* 残卷描述文字 */}
            <div className="thangka-workshop__scroll-text">
              <p className="thangka-workshop__scroll-title">残卷·第五页（夹层）</p>
              <p className="thangka-workshop__scroll-body">「度母左眼，画师以三十二笔成之。最后一笔落时，笔尖微颤。」</p>
              <p className="thangka-workshop__scroll-body">「师问其故，画师不言。次日，见画师以指腹轻抚眼角，喃喃自语。」</p>
              <p className="thangka-workshop__scroll-body">「余观其眼，非怒非悲，似有所望。问之再三，画师只道：此眼所望之处，不在画中。」</p>
              <p className="thangka-workshop__scroll-hint">请判断：度母左眼的眼神，最可能表达了什么？</p>
            </div>
            {/* 选项按钮 */}
            <div className="thangka-workshop__choices">
              {[
                { key: 'A', text: '对山川自然的敬畏' },
                { key: 'B', text: '对亡妻的思念' },
                { key: 'C', text: '对技艺传承的执念' },
              ].map(({ key, text }) => (
                <button
                  key={key}
                  className={`thangka-workshop__choice${
                    pendingChoice === key ? ' thangka-workshop__choice--selected' : ''
                  }${step3Done ? ' thangka-workshop__choice--disabled' : ''}`}
                  onClick={() => handleStep3Choice(key)}
                  disabled={step3Done}
                >
                  <span className="thangka-workshop__choice-letter">{key}</span>
                  <span className="thangka-workshop__choice-text">{text}</span>
                </button>
              ))}
            </div>
            {/* 落笔确认按钮 */}
            {!step3Done && (
              <button
                className={`thangka-workshop__confirm-brush${
                  pendingChoice ? '' : ' thangka-workshop__confirm-brush--disabled'
                }`}
                onClick={handleConfirmChoice}
                disabled={!pendingChoice}
              >
                落 笔
              </button>
            )}
          </div>
          {/* 完成旁白 */}
          {narration && step3Done && (
            <div
              className="thangka-workshop__narration thangka-workshop__narration--step3"
              onClick={handleStep3Complete}
              role="button"
              tabIndex={0}
            >
              {narration.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <p className="thangka-workshop__narration-hint">点击任意处继续</p>
            </div>
          )}
          {saveToast && <div className="thangka-workshop__toast">草稿已保存</div>}
          {showBackConfirm && (
            <div className="thangka-workshop__confirm-overlay" onClick={handleBackCancel}>
              <div className="thangka-workshop__confirm-box" onClick={(e) => e.stopPropagation()}>
                <p className="thangka-workshop__confirm-text">离开后草稿会自动保留，确定返回吗？</p>
                <div className="thangka-workshop__confirm-actions">
                  <button className="thangka-workshop__confirm-btn thangka-workshop__confirm-btn--cancel" onClick={handleBackCancel}>留下继续</button>
                  <button className="thangka-workshop__confirm-btn thangka-workshop__confirm-btn--ok" onClick={handleBackConfirm}>确定返回</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===== 主渲染（Step1/Step2） =====
  const isComposition = step === 'composition';

  return (
    <div className="thangka-workshop">
      <div className="thangka-workshop__mask" onClick={handleBack} />
      <div className="thangka-workshop__panel" onClick={(e) => e.stopPropagation()}>
        {/* ===== 工具栏 ===== */}
        <div className="thangka-workshop__toolbar">
          <button className="thangka-workshop__btn-back" onClick={handleBack}>← 返回</button>
          <span className="thangka-workshop__title">
            唐卡绘制{isComposition ? ' — 构图' : ' — 上色'}
          </span>
          <button className="thangka-workshop__btn-save" onClick={handleSave}>保存草稿</button>
        </div>

        {/* ===== 主体 ===== */}
        <div className="thangka-workshop__body">
          {/* ---- 构图区 ---- */}
          <div className={`thangka-workshop__canvas thangka-workshop__canvas--flex`}>
            {/* 底层网格 */}
            {isComposition ? (
              /* Step1：渲染空白网格 + 已放置的元素 */
              Array.from({ length: GRID_SIZE }, (_, ri) => (
                <div key={ri} className="thangka-workshop__row">
                  {Array.from({ length: GRID_SIZE }, (_, ci) => {
                    // 检查是否有已放置的元素占据此格
                    let placedPart = null;
                    for (const part of BODY_PARTS) {
                      if (placements[part.id] === 'placed') {
                        const rule = GRID_RULES[part.id];
                        if (
                          ri >= rule.row[0] && ri <= rule.row[1] &&
                          ci >= rule.col[0] && ci <= rule.col[1]
                        ) {
                          placedPart = part;
                          break;
                        }
                      }
                    }
                    return (
                      <div
                        key={ci}
                        className={`thangka-workshop__cell${
                          placedPart ? ' thangka-workshop__cell--placed' : ''
                        }`}
                        data-drop-row={ri}
                        data-drop-col={ci}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, ri, ci)}
                        style={placedPart ? {
                          backgroundColor: 'rgba(76, 175, 80, 0.25)',
                          border: '1px solid rgba(76, 175, 80, 0.5)',
                        } : undefined}
                      />
                    );
                  })}
                </div>
              ))
            ) : (
              /* Step2：颜色填充 — 度母唐卡真实比例，绝对定位色块 */
              <>
                {COLOR_REGIONS.map((region) => {
                  const pigmentId = regionColors[region.id];
                  const filledColor = pigmentId ? PIGMENTS[pigmentId]?.color : null;
                  const isFilled = !!pigmentId;
                  const isSelectable = selectedPigment && !step2Done;
                  const hasError = errors.includes(region.id);
                  const isBg = region.id === 'background';
                  return (
                    <button
                      key={region.id}
                      className={`thangka-workshop__region thangka-workshop__region--abs${
                        isSelectable ? ' thangka-workshop__region--hoverable' : ''
                      }${isFilled ? ' thangka-workshop__region--filled' : ''
                      }${hasError ? ' thangka-workshop__region--error' : ''
                      }${isBg ? ' thangka-workshop__region--bg' : ''}`}
                      style={{
                        top: region.top,
                        height: region.height,
                        left: region.left,
                        width: region.width,
                        zIndex: region.zIndex,
                        ...(filledColor ? { backgroundColor: filledColor } : {}),
                      }}
                      onClick={() => handleRegionClick(region)}
                      aria-label={`${region.label}${isFilled ? `（${PIGMENTS[pigmentId]?.label}）` : '（未填色）'}`}
                    >
                      <span className={`thangka-workshop__region-label${
                        isFilled ? ' thangka-workshop__region-label--filled' : ''
                      }${isBg ? ' thangka-workshop__region-label--bg' : ''}`}>
                        {region.label}
                      </span>
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* ---- 颜料盘 ---- */}
          <div className={`thangka-workshop__palette${
            isComposition ? ' thangka-workshop__palette--locked' : ''
          }`}>
            {isComposition ? (
              <div className="thangka-workshop__palette-lock">
                <span className="thangka-workshop__palette-lock-icon">🔒</span>
                <p>完成构图后解锁</p>
              </div>
            ) : (
              <>
                <h3 className="thangka-workshop__palette-title">颜料盘</h3>
                {craftablePigments.length === 0 ? (
                  <p className="thangka-workshop__palette-empty">暂无已就绪颜料</p>
                ) : (
                  <div className="thangka-workshop__pigments">
                    {craftablePigments.map((p) => (
                      <button
                        key={p.id}
                        className={`thangka-workshop__pigment${
                          selectedPigment === p.id ? ' thangka-workshop__pigment--selected' : ''
                        }`}
                        onClick={() => setSelectedPigment((prev) => (prev === p.id ? null : p.id))}
                        aria-label={`选择 ${p.label}`}
                        disabled={step2Done}
                      >
                        <span className="thangka-workshop__swatch" style={{ backgroundColor: p.color }} />
                        <span className="thangka-workshop__pigment-label">{p.label}</span>
                      </button>
                    ))}
                  </div>
                )}
                {selectedPigment && !step2Done && (
                  <p className="thangka-workshop__hint">
                    当前选中：{PIGMENTS[selectedPigment]?.label}，点击区域填入
                  </p>
                )}
                {/* 完成上色按钮 */}
                {!step2Done && (
                  <button
                    className={`thangka-workshop__submit${
                      allFilled ? '' : ' thangka-workshop__submit--disabled'
                    }`}
                    onClick={allFilled ? handleSubmit : undefined}
                    disabled={!allFilled}
                    title={allFilled ? '检查上色结果' : `还需填写 ${totalRegions - filledCount} 个区域`}
                  >
                    完成上色
                  </button>
                )}
                {step2Done && (
                  <p className="thangka-workshop__done-hint">✓ 上色完成</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* ===== 待放置区（Step1 专用） ===== */}
        {isComposition && (
          <div className="thangka-workshop__tray">
            <div className="thangka-workshop__tray-parts">
              {BODY_PARTS.map((part) => {
                const isPlaced = placements[part.id] === 'placed';
                const rule = GRID_RULES[part.id];
                const partStyle = {
                  gridTemplateColumns: `repeat(${part.cols}, 1fr)`,
                  gridTemplateRows: `repeat(${part.rows}, 1fr)`,
                };
                return (
                  <div
                    key={part.id}
                    className={`thangka-workshop__part${
                      isPlaced ? ' thangka-workshop__part--placed' : ''
                    }`}
                    draggable={!isPlaced}
                    onDragStart={(e) => handleDragStart(e, part.id)}
                    title={isPlaced
                      ? `${part.label}（已放置：行${rule.row[0]+1}-${rule.row[1]+1}，列${rule.col[0]+1}-${rule.col[1]+1}）`
                      : `拖放${part.label}到网格正确位置`}
                  >
                    {/* 迷你网格预览 */}
                    <div className="thangka-workshop__part-grid" style={partStyle}>
                      {Array.from({ length: part.rows * part.cols }, (_, i) => (
                        <div key={i} className="thangka-workshop__part-cell" />
                      ))}
                    </div>
                    <span className="thangka-workshop__part-label">
                      {part.emoji} {part.label}
                    </span>
                    <span className="thangka-workshop__part-size">
                      {part.rows}×{part.cols}
                    </span>
                    {isPlaced && <span className="thangka-workshop__part-check">✓</span>}
                  </div>
                );
              })}
            </div>
            {/* 错误提示 */}
            {hintMessage && (
              <p className="thangka-workshop__hint-error">{hintMessage}</p>
            )}
          </div>
        )}

        {/* ===== Step2 错误反馈旁白 ===== */}
        {!isComposition && feedbackDialogue && (
          <div className="thangka-workshop__feedback">
            <p>{feedbackDialogue}</p>
          </div>
        )}

        {/* ===== 完成旁白（Step1→Step2 过渡 / Step2 完成） ===== */}
        {narration && isComposition && allPlaced && (
          <div className="thangka-workshop__narration">
            <p>{narration}</p>
          </div>
        )}
        {narration && !isComposition && step2Done && (
          <div className="thangka-workshop__narration">
            <p>{narration}</p>
          </div>
        )}

        {/* ===== 底部状态栏（Step2） ===== */}
        {!isComposition && !step2Done && (
          <div className="thangka-workshop__status">
            已填 {filledCount} / {totalRegions} 区域
            {!allFilled && (
              <span className="thangka-workshop__status-hint">（全部填完后可提交检查）</span>
            )}
          </div>
        )}
        {saveToast && <div className="thangka-workshop__toast">草稿已保存</div>}
        {showBackConfirm && (
          <div className="thangka-workshop__confirm-overlay" onClick={handleBackCancel}>
            <div className="thangka-workshop__confirm-box" onClick={(e) => e.stopPropagation()}>
              <p className="thangka-workshop__confirm-text">离开后草稿会自动保留，确定返回吗？</p>
              <div className="thangka-workshop__confirm-actions">
                <button className="thangka-workshop__confirm-btn thangka-workshop__confirm-btn--cancel" onClick={handleBackCancel}>留下继续</button>
                <button className="thangka-workshop__confirm-btn thangka-workshop__confirm-btn--ok" onClick={handleBackConfirm}>确定返回</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
