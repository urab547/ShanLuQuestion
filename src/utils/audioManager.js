/**
 * audioManager —— 集中式音频管理
 *
 * 能力：
 * - BGM：单轨循环，跨场景切换曲目，音量受 ENV_VOLUME_KEY 控制
 * - SFX：多轨同时播放（叠层效果），音量受 SFX_VOLUME_KEY 控制
 * - 全部读取 localStorage 音量；提供 setEnvVolume / setSfxVolume 实时调整
 *
 * 设计：
 * - 不持有 React 状态，便于跨组件使用
 * - 浏览器 autoplay 策略要求首次用户交互后才允许播放，UI 触发后才 resolve
 */

import { SOUNDS } from '../data/assets';

const ENV_KEY = 'shanglu_env_volume';
const SFX_KEY = 'shanglu_sfx_volume';

function loadPct(key) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? Number(v) / 100 : 0.8;
  } catch {
    return 0.8;
  }
}

let envVolume = loadPct(ENV_KEY);
let sfxVolume = loadPct(SFX_KEY);
let currentBgm = null;
let currentBgmKey = null;

const sfxCache = new Map(); // 路径 -> Audio 模板

function getSfxTemplate(src) {
  if (!sfxCache.has(src)) {
    const a = new Audio(src);
    a.preload = 'auto';
    sfxCache.set(src, a);
  }
  return sfxCache.get(src);
}

export const audioManager = {
  /**
   * 播放环境音 / BGM，自动循环，可热切换
   * @param {string} src - 音频文件路径
   */
  playBgm(src) {
    if (currentBgmKey === src && currentBgm && !currentBgm.paused) return;
    this.stopBgm();
    if (!src) return;
    const a = new Audio(src);
    a.loop = true;
    a.volume = envVolume;
    a.play().catch(() => {}); // 用户未交互时静默失败
    currentBgm = a;
    currentBgmKey = src;
  },

  /**
   * 停止 BGM
   */
  stopBgm() {
    if (currentBgm) {
      currentBgm.pause();
      currentBgm.currentTime = 0;
      currentBgm = null;
      currentBgmKey = null;
    }
  },

  /**
   * 播放一次性 SFX，支持并行叠层
   * @param {string} src - 音频文件路径
   * @param {object} opts - { volumeScale: 0-1 }
   */
  playSfx(src, { volumeScale = 1 } = {}) {
    if (!src) return;
    const tpl = getSfxTemplate(src);
    const a = tpl.cloneNode(true); // 允许同一资源多次并发
    a.volume = Math.max(0, Math.min(1, sfxVolume * volumeScale));
    a.play().catch(() => {});
  },

  /**
   * 设置环境音音量（0-100）
   */
  setEnvVolume(pct) {
    envVolume = pct / 100;
    if (currentBgm) currentBgm.volume = envVolume;
  },

  /**
   * 设置音效音量（0-100）
   */
  setSfxVolume(pct) {
    sfxVolume = pct / 100;
  },

  /**
   * 调试用：取当前音量
   */
  getVolumes() {
    return { env: envVolume, sfx: sfxVolume };
  },
};

export { SOUNDS };
