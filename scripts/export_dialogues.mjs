import { DIALOGUES } from '../src/data/dialogues.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 信任阶段对话 ID 前缀
const trustStageIds = [
  'dlg_danzeng_stranger', 'dlg_danzeng_listener', 'dlg_danzeng_acknowledged', 'dlg_danzeng_confidant',
  'dlg_zhuoma_stranger', 'dlg_zhuoma_listener', 'dlg_zhuoma_acknowledged', 'dlg_zhuoma_confidant',
  'dlg_gesang_stranger', 'dlg_gesang_listener', 'dlg_gesang_acknowledged', 'dlg_gesang_confidant',
  'dlg_baima_stranger', 'dlg_baima_listener', 'dlg_baima_acknowledged', 'dlg_baima_confidant',
];

const allEntries = Object.entries(DIALOGUES);

// 全部对话
const allList = allEntries.map(([id, d]) => {
  const lines = d.lines.map(l => {
    if (typeof l === 'string') return { text: l, isKeyLine: false };
    if (l && typeof l === 'object' && l.text) return { text: l.text, isKeyLine: !!l.isKeyLine };
    return { text: String(l), isKeyLine: false };
  });
  return { id, title: d.title || '', image: d.image || '', lines, trustStage: trustStageIds.includes(id) };
});

// 剧情对话（排除信任阶段）
const storyList = allList.filter(d => !d.trustStage);

function buildHtml(title, dialogues) {
  const rows = dialogues.map(d => {
    const keyBadge = d.trustStage ? ' <span class="tag tag--trust">信任</span>' : '';
    const linesHtml = d.lines.map(l =>
      `<span class="line${l.isKeyLine ? ' line--key' : ''}">${escapeHtml(l.text)}</span>`
    ).join('\n');
    const imgHtml = d.image ? `<div class="img-box"><img src="${escapeHtml(d.image)}" alt="" onerror="this.style.display='none'"></div>` : '';
    return `<tr>
      <td class="col-id"><code>${escapeHtml(d.id)}</code>${keyBadge}</td>
      <td class="col-title">${escapeHtml(d.title || '—')}</td>
      <td class="col-lines">${linesHtml}${imgHtml}</td>
    </tr>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"Microsoft YaHei","PingFang SC",sans-serif;background:#1a1a2e;color:#e0d5c1;padding:20px}
h1{text-align:center;color:#d4a574;margin-bottom:4px;font-size:22px}
.sub{text-align:center;color:#888;font-size:13px;margin-bottom:24px}
.toolbar{position:sticky;top:12px;z-index:10;display:flex;justify-content:center;gap:8px;margin-bottom:20px}
.btn{padding:6px 16px;border:1px solid #5b2c6e;border-radius:4px;background:rgba(91,44,110,.2);color:#d4a574;cursor:pointer;font-size:13px;transition:.15s}
.btn:hover{background:rgba(91,44,110,.4)}
.btn--active{background:#5b2c6e;color:#fff}
table{width:100%;border-collapse:collapse;font-size:13px}
th{position:sticky;top:56px;z-index:5;background:#2d2d44;color:#d4a574;padding:10px 14px;text-align:left;border-bottom:2px solid #5b2c6e}
.col-id{width:260px;padding:10px 14px;vertical-align:top;border-bottom:1px solid rgba(255,255,255,.06)}
.col-title{width:100px;padding:10px 14px;vertical-align:top;border-bottom:1px solid rgba(255,255,255,.06);color:#d4a574;font-weight:600}
.col-lines{padding:10px 14px;vertical-align:top;border-bottom:1px solid rgba(255,255,255,.06);line-height:1.9}
.line{display:block}
.line--key{color:#d4a574;font-weight:600}
code{background:rgba(91,44,110,.25);padding:1px 6px;border-radius:3px;font-size:12px;color:#cba6f7}
.tag{display:inline-block;padding:1px 6px;border-radius:3px;font-size:11px;margin-left:4px}
.tag--trust{background:rgba(139,26,26,.3);color:#d4a574}
.img-box{margin-top:8px}
.img-box img{max-width:200px;border-radius:4px;border:1px solid rgba(255,255,255,.1)}
.count{color:#d4a574;font-weight:600}
</style>
</head>
<body>
<h1>${title}</h1>
<p class="sub">共 <span class="count">${dialogues.length}</span> 条对话 · ${new Date().toISOString().slice(0,10)} 导出</p>
<div class="toolbar">
  <button class="btn btn--active" onclick="showAll()">全部</button>
  <button class="btn" id="btnStory" onclick="showStory()">仅剧情</button>
  <button class="btn" id="btnTrust" onclick="showTrust()">仅信任阶段</button>
</div>
<table id="table">
  <thead><tr><th>ID</th><th>标题</th><th>对话内容</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<script>
const rows = document.querySelectorAll('tbody tr');
const allBtn = document.querySelectorAll('.btn');
function showAll(){rows.forEach(r=>r.style.display='');setActive(0)}
function showStory(){rows.forEach(r=>r.style.display=r.querySelector('.tag--trust')?'none':'');setActive(1)}
function showTrust(){rows.forEach(r=>r.style.display=r.querySelector('.tag--trust')?'':'none');setActive(2)}
function setActive(i){allBtn.forEach(b=>b.classList.remove('btn--active'));allBtn[i].classList.add('btn--active')}
</script>
</body>
</html>`;
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const outDir = path.join(__dirname, '..', 'workspace');
fs.mkdirSync(outDir, { recursive: true });

// 全部对话 HTML
fs.writeFileSync(path.join(outDir, '全部对话.html'), buildHtml('山麓之问 · 全部对话', allList), 'utf-8');

// CSV 格式（剧情对话）
const csvHeader = 'ID,标题,内容,是否为关键句\n';
const csvRows = allList.map(d => {
  return d.lines.map(l =>
    `"${d.id}","${d.title}","${l.text.replace(/"/g,'""')}","${l.isKeyLine ? '是' : ''}"`
  ).join('\n');
}).join('\n');
fs.writeFileSync(path.join(outDir, '全部对话.csv'), '\uFEFF' + csvHeader + csvRows, 'utf-8');

console.log(`✅ 导出完成！`);
console.log(`   全部: ${allList.length} 条`);
console.log(`   剧情: ${storyList.length} 条`);
console.log(`   信任: ${allList.length - storyList.length} 条`);
console.log(`   HTML: workspace/全部对话.html`);
console.log(`   CSV:  workspace/全部对话.csv`);
