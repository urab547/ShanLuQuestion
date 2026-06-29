import { useState, useCallback } from 'react';
import { deleteSave } from '../data/saveManager';
import { ICONS } from '../data/assets';
import { audioManager } from '../utils/audioManager';
import './SettingsPanel.css';

const ENV_VOLUME_KEY = 'shanglu_env_volume';
const SFX_VOLUME_KEY = 'shanglu_sfx_volume';

function loadVolume(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? Number(v) : fallback;
  } catch {
    return fallback;
  }
}

function saveVolume(key, value) {
  try { localStorage.setItem(key, String(value)); } catch { /* ignore */ }
}

/**
 * SettingsPanel —— 完整设置面板
 *
 * - 环境音 / 音效 两个音量滑块（持久化）
 * - 对话回顾入口
 * - 重新开始（二次确认）
 * - 关于
 */
export default function SettingsPanel({ onClose, onOpenReview }) {
  const [envVolume, setEnvVolume] = useState(() => loadVolume(ENV_VOLUME_KEY, 80));
  const [sfxVolume, setSfxVolume] = useState(() => loadVolume(SFX_VOLUME_KEY, 80));
  const [showConfirm, setShowConfirm] = useState(false);
  const [objectHintsOff, setObjectHintsOff] = useState(() => {
    try { return localStorage.getItem('shanglu_object_hints_disabled') === '1'; }
    catch { return false; }
  });

  const handleEnvChange = useCallback((e) => {
    const v = Number(e.target.value);
    setEnvVolume(v);
    saveVolume(ENV_VOLUME_KEY, v);
    audioManager.setEnvVolume(v);
  }, []);

  const handleSfxChange = useCallback((e) => {
    const v = Number(e.target.value);
    setSfxVolume(v);
    saveVolume(SFX_VOLUME_KEY, v);
    audioManager.setSfxVolume(v);
  }, []);

  const handleReset = () => {
    deleteSave();
    window.location.reload();
  };

  return (
    <div className="settings-panel__overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-panel__header">
          <span className="settings-panel__title">游戏设置</span>
          <button className="settings-panel__close" onClick={onClose}>
            <img src={ICONS.CLOSE} alt="关闭" className="settings-panel__close-icon" />
          </button>
        </div>

        <div className="settings-panel__body">

          {/* ─── 音量调节 ─── */}
          <div className="settings-panel__section">
            <h3 className="settings-panel__section-title">🔈 音量</h3>
            <div className="settings-panel__slider-group">
              <label className="settings-panel__slider-label">
                <span>环境音</span>
                <span className="settings-panel__slider-value">{envVolume}</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={envVolume}
                onChange={handleEnvChange}
                className="settings-panel__slider"
              />
            </div>
            <div className="settings-panel__slider-group">
              <label className="settings-panel__slider-label">
                <span>音效</span>
                <span className="settings-panel__slider-value">{sfxVolume}</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sfxVolume}
                onChange={handleSfxChange}
                className="settings-panel__slider"
              />
            </div>
            <p className="settings-panel__slider-hint">
              包含铜钵声等特殊音效
            </p>
          </div>

          {/* ─── 功能 ─── */}
          <div className="settings-panel__section">
            <h3 className="settings-panel__section-title">⚡ 功能</h3>
            {onOpenReview && (
              <button
                className="settings-panel__review-btn"
                onClick={() => { onClose(); onOpenReview(); }}
              >
                💬 对话回顾
              </button>
            )}
            <label className="settings-panel__toggle">
              <span className="settings-panel__toggle-label">关闭物件提示</span>
              <span className="settings-panel__toggle-hint">场景中物件的呼吸引导</span>
              <input
                type="checkbox"
                checked={objectHintsOff}
                onChange={(e) => {
                  const v = e.target.checked;
                  setObjectHintsOff(v);
                  try { localStorage.setItem('shanglu_object_hints_disabled', v ? '1' : '0'); }
                  catch { /* ignore */ }
                }}
              />
              <span className="settings-panel__toggle-track" />
            </label>
            <button
              className="settings-panel__reset-btn"
              onClick={() => setShowConfirm(true)}
            >
              🔄 重新开始
            </button>
          </div>

          {/* ─── 关于 ─── */}
          <div className="settings-panel__section">
            <h3 className="settings-panel__section-title">ℹ️ 关于</h3>
            <div className="settings-panel__about">
              <p className="settings-panel__about-game">山麓之问</p>
              <p className="settings-panel__about-team">山麓工作室</p>
              <p className="settings-panel__about-credit">
                感谢藏族文化顾问的指导与支持
              </p>
            </div>
          </div>

          {/* 存档提示 */}
          <div className="settings-panel__section">
            <p className="settings-panel__note">
              游戏进度自动保存至浏览器本地存储。清除浏览器数据或更换设备将丢失存档。
            </p>
          </div>

        </div>
      </div>

      {/* 二次确认弹窗 */}
      {showConfirm && (
        <div className="settings-confirm__overlay" onClick={() => setShowConfirm(false)}>
          <div className="settings-confirm" onClick={(e) => e.stopPropagation()}>
            <p className="settings-confirm__text">
              所有进度将被清除，确定重新开始吗？
            </p>
            <div className="settings-confirm__actions">
              <button
                className="settings-confirm__btn settings-confirm__btn--cancel"
                onClick={() => setShowConfirm(false)}
              >
                取消
              </button>
              <button
                className="settings-confirm__btn settings-confirm__btn--confirm"
                onClick={handleReset}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
