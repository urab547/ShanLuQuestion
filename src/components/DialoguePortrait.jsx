import { useState, useRef, useCallback, useEffect } from 'react';
import { NPC_PORTRAITS } from '../data/assets';
import './DialoguePortrait.css';

const DRAG_THRESHOLD = 5;
const LS_POS_KEY = 'shanglu_dialogue_portrait_position';
const LS_SCALE_KEY = 'shanglu_dialogue_portrait_scale';
/** 默认：图片底部与立绘容器底部对齐，水平居中偏左 */
const DEFAULT_POS = { bottom: '0%', left: '12%' };
const DEFAULT_SCALE = 1;

function loadPosition() {
  try {
    const raw = localStorage.getItem(LS_POS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // 旧数据用 top 基准 → 按 bottom 迁移
      if (parsed.top !== undefined && parsed.bottom === undefined) {
        return { bottom: '0%', left: parsed.left || DEFAULT_POS.left };
      }
      return parsed;
    }
  } catch { /* ignore */ }
  return { ...DEFAULT_POS };
}

function savePosition(pos) {
  try { localStorage.setItem(LS_POS_KEY, JSON.stringify(pos)); } catch { /* */ }
}

function loadScale() {
  try {
    const raw = localStorage.getItem(LS_SCALE_KEY);
    if (raw) return parseFloat(raw) || DEFAULT_SCALE;
  } catch { /* ignore */ }
  return DEFAULT_SCALE;
}

function saveScale(s) {
  try { localStorage.setItem(LS_SCALE_KEY, String(s)); } catch { /* */ }
}

/**
 * DialoguePortrait —— 对话中 NPC 立绘
 *
 * 图片底部与场景底部对齐，所有 NPC 立绘共享同一位置和缩放比例。
 *
 * 操作：
 * - 右键拖拽（非缩放模式）→ 移动位置（水平 + 底部偏移）
 * - 右键点击（无位移） → 切换缩放模式
 * - 缩放模式下右键拖拽 → 调整大小
 */
