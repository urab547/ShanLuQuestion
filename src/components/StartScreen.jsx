import { useState, useEffect } from 'react';
import './StartScreen.css';

export default function StartScreen({ onStart, onContinue, onExit, hasSave }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="start-screen">
      {/* 天空 */}
      <div className="start-sky" />

      {/* 旋转的太阳和日轮 */}
      <div className="start-sun-group">
        <div className="start-sun-halo" />
        <div className="start-sun" />
      </div>

      {/* 山体剪影 */}
      <div className="start-mountain start-mountain--far" />
      <div className="start-mountain start-mountain--mid" />
      <div className="start-mountain start-mountain--near" />

      {/* 地面 */}
      <div className="start-ground" />

      {/* 小人背影 */}
      <div className="start-figure">
        <div className="figure-body" />
        <div className="figure-head" />
      </div>

      {/* 标题和按钮 */}
      <div className={`start-content${ready ? ' start-content--visible' : ''}`}>
        <h1 className="start-title">山 麓</h1>
        <p className="start-subtitle">措钦村的尘封往事</p>

        <div className="start-buttons">
          <button className="start-btn" onClick={onStart}>
            开始游戏
          </button>
          {hasSave && (
            <button className="start-btn" onClick={onContinue}>
              继续游戏
            </button>
          )}
          <button className="start-btn start-btn--secondary" onClick={onExit}>
            退出游戏
          </button>
        </div>
      </div>

      {/* 底部渐变遮罩 */}
      <div className="start-gradient" />
    </div>
  );
}
