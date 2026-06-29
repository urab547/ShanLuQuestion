/**
 * assets.js —— 全局美术资源路径注册表
 *
 * 使用方式：
 *   import { ICONS, SCENE_BG, SOUNDS } from '../data/assets';
 *   <img src={ICONS.SETTINGS} />
 *   audioManager.playSfx(SOUNDS.SFX.MASTIFF_BARK);
 *
 * 替换资源时：只需修改本文件中的路径，无需改动组件代码。
 * 资源文件放入 public/ 对应目录即可被 Vite 直接发布。
 */

// ===== HUD 图标（28x28 按钮，建议 16x16 PNG/SVG）=====
export const ICONS = {
  SETTINGS:   '/icons/settings.png',   // 游戏设置按钮 — 右上角齿轮，点击打开设置面板
  NOTEBOOK:   '/icons/notebook.png',   // 对话回顾按钮 — 右上角笔记本，点击查看已对话记录
  CANVAS:     '/icons/canvas.png',     // 记忆画布按钮 — 右上角画框，点击查看收集的唐卡碎片
  COLLECTION: '/icons/collection.png', // 物品收藏按钮 — 右上角包裹，点击查看已拾取的物品
  CLOSE:      '/icons/close.png',      // 关闭按钮 — 设置面板/对话框右上角的 ×，点击关闭当前面板
  ARROW_UP:   '/icons/arrow_up.png',   // 场景出口箭头 — 默认箭头朝上，通过旋转调整方向；不存在文件时回退到 Unicode
};

// ===== 场景背景图 =====
export const SCENE_BG = {
  village_entrance:    '/images/scene/village_entrance.png',    // 第一章·场景一 — 措钦村村口，玩家进入村庄的第一幕
  village_square:      '/images/scene/village_square.png',      // 第一章·场景二 — 村庄广场，NPC 聚集的主要活动区域
  dangzeng_courtyard:  '/images/scene/dangzeng_courtyard.png',  // 第一章·场景三 — 旦增家院墙外，见旦增和格桑
  dangzeng_bedroom:    '/images/scene/dangzeng_bedroom.png',    // （预留）旦增家屋内，后续章节深入对话场景
  temple_exterior:     '/images/scene/temple_exterior.png',     // （预留）寺庙外景，经堂外观
  temple_interior:     '/images/scene/temple_interior.png',     // （预留）寺庙内部，经堂内景，唐卡原悬挂位置
  mountain_peak:       '/images/scene/mountain_peak.png',       // （预留）山顶场景，俯瞰村落全景
  sangtai:             '/images/scene/sangtai.png',             // （预留）煨桑台，白玛日常修行处
  gesang_corner:       '/images/scene/gesang_corner.png',       // （预留）格桑的角落，格桑日常活动处
};

// ===== 唐卡相关图像（对话 / 记忆画布 / 复制品成品）=====
export const TANGKA_IMAGES = {
  PHOTO_HAND:      '/images/tangka/photo_hand.png',      // 唐卡照片·手部特写 — 仁青给玩家的照片之一，唐卡中度的手部细节
  PHOTO_MOUNTAIN:  '/images/tangka/photo_mountain.png',  // 唐卡照片·山景局部 — 仁青给玩家的照片之二，唐卡中的山形纹样
  PHOTO_EYE:       '/images/tangka/photo_eye.png',       // 唐卡照片·眼部特写 — 仁青给玩家的照片之三，唐卡中佛眼细节
  PHOTO_SCRIPT:    '/images/tangka/photo_script.png',    // 唐卡照片·经文局部 — 仁青给玩家的照片之四，唐卡边缘藏文经文
  PHOTO_MIRROR:    '/images/tangka/photo_mirror.png',    // 唐卡照片·胸前镜子 — 记忆画布第五碎片，度母胸前镜面装饰
  THANGKA_REFINED: '/images/tangka/thangka_refined.png', // 精制唐卡成品 — 上色完成后浮现的精制度母唐卡，用于成品展示与开眼仪式
};

