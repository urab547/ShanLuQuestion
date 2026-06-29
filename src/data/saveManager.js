/**
 * saveManager.js —— 集中存档管理器
 *
 * 所有 localStorage 操作的唯一入口。
 *
 * 导出：
 * - SAVE_KEYS        键名注册表
 * - saveGame(state)  写入存档
 * - loadGame()       读取存档（含旧键名迁移）
 * - hasSave()        检测是否已有存档
 * - deleteSave()     清除所有游戏数据
 */

const SAVE_VERSION = '1.0';

// ─── 键名注册表 ───────────────────────────────────
// 每条键包含 new（统一前缀）和 old（无前缀遗留键，用于迁移）

const KEY_MAP = {
  // 核心存档（已有 shanglu_ 前缀，无需迁移）
  saveVersion:  { key: 'shanglu_save_version' },
  currentScene: { key: 'shanglu_current_scene' },
  npcTrust:     { key: 'shanglu_npc_trust' },
  inventory:    { key: 'shanglu_inventory' },
  pigments:     { key: 'shanglu_pigments' },

  // 场景物件状态（旧键名无前缀，需迁移）
  maniPileViewed:          { key: 'shanglu_mani_pile_viewed',           old: 'mani_pile_viewed' },
  baimaCornerViewed:       { key: 'shanglu_baima_corner_viewed',        old: 'baima_corner_viewed' },
  gesangPortfolioUnlocked: { key: 'shanglu_gesang_portfolio_unlocked',  old: 'gesang_portfolio_unlocked' },
  gesangPortfolioViewed:   { key: 'shanglu_gesang_portfolio_viewed',    old: 'gesang_portfolio_viewed' },
  danzengStoneViewed:      { key: 'shanglu_danzeng_stone_viewed',       old: 'danzeng_stone_viewed' },
  furnaceStage:            { key: 'shanglu_furnace_stage',              old: 'furnace_stage' },
  oldPrescriptionViewed:   { key: 'shanglu_old_prescription_viewed',    old: 'old_prescription_viewed' },

  // 仁青相关
  renqingFirstMet:       { key: 'shanglu_renqing_first_met',         old: 'renqing_first_met' },
  renqingDialogueCount:  { key: 'shanglu_renqing_dialogue_count',    old: 'renqing_dialogue_count' },
  renqingPhoto1Given:    { key: 'shanglu_renqing_photo1_given',      old: 'renqing_photo1_given' },
  renqingPhoto2Given:    { key: 'shanglu_renqing_photo2_given',      old: 'renqing_photo2_given' },
  renqingTopicPhoto1:    { key: 'shanglu_renqing_topic_photo1',      old: 'renqing_topic_photo1' },
  renqingTopicPhoto2:    { key: 'shanglu_renqing_topic_photo2',      old: 'renqing_topic_photo2' },

  // 记忆画布
  memoryCanvasFragments:   { key: 'shanglu_memory_canvas_fragments',   old: 'memory_canvas_fragments' },
  memoryCanvasClickedArea4:{ key: 'shanglu_memory_canvas_clicked_area4', old: 'memory_canvas_clicked_area4' },

  // 唐卡制作
  thangkaDraft:    { key: 'shanglu_thangka_draft',    old: 'thangka_draft' },
  thangkaReplica:  { key: 'shanglu_thangka_replica',  old: 'thangka_replica' },
  thangkaStep2Done:{ key: 'shanglu_thangka_step2_done', old: 'thangka_step2_done' },

  // 煨桑仪式
  sangRitualState: { key: 'shanglu_sang_ritual_state', old: 'sang_ritual_state' },

  // 经堂访问计数（戴夫式反馈）
  thangkaPlacedVisits: { key: 'shanglu_thangka_placed_visits' },

  // 氆氇研磨
  puluGrindDone: { key: 'shanglu_pulu_grind_done', old: 'pulu_grind_done' },

  // 拼图谜题
  puzzleManiStonesSolved:    { key: 'shanglu_puzzle_mani_stones_solved',    old: 'puzzle_mani_stones_solved' },
  puzzlePrayerFlagsSolved:   { key: 'shanglu_puzzle_prayer_flags_solved',   old: 'puzzle_prayer_flags_solved' },
  puzzlePrayerFlagsHintShown:{ key: 'shanglu_puzzle_prayer_flags_hint_shown', old: 'puzzle_prayer_flags_hint_shown' },
};

/** 供外部遍历的键名清单 */
export const ALL_SAVE_KEYS = Object.values(KEY_MAP).map(e => e.key);

// ─── 私有工具函数 ─────────────────────────────────

