/**
 * stuckDetector.js — 卡关检测工具
 *
 * 提供谜题组件的卡关检测能力：
 * - 3 分钟超时自动触发
 * - 3 次错误自动触发
 * - 每次打开谜题计时归零（不累计）
 *
 * 用法：
 *   const detector = createStuckTimer(onStuck, 180000);
 *   detector.start();  // 谜题打开时启动
 *   detector.reset();  // 步骤切换时重置
 *   detector.stop();   // 谜题关闭时清理
 *
 *   if (checkStuckErrors(errorCount, 3)) onStuck();
 */

/**
 * 创建卡关计时器
 * @param {Function} onStuck — 超时回调（仅调用一次）
 * @param {number} timeoutMs — 超时时间（毫秒），默认 180000（3 分钟）
 * @returns {{ start, reset, stop }}
 */
export function createStuckTimer(onStuck, timeoutMs = 180000) {
  let timerId = null;
  let fired = false;

  function clear() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  function start() {
    clear();
    fired = false;
    timerId = setTimeout(() => {
      if (!fired) {
        fired = true;
        onStuck();
      }
    }, timeoutMs);
  }

  function reset() {
    clear();
    start();
  }

  function stop() {
    clear();
    fired = false;
  }

  return { start, reset, stop };
}

/**
 * 检查错误次数是否达到阈值
 * @param {number} count — 当前错误次数
 * @param {number} max — 阈值，默认 3
 * @returns {boolean}
 */
export function checkStuckErrors(count, max = 3) {
  return count >= max;
}
