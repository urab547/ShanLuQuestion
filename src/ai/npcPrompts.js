/**
 * NPC System Prompt 入口
 *
 * 每个 NPC 的 system prompt 在独立文件中管理：
 *   src/ai/prompts/danzeng.js
 *   src/ai/prompts/baima.js
 *   src/ai/prompts/gesang.js
 *   src/ai/prompts/zhuoma.js
 *   src/ai/prompts/renqing.js
 *
 * 填写方式：打开对应文件，写入 systemPrompt 字段。
 */

import { danzeng } from './prompts/danzeng';
import { baima } from './prompts/baima';
import { gesang } from './prompts/gesang';
import { zhuoma } from './prompts/zhuoma';
import { renqing } from './prompts/renqing';

export const NPC_PROMPTS = {
  danzeng,
  baima,
  gesang,
  zhuoma,
  renqing,
};

/**
 * 根据 NPC ID 获取 system prompt
 * @param {string} npcId - 'danzeng' | 'baima' | 'gesang' | 'zhuoma' | 'renqing'
 * @returns {string} systemPrompt 文本
 */
export function getNpcPrompt(npcId) {
  return NPC_PROMPTS[npcId]?.systemPrompt ?? '';
}

/**
 * 获取 NPC 完整配置
 * @param {string} npcId
 * @returns {object|null}
 */
export function getNpcConfig(npcId) {
  return NPC_PROMPTS[npcId] ?? null;
}
