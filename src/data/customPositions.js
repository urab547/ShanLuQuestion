/**
 * 自定义布局默认值 —— 拖拽调整后点击"保存布局"按钮写入此文件
 * 换浏览器/清缓存后位置不丢失
 *
 * 结构:
 *   positions: { "npc_xxx" | "item_xxx": { top, left } }  — NPC/物品位置(百分比)
 *   scales:    { "npc_xxx" | "item_xxx": number }          — NPC/物品缩放
 *   exits:     { "sceneId__target": { top, left } }        — 出口位置(百分比)
 *   exitScale: number                                       — 出口共享缩放
 *   exitRots:  { "sceneId__target": number }               — 出口旋转角度(度)
 *   puzzlesPos:{ "puzzleId": { top, left } }               — 拼图位置(百分比)
 *   puzzlesScl:{ "puzzleId": number }                      — 拼图缩放
 */

const custom = {
  positions: {},
  scales: {},
  exits: {},
  exitScale: 1,
  exitRots: {},
  puzzlesPos: {},
  puzzlesScl: {},
};

export default custom;
