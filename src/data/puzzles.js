/**
 * 拼图谜题数据
 *
 * 每个拼图定义：id、乱序初始排列 items、正确顺序 correctOrder
 * 由通用组件 SortablePuzzle 消费，与具体内容解耦
 */

// 六字真言拼图
// 正确顺序：唵(om) → 嘛(ma) → 呢(ni) → 叭(pad) → 咪(me) → 吽(hum)
export const MANI_STONE_PUZZLE = {
  id: 'mani_stones',
  // items 为预设乱序初始排列（非正确顺序），固定不随机
  items: [
    { id: 'hum', label: '吽', emoji: '🪨' },
    { id: 'om',  label: '唵', emoji: '🪨' },
    { id: 'pad', label: '叭', emoji: '🪨' },
    { id: 'ma',  label: '嘛', emoji: '🪨' },
    { id: 'ni',  label: '呢', emoji: '🪨' },
    { id: 'me',  label: '咪', emoji: '🪨' },
  ],
  correctOrder: ['om', 'ma', 'ni', 'pad', 'me', 'hum'],
};

// 经幡排序拼图
// 正确顺序：蓝(天) → 白(云) → 红(火) → 绿(水) → 黄(土)
export const PRAYER_FLAGS_PUZZLE = {
  id: 'prayer_flags',
  // items 为预设乱序初始排列，固定不随机
  items: [
    { id: 'green',  label: '绿', emoji: '🚩' },
    { id: 'yellow', label: '黄', emoji: '🚩' },
    { id: 'blue',   label: '蓝', emoji: '🚩' },
    { id: 'red',    label: '红', emoji: '🚩' },
    { id: 'white',  label: '白', emoji: '🚩' },
  ],
  correctOrder: ['blue', 'white', 'red', 'green', 'yellow'],
};
