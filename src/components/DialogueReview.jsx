import { useState } from 'react';
import {
  loadDialogueHistory,
  NPC_LABELS,
  STAGE_LABELS,
} from '../data/dialogueHistory';
import './DialogueReview.css';

/** 所有可回顾的 NPC（固定顺序） */
const ALL_NPCS = ['danzeng', 'zhuoma', 'gesang', 'baima', 'renqing'];

/**
 * DialogueReview —— 对话历史回顾
 *
 * NPC 标签页切换，展示已记录的关键台词卡片。
 */
export default function DialogueReview({ onClose, talkedToNpcs }) {
  const history = loadDialogueHistory();
  const [activeNpc, setActiveNpc] = useState(() => {
    // 默认选中第一个有记录的 NPC
    const first = talkedToNpcs?.[0];
    return first || null;
  });

  const lines = activeNpc ? (history[activeNpc] || []) : [];

  return (
    <div className="dialogue-review__overlay" onClick={onClose}>
      <div
        className="dialogue-review__panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className="dialogue-review__header">
          <span className="dialogue-review__title">对话回顾</span>
          <button
            className="dialogue-review__close"
            onClick={onClose}
            aria-label="关闭回顾"
          >
            ×
          </button>
        </div>

        {/* NPC 标签页 */}
        <div className="dialogue-review__tabs">
          {ALL_NPCS.map((npcId) => {
            const hasTalked = talkedToNpcs?.includes(npcId);
            return (
              <button
                key={npcId}
                className={[
                  'dialogue-review__tab',
                  activeNpc === npcId && 'dialogue-review__tab--active',
                  !hasTalked && 'dialogue-review__tab--inactive',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  if (hasTalked) setActiveNpc(npcId);
                }}
                disabled={!hasTalked}
              >
                {NPC_LABELS[npcId]}
              </button>
            );
          })}
        </div>

        {/* 台词列表 */}
        <div className="dialogue-review__body">
          {!activeNpc ? (
            <p className="dialogue-review__empty">
              尚未与他深谈
            </p>
          ) : lines.length === 0 ? (
            <p className="dialogue-review__empty">
              暂无关键记录
            </p>
          ) : (
            lines.map((entry, i) => (
              <div key={i} className="dialogue-review__card">
                <div className="dialogue-review__card-meta">
                  <span className="dialogue-review__card-npc">
                    {NPC_LABELS[activeNpc]}
                  </span>
                  <span className="dialogue-review__card-stage">
                    {STAGE_LABELS[entry.stage] || entry.stage}
                  </span>
                </div>
                <p className="dialogue-review__card-text">{entry.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
