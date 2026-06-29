import { useState, useCallback, useEffect, useRef } from 'react';
import { createStuckTimer, checkStuckErrors } from '../utils/stuckDetector';
import './SangRitualViewer.css';

// ─── 常量 ────────────────────────────────────────
const PLANT_META = {
  song_bai: { icon: '🌲', label: '松柏', purpose: '净化' },
  du_song:  { icon: '🌿', label: '杜松', purpose: '祈福' },
  ye_cao:   { icon: '🌾', label: '高原野草', purpose: '未知（干扰项）' },
};

const CHANT_OPTIONS = [
  { id: 'a', label: '嗡嘛呢叭咪吽', correct: false },
  { id: 'b', label: '嗡啊吽，班扎咕噜贝玛悉地吽', correct: true },
  { id: 'c', label: '贪和执，都是苦', correct: false },
];

const GAME_START_KEY = 'shanglu_game_start_timestamp';
const EASTER_EGG_MINUTES = 30;

// ─── 工具函数 ─────────────────────────────────────
function getRitualState() {
  try {
    const raw = localStorage.getItem('shanglu_sang_ritual_state') || localStorage.getItem('sang_ritual_state');
    return JSON.parse(raw || '{}');
  } catch { return {}; }
}

function saveRitualState(updates) {
  const state = getRitualState();
  const next = { ...state, ...updates };
  try {
    localStorage.setItem('shanglu_sang_ritual_state', JSON.stringify(next));
  } catch { /* ignore */ }
  return next;
}

function ensureGameStartTime() {
  try {
    if (!localStorage.getItem(GAME_START_KEY)) {
      localStorage.setItem(GAME_START_KEY, String(Date.now()));
    }
    return Number(localStorage.getItem(GAME_START_KEY));
  } catch { return Date.now(); }
}

