import './TopicPanel.css';

/**
 * TopicPanel —— 话题选择面板（仁青专用）
 *
 * 显示可选话题列表，已触发的话题灰色标记，新话题高亮。
 */
export default function TopicPanel({ npcName, topics, onSelectTopic, onFreeChat, onClose }) {
  return (
    <div className="topic-panel">
      <div className="topic-panel__mask" onClick={onClose} />
      <div className="topic-panel__box" onClick={(e) => e.stopPropagation()}>
        <div className="topic-panel__header">
          <span className="topic-panel__title">和{npcName}聊聊</span>
          <button className="topic-panel__close" onClick={onClose}>×</button>
        </div>

        <div className="topic-panel__list">
          {topics.map((topic) => {
            const triggered = topic.triggered;
            const locked = !topic.triggered && topic.requireFlag && !topic.requireFlagMet;
            return (
              <button
                key={topic.id}
                className={`topic-panel__item${
                  triggered ? ' topic-panel__item--triggered' : ''
                }${locked ? ' topic-panel__item--locked' : ''}`}
                onClick={() => {
                  if (!locked) {
                    onSelectTopic(topic);
                  }
                }}
                disabled={locked}
              >
                <span className="topic-panel__item-icon">
                  {triggered ? '✓' : locked ? '🔒' : '💬'}
                </span>
                <span className="topic-panel__item-text">{topic.label}</span>
                {triggered && (
                  <span className="topic-panel__item-tag">已聊过</span>
                )}
                {locked && (
                  <span className="topic-panel__item-tag">暂不可用</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 自由对话入口 */}
        <div className="topic-panel__divider" />
        <div className="topic-panel__free-section">
          <button className="topic-panel__free-btn" onClick={onFreeChat}>
            <span className="topic-panel__free-text">自由对话</span>
            <span className="topic-panel__free-hint">想问什么都可以</span>
          </button>
        </div>

        <div className="topic-panel__footer">
          <button className="topic-panel__btn-close" onClick={onClose}>
            暂时不想聊了
          </button>
        </div>
      </div>
    </div>
  );
}
