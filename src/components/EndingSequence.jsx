import { useState, useEffect } from 'react';
import { audioManager } from '../utils/audioManager';
import './EndingSequence.css';

/**
 * EndingSequence —— 第五章留白结局演出
 *
 * 设计原则（来源：GDD 结局设计详细版）：
 * - 不做圆满解答，不展示"后来怎样"，无结语文字
 * - 画面如"日落"般自然暗化 → 完全安静的纯黑 → 标题缓缓浮现 → 完
 * - BGM 渐弱消散（"声音也上路了"），credits 阶段完全安静
 *
 * phase 0: 画面渐暗（4s）
 * phase 1: 纯黑静默（4s）
 * phase 2: 标题浮现（4s）
 * phase 3: 「— 完 —」+ 可点击返回
 */
export default function EndingSequence({ onFinish }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // BGM 渐弱消散
    try { audioManager.stopBgm?.(); } catch { /* ignore */ }
    const t1 = setTimeout(() => setPhase(1), 4000);
    const t2 = setTimeout(() => setPhase(2), 8000);
    const t3 = setTimeout(() => setPhase(3), 12000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className={`ending ending--phase${phase}`}
      onClick={phase >= 3 ? onFinish : undefined}
    >
      <div className="ending__title">山麓之问</div>
      <div className="ending__end-mark">— 完 —</div>
      <div className="ending__hint">点击任意处，回到村子</div>
    </div>
  );
}
