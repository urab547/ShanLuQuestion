/**
 * 颜料元数据与初始状态
 *
 * 五种唐卡颜料：朱砂红、佛青、藏金、松石绿、骨白
 * 每种颜料有两个独立状态：rawMaterialFound（原材料已采集）、recipeUnderstood（制法已理解）
 * craftable = rawMaterialFound && recipeUnderstood（派生，不入库）
 */

export const PIGMENTS = {
  cinnabar_red: {
    id: 'cinnabar_red',
    label: '朱砂红',
    emoji: '🔴',
    color: '#C0392B',
    description:
      '取自赤铁矿，色如凝血，历久不褪。唐卡中以之绘佛肉身、火焰、衣纹朱线。',
    recipe:
      '赤铁矿研为细粉，过筛去粗；以牛胶温水化开，按七分粉三分胶调和，研至无声方可上色。',
    rawMaterialHint: '赤铁矿常见于山阴石隙，旦增院子角落或有所藏。',
  },
  foqing_blue: {
    id: 'foqing_blue',
    label: '佛青',
    emoji: '🔵',
    color: '#1B4F72',
    description:
      '取自苍穹之蓝，色湛然深沉，历千载不褪。唐卡中以之绘佛发、衣纹青线、天空与护法身色。',
    recipe:
      '取佛青矿石断面深蓝处，以骨匙刮取粉末，过细筛去粗。牛胶温水化开，按六分粉四分胶调和，于暗处研至无声。须随调随用，不可隔夜——隔夜则色沉，化为凡青。',
    rawMaterialHint:
      '村口路边的碎石堆中，散落着两块蓝色矿石，外观无二。真伪需以残卷所记「其色湛然」为准——断面深而纯者方是真料。',
  },
  zangjin_gold: {
    id: 'zangjin_gold',
    label: '藏金',
    emoji: '🟡',
    color: '#D4AC0D',
    description:
      '金颜之色，非金所得。色近琥珀而泛金光，历久不黯。唐卡中以之绘佛身金纹、莲花蕊、经文细线。',
    recipe:
      '取金颜草茎秆断处渗出的蜜色汁液，以指腹研于粗陶之上。研至半途汁液渐现金光，此时方入羊胶调和，色正品金。研磨须缓，急则色灰。',
    rawMaterialHint:
      '经堂北侧石缝间伏地生有金颜草——叶如柳眉背覆白绒，花五瓣暗红。茎断处渗汁如蜜，触之沾指。',
  },
  songshi_green: {
    id: 'songshi_green',
    label: '松石绿',
    emoji: '🟢',
    color: '#1A7A4A',
    description:
      '色如松石，青翠欲滴，介于蓝绿之间。唐卡中以之绘水、树叶、度母衣纹。',
    recipe:
      '松石研为细粉，以醋浸三日去其浊气；羊胶温水化开（羊胶性清，不掩青色），按六分粉四分胶调和，研至色如翠玉方可上色。',
    rawMaterialHint:
      '经堂外石阶旁生着一簇低矮的青绿草本，便是松石。制法或藏于经堂外的某页老药方中——需对照实物方能定夺。',
  },
  gubai_white: {
    id: 'gubai_white',
    label: '骨白',
    emoji: '⚪',
    color: '#F5F0E8',
    description: '骨白之色，温而润，入胶即活。',
    recipe: '',
    rawMaterialHint: '',
  },
};

/** 颜料初始状态（全部未采集、未学制法） */
export const INITIAL_PIGMENT_STATE = Object.fromEntries(
  Object.values(PIGMENTS).map((p) => [
    p.id,
    { rawMaterialFound: false, recipeUnderstood: false },
  ]),
);
