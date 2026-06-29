export const ITEMS = {
  // ========== 村口 ==========
  mani_pile: {
    id: 'mani_pile',
    sceneId: 'village_entrance',
    label: '玛尼堆',
    emoji: '🪨',
    dialogueId: 'dlg_mani_pile',
    position: { top: '56%', left: '65%' },
  },
  road_sign: {
    id: 'road_sign',
    sceneId: 'village_entrance',
    label: '路标',
    emoji: '🪧',
    dialogueId: 'dlg_road_sign',
    position: { top: '48%', left: '80%' },
  },
  blue_ore_a: {
    id: 'blue_ore_a',
    sceneId: 'village_entrance',
    label: '蓝色矿石',
    emoji: '🔵',
    dialogueId: 'dlg_blue_ore_a_correct',
    position: { top: '70%', left: '22%' },
  },
  blue_ore_b: {
    id: 'blue_ore_b',
    sceneId: 'village_entrance',
    label: '蓝色矿石',
    emoji: '🔵',
    dialogueId: 'dlg_blue_ore_b_wrong',
    position: { top: '74%', left: '35%' },
  },

  // ========== 广场 ==========
  prayer_flags: {
    id: 'prayer_flags',
    sceneId: 'village_square',
    label: '经幡',
    emoji: '🎏',
    dialogueId: 'dlg_prayer_flags',
    position: { top: '25%', left: '45%' },
  },
  stone_well: {
    id: 'stone_well',
    sceneId: 'village_square',
    label: '老水井',
    emoji: '🕳️',
    dialogueId: 'dlg_stone_well',
    position: { top: '72%', left: '15%' },
  },

  // ========== 旦增家院子 ==========
  tent_entrance: {
    id: 'tent_entrance',
    sceneId: 'dangzeng_courtyard',
    label: '帐篷门口',
    emoji: '⛺',
    dialogueId: 'dlg_tent_entrance',
    position: { top: '48%', left: '50%' },
  },
  hearth: {
    id: 'hearth',
    sceneId: 'dangzeng_courtyard',
    label: '火塘',
    emoji: '🔥',
    dialogueId: 'dlg_hearth',
    position: { top: '78%', left: '30%' },
  },
  danzeng_stone: {
    id: 'danzeng_stone',
    sceneId: 'dangzeng_courtyard',
    label: '院中石',
    emoji: '🪨',
    dialogueId: 'dlg_danzeng_stone_view',
    position: { top: '72%', left: '78%' },
  },
  hematite: {
    id: 'hematite',
    sceneId: 'dangzeng_courtyard',
    label: '赤铁矿',
    emoji: '🔴',
    dialogueId: 'dlg_hematite_found',
    position: { top: '35%', left: '18%' },
  },
  furnace: {
    id: 'furnace',
    sceneId: 'dangzeng_courtyard',
    label: '铜炉',
    emoji: '🪔',
    dialogueId: 'dlg_furnace_rust',
    position: { top: '62%', left: '58%' },
  },
  baima_corner: {
    id: 'baima_corner',
    sceneId: 'temple_exterior',
    label: '白玛的角落',
    emoji: '🧣',
    dialogueId: 'dlg_baima_corner_view',
    position: { top: '72%', left: '18%' },
  },
  green_plant: {
    id: 'green_plant',
    sceneId: 'temple_exterior',
    label: '松石草',
    emoji: '🌿',
    dialogueId: 'dlg_green_plant_found',
    position: { top: '60%', left: '72%' },
  },
  old_prescription: {
    id: 'old_prescription',
    sceneId: 'temple_exterior',
    label: '老药方',
    emoji: '📄',
    dialogueId: 'dlg_old_prescription',
    position: { top: '74%', left: '55%' },
  },
  golden_herb: {
    id: 'golden_herb',
    sceneId: 'temple_exterior',
    label: '金颜草',
    emoji: '🌺',
    dialogueId: 'dlg_golden_herb_found',
    position: { top: '48%', left: '78%' },
  },
  baima_cloth: {
    id: 'baima_cloth',
    sceneId: 'temple_exterior',
    label: '氆氇碎片',
    emoji: '🧵',
    dialogueId: 'dlg_baima_gubai_cloth',
    position: { top: '65%', left: '22%' },
  },
  // 背包中使用的别名（onCollectScroll 存入的是 pulu_fragment）
  pulu_fragment: {
    id: 'pulu_fragment',
    label: '氆氇碎片',
    emoji: '🧵',
  },
  gesang_portfolio: {
    id: 'gesang_portfolio',
    sceneId: 'gesang_corner',
    label: '格桑的画夹',
    emoji: '🎨',
    dialogueId: 'dlg_gesang_portfolio_view',
    position: { top: '75%', left: '30%' },
  },

  // ========== 经堂外（植物） ==========
  song_bai: {
    id: 'song_bai',
    sceneId: 'temple_exterior',
    label: '松柏',
    emoji: '🌲',
    dialogueId: 'dlg_song_bai_found',
    position: { top: '58%', left: '38%' },
  },

  // ========== 旦增家院子（植物） ==========
  du_song: {
    id: 'du_song',
    sceneId: 'dangzeng_courtyard',
    label: '杜松',
    emoji: '🌿',
    dialogueId: 'dlg_du_song_found',
    position: { top: '50%', left: '12%' },
  },

  // ========== 煨桑台 ==========
  ye_cao: {
    id: 'ye_cao',
    sceneId: 'sangtai',
    label: '高原野草',
    emoji: '🌾',
    dialogueId: 'dlg_ye_cao_found',
    position: { top: '72%', left: '22%' },
  },
  sang_stove: {
    id: 'sang_stove',
    sceneId: 'sangtai',
    label: '煨桑炉',
    emoji: '🔥',
    dialogueId: 'dlg_sang_stove_intro',
    position: { top: '55%', left: '50%' },
  },

  // ========== 经堂内部 ==========
  empty_frame: {
    id: 'empty_frame',
    sceneId: 'temple_interior',
    label: '空画框',
    emoji: '🖼️',
    dialogueId: 'dlg_empty_frame',
    position: { top: '18%', left: '50%' },
  },
  faded_mural: {
    id: 'faded_mural',
    sceneId: 'temple_interior',
    label: '褪色壁画',
    emoji: '🖌️',
    dialogueId: 'dlg_faded_mural',
    position: { top: '52%', left: '82%' },
  },
  torn_cloth: {
    id: 'torn_cloth',
    sceneId: 'temple_interior',
    label: '碎布',
    emoji: '🧶',
    dialogueId: 'dlg_torn_cloth',
    position: { top: '68%', left: '38%' },
  },

  // ========== 旦增卧室 ==========
  old_wood_box: {
    id: 'old_wood_box',
    sceneId: 'dangzeng_bedroom',
    label: '旧木盒',
    emoji: '📦',
    dialogueId: 'dlg_old_wood_box',
    position: { top: '58%', left: '48%' },
  },
};