// ─── 组件 ─────────────────────────────────────────
export default function SangRitualViewer({ inventory = [], onClose, onInteract, onComplete, onStuck }) {
  const ritualState = getRitualState();
  const alreadyCompleted = !!ritualState.ritualCompleted;

  // 植物槽
  const [plantSlots, setPlantSlots] = useState({ purify: null, bless: null });
  const [plantMenuSlot, setPlantMenuSlot] = useState(null); // 'purify' | 'bless' | null

  // 诵念
  const [chantChosen, setChantChosen] = useState(null);

  // 演出状态
  const [performing, setPerforming] = useState(false);
  const [smokePhase, setSmokePhase] = useState(null); // 'igniting' | 'rising' | 'drifting' | null
  const [showNPCs, setShowNPCs] = useState(0);
  const [showNarration, setShowNarration] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // ─── 卡关检测 ───
  const [stuckErrorCount, setStuckErrorCount] = useState(0);
  const stuckRef = useRef({ timer: null, fired: false });

  const triggerStuckCheck = useCallback((count) => {
    if (!stuckRef.current.fired && checkStuckErrors(count)) {
      stuckRef.current.fired = true;
      if (onStuck) onStuck();
    }
  }, [onStuck]);

  useEffect(() => {
    if (onStuck) {
      stuckRef.current.fired = false;
      stuckRef.current.timer = createStuckTimer(() => {
        stuckRef.current.fired = true;
        onStuck();
      });
      stuckRef.current.timer.start();
      return () => {
        if (stuckRef.current.timer) stuckRef.current.timer.stop();
      };
    }
  }, [onStuck]);

  const bumpStuckError = useCallback(() => {
    setStuckErrorCount(prev => {
      const next = prev + 1;
      triggerStuckCheck(next);
      return next;
    });
  }, [triggerStuckCheck]);

  const timersRef = useRef([]);

  // 清理所有定时器
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearAllTimers(), [clearAllTimers]);

  // ─── 派生状态 ───
  const collectedPlants = inventory.filter(id => ['song_bai', 'du_song', 'ye_cao'].includes(id));
  const availableForSlot = (slot) => {
    const otherSlot = slot === 'purify' ? 'bless' : 'purify';
    return collectedPlants.filter(id => id !== plantSlots[otherSlot]);
  };

  const purifyPlant = plantSlots.purify;
  const blessPlant = plantSlots.bless;

  const orderCorrect = purifyPlant === 'song_bai' && blessPlant === 'du_song';
  const orderText = (() => {
    if (purifyPlant === 'song_bai' && blessPlant === 'du_song') return '先净后请 ✓';
    if (purifyPlant === 'du_song' && blessPlant === 'song_bai') return '先请后净 ✗';
    if (purifyPlant && blessPlant) return '…';
    return '—';
  })();

  const plantCorrect = purifyPlant === 'song_bai' && blessPlant === 'du_song';
  const hasWrongPlant = (purifyPlant === 'ye_cao') || (blessPlant === 'ye_cao');
  const chantCorrect = chantChosen === 'b';
  const allReady = purifyPlant && blessPlant && chantChosen && !performing;

  // ─── 植物选择 ───
  const handlePlantSlotClick = (slot) => {
    if (performing) return;
    // 如果槽已有植物，点击清除
    if (plantSlots[slot]) {
      setPlantSlots(prev => ({ ...prev, [slot]: null }));
      return;
    }
    const plants = availableForSlot(slot);
    if (plants.length > 0) {
      setPlantMenuSlot(slot);
    }
  };

  const handlePlantSelect = (plantId) => {
    if (!plantMenuSlot) return;
    setPlantSlots(prev => ({ ...prev, [plantMenuSlot]: plantId }));
    setPlantMenuSlot(null);
  };

  // ─── 点燃 ───
  const handleIgnite = () => {
    if (!allReady) return;
    clearAllTimers();
    setPerforming(true);
    setShowNPCs(0);
    setShowNarration(false);
    setShowEasterEgg(false);

    // 点火动画 1 秒
    setSmokePhase('igniting');

    // 判定烟雾走向
    const hasYeCao = purifyPlant === 'ye_cao' || blessPlant === 'ye_cao';
    const allGood = !hasYeCao && orderCorrect && chantCorrect;

    setTimeout(() => {
      if (hasYeCao) {
        // 错误植物 → 烟往下降
        bumpStuckError();
        setSmokePhase('drifting');
        setTimeout(() => {
          onInteract({ dialogueId: 'dlg_sang_wrong_plant', label: '' });
          endPerformance();
        }, 1200);
      } else if (!orderCorrect) {
        // 顺序错误 → 烟散乱
        bumpStuckError();
        setSmokePhase('drifting');
        setTimeout(() => {
          onInteract({ dialogueId: 'dlg_sang_wrong_order', label: '' });
          endPerformance();
        }, 1500);
      } else if (!chantCorrect) {
        // 诵念错误 → 烟散乱
        bumpStuckError();
        setSmokePhase('drifting');
        setTimeout(() => {
          onInteract({ dialogueId: 'dlg_sang_wrong_chant', label: '' });
          endPerformance();
        }, 1500);
      } else {
        // 全部正确 → 成功演出序列
        runSuccessSequence();
      }
    }, 1000);
  };

  const runSuccessSequence = () => {
    setSmokePhase('rising');

    const t1 = setTimeout(() => setShowNPCs(1), 3000);   // 卓玛
    const t2 = setTimeout(() => setShowNPCs(2), 4000);   // 格桑
    const t3 = setTimeout(() => setShowNPCs(3), 5000);   // 白玛
    const t4 = setTimeout(() => setShowNPCs(4), 6500);   // 旦增

    // 彩蛋检测
    const startTime = ensureGameStartTime();
    const elapsedMin = (Date.now() - startTime) / 60000;
    if (elapsedMin >= EASTER_EGG_MINUTES) {
      const tEgg = setTimeout(() => {
        setShowEasterEgg(true);
        onInteract({ dialogueId: 'dlg_sang_timing_easter_egg', label: '' });
      }, 5500);
      timersRef.current.push(tEgg);
    }

    const t5 = setTimeout(() => setShowNarration(true), 9000);
    const t6 = setTimeout(() => {
      saveRitualState({ ritualCompleted: true });
      if (onComplete) onComplete();
    }, 11000);

    timersRef.current.push(t1, t2, t3, t4, t5, t6);
  };

  const endPerformance = () => {
    setTimeout(() => {
      setPerforming(false);
      setSmokePhase(null);
    }, 2000);
  };

  // ─── 已完成的占位 ───
  if (alreadyCompleted) {
    return (
      <div className="sang-viewer">
        <div className="sang-viewer__mask" onClick={onClose} />
        <div className="sang-viewer__panel" onClick={e => e.stopPropagation()}>
          <div className="sang-viewer__header">
            <span className="sang-viewer__title">煨桑仪式</span>
            <button className="sang-viewer__close" onClick={onClose}>×</button>
          </div>
          <div className="sang-viewer__body sang-viewer__body--done">
            <div className="sang-viewer__done-icon">✨</div>
            <p className="sang-viewer__done-text">仪式已完成</p>
            <p className="sang-viewer__done-sub">烟雾散尽，煨桑台上只剩下灰烬和沉默。</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── 渲染 ───
  return (
    <div className="sang-viewer">
      <div className="sang-viewer__mask" onClick={performing ? undefined : onClose} />
      <div className="sang-viewer__panel" onClick={e => e.stopPropagation()}>
        {/* 标题栏 */}
        <div className="sang-viewer__header">
          <span className="sang-viewer__title">煨桑仪式</span>
          {!performing && (
            <button className="sang-viewer__close" onClick={onClose}>×</button>
          )}
        </div>

        <div className="sang-viewer__body">
          {/* ─── 烟雾动画区 ─── */}
          <div className={`sang-viewer__smoke${smokePhase ? ` sang-viewer__smoke--${smokePhase}` : ''}`}>
            <div className="sang-viewer__smoke-pillar" />
            <div className="sang-viewer__smoke-pillar sang-viewer__smoke-pillar--2" />
            <div className="sang-viewer__smoke-pillar sang-viewer__smoke-pillar--3" />
          </div>

          {/* ─── NPC 演出层 ─── */}
          {performing && (
            <div className="sang-viewer__npcs">
              {showNPCs >= 1 && (
                <div className="sang-viewer__npc sang-viewer__npc--zhuoma sang-viewer__npc-pos--left">
                  <span className="sang-viewer__npc-icon">🧑‍🦰</span>
                  <span className="sang-viewer__npc-name">卓玛</span>
                </div>
              )}
              {showNPCs >= 2 && (
                <div className="sang-viewer__npc sang-viewer__npc--gesang sang-viewer__npc-pos--right">
                  <span className="sang-viewer__npc-icon">👩‍🎨</span>
                  <span className="sang-viewer__npc-name">格桑</span>
                </div>
              )}
              {showNPCs >= 3 && (
                <div className="sang-viewer__npc sang-viewer__npc--baima sang-viewer__npc-pos--front">
                  <span className="sang-viewer__npc-icon">🧘</span>
                  <span className="sang-viewer__npc-name">白玛</span>
                </div>
              )}
              {showNPCs >= 4 && (
                <div className={`sang-viewer__npc sang-viewer__npc--danzeng sang-viewer__npc-pos--edge${showNPCs >= 4 ? ' sang-viewer__npc--sliding' : ''}`}>
                  <span className="sang-viewer__npc-icon">👴</span>
                  <span className="sang-viewer__npc-name">旦增</span>
                </div>
              )}
            </div>
          )}

          {/* ─── 旁白文字 ─── */}
          {showNarration && (
            <div className="sang-viewer__narration">
              <p>烟雾散尽。煨桑台上只剩下灰烬和沉默。</p>
              <p className="sang-viewer__narration-end">旦增轻声说：「你做到了。」</p>
            </div>
          )}

          {/* ─── 彩蛋旁白 ─── */}
          {showEasterEgg && !showNarration && (
            <div className="sang-viewer__easter-egg">
              <p>你在村子里停留了很久。久到山风都变了几轮方向。</p>
            </div>
          )}

          {!performing && (
            <>
              {/* ─── 植物槽 ─── */}
              <div className="sang-viewer__plants">
                <div className="sang-viewer__slot-row">
                  <span className="sang-viewer__slot-tag">净化</span>
                  <button
                    className={`sang-viewer__plant-slot${purifyPlant ? ' sang-viewer__plant-slot--filled' : ''}`}
                    onClick={() => handlePlantSlotClick('purify')}
                  >
                    {purifyPlant ? (
                      <span className="sang-viewer__plant-item">
                        {PLANT_META[purifyPlant].icon} {PLANT_META[purifyPlant].label}
                      </span>
                    ) : (
                      <span className="sang-viewer__plant-placeholder">放入植物</span>
                    )}
                  </button>
                </div>
                <div className="sang-viewer__slot-row">
                  <span className="sang-viewer__slot-tag">祈福</span>
                  <button
                    className={`sang-viewer__plant-slot${blessPlant ? ' sang-viewer__plant-slot--filled' : ''}`}
                    onClick={() => handlePlantSlotClick('bless')}
                  >
                    {blessPlant ? (
                      <span className="sang-viewer__plant-item">
                        {PLANT_META[blessPlant].icon} {PLANT_META[blessPlant].label}
                      </span>
                    ) : (
                      <span className="sang-viewer__plant-placeholder">放入植物</span>
                    )}
                  </button>
                </div>
              </div>

              {/* ─── 植物选择菜单 ─── */}
              {plantMenuSlot && (
                <div className="sang-viewer__plant-menu">
                  <div className="sang-viewer__plant-menu-header">
                    选择植物放入「{plantMenuSlot === 'purify' ? '净化' : '祈福'}」槽
                  </div>
                  {availableForSlot(plantMenuSlot).map(pid => (
                    <button
                      key={pid}
                      className="sang-viewer__plant-menu-item"
                      onClick={() => handlePlantSelect(pid)}
                    >
                      <span className="sang-viewer__plant-item">
                        {PLANT_META[pid].icon} {PLANT_META[pid].label}
                      </span>
                    </button>
                  ))}
                  {availableForSlot(plantMenuSlot).length === 0 && (
                    <div className="sang-viewer__plant-menu-empty">没有可用的植物</div>
                  )}
                  <button className="sang-viewer__plant-menu-cancel" onClick={() => setPlantMenuSlot(null)}>
                    取消
                  </button>
                </div>
              )}

              {/* ─── 燃烧顺序显示区 ─── */}
              <div className="sang-viewer__order-display">
                <span className="sang-viewer__order-label">燃烧顺序</span>
                <span className={`sang-viewer__order-text${orderCorrect && purifyPlant && blessPlant ? ' sang-viewer__order-text--correct' : ''}${!orderCorrect && purifyPlant && blessPlant ? ' sang-viewer__order-text--wrong' : ''}`}>
                  {orderText}
                </span>
              </div>

              {/* ─── 诵念选项 ─── */}
              <div className="sang-viewer__chant-section">
                <div className="sang-viewer__chant-label">诵念内容</div>
                {CHANT_OPTIONS.map(opt => (
                  <label
                    key={opt.id}
                    className={`sang-viewer__chant-option${chantChosen === opt.id ? ' sang-viewer__chant-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="chant"
                      value={opt.id}
                      checked={chantChosen === opt.id}
                      onChange={() => setChantChosen(opt.id)}
                      disabled={performing}
                    />
                    <div className="sang-viewer__chant-text">
                      <span className="sang-viewer__chant-main">{opt.label}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* ─── 点燃按钮 ─── */}
              <button
                className={`sang-viewer__ignite${allReady ? '' : ' sang-viewer__ignite--disabled'}`}
                onClick={handleIgnite}
                disabled={!allReady}
              >
                {allReady ? '🔥 点燃煨桑' : `还需准备 ${[
                  !purifyPlant || !blessPlant ? '植物' : null,
                  !chantChosen ? '诵念' : null,
                ].filter(Boolean).join(' · ')}`}
              </button>
            </>
          )}
        </div>

        {/* ─── 底部提示 ─── */}
        <div className="sang-viewer__info">
          {performing
            ? (smokePhase === 'rising' ? '烟雾笔直升起…' : '仪式进行中…')
            : allReady
              ? '一切就绪，可以点火了'
              : collectedPlants.length === 0
                ? '你还没有收集到任何植物，先在村子里找找吧'
                : '收集植物并正确摆放，选择诵念后点燃'}
        </div>
      </div>
    </div>
  );
}
