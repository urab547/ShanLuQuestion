import { PIGMENTS } from '../data/pigments';
import { TANGKA_IMAGES } from '../data/assets';
import './ThangkaReplicaViewer.css';

const GRID_SIZE = 16;

// 与 ThangkaWorkshop 保持一致的百分比区域定义
const REPLICA_REGIONS = [
  { id: 'background', label: '背景',   top: '0%',  height: '100%', left: '0%',  width: '100%', zIndex: 0 },
  { id: 'protector',  label: '护法',   top: '10%', height: '15%',  left: '21.875%', width: '56.25%', zIndex: 2 },
  { id: 'face',       label: '面部',   top: '25%', height: '10%',  left: '36.67%', width: '26.67%', zIndex: 5 },
  { id: 'robe',       label: '衣纹',   top: '35%', height: '35%',  left: '12.5%',  width: '75%',   zIndex: 3 },
  { id: 'lotus',      label: '莲花座', top: '70%', height: '20%',  left: '25%', width: '50%', zIndex: 4 },
];

/**
 * ThangkaReplicaViewer —— 唐卡复制品查看器
 *
 * 读取 localStorage 中的 thangka_replica 和 shanglu_thangka_draft，
 * 按度母唐卡真实比例展示完成的五色区域 + 品质评价。
 */
export default function ThangkaReplicaViewer({ onClose }) {
  let replica = null;
  try {
    const raw = localStorage.getItem('shanglu_thangka_replica') || localStorage.getItem('thangka_replica');
    replica = raw ? JSON.parse(raw) : null;
  } catch { /* ignore */ }

  let grid = null;
  let regionColors = null;
  try {
    const raw = localStorage.getItem('shanglu_thangka_draft') || localStorage.getItem('thangka_draft');
    const draft = raw ? JSON.parse(raw) : null;
    if (draft?.regionColors && Object.keys(draft.regionColors).length > 0) {
      regionColors = draft.regionColors;
    } else if (draft?.grid) {
      grid = draft.grid;
    }
  } catch { /* ignore */ }

  const quality = replica?.quality || '基本完成';
  const choice = replica?.step3Choice || '?';

  const qualityDescriptions = {
    '深刻理解': '你理解了度母左眼中那份深沉的思念——那是对逝去之人的凝望，是画师用整整一个月画出的最后一笔。',
    '基本完成': '唐卡已然完成，但度母左眼中的深意，或许还需要更多时间去体会。',
  };

  const choiceLabels = { A: '对山川自然的敬畏', B: '对亡妻的思念', C: '对技艺传承的执念' };

  return (
    <div className="replica-viewer">
      <div className="replica-viewer__mask" onClick={onClose} />
      <div className="replica-viewer__panel" onClick={(e) => e.stopPropagation()}>
        <div className="replica-viewer__header">
          <span className="replica-viewer__title">唐卡复制品</span>
          <button className="replica-viewer__close" onClick={onClose}>×</button>
        </div>

        <div className="replica-viewer__canvas">
          {replica?.completed ? (
            /* 成品 — 精制唐卡 PNG */
            <img
              src={TANGKA_IMAGES.THANGKA_REFINED}
              alt="度母唐卡复制品"
              className="replica-viewer__refined-img"
            />
          ) : regionColors ? (
            /* 百分比区域渲染 */
            REPLICA_REGIONS.map((region) => {
              const pigmentId = regionColors[region.id];
              const color = pigmentId ? PIGMENTS[pigmentId]?.color : null;
              return (
                <div
                  key={region.id}
                  className="replica-viewer__region"
                  style={{
                    position: 'absolute',
                    top: region.top,
                    height: region.height,
                    left: region.left,
                    width: region.width,
                    zIndex: region.zIndex,
                    backgroundColor: color || 'transparent',
                  }}
                />
              );
            })
          ) : grid ? (
            /* 旧版 16×16 网格回退 */
            grid.map((row, ri) => (
              <div key={ri} className="replica-viewer__row">
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    className="replica-viewer__cell"
                    style={{
                      backgroundColor: cell ? PIGMENTS[cell]?.color || '#888' : 'transparent',
                    }}
                  />
                ))}
              </div>
            ))
          ) : (
            <p className="replica-viewer__empty">未找到唐卡数据</p>
          )}
        </div>

        <div className="replica-viewer__info">
          <div className={`replica-viewer__quality replica-viewer__quality--${quality === '深刻理解' ? 'deep' : 'basic'}`}>
            <span className="replica-viewer__quality-icon">
              {quality === '深刻理解' ? '\uD83C\uDF1F' : '\u2728'}
            </span>
            <span className="replica-viewer__quality-label">品质：{quality}</span>
          </div>
          <p className="replica-viewer__description">{qualityDescriptions[quality]}</p>
          <p className="replica-viewer__choice-note">你的判断：{choiceLabels[choice] || '未选择'}</p>
        </div>
      </div>
    </div>
  );
}
