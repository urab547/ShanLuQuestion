import { useState, useCallback, useEffect, useRef } from 'react';
import { createStuckTimer } from '../utils/stuckDetector';
import './SortablePuzzle.css';

/**
 * SortablePuzzle —— 通用点击交换排序组件
 *
 * 玩家点击选中一个石块，再点击另一个石块交换位置。
 * 每次交换后即时检查是否排列正确，无需提交按钮。
 * 完成后持久化到 localStorage，刷新不重置。
 *
 * Props:
 *   puzzleId      - 唯一标识，用于 localStorage 键
 *   items         - {id, label, emoji}[]  乱序初始排列
 *   correctOrder  - string[]  正确顺序的 id 数组
 *   onSolved      - () => void  完成回调（只触发一次）
 *   columns       - 每行列数（控制 flex-wrap 行为）
 *   slotGap       - 石块间距 px
 *   disabled      - 可选，锁定状态，所有石块不可交互
 *   className     - 可选，附加到根容器的 CSS 类名
 *   getItemStyle  - 可选，(item) => styleObject，自定义内联样式
 */
export default function SortablePuzzle({
  puzzleId,
  items,
  correctOrder,
  onSolved,
  columns = 6,
  slotGap = 6,
  disabled = false,
  className,
  getItemStyle,
  onStuck,
  npcHint,
}) {
  // 从 localStorage 读取"已完成"标记
  const [solved, setSolved] = useState(() => {
    try {
      return localStorage.getItem(`shanglu_puzzle_${puzzleId}_solved`) === '1'
          || localStorage.getItem(`puzzle_${puzzleId}_solved`) === '1';
    } catch {
      return false;
    }
  });

  // 当前排列顺序
  const [currentItems, setCurrentItems] = useState(() => {
    // 如果已完成，直接按正确顺序排列
    if (solved) {
      const map = new Map(items.map((i) => [i.id, i]));
      return correctOrder.map((id) => map.get(id)).filter(Boolean);
    }
    return items;
  });

  // 选中的石块 id
  const [selectedId, setSelectedId] = useState(null);

  // 完成通知是否已触发（防止重复调用 onSolved）
  const [notified, setNotified] = useState(solved);

  // ─── 卡关检测：仅时间 ───
  const stuckRef = useRef(null);
  useEffect(() => {
    if (!solved && !disabled && onStuck) {
      const timer = createStuckTimer(() => {
        if (onStuck) onStuck({ npc: npcHint });
      });
      stuckRef.current = timer;
      timer.start();
      return () => timer.stop();
    }
  }, [solved, disabled, onStuck, npcHint]);

  const handleStoneClick = useCallback(
    (clickedId) => {
      // 已完成不可操作
      if (solved || disabled) return;

      if (selectedId === null) {
        // 选中
        setSelectedId(clickedId);
      } else if (selectedId === clickedId) {
        // 取消选中
        setSelectedId(null);
      } else {
        // 交换
        setCurrentItems((prev) => {
          const next = [...prev];
          const idxA = next.findIndex((i) => i.id === selectedId);
          const idxB = next.findIndex((i) => i.id === clickedId);
          if (idxA === -1 || idxB === -1) return prev;
          [next[idxA], next[idxB]] = [next[idxB], next[idxA]];

          // 即时检查
          const isSolved = next.every((item, idx) => item.id === correctOrder[idx]);
          if (isSolved && !notified) {
            // 异步触发 onSolved，避免在 setState 中直接调用回调
            Promise.resolve().then(() => {
              setSolved(true);
              setNotified(true);
              try {
                localStorage.setItem(`shanglu_puzzle_${puzzleId}_solved`, '1');
                localStorage.setItem(`puzzle_${puzzleId}_solved`, '1');
              } catch {
                /* localStorage 不可用 */
              }
              onSolved();
            });
          }

          return next;
        });
        setSelectedId(null);
      }
    },
    [selectedId, solved, disabled, notified, correctOrder, puzzleId, onSolved],
  );

  // 渲染用数据：已完成时按正确顺序排列
  const displayItems = solved
    ? (() => {
        const map = new Map(items.map((i) => [i.id, i]));
        return correctOrder.map((id) => map.get(id)).filter(Boolean);
      })()
    : currentItems;

  return (
    <div
      className={`sortable-puzzle${className ? ' ' + className : ''}${disabled && !solved ? ' sortable-puzzle--disabled' : ''}`}
      style={{
        gap: `${slotGap}px`,
        maxWidth: solved ? undefined : `${columns * 44 + (columns - 1) * slotGap + 12}px`,
      }}
    >
      {displayItems.map((item, idx) => {
        const isSelected = item.id === selectedId;
        const isCorrect = solved || item.id === correctOrder[idx];

        let className = 'sortable-puzzle__stone';
        if (solved) className += ' sortable-puzzle__stone--solved';
        else if (isSelected) className += ' sortable-puzzle__stone--selected';
        else if (isCorrect && !solved)
          className += ' sortable-puzzle__stone--correct';

        return (
          <button
            key={item.id}
            className={className}
            onClick={() => handleStoneClick(item.id)}
            disabled={solved || disabled}
            style={getItemStyle ? getItemStyle(item) : undefined}
            aria-label={`石块 ${item.label}${isSelected ? '（已选中）' : ''}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
