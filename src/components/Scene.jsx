import { ITEMS } from '../data/items';
import { NPCS } from '../data/npcs';
import { DIALOGUES } from '../data/dialogues';
import { getTrustStage } from '../data/trustStages';
import { MANI_STONE_PUZZLE, PRAYER_FLAGS_PUZZLE } from '../data/puzzles';
import { SCROLLS } from '../data/scrolls';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { loadGame, saveGame } from '../data/saveManager';
import Interactable from './Interactable';
import NPC from './NPC';
import SceneExit from './SceneExit';
import SortablePuzzle from './SortablePuzzle';
import PuzzleWrapper from './PuzzleWrapper';
import TrustDebug from './TrustDebug';
import CollectionPanel from './CollectionPanel';
import ScrollViewer from './ScrollViewer';
import PigmentViewer from './PigmentViewer';
import PuluGrinder from './PuluGrinder';
import ThangkaWorkshop from './ThangkaWorkshop';
import ThangkaReplicaViewer from './ThangkaReplicaViewer';
import MemoryCanvasViewer from './MemoryCanvasViewer';
import TopicPanel from './TopicPanel';
import SpecialItemViewer from './SpecialItemViewer';
import SangRitualViewer from './SangRitualViewer';
import DialogueOverlay from './DialogueOverlay';
import SettingsPanel from './SettingsPanel';
import DialogueReview from './DialogueReview';
import { getTalkedToNpcs } from '../data/dialogueHistory';
import { PIGMENTS } from '../data/pigments';
import { SOUNDS, SCENE_BG } from '../data/assets';
import customDefaults from '../data/customPositions';
import { audioManager } from '../utils/audioManager';
import './Scene.css';

// 出口方向 → 默认位置（百分比）映射
const EXIT_DEFAULT_POSITIONS = {
  'left': { top: '50%', left: '5%' },
  'left-top': { top: '30%', left: '5%' },
  'left-bottom': { top: '70%', left: '5%' },
  'right': { top: '50%', left: '95%' },
  'right-top': { top: '30%', left: '95%' },
  'right-bottom': { top: '70%', left: '95%' },
  'top-left': { top: '8%', left: '25%' },
  'top-right': { top: '8%', left: '75%' },
  'center': { top: '80%', left: '50%' },
};

// 出口方向 → 默认箭头旋转角度（度）
const EXIT_DEFAULT_ROTATIONS = {
  'left': 270,
  'left-top': 270,
  'left-bottom': 270,
  'right': 90,
  'right-top': 90,
  'right-bottom': 90,
  'top-left': 0,
  'top-right': 0,
  'center': 180,
};

/**
 * Scene 组件 —— 单个场景
 *
 * 上半 60% = 天空（bgColor），下半 40% = 地面（groundColor）
 * 用简单几何图形点缀场景（三角形=山，矩形=建筑，线条=经幡）
 * 渲染出口按钮和可交互物件
 */
