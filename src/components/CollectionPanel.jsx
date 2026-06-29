import { useState } from 'react';
import { SCROLLS } from '../data/scrolls';
import { PIGMENTS } from '../data/pigments';
import './CollectionPanel.css';

const TABS = [
  { id: 'scrolls', label: '残卷' },
  { id: 'pigments', label: '颜料' },
  { id: 'special', label: '特殊物品' },
];

/**
 * CollectionPanel —— 物品收藏面板
 *
 * 三个标签页：
 * - 残卷：四张卡片横排，已收集可点击，未获得灰色锁定
 * - 颜料：五种颜料色块排列，≥3可制作时显示"开始绘制唐卡"按钮
 * - 特殊物品：仅显示已获得的物品
 */
export default function CollectionPanel({
  inventory,
  pigments,
  onViewScroll,
  onViewPigment,
  onViewPulu,
  onViewThangkaReplica,
  onViewSpecialItem,
  onStartThangka,
  onClose,
}) {
  const [tab, setTab] = useState('scrolls');

  // ---- 残卷数据 ----
  const scrollEntries = Object.values(SCROLLS);
  const collectedScrollIds = new Set(inventory ?? []);

  // ---- 颜料数据 ----
  const pigmentEntries = Object.values(PIGMENTS);
  const craftablePigments = pigmentEntries.filter((p) => {
    const st = pigments?.[p.id] ?? {};
    return st.rawMaterialFound && st.recipeUnderstood;
  });
  const craftableCount = craftablePigments.length;

  // ---- 特殊物品 ----
  const specialItems = [];
  if (inventory?.includes('pulu_fragment')) {
    const puluDone = pigments?.gubai_white?.rawMaterialFound ?? false;
    specialItems.push({
      id: 'pulu_fragment',
      icon: '🧵',
      label: '氆氇碎片',
      desc: puluDone ? '已研磨为骨白粉末' : '待研磨',
      onClick: puluDone ? (() => onViewSpecialItem('pulu_fragment')) : onViewPulu,
    });
  }
  if (inventory?.includes('thangka_replica')) {
    specialItems.push({
      id: 'thangka_replica',
      icon: '🖼️',
      label: '唐卡复刻品',
      desc: '可点击查看',
      onClick: onViewThangkaReplica,
    });
  }
  // 仪式植物
  if (inventory?.includes('song_bai')) {
    specialItems.push({
      id: 'song_bai',
      icon: '🌲',
      label: '松柏',
      desc: '煨桑仪式材料',
      onClick: () => onViewSpecialItem('song_bai'),
    });
  }
  if (inventory?.includes('du_song')) {
    specialItems.push({
      id: 'du_song',
      icon: '🌿',
      label: '杜松',
      desc: '煨桑仪式材料',
      onClick: () => onViewSpecialItem('du_song'),
    });
  }
  if (inventory?.includes('ye_cao')) {
    specialItems.push({
      id: 'ye_cao',
      icon: '🌾',
      label: '高原野草',
      desc: '煨桑仪式材料',
      onClick: () => onViewSpecialItem('ye_cao'),
    });
  }

  return (
    <div className="collection-panel__overlay" onClick={onClose}>
      <div className="collection-panel" onClick={(e) => e.stopPropagation()}>
        {/* 标题栏 */}
        <div className="collection-panel__header">
          <span className="collection-panel__title">物品收藏</span>
          <button className="collection-panel__close" onClick={onClose}>×</button>
        </div>

        {/* 标签页 */}
        <div className="collection-panel__tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`collection-panel__tab${tab === t.id ? ' collection-panel__tab--active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 内容区 */}
        <div className="collection-panel__body">

          {/* ======== 残卷标签页 ======== */}
          {tab === 'scrolls' && (
            <div className="collection-panel__scrolls">
              {scrollEntries.length === 0 ? (
                <p className="collection-panel__empty">暂无残卷</p>
              ) : (
                scrollEntries.map((s) => {
                  const collected = collectedScrollIds.has(s.id);
                  return (
                    <button
                      key={s.id}
                      className={`collection-panel__scroll-card${collected ? ' collection-panel__scroll-card--collected' : ''}`}
                      disabled={!collected}
                      onClick={() => collected && onViewScroll(s.id)}
                    >
                      <span className="collection-panel__scroll-emoji">{s.emoji}</span>
                      <span className="collection-panel__scroll-name">
                        {collected ? s.title : s.title.replace('残卷·', '？？？·')}
                      </span>
                      <span className="collection-panel__scroll-sub">
                        {collected ? s.subtitle : '尚未获得'}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          )}

          {/* ======== 颜料标签页 ======== */}
          {tab === 'pigments' && (
            <div className="collection-panel__pigments">
              <div className="collection-panel__pigments-grid">
                {pigmentEntries.map((p) => {
                  const st = pigments?.[p.id] ?? {};
                  const hasRaw = st.rawMaterialFound ?? false;
                  const hasRecipe = st.recipeUnderstood ?? false;
                  const craftable = hasRaw && hasRecipe;

                  let statusText = '未发现';
                  let statusClass = '';
                  if (craftable) {
                    statusText = '已就绪';
                    statusClass = ' collection-panel__pigment-status--craftable';
                  } else if (hasRaw) {
                    statusText = '已采集';
                    statusClass = ' collection-panel__pigment-status--found';
                  } else if (hasRecipe) {
                    statusText = '已学制法';
                    statusClass = ' collection-panel__pigment-status--recipe';
                  }

                  return (
                    <button
                      key={p.id}
                      className={`collection-panel__pigment${craftable || hasRaw || hasRecipe ? '' : ' collection-panel__pigment--locked'}`}
                      disabled={!craftable && !hasRaw && !hasRecipe}
                      onClick={() => onViewPigment(p.id)}
                    >
                      <span
                        className="collection-panel__pigment-dot"
                        style={{
                          backgroundColor: craftable || hasRaw ? p.color : 'rgba(255,255,255,0.12)',
                        }}
                      />
                      <span className="collection-panel__pigment-label">{p.label}</span>
                      <span className={`collection-panel__pigment-status${statusClass}`}>
                        {statusText}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 唐卡绘制入口 */}
              {craftableCount >= 3 && (
                <div className="collection-panel__footer">
                  <button
                    className="collection-panel__thangka-btn"
                    onClick={() => { onClose(); onStartThangka(); }}
                  >
                    开始绘制唐卡（{craftableCount} 种颜料可用）
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ======== 特殊物品标签页 ======== */}
          {tab === 'special' && (
            <div className="collection-panel__special">
              {specialItems.length === 0 ? (
                <p className="collection-panel__empty">暂无特殊物品</p>
              ) : (
                specialItems.map((item) => (
                  <button
                    key={item.id}
                    className="collection-panel__special-item"
                    disabled={!item.onClick}
                    onClick={item.onClick}
                  >
                    <span className="collection-panel__special-icon">{item.icon}</span>
                    <div className="collection-panel__special-info">
                      <span className="collection-panel__special-name">{item.label}</span>
                      <span className="collection-panel__special-desc">{item.desc}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
