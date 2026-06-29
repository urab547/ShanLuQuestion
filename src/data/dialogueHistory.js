/**
 * dialogueHistory.js —— 对话历史回顾存储
 *
 * 存储结构（localStorage key: shanglu_dialogue_history）：
 * {
 *   "_talkedTo": ["danzeng", "baima"],
 *   "danzeng": [
 *     { text: "台词内容", stage: "listener", isKeyLine: true }
 *   ],
 *   "baima": [...]
 * }
 */

const STORAGE_KEY = 'shanglu_dialogue_history';

/** 已知NPC ID 列表 */
const KNOWN_NPCS = ['danzeng', 'zhuoma', 'gesang', 'baima', 'renqing'];

/** NPC 中文名映射 */
export const NPC_LABELS = {
  danzeng: '旦增',
  zhuoma: '卓玛',
  gesang: '格桑',
  baima: '白玛',
  renqing: '仁青',
};

/** 信任阶段中文名映射 */
export const STAGE_LABELS = {
  stranger: '陌生人',
  listener: '倾听者',
  acknowledged: '认可者',
  confidant: '知己',
};

/** 读取完整对话历史 */
export function loadDialogueHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (!data._talkedTo) data._talkedTo = [];
      return data;
    }
  } catch { /* ignore */ }
  return { _talkedTo: [] };
}

/** 写入对话历史 */
export function saveDialogueHistory(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

/**
 * 追加一条关键台词
 * @param {string} npcId  NPC ID（danzeng/baima/...）
 * @param {string} text   台词内容
 * @param {string} stage  信任阶段（展示用）
 */
export function addKeyLine(npcId, text, stage) {
  if (!npcId || !text) return;
  const data = loadDialogueHistory();
  if (!data[npcId]) data[npcId] = [];

  // 按 text 去重
  if (!data[npcId].some(entry => entry.text === text)) {
    data[npcId].push({ text, stage: stage || '对话', isKeyLine: true });
    saveDialogueHistory(data);
  }
}

/**
 * 标记玩家与某NPC交谈过
 */
export function recordTalkedTo(npcId) {
  if (!npcId || !KNOWN_NPCS.includes(npcId)) return;
  const data = loadDialogueHistory();
  if (!data._talkedTo.includes(npcId)) {
    data._talkedTo.push(npcId);
    saveDialogueHistory(data);
  }
}

/**
 * 获取所有交谈过的NPC ID列表
 */
export function getTalkedToNpcs() {
  return loadDialogueHistory()._talkedTo || [];
}

/**
 * 获取指定NPC的关键台词列表
 */
export function getNpcKeyLines(npcId) {
  const data = loadDialogueHistory();
  return data[npcId] || [];
}

/**
 * 清除对话历史（由 saveManager.deleteSave 调用）
 */
export function clearDialogueHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}
