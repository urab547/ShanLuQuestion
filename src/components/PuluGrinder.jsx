import { useState } from 'react';
import './PuluGrinder.css';

/**
 * PuluGrinder —— 氆氇碎片研磨组件
 *
 * 全屏浮层（z-index:20），显示氆氇碎片外观 + 研磨按钮。
 * 研磨完成后保留已完成状态。
 */
export default function PuluGrinder({ onGrindComplete, onClose }) {
  const [ground, setGround] = useState(() => {
    try {
      return localStorage.getItem('shanglu_pulu_grind_done') === '1'
          || localStorage.getItem('pulu_grind_done') === '1';
    } catch {
      return false;
    }
  });

  const handleGrind = () => {
    setGround(true);
    try {
      localStorage.setItem('shanglu_pulu_grind_done', '1');
      localStorage.setItem('pulu_grind_done', '1');
    } catch {
      /* ignore */
    }
    onGrindComplete();
  };

  return (
    <div className="pulu-grinder" onClick={onClose}>
      <div className="pulu-grinder__mask" />
      <div
        className="pulu-grinder__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="pulu-grinder__close"
          onClick={onClose}
          aria-label="关闭"
        >
          ×
        </button>
        <div className="pulu-grinder__icon">🧵</div>
        <h2 className="pulu-grinder__title">氆氇碎片</h2>
        <p className="pulu-grinder__desc">
          {ground
            ? '碎片已被研成细腻的白色粉末——这便是骨白的真身。'
            : '一小块白色的氆氇，质地粗糙，边缘有磨损的痕迹。这是旦增亡妻生前穿过的衣物碎片。'}
        </p>
        {!ground && (
          <button className="pulu-grinder__btn" onClick={handleGrind}>
            开始研磨
          </button>
        )}
        {ground && (
          <p className="pulu-grinder__done">✓ 研磨完成</p>
        )}
      </div>
    </div>
  );
}