export default function DialoguePortrait({ npcId }) {
  const portraitSrc = NPC_PORTRAITS[npcId];
  const [imgError, setImgError] = useState(false);
  useEffect(() => { setImgError(false); }, [portraitSrc]);

  // ── 共享位置（bottom 基准） ──
  const [position, setPosition] = useState(() => loadPosition());
  useEffect(() => { savePosition(position); }, [position]);

  // ── 共享缩放 ──
  const [scale, setScale] = useState(() => loadScale());
  useEffect(() => { saveScale(scale); }, [scale]);

  // ── 缩放模式 ──
  const resizeModeRef = useRef(false);
  const [isResizeMode, setIsResizeMode] = useState(false);
  const toggleResizeMode = useCallback(() => {
    setIsResizeMode((prev) => {
      const next = !prev;
      resizeModeRef.current = next;
      return next;
    });
  }, []);

  // ── 精确缩放输入 ──
  const [scaleInput, setScaleInput] = useState(scale.toFixed(2));
  useEffect(() => { setScaleInput(scale.toFixed(2)); }, [scale]);
  const commitScale = useCallback(
    (inputVal) => {
      const parsed = parseFloat(inputVal);
      if (!isNaN(parsed) && isFinite(parsed) && parsed >= 0.3) {
        const rounded = Math.round(parsed * 100) / 100;
        setScale(rounded);
        setScaleInput(rounded.toFixed(2));
      } else {
        setScaleInput(scale.toFixed(2));
      }
    },
    [scale],
  );

  // ── 拖拽 / 缩放拖拽状态 ──
  const [dragPos, setDragPos] = useState(null);
  const [dragScale, setDragScale] = useState(null);
  const dragStartRef = useRef(null);
  const isDragging = dragPos !== null || dragScale !== null;

  const displayPosition = dragPos || position;
  const displayScale = dragScale ?? scale;

  const getSceneRect = useCallback(() => {
    const el = document.querySelector('.scene');
    return el ? el.getBoundingClientRect() : null;
  }, []);

  // ── 右键拖拽 / 缩放 ──
  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 2) return;
      e.preventDefault();
      e.stopPropagation();

      const rect = getSceneRect();
      if (!rect) return;

      const currentBottom = parseFloat(
        dragPos?.bottom ?? position?.bottom ?? DEFAULT_POS.bottom,
      );
      const currentLeft = parseFloat(
        dragPos?.left ?? position?.left ?? DEFAULT_POS.left,
      );

      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startBottom: currentBottom,
        startLeft: currentLeft,
        startScale: scale,
        containerW: rect.width,
        containerH: rect.height,
      };

      const handleMouseMove = (ev) => {
        const ds = dragStartRef.current;
        if (!ds) return;
        const dx = ev.clientX - ds.startX;
        const dy = ev.clientY - ds.startY;

        if (resizeModeRef.current) {
          const scaleDelta = dx / 180;
          const newScale = Math.max(0.3, ds.startScale + scaleDelta);
          setDragScale(newScale);
        } else {
          // 水平：右移 → left 增大
          const newLeft = ds.startLeft + (dx / ds.containerW) * 100;
          // 底部：鼠标上移(dy<0) → bottom 减小（偏离底部）；鼠标下移(dy>0) → bottom 增大
          const newBottom = ds.startBottom - (dy / ds.containerH) * 100;
          setDragPos({
            bottom: `${Math.max(-50, Math.min(95, newBottom))}%`,
            left: `${Math.max(2, Math.min(98, newLeft))}%`,
          });
        }
      };

      const handleMouseUp = (ev) => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        const ds = dragStartRef.current;
        if (!ds) return;
        const dx = ev.clientX - ds.startX;
        const dy = ev.clientY - ds.startY;

        if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) {
          toggleResizeMode();
        } else if (resizeModeRef.current) {
          const scaleDelta = dx / 180;
          const finalScale = Math.max(0.3, ds.startScale + scaleDelta);
          setScale(Math.round(finalScale * 100) / 100);
        } else {
          const finalLeft = ds.startLeft + (dx / ds.containerW) * 100;
          const finalBottom = ds.startBottom - (dy / ds.containerH) * 100;
          setPosition({
            bottom: `${Math.max(-50, Math.min(95, finalBottom))}%`,
            left: `${Math.max(2, Math.min(98, finalLeft))}%`,
          });
        }

        setDragPos(null);
        setDragScale(null);
        dragStartRef.current = null;
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [dragPos, position, scale, toggleResizeMode, getSceneRect],
  );

  if (!portraitSrc && npcId === null) return null;

  return (
    <div
      className={
        'dialogue-portrait'
        + (isDragging && !resizeModeRef.current ? ' dialogue-portrait--dragging' : '')
        + (isResizeMode ? ' dialogue-portrait--resizing' : '')
      }
      style={{
        bottom: displayPosition.bottom,
        left: displayPosition.left,
        transform: `translate(-50%, 0) scale(${displayScale})`,
        transformOrigin: 'bottom center',
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* NPC 立绘 */}
      {portraitSrc && !imgError ? (
        <img
          src={portraitSrc}
          alt=""
          className="dialogue-portrait__img"
          onError={() => setImgError(true)}
          draggable={false}
        />
      ) : (
        <span className="dialogue-portrait__fallback">
          {npcId === 'danzeng' ? '👴' :
           npcId === 'zhuoma'  ? '👩' :
           npcId === 'gesang'  ? '👦' :
           npcId === 'baima'   ? '🧘' :
           npcId === 'renqing' ? '👨' : '🤔'}
        </span>
      )}

      {/* 缩放模式 UI */}
      {isResizeMode && !isDragging && (
        <div className="dialogue-portrait__scale-ctrl">
          <span className="dialogue-portrait__hint">右键拖拽缩放</span>
          <input
            className="dialogue-portrait__scale-input"
            type="number"
            min="0.3"
            max="999"
            step="0.01"
            value={scaleInput}
            onChange={(e) => setScaleInput(e.target.value)}
            onBlur={() => commitScale(scaleInput)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitScale(scaleInput);
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <span className="dialogue-portrait__hint">x</span>
        </div>
      )}

      {/* 拖拽中提示 */}
      {isDragging && resizeModeRef.current && (
        <span className="dialogue-portrait__drag-hint">
          缩放：{displayScale.toFixed(2)}x
        </span>
      )}
      {isDragging && !resizeModeRef.current && (
        <span className="dialogue-portrait__drag-hint">拖拽中…</span>
      )}
    </div>
  );
}