// ===== NPC 立绘 =====
export const NPC_PORTRAITS = {
  danzeng: '/images/npc/danzeng.png', // 旦增·洛桑 — 70岁前唐卡画师，沉默寡言的祖父，唯一知道完整真相的人
  zhuoma:  '/images/npc/zhuoma.png',  // 卓玛 — 38岁村委会副主任，旦增的女儿，干练务实，知道部分经过
  gesang:  '/images/npc/gesang.png',  // 格桑 — 19岁少年，旦增的孙子，主角，热情但莽撞，信息催化剂
  baima:   '/images/npc/baima.png',   // 白玛 — 65岁半僧人，村里的修行老人，信仰混合佛教与本教，说话缓慢带隐喻
  renqing: '/images/npc/renqing.png', // 仁青 — 45岁藏族本地人，成都文化公司代表，带成都口音，见过唐卡照片但不知来龙去脉
};

// ===== 物件图标 =====
export const ITEM_ICONS = {
  mani_pile:        '/images/item/mani_pile.png',        // 玛尼堆 — 村口石堆，可交互查看，藏族祈福石堆
  road_sign:        '/images/item/road_sign.png',        // 路标 — 村口指路牌，可交互查看村庄信息
  blue_ore_a:       '/images/item/ore_blue_a.png',       // 蓝矿石A — 采集物，佛青蓝颜料原料之一
  blue_ore_b:       '/images/item/ore_blue_b.png',       // 蓝矿石B — 采集物，佛青蓝颜料原料之二
  prayer_flags:     '/images/item/prayer_flags.png',     // 经幡 — 村中悬挂的五彩经幡，可交互查看
  stone_well:       '/images/item/stone_well.png',       // 石井 — 村中水井，可交互查看
  tent_entrance:    '/images/item/tent_entrance.png',    // 帐篷入口 — 牧民帐篷入口，可交互查看
  hearth:           '/images/item/hearth.png',           // 火塘 — 屋内火塘，可交互查看
  hematite:         '/images/item/hematite.png',         // 赤铁矿 — 采集物，朱砂红颜料原料
  furnace:          '/images/item/furnace.png',          // 熔炉 — 颜料加工设施，可交互
  danzeng_stone:    '/images/item/danzeng_stone.png',    // 旦增的石头 — 旦增院子里的石凳/石桌，可交互
  baima_corner:     '/images/item/baima_corner.png',     // 白玛的角落 — 白玛修行处的陈设，可交互
  baima_cloth:      '/images/item/baima_cloth.png',      // 白玛的布 — 白玛手中的布料/法器，可交互
  green_plant:      '/images/item/green_plant.png',      // 绿色植物 — 采集物，松石绿颜料原料
  old_prescription: '/images/item/old_prescription.png', // 旧药方 — 可拾取物品，带有线索的旧纸
  golden_herb:      '/images/item/golden_herb.png',      // 金色草药 — 采集物，藏金金颜料原料
  pulu_fragment:    '/images/item/pulu_fragment.png',    // 氆氇碎片 — 可拾取物品，骨白颜料线关键道具
  gesang_portfolio: '/images/item/gesang_portfolio.png', // 格桑的画册 — 可拾取物品，格桑的绘画练习本
  song_bai:         '/images/item/song_bai.png',         // 松柏 — 采集物，松石绿颜料原料之二
  du_song:          '/images/item/du_song.png',          // 杜松 — 采集物，颜料/香料原料
  ye_cao:           '/images/item/ye_cao.png',           // 野草 — 采集物，普通野草
  sang_stove:       '/images/item/sang_stove.png',       // 煨桑炉 — 煨桑仪式用的炉子，可交互
  empty_frame:      '/images/item/empty_frame.png',      // 空画框 — 经堂内唐卡原悬挂处的空框，重要剧情道具
  faded_mural:      '/images/item/faded_mural.png',      // 褪色壁画 — 墙上残存的旧壁画，可交互查看
  torn_cloth:       '/images/item/torn_cloth.png',       // 破布片 — 可拾取物品，带有线索
  old_wood_box:     '/images/item/old_wood_box.png',     // 旧木盒 — 旦增卧室里的旧木盒，可交互
};