/** 读取一个键，优先新键名，其次旧键名。返回 [value, isMigrated] */
function readKey(entry) {
  const val = localStorage.getItem(entry.key);
  if (val !== null) return [val, false];

  if (entry.old) {
    const oldVal = localStorage.getItem(entry.old);
    if (oldVal !== null) {
      // 迁移：写入新键，删除旧键
      try {
        localStorage.setItem(entry.key, oldVal);
        localStorage.removeItem(entry.old);
      } catch { /* ignore */ }
      return [oldVal, true];
    }
  }

  return [null, false];
}

// ─── 公开API ────────────────────────────────────────

/**
 * 检测是否存在有效存档
 * 只要任意核心键存在即视为有档
 */
export function hasSave() {
  try {
    return localStorage.getItem('shanglu_npc_trust') !== null
        || localStorage.getItem('shanglu_current_scene') !== null
        || localStorage.getItem('shanglu_save_version') !== null;
  } catch {
    return false;
  }
}

/**
 * 加载完整存档
 * @returns {{ saveVersion, currentScene, npcTrust, inventory, pigments, scenes, ... }}
 */
export function loadGame() {
  const result = {
    saveVersion: SAVE_VERSION,
    currentScene: null,
    npcTrust: null,
    inventory: null,
    pigments: null,
    scenes: {},
  };

  try {
    // 核心存档
    const [versionStr] = readKey(KEY_MAP.saveVersion);
    result.saveVersion = versionStr || SAVE_VERSION;

    const [scene] = readKey(KEY_MAP.currentScene);
    result.currentScene = scene || null;

    const [trustStr] = readKey(KEY_MAP.npcTrust);
    if (trustStr) result.npcTrust = JSON.parse(trustStr);

    const [invStr] = readKey(KEY_MAP.inventory);
    if (invStr) result.inventory = JSON.parse(invStr);

    const [pigStr] = readKey(KEY_MAP.pigments);
    if (pigStr) result.pigments = JSON.parse(pigStr);

    // 场景物件状态
    for (const name of [
      'maniPileViewed','baimaCornerViewed','gesangPortfolioUnlocked',
      'gesangPortfolioViewed','danzengStoneViewed','furnaceStage',
      'oldPrescriptionViewed','renqingFirstMet','renqingDialogueCount',
      'renqingPhoto1Given','renqingPhoto2Given','renqingTopicPhoto1',
      'renqingTopicPhoto2','memoryCanvasFragments','memoryCanvasClickedArea4',
      'thangkaDraft','thangkaReplica','thangkaStep2Done',
      'sangRitualState','puluGrindDone',
      'puzzleManiStonesSolved','puzzlePrayerFlagsSolved','puzzlePrayerFlagsHintShown',
      'thangkaPlacedVisits',
    ]) {
      const entry = KEY_MAP[name];
      const [val] = readKey(entry);
      if (val !== null) {
        // 尝试解析 JSON
        try { result.scenes[name] = JSON.parse(val); } catch { result.scenes[name] = val; }
      }
    }
  } catch (e) {
    console.warn('[saveManager] loadGame 失败:', e);
  }

  return result;
}

/**
 * 保存游戏
 * @param {{ currentScene?, npcTrust?, inventory?, pigments?, scenes? }} state
 */
export function saveGame(state = {}) {
  try {
    localStorage.setItem(KEY_MAP.saveVersion.key, SAVE_VERSION);

    if (state.currentScene !== undefined) {
      localStorage.setItem(KEY_MAP.currentScene.key, state.currentScene);
    }
    if (state.npcTrust !== undefined) {
      localStorage.setItem(KEY_MAP.npcTrust.key, JSON.stringify(state.npcTrust));
    }
    if (state.inventory !== undefined) {
      localStorage.setItem(KEY_MAP.inventory.key, JSON.stringify(state.inventory));
    }
    if (state.pigments !== undefined) {
      localStorage.setItem(KEY_MAP.pigments.key, JSON.stringify(state.pigments));
    }
    if (state.scenes) {
      for (const [name, value] of Object.entries(state.scenes)) {
        const entry = KEY_MAP[name];
        if (!entry) continue;
        const str = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(entry.key, str);
      }
    }
  } catch (e) {
    console.warn('[saveManager] saveGame 失败:', e);
  }
}

/**
 * 清除所有存档数据
 */
export function deleteSave() {
  try {
    for (const key of ALL_SAVE_KEYS) {
      localStorage.removeItem(key);
    }
    // 同时清理遗留旧键名（以防万一）
    for (const entry of Object.values(KEY_MAP)) {
      if (entry.old) localStorage.removeItem(entry.old);
    }
    // 额外清理对话历史（独立键，不在 KEY_MAP 中）
    localStorage.removeItem('shanglu_dialogue_history');
    // 也清理可能的动态键（puzzle_ 等）
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('shanglu_') || k.startsWith('puzzle_'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch (e) {
    console.warn('[saveManager] deleteSave 失败:', e);
  }
}
