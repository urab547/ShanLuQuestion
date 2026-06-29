/**
 * IconOrEmoji —— 优先渲染 icon 图像，缺失时回退到 emoji 字符
 *
 * 用法：
 *   <IconOrEmoji data={npc} className="npc__icon" />
 *
 * data 对象需包含 icon（图片路径）或 emoji（字符）字段，或两者都有。
 * 当 icon 图片加载失败（onError）时，自动切换到 emoji 显示。
 */

import { useState } from 'react';

export default function IconOrEmoji({ data, className }) {
  const [imgError, setImgError] = useState(false);

  // 有 icon 且未出错 → 渲染图片
  if (data?.icon && !imgError) {
    return (
      <img
        src={data.icon}
        alt={data.name || data.label || ''}
        className={className}
        onError={() => setImgError(true)}
      />
    );
  }

  // 回退到 emoji
  return (
    <span className={className}>
      {data?.emoji || '·'}
    </span>
  );
}
