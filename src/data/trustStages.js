/**
 * NPC 信任阶段配置
 *
 * 每个 NPC 单独定义阶段映射表。
 * 信任值 0-100，玩家不可见，通过 NPC 行为（对话文字）体现变化。
 */

export const TRUST_STAGES = {
  danzeng: [
    { min: 0,  max: 20,  stage: 'stranger',     label: '陌生人' },
    { min: 21, max: 45,  stage: 'listener',      label: '倾听者' },
    { min: 46, max: 70,  stage: 'acknowledged',   label: '被认可' },
    { min: 71, max: 100, stage: 'confidant',      label: '知己' },
  ],
  zhuoma: [
    { min: 0,  max: 20,  stage: 'stranger',     label: '陌生人' },
    { min: 21, max: 45,  stage: 'listener',      label: '倾听者' },
    { min: 46, max: 70,  stage: 'acknowledged',   label: '被认可' },
    { min: 71, max: 100, stage: 'confidant',      label: '知己' },
  ],
  gesang: [
    { min: 0,  max: 20,  stage: 'stranger',     label: '陌生人' },
    { min: 21, max: 45,  stage: 'listener',      label: '倾听者' },
    { min: 46, max: 70,  stage: 'acknowledged',   label: '被认可' },
    { min: 71, max: 100, stage: 'confidant',      label: '知己' },
  ],
  baima: [
    { min: 0,  max: 20,  stage: 'stranger',     label: '陌生人' },
    { min: 21, max: 45,  stage: 'listener',      label: '倾听者' },
    { min: 46, max: 70,  stage: 'acknowledged',   label: '被认可' },
    { min: 71, max: 100, stage: 'confidant',      label: '知己' },
  ],
};

/**
 * 根据 NPC ID 和信任值获取当前阶段对象
 * @param {string} npcId
 * @param {number} trustLevel
 * @returns {{ min: number, max: number, stage: string, label: string }}
 */
export function getTrustStage(npcId, trustLevel) {
  const stages = TRUST_STAGES[npcId];
  if (!stages) return null;
  return stages.find(s => trustLevel >= s.min && trustLevel <= s.max) || stages[0];
}
