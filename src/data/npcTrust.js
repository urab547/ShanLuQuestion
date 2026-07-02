/**
 * NPC 信任状态初始值
 *
 * 每个 NPC 维护：信任值（玩家不可见）、事件标记、已解锁话题
 */
export const INITIAL_NPC_TRUST = {
  danzeng: {
    npcId: 'danzeng',
    trustLevel: 0,
    flags: {
      hasDiscussedPainting: false,
      hasSeenBrokenCloth: false,
      hasGivenThangka: false,
      hasRevealedGubaiSecret: false,
      hasVisitedDanzengWall: false,
      hasShownPhoto: false,
      danzengSceneBCompleted: false, // 第二章场景B「先听，再问」测试是否通过
    },
    unlockedDialogueTopics: [],
  },
  zhuoma: {
    npcId: 'zhuoma',
    trustLevel: 0,
    flags: {
      hasOpenedTemple: false,
    },
    unlockedDialogueTopics: [],
  },
  gesang: {
    npcId: 'gesang',
    trustLevel: 0,
    flags: {
      hasTaughtZangjinRecipe: false,
      gesang_saw_thangka: false,
      gesangScene2Completed: false,
      gesangScene4Completed: false,
    },
    unlockedDialogueTopics: [],
  },
  baima: {
    npcId: 'baima',
    trustLevel: 0,
    flags: {
      hasGivenCloth: false,
      hasAskedAboutCloth: false,
      baima_saw_thangka: false,
      hasTaughtSangOrder: false,
      hasTaughtSangChant: false,
      hasOpenedTemple: false,
    },
    unlockedDialogueTopics: [],
  },
  renqing: {
    npcId: 'renqing',
    trustLevel: 0,
    flags: {},
    unlockedDialogueTopics: [],
  },
};
