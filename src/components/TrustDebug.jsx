import './TrustDebug.css';

/**
 * TrustDebug —— 临时调试面板（仅开发用）
 *
 * 显示当前 NPC 的信任阶段名称 + +/-10 按钮。
 * 信任值数字完全不暴露给玩家。
 */
export default function TrustDebug({ npcName, stage, onAddTrust, onSubTrust }) {
  return (
    <div className="trust-debug">
      <span className="trust-debug__label">{npcName}：</span>
      <span className="trust-debug__stage">{stage.label}</span>
      <div className="trust-debug__actions">
        <button
          className="trust-debug__btn trust-debug__btn--sub"
          onClick={onSubTrust}
          title="信任 -10"
        >
          -10
        </button>
        <button
          className="trust-debug__btn trust-debug__btn--add"
          onClick={onAddTrust}
          title="信任 +10"
        >
          +10
        </button>
      </div>
    </div>
  );
}
