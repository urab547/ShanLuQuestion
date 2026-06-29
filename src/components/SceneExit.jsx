import { useState, useRef, useCallback, useEffect } from 'react';
import './SceneExit.css';

/** 右键不做拖拽时的最小位移阈值 —— 低于此值视为"点击"触发缩放模式切换 */
const DRAG_THRESHOLD = 5;

/** 左键长按时间阈值（ms） */
const LONG_PRESS_MS = 500;

/**
 * SceneExit —— 场景出口导航按钮
 *
 * 箭头图标在上 + 文字标签在下，无边框无底色。
 *
 * 操作：
 * - 左键短按（< 500ms）→ 跳转场景 / 触发锁定对话
 * - 左键长按（>= 500ms） → 箭头顺时针旋转 90°
 * - 右键拖拽（非缩放模式）→ 移动位置
 * - 右键点击（无位移） → 切换缩放模式
 * - 缩放模式下右键拖拽 → 所有出口按钮同步缩放
 *
 * 所有出口按钮共享同一个缩放倍数。
 */
export default function SceneExit({
  exit,
  sceneId,
  onClick,
  sharedScale = 1,
  onScaleChange,
  onDragEnd,
  onRotate,
  customPosition,
  customRotation = 0,
}) {
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
  const [scaleInput, setScaleInput] = useState(sharedScale.toFixed(2));
  useEffect(() => { setScaleInput(sharedScale.toFixed(2)); }, [sharedScale]);
  const commitScale = useCallback(
    (inputVal) => {
      const parsed = parseFloat(inputVal);
      if (!isNaN(parsed) && isFinite(parsed) && parsed >= 0.3) {
        const rounded = Math.round(parsed * 100) / 100;
        onScaleChange?.(rounded);
        setScaleInput(rounded.toFixed(2));
      } else {
        setScaleInput(sharedScale.toFixed(2));
      }
    },
    [onScaleChange, sharedScale],
  );

  // ── 拖拽 / 缩放拖拽状态 ──
  const [dragPos, setDragPos] = useState(null);
  const [dragScale, setDragScale] = useState(null);
  const dragStartRef = useRef(null);
  const isDragging = dragPos !== null || dragScale !== null;

  // ── 左键长按旋转 ──
  const longPressRef = useRef(null);
  const didRotateRef = useRef(false);

  const position = useRef(customPosition);
  position.current = customPosition;
  const displayPosition = dragPos || customPosition;
  const displayScale = dragScale ?? sharedScale;
  const displayRotation = customRotation ?? 0;

  const getSceneRect = useCallback(() => {
    const el = document.querySelector('.scene');
    return el ? el.getBoundingClientRect() : null;
  }, []);

  // ── 鼠标事件 ──
  const handleMouseDown = useCallback(
    (e) => {
      if (e.button === 0) {
        // 左键：缩放/拖拽模式下不响应交互
        if (isResizeMode || resizeModeRef.current) return;
        // 启动长按计时器
        didRotateRef.current = false;
        longPressRef.current = setTimeout(() => {
          didRotateRef.current = true;
          const newRotation = ((customRotation ?? 0) + 90) % 360;
          onRotate?.(sceneId, exit.target, newRotation);
        }, LONG_PRESS_MS);
        return;
      }

      if (e.button !== 2) return;
      e.preventDefault();
      e.stopPropagation();

      const rect = getSceneRect();
      if (!rect) return;

      const currentTop = parseFloat(
        dragPos?.top ?? position.current?.top ?? '50%',
      );
      const currentLeft = parseFloat(
        dragPos?.left ?? position.current?.left ?? '50%',
      );

      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startLeft: currentLeft,
        startTop: currentTop,
        startScale: sharedScale,
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
          onScaleChange?.(Math.round(finalScale * 100) / 100);
        } else {
          const finalLeft = ds.startLeft + (dx / ds.containerW) * 100;
          const finalTop = ds.startTop + (dy / ds.containerH) * 100;
          onDragEnd?.(sceneId, exit.target, {
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
    [
      dragPos,
      exit.target,
      sceneId,
      sharedScale,
      customRotation,
      onScaleChange,
      onDragEnd,
      onRotate,
      toggleResizeMode,
      getSceneRect,
      isResizeMode,
    ],
  );

  // ── 全局 mouseup 兜底（左键抬起时清除长按计时器 / 执行点击）──
  useEffect(() => {
    const handleGlobalMouseUp = (e) => {
      if (e.button !== 0) return;
      if (longPressRef.current) {
        clearTimeout(longPressRef.current);
        longPressRef.current = null;
      }
      // 非拖拽、非缩放模式、未旋转 → 视为点击
      if (!didRotateRef.current && !isDragging && !isResizeMode) {
        // 只有鼠标在同一元素上抬起才算
        return; // onClick 由 React 自己处理
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging, isResizeMode]);

  const handleClick = useCallback(
    (e) => {
      // 缩放模式 / 拖拽中 / 刚旋转过 → 不触发点击
      if (isDragging || isResizeMode || didRotateRef.current) return;
      onClick?.();
    },
    [isDragging, isResizeMode, onClick],
  );

  return (
    <div
      className={
        'scene-exit'
        + (isDragging && !resizeModeRef.current ? ' scene-exit--dragging' : '')
        + (isResizeMode ? ' scene-exit--resizing' : '')
      }
      style={{
        top: displayPosition.top,
        left: displayPosition.left,
      }}
      role="button"
      tabIndex={0}
      aria-label={exit.label}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* 箭头图标 */}
      <div
        className="scene-exit__arrow"
        style={{ transform: `rotate(${displayRotation}deg)` }}
      >
        <span
          className="scene-exit__arrow-char"
          style={{ fontSize: `${36 * displayScale}px` }}
        >
          ↑
        </span>
      </div>

      {/* 文字标签 */}
      <span
        className="scene-exit__label"
        style={{ fontSize: `${13 * displayScale}px` }}
      >
        {exit.label}
      </span>

      {/* 缩放模式 UI */}
      {isResizeMode && !isDragging && (
        <div className="scene-exit__scale-ctrl">
          <span className="scene-exit__hint scene-exit__hint--resize">
            右键拖拽缩放
          </span>
          <input
            className="scene-exit__scale-input"
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
          <span className="scene-exit__hint scene-exit__hint--resize">x</span>
        </div>
      )}

      {/* 拖拽中提示 */}
      {isDragging && resizeModeRef.current && (
        <span className="scene-exit__hint" style={{ opacity: 1 }}>
          缩放：{displayScale.toFixed(2)}x
        </span>
      )}
      {isDragging && !resizeModeRef.current && (
        <span className="scene-exit__hint" style={{ opacity: 1 }}>
          拖拽中…
        </span>
      )}
    </div>
  );
}
