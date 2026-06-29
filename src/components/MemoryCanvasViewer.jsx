import { useState, useEffect, useRef, useCallback } from 'react';
import './MemoryCanvasViewer.css';
import { TANGKA_IMAGES } from '../data/assets';

const FRAGMENTS = [
  { id: 'fragment_1', label: '度母手势', top: '3%', left: '5%', width: '38%', height: '30%', image: TANGKA_IMAGES.PHOTO_HAND },
  { id: 'fragment_2', label: '背景山形', top: '3%', left: '52%', width: '38%', height: '30%', image: TANGKA_IMAGES.PHOTO_MOUNTAIN, showLabelWhenOwned: false },
  { id: 'fragment_3', label: '度母左眼', top: '38%', left: '68%', width: '28%', height: '24%', image: TANGKA_IMAGES.PHOTO_EYE },
  { id: 'fragment_4', label: '角落藏文', top: '66%', left: '5%', width: '28%', height: '22%', image: TANGKA_IMAGES.PHOTO_SCRIPT },
  { id: 'fragment_5', label: '画面空白', top: '38%', left: '25%', width: '30%', height: '24%', image: TANGKA_IMAGES.PHOTO_MIRROR },
];

function getFragments() {
  try {
    const raw = localStorage.getItem('shanglu_memory_canvas_fragments') || localStorage.getItem('memory_canvas_fragments');
    return JSON.parse(raw || '{}');
  }
  catch { return {}; }
}

function setFragment(id, updates) {
  const frags = getFragments();
  frags[id] = { ...frags[id], ...updates };
  try { localStorage.setItem('shanglu_memory_canvas_fragments', JSON.stringify(frags)); } catch { /* ignore */ }
  return frags;
}

function isArea4Clicked() {
  try {
    return localStorage.getItem('shanglu_memory_canvas_clicked_area4') === '1'
        || localStorage.getItem('memory_canvas_clicked_area4') === '1';
  } catch { return false; }
}

// ── 布局持久化 ──
const LAYOUT_KEY = 'shanglu_memory_canvas_layouts';
function getLayouts() {
  try { return JSON.parse(localStorage.getItem(LAYOUT_KEY) || '{}'); }
  catch { return {}; }
}
function saveLayouts(layouts) {
  try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(layouts)); } catch {}
}
function clearLayouts() {
  try { localStorage.removeItem(LAYOUT_KEY); } catch {}
}

const DRAG_THRESHOLD = 5;

