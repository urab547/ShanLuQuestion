import { useState, useCallback, useRef, useEffect } from 'react';
import { SCENES } from './data/scenes';
import { INITIAL_NPC_TRUST } from './data/npcTrust';
import { INITIAL_PIGMENT_STATE } from './data/pigments';
import { saveGame, loadGame, hasSave, deleteSave } from './data/saveManager';
import { audioManager, SOUNDS } from './utils/audioManager';
import Scene from './components/Scene';
import StartScreen from './components/StartScreen';
import IntroScreen from './components/IntroScreen';
import './App.css';

/**
 * App —— 根组件
 *
 * 状态：
 * - currentSceneId: 当前场景
 * - dialogue: 当前对话 { dialogueId, itemLabel } | null
 * - npcTrust: NPC 信任状态（信任值玩家不可见，仅通过对话文字体现）
 * - inventory: 道具栏（已收集残卷 id 列表），localStorage 持久化
 * - viewingItem: 当前查看的残卷 { type: 'scroll', id } | null
 */
function App() {
  // 游戏阶段: 'start' | 'intro' | 'playing'
  const [gameState, setGameState] = useState('start');

  // 检测存档是否存在
  const saveExists = hasSave();

  const [currentSceneId, setCurrentSceneId] = useState(() => {
    const saved = loadGame();
    if (saved.currentScene && SCENES[saved.currentScene]) {
      return saved.currentScene;
    }
    return 'village_entrance';
  });
  const [dialogue, setDialogue] = useState(null);
  const [npcTrust, setNpcTrust] = useState(() => {
    try {
      const saved = localStorage.getItem('shanglu_npc_trust');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_NPC_TRUST, ...parsed };
      }
    } catch { /* ignore */ }
    return INITIAL_NPC_TRUST;
  });

  // 道具栏（localStorage 持久化）
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('shanglu_inventory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 当前查看的残卷
  const [viewingItem, setViewingItem] = useState(null);

  // 颜料状态（localStorage 持久化）
  const [pigments, setPigments] = useState(() => {
    try {
      const saved = localStorage.getItem('shanglu_pigments');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_PIGMENT_STATE, ...parsed };
      }
    } catch { /* ignore */ }
    return INITIAL_PIGMENT_STATE;
  });

  const currentScene = SCENES[currentSceneId];

  // 立即初始化音量并尝试播放 BGM（部分环境允许直接自动播放）
  useEffect(() => {
    audioManager.setEnvVolume(Number(localStorage.getItem('shanglu_env_volume') || 80));
    audioManager.setSfxVolume(Number(localStorage.getItem('shanglu_sfx_volume') || 80));
    audioManager.playBgm(SOUNDS.BGM.TITLE);
  }, []);

  // 浏览器 autoplay 回退：首次交互后重试（playBgm 内部已去重，不会重复播放）
  useEffect(() => {
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      audioManager.playBgm(SOUNDS.BGM.TITLE);
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('mousemove', unlock);
      document.removeEventListener('touchstart', unlock);
    };
    document.addEventListener('pointerdown', unlock);
    document.addEventListener('keydown', unlock);
    document.addEventListener('mousemove', unlock);
    document.addEventListener('touchstart', unlock);
    return () => {
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('mousemove', unlock);
      document.removeEventListener('touchstart', unlock);
    };
  }, []);

  const handleNavigate = (targetSceneId) => {
    setCurrentSceneId(targetSceneId);
    setDialogue(null);
    // 场景切换时自动保存
    try { saveGame({ currentScene: targetSceneId }); } catch { /* ignore */ }
  };

  const handleInteract = (item) => {
    setDialogue({
      dialogueId: item.dialogueId,
      itemLabel: item.label,
      isNpc: item.isNpc || false,
      startInAi: item.startInAi || false,
      npcId: item.npcId || null,
    });
  };

  const handleCloseDialogue = () => {
    setDialogue(null);
  };

  // 拾取残卷
  const handleCollectScroll = useCallback((scrollId) => {
    setInventory((prev) => {
      if (prev.includes(scrollId)) return prev;
      const next = [...prev, scrollId];
      try {
        localStorage.setItem('shanglu_inventory', JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    audioManager.playSfx(SOUNDS.SFX.SCROLL_UNFOLD);
  }, []);

  // 查看道具（兼容残卷字符串和颜料对象两种调用）
  const handleViewItem = useCallback((arg) => {
    if (typeof arg === 'string') {
      setViewingItem({ type: 'scroll', id: arg });
    } else {
      setViewingItem(arg);
    }
  }, []);

  // 关闭残卷查看
  const handleCloseViewer = useCallback(() => {
    setViewingItem(null);
  }, []);

  // 全局存档（供 Scene 在对话/谜题完成后调用）
  const triggerSave = useCallback((sceneState = null) => {
    const payload = { currentScene: currentSceneIdRef.current };
    if (sceneState) payload.scenes = sceneState;
    saveGame(payload);
  }, []);

  // 用 ref 跟踪 currentSceneId 最新值，避免 triggerSave 闭包过期
  const currentSceneIdRef = useRef(currentSceneId);
  currentSceneIdRef.current = currentSceneId;

  const handleAdjustTrust = useCallback((npcId, delta) => {
    setNpcTrust((prev) => {
      const current = prev[npcId];
      if (!current) return prev;
      const newLevel = Math.min(100, Math.max(0, current.trustLevel + delta));
      const next = {
        ...prev,
        [npcId]: { ...current, trustLevel: newLevel },
      };
      try { localStorage.setItem('shanglu_npc_trust', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    setDialogue(null);
  }, []);

  // 设置 NPC 事件标记
  const handleSetNpcFlag = useCallback((npcId, flagName, value) => {
    setNpcTrust((prev) => {
      const current = prev[npcId];
      if (!current) return prev;
      const next = {
        ...prev,
        [npcId]: { ...current, flags: { ...current.flags, [flagName]: value } },
      };
      try { localStorage.setItem('shanglu_npc_trust', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // 采集颜料原材料
  const handleCollectPigment = useCallback((pigmentId) => {
    setPigments((prev) => {
      if (prev[pigmentId]?.rawMaterialFound) return prev;
      const next = {
        ...prev,
        [pigmentId]: { ...prev[pigmentId], rawMaterialFound: true },
      };
      try { localStorage.setItem('shanglu_pigments', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    audioManager.playSfx(SOUNDS.SFX.ITEM_PICKUP);
  }, []);

  // 学习颜料制法
  const handleLearnRecipe = useCallback((pigmentId) => {
    setPigments((prev) => {
      if (prev[pigmentId]?.recipeUnderstood) return prev;
      const next = {
        ...prev,
        [pigmentId]: { ...prev[pigmentId], recipeUnderstood: true },
      };
      try { localStorage.setItem('shanglu_pigments', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // 开始新游戏：清档 + 重置状态 → 开场叙事 → 进入游戏
  const handleStartGame = useCallback(() => {
    deleteSave();
    setCurrentSceneId('village_entrance');
    setNpcTrust(INITIAL_NPC_TRUST);
    setInventory([]);
    setPigments(INITIAL_PIGMENT_STATE);
    setGameState('intro');
  }, []);

  // 继续存档：读档 + 进入上次场景
  const handleContinueGame = useCallback(() => {
    const saved = loadGame();
    if (saved.currentScene && SCENES[saved.currentScene]) {
      setCurrentSceneId(saved.currentScene);
    }
    setGameState('playing');
  }, []);

  // 开场叙事结束 → 进入游戏
  const handleIntroComplete = useCallback(() => {
    setGameState('playing');
  }, []);

  // 退出游戏：尝试关闭窗口
  const handleExitGame = useCallback(() => {
    try {
      window.close();
    } catch { /* ignore */ }
  }, []);

  // 开始界面
  if (gameState === 'start') {
    return (
      <div className="app">
        <StartScreen
          onStart={handleStartGame}
          onContinue={handleContinueGame}
          onExit={handleExitGame}
          hasSave={saveExists}
        />
      </div>
    );
  }

  // 开场叙事过渡（仅新游戏）
  if (gameState === 'intro') {
    return (
      <div className="app">
        <IntroScreen onComplete={handleIntroComplete} />
      </div>
    );
  }

  return (
    <div className="app">
      <Scene
        scene={currentScene}
        onNavigate={handleNavigate}
        dialogue={dialogue}
        onInteract={handleInteract}
        onCloseDialogue={handleCloseDialogue}
        npcTrust={npcTrust}
        onAdjustTrust={handleAdjustTrust}
        onSetNpcFlag={handleSetNpcFlag}
        pigments={pigments}
        onCollectPigment={handleCollectPigment}
        onLearnRecipe={handleLearnRecipe}
        inventory={inventory}
        onCollectScroll={handleCollectScroll}
        viewingItem={viewingItem}
        onViewItem={handleViewItem}
        onCloseViewer={handleCloseViewer}
        triggerSave={triggerSave}
      />
    </div>
  );
}

export default App;