// ===== 颜料样本 =====
export const PIGMENT_ICONS = {
  cinnabar_red:  '/images/pigment/cinnabar_red.png',  // 朱砂红 — 矿物颜料，取自赤铁矿，唐卡主色之一
  foqing_blue:   '/images/pigment/foqing_blue.png',   // 佛青蓝 — 矿物颜料，取自蓝矿石，唐卡主色之一
  zangjin_gold:  '/images/pigment/zangjin_gold.png',  // 藏金金 — 植物颜料，取自金色草药，唐卡描金用
  songshi_green: '/images/pigment/songshi_green.png', // 松石绿 — 植物颜料，取自松柏/绿植，唐卡主色之一
  gubai_white:   '/images/pigment/gubai_white.png',   // 骨白 — 特殊颜料，白玛提及"她留下的东西"，剧情关键道具
};

// ===== UI 纹理 =====
export const UI_TEXTURES = {
  BROCADE: '/images/ui/brocade_pattern.png', // 藏式锦缎纹理 — 可用作设置面板/对话框边框的背景纹理，增强藏式风格
};

// ===== UI 按钮 PNG 底板 =====
// 悬浮态通过 CSS transform:scale(1.03) + box-shadow 实现，无需额外 hover 图
export const UI_BUTTONS = {
  DIALOGUE_BOX: '/images/ui/dialogue_box.png', // 对话框主体背景
  BTN_CLOSE:    '/images/ui/btn_close.png',    // 关闭按钮（×）
  BTN_YELLOW:   '/images/ui/btn_yellow.png',   // 黄色按钮 — 自由对话 / 返回剧情
  BTN_BLUE:     '/images/ui/btn_blue.png',     // 蓝色按钮 — 玩家选项
  BTN_RED:      '/images/ui/btn_red.png',      // 红色按钮 — 发送
};

// ===== 音频 =====
export const SOUNDS = {
  BGM: {
    TITLE:      '/sounds/bgm/title_theme.ogg',        // 标题界面音乐 — 开始界面的主题曲，营造沉浸氛围，进入场景后自动切换为对应环境音
    VILLAGE:    '/sounds/bgm/village_ambient.ogg',    // 村庄环境音 — 村口/广场场景的背景循环音（人声、风声、远处牛铃）
    TEMPLE:     '/sounds/bgm/temple_ambient.ogg',     // 寺庙环境音 — 经堂内场景的背景循环音（安静、偶有铜钵回响）
    MOUNTAIN:   '/sounds/bgm/mountain_wind.ogg',      // 山间风声 — 高海拔场景的背景循环音（持续风声）
    COURTYARD:  '/sounds/bgm/village_ambient.ogg',    // 院落环境音 — 旦增家院墙外场景（复用村庄环境音，可后续替换独立音轨）
  },
  SFX: {
    MASTIFF_BARK:   '/sounds/sfx/mastiff_bark.ogg',   // 藏獒吠叫 — 场景三进入旦增家院墙外时触发的藏獒叫声
    DIALOGUE_OPEN:  '/sounds/sfx/dialogue_open.ogg',  // 对话开启音 — 打开对话框时的短促音效（如翻页声或铜钵轻击）
    DIALOGUE_CLOSE: '/sounds/sfx/dialogue_close.ogg', // 对话关闭音 — 关闭对话框时的短促音效
    ITEM_PICKUP:    '/sounds/sfx/item_pickup.ogg',    // 物品拾取音 — 拾取残卷/物品时的音效（如布料摩擦声）
    SCROLL_UNFOLD:  '/sounds/sfx/scroll_unfold.ogg',  // 残卷展开音 — 打开残卷阅读时的展开声
    PUZZLE_SOLVED:  '/sounds/sfx/puzzle_solved.ogg',  // 谜题解开音 — 完成颜料采集/解谜时的成功提示音
    BELL:           '/sounds/sfx/bell.ogg',           // 铜钵声 — 白玛修行/经文触发时的仪式铜钵声
    UI_CLICK:       '/sounds/sfx/ui_click.ogg',       // 界面点击音 — HUD按钮、选项点击的通用界面音效
  },
};
