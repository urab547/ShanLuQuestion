import { useState, useRef, useCallback, useEffect } from 'react';
import './PuzzleWrapper.css';

/** 右键不做拖拽时的最小位移阈值 —— 低于此值视为"点击"触发缩放模式切换 */
const DRAG_THRESHOLD = 5;

/**
 * PuzzleWrapper —— 拼图谜题的可拖拽/缩放容器
 *
 * 包裹 SortablePuzzle，提供：
 * - 右键拖拽（非缩放模式）→ 移动位置
 * - 右键点击（无位移） → 切换缩放模式
 * - 缩放模式下右键拖拽    → 缩放大小
 *
 * 缩放范围：0.3x ~ 无上限，支持精确输入（2位小数）
 */
export default function PuzzleWrapper({
  puzzleId,
  position,
  scale = 1,
  children,
  onDragEnd,
  onScaleChange,
}) {
  const containerRef = useRef(null);

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

  // ── 拖拽 / 缩放拖拽状态 ──
  const [dragPos, setDragPos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef(null);

  // ── 精确缩放输入 ──
  const [scaleInput, setScaleInput] = useState(scale.toFixed(2));
  useEffect(() => { setScaleInput(scale.toFixed(2)); }, [scale]);

  const commitScale = useCallback(
    (inputVal) => {
      const parsed = parseFloat(inputVal);
      if (!isNaN(parsed) && isFinite(parsed)) {
        const clamped = Math.max(0.3, parsed);
        const rounded = Math.round(clamped * 100) / 100;
        onScaleChange?.(puzzleId, rounded);
      }
    },
    [puzzleId, onScaleChange],
  );

  // ── 右键鼠标事件 ──
  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 2) return;
      e.preventDefault();

      const container = containerRef.current?.closest('.scene');
      const containerRect = container?.getBoundingClientRect();
      if (!containerRect) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = parseFloat(position.left);
      const startTop = parseFloat(position.top);
      const startScale = scale;

      dragStartRef.current = {
        startX,
        startY,
        startLeft,
        startTop,
        startScale,
        containerW: containerRect.width,
        containerH: containerRect.height,
      };

      setIsDragging(true);

      const handleMouseMove = (me) => {
        const dx = me.clientX - startX;
        const dy = me.clientY - startY;
        setDragPos({ dx, dy });
      };

      const handleMouseUp = (me) => {
        const ds = dragStartRef.current;
        if (!ds) {
          setIsDragging(false);
          setDragPos(null);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
          return;
        }

        const dx = me.clientX - ds.startX;
        const dy = me.clientY - ds.startY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < DRAG_THRESHOLD) {
          // 无显著位移 → 切换缩放模式
          toggleResizeMode();
        } else if (resizeModeRef.current) {
          // 缩放拖拽结束
          const scaleDelta = dx / 180;
          const finalScale = Math.max(0.3, ds.startScale + scaleDelta);
          onScaleChange?.(puzzleId, Math.round(finalScale * 100) / 100);
        } else {
          // 移动拖拽结束
          const finalLeft = ds.startLeft + (dx / ds.containerW) * 100;
          const finalTop = ds.startTop + (dy / ds.containerH) * 100;
          onDragEnd?.(puzzleId, {
            top: `${Math.max(2, Math.min(98, finalTop))}%`,
            left: `${Math.max(2, Math.min(98, finalLeft))}%`,
          });
        }

        setIsDragging(false);
        setDragPos(null);
        dragStartRef.current = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [position, scale, puzzleId, onScaleChange, onDragEnd, toggleResizeMode],
  );

  // 拖拽中实时预览
  const displayScale =
    dragPos && resizeModeRef.current
      ? Math.max(0.3, scale + dragPos.dx / 180)
      : scale;

  const displayLeft =
    dragPos && !resizeModeRef.current && dragStartRef.current
      ? `${dragStartRef.current.startLeft + (dragPos.dx / dragStartRef.current.containerW) * 100}%`
      : position.left;

  const displayTop =
    dragPos && !resizeModeRef.current && dragStartRef.current
      ? `${dragStartRef.current.startTop + (dragPos.dy / dragStartRef.current.containerH) * 100}%`
      : position.top;

  return (
    <div
      ref={containerRef}
      className={
        'puzzle-wrapper'
        + (isDragging && !resizeModeRef.current ? ' puzzle-wrapper--dragging' : '')
        + (isResizeMode ? ' puzzle-wrapper--resizing' : '')
      }
      style={{
        top: displayTop,
        left: displayLeft,
        transform: `translate(-50%, -50%) scale(${displayScale})`,
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}

      {isResizeMode && !isDragging && (
        <div className="puzzle-wrapper__scale-ctrl">
          <span className="puzzle-wrapper__hint">右键拖拽缩放</span>
          <input
            className="puzzle-wrapper__scale-input"
            type="number"
            min="0.3"
            max="999"
            step="0.01"
            value={scaleInput}
            onChange={(e) => setScaleInput(e.target.value)}
            onBlur={(e) => commitScale(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitScale(e.currentTarget.value);
            }}
          />
        </div>
      )}

      {isDragging && !resizeModeRef.current && (
        <span className="puzzle-wrapper__hint puzzle-wrapper__hint--drag">
          位置：{Math.round(parseFloat(displayLeft))}%, {Math.round(parseFloat(displayTop))}%
        </span>
      )}
    </div>
  );
}