export default function Scene({
  scene, onNavigate, dialogue, onInteract, onCloseDialogue,
  npcTrust, onAdjustTrust, onSetNpcFlag,
  inventory, onCollectScroll, viewingItem, onViewItem, onCloseViewer,
  pigments, onCollectPigment, onLearnRecipe,
  triggerSave,
}) {
  const { bgColor, groundColor, exits, interactables, npcs } = scene;

  // ─── 从存档中读取场景级状态（一次加载，分摊给各 useState） ───
  const savedScenes = useMemo(() => loadGame().scenes || {}, []);

  // 信任调试面板展开/收起（默认收起）
  const [trustPanelOpen, setTrustPanelOpen] = useState(false);

  // 道具栏浮层开关 → 改为收藏面板
  const [collectionOpen, setCollectionOpen] = useState(false);

  // 记忆画布浮层开关（独立触发）
  const [canvasOpen, setCanvasOpen] = useState(false);

  // 红点状态（新内容提示）
  const [redDots, setRedDots] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shanglu_reddots') || '{}'); }
    catch { return {}; }
  });
  const setRedDot = (dot, val) => {
    const next = { ...redDots, [dot]: val };
    setRedDots(next);
    try { localStorage.setItem('shanglu_reddots', JSON.stringify(next)); } catch { /* ignore */ }
  };

  // ─── 自定义位置（右键拖拽物件/NPC 后保存的位置） ───
  // 优先级: localStorage 覆盖 > 源码文件默认值 > 空
  const [customPositions, setCustomPositions] = useState(() => {
    try {
      const ls = JSON.parse(localStorage.getItem('shanglu_custom_positions') || '{}');
      return { ...(customDefaults.positions || {}), ...ls };
    } catch { return customDefaults.positions || {}; }
  });

  const handleItemDragEnd = useCallback((itemId, newPos) => {
    setCustomPositions((prev) => {
      const next = { ...prev, [itemId]: newPos };
      try { localStorage.setItem('shanglu_custom_positions', JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  }, []);

  const handleNpcDragEnd = useCallback((npcId, newPos) => {
    setCustomPositions((prev) => {
      const next = { ...prev, [`npc_${npcId}`]: newPos };
      try { localStorage.setItem('shanglu_custom_positions', JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  }, []);

  // ─── 自定义缩放（右键点击切换缩放模式后拖拽调整大小） ───
  const [customScales, setCustomScales] = useState(() => {
    try {
      const ls = JSON.parse(localStorage.getItem('shanglu_custom_scales') || '{}');
      return { ...(customDefaults.scales || {}), ...ls };
    } catch { return customDefaults.scales || {}; }
  });

  const handleScaleChange = useCallback((key, newScale) => {
    setCustomScales((prev) => {
      const next = { ...prev, [key]: newScale };
      try { localStorage.setItem('shanglu_custom_scales', JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  }, []);

  // ─── 出口按钮：自定义位置（每出口独立）───
  const [exitPositions, setExitPositions] = useState(() => {
    try {
      const ls = JSON.parse(localStorage.getItem('shanglu_exit_positions') || '{}');
      return { ...(customDefaults.exits || {}), ...ls };
    } catch { return customDefaults.exits || {}; }
  });

  const handleExitDragEnd = useCallback((sceneId, target, newPos) => {
    const key = `${sceneId}__${target}`;
    setExitPositions((prev) => {
      const next = { ...prev, [key]: newPos };
      try { localStorage.setItem('shanglu_exit_positions', JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  }, []);

  // ─── 出口按钮：共享缩放倍数 ───
  const [exitSharedScale, setExitSharedScale] = useState(() => {
    try {
      const v = localStorage.getItem('shanglu_exit_scale');
      return v ? parseFloat(v) : (customDefaults.exitScale ?? 1);
    } catch { return customDefaults.exitScale ?? 1; }
  });

  const handleExitScaleChange = useCallback((newScale) => {
    setExitSharedScale(newScale);
    try { localStorage.setItem('shanglu_exit_scale', String(newScale)); } catch { /* */ }
  }, []);

  // ─── 出口按钮：箭头旋转角度（每出口独立）───
  const [exitRotations, setExitRotations] = useState(() => {
    try {
      const ls = JSON.parse(localStorage.getItem('shanglu_exit_rotations') || '{}');
      return { ...(customDefaults.exitRots || {}), ...ls };
    } catch { return customDefaults.exitRots || {}; }
  });

  const handleExitRotate = useCallback((sceneId, target, newRotation) => {
    const key = `${sceneId}__${target}`;
    setExitRotations((prev) => {
      const next = { ...prev, [key]: newRotation };
      try { localStorage.setItem('shanglu_exit_rotations', JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  }, []);

  // ─── 拼图：自定义位置和缩放（每拼图独立）───
  const [puzzlePositions, setPuzzlePositions] = useState(() => {
    try {
      const ls = JSON.parse(localStorage.getItem('shanglu_puzzle_positions') || '{}');
      return { ...(customDefaults.puzzlesPos || {}), ...ls };
    } catch { return customDefaults.puzzlesPos || {}; }
  });
  const [puzzleScales, setPuzzleScales] = useState(() => {
    try {
      const ls = JSON.parse(localStorage.getItem('shanglu_puzzle_scales') || '{}');
      return { ...(customDefaults.puzzlesScl || {}), ...ls };
    } catch { return customDefaults.puzzlesScl || {}; }
  });

  const handlePuzzleDragEnd = useCallback((puzzleId, newPos) => {
    setPuzzlePositions((prev) => {
      const next = { ...prev, [puzzleId]: newPos };
      try { localStorage.setItem('shanglu_puzzle_positions', JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  }, []);

  const handlePuzzleScaleChange = useCallback((puzzleId, newScale) => {
    setPuzzleScales((prev) => {
      const next = { ...prev, [puzzleId]: newScale };
      try { localStorage.setItem('shanglu_puzzle_scales', JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  }, []);

  // 红点检测：监控物品变化
  const prevInvLenRef = useRef(inventory?.length ?? 0);
  useEffect(() => {
    const curLen = inventory?.length ?? 0;
    if (curLen > prevInvLenRef.current) {
      setRedDot('collection', true);
    }
    prevInvLenRef.current = curLen;
  }, [inventory?.length]);

  // 红点检测：监控颜料状态变化
  const pigmentHashRef = useRef('');
  useEffect(() => {
    const hash = pigments ? JSON.stringify(Object.entries(pigments).map(([k, v]) => `${k}:${v.rawMaterialFound}:${v.recipeUnderstood}`)) : '';
    if (pigmentHashRef.current && hash !== pigmentHashRef.current) {
      setRedDot('collection', true);
    }
    pigmentHashRef.current = hash;
  }, [pigments]);

  // 设置面板开关
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  // ─── 隐性引导：物件可点击提示 ───
  const objectHintsEnabled = useMemo(() => {
    try { return localStorage.getItem('shanglu_object_hints_disabled') !== '1'; }
    catch { return true; }
  }, []);
  const [breathingItemId, setBreathingItemId] = useState(null);
  const [idleKey, setIdleKey] = useState(0);

  // 空闲计时器：30 秒无点击 → 首个物件呼吸动画
  const resetIdleTimer = useCallback(() => {
    setIdleKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (!objectHintsEnabled || dialogue) {
      setBreathingItemId(null);
      return;
    }
    setBreathingItemId(null);
    const firstItem = interactables?.[0];
    if (!firstItem) return;
    const timer = setTimeout(() => {
      setBreathingItemId(firstItem);
    }, 30000);
    return () => clearTimeout(timer);
  }, [scene.id, idleKey, objectHintsEnabled, dialogue, interactables]);

  // 玛尼堆"已查看"标记
  const [maniPileViewed, setManiPileViewed] = useState(
    () => savedScenes.maniPileViewed === '1' || savedScenes.maniPileViewed === true
  );

  // 仁青对话轮次计数
  const [renqingDialogueCount, setRenqingDialogueCount] = useState(
    () => Number(savedScenes.renqingDialogueCount || '0')
  );

  // 卡关引导：当前需要高亮的 NPC id
  const [stuckNpc, setStuckNpc] = useState(null);

  // 藏獒动画触发 key
  const [mastiffAnimKey, setMastiffAnimKey] = useState(0);

  // 仁青碎片已给标记
  const [photo1Given, setPhoto1Given] = useState(
    () => savedScenes.renqingPhoto1Given === '1' || savedScenes.renqingPhoto1Given === true
  );
  const [photo2Given, setPhoto2Given] = useState(
    () => savedScenes.renqingPhoto2Given === '1' || savedScenes.renqingPhoto2Given === true
  );

  // 仁青首次见面标记
  const [renqingFirstMet, setRenqingFirstMet] = useState(
    () => savedScenes.renqingFirstMet === '1' || savedScenes.renqingFirstMet === true
  );

  // 话题面板开关
  const [topicPanelOpen, setTopicPanelOpen] = useState(false);

  // 记忆画布area4已点击
  const [canvasArea4Clicked, setCanvasArea4Clicked] = useState(
    () => savedScenes.memoryCanvasClickedArea4 === '1' || savedScenes.memoryCanvasClickedArea4 === true
  );

  // 白玛角落"已查看"标记
  const [baimaCornerViewed, setBaimaCornerViewed] = useState(
    () => savedScenes.baimaCornerViewed === '1' || savedScenes.baimaCornerViewed === true
  );

  // 格桑画夹"已解锁"标记（看过 dlg_gesang_listener 后置位）
  const [gesangPortfolioUnlocked, setGesangPortfolioUnlocked] = useState(
    () => savedScenes.gesangPortfolioUnlocked === '1' || savedScenes.gesangPortfolioUnlocked === true
  );

  // 格桑画夹"已查看"标记
  const [gesangPortfolioViewed, setGesangPortfolioViewed] = useState(
    () => savedScenes.gesangPortfolioViewed === '1' || savedScenes.gesangPortfolioViewed === true
  );

  // 旦增院子石头"已查看"标记
  const [danzengStoneViewed, setDanzengStoneViewed] = useState(
    () => savedScenes.danzengStoneViewed === '1' || savedScenes.danzengStoneViewed === true
  );

  // 铜炉交互阶段（0=锈迹, 1=可擦拭, 2=已完成）
  const [furnaceStage, setFurnaceStage] = useState(
    () => Number(savedScenes.furnaceStage || '0')
  );

  // 赤铁矿已采集
  const hematiteCollected = pigments?.cinnabar_red?.rawMaterialFound ?? false;

  // 三种新颜料状态
  const foqingCollected = pigments?.foqing_blue?.rawMaterialFound ?? false;
  const songshiCollected = pigments?.songshi_green?.rawMaterialFound ?? false;
  const zangjinCollected = pigments?.zangjin_gold?.rawMaterialFound ?? false;
  const gesangHasTaughtZangjin = npcTrust?.gesang?.flags?.hasTaughtZangjinRecipe ?? false;

  // 骨白流程状态
  const gubaiRecipeUnderstood = pigments?.gubai_white?.recipeUnderstood ?? false;
  const gubaiRawFound = pigments?.gubai_white?.rawMaterialFound ?? false;
  const danzengRevealedGubai = npcTrust?.danzeng?.flags?.hasRevealedGubaiSecret ?? false;
  const danzengHasShownPhoto = npcTrust?.danzeng?.flags?.hasShownPhoto ?? false;
  const baimaHasGivenCloth = npcTrust?.baima?.flags?.hasGivenCloth ?? false;
  const baimaHasAskedAboutCloth = npcTrust?.baima?.flags?.hasAskedAboutCloth ?? false;
  const clothCollected = inventory?.includes('pulu_fragment') ?? false;

  // 经堂开门状态
  const hasGivenThangka = npcTrust?.danzeng?.flags?.hasGivenThangka ?? false;
  const zhuomaStage = getTrustStage('zhuoma', npcTrust?.zhuoma?.trustLevel ?? 0);
  const baimaStageForTemple = getTrustStage('baima', npcTrust?.baima?.trustLevel ?? 0);
  const zhuomaConfidant = zhuomaStage?.stage === 'confidant';
  const baimaConfidant = baimaStageForTemple?.stage === 'confidant';
  const templeOpened = npcTrust?.baima?.flags?.hasOpenedTemple || npcTrust?.zhuoma?.flags?.hasOpenedTemple;

  // 仪式植物采集状态
  const songBaiCollected = inventory?.includes('song_bai') ?? false;
  const duSongCollected = inventory?.includes('du_song') ?? false;
  const yeCaoCollected = inventory?.includes('ye_cao') ?? false;

  // 老药方已查看
  const [oldPrescriptionViewed, setOldPrescriptionViewed] = useState(
    () => savedScenes.oldPrescriptionViewed === '1' || savedScenes.oldPrescriptionViewed === true
  );

  // 派生玛尼堆状态
  const scrollCollected = inventory?.includes('scroll_page_1') ?? false;
  const maniState = scrollCollected ? 'collected' : (maniPileViewed ? 'viewed' : 'unviewed');

  // 派生白玛角落状态 + 解锁闸门
  const scroll2Collected = inventory?.includes('scroll_page_2') ?? false;
  const baimaStage = getTrustStage('baima', npcTrust?.baima?.trustLevel ?? 0);
  const cornerLocked = !baimaStage || baimaStage.stage === 'stranger';
  const cornerState = scroll2Collected
    ? 'collected'
    : (cornerLocked ? 'locked' : (baimaCornerViewed ? 'viewed' : 'unviewed'));

  // 派生格桑画夹状态
  const scroll3Collected = inventory?.includes('scroll_page_3') ?? false;
  const gesangPortfolioState = scroll3Collected
    ? 'collected'
    : (!gesangPortfolioUnlocked ? 'locked' : (gesangPortfolioViewed ? 'viewed' : 'unviewed'));

  // 派生旦增院子石头状态（四态，双重解锁条件）
  const scroll4Collected = inventory?.includes('scroll_page_4') ?? false;
  const hasDiscussedPainting = npcTrust?.danzeng?.flags?.hasDiscussedPainting ?? false;
  const danzengTrustLevel = npcTrust?.danzeng?.trustLevel ?? 0;
  const stoneLocked = danzengTrustLevel < 21 || !hasDiscussedPainting;
  const danzengStoneState = scroll4Collected
    ? 'collected'
    : (stoneLocked ? 'locked' : (danzengStoneViewed ? 'viewed' : 'unviewed'));

  // 包装 onCloseDialogue：检测各类对话关闭后更新场景状态 + 集中存档
  const handleCloseDialogue = () => {
    const sceneChanges = {};

    if (dialogue?.dialogueId === 'dlg_mani_pile' && !scrollCollected && !maniPileViewed) {
      setManiPileViewed(true);
      sceneChanges.maniPileViewed = '1';
    }
    if (dialogue?.dialogueId === 'dlg_baima_corner_view' && !scroll2Collected && !baimaCornerViewed) {
      setBaimaCornerViewed(true);
      sceneChanges.baimaCornerViewed = '1';
    }
    // 关闭 dlg_gesang_listener 时解锁画夹
    if (dialogue?.dialogueId === 'dlg_gesang_listener' && !gesangPortfolioUnlocked) {
      setGesangPortfolioUnlocked(true);
      sceneChanges.gesangPortfolioUnlocked = '1';
    }
    // 关闭 dlg_gesang_portfolio_view 时落 viewed 标记
    if (dialogue?.dialogueId === 'dlg_gesang_portfolio_view' && !scroll3Collected && !gesangPortfolioViewed) {
      setGesangPortfolioViewed(true);
      sceneChanges.gesangPortfolioViewed = '1';
    }
    // 关闭 dlg_danzeng_listener 时标记"已谈画"
    if (dialogue?.dialogueId === 'dlg_danzeng_listener' && !hasDiscussedPainting) {
      onSetNpcFlag('danzeng', 'hasDiscussedPainting', true);
    }
    // 关闭 dlg_danzeng_stone_view 时落 viewed 标记
    if (dialogue?.dialogueId === 'dlg_danzeng_stone_view' && !scroll4Collected && !danzengStoneViewed) {
      setDanzengStoneViewed(true);
      sceneChanges.danzengStoneViewed = '1';
    }
    // 铜炉：关闭锈迹旁白 → 进入可擦拭阶段
    if (dialogue?.dialogueId === 'dlg_furnace_rust' && furnaceStage === 0) {
      setFurnaceStage(1);
      sceneChanges.furnaceStage = '1';
    }
    // 铜炉：关闭刻字 → 完成 + 学制法
    if (dialogue?.dialogueId === 'dlg_furnace_inscription' && furnaceStage === 1) {
      setFurnaceStage(2);
      sceneChanges.furnaceStage = '2';
      onLearnRecipe('cinnabar_red');
    }
    // 佛青：关闭任意白玛对话（非陌生人阶段）+ 已读残卷第二页 → 学制法
    if (dialogue?.dialogueId?.startsWith('dlg_baima_') && baimaStage && baimaStage.stage !== 'stranger' && scroll2Collected) {
      onLearnRecipe('foqing_blue');
    }
    // 松石绿：关闭老药方 → 标记已查看
    if (dialogue?.dialogueId === 'dlg_old_prescription' && !oldPrescriptionViewed) {
      setOldPrescriptionViewed(true);
      sceneChanges.oldPrescriptionViewed = '1';
    }
    // 松石绿：关闭对照推断旁白 → 学制法
    if (dialogue?.dialogueId === 'dlg_songshi_compare') {
      onLearnRecipe('songshi_green');
    }
    // 藏金：关闭格桑教用法对话 → 标记已教 + 学制法
    if (dialogue?.dialogueId === 'dlg_gesang_zangjin_recipe') {
      onSetNpcFlag('gesang', 'hasTaughtZangjinRecipe', true);
      onLearnRecipe('zangjin_gold');
    }
    // 骨白：关闭旦增透露秘密对话 → 标记已透露
    if (dialogue?.dialogueId === 'dlg_danzeng_gubai_secret' && !danzengRevealedGubai) {
      onSetNpcFlag('danzeng', 'hasRevealedGubaiSecret', true);
    }
    // 骨白：关闭白玛氆氇话题对话 → 标记已问过
    if (dialogue?.dialogueId === 'dlg_baima_gubai_cloth' && !baimaHasAskedAboutCloth) {
      onSetNpcFlag('baima', 'hasAskedAboutCloth', true);
    }
    // 唐卡赠予：关闭赠予对话 → 设置 flag + 信任
    if (dialogue?.dialogueId?.startsWith('dlg_danzeng_thangka')) {
      onSetNpcFlag('danzeng', 'hasGivenThangka', true);
      onAdjustTrust('danzeng', 10);
    }
    if (dialogue?.dialogueId === 'dlg_gesang_thangka') {
      onSetNpcFlag('gesang', 'gesang_saw_thangka', true);
      onAdjustTrust('gesang', 10);
    }
    if (dialogue?.dialogueId === 'dlg_baima_thangka') {
      onSetNpcFlag('baima', 'baima_saw_thangka', true);
      onAdjustTrust('baima', 10);
    }
    // 仁青：stage1 关闭 → 设首次见面标记
    if (dialogue?.dialogueId === 'dlg_renqing_stage1' && !renqingFirstMet) {
      setRenqingFirstMet(true);
      sceneChanges.renqingFirstMet = '1';
    }
    // 仁青：轮次计数
    if (dialogue?.dialogueId?.startsWith('dlg_renqing_')) {
      const newCount = renqingDialogueCount + 1;
      setRenqingDialogueCount(newCount);
      sceneChanges.renqingDialogueCount = String(newCount);
    }
    // 碎片1：关闭 dlg_renqing_photo_give → 仅首次设标记 + 碎片 + 解锁画布
    if (dialogue?.dialogueId === 'dlg_renqing_photo_give' && !photo1Given) {
      setPhoto1Given(true);
      setRenqingFirstMet(true);
      sceneChanges.renqingPhoto1Given = '1';
      sceneChanges.renqingFirstMet = '1';
      sceneChanges.renqingTopicPhoto1 = '1';
      const frags = (() => {
        try {
          const raw = localStorage.getItem('shanglu_memory_canvas_fragments')
                   || localStorage.getItem('memory_canvas_fragments');
          return JSON.parse(raw || '{}');
        } catch { return {}; }
      })();
      frags.fragment_1 = { owned: true, read: false };
      sceneChanges.memoryCanvasFragments = frags;
      setRedDot('canvas', true);
      if (!inventory?.includes('memory_canvas')) {
        onCollectScroll('memory_canvas');
      }
    }
    // 碎片2：关闭 dlg_renqing_photo_compare → 仅首次设标记 + 碎片
    if (dialogue?.dialogueId === 'dlg_renqing_photo_compare' && !photo2Given) {
      setPhoto2Given(true);
      sceneChanges.renqingPhoto2Given = '1';
      sceneChanges.renqingTopicPhoto2 = '1';
      const frags = (() => {
        try {
          const raw = localStorage.getItem('shanglu_memory_canvas_fragments')
                   || localStorage.getItem('memory_canvas_fragments');
          return JSON.parse(raw || '{}');
        } catch { return {}; }
      })();
      frags.fragment_2 = { owned: true, read: false };
      sceneChanges.memoryCanvasFragments = frags;
      setRedDot('canvas', true);
    }
    // 碎片4：关闭 dlg_baima_identify_script → 解锁碎片4
    if (dialogue?.dialogueId === 'dlg_baima_identify_script') {
      const frags = (() => {
        try {
          const raw = localStorage.getItem('shanglu_memory_canvas_fragments')
                   || localStorage.getItem('memory_canvas_fragments');
          return JSON.parse(raw || '{}');
        } catch { return {}; }
      })();
      frags.fragment_4 = { owned: true, read: false };
      sceneChanges.memoryCanvasFragments = frags;
      setRedDot('canvas', true);
    }
    // 记忆画布 area4 提示关闭 → 设 flag
    if (dialogue?.dialogueId === 'dlg_memory_canvas_hint_area4') {
      setCanvasArea4Clicked(true);
      sceneChanges.memoryCanvasClickedArea4 = '1';
    }
    // 白玛教煨桑顺序关闭 → 设 flag
    if (dialogue?.dialogueId === 'dlg_baima_sang_order') {
      onSetNpcFlag('baima', 'hasTaughtSangOrder', true);
    }
    // 白玛教诵念关闭 → 设 flag
    if (dialogue?.dialogueId === 'dlg_baima_sang_chant') {
      onSetNpcFlag('baima', 'hasTaughtSangChant', true);
    }
    // 格桑主线链尾：场景二完成
    if (dialogue?.dialogueId === 'dlg_gesang_scene2_guide') {
      onSetNpcFlag('gesang', 'gesangScene2Completed', true);
    }
    // 格桑主线链尾：场景四完成
    if (dialogue?.dialogueId === 'dlg_gesang_scene4_close') {
      onSetNpcFlag('gesang', 'gesangScene4Completed', true);
    }

    // 旧木盒：首次关闭 → 触发旦增照片揭示
    if (dialogue?.dialogueId === 'dlg_old_wood_box' && !danzengHasShownPhoto) {
      onSetNpcFlag('danzeng', 'hasShownPhoto', true);
      onInteract({ dialogueId: 'dlg_danzeng_photo_reveal', label: '旦增', isNpc: true });
      return;
    }

    // 经堂开门剧情：关闭后自动进入经堂
    if (dialogue?.dialogueId === 'dlg_temple_opened_by_baima'
        || dialogue?.dialogueId === 'dlg_temple_opened_by_zhuoma') {
      onNavigate('temple_interior');
      onCloseDialogue();
      return;
    }

    // 集中保存场景状态
    if (Object.keys(sceneChanges).length > 0) {
      saveGame({ scenes: sceneChanges });
    }
    onCloseDialogue();
  };

  // 链式推进：直接切换到下一段对话，不走 handleCloseDialogue（无副作用）
  const handleAdvanceDialogue = useCallback((nextDialogueId) => {
    onInteract({ dialogueId: nextDialogueId, label: dialogue?.itemLabel ?? '' });
  }, [dialogue?.itemLabel, onInteract]);

  // 玛尼堆特殊 onClick
  const handleManiClick = () => {
    if (maniState === 'collected') {
      onInteract({ dialogueId: 'dlg_mani_scroll_collected', label: '玛尼堆' });
    } else if (maniState === 'viewed') {
      onCollectScroll('scroll_page_1');
      onInteract({ dialogueId: 'dlg_mani_scroll_found', label: '玛尼堆' });
    } else {
      onInteract({ dialogueId: 'dlg_mani_pile', label: '玛尼堆' });
    }
  };

  // 白玛角落特殊 onClick
  const handleCornerClick = () => {
    if (cornerState === 'collected') {
      onInteract({ dialogueId: 'dlg_baima_corner_collected', label: '白玛的角落' });
    } else if (cornerState === 'viewed') {
      onCollectScroll('scroll_page_2');
      onInteract({ dialogueId: 'dlg_baima_corner_found', label: '白玛的角落' });
    } else if (cornerState === 'unviewed') {
      onInteract({ dialogueId: 'dlg_baima_corner_view', label: '白玛的角落' });
    } else {
      // locked：弹暗示旁白
      onInteract({ dialogueId: 'dlg_baima_corner_locked', label: '白玛的角落' });
    }
  };

  // 格桑画夹特殊 onClick
  const handleGesangPortfolioClick = () => {
    if (gesangPortfolioState === 'collected') {
      onInteract({ dialogueId: 'dlg_gesang_portfolio_collected', label: '格桑的画夹' });
    } else if (gesangPortfolioState === 'viewed') {
      onCollectScroll('scroll_page_3');
      onInteract({ dialogueId: 'dlg_gesang_portfolio_found', label: '格桑的画夹' });
    } else if (gesangPortfolioState === 'unviewed') {
      onInteract({ dialogueId: 'dlg_gesang_portfolio_view', label: '格桑的画夹' });
    } else {
      onInteract({ dialogueId: 'dlg_gesang_portfolio_locked', label: '格桑的画夹' });
    }
  };

  // 旦增院子石头特殊 onClick
  const handleDanzengStoneClick = () => {
    if (danzengStoneState === 'collected') {
      onInteract({ dialogueId: 'dlg_danzeng_stone_collected', label: '院中石' });
    } else if (danzengStoneState === 'viewed') {
      onCollectScroll('scroll_page_4');
      onInteract({ dialogueId: 'dlg_danzeng_stone_found', label: '院中石' });
    } else if (danzengStoneState === 'unviewed') {
      onInteract({ dialogueId: 'dlg_danzeng_stone_view', label: '院中石' });
    } else {
      onInteract({ dialogueId: 'dlg_danzeng_stone_locked', label: '院中石' });
    }
  };

  // 赤铁矿特殊 onClick（两态：未拾取/已拾取）
  const handleHematiteClick = () => {
    if (hematiteCollected) {
      onInteract({ dialogueId: 'dlg_hematite_collected', label: '赤铁矿' });
    } else {
      onCollectPigment('cinnabar_red');
      onInteract({ dialogueId: 'dlg_hematite_found', label: '赤铁矿' });
    }
  };

  // 铜炉特殊 onClick（三态：锈迹/可擦拭/已完成）
  const handleFurnaceClick = () => {
    if (furnaceStage === 0) {
      onInteract({ dialogueId: 'dlg_furnace_rust', label: '铜炉' });
    } else if (furnaceStage === 1) {
      onInteract({ dialogueId: 'dlg_furnace_inscription', label: '铜炉' });
    } else {
      onInteract({ dialogueId: 'dlg_furnace_done', label: '铜炉' });
    }
  };

  // 蓝色矿石A（真料）特殊 onClick
  const handleBlueOreAClick = () => {
    if (foqingCollected) {
      onInteract({ dialogueId: 'dlg_blue_ore_a_collected', label: '蓝色矿石' });
    } else if (scroll2Collected) {
      onCollectPigment('foqing_blue');
      onInteract({ dialogueId: 'dlg_blue_ore_a_correct', label: '蓝色矿石' });
    } else {
      onInteract({ dialogueId: 'dlg_blue_ore_generic', label: '蓝色矿石' });
    }
  };

  // 蓝色矿石B（伪料）特殊 onClick
  const handleBlueOreBClick = () => {
    if (scroll2Collected) {
      onInteract({ dialogueId: 'dlg_blue_ore_b_wrong', label: '蓝色矿石' });
    } else {
      onInteract({ dialogueId: 'dlg_blue_ore_generic', label: '蓝色矿石' });
    }
  };

  // 松石草特殊 onClick
  const handleGreenPlantClick = () => {
    if (songshiCollected) {
      onInteract({ dialogueId: 'dlg_green_plant_collected', label: '松石草' });
    } else {
      onCollectPigment('songshi_green');
      onInteract({ dialogueId: 'dlg_green_plant_found', label: '松石草' });
    }
  };

  // 老药方特殊 onClick
  const handleOldPrescriptionClick = () => {
    onInteract({ dialogueId: 'dlg_old_prescription', label: '老药方' });
  };

  // 金颜草特殊 onClick
  const handleGoldenHerbClick = () => {
    if (zangjinCollected) {
      onInteract({ dialogueId: 'dlg_golden_herb_collected', label: '金颜草' });
    } else {
      onCollectPigment('zangjin_gold');
      onInteract({ dialogueId: 'dlg_golden_herb_found', label: '金颜草' });
    }
  };

  // 氆氇碎片特殊 onClick
  const handleBaimaClothClick = () => {
    if (clothCollected || baimaHasGivenCloth) {
      onInteract({ dialogueId: 'dlg_baima_cloth_collected', label: '氆氇碎片' });
    } else if (danzengRevealedGubai && danzengTrustLevel >= 71) {
      onCollectScroll('pulu_fragment');
      onSetNpcFlag('baima', 'hasGivenCloth', true);
      onInteract({ dialogueId: 'dlg_baima_gubai_cloth', label: '氆氇碎片' });
    } else {
      onInteract({ dialogueId: 'dlg_baima_cloth_locked', label: '氆氇碎片' });
    }
  };

  // 仪式植物采集 onClick
  const handleSongBaiClick = () => {
    if (songBaiCollected) {
      onInteract({ dialogueId: 'dlg_song_bai_collected', label: '松柏' });
    } else {
      onCollectScroll('song_bai');
      onInteract({ dialogueId: 'dlg_song_bai_found', label: '松柏' });
    }
  };
  const handleDuSongClick = () => {
    if (duSongCollected) {
      onInteract({ dialogueId: 'dlg_du_song_collected', label: '杜松' });
    } else {
      onCollectScroll('du_song');
      onInteract({ dialogueId: 'dlg_du_song_found', label: '杜松' });
    }
  };
  const handleYeCaoClick = () => {
    if (yeCaoCollected) {
      onInteract({ dialogueId: 'dlg_ye_cao_collected', label: '高原野草' });
    } else {
      onCollectScroll('ye_cao');
      onInteract({ dialogueId: 'dlg_ye_cao_found', label: '高原野草' });
    }
  };

  // 白玛经幡内联提示文字（null = 不显示）
  const [hintText, setHintText] = useState(null);

  // useRef 防止 StrictMode 双重挂载导致提示被跳过
  const hintTriggeredRef = useRef(false);

  // 临时：进入山顶时自动清除旧的经幡拼图完成标记（测试用，后续移除）
  useEffect(() => {
    if (scene.id !== 'mountain_peak') return;
    try {
      if (localStorage.getItem('puzzle_prayer_flags_solved') === '1') {
        localStorage.removeItem('puzzle_prayer_flags_solved');
        localStorage.removeItem('puzzle_prayer_flags_hint_shown');
        // 同时清理新键名
        localStorage.removeItem('shanglu_puzzle_prayer_flags_solved');
        localStorage.removeItem('shanglu_puzzle_prayer_flags_hint_shown');
      }
    } catch { /* ignore */ }
  }, [scene.id]);

  // 藏獒状态1/2：进入旦增院子时的吠叫动画触发
  useEffect(() => {
    if (scene.id !== 'dangzeng_courtyard') return;
    if (dialogue) return;
    const dzTrust = npcTrust?.danzeng?.trustLevel ?? 0;
    if (dzTrust > 45) return;
    setMastiffAnimKey((k) => k + 1);
    audioManager.playSfx(SOUNDS.SFX.MASTIFF_BARK, { volumeScale: 0.3 });
  }, [scene.id, npcTrust, dialogue]);

  // BGM：全局播放 title_theme，不随场景切换

  // 场景三：首次进入旦增家院子 → 自动触发院墙外过场对话
  const scene3TriggeredRef = useRef(false);
  useEffect(() => {
    if (scene.id !== 'dangzeng_courtyard') return;
    if (dialogue) return;
    if (npcTrust?.danzeng?.flags?.hasVisitedDanzengWall) return;
    if (scene3TriggeredRef.current) return;
    scene3TriggeredRef.current = true;

    onInteract({ dialogueId: 'dlg_danzeng_scene3_look', label: '' });
    onSetNpcFlag('danzeng', 'hasVisitedDanzengWall', true);
  }, [scene.id, npcTrust, dialogue, onInteract, onSetNpcFlag]);

  // 经堂内部：唐卡赠予后的访问计数（戴夫式反馈）
  useEffect(() => {
    if (scene.id !== 'temple_interior') return;
    if (dialogue) return;
    if (!npcTrust?.danzeng?.flags?.hasGivenThangka) return;

    let visits = 0;
    try {
      const raw = localStorage.getItem('shanglu_thangka_placed_visits');
      visits = raw ? parseInt(raw, 10) || 0 : 0;
    } catch { /* ignore */ }

    const newVisits = visits + 1;
    try {
      localStorage.setItem('shanglu_thangka_placed_visits', String(newVisits));
    } catch { /* ignore */ }

    if (newVisits <= 3) {
      onInteract({ dialogueId: `dlg_temple_visit_${newVisits}`, label: '' });
    }
  }, [scene.id, npcTrust, dialogue]);

  // 场景切换时清除卡关引导高亮
  useEffect(() => {
    setStuckNpc(null);
  }, [scene.id]);

  // 白玛经幡提示：首次进入山顶且白玛≥listener 时，以非遮挡的内联浮层提示一次
  useEffect(() => {
    if (scene.id !== 'mountain_peak') return;
    if (dialogue) return;

    // 同一会话内已触发过（StrictMode 双重挂载守卫）
    if (hintTriggeredRef.current) return;

    try {
      if (localStorage.getItem('puzzle_prayer_flags_solved') === '1') return;
      if (localStorage.getItem('puzzle_prayer_flags_hint_shown') === '1') return;
      // 同时检查新键名
      if ((savedScenes.puzzlePrayerFlagsSolved === '1' || savedScenes.puzzlePrayerFlagsSolved === true)
       || (savedScenes.puzzlePrayerFlagsHintShown === '1' || savedScenes.puzzlePrayerFlagsHintShown === true)) return;
    } catch {
      return;
    }

    const baimaStage = getTrustStage('baima', npcTrust?.baima?.trustLevel ?? 0);
    if (!baimaStage || baimaStage.stage === 'stranger') return;

    // 标记已触发（内存 + localStorage 双保险）
    hintTriggeredRef.current = true;
    saveGame({ scenes: { puzzlePrayerFlagsHintShown: '1' } });

    // 复用 dlg_baima_flags_hint 的引语
    const dlg = DIALOGUES['dlg_baima_flags_hint'];
    const quote = dlg.lines.slice(1).map((l) => l.replace(/[""""]/g, '')).join('');
    setHintText(`白玛：${quote}`);

    const timer = setTimeout(() => setHintText(null), 5000);
    return () => clearTimeout(timer);
  }, [scene.id, npcTrust, dialogue]);  // 移除 onInteract，effect 体内不再使用它

  // 当前场景的物件数据
  const sceneItems = interactables
    .map((id) => ITEMS[id])
    .filter(Boolean)
    // 骨白流程：氆氇碎片仅在旦增已透露骨白秘密后出现（且未被拾取，且旦增≥confidant）
    .filter((item) => {
      if (item.id === 'baima_cloth') {
        return danzengRevealedGubai && danzengTrustLevel >= 71 && !baimaHasGivenCloth;
      }
      return true;
    });

  // 当前场景的 NPC 数据
  const sceneNpcs = (npcs || [])
    .map((id) => NPCS[id])
    .filter(Boolean);

  // 对话数据
  const dialogueData = dialogue ? DIALOGUES[dialogue.dialogueId] : null;
  const viewingScroll = viewingItem?.type === 'scroll' ? SCROLLS[viewingItem.id] : null;
  const viewingPigment = viewingItem?.type === 'pigment' ? PIGMENTS[viewingItem.id] : null;
  const viewingPigmentState = viewingPigment ? pigments?.[viewingPigment.id] : null;
  const viewingPulu = viewingItem?.type === 'pulu';
  const viewingThangka = viewingItem?.type === 'thangka';
  const viewingThangkaReplica = viewingItem?.type === 'thangka_replica';
  const viewingMemoryCanvas = viewingItem?.type === 'memory_canvas';
  const viewingSangRitual = viewingItem?.type === 'sang_ritual';
  const viewingSpecialItem = viewingItem?.type === 'special_item' ? viewingItem.id : null;

  // ─── 保存布局到源码文件 ───
  const [layoutToast, setLayoutToast] = useState('');
  const handleSaveLayout = useCallback(() => {
    const data = {
      positions: customPositions,
      scales: customScales,
      exits: exitPositions,
      exitScale: exitSharedScale,
      exitRots: exitRotations,
      puzzlesPos: puzzlePositions,
      puzzlesScl: puzzleScales,
    };
    const code =
`/**
 * 自定义布局默认值 —— 拖拽调整后点击"保存布局"按钮写入此文件
 * 换浏览器/清缓存后位置不丢失
 */

const custom = ${JSON.stringify(data, null, 2)};

export default custom;
`;
    navigator.clipboard.writeText(code).then(() => {
      setLayoutToast('布局代码已复制到剪贴板，粘贴替换 src/data/customPositions.js');
      setTimeout(() => setLayoutToast(''), 4000);
    }).catch(() => {
      setLayoutToast('复制失败，请查看控制台');
      console.log(code);
      setTimeout(() => setLayoutToast(''), 4000);
    });
  }, [customPositions, customScales, exitPositions, exitSharedScale, exitRotations, puzzlePositions, puzzleScales]);

  return (
    <div
      className={`scene${dialogue ? ' dialogue-active' : ''}`}
      onClick={resetIdleTimer}
    >
      {/* 天空（无图时显示背景色+CSS装饰） */}
      <div className="scene__sky" style={{ backgroundColor: bgColor }}>
        {/* 场景装饰图形 */}
        <SceneDecoration sceneId={scene.id} npcTrust={npcTrust} mastiffAnimKey={mastiffAnimKey} />
      </div>

      {/* 地面（无图时显示） */}
      <div className="scene__ground" style={{ backgroundColor: groundColor }} />

      {/* 场景背景图 — 覆盖整个场景（天空+地面），有图时遮住 sky/ground */}
      <SceneDecorationImage key={scene.id} sceneId={scene.id} />

      {/* 场景交互物件容器 —— 对话时整体隐藏 */}
      <div className="scene-interactables">

      {/* 出口按钮 */}
      {exits.map((exit) => {
        const compoundKey = `${scene.id}__${exit.target}`;
        const defaultPos = EXIT_DEFAULT_POSITIONS[exit.side] || { top: '50%', left: '50%' };
        const customPos = exitPositions[compoundKey] || defaultPos;
        const rotation = exitRotations[compoundKey] ?? (EXIT_DEFAULT_ROTATIONS[exit.side] ?? 0);
        return (
          <SceneExit
            key={compoundKey}
            sceneId={scene.id}
            exit={exit}
            onClick={() => {
              // 卧室：需赠送唐卡
              const isBedroomUnlocked = exit.target === 'dangzeng_bedroom'
                && npcTrust?.danzeng?.flags?.hasGivenThangka;
              // 经堂：需卓玛或白玛知己 + 赠送过唐卡
              if (exit.target === 'temple_interior') {
                if (templeOpened) {
                  onNavigate(exit.target);
                } else if (hasGivenThangka && (baimaConfidant || zhuomaConfidant)) {
                  // 触发开门剧情
                  const openDialogue = baimaConfidant
                    ? 'dlg_temple_opened_by_baima'
                    : 'dlg_temple_opened_by_zhuoma';
                  onSetNpcFlag('baima', 'hasOpenedTemple', true);
                  onSetNpcFlag('zhuoma', 'hasOpenedTemple', true);
                  onInteract({ dialogueId: openDialogue, label: baimaConfidant ? '白玛' : '卓玛', isNpc: true });
                } else {
                  onInteract({ dialogueId: exit.dialogueId, label: exit.label });
                }
              } else if (exit.locked && !isBedroomUnlocked) {
                onInteract({ dialogueId: exit.dialogueId, label: exit.label });
              } else {
                onNavigate(exit.target);
              }
            }}
            sharedScale={exitSharedScale}
            onScaleChange={handleExitScaleChange}
            onDragEnd={handleExitDragEnd}
            onRotate={handleExitRotate}
            customPosition={customPos}
            customRotation={rotation}
          />
        );
      })}

      {/* 场景名 */}
      <div className="scene__name">{scene.name}</div>

      {/* 白玛经幡内联提示（非遮挡，自动消失） */}
      {hintText && (
        <div className="scene__hint" role="status" aria-live="polite">
          {hintText}
        </div>
      )}

      {/* 可交互物件 —— 玛尼堆、白玛角落、格桑画夹特殊处理 */}
      {sceneItems.map((item) => {
        const isMani = item.id === 'mani_pile';
        const isCorner = item.id === 'baima_corner';
        const isPortfolio = item.id === 'gesang_portfolio';
        const isStone = item.id === 'danzeng_stone';
        const isHematite = item.id === 'hematite';
        const isFurnace = item.id === 'furnace';
        const isBlueOreA = item.id === 'blue_ore_a';
        const isBlueOreB = item.id === 'blue_ore_b';
        const isGreenPlant = item.id === 'green_plant';
        const isOldPrescription = item.id === 'old_prescription';
        const isGoldenHerb = item.id === 'golden_herb';
        const isBaimaCloth = item.id === 'baima_cloth';
        const isSangStove = item.id === 'sang_stove';
        const isSongBai = item.id === 'song_bai';
        const isDuSong = item.id === 'du_song';
        const isYeCao = item.id === 'ye_cao';
        const highlight =
          (isMani && maniState === 'viewed') ||
          (isPortfolio && gesangPortfolioState === 'viewed') ||
          (isStone && danzengStoneState === 'viewed') ||
          (isFurnace && furnaceStage === 1);
        return (
          <Interactable
            key={item.id}
            item={{
              ...item,
              position: customPositions[item.id] || item.position,
            }}
            highlight={highlight}
            breathing={item.id === breathingItemId}
            onDragEnd={handleItemDragEnd}
            scale={customScales[item.id] ?? 1}
            onScaleChange={handleScaleChange}
            onClick={
              isMani ? handleManiClick :
              isCorner ? handleCornerClick :
              isPortfolio ? handleGesangPortfolioClick :
              isStone ? handleDanzengStoneClick :
              isHematite ? handleHematiteClick :
              isFurnace ? handleFurnaceClick :
              isBlueOreA ? handleBlueOreAClick :
              isBlueOreB ? handleBlueOreBClick :
              isGreenPlant ? handleGreenPlantClick :
              isOldPrescription ? handleOldPrescriptionClick :
              isGoldenHerb ? handleGoldenHerbClick :
              isBaimaCloth ? handleBaimaClothClick :
              isSangStove ? (() => { onViewItem({ type: 'sang_ritual' }); }) :
              isSongBai ? handleSongBaiClick :
              isDuSong ? handleDuSongClick :
              isYeCao ? handleYeCaoClick :
              () => onInteract(item)
            }
          />
        );
      })}

      {/* 六字真言拼图 —— 仅经堂外场景 */}
      {scene.id === 'temple_exterior' && (
        <PuzzleWrapper
          puzzleId="mani_stones"
          position={puzzlePositions['mani_stones'] || { top: '92%', left: '50%' }}
          scale={puzzleScales['mani_stones'] ?? 1}
          onDragEnd={handlePuzzleDragEnd}
          onScaleChange={handlePuzzleScaleChange}
        >
          <SortablePuzzle
            puzzleId={MANI_STONE_PUZZLE.id}
            items={MANI_STONE_PUZZLE.items}
            correctOrder={MANI_STONE_PUZZLE.correctOrder}
            onSolved={() => onInteract({
              dialogueId: 'dlg_mani_stones_solved',
              label: '六字真言石',
            })}
            columns={6}
            slotGap={6}
            onStuck={({ npc }) => setStuckNpc(npc)}
            npcHint="danzeng"
          />
        </PuzzleWrapper>
      )}

      {/* 经幡排序拼图 —— 仅山顶场景；白玛≥listener 解锁 */}
      {scene.id === 'mountain_peak' && (() => {
        const baimaStage = getTrustStage('baima', npcTrust?.baima?.trustLevel ?? 0);
        const isFlagsLocked = !baimaStage || baimaStage.stage === 'stranger';
        return (
          <PuzzleWrapper
            puzzleId="prayer_flags"
            position={puzzlePositions['prayer_flags'] || { top: '92%', left: '50%' }}
            scale={puzzleScales['prayer_flags'] ?? 1}
            onDragEnd={handlePuzzleDragEnd}
            onScaleChange={handlePuzzleScaleChange}
          >
            <SortablePuzzle
              puzzleId={PRAYER_FLAGS_PUZZLE.id}
              items={PRAYER_FLAGS_PUZZLE.items}
              correctOrder={PRAYER_FLAGS_PUZZLE.correctOrder}
              onSolved={() => {
                onAdjustTrust('baima', 10);
                onInteract({ dialogueId: 'dlg_flags_solved', label: '经幡' });
              }}
              columns={5}
              slotGap={4}
              disabled={isFlagsLocked}
              className="sortable-puzzle--flags"
              getItemStyle={(item) => {
                const FLAG_COLORS = {
                  blue: '#1A5C8B', white: '#F0EDE5', red: '#8B1A1A',
                  green: '#3A7D5A', yellow: '#D4A574',
                };
                return { backgroundColor: FLAG_COLORS[item.id] || '#888' };
              }}
              onStuck={({ npc }) => setStuckNpc(npc)}
              npcHint="baima"
            />
          </PuzzleWrapper>
        );
      })()}

      {/* NPC */}
      {sceneNpcs.map((npc) => {
        const trust = npcTrust?.[npc.id];
        const stage = trust ? getTrustStage(npc.id, trust.trustLevel) : null;
        let dialogueId = stage ? `dlg_${npc.id}_${stage.stage}` : null;

        // 仁青：首次见面→固定对话，之后→话题面板
        if (npc.id === 'renqing') {
          if (!renqingFirstMet) {
            dialogueId = 'dlg_renqing_stage1';
          } else {
            dialogueId = null; // 走话题面板
          }
        }

        // 唐卡赠予：判断高亮和对话
        const hasReplica = inventory?.includes('thangka_replica');
        let replica = null;
        try {
          const raw = localStorage.getItem('shanglu_thangka_replica') || localStorage.getItem('thangka_replica');
          replica = raw ? JSON.parse(raw) : null;
        } catch { /* ignore */ }
        const isGiftable = npc.id === 'danzeng' || npc.id === 'gesang' || npc.id === 'baima';
        const isGifted = npc.id === 'danzeng' ? trust?.flags?.hasGivenThangka
          : npc.id === 'gesang' ? trust?.flags?.gesang_saw_thangka
          : npc.id === 'baima' ? trust?.flags?.baima_saw_thangka
          : true;
        const highlight = isGiftable && hasReplica && !isGifted;

        if (highlight) {
          if (npc.id === 'danzeng') {
            dialogueId = replica?.quality === '深刻理解' ? 'dlg_danzeng_thangka_deep' : 'dlg_danzeng_thangka_basic';
          } else if (npc.id === 'gesang') {
            dialogueId = 'dlg_gesang_thangka';
          } else if (npc.id === 'baima') {
            dialogueId = 'dlg_baima_thangka';
          }
        }

        // 格桑/旦增/白玛特殊对话（仅在无赠予时生效）
        if (!highlight) {
          // 格桑：统一 if-else 链（scene2 > scene4 > zangjin > 信任阶段）
          if (npc.id === 'gesang') {
            const gesangScene2Completed = trust?.flags?.gesangScene2Completed ?? false;
            const gesangScene4Completed = trust?.flags?.gesangScene4Completed ?? false;
            const hasVisitedDanzengWall = npcTrust?.danzeng?.flags?.hasVisitedDanzengWall ?? false;

            if (!gesangScene2Completed) {
              dialogueId = 'dlg_gesang_scene2_opening';
            } else if (hasVisitedDanzengWall && !gesangScene4Completed) {
              dialogueId = 'dlg_gesang_scene4_opening';
            } else if (stage && stage.stage !== 'stranger' && zangjinCollected && !gesangHasTaughtZangjin) {
              dialogueId = 'dlg_gesang_zangjin_recipe';
            }
          }
          // 旦增骨白特殊对话：confidant 阶段 + 未透露过
          if (
            npc.id === 'danzeng' &&
            stage &&
            stage.stage === 'confidant' &&
            !danzengRevealedGubai
          ) {
            dialogueId = 'dlg_danzeng_gubai_secret';
          }
          // 白玛氆氇碎片特殊对话：旦增已透露 + 未问过白玛
          if (
            npc.id === 'baima' &&
            danzengRevealedGubai &&
            !baimaHasAskedAboutCloth
          ) {
            dialogueId = 'dlg_baima_gubai_cloth';
          }
        }

        // 白玛辨认藏文：area4 已点击 + 碎片4未解锁
        if (npc.id === 'baima' && canvasArea4Clicked && !highlight) {
          const frags = (() => {
            try {
              const raw = localStorage.getItem('shanglu_memory_canvas_fragments') || localStorage.getItem('memory_canvas_fragments');
              return JSON.parse(raw || '{}');
            }
            catch { return {}; }
          })();
          if (!frags.fragment_4?.owned) {
            dialogueId = 'dlg_baima_identify_script';
          }
        }

        // 白玛煨桑教学：非stranger阶段即可触发
        if (npc.id === 'baima' && stage && stage.stage !== 'stranger'
            && !highlight && !canvasArea4Clicked) {
          const baimaTrust = npcTrust?.baima;
          if (!baimaTrust?.flags?.hasTaughtSangOrder) {
            dialogueId = 'dlg_baima_sang_order';
          } else if (!baimaTrust?.flags?.hasTaughtSangChant) {
            dialogueId = 'dlg_baima_sang_chant';
          }
        }

  return (
          <NPC
            key={npc.id}
            npc={{
              ...npc,
              position: customPositions[`npc_${npc.id}`] || npc.position,
            }}
            trustStage={stage}
            highlight={highlight}
            stuckHint={stuckNpc === npc.id}
            onDragEnd={handleNpcDragEnd}
            scale={customScales[`npc_${npc.id}`] ?? 1}
            onScaleChange={handleScaleChange}
            onClick={() => {
              if (stuckNpc === npc.id) setStuckNpc(null);
              if (npc.id === 'renqing' && renqingFirstMet) {
                setTopicPanelOpen(true);
              } else {
                onInteract({ dialogueId, label: npc.name, isNpc: true });
              }
            }}
          />
        );
      })}

      {/* 信任值调试面板（折叠浮层，默认收起） */}
      {onAdjustTrust && sceneNpcs.length > 0 && (
        <>
          {/* 触发按钮 —— 右上角 */}
          <button
            className="scene__trust-toggle"
            onClick={() => setTrustPanelOpen((v) => !v)}
            aria-label={trustPanelOpen ? '收起调试面板' : '展开调试面板'}
            title="信任值调试"
          >
            🔧
          </button>

          {/* 展开的浮层面板 */}
          {trustPanelOpen && (
            <div className="scene__trust-overlay" onClick={() => setTrustPanelOpen(false)}>
              <div className="scene__trust-panel" onClick={(e) => e.stopPropagation()}>
                {sceneNpcs.map((npc) => {
                  const trust = npcTrust?.[npc.id];
                  const stage = trust ? getTrustStage(npc.id, trust.trustLevel) : null;
                  if (!stage) return null;
                  return (
                    <TrustDebug
                      key={npc.id}
                      npcName={npc.name}
                      stage={stage}
                      onAddTrust={() => onAdjustTrust(npc.id, 10)}
                      onSubTrust={() => onAdjustTrust(npc.id, -10)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* 设置按钮 */}
      <button
        className="scene__settings-toggle"
        onClick={() => setSettingsOpen((v) => !v)}
        aria-label="游戏设置"
        title="设置"
      >
        <span className="scene__icon-text">⚙</span>
      </button>

      {settingsOpen && (
        <SettingsPanel
          onClose={() => setSettingsOpen(false)}
          onOpenReview={() => {
            setSettingsOpen(false);
            setReviewOpen(true);
          }}
        />
      )}

      {/* 对话回顾按钮 */}
      <button
        className="scene__notebook-toggle"
        onClick={() => {
          setReviewOpen((v) => !v);
          if (redDots.dialogue) setRedDot('dialogue', false);
        }}
        aria-label="对话回顾"
        title="对话回顾"
      >
        <span className="scene__icon-text">📖</span>
        {redDots.dialogue && <span className="scene__reddot" />}
      </button>

      {reviewOpen && (
        <DialogueReview
          onClose={() => setReviewOpen(false)}
          talkedToNpcs={getTalkedToNpcs()}
        />
      )}

      {/* 记忆画布按钮 */}
      <button
        className="scene__canvas-toggle"
        onClick={() => {
          setCanvasOpen(true);
          if (redDots.canvas) setRedDot('canvas', false);
        }}
        aria-label="记忆画布"
        title="记忆画布"
      >
        <span className="scene__icon-text">🖼</span>
        {redDots.canvas && <span className="scene__reddot" />}
      </button>

      {canvasOpen && (
        <MemoryCanvasViewer
          onClose={() => setCanvasOpen(false)}
          onInteract={onInteract}
        />
      )}

      {/* 物品收藏按钮 */}
      <button
        className="scene__collection-toggle"
        onClick={() => {
          setCollectionOpen((v) => !v);
          if (redDots.collection) setRedDot('collection', false);
        }}
        aria-label="物品收藏"
        title="物品收藏"
      >
        <span className="scene__icon-text">📦</span>
        {redDots.collection && <span className="scene__reddot" />}
      </button>

      {/* 物品收藏浮层 */}
      {collectionOpen && (
        <CollectionPanel
          inventory={inventory ?? []}
          pigments={pigments}
          onViewScroll={(scrollId) => {
            onViewItem(scrollId);
          }}
          onViewPigment={(pigmentId) => {
            onViewItem({ type: 'pigment', id: pigmentId });
          }}
          onViewPulu={() => {
            onViewItem({ type: 'pulu' });
          }}
          onViewThangkaReplica={() => {
            onViewItem({ type: 'thangka_replica' });
          }}
          onViewSpecialItem={(itemId) => {
            onViewItem({ type: 'special_item', id: itemId });
          }}
          onStartThangka={() => {
            setCollectionOpen(false);
            onViewItem({ type: 'thangka' });
          }}
          onClose={() => setCollectionOpen(false)}
        />
      )}

      </div>{/* end .scene-interactables */}

      {/* 暗色遮罩层 —— 对话框背后，z-index: 50 */}
      {dialogue && <div className="dialogue-backdrop" />}

      {/* 对话弹出层 */}
      {(dialogue && (dialogueData || dialogue.startInAi)) && (
        <DialogueOverlay
          dialogue={dialogueData}
          itemLabel={dialogue.itemLabel}
          isNpc={dialogue.isNpc}
          startInAi={dialogue.startInAi || false}
          npcIdOverride={dialogue.npcId || null}
          onClose={handleCloseDialogue}
          onKeyLineAdded={() => setRedDot('dialogue', true)}
          onAdvanceDialogue={handleAdvanceDialogue}
        />
      )}

      {/* 残卷查看层 */}
      {viewingScroll && (
        <ScrollViewer scroll={viewingScroll} onClose={onCloseViewer} />
      )}
      {viewingPigment && (
        <PigmentViewer
          pigment={viewingPigment}
          pigmentState={viewingPigmentState}
          onClose={onCloseViewer}
          danzengRevealed={danzengRevealedGubai}
          canCompareRecipe={viewingPigment.id === 'songshi_green' && oldPrescriptionViewed}
          onCompareRecipe={() => {
            onCloseViewer();
            onInteract({ dialogueId: 'dlg_songshi_compare', label: '松石绿·对照药方' });
          }}
        />
      )}
      {viewingPulu && (
        <PuluGrinder
          onGrindComplete={() => {
            onCollectPigment('gubai_white');
            onLearnRecipe('gubai_white');
            onCloseViewer();
            onInteract({ dialogueId: 'dlg_pulu_grind_done', label: '氆氇碎片' });
          }}
          onClose={onCloseViewer}
        />
      )}
      {viewingThangka && (
        <ThangkaWorkshop
          pigments={pigments}
          inventory={inventory}
          onClose={onCloseViewer}
          onComplete={(result) => {
            try {
              const sceneUpdates = { thangkaStep2Done: '1' };
              if (result) {
                sceneUpdates.thangkaReplica = {
                  completed: true,
                  quality: result.quality,
                  step3Choice: result.choice,
                  completedAt: Date.now(),
                };
              }
              saveGame({ scenes: sceneUpdates });
            } catch { /* ignore */ }
            if (!inventory.includes('thangka_replica')) {
              onCollectScroll('thangka_replica');
            }
            onCloseViewer();
          }}
          onStuck={({ npc }) => setStuckNpc(npc)}
        />
      )}
      {viewingThangkaReplica && (
        <ThangkaReplicaViewer onClose={onCloseViewer} />
      )}
      {viewingMemoryCanvas && (
        <MemoryCanvasViewer
          onClose={onCloseViewer}
          onInteract={(dialogueInfo) => {
            onCloseViewer();
            onInteract(dialogueInfo);
          }}
        />
      )}
      {viewingSangRitual && (
        <SangRitualViewer
          inventory={inventory ?? []}
          onClose={onCloseViewer}
          onInteract={(dialogueInfo) => {
            onCloseViewer();
            onInteract(dialogueInfo);
          }}
          onComplete={() => {
            onAdjustTrust('baima', 15);
            onCloseViewer();
          }}
          onStuck={() => setStuckNpc('baima')}
        />
      )}
      {viewingSpecialItem && (
        <SpecialItemViewer
          itemId={viewingSpecialItem}
          onClose={onCloseViewer}
        />
      )}
      {/* 仁青话题面板 */}
      {topicPanelOpen && (() => {
        const topics = [
          {
            id: 'photo1',
            label: '你提到见过唐卡的照片，能给我看看吗？',
            dialogueId: 'dlg_renqing_photo_give',
            requireFlag: null,
            requireFlagMet: true,
            triggered: photo1Given,
          },
          {
            id: 'photo2',
            label: '你还拍过其他照片吗？',
            dialogueId: 'dlg_renqing_photo_compare',
            requireFlag: 'renqing_photo1_given',
            requireFlagMet: photo1Given,
            triggered: photo2Given,
          },
        ];
        return (
          <TopicPanel
            npcName="仁青"
            topics={topics}
            onSelectTopic={(topic) => {
              setTopicPanelOpen(false);
              onInteract({ dialogueId: topic.dialogueId, label: '仁青', isNpc: true });
            }}
            onFreeChat={() => {
              setTopicPanelOpen(false);
              onInteract({ dialogueId: null, label: '仁青', isNpc: true, startInAi: true, npcId: 'renqing' });
            }}
            onClose={() => setTopicPanelOpen(false)}
          />
        );
      })()}

      {/* 保存布局按钮（开发工具） */}
      <button
        className="scene__save-layout-btn"
        onClick={handleSaveLayout}
        title="将当前拖拽调整的所有位置写入源码文件，换浏览器不丢失"
      >
        💾 保存布局
      </button>
      {layoutToast && <div className="scene__save-layout-toast">{layoutToast}</div>}
    </div>
  );
}

/**
 * 场景背景图层 —— 渲染场景背景图片，缺失时自动隐藏（回退到 CSS 装饰）
 */
function SceneDecorationImage({ sceneId }) {
  const [imgError, setImgError] = useState(false);
  const src = SCENE_BG[sceneId];
  // 路径变化时重置错误状态，允许新的图片重新尝试加载
  useEffect(() => { setImgError(false); }, [src]);
  if (!src || imgError) return null;
  return (
    <img
      src={src}
      alt=""
      className="scene__bg-image"
      onError={() => setImgError(true)}
    />
  );
}

/**
 * 场景装饰 —— 用纯 CSS 几何图形点缀
 */
function SceneDecoration({ sceneId, npcTrust, mastiffAnimKey }) {
  switch (sceneId) {
    case 'village_entrance':
      return (
        <div className="scene__decor">
          {/* 远山 */}
          <div className="decor-mountain decor-mountain--far" />
          <div className="decor-mountain decor-mountain--near" />
          {/* 玛尼堆 */}
          <div className="decor-mani">
            <div className="decor-mani__stone decor-mani__stone--1" />
            <div className="decor-mani__stone decor-mani__stone--2" />
            <div className="decor-mani__stone decor-mani__stone--3" />
          </div>
          {/* 路标杆 */}
          <div className="decor-signpost" />
        </div>
      );

    case 'village_square':
      return (
        <div className="scene__decor">
          {/* 远山 */}
          <div className="decor-mountain decor-mountain--far" />
          {/* 经幡线 */}
          <div className="decor-flags-line decor-flags-line--1" />
          <div className="decor-flags-line decor-flags-line--2" />
          <div className="decor-flags-line decor-flags-line--3" />
          {/* 经幡旗 */}
          <div className="decor-flag decor-flag--1" />
          <div className="decor-flag decor-flag--2" />
          <div className="decor-flag decor-flag--3" />
          {/* 水井 */}
          <div className="decor-well" />
        </div>
      );

    case 'dangzeng_courtyard':
      // 藏獒状态（根据旦增信任值）
      const dzTrustLevel = npcTrust?.danzeng?.trustLevel ?? 0;
      const mastiffState = dzTrustLevel <= 20 ? 1 : dzTrustLevel <= 45 ? 2 : dzTrustLevel <= 70 ? 3 : 4;
      return (
        <div className="scene__decor">
          {/* 帐篷主体 */}
          <div className="decor-tent" />
          {/* 帐篷门 */}
          <div className="decor-tent-door" />
          {/* 藏獒 */}
          <div className={`decor-mastiff decor-mastiff--state${mastiffState}`} key={`mastiff-${mastiffAnimKey}`}>
            <div className="decor-mastiff__body" />
            <div className="decor-mastiff__head" />
            {mastiffState === 4 && <div className="decor-mastiff__tail" />}
          </div>
          {/* 围墙 */}
          <div className="decor-wall" />
        </div>
      );

    case 'temple_exterior':
      return (
        <div className="scene__decor">
          <div className="decor-temple-roof" />
          <div className="decor-temple" />
          <div className="decor-temple-door" />
          <div className="decor-flags-line decor-flags-line--temple" />
          <div className="decor-flag decor-flag--temple-1" />
          <div className="decor-flag decor-flag--temple-2" />
        </div>
      );

    case 'mountain_peak':
      return (
        <div className="scene__decor">
          <div className="decor-peak decor-peak--side" />
          <div className="decor-peak decor-peak--main" />
          <div className="decor-snowcap" />
          {/* 五色经幡线 —— 与底部拼图颜色对应 */}
          <div className="decor-flags-line decor-flags-line--blue" />
          <div className="decor-flags-line decor-flags-line--white" />
          <div className="decor-flags-line decor-flags-line--red" />
          <div className="decor-flags-line decor-flags-line--green" />
          <div className="decor-flags-line decor-flags-line--yellow" />
        </div>
      );

    case 'sangtai':
      return (
        <div className="scene__decor">
          <div className="decor-sang">
            <div className="decor-sang__stone decor-sang__stone--1" />
            <div className="decor-sang__stone decor-sang__stone--2" />
            <div className="decor-sang__stone decor-sang__stone--3" />
          </div>
          <div className="decor-smoke decor-smoke--1" />
          <div className="decor-smoke decor-smoke--2" />
          <div className="decor-smoke decor-smoke--3" />
        </div>
      );

    case 'gesang_corner':
      return (
        <div className="scene__decor">
          <div className="decor-easel" />
          <div className="decor-canvas" />
          <div className="decor-painting" />
          <div className="decor-paper decor-paper--1" />
          <div className="decor-paper decor-paper--2" />
          <div className="decor-paper decor-paper--3" />
        </div>
      );

    case 'temple_interior':
      return (
        <div className="scene__decor">
          <div className="decor-temple-int-wall" />
          <div className="decor-temple-int-frame" />
          <div className="decor-temple-int-mural" />
          <div className="decor-temple-int-lamp" />
        </div>
      );

    default:
      return null;
  }
}
