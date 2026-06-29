import { useState, useEffect, useCallback, useRef } from 'react';
import './IntroScreen.css';

const PARAGRAPHS = [
  '我叫沈默言，主修传统工艺。祖父离世后，我带着他遗留的笔记来到措钦村。',
  '二十年前祖父在此陪伴画师旦增，耗时四十九天见证他绘出《度母护法图》；十二年前祖父再来，村子与画师尽数封藏心事，不久后祖父便撒手人寰。',
  '我没有明确目的，只为循着笔记，看一看祖父牵挂半生的人与村庄。村口玛尼堆、上锁的经堂、紧闭的院门处处透着沉寂，我隐约察觉，这片土地藏着一段尘封十二年的往事。',
];

export default function IntroScreen({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [skipHint, setSkipHint] = useState(false);
  const skipReady = useRef(false);
  const hintTimer = useRef(null);

  const allShown = visibleCount >= PARAGRAPHS.length;

  useEffect(() => {
    if (allShown) return;
    const delay = visibleCount === 0 ? 800 : 2200;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount, allShown]);

  const doExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onComplete(), 800);
  }, [exiting, onComplete]);

  const handleClick = useCallback(() => {
    if (exiting) return;

    if (allShown) {
      doExit();
      return;
    }

    if (skipReady.current) {
      doExit();
      return;
    }

    setSkipHint(true);
    skipReady.current = true;
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => {
      setSkipHint(false);
      skipReady.current = false;
    }, 2000);
  }, [exiting, allShown, doExit]);

  useEffect(() => {
    return () => clearTimeout(hintTimer.current);
  }, []);

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
        {allShown && (
          <p className="intro-continue intro-continue--visible">
            点击继续
          </p>
        )}
        <p className={`intro-skip-hint${skipHint ? ' intro-skip-hint--visible' : ''}`}>
          再次点击将跳过
        </p>
      </div>
    </div>
  );
}
