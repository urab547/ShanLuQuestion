/**
 * AI API 客户端
 * 封装与 LLM 后端的通信：流式请求、超时、重试、错误处理
 *
 * ============================================================
 * 改造时机到了之后，只需要改这块：
 *   1. 把 endpoint / apiKey 换成真实地址
 *   2. 根据实际 LLM Provider 调整请求体格式（body.schema）
 *   3. 如果后端不用 SSE 用别的协议，改 streamParser 那块
 * ============================================================
 */

// ── 配置（改造时替换真实值） ──────────────────────────────
const CONFIG = {
  endpoint: import.meta.env.VITE_AI_ENDPOINT || '/api/chat',
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
  model: import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini',
  timeout: 30000,        // 单次请求超时 ms
  maxRetries: 1,         // 网络错误重试次数
};

// ── 消息格式 ──────────────────────────────────────────────

/**
 * @typedef {Object} ChatMessage
 * @property {'system'|'user'|'assistant'} role
 * @property {string} content
 */

/**
 * @typedef {Object} ChatRequest
 * @property {ChatMessage[]} messages
 * @property {string} [npcId]  - 当前对话的 NPC ID
 * @property {AbortSignal} [signal] - 用于取消请求
 */

/**
 * @typedef {Object} StreamCallbacks
 * @property {(token: string) => void} onToken      - 收到一个 token
 * @property {(fullText: string) => void} onComplete - 完整回复
 * @property {(error: Error) => void} onError        - 出错
 */

// ── 核心方法 ──────────────────────────────────────────────

/**
 * 流式对话 —— 逐 token 回调
 * 用法：
 *   const ac = new AbortController();
 *   streamChat({ messages, npcId, signal: ac.signal }, {
 *     onToken: (t) => setResponse(prev => prev + t),
 *     onComplete: (full) => console.log('done', full),
 *     onError: (e) => console.error(e),
 *   });
 */
export async function streamChat(request, callbacks) {
  const { messages, signal } = request;
  const { onToken, onComplete, onError } = callbacks;

  const url = CONFIG.endpoint;
  const headers = {
    'Content-Type': 'application/json',
    ...(CONFIG.apiKey ? { Authorization: `Bearer ${CONFIG.apiKey}` } : {}),
  };

  // OpenAI 兼容格式（换成别的 Provider 改这里）
  const body = {
    model: CONFIG.model,
    messages,
    stream: true,
    temperature: 0.8,
    max_tokens: 1024,
  };

  let fullText = '';
  let retries = 0;

  while (retries <= CONFIG.maxRetries) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`AI API ${res.status}: ${errText.slice(0, 200)}`);
      }

      // ── SSE 流式解析 ──────────────────────────────────
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // 保留最后不完整的行

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) {
              fullText += token;
              onToken(token);
            }
          } catch {
            // 个别行解析失败，跳过
          }
        }
      }

      onComplete(fullText);
      return;
    } catch (err) {
      if (signal?.aborted) {
        // 用户主动取消，不算错误
        return;
      }
      if (retries >= CONFIG.maxRetries) {
        onError(err);
        return;
      }
      retries++;
      // 简单退避
      await new Promise((r) => setTimeout(r, 1000 * retries));
    }
  }
}

/**
 * 非流式对话 —— 返回完整文本
 */
export async function chat(messages, options = {}) {
  const { signal } = options;
  const url = CONFIG.endpoint;
  const headers = {
    'Content-Type': 'application/json',
    ...(CONFIG.apiKey ? { Authorization: `Bearer ${CONFIG.apiKey}` } : {}),
  };

  const body = {
    model: CONFIG.model,
    messages,
    stream: false,
    temperature: 0.8,
    max_tokens: 1024,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`AI API ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

// ── 工具 ──────────────────────────────────────────────────

/**
 * 建一个带系统消息的 messages 数组
 * @param {string} systemPrompt
 * @param {Array<{role: string, content: string}>} [history]
 */
export function buildMessages(systemPrompt, history = []) {
  return [
    { role: 'system', content: systemPrompt },
    ...history,
  ];
}

/**
 * 当前是否配置了可用 API
 * 检查 endpoint 是否为默认占位、API Key 是否存在且不含非 ASCII 字符
 */
export function isAiConfigured() {
  const hasEndpoint = Boolean(CONFIG.endpoint && CONFIG.endpoint !== '/api/chat');
  const hasKey = Boolean(CONFIG.apiKey);
  // API Key 必须是纯 ASCII（HTTP 头只支持 ISO-8859-1）
  const keyIsAscii = hasKey && /^[\x20-\x7E]*$/.test(CONFIG.apiKey);
  // 排除明显未替换的占位符
  const isPlaceholder = /你的|API_KEY|xxx|替换/i.test(CONFIG.apiKey || '');
  return hasEndpoint && hasKey && keyIsAscii && !isPlaceholder;
}
