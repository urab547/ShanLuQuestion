import { useEffect } from 'react';
import './PigmentViewer.css';

/**
 * PigmentViewer —— 颜料详情查看组件
 *
 * 全屏卷轴样式（z-index:20），与 ScrollViewer 同级。
 * 展示颜料色块、描述、制法、三状态徽章。
 */
export default function PigmentViewer({ pigment, pigmentState, onClose, canCompareRecipe, onCompareRecipe, danzengRevealed }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const st = pigmentState ?? { rawMaterialFound: false, recipeUnderstood: false };
  const craftable = st.rawMaterialFound && st.recipeUnderstood;
  const recipeText = st.recipeUnderstood
    ? pigment.recipe
    : '?? 制法未解 ??';

  return (
    <div className="pigment-viewer" onClick={onClose}>
      <div className="pigment-viewer__mask" />
      <div className="pigment-viewer__panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="pigment-viewer__close"
          onClick={onClose}
          aria-label="关闭"
        >
          ×
        </button>

        <div className="pigment-viewer__header">
          <span
            className="pigment-viewer__swatch"
            style={{ backgroundColor: pigment.color }}
          />
          <div className="pigment-viewer__titles">
            <h2 className="pigment-viewer__title">{pigment.label}</h2>
            <p className="pigment-viewer__subtitle">颜料图鉴</p>
          </div>
        </div>

        <div className="pigment-viewer__body">
          <section className="pigment-viewer__section">
            <h3 className="pigment-viewer__section-title">描述</h3>
            <p className="pigment-viewer__text">
              {pigment.description || '（尚未知晓此颜料的来历）'}
            </p>
          </section>

          <section className="pigment-viewer__section">
            <h3 className="pigment-viewer__section-title">制法</h3>
            {pigment.id === 'gubai_white' ? (
              <p className={`pigment-viewer__text${st.recipeUnderstood ? '' : ' pigment-viewer__text--locked'}`}>
                「此色不可强求，需以至亲之念研磨，色方正。」
                <span className="pigment-viewer__source">——残卷第四页</span>
              </p>
            ) : (
              <p
                className={`pigment-viewer__text${st.recipeUnderstood ? '' : ' pigment-viewer__text--locked'}`}
              >
                {recipeText}
              </p>
            )}
          </section>

          {/* 骨白来历区 */}
          {pigment.id === 'gubai_white' && (
            <section className="pigment-viewer__section">
              <h3 className="pigment-viewer__section-title">来历</h3>
              <p className={`pigment-viewer__text${danzengRevealed ? '' : ' pigment-viewer__text--locked'}`}>
                {danzengRevealed
                  ? '旦增亡妻白色氆氇所研——此色中，有她。'
                  : '未知'}
              </p>
            </section>
          )}

          {st.rawMaterialFound && !st.recipeUnderstood && canCompareRecipe && (
            <button
              className="pigment-viewer__compare-btn"
              onClick={onCompareRecipe}
            >
              对照药方
            </button>
          )}

          <section className="pigment-viewer__status">
            <div
              className={`pigment-viewer__badge${st.rawMaterialFound ? ' pigment-viewer__badge--on' : ''}`}
            >
              {st.rawMaterialFound ? '✓' : '○'} 原材料
            </div>
            <div
              className={`pigment-viewer__badge${st.recipeUnderstood ? ' pigment-viewer__badge--on' : ''}`}
            >
              {st.recipeUnderstood ? '✓' : '○'} 制法
            </div>
            <div
              className={`pigment-viewer__badge${craftable ? ' pigment-viewer__badge--craftable' : ''}`}
            >
              {craftable ? '✓ 已就绪' : '未就绪'}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
