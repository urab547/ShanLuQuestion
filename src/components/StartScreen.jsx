import { useState, useEffect } from 'react';
import './StartScreen.css';

const BASE = '/封面final/';
const REF_W = 2732;
const REF_H = 1534;
const TARGET_W = 1280;
const TARGET_H = 720;

// 固定缩放：2732×1534 → 1280×720
const SCALE = Math.min(TARGET_W / REF_W, TARGET_H / REF_H);

/*
 * 按钮以中心坐标定位（相对 2732×1534 参考画布）
 * normal 和 light 在同一容器内，绝对定位覆盖，中心自动相同
 *
 * 中心坐标：
 *   3 按钮（有存档）：start(1366,1135) continue(1366,1246) end(1366,1357)
 *   2 按钮（无存档）：start(1366,1246)                    end(1366,1357)
 */
const CX = REF_W / 2;
const BTN = {
  start:    { nw: 282, nh: 75,  lw: 366, lh: 160, cy3: 958,  cy2: 1136, label: '开始游戏' },
  continue: { nw: 129, nh: 75,  lw: 213, lh: 158, cy3: 1137,            label: '继续游戏' },
  end:      { nw: 130, nh: 74,  lw: 213, lh: 159, cy3: 1315, cy2: 1315, label: '退出游戏' },
};

/**
 * StartScreen —— 游戏开始界面
 *
 * Props:
 * - onStart()      开始新游戏（清档 + 从头开始）
 * - onContinue()   继续存档（读档 + 进入上次场景）
 * - onExit()       退出（关闭窗口）
 * - hasSave        是否有存档（决定是否显示"继续"按钮）
 */
export default function StartScreen({ onStart, onContinue, onExit, hasSave }) {
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setInteractive(true), 2200); // 1s delay + 1.2s slide-up
    return () => clearTimeout(t);
  }, []);

  const btnSrc = (type, isLight) =>
    `${BASE}${isLight ? `btn_light_${type}` : `btn_${type}`}.png`;

  /* 根据有无存档决定按钮列表及 Y 坐标 */
  const keys = hasSave ? ['start', 'continue', 'end'] : ['start', 'end'];
  const handlers = { start: onStart, continue: onContinue, end: onExit };

  return (
    <div className="start-screen">
      <div
        className="start-canvas"
        style={{ '--scale': SCALE }}
      >
        {/* 背景：bg1(底) → bgsun(中) → bgmountain(顶) */}
        <img className="bg-base" src={`${BASE}bg_1.png`} alt="" draggable={false} />
        <img className="bg-sun" src={`${BASE}bg_sun.png`} alt="" draggable={false} />
        <img className="bg-mountain" src={`${BASE}bg_mountain.png`} alt="" draggable={false} />

        {/* 汉字标题 */}
        <img
          className="title-img title-cn"
          src={`${BASE}title.png`}
          alt="山麓"
          draggable={false}
        />

        {/* 藏文标题（汉字之下） */}
        <img
          className="title-img title-zang"
          src={`${BASE}title_zangwen.png`}
          alt=""
          draggable={false}
        />

        {/* 按钮：容器以 light 尺寸为准，normal 居中，两者中心重合 */}
        <div className={`start-btns${interactive ? ' start-btns--active' : ''}`}>
        {keys.map((key) => {
          const b = BTN[key];
          const cy = hasSave ? b.cy3 : b.cy2;
          return (
            <button
              key={key}
              className="start-btn"
              style={{ left: CX, top: cy, width: b.lw, height: b.lh }}
              onClick={handlers[key]}
            >
              <img className="btn-normal" src={btnSrc(key, false)} alt={b.label} draggable={false} />
              <img className="btn-light" src={btnSrc(key, true)} alt="" draggable={false} />
            </button>
          );
        })}
        </div>
      </div>

      {/* 底部渐变遮罩：1s 后从下往上滑入 */}
      <div className="start-gradient" />
    </div>
  );
}
