export const SCENES = {
  village_entrance: {
    id: 'village_entrance',
    name: '村口·玛尼堆',
    bgColor: '#FFF8E7',
    groundColor: '#D4A574',
    exits: [
      { target: 'village_square', label: '前往广场', side: 'right' },
    ],
    interactables: ['mani_pile', 'road_sign', 'blue_ore_a', 'blue_ore_b'],
  },
  village_square: {
    id: 'village_square',
    name: '村子中央广场',
    bgColor: '#FFF8E7',
    groundColor: '#D4A574',
    exits: [
      { target: 'temple_exterior',    label: '前往经堂外', side: 'left-top' },
      { target: 'village_entrance',   label: '返回村口',   side: 'left-bottom' },
      { target: 'gesang_corner',      label: '去找格桑',   side: 'right-top' },
      { target: 'dangzeng_courtyard', label: '前往旦增家', side: 'right-bottom' },
      { target: 'mountain_peak',      label: '登山顶',     side: 'top-left' },
      { target: 'sangtai',            label: '去煨桑台',   side: 'top-right' },
    ],
    interactables: ['prayer_flags', 'stone_well'],
    npcs: ['zhuoma', 'renqing'],
  },
  dangzeng_courtyard: {
    id: 'dangzeng_courtyard',
    name: '旦增家院子',
    bgColor: '#FFF8E7',
    groundColor: '#C4955E',
    exits: [
      { target: 'village_square', label: '返回广场', side: 'left' },
      { target: 'dangzeng_bedroom', label: '走进卧室', side: 'center', locked: true, dialogueId: 'dlg_bedroom_locked' },
    ],
    interactables: ['danzeng_stone', 'hematite', 'furnace', 'du_song'],
    npcs: ['danzeng'],
  },

  // ===== 四个新场景 =====
  temple_exterior: {
    id: 'temple_exterior',
    name: '经堂外',
    bgColor: '#F5EFE8',
    groundColor: '#B8A088',
    exits: [
      { target: 'village_square', label: '返回广场', side: 'right' },
      { target: 'temple_interior', label: '进入经堂', side: 'center', locked: true, dialogueId: 'dlg_temple_locked' },
    ],
    interactables: ['baima_corner', 'green_plant', 'old_prescription', 'golden_herb', 'baima_cloth', 'song_bai'],
    npcs: ['baima'],
  },
  mountain_peak: {
    id: 'mountain_peak',
    name: '山顶·经幡',
    bgColor: '#D6E4F0',
    groundColor: '#E8E8F0',
    exits: [
      { target: 'village_square', label: '下山回广场', side: 'left' },
    ],
    interactables: [],
    npcs: [],
  },
  sangtai: {
    id: 'sangtai',
    name: '煨桑台',
    bgColor: '#EDE4D8',
    groundColor: '#A89078',
  exits: [
    { target: 'village_square', label: '返回广场', side: 'right' },
  ],
  interactables: ['ye_cao', 'sang_stove'],
  npcs: [],
},
  gesang_corner: {
    id: 'gesang_corner',
    name: '格桑的角落',
    bgColor: '#FFF3E0',
    groundColor: '#C9A06E',
    exits: [
      { target: 'village_square', label: '返回广场', side: 'left' },
    ],
    interactables: ['gesang_portfolio'],
    npcs: ['gesang'],
  },

  // ===== 暂未开放的场景（防止导航到未定义场景黑屏） =====
  dangzeng_bedroom: {
    id: 'dangzeng_bedroom',
    name: '旦增的卧室',
    bgColor: '#3A2A1A',
    groundColor: '#5C3D2E',
    exits: [
      { target: 'dangzeng_courtyard', label: '走出卧室', side: 'center' },
    ],
    interactables: ['old_wood_box'],
    npcs: [],
  },
  temple_interior: {
    id: 'temple_interior',
    name: '经堂内部',
    bgColor: '#2A1F14',
    groundColor: '#3D2E1F',
    exits: [
      { target: 'temple_exterior', label: '走出经堂', side: 'center' },
    ],
    interactables: ['empty_frame', 'faded_mural', 'torn_cloth'],
    npcs: [],
  },
};
