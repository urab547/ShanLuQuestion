import { SCROLLS } from '../data/scrolls';
import { PIGMENTS } from '../data/pigments';
import './InventoryPanel.css';

/**
 * InventoryPanel —— 道具栏展开浮层
 *
 * 从右上角 📜 按钮下方展开，列出已收集残卷。
 * 空状态显示提示文字，有残卷时每项可点击查看。
 */
export default function InventoryPanel({ inventory, onViewItem, onClose, pigments, onViewPigment }) {
  const scrolls = inventory.map((id) => SCROLLS[id]).filter(Boolean);

  return (
    <div className="inventory-panel__overlay" onClick={onClose}>
      <div className="inventory-panel" onClick={(e) => e.stopPropagation()}>
        <div className="inventory-panel__header">
          <span className="inventory-panel__title">道具栏</span>
          <button
            className="inventory-panel__close"
            onClick={onClose}
            aria-label="关闭"
          >
            ×
          </button>
        </div>
        {scrolls.length === 0 ? (
          <p className="inventory-panel__empty">尚未收集任何残卷</p>
        ) : (
          <ul className="inventory-panel__list">
            {scrolls.map((s) => (
              <li key={s.id}>
                <button
                  className="inventory-panel__item"
                  onClick={() => onViewItem(s.id)}
                >
                  <span className="inventory-panel__item-icon">{s.emoji}</span>
                  <span className="inventory-panel__item-info">
                    <span className="inventory-panel__item-name">{s.title}</span>
                    <span className="inventory-panel__item-sub">{s.subtitle}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* 颜料分区 */}
        <div className="inventory-panel__section-title">颜料</div>
        <ul className="inventory-panel__list inventory-panel__list--pigment">
          {Object.values(PIGMENTS).map((p) => {
            const st = pigments?.[p.id] ?? { rawMaterialFound: false, recipeUnderstood: false };
            const craftable = st.rawMaterialFound && st.recipeUnderstood;
            const scroll4Collected = inventory?.includes('scroll_page_4') ?? false;
            const hasProgress = p.id === 'gubai_white'
              ? (scroll4Collected || st.rawMaterialFound || st.recipeUnderstood)
              : (st.rawMaterialFound || st.recipeUnderstood);
            const statusText = craftable
              ? '已就绪'
              : st.recipeUnderstood
              ? '制法已解·待采集'
              : st.rawMaterialFound
              ? '已采集·待学制法'
              : (p.id === 'gubai_white' && scroll4Collected ? '残卷已读' : '未发现');
            const clickable = hasProgress;
            return (
              <li key={p.id}>
                <button
                  className={`inventory-panel__pigment${clickable ? '' : ' inventory-panel__pigment--locked'}`}
                  disabled={!clickable}
                  onClick={() => clickable && onViewPigment(p.id)}
                >
                  <span
                    className="inventory-panel__pigment-swatch"
                    style={{ backgroundColor: p.color, opacity: hasProgress ? 1 : 0.3 }}
                  />
                  <span className="inventory-panel__item-info">
                    <span className="inventory-panel__item-name">{p.label}</span>
                    <span className="inventory-panel__item-sub">{statusText}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* 氆氇碎片（骨白专属道具） */}
        {inventory?.includes('pulu_fragment') && (() => {
          const gubaiRawFound = pigments?.gubai_white?.rawMaterialFound ?? false;
          return (
            <>
              <div className="inventory-panel__section-title">特殊道具</div>
              <ul className="inventory-panel__list">
                <li>
                  <button
                    className="inventory-panel__item"
                    onClick={() => onViewItem({ type: 'pulu' })}
                  >
                    <span className="inventory-panel__item-icon">🧵</span>
                    <span className="inventory-panel__item-info">
                      <span className="inventory-panel__item-name">氆氇碎片</span>
                      <span className="inventory-panel__item-sub">
                        {gubaiRawFound ? '已研磨' : '待研磨'}
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
            </>
          );
        })()}

        {/* 唐卡复制品 */}
        {inventory?.includes('thangka_replica') && (() => {
          let replica = null;
          try {
            const raw = localStorage.getItem('shanglu_thangka_replica') || localStorage.getItem('thangka_replica');
            replica = raw ? JSON.parse(raw) : null;
          } catch { /* ignore */ }
          const qualityLabel = replica?.quality === '深刻理解' ? '深刻理解' : '基本完成';
          return (
            <>
              <div className="inventory-panel__section-title">完成作品</div>
              <ul className="inventory-panel__list">
                <li>
                  <button
                    className="inventory-panel__item"
                    onClick={() => onViewItem({ type: 'thangka_replica' })}
                  >
                    <span className="inventory-panel__item-icon">🖼️</span>
                    <span className="inventory-panel__item-info">
                      <span className="inventory-panel__item-name">唐卡复制品</span>
                      <span className="inventory-panel__item-sub">品质：{qualityLabel}</span>
                    </span>
                  </button>
                </li>
              </ul>
            </>
          );
        })()}

        {/* 记忆画布 */}
        {inventory?.includes('memory_canvas') && (() => {
          const frags = (() => {
            try {
              const raw = localStorage.getItem('shanglu_memory_canvas_fragments') || localStorage.getItem('memory_canvas_fragments');
              return JSON.parse(raw || '{}');
            }
            catch { return {}; }
          })();
          const ownedCount = Object.values(frags).filter(f => f.owned).length;
          const readCount = Object.values(frags).filter(f => f.read).length;
          return (
            <>
              <div className="inventory-panel__section-title">记忆画布</div>
              <ul className="inventory-panel__list">
                <li>
                  <button
                    className="inventory-panel__item"
                    onClick={() => onViewItem({ type: 'memory_canvas' })}
                  >
                    <span className="inventory-panel__item-icon">🧩</span>
                    <span className="inventory-panel__item-info">
                      <span className="inventory-panel__item-name">记忆画布</span>
                      <span className="inventory-panel__item-sub">
                        已收集 {ownedCount}/5 · 已解读 {readCount}/5
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
            </>
          );
        })()}

        {/* 唐卡绘制入口 */}
        {(() => {
          const craftableCount = Object.values(PIGMENTS).filter((p) => {
            const st = pigments?.[p.id] ?? {};
            return st.rawMaterialFound && st.recipeUnderstood;
          }).length;
          if (craftableCount < 1) return null;
          return (
            <div className="inventory-panel__footer">
              <button
                className="inventory-panel__thangka-btn"
                onClick={() => onViewItem({ type: 'thangka' })}
              >
                开始绘制 ({craftableCount} 种颜料可用)
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
