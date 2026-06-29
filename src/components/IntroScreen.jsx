import { useState, useEffect, useCallback } from 'react';
import './IntroScreen.css';

const PARAGRAPHS = [
  '我叫沈默言，主修传统工艺。祖父离世后，我带着他遗留的笔记来到措钦村。',
  '二十年前祖父在此陪伴画师旦增，耗时四十九天见证他绘出《度母护法图》；十二年前祖父再来，村子与画师尽数封藏心事，不久后祖父便撒手人寰。',
  '我没有明确目的，只为循着笔记，看一看祖父牵挂半生的人与村庄。村口玛尼堆、上锁的经堂、紧闭的院门处处透着沉寂，我隐约察觉，这片土地藏着一段尘封十二年的往事。',
];

/**
 * IntroScreen —— 新游戏开场叙事过渡
 *
 * Props:
 * - onComplete  叙事结束后的回调，触发时组件已开始退场动画
 */
export default function IntroScreen({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  // 逐段淡入
  useEffect(() => {
    if (visibleCount >= PARAGRAPHS.length) {
      // 所有段落出现后，等待一会儿再显示"点击继续"
      const timer = setTimeout(() => setAllDone(true), 1000);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, visibleCount === 0 ? 800 : 2200);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  // 点击继续 → 退场动画 → 回调
  const handleClick = useCallback(() => {
    if (!allDone || exiting) return;
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [allDone, exiting, onComplete]);

  return (
    <div
      className={`intro-screen${exiting ? ' intro-screen--exiting' : ''}`}
      onClick={handleClick}
    >
      <div className="intro-text">
        {PARAGRAPHS.map((text, i) => (
          <p
            key={i}
            className={`intro-paragraph${i < visibleCount ? ' intro-paragraph--visible' : ''}`}
          >
            {text}
          </p>
        ))}
        <p
          className={`intro-continue${allDone ? ' intro-continue--visible' : ''}`}
        >
          点击继续
        </p>
      </div>
    </div>
  );
}
