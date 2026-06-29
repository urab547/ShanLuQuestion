/**
 * AI API 客户端
 * 封装与 LLM 后端的通信：流式请求、超时、重试、错误处理
 *
 * 生产环境：请求发到 /api/chat（Vercel Serverless Function 代理），API Key 存在服务端
 * 本地开发：可在 .env 中设置 VITE_AI_ENDPOINT / VITE_AI_API_KEY 直连 LLM
 */

const CONFIG = {
  endpoint: import.meta.env.VITE_AI_ENDPOINT || '/api/chat',
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
  model: import.meta.env.VITE_AI_MODEL || 'deepseek-chat',
  timeout: 30000,
  maxRetries: 1,
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
  const hasEndpoint = Boolean(CONFIG.endpoint);
  // 走代理时无需前端 API Key；直连时需要有效 Key
  const isProxy = CONFIG.endpoint === '/api/chat';
  if (isProxy) return hasEndpoint;
  const hasKey = Boolean(CONFIG.apiKey);
  const keyIsAscii = hasKey && /^[\x20-\x7E]*$/.test(CONFIG.apiKey);
  const isPlaceholder = /你的|API_KEY|xxx|替换/i.test(CONFIG.apiKey || '');
  return hasEndpoint && hasKey && keyIsAscii && !isPlaceholder;
}
