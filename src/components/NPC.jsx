import { useState, useRef, useCallback, useEffect } from 'react';
import { NPC_PORTRAITS } from '../data/assets';
import './NPC.css';

/** 右键不做拖拽时的最小位移阈值 —— 低于此值视为"点击"触发缩放模式切换 */
const DRAG_THRESHOLD = 5;

/**
 * NPC —— 场景角色组件
 *
 * 以立绘图片为主视觉（无背景/边框），左键点击交谈，右键操作：
 * - 右键拖拽（非缩放模式）→ 移动位置
 * - 右键点击（无位移） → 切换缩放模式
 * - 缩放模式下右键拖拽    → 缩放大小
 *
 * 缩放范围：0.3x ~ 无上限，支持精确输入（2位小数）
 */
export default function NPC({
  npc,
  trustStage,
  onClick,
  highlight = false,
  stuckHint = false,
  onDragEnd,
  onScaleChange,
  scale = 1,
}) {
  const [imgError, setImgError] = useState(false);
  const portraitSrc = NPC_PORTRAITS[npc.id];

  // 每次 portraitSrc 变化时重置错误状态
  useEffect(() => { setImgError(false); }, [portraitSrc]);

  // ── 缩放模式（ref 版避开闭包陷阱） ──
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
      if (!isNaN(parsed) && isFinite(parsed)) {
        const clamped = Math.max(0.3, parsed);
        const rounded = Math.round(clamped * 100) / 100;
        onScaleChange?.(`npc_${npc.id}`, rounded);
        setScaleInput(rounded.toFixed(2));
      } else {
        setScaleInput(scale.toFixed(2));
      }
    },
    [npc.id, onScaleChange, scale],
  );

  // ── 拖拽 / 缩放拖拽状态 ──
  const [dragPos, setDragPos] = useState(null);
  const [dragScale, setDragScale] = useState(null);
  const dragStartRef = useRef(null);

  const isDragging = dragPos !== null || dragScale !== null;
  const position = dragPos || npc.position;
  const displayScale = dragScale ?? scale;

  const getSceneRect = useCallback(() => {
    const el = document.querySelector('.scene');
    return el ? el.getBoundingClientRect() : null;
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 2) return;
      e.preventDefault();
      e.stopPropagation();

      const rect = getSceneRect();
      if (!rect) return;

      const currentTop = parseFloat(dragPos?.top || npc.position.top);
      const currentLeft = parseFloat(dragPos?.left || npc.position.left);

      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startLeft: currentLeft,
        startTop: currentTop,
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
          const newLeft = ds.startLeft + (dx / ds.containerW) * 100;
          const newTop = ds.startTop + (dy / ds.containerH) * 100;
          setDragPos({
            top: `${Math.max(2, Math.min(98, newTop))}%`,
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
          onScaleChange?.(`npc_${npc.id}`, Math.round(finalScale * 100) / 100);
        } else {
          const finalLeft = ds.startLeft + (dx / ds.containerW) * 100;
          const finalTop = ds.startTop + (dy / ds.containerH) * 100;
          onDragEnd?.(npc.id, {
            top: `${Math.max(2, Math.min(98, finalTop))}%`,
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
    [dragPos, npc.id, npc.position, onDragEnd, scale, onScaleChange, toggleResizeMode, getSceneRect],
  );

  const handleClick = useCallback(
    (e) => {
      if (isDragging || isResizeMode) return;
      if (e.button !== 0) return;
      onClick?.();
    },
    [isDragging, onClick],
  );

  return (
    <div
      className={
        'npc'
        + (highlight ? ' npc--highlight' : '')
        + (stuckHint ? ' npc--stuck-hint' : '')
        + (isDragging && !resizeModeRef.current ? ' npc--dragging' : '')
        + (isResizeMode ? ' npc--resizing' : '')
      }
      style={{
        top: position.top,
        left: position.left,
      }}
      role="button"
      tabIndex={0}
      aria-label={`与 ${npc.name} 交谈`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      {portraitSrc && !imgError ? (
        <img
          src={portraitSrc}
          alt={npc.name}
          className="npc__portrait"
          style={{ width: `${96 * displayScale}px`, height: 'auto' }}
          onError={() => setImgError(true)}
          draggable={false}
        />
      ) : (
        <span className="npc__emoji" style={{ fontSize: `${64 * displayScale}px` }}>
          {npc.emoji}
        </span>
      )}

      <span className="npc__name">{npc.name}</span>
      {trustStage && (
        <span className={`npc__stage npc__stage--${trustStage.stage}`}>
          {trustStage.label}
        </span>
      )}

      {isResizeMode && !isDragging && (
        <div className="npc__scale-ctrl">
          <span className="npc__hint npc__hint--resize">右键拖拽缩放</span>
          <input
            className="npc__scale-input"
            type="number"
            min="0.3"
            max="999"
            step="0.01"
            value={scaleInput}
            onChange={(e) => setScaleInput(e.target.value)}
            onBlur={() => commitScale(scaleInput)}
            onKeyDown={(e) => { if (e.key === 'Enter') commitScale(scaleInput); }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <span className="npc__hint npc__hint--resize">x</span>
        </div>
      )}
      {!isResizeMode && !isDragging && (
        <span className="npc__hint">交谈</span>
      )}
      {isDragging && resizeModeRef.current && (
        <span className="npc__hint" style={{ opacity: 1 }}>
          缩放：{displayScale.toFixed(2)}x
        </span>
      )}
      {isDragging && !resizeModeRef.current && (
        <span className="npc__hint" style={{ opacity: 1 }}>拖拽中…</span>
      )}
    </div>
  );
}