export default function MemoryCanvasViewer({ onClose, onInteract }) {
  const [frags, setFrags] = useState(getFragments);
  const [layouts, setLayouts] = useState(getLayouts);
  const canvasRef = useRef(null);

  const ownedCount = Object.values(frags).filter(f => f.owned).length;
  const readCount = Object.values(frags).filter(f => f.read).length;
  const firstFourAllRead = ['fragment_1','fragment_2','fragment_3','fragment_4'].every(id => frags[id]?.read);

  // 自动解锁碎片3
  useEffect(() => {
    const current = getFragments();
    if (current.fragment_1?.read && current.fragment_2?.read && !current.fragment_3?.owned) {
      const updated = setFragment('fragment_3', { owned: true, read: false });
      setFrags(updated);
      onInteract({ dialogueId: 'dlg_memory_fragment_3', label: '记忆画布' });
    }
  }, [onInteract]);

  // 自动解锁碎片5
  useEffect(() => {
    if (firstFourAllRead && !frags.fragment_5?.owned) {
      const updated = setFragment('fragment_5', { owned: true, read: false });
      setFrags(updated);
    }
  }, [firstFourAllRead, frags]);

  const handleClick = useCallback((fragId) => {
    const current = getFragments();

    // 碎片4特殊：未解锁时弹提示
    if (fragId === 'fragment_4' && !current.fragment_4?.owned) {
      if (!isArea4Clicked()) {
        try { localStorage.setItem('memory_canvas_clicked_area4', '1'); } catch { /* ignore */ }
      }
      onInteract({ dialogueId: 'dlg_memory_canvas_hint_area4', label: '记忆画布' });
      return;
    }

    // 碎片5未解锁：提示需先完成其他碎片
    if (fragId === 'fragment_5' && !current.fragment_5?.owned) {
      onInteract({ dialogueId: 'dlg_memory_canvas_hint_area5', label: '记忆画布' });
      return;
    }

    if (!current[fragId]?.owned) return;

    const dialogueMap = {
      fragment_1: 'dlg_memory_fragment_1',
      fragment_2: 'dlg_memory_fragment_2',
      fragment_3: 'dlg_memory_fragment_3',
      fragment_4: 'dlg_memory_fragment_4',
      fragment_5: 'dlg_memory_fragment_5',
    };
    const dialogueId = dialogueMap[fragId];
    if (!dialogueId) return;

    const updated = setFragment(fragId, { read: true });
    setFrags(updated);
    onInteract({ dialogueId, label: '记忆画布' });
  }, [onInteract]);

  const handleMove = useCallback((id, top, left) => {
    const updated = { ...getLayouts(), [id]: { ...getLayouts()[id], top, left } };
    saveLayouts(updated);
    setLayouts(updated);
  }, []);

  const handleResize = useCallback((id, width, height) => {
    const updated = { ...getLayouts(), [id]: { ...getLayouts()[id], width, height } };
    saveLayouts(updated);
    setLayouts(updated);
  }, []);

  const handleReset = useCallback(() => {
    clearLayouts();
    setLayouts({});
  }, []);

  return (
    <div className="mc-viewer">
      <div className="mc-viewer__mask" onClick={onClose} />
      <div className="mc-viewer__panel" onClick={(e) => e.stopPropagation()}>
        <div className="mc-viewer__header">
          <span className="mc-viewer__title">记忆画布</span>
          <div className="mc-viewer__header-actions">
            <button className="mc-viewer__reset" onClick={handleReset} title="重置布局">↺</button>
            <button className="mc-viewer__close" onClick={onClose}>×</button>
          </div>
        </div>

        <div className="mc-viewer__canvas" ref={canvasRef}>
          {FRAGMENTS.map((frag) => {
            const state = frags[frag.id];
            const custom = layouts[frag.id] || {};
            return (
              <MemoryFragment
                key={frag.id}
                frag={frag}
                state={state}
                customLayout={custom}
                containerRef={canvasRef}
                onMove={handleMove}
                onResize={handleResize}
                onClick={handleClick}
              />
            );
          })}
        </div>

        <div className="mc-viewer__info">
          <span>已收集 {ownedCount}/5 · 已解读 {readCount}/5</span>
          {firstFourAllRead && frags.fragment_5?.read && (
            <span className="mc-viewer__info-complete">全部解读完毕</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── 单个记忆碎片格子（支持拖拽移动 + 右键缩放） ──
function MemoryFragment({ frag, state, customLayout, containerRef, onMove, onResize, onClick }) {
  const [isResizeMode, setIsResizeMode] = useState(false);
  const resizeModeRef = useRef(false);
  const [dragPos, setDragPos] = useState(null);
  const [dragSize, setDragSize] = useState(null);
  const dragStartRef = useRef(null);

  const toggleResize = useCallback(() => {
    setIsResizeMode((prev) => {
      const next = !prev;
      resizeModeRef.current = next;
      return next;
    });
  }, []);

  const owned = state?.owned ?? false;
  const read = state?.read ?? false;
  const showLabel = owned && (frag.showLabelWhenOwned !== false || !frag.image);

  const isDragging = dragPos !== null || dragSize !== null;

  const top = dragPos?.top ?? customLayout.top ?? frag.top;
  const left = dragPos?.left ?? customLayout.left ?? frag.left;
  const width = dragSize?.width ?? customLayout.width ?? frag.width;
  const height = dragSize?.height ?? customLayout.height ?? frag.height;

  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 2) return;
      e.preventDefault();
      e.stopPropagation();

      const canvas = containerRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      const curTop = parseFloat(dragPos?.top ?? customLayout.top ?? frag.top);
      const curLeft = parseFloat(dragPos?.left ?? customLayout.left ?? frag.left);
      const curW = parseFloat(dragSize?.width ?? customLayout.width ?? frag.width);
      const curH = parseFloat(dragSize?.height ?? customLayout.height ?? frag.height);

      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startTop: curTop,
        startLeft: curLeft,
        startW: curW,
        startH: curH,
        canvasW: rect.width,
        canvasH: rect.height,
      };

      const onMouseMove = (ev) => {
        const ds = dragStartRef.current;
        if (!ds) return;
        const dx = ev.clientX - ds.startX;
        const dy = ev.clientY - ds.startY;

        if (resizeModeRef.current) {
          // 缩放：水平拖拽改变宽度，垂直拖拽改变高度
          const newW = Math.round(Math.max(10, Math.min(90, ds.startW + (dx / ds.canvasW) * 100)));
          const newH = Math.round(Math.max(10, Math.min(90, ds.startH + (dy / ds.canvasH) * 100)));
          setDragSize({ width: `${newW}%`, height: `${newH}%` });
        } else {
          // 移动
          const newLeft = Math.round(Math.max(0, Math.min(90, ds.startLeft + (dx / ds.canvasW) * 100)));
          const newTop = Math.round(Math.max(0, Math.min(90, ds.startTop + (dy / ds.canvasH) * 100)));
          setDragPos({ top: `${newTop}%`, left: `${newLeft}%` });
        }
      };

      const onMouseUp = (ev) => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        const ds = dragStartRef.current;
        if (!ds) return;
        const dx = ev.clientX - ds.startX;
        const dy = ev.clientY - ds.startY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < DRAG_THRESHOLD && !resizeModeRef.current) {
          // 无位移且非缩放模式 → 切换缩放模式
          toggleResize();
        } else if (resizeModeRef.current) {
          // 缩放拖拽结束
          const newW = Math.round(Math.max(10, Math.min(90, ds.startW + (dx / ds.canvasW) * 100)));
          const newH = Math.round(Math.max(10, Math.min(90, ds.startH + (dy / ds.canvasH) * 100)));
          onResize(frag.id, `${newW}%`, `${newH}%`);
        } else if (dist >= DRAG_THRESHOLD) {
          // 移动拖拽结束
          const newLeft = Math.round(Math.max(0, Math.min(90, ds.startLeft + (dx / ds.canvasW) * 100)));
          const newTop = Math.round(Math.max(0, Math.min(90, ds.startTop + (dy / ds.canvasH) * 100)));
          onMove(frag.id, `${newTop}%`, `${newLeft}%`);
        }

        setDragPos(null);
        setDragSize(null);
        dragStartRef.current = null;
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [containerRef, customLayout, dragPos, dragSize, frag, onMove, onResize, toggleResize],
  );

  const handleLeftClick = useCallback(
    (e) => {
      if (e.button !== 0) return;
      if (isDragging) return;
      onClick(frag.id);
    },
    [isDragging, onClick, frag.id],
  );

  const highlight = frag.id === 'fragment_5';

  return (
    <div
      className={
        'mc-region'
        + (owned ? ' mc-region--owned' : ' mc-region--locked')
        + (read ? ' mc-region--read' : '')
        + (highlight ? ' mc-region--center' : '')
        + (isDragging && !resizeModeRef.current ? ' mc-region--dragging' : '')
        + (isResizeMode ? ' mc-region--resize-mode' : '')
      }
      style={{
        top,
        left,
        width,
        height,
        zIndex: highlight ? 5 : (isDragging ? 10 : 1),
      }}
      onClick={handleLeftClick}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="mc-region__image">
        {owned && frag.image ? (
          <img src={frag.image} alt={frag.label} />
        ) : null}
        {!owned && <span className="mc-region__placeholder">?</span>}
        {read && <span className="mc-region__check">✓</span>}
      </div>
      {showLabel && (
        <span className="mc-region__label">{frag.label}</span>
      )}

      {/* 缩放模式 */}
      {isResizeMode && !isDragging && (
        <div className="mc-region__scale-ctrl">
          <span className="mc-region__hint mc-region__hint--resize">
            右键拖拽缩放 · {parseFloat(width).toFixed(0)}% × {parseFloat(height).toFixed(0)}%
          </span>
        </div>
      )}
      {/* 拖拽中提示 */}
      {isDragging && !resizeModeRef.current && (
        <span className="mc-region__hint mc-region__hint--drag">拖拽中…</span>
      )}
      {/* 缩放拖拽中提示 */}
      {isDragging && resizeModeRef.current && (
        <span className="mc-region__hint mc-region__hint--drag">
          缩放：{parseFloat(width).toFixed(0)}% × {parseFloat(height).toFixed(0)}%
        </span>
      )}
    </div>
  );
}
