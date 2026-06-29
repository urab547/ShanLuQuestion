const RATE_LIMIT = 100;
const rateLimitMap = new Map();

function getIP(req) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 86_400_000 });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

// 定期清理过期记录，防止内存泄漏
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap) {
    if (now > record.resetTime) rateLimitMap.delete(ip);
  }
}, 600_000);

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const ip = getIP(req);
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: '今日对话次数已用完（每天100次），请明天再试 😊' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const endpoint = process.env.AI_ENDPOINT;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || 'deepseek-chat';

  if (!endpoint || !apiKey) {
    return new Response(
      JSON.stringify({ error: 'AI 服务未配置' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: '请求格式错误' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const { messages, stream = true, temperature = 0.8, max_tokens = 1024 } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: '消息不能为空' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, stream, temperature, max_tokens }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '');
      return new Response(
        JSON.stringify({ error: `AI 服务异常 (${upstream.status})` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (stream) {
      return new Response(upstream.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'AI 服务连接失败' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
