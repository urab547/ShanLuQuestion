import { useEffect } from 'react';
import './ScrollViewer.css';

/**
 * ScrollViewer —— 残卷全屏查看组件
 *
 * 独立于 DialogueOverlay，z-index: 20 高于对话层。
 * 卷轴样式，含木轴装饰和泛黄纸张纹理。
 */
export default function ScrollViewer({ scroll, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="scroll-viewer" onClick={onClose}>
      <div className="scroll-viewer__mask" />
      <div className="scroll-viewer__scroll" onClick={(e) => e.stopPropagation()}>
        <div className="scroll-viewer__rod scroll-viewer__rod--top" />
        <div className="scroll-viewer__paper">
          <button
            className="scroll-viewer__close"
            onClick={onClose}
            aria-label="关闭"
          >
            ×
          </button>
          <h2 className="scroll-viewer__title">
            <span className="scroll-viewer__emoji">{scroll.emoji}</span>
            {scroll.title}
          </h2>
          <p className="scroll-viewer__subtitle">{scroll.subtitle}</p>
          <div className="scroll-viewer__body">
            {scroll.paragraphs.map((p, i) => (
              <p key={i} className="scroll-viewer__paragraph">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="scroll-viewer__rod scroll-viewer__rod--bottom" />
      </div>
    </div>
  );
}
