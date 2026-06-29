export const DIALOGUES = {
  dlg_mani_pile: {
    id: 'dlg_mani_pile',
    title: '玛尼堆',
    lines: [
      '一堆刻着经文的石块，垒得整整齐齐。',
      '风吹过，石上的"嗡嘛呢叭咪吽"仿佛在低语。',
      '村里人说，每加一块石头，就许下一个愿望。',
    ],
  },
  dlg_road_sign: {
    id: 'dlg_road_sign',
    title: '路标',
    lines: [
      '木牌上字迹斑驳：「前方·村子」。',
      '箭头指向右侧的小路，通向村子中央。',
    ],
  },
  dlg_prayer_flags: {
    id: 'dlg_prayer_flags',
    title: '经幡',
    lines: [
      '五色经幡在风中猎猎作响：蓝、白、红、绿、黄。',
      '蓝是天，白是云，红是火，绿是水，黄是土。',
      '每一次飘动，都是一次祈福。',
    ],
  },
  dlg_stone_well: {
    id: 'dlg_stone_well',
    title: '老水井',
    lines: [
      '井沿磨得发亮，不知被多少双手抚摸过。',
      '探头下去，能看见水面映出自己的脸。',
    ],
  },
  dlg_tent_entrance: {
    id: 'dlg_tent_entrance',
    title: '帐篷门口',
    lines: [
      '黑氆氇帐篷的门帘半卷着，里面飘出酥油茶的香气。',
      '没有人应声。旦增似乎不在家。',
      '也许该在院子里找找线索。',
    ],
  },
  dlg_hearth: {
    id: 'dlg_hearth',
    title: '火塘',
    lines: [
      '火塘里的灰还是温的，说明不久前还有人在。',
      '三块支锅的石头，被烟熏得漆黑。',
    ],
  },
  dlg_danzeng_1: {
    id: 'dlg_danzeng_1',
    title: '旦增',
    lines: [
      '一位面容沧桑的老人从帐篷里探出身来。',
      '"远方的客人，你终于来了。"',
      '旦增微笑着，眼神里藏着一丝难以察觉的忧虑。',
    ],
  },

  // ===== 旦增 —— 各信任阶段对话 =====
  dlg_danzeng_stranger: {
    id: 'dlg_danzeng_stranger',
    title: '旦增',
    lines: [
      '旦增看了你一眼，摆了摆手。',
      '"没什么好说的，走吧。"',
      '他转身走进了帐篷深处，不再理会你。',
    ],
  },
  dlg_danzeng_listener: {
    id: 'dlg_danzeng_listener',
    title: '旦增',
    lines: [
      '"你问那座山？"',
      '旦增指了指远方的雪山，眼神柔和了一些。',
      '"我年轻时喜欢画它。每一笔都像在描自己的心。"',
      '他从怀里摸出一张泛黄的残卷，让你看了一眼又收了回去。',
      { text: '"你和你祖父长得不像，但问问题的方式一样。他懂得先听，再问。"', isKeyLine: true },
    ],
  },
  dlg_danzeng_acknowledged: {
    id: 'dlg_danzeng_acknowledged',
    title: '旦增',
    lines: [
      '"你和他很像……"',
      '旦增沉默了许久，声音有些沙哑。',
      '"你祖父当年，也曾经像你这样追问过我。"',
      '"后来他去了经堂，再也没有回来。"',
      '旦增看着你，似乎在等待什么。',
    ],
  },
  dlg_danzeng_confidant: {
    id: 'dlg_danzeng_confidant',
    title: '旦增',
    lines: [
      '旦增主动从帐篷里走出来，神色郑重。',
      '"孩子，我一直在等你。"',
      '"有些事我藏了太久，是时候说出来了。"',
      '"山里有答案，但你需要先去经堂。"',
      '旦增的目光投向远方，仿佛下了一个很大的决心。',
    ],
  },

  // ===== 卓玛 —— 各信任阶段对话 =====
  dlg_zhuoma_stranger: {
    id: 'dlg_zhuoma_stranger',
    title: '卓玛',
    lines: [
      '卓玛正对着手机皱眉，抬头看了你一眼。',
      '"游客？村里没什么好看的，广场那边拍拍照就行。"',
      '她又低下头，手指在屏幕上快速滑动。',
    ],
  },
  dlg_zhuoma_listener: {
    id: 'dlg_zhuoma_listener',
    title: '卓玛',
    lines: [
      '卓玛把手机收进冲锋衣口袋，叹了口气。',
      '"你一直在村里转，不是普通游客吧。"',
      '"我爸……旦增他跟你说了什么吗？"',
      '她顿了顿，又摆摆手："算了，当我没问。村子的事比一幅画复杂得多。"',
    ],
  },
  dlg_zhuoma_acknowledged: {
    id: 'dlg_zhuoma_acknowledged',
    title: '卓玛',
    lines: [
      '"唐卡的事，我知道一些。"',
      '卓玛靠在广场的石墙上，语气很平。',
      '"但我不打算追究。你明白吗？这个村子需要的不是真相，是未来。"',
      '"经堂的钥匙我有。但那个门……不是一把钥匙就能让你进去的。"',
    ],
  },
  dlg_zhuoma_confidant: {
    id: 'dlg_zhuoma_confidant',
    title: '卓玛',
    lines: [
      '卓玛难得地笑了，是一种很疲惫的笑。',
      '"你知道吗，我有时候也想去经堂看一眼。但我爸不肯去，白玛又不肯说。"',
      '"这样吧——找个时间，我带你去看一眼。"',
      '"只一眼。剩下的，得靠你自己问。"',
    ],
  },

  // ===== 格桑 —— 各信任阶段对话 =====
  dlg_gesang_stranger: {
    id: 'dlg_gesang_stranger',
    title: '格桑',
    lines: [
      '格桑坐在广场角落，膝上摊着画夹，手里的转经筒有一搭没一搭地转着。',
      '"你是来找我爷爷的？"',
      '他没等你回答，低下头继续画，炭笔在纸上用力地刮。',
    ],
  },
  dlg_gesang_listener: {
    id: 'dlg_gesang_listener',
    title: '格桑',
    lines: [
      { text: '"爷爷从来不教我画画。"', isKeyLine: true },
      '格桑把画夹翻过来给你看——是一幅未完成的雪山，笔触有力但构图混乱。',
      { text: '"他说我没那个天赋。但我觉得，他是怕我看到什么。"', isKeyLine: true },
      '"你知道吗，我爸在我五岁那年就走了。爷爷从那以后就不怎么说话了。"',
    ],
  },
  dlg_gesang_acknowledged: {
    id: 'dlg_gesang_acknowledged',
    title: '格桑',
    lines: [
      '格桑收起画夹，眼神突然认真起来。',
      '"我在经堂外面画过很多次。有一次，我听见白玛在里面念经。"',
      '"声音很低，听不清念的是什么。但那个调子……不像平时祈福的调子。"',
      '他盯着你："我问他供的是什么，他不说。只是把门关得更紧了。"',
    ],
  },
  dlg_gesang_confidant: {
    id: 'dlg_gesang_confidant',
    title: '格桑',
    lines: [
      '格桑把一张折好的画塞进你手里。',
      '"这是我能画的全部了。爷爷不肯教我的那些，我偷着学的。"',
      '"如果你能让他开口……让他把那些年的事说出来……"',
      '他咬住嘴唇，没有说下去。转经筒掉在地上，他没有捡。',
    ],
  },

  // ===== 白玛 —— 各信任阶段对话 =====
  dlg_baima_stranger: {
    id: 'dlg_baima_stranger',
    title: '白玛',
    lines: [
      '白玛坐在广场的经幡下，嘴唇微动，正捻着一串旧念珠。',
      '他看了你一眼，没有停下念诵。',
      '"风在动，幡在动，你的心也在动。坐。"',
    ],
  },
  dlg_baima_listener: {
    id: 'dlg_baima_listener',
    title: '白玛',
    lines: [
      '白玛收起念珠，指了指身后的经堂方向。',
      { text: '"那扇门关着，不是锁坏了，是有人把它关上的。"', isKeyLine: true },
      '"业报这件事，不是谁做错了什么，是时候还没到。"',
      '"你来，是时候的一部分。但不是全部。"',
    ],
  },
  dlg_baima_acknowledged: {
    id: 'dlg_baima_acknowledged',
    title: '白玛',
    lines: [
      '白玛从怀里取出一盏酥油灯，点燃，放在脚边。',
      '"有人觉得一幅画比一个村子值钱。那是贪。"',
      '"有人觉得一个村子的未来比真相重要。那是执。"',
      { text: '"贪和执，都是苦。门打不开，是因为外面的人不知道该问什么。"', isKeyLine: true },
    ],
  },
  dlg_baima_confidant: {
    id: 'dlg_baima_confidant',
    title: '白玛',
    lines: [
      '白玛站起身，酥油灯的火苗在风中晃了一下，没有灭。',
      '"灯不灭，是因为有人添油。经堂还在，是因为有人记得。"',
      '"钥匙，卓玛有，我也有。但钥匙从来不是问题。"',
      '"问题是——我们两个里，谁愿意为你推开那扇门。"',
      '他捻动一颗念珠："你祖父问过我同样的问题。我给了他同样的回答。"',
    ],
  },

  // ===== 锁定入口 —— 旁白反馈 =====
  dlg_bedroom_locked: {
    id: 'dlg_bedroom_locked',
    title: '帐篷深处',
    lines: [
      '门帘虚掩着，隐约能看见里面的被褥和旧木箱。',
      '空气里有一股淡淡的酥油味。',
      '这里似乎很久没人进来过了。也许旦增不希望别人进去。',
    ],
  },
  dlg_temple_locked: {
    id: 'dlg_temple_locked',
    title: '经堂门',
    lines: [
      '厚重的木门上绘着褪色的莲花纹，门缝里透出一丝酥油灯的气息。',
      '门没有锁，但推开时纹丝不动。',
      '仿佛有什么东西在里面顶着。也许是时候问问白玛了。',
    ],
  },
  dlg_mani_stones_solved: {
    id: 'dlg_mani_stones_solved',
    title: '六字真言石',
    lines: [
      '六块石头在门前的石板地上排成了正确顺序。',
      '唵嘛呢叭咪吽——门缝里透出的酥油灯光似乎亮了一些。',
      '但经堂的门，依然纹丝不动。',
    ],
  },
  dlg_baima_flags_hint: {
    id: 'dlg_baima_flags_hint',
    title: '白玛',
    lines: [
      '白玛望向山顶猎猎作响的经幡，停下捻动的念珠。',
      '"风把颜色吹乱了——蓝天、白云、火焰、绿水、大地。"',
      '"谁还记得它们该在哪里。"',
    ],
  },
  dlg_flags_solved: {
    id: 'dlg_flags_solved',
    title: '经幡',
    lines: [
      '五色经幡在风中依次排开：蓝、白、红、绿、黄。',
      '白玛从远处望了一眼，微微点头。',
      '"色归其位，心才安。"',
      '"这经堂的门，比这经幡乱得更久。"',
    ],
  },
  // ===== 残卷拾取相关 =====
  dlg_mani_scroll_found: {
    id: 'dlg_mani_scroll_found',
    title: '玛尼堆',
    lines: [
      '你弯下腰，在玛尼堆的石缝中摸索。',
      '指尖触到一张泛黄的纸卷——边角已被虫蛀，但字迹尚可辨认。',
      '（残卷已收入道具栏，点击右上角 📜 查看）',
    ],
  },
  dlg_mani_scroll_collected: {
    id: 'dlg_mani_scroll_collected',
    title: '玛尼堆',
    lines: [
      '残卷已经在你手上了。',
      '石缝里只剩下几片枯叶和细沙，再无他物。',
    ],
  },
  // ===== 残卷第二页：白玛角落 =====
  dlg_baima_corner_locked: {
    id: 'dlg_baima_corner_locked',
    title: '白玛的角落',
    lines: [
      '白玛常坐的角落，地上压着一条素白的哈达。',
      '哈达边缘露出一角泛黄的纸——似乎压着什么，但看不真切。',
      '白玛还在旁边念经，不便细翻。或许等他更信任你一些再说。',
    ],
  },
  dlg_baima_corner_view: {
    id: 'dlg_baima_corner_view',
    title: '白玛的角落',
    lines: [
      '你蹲下身，轻轻掀开哈达。',
      '下面是一页手抄的经文——但仔细看去，经文之间夹着一页残卷。',
      '白玛停下念珠看了你一眼，没有阻止。',
    ],
  },
  dlg_baima_corner_found: {
    id: 'dlg_baima_corner_found',
    title: '白玛的角落',
    lines: [
      '你小心地抽出那张泛黄的纸页，拂去灰尘。',
      '白玛微微点头：「那是你该找到的东西。」',
      '（残卷第二页已收入道具栏，点击右上角 📜 查看）',
    ],
  },
  dlg_baima_corner_collected: {
    id: 'dlg_baima_corner_collected',
    title: '白玛的角落',
    lines: [
      '哈达下面已经空了。',
      '白玛捻着念珠，仿佛什么都没发生过。',
    ],
  },
  // ===== 残卷第三页：格桑画夹 =====
  dlg_gesang_portfolio_locked: {
    id: 'dlg_gesang_portfolio_locked',
    title: '格桑的画夹',
    lines: [
      '格桑正专注地画着画，炭笔在纸上沙沙作响。',
      '画夹合在一旁，不便打扰。',
      '画夹里隐约夹着什么，边角泛黄，看不真切。',
    ],
  },
  dlg_gesang_portfolio_view: {
    id: 'dlg_gesang_portfolio_view',
    title: '格桑的画夹',
    lines: [
      '趁格桑抬头看雪山的间隙，你轻轻翻开画夹。',
      '夹层里有一张折好的纸——不是画，是一页残卷，纸色比画纸旧得多。',
      '格桑回过头，看见了，却没有阻止，只是低下声："那是……我偷偷藏的。"',
      '他顿了顿："爷爷说画那东西的人都不在了。但你既然看到了，就拿走吧。"',
    ],
  },
  dlg_gesang_portfolio_found: {
    id: 'dlg_gesang_portfolio_found',
    title: '格桑的画夹',
    lines: [
      '你小心地抽出那页残卷，展开。纸面字迹尚可辨认，记的是一种植物的形貌。',
      '格桑看了一眼，轻声说："这是金颜草。我见过它开花，就在经堂北边的石缝里。"',
      '（残卷第三页已收入道具栏，点击右上角 📜 查看）',
    ],
  },
  dlg_gesang_portfolio_collected: {
    id: 'dlg_gesang_portfolio_collected',
    title: '格桑的画夹',
    lines: [
      '画夹里已经空了，只剩下几张未完成的画稿。',
      '格桑继续低头画他的雪山，炭笔声又沙沙响了起来。',
    ],
  },
  // ===== 残卷第四页：旦增院子石头 =====
  dlg_danzeng_stone_locked: {
    id: 'dlg_danzeng_stone_locked',
    title: '院中石',
    lines: [
      '院子右侧的空地上，有一块孤零零的石头，比拳头大些。',
      '石头下面似乎压着什么东西，边角泛黄——像是纸。',
      '但旦增就在不远处，正看着这边。现在翻动，怕是不便。',
    ],
  },
  dlg_danzeng_stone_view: {
    id: 'dlg_danzeng_stone_view',
    title: '院中石',
    lines: [
      '趁旦增转身的间隙，你快步走到石头旁，用力搬开。',
      '石头下面压着一页残卷，纸色比泥土还黄，边角已被虫蛀，但字迹尚可辨认。',
      '你匆匆记下位置，将残卷留在原处——一会儿再来取，免得被旦增看见。',
    ],
  },
  dlg_danzeng_stone_found: {
    id: 'dlg_danzeng_stone_found',
    title: '院中石',
    lines: [
      '你再次来到石头旁，确认旦增没有注意，迅速取出那页残卷，拂去泥土。',
      '纸上的字迹依稀可辨——记的是一种白色颜料的制法，语焉不详。',
      '（残卷第四页已收入道具栏，点击右上角 📜 查看）',
    ],
  },
  dlg_danzeng_stone_collected: {
    id: 'dlg_danzeng_stone_collected',
    title: '院中石',
    lines: [
      '石头已经被你搬回原处。',
      '下面的土坑空空如也，只剩几片枯叶。',
    ],
  },
  // ===== 颜料系统：赤铁矿 + 铜炉 =====
  dlg_hematite_found: {
    id: 'dlg_hematite_found',
    title: '赤铁矿',
    lines: [
      '院子左角的柴堆旁，散落着几块暗红色的石头。',
      '你拾起一块——沉重，断面呈赭红，指尖被染上淡淡锈色。',
      '是赤铁矿。唐卡朱砂红的原料，正是此物。',
      '（朱砂红·原材料已采集）',
    ],
  },
  dlg_hematite_collected: {
    id: 'dlg_hematite_collected',
    title: '赤铁矿',
    lines: [
      '赤铁矿已在囊中。柴堆旁只剩几片碎屑。',
      '该想想如何将它制成颜料了——或许院子里那座旧铜炉藏着答案。',
    ],
  },
  dlg_furnace_rust: {
    id: 'dlg_furnace_rust',
    title: '铜炉',
    lines: [
      '一座半人高的铜炉静置院中，炉身蒙着厚厚的锈迹。',
      '你伸手触摸——锈层下似乎有刻痕，但被氧化层盖得严严实实。',
      '或许擦去锈迹，能看清上面的字。',
    ],
  },
  dlg_furnace_inscription: {
    id: 'dlg_furnace_inscription',
    title: '铜炉·刻字',
    lines: [
      '你用袖口用力擦拭炉身，锈迹簌簌落下，露出一片清晰的刻字：',
      '「赤石三分，研至尘微；牛胶一钱，化于温水。」',
      '「七研七浣，方成朱泥。火候过则色焦，胶重则色黯。」',
      '「——此乃朱砂古法，画师秘不示人。」',
      '你将刻字默记于心。朱砂红的制法，原来藏在这座炉上。',
      '（朱砂红·制法已理解）',
    ],
  },
  dlg_furnace_done: {
    id: 'dlg_furnace_done',
    title: '铜炉',
    lines: [
      '铜炉上的刻字已被你抄录在心。',
      '炉身依旧静默，仿佛千年来从未有人读懂过它。',
    ],
  },
  // ===== 佛青：蓝色矿石 =====
  dlg_blue_ore_generic: {
    id: 'dlg_blue_ore_generic',
    title: '蓝色矿石',
    lines: [
      '路边的碎石堆里，散落着两块蓝色的矿石。',
      '看起来和寻常石青差不多，说不上有什么特别。',
      '或许该先弄清楚什么是真正的「佛青」再说。',
    ],
  },
  dlg_blue_ore_a_correct: {
    id: 'dlg_blue_ore_a_correct',
    title: '蓝色矿石',
    lines: [
      '你凑近端详这块矿石——断面色泽湛蓝，深沉通透，边缘泛着一层幽光。',
      '残卷所言不虚：「其色湛然，历千载不褪。」这块正是苍穹之蓝，佛青的真料。',
      '你小心地将矿石敲下一角，收入囊中。',
      '（佛青·原材料已采集）',
    ],
  },
  dlg_blue_ore_a_collected: {
    id: 'dlg_blue_ore_a_collected',
    title: '蓝色矿石',
    lines: [
      '佛青矿石已在囊中。这块石头的秘密，已被你识破。',
      '碎石堆里只剩几片寻常的石青，再无可取之物。',
    ],
  },
  dlg_blue_ore_b_wrong: {
    id: 'dlg_blue_ore_b_wrong',
    title: '蓝色矿石',
    lines: [
      '你端详这块矿石——颜色虽蓝，却浅而浊，带着一丝灰调，断面黯淡无光。',
      '颜色不太对。这不是残卷所说的「苍穹之蓝」。',
    ],
  },
  // ===== 松石绿：植物 + 老药方 =====
  dlg_green_plant_found: {
    id: 'dlg_green_plant_found',
    title: '松石草',
    lines: [
      '经堂外的石阶旁，生着一簇低矮的草本植物，叶片圆润，泛着淡淡的青绿色。',
      '你认出这是松石——唐卡中松石绿颜料的来源。',
      '你小心地连根拔起，抖落泥土。',
      '（松石绿·原材料已采集）',
    ],
  },
  dlg_green_plant_collected: {
    id: 'dlg_green_plant_collected',
    title: '松石草',
    lines: [
      '松石已在囊中。石阶旁只留下一个小小的土坑。',
    ],
  },
  dlg_old_prescription: {
    id: 'dlg_old_prescription',
    title: '老药方',
    lines: [
      '石阶的缝隙里，塞着一张泛黄的纸片——是一页老药方。',
      '字迹潦草，但依稀可辨：「松石研粉，醋浸三日，去其浊气；以羊胶调之，色如翠玉。」',
      '药方末尾另有一行小字：「此法与古法有异，需对照实物方能定夺。」',
      '你将药方的内容默记于心。',
    ],
  },
  dlg_songshi_compare: {
    id: 'dlg_songshi_compare',
    title: '松石绿·对照药方',
    lines: [
      '你取出松石，又摊开老药方，逐条对照。',
      '「研粉」——松石质地细腻，确实可研。',
      '「醋浸去浊」——新鲜松石略带土气，醋浸或可去之。',
      '「羊胶调之」——与朱砂用的牛胶不同，羊胶更清，不掩青色。',
      '你心中豁然：这药方虽非古法，却暗合松石之性。松石绿的制法，原来藏在这张旧纸里。',
      '（松石绿·制法已理解）',
    ],
  },
  // ===== 藏金：金颜草 + 格桑教用法 =====
  dlg_golden_herb_found: {
    id: 'dlg_golden_herb_found',
    title: '金颜草',
    lines: [
      '经堂北侧的石缝间，伏地生着一丛不起眼的草。',
      '叶片狭长如柳眉，背面覆着一层白绒；花朵五瓣，色作暗红——正是残卷所记的「金颜草」。',
      '你掐断茎秆，断处渗出蜜色汁液，沾在指尖，半日方褪。',
      '（藏金·原材料已采集）',
    ],
  },
  dlg_golden_herb_collected: {
    id: 'dlg_golden_herb_collected',
    title: '金颜草',
    lines: [
      '金颜草已在囊中。石缝间只剩几片残叶。',
    ],
  },
  dlg_gesang_zangjin_recipe: {
    id: 'dlg_gesang_zangjin_recipe',
    title: '格桑',
    lines: [
      '格桑瞥见你手中的金颜草，眼睛一亮。',
      '「这个……我认得。爷爷以前画唐卡用过。」',
      '他压低声音：「爷爷说，这草的汁液不能直接用，得在粗陶上研。研到一半会变金色，那时候才能入胶。」',
      '「他说这法子是祖上传下来的，不许外人说。但你……你都找到这草了，不告诉你可惜了。」',
      '格桑顿了顿，又补一句：「研的时候要耐住性子，急了色就灰。」',
      '（藏金·制法已理解）',
    ],
  },
  // ===== 骨白专属流程 =====
  dlg_danzeng_gubai_secret: {
    id: 'dlg_danzeng_gubai_secret',
    title: '旦增',
    lines: [
      '旦增沉默了许久，目光落在地上。',
      '"你问骨白……"',
      '"那是我妻子的氆氇。她走后，我将她最后穿的那件白色氆氇磨成了粉。"',
      '"这颜色里，有她。"',
      '旦增的声音越来越低，最后几个字几乎听不见。',
      '（骨白·来历已解）',
    ],
  },
  dlg_baima_gubai_cloth: {
    id: 'dlg_baima_gubai_cloth',
    title: '白玛',
    lines: [
      '白玛从怀里取出一小块折叠整齐的白色氆氇。',
      '"旦增托我保管的。他说，将来会有人来取。"',
      '"你既然问到了，就是时候了。"',
      '他递给你，手指在布面上轻轻拂过。',
      '（氆氇碎片已收入道具栏）',
    ],
  },
  dlg_baima_cloth_collected: {
    id: 'dlg_baima_cloth_collected',
    title: '氆氇碎片',
    lines: [
      '氆氇碎片已在你手中。白玛微微点头，不再多言。',
    ],
  },
  dlg_baima_cloth_locked: {
    id: 'dlg_baima_cloth_locked',
    title: '氆氇碎片',
    lines: [
      '白玛的念珠旁放着一小块白色织物，叠得整整齐齐。',
      '看起来是有人托他保管的——但现在还不便碰它。',
    ],
  },
  dlg_pulu_grind_done: {
    id: 'dlg_pulu_grind_done',
    title: '氆氇碎片',
    lines: [
      '你将氆氇碎片放在粗陶上，一点点研开。',
      '白色的纤维渐渐化为细粉——这便是骨白。',
      '旦增说过的，这颜色里，有她。',
      '（骨白·已可制作）',
    ],
  },

  // ===== 3.4 唐卡赠予 =====
  dlg_danzeng_thangka_deep: {
    id: 'dlg_danzeng_thangka_deep',
    title: '旦增',
    lines: [
      '旦增接过你递来的唐卡，目光落在画布上，久久没有移开。',
      '他的手轻轻拂过骨白的部分——那是他妻子的氆氇磨成的颜色。',
      '"你……真的看到了。"',
      '他的眼眶有些发红，但嘴角带着笑。',
      '"孩子，跟我来。"',
      '旦增转身走向帐篷深处，掀开了那扇一直紧闭的门帘。',
      '（旦增卧室已解锁）',
    ],
  },
  dlg_danzeng_thangka_basic: {
    id: 'dlg_danzeng_thangka_basic',
    title: '旦增',
    lines: [
      '旦增接过唐卡，仔细端详了片刻，点了点头。',
      '"画得不错。颜色的位置都对。"',
      '他顿了顿，目光在度母的左眼处停留了一瞬，但没有多说什么。',
      '"好好收着吧。这是一幅好唐卡。"',
      '旦增将唐卡还给你，转身走进了帐篷深处。',
    ],
  },
  dlg_gesang_thangka: {
    id: 'dlg_gesang_thangka',
    title: '格桑',
    lines: [
      '格桑接过唐卡，眼睛一下子亮了。',
      '"这是……爷爷画的那幅？不对，这是你画的？"',
      '他凑近了看比例，忽然从画夹里翻出几张旧纸。',
      '"你看，我以前也试着画过。但比例总是对不上。"',
      '纸上画着歪歪扭扭的度母轮廓，比例混乱，和唐卡上的精准构图形成鲜明对比。',
      '"爷爷从来不教我这些……他说我画得不对，但又不肯说哪里不对。"',
      '格桑的声音低了下去："你做到了我做不到的事。"',
    ],
  },
  dlg_baima_thangka: {
    id: 'dlg_baima_thangka',
    title: '白玛',
    lines: [
      '白玛接过唐卡，捻动念珠的手停了下来。',
      '"你画完了。"',
      '他不再用隐喻说话，语气前所未有的直白。',
      '"这五种颜色，各有所属。你选对了。"',
      '"度母的左眼……"他微微一顿，"你看到了画师的心。"',
      '"这就是唐卡。不是画佛，是画人。"',
      '白玛将唐卡还给你，重新捻动念珠。',
    ],
  },
  dlg_thangka_already_given: {
    id: 'dlg_thangka_already_given',
    title: '',
    lines: [
      '他已经收下了你的唐卡。',
      '不必再给他看一次了。',
    ],
  },

  // ===== 仁青 —— 轮次对话（占位文案） =====
  dlg_renqing_stage1: {
    id: 'dlg_renqing_stage1',
    title: '仁青',
    lines: [
      '一位穿着藏青色商务夹克的中年男人站在广场边，手里拿着文件夹。',
      '「你好，我是仁青，从成都来的。我们公司在做一个文旅项目……你知道这个村子的故事吗？」',
    ],
  },
  dlg_renqing_stage2: {
    id: 'dlg_renqing_stage2',
    title: '仁青',
    lines: [
      '仁青翻开文件夹，里面是几张打印的卫星地图和一份项目策划书。',
      '「这里风景很好，但缺一点……包装。我们可以把村子打造成一个旅游目的地。」',
    ],
  },
  dlg_renqing_stage3: {
    id: 'dlg_renqing_stage3',
    title: '仁青',
    lines: [
      '仁青收起文件夹，换了一副更随意的表情。',
      '「对了，听说这个村子里有人画唐卡？那种老派的……矿物颜料的那种？」',
      '他的目光在广场上扫了一圈，似乎在找什么人。「你见过吗？」',
    ],
  },

  // ===== 仁青 —— 碎片照片 =====
  dlg_renqing_photo_give: {
    id: 'dlg_renqing_photo_give',
    title: '仁青',
    image: '/images/tangka_photo_hand_placeholder.png',
    lines: [
      '仁青从文件夹里抽出一张照片，递了过来。',
      '「这是我在村里拍到的——一尊度母的手势特写。你看这个角度，光线刚好打在指尖上。」',
      '「我不太懂这些，但拍的时候总觉得……这手势像是在说什么。」',
      '（唐卡照片碎片·度母手势已收入记忆画布）',
    ],
  },
  dlg_renqing_photo_compare: {
    id: 'dlg_renqing_photo_compare',
    title: '仁青',
    image: '/images/tangka_photo_mountain_placeholder.png',
    lines: [
      '仁青从文件夹里又抽出一张照片。',
      '「对了，我还拍了一张雪山的。你看这个角度——」',
      '他把照片递给你，上面是村子背后的雪山，晨光刚好照亮了山脊。',
      '「我觉得这座山很特别。说不上来为什么。」',
      '（唐卡照片碎片·背景山形已收入记忆画布）',
    ],
  },

  // ===== 记忆画布 —— 碎片解读 =====
  dlg_memory_fragment_1: {
    id: 'dlg_memory_fragment_1',
    title: '记忆画布·度母手势',
    image: '/images/tangka_photo_hand_placeholder.png',
    lines: [
      '【度母手势】',
      '拇指与中指轻捻，其余三指微展——这是施愿印（Varada Mudra）。',
      '度母以右手结此印，垂向膝侧，掌心朝外。',
      '在唐卡传统中，这一手势象征"给予"与"满足"——给予众生所愿，满足一切祈求。',
    ],
  },
  dlg_memory_fragment_2: {
    id: 'dlg_memory_fragment_2',
    title: '记忆画布·背景山形',
    image: '/images/tangka_photo_mountain_placeholder.png',
    lines: [
      '【背景山形】',
      '唐卡背景中的山脉轮廓，与窗外雪山的剪影惊人地吻合。',
      '画师并非凭空想象——他将眼前的山，一笔一画搬进了唐卡。',
      '山的比例、雪线的位置、山脊的起伏……每一个细节都与实景对应。',
    ],
  },
  dlg_memory_fragment_3: {
    id: 'dlg_memory_fragment_3',
    title: '记忆画布·度母左眼',
    image: '/images/tangka_photo_eye_placeholder.png',
    lines: [
      '【度母左眼】',
      '你将目光聚焦在度母的左眼上。',
      '与其他部分工整的笔触不同，左眼的线条格外细腻。',
      '瞳孔深处似有一层极薄的罩染，像是画师反复涂抹了无数次。',
      '那不是技术——那是执念。画师把最多的心力留在了这只眼睛里。',
    ],
  },
  dlg_memory_fragment_4: {
    id: 'dlg_memory_fragment_4',
    title: '记忆画布·角落藏文',
    image: '/images/tangka_photo_script_placeholder.png',
    lines: [
      '【角落藏文】',
      '唐卡右下角有一行细小的藏文，笔画工整但墨色较淡。',
      '白玛曾辨认过——「嗡 达咧 度达咧 度咧 梭哈」。',
      '这是绿度母的心咒。画师将它藏在不起眼的角落，仿佛一个只有自己能听见的祈祷。',
    ],
  },
  dlg_memory_fragment_5: {
    id: 'dlg_memory_fragment_5',
    title: '记忆画布·空白',
    lines: [
      '【画面的空白】',
      '你将五块碎片全部拼合——唐卡的完整面貌终于呈现。',
      '但在所有色彩与线条之外，画面中央有一片留白。',
      '那不是未完成，那是刻意留下的。',
      '画师用尽一生绘制这尊度母，却留下了一片空白。',
      '也许他画的不是佛。他画的是自己。',
    ],
  },
  dlg_memory_canvas_hint_area4: {
    id: 'dlg_memory_canvas_hint_area4',
    title: '记忆画布',
    lines: [
      '唐卡右下角有一行细小的藏文，笔画工整但墨色较淡。',
      '你不认识藏文，读不懂上面写的是什么。',
      '也许需要找人帮忙辨认。',
    ],
  },

  // ===== 白玛辨认藏文 =====
  dlg_baima_identify_script: {
    id: 'dlg_baima_identify_script',
    title: '白玛',
    lines: [
      '白玛接过照片，凑近端详那行小字。',
      '「嗡 达咧 度达咧 度咧 梭哈——这是绿度母的心咒。」',
      '他捻动念珠，声音放得很低。',
      '「画师把这咒语写在最不起眼的角落，像是怕人看见，又怕人看不见。」',
      '「度母的咒语是祈愿，也是告别。画师画完这一笔，也许就再也没有拿起过画笔。」',
      '（碎片四·角落藏文已解锁）',
    ],
  },

  // ===== 记忆画布 area5 提示 =====
  dlg_memory_canvas_hint_area5: {
    id: 'dlg_memory_canvas_hint_area5',
    title: '记忆画布',
    lines: [
      '画面中央似乎有一片空白区域。',
      '但在其他碎片都解读完毕之前，你无法看清这里隐藏了什么。',
      '解锁其他所有的碎片来揭示最后的秘密。',
    ],
  },

  // ===== 煨桑仪式 =====
  dlg_song_bai_found: {
    id: 'dlg_song_bai_found',
    title: '',
    lines: [
      '经堂外墙角边，一丛松柏贴着石墙生长，枝上挂着细小的褐色球果。',
      '这是煨桑用的——白玛说过，松柏先入炉，用它的烟净身净心。',
      '（松柏已收入行囊）',
    ],
  },
  dlg_du_song_found: {
    id: 'dlg_du_song_found',
    title: '',
    lines: [
      '旦增院子旁的山坡边，一株杜松从碎石缝里探出来，针叶带着淡淡的松脂香。',
      '杜松是煨桑仪式中祈福用的——烟往上走，祈福的话也跟着上去。',
      '（杜松已收入行囊）',
    ],
  },
  dlg_ye_cao_found: {
    id: 'dlg_ye_cao_found',
    title: '',
    lines: [
      '煨桑台边散落着几丛干枯的高原野草，看起来和松柏、杜松有些相似。',
      '但气味不同——没有松脂的清香，反而带着一股淡淡的涩味。',
      '（高原野草已收入行囊）',
    ],
  },
  dlg_song_bai_collected: {
    id: 'dlg_song_bai_collected',
    title: '',
    lines: [
      '松柏枝还在那里，贴墙立着，球果在风中轻轻摇晃。',
      '你已经取下了一些，够了。',
    ],
  },
  dlg_du_song_collected: {
    id: 'dlg_du_song_collected',
    title: '',
    lines: [
      '杜松还在山坡边，针叶上凝着露珠。',
      '你已经取过一枝了。',
    ],
  },
  dlg_ye_cao_collected: {
    id: 'dlg_ye_cao_collected',
    title: '',
    lines: [
      '高原野草还在台边随风摆动。',
      '你已经采了一小捆，不必再取了。',
    ],
  },
  dlg_sang_stove_intro: {
    id: 'dlg_sang_stove_intro',
    title: '煨桑炉',
    lines: [
      '一座石砌的煨桑炉立在台中央，炉壁被经年累月的烟火熏得漆黑。',
      '炉边散落着几枝干枯的松柏和杜松——村里人煨桑时常用的两种植物。',
      '白玛说过，煨桑是人与天地沟通的方式。烟往上走，话也跟着上去。',
    ],
  },
  dlg_baima_sang_order: {
    id: 'dlg_baima_sang_order',
    title: '白玛',
    lines: [
      '白玛停下捻动的念珠，望向远方的煨桑台。',
      '「煨桑的时候，先放什么，后放什么，是有讲究的。」',
      '「松柏先入——烟净其身，也净其心。杜松后入——烟往上走，祈福的话才能跟着上去。」',
      '「先净后请。顺序错了，烟不是那个烟，话也不是那个话了。」',
    ],
  },
  dlg_baima_sang_chant: {
    id: 'dlg_baima_sang_chant',
    title: '白玛',
    lines: [
      '白玛捻动念珠，低声念了一句——',
      '「嗡啊吽，班扎咕噜贝玛悉地吽。」',
      '「这是莲师心咒。煨桑的时候念这个，烟会把你的心愿带上去。」',
      '他顿了顿，补充道：「记住这句话。煨桑的时候用得上。」',
    ],
  },
  dlg_sang_wrong_plant: {
    id: 'dlg_sang_wrong_plant',
    title: '',
    lines: [
      '烟的味道不对——浓烈呛人，笔直往下降。',
      '白玛站在不远处，微微皱了皱眉，但没有说话。',
      '你意识到，植物放错了。',
    ],
  },
  dlg_sang_wrong_order: {
    id: 'dlg_sang_wrong_order',
    title: '',
    lines: [
      '你按照自己的理解投放植物，但烟雾散乱，四处飘荡。',
      '白玛轻轻摇头：「先请后净，顺序有误。」',
      '烟雾不是往上走，而是在炉口徘徊——那不是祈福的烟。',
    ],
  },
  dlg_sang_wrong_chant: {
    id: 'dlg_sang_wrong_chant',
    title: '',
    lines: [
      '你念出诵词，白玛停了下来。',
      '「不是这句。」他走近煨桑炉，捻动念珠。',
      '「煨桑时念的不是随便什么经文——每座山有每座山的咒。」',
      '「莲师心咒。嗡啊吽，班扎咕噜贝玛悉地吽。记住了吗？」',
    ],
  },
  dlg_sang_success: {
    id: 'dlg_sang_success',
    title: '',
    lines: [
      '烟雾笔直升起，在煨桑台上空聚成一道细细的白柱。',
      '风渐渐停了。整个村子似乎都安静了下来。',
      '卓玛从广场走来，站在煨桑台边，望着上升的烟。',
      '格桑放下画笔，从角落里探出头。',
      '白玛捻动念珠，嘴唇微动——他在诵经。',
      '最后是旦增。他拄着拐杖，一步一步从院子里走出来。',
      '这是他第一次走出那个院子。',
      '烟雾散尽。煨桑台上只剩下灰烬和沉默。',
      '旦增轻声说：「你做到了。」',
    ],
  },
  dlg_sang_timing_easter_egg: {
    id: 'dlg_sang_timing_easter_egg',
    title: '',
    lines: [
      '你在这个村子里停留了很久。久到山风都变了几轮方向，久到日头从东边山头转到西边山头。',
      '煨桑的烟升起来的时候，你觉得这一缕烟，和刚来村口那阵子闻到的，已经不是同一种味道了。',
    ],
  },

  // ===== 经堂内部 =====
  dlg_empty_frame: {
    id: 'dlg_empty_frame',
    title: '空画框',
    lines: [
      '正面墙上，一副空画框挂在原本供奉唐卡的位置。木框边缘磨得发亮，是被无数次合掌触碰留下的痕迹。',
      '你翻过画框，背面刻着一行细小的字——藏文谚语，手写的痕迹很深，像是一刀一刀凿上去的：',
      '「画唐卡的人，笔尖走的不是颜料，是自己的心。」',
      '旦增说过类似的话。他说他年轻时画雪山，「每一笔都像在描自己的心」。',
    ],
  },
  dlg_faded_mural: {
    id: 'dlg_faded_mural',
    title: '褪色壁画',
    lines: [
      '四周墙壁残留着褪色的壁画。藏青的底色上，莲花和云纹的轮廓依稀可辨。',
      '你在角落发现一块被刻意涂抹过的区域——不是自然褪色，是有人用湿布用力擦过的痕迹。',
      '凑近了看，涂抹层下面透出一个轮廓：一个蹲着的少年，面前支着一块画板，手里握着笔。',
      '笔尖的方向，正对着画框的位置——那是画唐卡的姿势。',
    ],
  },
  dlg_torn_cloth: {
    id: 'dlg_torn_cloth',
    title: '碎布',
    lines: [
      '地上翻倒着一盏铜质酥油灯，灯油早已干涸，凝固成一圈深黄色的蜡痕。',
      '灯旁的地砖缝隙里夹着一小片碎布——深蓝紫色，质地细密，像是从一整块布上扯下来的。',
      '你把它翻过来，颜色和唐卡复刻品的背衬一模一样。',
    ],
  },

  // ─── 经堂内部·戴夫式反馈（三次路过旁白） ───
  dlg_temple_visit_1: {
    id: 'dlg_temple_visit_1',
    title: '',
    lines: [
      { text: '你推开经堂的门，里面有人。', isKeyLine: true },
      '格桑站在画框前，背着手，身子微微前倾，像一个在辨认字迹的人。',
      '你停在门口，没有出声。他也没有回头。',
      '过了很久——久到你以为他忘了时间——他放下手，用指尖在画框边缘轻轻叩了两下。',
      '然后转身，和你擦肩而过，走出了经堂。',
    ],
  },
  dlg_temple_visit_2: {
    id: 'dlg_temple_visit_2',
    title: '',
    lines: [
      { text: '经堂里点着一盏酥油灯。灯光很弱，只够照亮画框前一小片空地。', isKeyLine: true },
      '白玛跪在画前，双手合十。她念了一段经文——声音很轻，像风吹过经幡时发出的细响。',
      '念完后，她伏下身，额头触地，停了三息。',
      '然后站起来，把酥油灯往画框的方向推近了一寸，转身离开了。',
    ],
  },
  dlg_temple_visit_3: {
    id: 'dlg_temple_visit_3',
    title: '',
    lines: [
      { text: '旦增站在画框前。这是你第一次在这间经堂里看见他。', isKeyLine: true },
      '他背对着门，背影把画框遮住了一大半。你看不见他的表情。',
      '他的右手抬在半空，指尖离画布大约一拳——没有碰到，就那么悬着。',
      '你听见他吸了一口气，像是要说什么，但最终没有开口。',
      '他放下手，没有回头，继续站在画前，像一尊被遗忘在这里的雕像。',
    ],
  },
// ===== 格桑 —— 第一章主线剧情对话（来源：第一章对话设计详细版 v1.3） =====

  // ===== 场景一：玛尼堆前的沉默 =====
//
// 【场景特殊机制】
// 本场景无NPC。所有 lines 均为「玩家内心OS」，title 统一为 '内心OS'
// 玩家在场景中自由点击可交互元素，每个元素触发独立的内心OS节点
// 不存在 round 递进结构，所有节点为自包含的观察节点
// 唯一的分支选择出现在「石缝·发现纸角」节点（拾取/暂不动）
//
// 【可交互元素清单】
//   ① 玛尼堆整体 → dlg_ch1_s1_manistone
//   ③ 刻字石块（近看） → dlg_ch1_s1_stonewords
//   ④ 村子全貌（炊烟/牛叫） → dlg_ch1_s1_village
//   ⑥ 北边山坡/老房子 → dlg_ch1_s1_north
//   ⑧ 远处雪峰 → dlg_ch1_s1_peak
//
// 【触发逻辑】
//   - 玩家点击地图【玛尼堆】→ 进入场景 → 自动触发 dlg_ch1_s1_entry
//   - 场景内各元素独立可点击，无顺序约束（但石缝需先点击玛尼堆才显示）
//   - 退出按钮 → 触发 dlg_ch1_s1_exit → 返回地图


  // ===== 入场：自动触发 =====

  dlg_ch1_s1_entry: {
    id: 'dlg_ch1_s1_entry',
    title: '内心OS',
    trigger: 'auto',          // 场景加载后自动触发，非玩家点击
    lines: [
      '（画面：清晨。山口处，远处有雪峰。玩家从山口小路走入村子。）',
      '（音效持续：风声、低沉的经幡布料声、远处奶牛叫）',
      { text: '……这就是祖父笔记里提到的措钦村。', isKeyLine: true },
      '村口堆着很多刻了字的石头，看不懂，但能感觉到它们在这里很久了。',
    ],
    // 无 nextDialogueId —— 触发完毕后，场景内各元素变为可点击状态
    // 引导提示（引擎层）：「点击周围的事物，仔细看看这个村子。」
  },

  // ===== 可交互元素①：玛尼堆整体 =====
  // 点击玛尼堆 → 近看描述 → 解锁石缝为可点击

  dlg_ch1_s1_manistone: {
    id: 'dlg_ch1_s1_manistone',
    title: '内心OS',
    trigger: 'click_manistone',  // 玩家点击玛尼堆
    lines: [
      '石块层层垒起，比我想象的要高。',
      '每块石头上面都刻着字——笔画很深，像是用凿子一锤一锤敲出来的。',
      '有些字已经磨损了，边缘被风磨圆了；有些还很清晰，像刚刻的。',
      '……祖父笔记里写过这些石头。他说这里的人每许一个愿，就往上面加一块。',
      { text: '「措钦村的玛尼堆，每一块石头都是一个人一辈子的心愿。」——他是这么写的。', isKeyLine: true },
    ],

    unlockAfter: ['dlg_ch1_s1_stonewords', 'dlg_ch1_s1_crevice'],
  },


  // ===== 可交互元素②：石缝·纸角 =====
  // 前置：必须先触发 dlg_ch1_s1_manistone
  // 来源：第一章对话设计详细版 v1.3 - 场景一·石缝元素

  dlg_ch1_s1_crevice: {
    id: 'dlg_ch1_s1_crevice',
    title: '内心OS',
    trigger: 'click_crevice',
    prerequisite: 'dlg_ch1_s1_manistone',
    lines: [
      '我弯下腰，在两块石头的缝隙里看到了一样东西。',
      '——纸。',
      '不是风吹进来的垃圾。纸面泛黄，边缘被虫蛀过。上面有字，虽然被石头的阴影遮住了大半，但笔画很深。',
      '……藏文？和石头上的字是同一种。',
      { text: '祖父的笔记里提过——「措钦村有些东西是散落在村子各处的，得自己去找。」会是这个吗？', isKeyLine: true },
    ],
    playerOptions: [
      '伸手去够那张纸。（尝试取出）',
      '先不急。回头再说。',
    ],
    // 选项A → 触发 dlg_ch1_s1_crevice_pick
    // 选项B → 关闭对话，石缝仍可再次点击（回到 dlg_ch1_s1_crevice）
    nextDialogueId: 'dlg_ch1_s1_crevice_pick',
  },

  dlg_ch1_s1_crevice_pick: {
    id: 'dlg_ch1_s1_crevice_pick',
    title: '内心OS',
    lines: [
      '我小心地把手指伸进石缝，捏住纸角，一点点往外抽。',
      '纸比我想象的薄——像被翻过很多次。',
      '展开。是一页手抄的经文——不对，不是经文。是颜料的配方。',
      '笔迹很眼熟。……是祖父的字。',
      '「佛青：取山石之魂，研至无声，水飞九遍，方得苍穹之色。」',
      '下面还有几行被水渍晕开的字，看不清了。',
      { text: '他来过这里。他真的来过这里。', isKeyLine: true },
      '（残卷第一页已收入道具栏，点击右上角 📜 查看）',
    ],
    // 系统：残卷第一页收入道具栏
    // 链尾后石缝变为「已取过」状态 → dlg_ch1_s1_crevice_done
  },

  dlg_ch1_s1_crevice_done: {
    id: 'dlg_ch1_s1_crevice_done',
    title: '内心OS',
    lines: [
      '石缝已经空了。',
      '那张纸现在在我手里——祖父的字，从一道石缝里，隔了这么多年，递到了我手上。',
    ],
  },

  // ===== 可交互元素③：村民甲路过 =====
  // 来源：第一章对话设计详细版 v1.3 - 铺垫村子封闭氛围

  dlg_ch1_s1_villager_pass: {
    id: 'dlg_ch1_s1_villager_pass',
    title: '内心OS',
    trigger: 'click_villager_pass',  // 独立的可交互元素：路过的村民
    lines: [
      '一个老人从村口小路经过。肩上扛着一捆干柴，走得很慢。',
      '他看到我了。停下。看了一眼。然后转开目光，继续走。',
      '没有打招呼。没有点头。就像我是一块多出来的石头。',
      { text: '……这个村子对外人，好像不太习惯。', isKeyLine: true },
    ],
    // 为后续「全村人都在保护格桑，对外来者保持沉默」铺垫
  },


  // ===== 可交互元素④：刻字石块（近看） =====
  // 前置：必须先触发 dlg_ch1_s1_manistone

  dlg_ch1_s1_stonewords: {
    id: 'dlg_ch1_s1_stonewords',
    title: '内心OS',
    trigger: 'click_stonewords',
    prerequisite: 'dlg_ch1_s1_manistone',
    lines: [
      '我蹲下来，仔细看其中一块石头上的字。',
      '……看不懂。不是汉字，也不是我能认出的任何文字。',
      '笔画弯曲，有些像是在画什么——一个字母？一个图案？',
      '石头表面被风打磨得很光滑，但字痕很深。刻这些字的人，手一定很稳。',
      '祖父笔记里画过这种字。他说是藏文——六字真言，每个字一块石头，刻满了就堆上去。',
      '……我不信佛，但站在这些石头面前，总觉得它们在看着我。',
    ],
  },

  // ===== 可交互元素④：村子全貌 =====

  dlg_ch1_s1_village: {
    id: 'dlg_ch1_s1_village',
    title: '内心OS',
    trigger: 'click_village',
    lines: [
      '村子里很安静。',
      '几缕炊烟从几间石屋里升起来，薄薄的，被风一吹就散了。',
      '远处传来几声牛叫。除此以外——什么都没有。',
      '一条小路从村口通到深处，两边是石头垒的矮墙。墙缝里长着草。',
      { text: '……整个村子，像是被山和雪围住了。安静得不太真实。', isKeyLine: true },
    ],
  },


  // ===== 可交互元素⑥：北边山坡/老房子 =====

  dlg_ch1_s1_north: {
    id: 'dlg_ch1_s1_north',
    title: '内心OS',
    trigger: 'click_north',
    lines: [
      '北边山坡上有一座老房子，比别的房子都大。',
      '石墙很厚，木头门框上有褪色的彩绘——看不清画的是什么了。',
      '像是……寺院？或者某种经堂？',
      '旁边还有一个小石台，长满了草，看不出做什么用的。',
      { text: '……祖父的笔记上画过这座房子。他说——', isKeyLine: true },
      { text: '「有一天，你要替我回去看看。」', isKeyLine: true },
    ],
    // 为场景三旦增的"你走路的样子，和他一样"铺下情感基础
  },


  // ===== 可交互元素⑧：远处雪峰 =====

  dlg_ch1_s1_peak: {
    id: 'dlg_ch1_s1_peak',
    title: '内心OS',
    trigger: 'click_peak',
    lines: [
      '远处是雪峰。',
      '山顶的白和天上的云混在一起，分不清哪是雪哪是云。',
      '风从山口吹进来，带着经幡的布料声和一种干燥的冷。',
      '……祖父笔记里写过这里的风。他写：',
      '「措钦村的风，是从山顶吹下来的。它经过了所有的地方——经堂、煨桑台、玛尼堆。它什么都记得。」',
      '我不确定他说的「记得」是什么意思。',
    ],
  },


  // -- 场景二：格桑的第一次搭话 --
  dlg_gesang_scene2_opening: {
    id: 'dlg_gesang_scene2_opening',
    title: '格桑',
    lines: [
      '格桑从村口小路走过来，肩上背着一捆柴，看见你，停下来，歪着头打量了一会儿。',
      '手里还拿着半根牦牛酥油饼，边嚼边打量。',
      { text: '"……你是哪来的？背包不像本地人。"', isKeyLine: true },
    ],
    playerOptions: [
      '我来这里转转，随便看看。',
      '我是来写生的，听说这里风景不错。',
      '我找一个人，他可能住在这附近。',
      '我路过这里，休息一下。',
    ],
    nextDialogueId: 'dlg_gesang_scene2_warn',
  },
  dlg_gesang_scene2_warn: {
    id: 'dlg_gesang_scene2_warn',
    title: '格桑',
    lines: [
      '格桑把酥油饼一口塞进嘴里，嚼得两腮鼓鼓的，含糊地说：',
      { text: '"……你如果是来这儿写生、拍照、问东问西的，那你找错地方了。这儿没什么好画的，也没什么好问的。"', isKeyLine: true },
      '（停顿 3 秒，把酥油饼咽下去）',
      '"——不过你要是来找人的，或者找东西的，那我劝你一句。"',
      '（看着你）',
      { text: '"村东头那个院子，别去。"', isKeyLine: true },
    ],
    playerOptions: [
      '为什么不能去？那里面有什么？',
      '哦，好的，我不会去的。',
      '你为什么这么在意那个院子？',
      '我只是来写生的，对院子没兴趣。',
    ],
    nextDialogueId: 'dlg_gesang_scene2_guide',
  },
  dlg_gesang_scene2_guide: {
    id: 'dlg_gesang_scene2_guide',
    title: '格桑',
    lines: [
      '格桑把柴往肩上颠了颠，看着你。',
      { text: '"那个老人叫旦增——是我阿古。"', isKeyLine: true },
      '（停顿一下，移开目光）',
      '"他不喜欢外人，你别去招他。"',
      '（忽然低声）……算了，我说什么你都别当真。',
      '（恢复少年神情，往村口一指）',
      { text: '"你要是想走走，可以去村口那边的玛尼堆看看，那儿有一些老石头，上面刻了字。村里老一辈的人说，那些字念了有福气。"', isKeyLine: true },
      '（往回走两步又回头）',
      { text: '"——对了——经堂那边，你也别过去。村里人不去的。"', isKeyLine: true },
    ],
    playerOptions: [
      '那个老人真的有这么可怕吗？',
      '玛尼堆？那是什么地方？',
      '你为什么对这些事这么清楚？',
      '谢谢你告诉我这些。',
    ],
    // 链尾：关闭时设 gesangScene2Completed
  },

  // ===== 场景三：旦增家院墙外（首次进入院子自动触发的纯过场） =====
  dlg_danzeng_scene3_look: {
    id: 'dlg_danzeng_scene3_look',
    title: '旦增家院墙外',
    lines: [
      '院墙内，一头黑色藏獒忽然站起来，铜铃般的眼睛死死盯着你。',
      '念经声停了。',
      '旦增从地上缓缓抬起头，浑浊的目光落在你身上——像是在辨认什么。',
      { text: '「你走路的样子。」', isKeyLine: true },
      { text: '「——你走路的样子，和他一样。」', isKeyLine: true },
      '旦增说完，又低下头，念经声重新响起。',
      '藏獒也慢慢趴了回去。院墙外只剩下风声。',
    ],
    // 无 playerOptions，无 nextDialogueId —— 纯过场，点击关闭
  },

  // -- 场景四：格桑的补话（需先触发场景三——旦增家院墙外） --
  dlg_gesang_scene4_opening: {
    id: 'dlg_gesang_scene4_opening',
    title: '格桑',
    lines: [
      '格桑看见你从村东头方向走来，愣住，把酥油饼往口袋里一塞，小跑过来。',
      { text: '"你——你去过那个院子了？"', isKeyLine: true },
    ],
    playerOptions: [
      '对，我刚才路过，看见一个老人在画画。',
      '是的，他让我进来找答案。',
      '我只是站在门口看了一眼，没有进去。',
      '你怎么知道我去了？',
    ],
    nextDialogueId: 'dlg_gesang_scene4_foreshadow',
  },
  dlg_gesang_scene4_foreshadow: {
    id: 'dlg_gesang_scene4_foreshadow',
    title: '格桑',
    lines: [
      '（格桑突然把声音压得很低）',
      { text: '"那个老人——我阿古——他十二年没跟外人说过一句话。"', isKeyLine: true },
      '（咽了咽口水）',
      { text: '"上一次是姑妈硬去的。姑妈跟他吵了一架，他才开口说了一句话。"', isKeyLine: true },
      '（看着你）',
      '"——你别说你祖父的名字。他不想听。"',
      '（沉默片刻）',
      { text: '"……我那时候才两岁。姑妈说他最后一次来，是二十年前。整整四十九天，他一步都没离开过。陪着那个奶奶走完最后一程。"', isKeyLine: true },
      '（抬头认真看着你）',
      { text: '"你祖父留下的那本笔记——你带来了吗？"', isKeyLine: true },
    ],
    playerOptions: [
      '笔记？什么笔记？我祖父留下了什么？',
      '我带来了，但我不知道它有什么用。',
      '那个老人真的十二年没说话吗？',
      '姑妈是谁？她现在在哪里？',
    ],
    nextDialogueId: 'dlg_gesang_scene4_close',
  },
  dlg_gesang_scene4_close: {
    id: 'dlg_gesang_scene4_close',
    title: '格桑',
    lines: [
      '（格桑站起来，拍拍裤子上的土）',
      { text: '"姑妈说……你阿爷那本笔记里，有没写完的话。"', isKeyLine: true },
      '（停顿，有点不好意思）',
      { text: '"但她说……让我告诉你，让你去问她。她说的事，她不让我说。"', isKeyLine: true },
      '（转身走了两步，又回头）',
      { text: '"你去找到我姑妈卓玛——她应该在村子中央广场那边。"', isKeyLine: true },
    ],
    playerOptions: [
      '卓玛姑妈现在在哪里？我该怎么找她？',
      '那本笔记里到底写了什么？',
      '你为什么愿意告诉我这些？',
      '那我接下来应该去找卓玛姑妈吗？',
    ],
    // 链尾：关闭时设 gesangScene4Completed
  },

  // ===== 第二章主线剧情对话（来源：第二章对话设计详细版 v1.1） =====



  // ===== 场景A：卓玛办公室·第一次谈话 =====

  dlg_zhuoma_r1_opening: {
    id: 'dlg_zhuoma_r1_opening',
    title: '卓玛',
    lines: [
      '你推门进去。卓玛没有抬头，继续翻文件。',
      '（停顿约3秒。）',
      { text: '「你就是那个人的孙子。」', isKeyLine: true },
      '卓玛终于抬头，看玩家一眼，再低下去继续看文件：',
      '「你祖父的字我认得——他留下的那本笔记，格桑说你带来了。」',
      '卓玛停顿2秒，合上手里的文件：',
      { text: '「坐吧。站在门口显得你不自在，也显得我难做。」', isKeyLine: true },
    ],
    playerOptions: [
      '你认识我祖父？',
      '格桑告诉你我来了？',
      '……我听格桑说，你是村长。',
      '（沉默，走进去坐下）',
    ],
    nextDialogueId: 'dlg_zhuoma_r2_topic',
  },

  dlg_zhuoma_r2_topic: {
    id: 'dlg_zhuoma_r2_topic',
    title: '卓玛',
    lines: [
      { text: '「你祖父来这里，不止是研究。你应该知道。」', isKeyLine: true },
      '卓玛停顿，看一眼玩家手里或包里：',
      '「笔记带了？好。你带着它，来这里，不是来旅游的。」',
      '卓玛把杯子推到一边，双手叠放在桌上：',
      { text: '「你祖父留在笔记里的东西——你看完了多少？」', isKeyLine: true },
    ],
    playerOptions: [
      '看了一些，看到了关于这里的描述。',
      '我还没认真看。',
      '你为什么要问笔记的事？',
    ],
    nextDialogueId: 'dlg_zhuoma_r3_residue',
  },

  // 【伏笔③：残页叙事动机正式埋下】
  dlg_zhuoma_r3_residue: {
    id: 'dlg_zhuoma_r3_residue',
    title: '卓玛',
    lines: [
      '「笔记里应该提到一些残页——记载了唐卡颜料的古法，我爸当年制颜料用的。」',
      '卓玛停顿，很轻地说：',
      { text: '「我没见过那些残页。你祖父说它们应该还在村子里，但他最后一次来的时候……有很多东西都乱了。」', isKeyLine: true },
      '卓玛停顿3秒，换了话题的口气：',
      '「也可能还在，也可能早就不见了。你要是能找到，就找找。」',
    ],
    playerOptions: [
      '你爸……他知道我来了吗？',
      '那些残页在村子里的哪儿？',
      '格桑说他十二年没跟外人说过话。',
    ],
    nextDialogueId: 'dlg_zhuoma_r4_close',
  },

  dlg_zhuoma_r4_close: {
    id: 'dlg_zhuoma_r4_close',
    title: '卓玛',
    lines: [
      '卓玛站起来拿回文件，像是要继续工作：',
      { text: '「好了。你去吧——去找找白玛，她在村子西北那边，石头堆旁边。」', isKeyLine: true },
      '卓玛看玩家：',
      '「她念经的。你去听一听。」',
      '卓玛停顿，补一句：',
      '「还有一个人，仁青。你遇到他了吗？他不是本地人，来这里有一段时间了，说是做民族文化研究的。」',
      '卓玛轻描淡写地：',
      '「你们可以聊聊。他知道一些……关于那幅画的事。」',
      '卓玛转身：',
      { text: '「如果你想见我爸——你得让他觉得，你不是来挖故事的。你祖父当年用了三个月。」', isKeyLine: true },
    ],
    // 链尾：关闭时设 zhuomaSceneACompleted
  },


  // ===== 场景B：旦增家院外·白色碎布 =====
  //
  // 【旦增特殊规则 danzeng_rule】
  // 旦增是全章唯一有真正主线分叉的NPC。
  // 每轮对话中，若玩家提及「唐卡」「画」「笔记」「十二年封闭」等禁忌词，
  // AI应终止对话推进，切换到 dlg_danzeng_scene_end 而非继续nextDialogueId。
  // 全程不碰禁忌 → 到达dlg_danzeng_r3_final → 获得「明天再来」。
  // 碰一次禁忌 → 场景终止，不获得「明天再来」。

  dlg_danzeng_r1_open: {
    id: 'dlg_danzeng_r1_open',
    title: '旦增',
    lines: [
      '藏獒站起来，走到旦增身边，蹲下。',
      '旦增没有抬头，继续做手里的事。',
      '旦增没有转身，声音很低：',
      { text: '「你在这里站着，是有话要问。」', isKeyLine: true },
      '（停顿约4秒。）',
      { text: '「问吧。」', isKeyLine: true },
    ],
    playerOptions: [
      '那幅画……我想多了解一些。（禁忌·提唐卡）',
      '那块白色的布……是什么？（安全·问氆氇）',
      '……我只是来看看。（安全·闲聊）',
      '（沉默）（安全）',
    ],
    nextDialogueId: 'dlg_danzeng_r2',  // 倾听线默认推进
    // 【danzeng_rule】若玩家选择「提唐卡」或自由输入含禁忌词 → AI终止，跳转 dlg_danzeng_scene_end
  },

  dlg_danzeng_r2: {
    id: 'dlg_danzeng_r2',
    title: '旦增',
    lines: [
      '旦增依然没有抬头，但手里的动作停了一下。',
      '旦增声音比第一轮稍清晰一点：',
      { text: '「你跟卓玛说了什么。」', isKeyLine: true },
    ],
    playerOptions: [
      '她跟我说了残页的事。（安全·转述卓玛）',
      '那幅画到底在哪？（禁忌·再次提唐卡）',
      '没说什么特别的。（安全·模糊回答）',
      '你为什么十二年不说话？（危险·触及封闭原因）',
    ],
    nextDialogueId: 'dlg_danzeng_r3_final',  // 倾听线默认推进
    // 【danzeng_rule】若玩家选择「提唐卡」或「触及封闭原因」 → AI终止，跳转 dlg_danzeng_scene_end
  },

  dlg_danzeng_r3_final: {
    id: 'dlg_danzeng_r3_final',
    title: '旦增',
    lines: [
      '旦增第一次抬了一下头，但依然没有正对玩家。',
      { text: '「你祖父当年，也是这样。」', isKeyLine: true },
      '（停顿3秒。）',
      { text: '「他懂得先听，再问。」', isKeyLine: true },
      '旦增停顿，重新低头：',
      { text: '「……你走吧。明天再来。」', isKeyLine: true },
    ],
    // 【系统提示·本章收束】：
    // 「旦增第一次主动对你说了不止一句话。」
    // 「他说：'你祖父当年也是这样。他懂得先听，再问。'」
    // 「然后他说：'你走吧。明天再来。'」
    // 「——'明天再来'意味着他愿意让你再来。你通过了他的测试。」
    playerOptions: [
      '什么是先听，再问？',
      '我祖父……他怎么听的？',
      '（沉默，退出）',
    ],
    // 链尾：关闭时设 danzengSceneBCompleted + gotMingTianZaiLai = true
  },

  // 旦增场景终止节点（追问线到达时使用）
  dlg_danzeng_scene_end: {
    id: 'dlg_danzeng_scene_end',
    title: '旦增',
    lines: [
      // AI根据禁忌轮次动态选择台词：
      // 第一轮碰禁忌：「你走吧。今天。」
      // 第二轮碰禁忌：「听，比问重要。……今天你就站到这里吧。」
      // 此处为通用收束，AI覆盖具体台词
      '旦增重新低头做事，不再回应。',
    ],
    // 链尾：关闭时设 danzengSceneBFailed（未通过测试，不获得「明天再来」）
    // 玩家可重新点击院门再次尝试场景B
  },


  // ===== 场景C：白玛的念经角落·初次相遇 =====

  dlg_baima_r1_open: {
    id: 'dlg_baima_r1_open',
    title: '白玛',
    lines: [
      '玩家走近岩石区域。白玛眼睛闭着，轻声念经（听不清内容，只有气息）。',
      '（停顿约5秒。）',
      '白玛眼睛没有睁开，声音很轻：',
      { text: '「……你来了。」', isKeyLine: true },
      '（停顿约3秒。）',
      '白玛这才睁开眼：',
      { text: '「坐。」', isKeyLine: true },
    ],
    playerOptions: [
      '你认识我？',
      '你是白玛？',
      '……你怎么知道我来了？',
      '（直接坐下）',
    ],
    nextDialogueId: 'dlg_baima_r1_grandfather',
  },

  dlg_baima_r1_grandfather: {
    id: 'dlg_baima_r1_grandfather',
    title: '白玛',
    lines: [
      { text: '「你祖父的孙子，来了。我一直等着这一天。」', isKeyLine: true },
      '白玛停顿，看着远处的山：',
      '「你祖父走的时候，说有一天，他家里的孩子会回来看看。」',
      '白玛很轻：',
      { text: '「我信他说的话。」', isKeyLine: true },
    ],
    playerOptions: [
      '你认识我祖父多久了？',
      '他跟你说过什么？',
      '……他已经不在了。',
    ],
    nextDialogueId: 'dlg_baima_r2_hall',
  },

  dlg_baima_r2_hall: {
    id: 'dlg_baima_r2_hall',
    title: '白玛',
    lines: [
      '白玛主动转话题，语气仍然轻缓：',
      '「你去过经堂门口了？」',
      '白玛不等玩家回答：',
      '「去过。你站在那里，草动了。」',
      { text: '「那六块石头，你看见了。」', isKeyLine: true },
    ],
    playerOptions: [
      '那六块石头是什么？',
      '那里的锁很旧了，已经十二年没开了？',
      '……我不认识那些字。',
    ],
    nextDialogueId: 'dlg_baima_r3_deep',
    // 【AI生成指引】无论玩家选哪个，白玛最终都会念出「唵嘛呢叭咪吽」六字真言正确顺序
    // 系统记录：六字真言正确顺序「唵→嘛→呢→叭→咪→吽」写入玩家笔记
  },

  dlg_baima_r3_deep: {
    id: 'dlg_baima_r3_deep',
    title: '白玛',
    lines: [
      '白玛停顿一会儿，看着玩家，像是在判断什么：',
      '「你想知道那幅画的事。」',
      '白玛不等回答：',
      { text: '「不是问句。」', isKeyLine: true },
      { text: '「那幅画，我哥哥画了四十九天。你祖父就坐在旁边，一笔一笔地看着。」', isKeyLine: true },
    ],
    playerOptions: [
      '那幅画是什么画？',
      '我祖父的笔记里记了这件事。',
      '为什么要画四十九天？',
    ],
    nextDialogueId: 'dlg_baima_r4_scripture',
    // 【AI生成指引】
    // 选A → 白玛提到《度母护法图》·白度母·「画里用的颜料……每一种都有来处。不只是矿石和草木，还有……她留下的东西。」
    // 选B → 白玛提到「他还记了经文」「你找找笔记里有没有一段——写的是颜料的颜色和来处的。」
    // 选C → 白玛提到「藏族规矩·七七四十九天」·「他要把她画进去」·「画师用心里的东西作画」
  },

  // 【触发条件：≥3轮对话，且至少一次触碰「颜料/笔记/度母」关键词】
  dlg_baima_r4_scripture: {
    id: 'dlg_baima_r4_scripture',
    title: '白玛',
    lines: [
      '白玛停顿一会儿，拨动念珠，闭上眼睛：',
      '「你坐一会儿。我念一段。」',
      '白玛念经：',
      '「……唵嘛呢叭咪吽……」',
      { text: '「……如夜空之色，取自山石之魂，经春之雨水、夏之烈日、秋之霜露，方得一二。」', isKeyLine: true },
      { text: '「此色不为饰美，只为映智……」', isKeyLine: true },
      '「……唵嘛呢叭咪吽……」',
      '白玛念完，睁开眼：',
      '「你祖父当年听这段，听了很多次。」',
      { text: '「他说，他记下来了。说有一天用得上。」', isKeyLine: true },
    ],
    // 【系统记录（双重）】：
    // - 「六字真言正确顺序：唵→嘛→呢→叭→咪→吽」（若尚未记录则补记）
    // - 「佛青制法经文：如夜空之色，取自山石之魂，经春之雨水、夏之烈日、秋之霜露，方得一二。此色不为饰美，只为映智」写入玩家笔记
    // 链尾：关闭时设 baimaSceneCCompleted
  },


  // ===== 场景D：仁青的主动接近·图像解读启动 =====

  dlg_renqing_r1_open: {
    id: 'dlg_renqing_r1_open',
    title: '仁青',
    lines: [
      '仁青走来，语速较快，手里的记事本合起来夹在腋下：',
      { text: '「你好你好——你是新来的那个，对吧？」', isKeyLine: true },
      '仁青不等玩家回答：',
      '「我是仁青，你叫什么？」',
      '仁青停顿1秒——比其他NPC短得多：',
      '「……你祖父，是沈默之吧？」',
      '仁青眼神变了一下：',
      '「你祖父我见过——差不多二十年前的事了，我那时候还小。」',
    ],
    playerOptions: [
      '你见过我祖父？',
      '你是谁？来这里做什么的？',
      '……你怎么知道我祖父叫什么？',
    ],
    nextDialogueId: 'dlg_renqing_r2_tangka',
  },

  dlg_renqing_r2_tangka: {
    id: 'dlg_renqing_r2_tangka',
    title: '仁青',
    lines: [
      { text: '「你现在也在找那幅画？——那幅《度母护法图》？」', isKeyLine: true },
      '仁青观察玩家反应：',
      '「……不，你还不一定知道那幅画。」',
      '仁青停顿，换了一种口气：',
      { text: '「那幅画不在这里了，你知道吗？」', isKeyLine: true },
    ],
    playerOptions: [
      '不在了？在哪里？',
      '那幅画……我祖父的笔记里提到了。',
      '……你为什么关心那幅画？',
    ],
    nextDialogueId: 'dlg_renqing_r3_photo',
    // 【AI生成指引】
    // 选A → 仁青：「成都。一个私人收藏家手里。那幅画怎么去的成都，我知道一部分，但不合适说。」
    // 选B → 仁青：「笔记？！他把全过程记下来了？！」→「那本笔记比你想象的重要。」
    // 选C → 仁青：「我在成都的展览上第一次看到那幅画——我当时就觉得不对。那幅画不应该在那里。」
  },

  dlg_renqing_r3_photo: {
    id: 'dlg_renqing_r3_photo',
    title: '仁青',
    lines: [
      '仁青从记事本内页夹着的一个信封里，取出一张照片，递给玩家：',
      '「我在成都的时候，拍了一些照片。」',
      { text: '「这是其中一张——只拍到了局部。度母的右手，持莲花的那个手势。」', isKeyLine: true },
      '仁青看着玩家接过照片：',
      '「你学艺术的，你看看——这个手势，有什么特别的？」',
    ],
    playerOptions: [
      '右手持莲——这是度母的标准手势？',
      '……这只有一部分，我看不出整幅画的样子。',
      '这画的质感——是矿物颜料？',
    ],
    nextDialogueId: 'dlg_renqing_r4_response',
    // 【系统触发：照片1/5·度母右手持莲 收入道具栏】
  },

  dlg_renqing_r4_response: {
    id: 'dlg_renqing_r4_response',
    title: '仁青',
    lines: [
      '「我一共拍了五张，但现在只有这一张在身上。」',
      { text: '「其他的在城里，我去取来。但你得让我看看你到底懂不懂唐卡——不然我觉得给你看也没用。」', isKeyLine: true },
      '仁青停顿，认真地看玩家：',
      { text: '「你想看完整的照片，你就跟这里的人多聊聊。等我回来，你能告诉我：那幅画的度母，最重要的颜色是什么，用什么做的。」', isKeyLine: true },
    ],
    playerOptions: [
      '可能是一道谜题？',
      '白玛念过这六个字——顺序是……（玩家分享信息）',
      '……说不准。',
    ],
    nextDialogueId: 'dlg_renqing_r5_mantra',
  },

  dlg_renqing_r5_mantra: {
    id: 'dlg_renqing_r5_mantra',
    title: '仁青',
    lines: [
      '仁青像是想起了什么，又随口说：',
      '「对了，我昨天去经堂门口转了一圈——那六块石头。」',
      '仁青皱眉：',
      '「我也不认识藏文，但我拍了照片，让朋友认了一下。」',
      '仁青停顿：',
      { text: '「说是六字真言。唵嘛呢叭咪吽——就这六个字，但顺序打乱了。」', isKeyLine: true },
      '仁青有点不解：',
      '「为什么要打乱？」',
    ],
    playerOptions: [
      '可能是一道谜题？',
      '白玛念过这六个字——顺序是……（玩家分享信息）',
      '……说不准。',
    ],
    nextDialogueId: 'dlg_renqing_r6_close',
    // 【AI生成指引】若玩家选「分享白玛顺序」 → 仁青激动「你跟白玛说话了？！她开口说话了？」
    //   仁青：「她跟我说了三个字：你来啊。你跟她的缘分比我好。」
  },

  dlg_renqing_r6_close: {
    id: 'dlg_renqing_r6_close',
    title: '仁青',
    lines: [
      '仁青收起记事本：',
      { text: '「等我回来。」', isKeyLine: true },
    ],
    // 链尾：关闭时设 renqingSceneDCompleted；仁青图标变为「外出中」（第三章返回）
  },


  // ===== 场景E：经堂门口·六字真言石的第二次注视 =====

  dlg_hall_e_monologue: {
    id: 'dlg_hall_e_monologue',
    title: '内心OS',
    lines: [
      { text: '「……我又来了。这次，我认识这六个字了。」', isKeyLine: true },
      '「唵。嘛。呢。叭。咪。吽。」',
      '「白玛念过的，就这个顺序。」',
      '「六块石头，六个字，散放着，顺序是乱的。」',
      { text: '「……如果要把它们排对，应该是这样的：唵——嘛——呢——叭——咪——吽。」', isKeyLine: true },
      '「门还是锁着。但我感觉这六块石头，和那把锁，是有关系的。」',
      '「等我弄明白怎么用。」',
    ],
    // 【系统提示（可选弹出）】：「你现在知道了六字真言的正确顺序。六块石头可以按顺序排列——但你还没有经堂的钥匙。」
  },

  // ===== 第三章主线剧情对话（来源：第三章对话设计详细版 v1.2） =====
  //
  // 【设计原则】
  // 本文件只记录**推动主线剧情的固定对话节点**。
  // 每个场景按「轮」递进：NPC说固定台词 → 玩家选playerOptions → AI动态生成分支回应 → 自动推到下一轮。
  // **不写分支节点（_a/_b/_c/_free）**——分支台词由AI NPC引擎根据playerOptions动态生成。
  //


  // ===== 场景A：旅游开发会议 =====

  dlg_zhuoma_ch3_meeting_open: {
    id: 'dlg_zhuoma_ch3_meeting_open',
    title: '卓玛',
    lines: [
      '办公室里坐了约十个村民，表情各异——有的好奇，有的警惕，有的漠不关心。',
      '卓玛坐在主位，面前放着一份打印的「旅游开发方案」。白玛坐在角落，闭着眼，手持念珠。',
      '卓玛对着村民，声音干练：',
      { text: '「——上面的意思，是把咱们村打造成一个『藏族文化体验村』。经堂可以开放，唐卡可以展览，游客可以来看作画过程。」', isKeyLine: true },
    ],
    playerOptions: [
      '「经堂开放」——他们不知道经堂已经锁了十二年了。',
      '（安静听着）',
      '旅游开发……这意味着什么？',
    ],
    nextDialogueId: 'dlg_zhuoma_ch3_meeting_mid',
  },

  dlg_zhuoma_ch3_meeting_mid: {
    id: 'dlg_zhuoma_ch3_meeting_mid',
    title: '村民讨论',
    lines: [
      '村民甲（中年男性，犹豫）：「卓玛，那个……旦增大师那边，他同意吗？」',
      '卓玛（停顿1秒）：',
      { text: '「我叔他……（改口）旦增他，我不强求。但村子要发展，不能一直这样。」', isKeyLine: true },
      '村民乙（老年女性）：「经堂开了，那天葬台是不是也要修一修？外面的人来了，看了不好看。」',
    ],
    playerOptions: [
      '天葬台？煨桑台？我好像在哪里听过这两个词……',
      '卓玛刚才说「我叔他」——她叫旦增「叔」？',
      '（继续听着）',
    ],
    nextDialogueId: 'dlg_zhuoma_ch3_meeting_renqing',
    // 【AI生成指引·伏笔·卓玛的两难】卓玛说「我叔他」然后改口成「旦增他」
    //   → 玩家若注意到了，AI可回应：「卓玛是旦增的女儿——但她不叫'我阿爸'，用名字称呼。父女之间有距离。」
  },

  dlg_zhuoma_ch3_meeting_renqing: {
    id: 'dlg_zhuoma_ch3_meeting_renqing',
    title: '仁青',
    lines: [
      '仁青（在场，坐在侧面，一直记笔记）：',
      { text: '「如果能找回那幅度母唐卡，这个村子的文化价值会完全不同。——它不是一幅画，它是一个故事。」', isKeyLine: true },
      '村民的反应：「哪幅唐卡？」「早没了」「别提了。」',
      '有人提到「经堂」二字时——白玛轻声念了一句：',
      '「……唵嘛呢叭咪吽……」',
    ],
    playerOptions: [
      '仁青说「找回唐卡」——村民们为什么回避？',
      '白玛又念了六字真言——顺序和上次一样。',
      '（继续观察）',
    ],
    nextDialogueId: 'dlg_zhuoma_ch3_meeting_ask',
    // 【系统记录】六字真言顺序再次确认（若之前未记清可在此补记）
  },

  dlg_zhuoma_ch3_meeting_ask: {
    id: 'dlg_zhuoma_ch3_meeting_ask',
    title: '卓玛',
    lines: [
      '卓玛看向玩家，会议快结束时：',
      { text: '「你……有什么想法？外来人的想法。」', isKeyLine: true },
    ],
    playerOptions: [
      '经堂的事，应该先问旦增老人的意见。',
      '旅游开发是好事，但要看怎么做法。',
      '（沉默）',
    ],
    nextDialogueId: 'dlg_zhuoma_ch3_meeting_close',
    // 【AI生成指引】
    // 选A（先问旦增）→ 卓玛点头：「你说得对。但他说不出话来。」→ 获得卓玛好感
    // 选B（好事但看做法）→ 卓玛：「看法好说，做法难做。」→ 中性回应
    // 选C（沉默）→ 卓玛替玩家回答：「他不好意思说。」
  },

  dlg_zhuoma_ch3_meeting_close: {
    id: 'dlg_zhuoma_ch3_meeting_close',
    title: '卓玛',
    lines: [
      '卓玛（无论玩家如何回应）：',
      { text: '「……我叔那个脾气，我晓得。但村子不能一直停在十二年以前。」', isKeyLine: true },
      '会议散场。村民陆续离开。',
      '白玛是最后一个离开的——她走到门口时停顿了一下，但没有回头。',
    ],
    // 链尾：关闭时设 meetingCompleted
    // 白玛图标闪动，引导进入场景B
  },


  // ===== 场景B：白玛的猎人故事 =====

  dlg_baima_ch3_hunter_open: {
    id: 'dlg_baima_ch3_hunter_open',
    title: '白玛',
    lines: [
      '白玛在路边叫住了玩家。她没有闭眼念经——这次，她看着远方，像是在回忆。',
      '白玛（声音很轻）：',
      { text: '「会议上的事，你听到了。」', isKeyLine: true },
      '白玛（停顿）：',
      '「发展，保护——这些词，我都听过。最后留下来的，不是词，是石头。」',
    ],
    playerOptions: [
      '您不相信发展？',
      '您想跟我说什么？',
      '（沉默，等她说下去）',
    ],
    nextDialogueId: 'dlg_baima_ch3_hunter_r1',
  },

  dlg_baima_ch3_hunter_r1: {
    id: 'dlg_baima_ch3_hunter_r1',
    title: '白玛',
    lines: [
      { text: '「我给你讲个故事。」', isKeyLine: true },
      '白玛（停顿，像是在组织语言）：',
      '「山里有猎人，一世都在追一只鹿。」',
      '「那鹿不是普通的鹿——它走到哪里，哪里的草就绿得早，花就开得先。」',
      { text: '「猎人追了一辈子，最后追到山口，鹿回头看了他一眼——」', isKeyLine: true },
      '「然后跳下去了。」',
    ],
    playerOptions: [
      '鹿跳下去了……猎人追到了吗？',
      '这只鹿是什么？为什么能让草绿得早？',
      '（听着）',
    ],
    nextDialogueId: 'dlg_baima_ch3_hunter_r2',
    // 【第一层隐喻：追逐与失去】
    // 对应旦增追妻子的影子，但最终失去
  },

  dlg_baima_ch3_hunter_r2: {
    id: 'dlg_baima_ch3_hunter_r2',
    title: '白玛',
    lines: [
      '白玛（停顿很长）：',
      '「猎人回到家，把弓折了，再也不打猎了。」',
      '「村里人都说他疯了——追了一辈子，连一根鹿毛都没带回来。」',
      { text: '「但猎人的孙子后来跟我说，爷爷折弓那天，笑了一下。」', isKeyLine: true },
    ],
    playerOptions: [
      '猎人为什么笑？',
      '折弓——就是放弃了？',
      '……跟您有什么关系？',
    ],
    nextDialogueId: 'dlg_baima_ch3_hunter_r3',
    // 【第二层隐喻：放弃追逐后的释然】
    // 对应旦增封笔8年，但最终走出来
  },

  dlg_baima_ch3_hunter_r3: {
    id: 'dlg_baima_ch3_hunter_r3',
    title: '白玛',
    lines: [
      '白玛（看着玩家的眼睛）：',
      { text: '「因为他终于看清了鹿的眼睛。」', isKeyLine: true },
      '「鹿的眼睛里，没有害怕，没有跑——只有"你追了这么久，现在你看到我了，你打算怎么办"。」',
      { text: '「猎人那时候才明白：他追的不是鹿，是自己心里那个"要追到‘的念头。」', isKeyLine: true },
    ],
    playerOptions: [
      '因为他终于见到了鹿，此生无憾？',
      '因为他意识到追下去也没有意义？',
      '……我不知道。',
    ],
    nextDialogueId: 'dlg_baima_ch3_hunter_close',
    // 【第三层隐喻：追逐的本质是面对自己】
    // 对应玩家的旅程——不是「找到唐卡」，而是「面对祖父的遗愿」
  },

  dlg_baima_ch3_hunter_close: {
    id: 'dlg_baima_ch3_hunter_close',
    title: '白玛',
    lines: [
      '白玛（回到现实，看着玩家）：',
      { text: '「你来到这个村子，追的是什么？」', isKeyLine: true },
      '白玛（不等回答）：',
      { text: '「不急。鹿会停下来的，只要你追的方向是对的。」', isKeyLine: true },
    ],
    // 【系统提示】：白玛的故事好像不只是故事……她在说旦增？在说我？还是在说唐卡？
    // 链尾：关闭时设 baimaHunterCompleted
  },


  // ===== 场景C：旦增的「手老了」 =====

  dlg_danzeng_ch3_hands_open: {
    id: 'dlg_danzeng_ch3_hands_open',
    title: '旦增',
    lines: [
      '旦增走出院门倒水。他穿着旧藏袍，手里拿着铜碗。',
      '他的手在倒水时微微颤抖——藏獒抬头看了他的手一眼，然后低头。',
      '旦增看到玩家，停顿了一下——但没有立刻回院子。',
      '（沉默约3秒。）',
      { text: '「手老了。」', isKeyLine: true },
    ],
    playerOptions: [
      '他的手在抖……是生病了？还是年纪大了？',
      '您还好吗？',
      '（沉默看着）',
    ],
    nextDialogueId: 'dlg_danzeng_ch3_hands_grandfather',
  },

  dlg_danzeng_ch3_hands_grandfather: {
    id: 'dlg_danzeng_ch3_hands_grandfather',
    title: '旦增',
    lines: [
      '旦增（看着自己倒水的手）：',
      { text: '「你祖父的手，最后也这样。」', isKeyLine: true },
      '旦增（停顿）：',
      { text: '「他画到最后一张画的时候，手已经握不住笔了。」', isKeyLine: true },
    ],
    playerOptions: [
      '我祖父……最后一张画？',
      '您的手……还能画吗？',
      '（沉默）',
    ],
    nextDialogueId: 'dlg_danzeng_ch3_hands_close',
    // 【信息碎片·祖父最后时光】玩家第一次听到祖父「手抖」的细节
    // 与祖父笔记最后一页「我希望有一天，有人能替他再画一次」形成呼应
  },

  dlg_danzeng_ch3_hands_close: {
    id: 'dlg_danzeng_ch3_hands_close',
    title: '旦增',
    lines: [
      '旦增倒完水，转身要回院子：',
      { text: '「……别站在门口。风大。」', isKeyLine: true },
      '旦增走进院子，关上门。',
    ],
    // 链尾：关闭时设 danzengHandsCompleted
    // 格桑图标开放，引导进入场景D
  },


  // ===== 场景D：格桑展示画夹·残卷第三页发现 =====

  dlg_gesang_ch3_sketch_open: {
    id: 'dlg_gesang_ch3_sketch_open',
    title: '格桑',
    lines: [
      '格桑坐在石头上，面前放着画夹，手里拿着炭笔，但一直在拧笔帽，不画。',
      '格桑看到玩家，有点不好意思地把画夹翻过去：',
      '「……你别看。」',
      { text: '「我画不对。」', isKeyLine: true },
    ],
    playerOptions: [
      '让我看看？',
      '你想画唐卡？',
      '谁教你画画的？',
    ],
    nextDialogueId: 'dlg_gesang_ch3_sketch_show',
    // 【AI生成指引】
    // 选A → 格桑犹豫翻开画夹：「你看。」→「我画了好多次，但不像。我看我阿古画的不是这样的。」→「但他从来不教我。」
    // 选B → 格桑眼神亮了一下又暗下去：「想。但没用。我阿古说了，'你心不静，画不出来'。」
    // 选C → 格桑：「没人教。我自己照着书上的图画的。」→「书上的图我也看不太懂……字太多了。」
  },

  dlg_gesang_ch3_sketch_show: {
    id: 'dlg_gesang_ch3_sketch_show',
    title: '格桑',
    lines: [
      '格桑翻画夹时，画夹里滑出一张旧纸——泛黄，边角磨损，上面写着密密的汉字和藏文，还有几幅小图（颜料名称与制法简图）。',
      '格桑赶紧塞回去：',
      '「这个不是我的画，别看。」',
      '格桑（停顿，挠头）：',
      '「……我也不知道这纸怎么夹在里面的。好像是很久以前就在这儿的。」',
      { text: '「上面写的什么我不认识，字太多了。你……你认字多，你看一下？」', isKeyLine: true },
    ],
    playerOptions: [
      '这上面写的……是颜料的制法。',
      '这好像是祖父笔记里提到的残页。',
      '（不说，默默记下）',
    ],
    nextDialogueId: 'dlg_gesang_ch3_sketch_close',
    // 【系统记录·残卷第三页】
    // 选A → 格桑：「颜料？那玩意儿有用吗？」→「你如果想知道更多……你去问我姑妈卓玛吧。」
    // 选B → 格桑：「残页？卓玛姑妈说过的那个？」→「那就给你吧？我不知道这是什么，也没用。」
    // 选C → 格桑：「算了，你不在意就不在意吧。」→「回头我问我姑妈，这纸到底是什么。」
  },

  dlg_gesang_ch3_sketch_close: {
    id: 'dlg_gesang_ch3_sketch_close',
    title: '格桑',
    lines: [
      '格桑（无论之前如何回应）：',
      { text: '「……我不知道那些字是什么意思。你去问我姑妈卓玛吧，她应该知道。」', isKeyLine: true },
      '格桑收拾画夹，站起来：',
      '「对了——你去找过我阿古了？他说什么了吗？」',
    ],
    playerOptions: [
      '他说「明天再来」。（若通过第二章场景B测试）',
      '他没说什么。（若未通过）',
      '（沉默）',
    ],
    nextDialogueId: 'dlg_gesang_ch3_sketch_end',
    // 【AI生成指引】
    // 选A（明天再来）→ 格桑激动：「真的？！他从来没跟外人说过'再来'——你真的是第一个！」
    //   →「我阿古年轻的时候，画的那些唐卡，有人出高价买他都不同意。他说，'唐卡不是卖的，是供的'。」
    //   →【信息碎片·旦增艺术观】唐卡不是商品，是供奉物——与旅游开发形成张力
    // 选B/选C → 格桑叹气：「……他就是这样。」
  },

  dlg_gesang_ch3_sketch_end: {
    id: 'dlg_gesang_ch3_sketch_end',
    title: '格桑',
    lines: [
      '格桑收拾完画夹：',
      '「你去吧。我去找我姑妈问问那张纸的事。」',
    ],
    // 链尾：关闭时设 gesangSketchCompleted
    // 仁青住处图标开放，引导进入场景E
  },


  // ===== 场景E：仁青返回·图像解读推进 =====

  dlg_renqing_ch3_return_open: {
    id: 'dlg_renqing_ch3_return_open',
    title: '仁青',
    lines: [
      '仁青刚从外面回来，手里拿着一个牛皮纸信封。桌上摊着照片、笔记本、地图。',
      { text: '「你来了！我刚回去了一趟——拿资料去了！」', isKeyLine: true },
      '仁青把信封放在桌上：',
      '「你看——」',
    ],
    // 仁青从信封里取出两张照片
    nextDialogueId: 'dlg_renqing_ch3_photo2',
  },

  dlg_renqing_ch3_photo2: {
    id: 'dlg_renqing_ch3_photo2',
    title: '仁青',
    lines: [
      '仁青取出第二张照片——度母的背景山形。',
      '「这是第二张，度母的背景山形。你看出什么了？」',
      { text: '（照片中的山轮廓与措钦村背后的山完全一致。）', isKeyLine: true },
    ],
    playerOptions: [
      '这山……是我们村后面的山？',
      '第二张？那第一张呢？',
      '（仔细看照片，不说话）',
    ],
    nextDialogueId: 'dlg_renqing_ch3_photo3',
    // 【系统记录：照片2/5·度母背景山形 收入道具栏】
    // 【AI生成指引】
    // 选A → 仁青激动：「对！你一眼就看出来了！——这画的不是'通用背景'，是这个村子！」
    //   →「旦增画唐卡，不是照着规范画，他是把这个村子的山、这个村子的光、这个村子里的人都画进去了。」
    // 选B → 仁青翻出第一张：「第一张我之前给你看了——度母的右手持莲。右手持莲——慈悲。」
    // 选C → 仁青：「你再看看，这背景不是随便画的。」
  },

  dlg_renqing_ch3_photo3: {
    id: 'dlg_renqing_ch3_photo3',
    title: '仁青',
    lines: [
      '仁青递出第三张照片——度母的左眼。',
      { text: '「这是第三张。度母的左眼。」', isKeyLine: true },
      '仁青（压低声音）：',
      { text: '「你看这个眼睛——微睁。不像是"看"，更像是"知道"。」', isKeyLine: true },
    ],
    playerOptions: [
      '这只眼睛……好像在看着我。',
      '第三张？你一共有几张？',
      '（仔细看，保存照片）',
    ],
    nextDialogueId: 'dlg_renqing_ch3_photo_hint',
    // 【系统记录：照片3/5·度母左眼 收入道具栏】
    // 【AI生成指引】
    // 选A → 仁青：「你感觉到了？——这眼睛不'看人'，它'看见真相但不开口'。旦增也是这样。」
    // 选B → 仁青：「五张。我一共拍了五张——但有一张有点模糊。」→「模糊的那张是度母胸前的部分……拍照的时候手抖了。」
    //   →【伏笔·画面空白/镜子】
    // 选C → 仁青继续：「你先收着。后面会用到。」
  },

  dlg_renqing_ch3_photo_hint: {
    id: 'dlg_renqing_ch3_photo_hint',
    title: '仁青',
    lines: [
      '仁青（收拾照片）：',
      '「剩下两张，一张是角落的藏文，一张是……（犹豫）算了，你先去把这三张弄明白。」',
      '仁青（看着玩家）：',
      { text: '「你有没有觉得——这些照片拼起来，不只是"一幅画"，而是一个人？」', isKeyLine: true },
    ],
    // 链尾：关闭时设 renqingPhoto23Completed
    // 图像解读系统进度：3/5
  },


  // ===== 场景F：煨桑台附近·四要素全部释出 =====

  dlg_baima_ch3_weisang_open: {
    id: 'dlg_baima_ch3_weisang_open',
    title: '白玛',
    lines: [
      '白玛蹲在煨桑台旁边，手里拿着几根松柏枝，小心地摆在台子边缘。',
      '白玛感知到玩家来了，但没有回头：',
      '「……你来了。」',
      '白玛（继续摆松柏枝）：',
      { text: '「松柏净化，杜松祈福……顺序不能乱。」', isKeyLine: true },
    ],
    playerOptions: [
      '松柏和杜松——这两种植物有什么区别？',
      '顺序不能乱——什么顺序？',
      '（静静看着她摆）',
    ],
    nextDialogueId: 'dlg_baima_ch3_weisang_time',
    // 【伏笔⑩：煨桑仪式·植物要素 + 顺序要素】
    // 松柏在下（净化），杜松在上（祈福）
  },

  dlg_baima_ch3_weisang_time: {
    id: 'dlg_baima_ch3_weisang_time',
    title: '白玛',
    lines: [
      '白玛（回头看了玩家一眼）：',
      { text: '「你要是想做……还得知道什么时候点。藏历的时辰，不是你想点就点。」', isKeyLine: true },
    ],
    playerOptions: [
      '藏历的时辰？我怎么查？',
      '什么时候才能点？',
      '（记下来）',
    ],
    nextDialogueId: 'dlg_baima_ch3_weisang_chant',
    // 【伏笔⑪：煨桑仪式·点火时辰要素】
  },

  dlg_baima_ch3_weisang_chant: {
    id: 'dlg_baima_ch3_weisang_chant',
    title: '白玛',
    lines: [
      '白玛（停顿，看着玩家的眼睛）：',
      { text: '「还有，念什么也得对。」', isKeyLine: true },
      '白玛（很轻）：',
      { text: '「……我以前念过的，你应该听过。」', isKeyLine: true },
    ],
    playerOptions: [
      '您平时念的经文——六字真言？还是那段佛青制法经文？',
      '（回想）',
    ],
    nextDialogueId: 'dlg_baima_ch3_weisang_close',
    // 【伏笔⑫：煨桑仪式·诵念内容要素】
  },

  dlg_baima_ch3_weisang_close: {
    id: 'dlg_baima_ch3_weisang_close',
    title: '白玛',
    lines: [
      '白玛站起来，拍拍手上的灰：',
      { text: '「这四个——植物、顺序、时辰、念的——少了哪一个，烟都起不来。」', isKeyLine: true },
      { text: '「烟起不来，就通不了天。」', isKeyLine: true },
      '白玛离开煨桑台：',
      '「我再去备些松柏。」',
    ],
    // 【系统记录·煨桑四要素汇总】：
    // 1. 植物：松柏（净化）+ 杜松（祈福）——顺序不能乱
    // 2. 顺序：松柏在下，杜松在上
    // 3. 时辰：藏历时辰（需要查历书或问白玛）
    // 4. 诵念内容：白玛平时念的经文（六字真言 + 佛青制法经文）
    // 链尾：关闭时设 weisangCompleted
    // 本章收束：煨桑四要素全部得知，玩家需主动决定去找经堂钥匙
  },

  // ===== 第四章主线剧情对话（来源：GDD 完整版） =====
  //
  // 【第四章定位】
  // 按照 GDD「抵达→试探→裂缝→经堂→抉择与结局」的五章结构，
  // 第四章的核心是"进入经堂，面对真相"。
  // 在此之前，"残卷收集→图像解读→颜料制作→煨桑→唐卡复制→赠予旦增"
  // 属于第三章至第四章之间的玩家自由探索阶段，在下方"第四章前奏"中定义。
  //
  // 【进入经堂的前置条件（与 src/Scene.jsx 代码一致）】
  // hasGivenThangka === true  AND  (白玛知己 OR 卓玛知己)
  // 即：必须先完成唐卡制作并赠予旦增，才能触发 NPC 帮忙开门。
  //
  // 【第四章结构】
  // 场景A(钥匙)→B(六字真言拼图)→C(经堂检视)→D(旦增真相)→D-2(白玛回忆)
  // 链尾：自动进入第五章·视听结局
  //


  // ===== 第一幕·叙事部分 =====


  // ----- 场景A：NPC带去经堂开门 -----
  // 两条路径：卓玛/白玛陪玩家走到经堂门口，用钥匙开门
  // 钥匙始终不交给玩家

  // 【路径一：卓玛陪你去开门】
  dlg_zhuoma_ch4_key_open: {
    id: 'dlg_zhuoma_ch4_key_open',
    title: '卓玛',
    lines: [
      '卓玛站在窗前，看着外面的经堂方向。',
      { text: '「经堂关了十二年了。」', isKeyLine: true },
      '卓玛转身：',
      '「你……想进去？」',
      '卓玛停顿3秒，从抽屉里拿出一把生锈的铁钥匙，攥在手里：',
      { text: '「……你确定你想看？进去之后，有些事你就没法装作不知道了。」', isKeyLine: true },
    ],
    playerOptions: [
      '我想看。',
      '我不确定，但我觉得我该看。',
      '旦增……他不会反对吗？',
    ],
    nextDialogueId: 'dlg_zhuoma_ch4_key_close',
    // 【AI生成指引】
    // 选A → 卓玛攥紧钥匙：「你想看。那我告诉你——经堂里那幅画不在了。画框还在，画不在了。」
    //   →「我爸他知道画去哪了。但他十二年没跟任何人说过这件事。」→「你进去之后，别逼他说话。」
    // 选B → 卓玛眼神意外：「你比你祖父还谨慎。他当年也是这样说的——'我不确定，但我觉得我该看'。」
    //   →「行。走吧，我带你去。」起身往门外走。
    // 选C → 卓玛沉默5秒：「他不反对。他只是不会帮你开门。」→「但我可以。因为——如果连我这个女儿都不帮他开门，那谁帮他？」
  },

  dlg_zhuoma_ch4_key_close: {
    id: 'dlg_zhuoma_ch4_key_close',
    title: '卓玛',
    lines: [
      '卓玛起身，手里攥着钥匙，示意玩家跟上。',
      '两人沿着村道走向经堂。卓玛走得很快，没有说话。',
      '走到经堂门口，卓玛停下，低头看了一会儿门上的铁锁。',
      { text: '「……十二年了。我都没想过我还会来开这扇门。」', isKeyLine: true },
      '卓玛把钥匙插进锁孔。转了两圈。锁开了。',
      '卓玛没有推门，退后一步：',
      { text: '「门我开了。……进去是你自己的事。」', isKeyLine: true },
    ],
    // 链尾：门已解锁，触发场景B（若拼图未解则仍需解拼图）
  },

  // 【路径二：白玛陪你去开门】
  dlg_baima_ch4_key_open: {
    id: 'dlg_baima_ch4_key_open',
    title: '白玛',
    lines: [
      '白玛坐在石头上，手里捻着一串旧佛珠。',
      '「……你又来了。」',
      { text: '「你想进去。」', isKeyLine: true },
      '白玛停顿约5秒，从氆氇下面拿出一把更小的铜钥匙，攥在掌心：',
      '「经堂已经关了十二年了。……走吧，我陪你过去。」',
      { text: '「这把钥匙，是他交给我保管的。他没给卓玛，给了我。……因为他知道，我不会随便拿去开门。」', isKeyLine: true },
    ],
    playerOptions: [
      '为什么交给你？',
      '他会不会生气？',
      '（点头跟上，不说话）',
    ],
    nextDialogueId: 'dlg_baima_ch4_key_close',
    // 【AI生成指引】
    // 选A → 白玛继续捻佛珠：「因为……我跟他一样，选择了沉默。」
    //   →「他画了一辈子的度母，我念了一辈子的经。……我们都不开口。不开口的人，信得住。」
    // 选B → 白玛看玩家：「他会沉默。他不会生气。……沉默和生气不一样。沉默是——他知道该发生了，但他不肯主动。」
    // 选C → 白玛看玩家点头，起身带路。她走得很慢，每一步都很稳。
  },

  dlg_baima_ch4_key_close: {
    id: 'dlg_baima_ch4_key_close',
    title: '白玛',
    lines: [
      '白玛起身，攥着铜钥匙，领着玩家沿村道走。',
      '她走得很慢，每一步都很稳。路上没有说话。',
      '走到经堂门口，白玛停下来，回头看了玩家一眼：',
      { text: '「……进去之后，看到什么都别怕。他只是不说话，他的心没坏。」', isKeyLine: true },
      '白玛把铜钥匙插进锁孔。转了三圈。锁开了。',
      '白玛把手收回来，合在胸口，闭眼念了一句经。',
      { text: '「门开了。……你去吧。」', isKeyLine: true },
    ],
    // 链尾：门已解锁，触发场景B（若拼图未解则仍需解拼图）
  },


  // ----- 场景B：六字真言拼图·进入经堂的门槛 -----
  // 拼图在经堂门口，任何时间都可以尝试排列
  // 但经堂门只有场景A中NPC用钥匙解锁后才会打开

  dlg_mantra_puzzle_open: {
    id: 'dlg_mantra_puzzle_open',
    title: '系统提示',
    lines: [
      '经堂门前地面：六块刻字石头散乱摆放。',
      '石台上：六个凹槽，等待石头被放入正确位置。',
      { text: '将六块石头按正确顺序排列：唵→嘛→呢→叭→咪→吽。', isKeyLine: true },
    ],
    // 拼图玩法：玩家拖动石头到凹槽，随时可尝试
    // 若在唐卡复刻→赠予旦增完成后仍未解开，格桑主动帮忙
  },

  // 【格桑兜底帮助】→ 触发条件：唐卡赠予已完成 + 玩家仍未能排对拼图
  dlg_gesang_mantra_help: {
    id: 'dlg_gesang_mantra_help',
    title: '格桑',
    lines: [
      '格桑从旁边走过来，蹲下看着石头：',
      { text: '「你画得那么好……怎么这几个字的顺序记不住？」', isKeyLine: true },
      '格桑笑了笑，开始帮忙排列石头：',
      '「唵嘛呢叭咪吽——我从小听到大，闭着眼睛都会背。白玛每天都念。」',
      '「第一个是"唵"，然后"嘛"……你看，这样。」',
      '格桑排好后退一步：',
      { text: '「……好了。你进去吧。」', isKeyLine: true },
    ],
  },

  // 【拼图解开的叙事演出】
  dlg_mantra_puzzle_complete: {
    id: 'dlg_mantra_puzzle_complete',
    title: '演出',
    lines: [
      '所有声音突然消失。',
      '六块石头发出微弱的金光——佛青、朱砂、藏金、松石、骨白，五种颜色逐一闪现。',
      { text: '经堂的门缓缓推开一条缝。里面很暗。只有酥油灯的微光。', isKeyLine: true },
    ],
    // 【系统提示】：「门开了。……里面很安静。」
    // 链尾：触发场景C
  },


  // ----- 场景C：进入经堂·核心场景 -----
  // 玩家自由检视，检视空画框时触发场景D

  dlg_hall_enter: {
    id: 'dlg_hall_enter',
    title: '内心OS',
    lines: [
      '你推开门。所有环境音消失——没有风声，没有奶牛叫，没有经幡声。',
      '只有极远的、类似念经的声音（白玛在远处的角落念经，声音穿过墙壁传来）。',
      '酥油灯：三盏，只有一盏还在微弱燃烧。',
      '陈旧的酥油味和淡淡的颜料味——十二年前留下的。',
      { text: '「……经堂。十二年没有打开过。」', isKeyLine: true },
    ],
  },

  // 【检视空画框】
  dlg_hall_empty_frame: {
    id: 'dlg_hall_empty_frame',
    title: '系统提示',
    lines: [
      '墙上挂着一个空的画框。画框很大。',
      '木质边框雕刻着度母像的轮廓花纹，但画框内是空的——没有画。',
      '画框下方墙壁上：被涂抹的壁画。依稀可辨度母像局部——手指、莲花、衣褶——但面部被故意涂毁。',
      { text: '「画框里应该有一幅画。……但画不在了。壁画的面部被故意抹去了——不是自然褪色，是有人用颜料盖住了。」', isKeyLine: true },
    ],
  },

  // 【检视酥油灯与碎布】
  dlg_hall_oil_lamp: {
    id: 'dlg_hall_oil_lamp',
    title: '系统提示',
    lines: [
      '左侧地面：一个翻倒的酥油灯，灯油已经干涸。',
      '酥油灯旁：一块白色碎布（氆氇碎片）——与旦增院子里石头下压着的那块碎布颜色和材质一样。',
      { text: '「院子里的碎布，经堂里的碎布——同一件氆氇被故意撕成两半。」', isKeyLine: true },
    ],
  },

  // 【检视地面石缝·残卷第四页】
  dlg_hall_residue_4: {
    id: 'dlg_hall_residue_4',
    title: '系统提示',
    lines: [
      '地面石缝里：隐约可以看见一张纸角。可点击拾取——残卷第四页。',
      '残卷第四页内容（可读部分）：',
      '——几行藏文（颜料配方中骨白的用法说明）',
      '——一行汉字：「此眼需画师以心中所念入笔」——后半句被撕去，只剩「不可度量」三个字',
      { text: '「残卷第四页。……后半句被撕掉了，只剩"不可度量"三个字看得清。旦增就在门口……也许他知道后半句是什么？」', isKeyLine: true },
    ],
    // 【系统记录】残卷第四页拾取，残卷进度4/4
  },

  //检视所有物品结束后 旦增出现 进入场景D

  // ----- 场景D：旦增出现·真相第一部分 -----

  dlg_danzeng_ch4_truth_open: {
    id: 'dlg_danzeng_ch4_truth_open',
    title: '旦增',
    lines: [
      '旦增不知何时已经站在经堂门口。他没有走进来，只是站在门口，逆光。',
      '旦增的轮廓在门口的光线中显得很大——但玩家看不清他的表情。只有他的声音。',
      '（沉默约5秒。）',
      { text: '「……那幅画，是我儿子拿走的。」', isKeyLine: true },
    ],
    playerOptions: [
      '……他为什么拿走？',
      '你的儿子？',
      '（沉默）',
    ],
    nextDialogueId: 'dlg_danzeng_ch4_truth_r2',
    // 【AI生成指引】
    // 选A(为什么拿走) → 旦增停顿3秒：「他欠了债。他以为那幅画只是一幅画。」
    //   →「他不知道那幅画里有什么。……他不知道那个白色是从哪里来的。」
    // 选B(你的儿子) → 旦增停顿5秒，声音更低：「卓玛的哥哥。格桑的父亲。」
    //   →「……格桑不知道。我希望他永远不知道。」
    // 选C(沉默) → 旦增看了玩家约10秒，然后继续说——玩家的沉默比追问让他更容易开口：
    //   →「他拿走了画。我没有报案。没有追查。……全村人知道，但没有一个人说出口。」
    //   →「因为——说出来，格桑就没有父亲了。」
  },

  dlg_danzeng_ch4_truth_r2: {
    id: 'dlg_danzeng_ch4_truth_r2',
    title: '旦增',
    lines: [
      '旦增（无论玩家如何回应）：',
      '「十二年了。我关了经堂，折了画笔，烧了……」',
      '旦增停顿——没有说"烧了什么"，只说了"烧了"两个字就停住了。',
      { text: '「如果画能留住人，我早就留住她了。」', isKeyLine: true },
    ],
    playerOptions: [
      '残卷上的后半句——"不可度量"后面是什么？',
      '（沉默，不追问）',
    ],
    nextDialogueId: 'dlg_danzeng_ch4_truth_end',
    // 【可选追问：残卷第四页后半句】
    // 选A(追问) → 旦增转身看经堂地面，看到那张纸：「……是我撕的。」
    //   →停顿3秒：「"不可模仿"——画不出来的东西，就不要再看了。」
    //   →【系统提示补全】：「此眼需画师以心中所念入笔，不可度量，不可模仿」——完整的度母左眼秘密
    // 选B(不追问) → 旦增转身离开，场景D-2触发。后半句在场景E旦增主动说出。
  },

  dlg_danzeng_ch4_truth_end: {
    id: 'dlg_danzeng_ch4_truth_end',
    title: '旦增',
    lines: [
      '旦增转身，准备离开。',
    ],
    // 链尾：触发场景D-2（白玛回忆）
  },


  // ----- 场景D-2：白玛的回忆·天葬与死亡 -----
  // 闪回场景，无玩家交互，以旁白形式呈现

  dlg_baima_ch4_memory_intro: {
    id: 'dlg_baima_ch4_memory_intro',
    title: '白玛',
    lines: [
      '旦增转身要走。白玛从经堂外的转角处出现——她没有走进经堂，只是站在门外。',
      { text: '「他不会告诉你的。……有些事，他十二年没对人说过了。」', isKeyLine: true },
      '白玛停顿2秒：',
      { text: '「你来。」', isKeyLine: true },
      '白玛带着玩家走到白玛念经的角落——远离经堂，旦增听不到的地方。',
    ],
    // 【叙事演出提示】以下场景以回忆滤镜呈现（色调偏冷、颗粒感、类似旧照片）
    // 玩家以旁观者视角观看，无法干预
  },

  // 【回忆一：旦增妻子去世】
  dlg_baima_ch4_memory_1: {
    id: 'dlg_baima_ch4_memory_1',
    title: '白玛·画外音',
    lines: [
      '【回忆滤镜·二十年前·秋天】',
      '旦增的妻子（次仁拉姆，35岁）卧病在床，脸色苍白但安详。',
      '旦增坐在床边，握着她的手，没有哭，只是沉默。',
      '年轻的格桑（约2岁）站在门口，不敢进来。白玛在屋外念经。',
      '沈默之（玩家祖父）坐在旦增旁边，一只手搭在旦增肩上。',
      { text: '「阿姐走的那年，格桑还小。她病了三个月，旦增每天画一幅唐卡，说要把她画进度母的眷属里。……但阿姐说，不用画了。她说，她不怕死。」', isKeyLine: true },
    ],
  },

  // 【回忆二：天葬仪式】
  dlg_baima_ch4_memory_2: {
    id: 'dlg_baima_ch4_memory_2',
    title: '白玛·画外音',
    lines: [
      '【回忆滤镜·次仁拉姆去世后第三天·天葬台】',
      '天葬师在清晨开始工作（象征性呈现：只展示念经、准备仪式的动作，不展示具体过程）。',
      '旦增站在远处，没有走近，只是看着。白玛在旁边念经。',
      '秃鹫从四面八方飞来，停在周围的山坡上。天葬师完成仪式后，秃鹫降下。',
      { text: '「阿姐的身体，还给了天地。这是她最后一次布施——把能舍的都舍了。天葬不是结束，是她这一世最后的善行。她的灵魂已经走了，下一世会在别处继续。」', isKeyLine: true },
    ],
  },

  // 【回忆三：旦增画《度母护法图》】
  dlg_baima_ch4_memory_3: {
    id: 'dlg_baima_ch4_memory_3',
    title: '白玛·画外音',
    lines: [
      '【回忆滤镜·天葬后第七天·经堂】',
      '旦增坐在经堂里，面前是一块空白画布。',
      '他拿起妻子留下的白色氆氇，用刀裁下一小块，放入研钵研磨——骨白颜料的制作过程。',
      '沈默之坐在旦增旁边，拿着笔记本，记录每一步。',
      '旦增开始画——历时49天，从构图到细节。',
      '最后一天：旦增画左眼时停了很久，然后闭了一下眼，睁开，一笔画成——他没有看任何参照。',
      { text: '「他画了四十九天。你祖父一步都没离开过。最后一天，他画度母的左眼——停了很久。然后他闭了一下眼，睁开，一笔画成。……没有人教他画那只眼睛。他自己知道该画什么。」', isKeyLine: true },
    ],
  },

  // 【回忆四：旦增的封闭】
  dlg_baima_ch4_memory_4: {
    id: 'dlg_baima_ch4_memory_4',
    title: '白玛·画外音',
    lines: [
      '【回忆滤镜·十二年前·唐卡失踪后】',
      '旦增一个人坐在经堂里，看着空了的画框。',
      '他把所有的唐卡取下来——但没有烧。只是收了起来。他折断了画笔。',
      '从那天起，他再也没有走出过这个院子。',
    ],
  },

  // 【回忆结束·回到现实】
  dlg_baima_ch4_memory_close: {
    id: 'dlg_baima_ch4_memory_close',
    title: '白玛',
    lines: [
      '白玛（回到现实，看着玩家）：',
      { text: '「他不是恨谁。他只是……不知道怎么面对一个没有阿姐的村子。十二年了，他第一次今天让你进了经堂。……你明白吗？他不是在考验你，他是在考验他自己。」', isKeyLine: true },
    ],
    // 链尾：触发场景E（玩家主动决定复刻唐卡）
  },


  // ----- 第四章前奏：旦增的托付 -----
  // 触发时机：第三章结束后，煨桑四要素收集完成，玩家来到旦增院子
  // 旦增授权玩家收集残卷、识别图像、制作颜料、完成煨桑、复刻唐卡
  // 这是 GDD 流程中「收集→制作→赠予」阶段的起点，在经堂开启之前

  dlg_danzeng_ch4_decision_open: {
    id: 'dlg_danzeng_ch4_decision_open',
    title: '旦增',
    lines: [
      '旦增站在院子里。藏獒蹲在他脚边。',
      '他看见你走过来，没有动。但也没有转身进屋——这在之前是没有过的。',
      { text: '「你知道了煨桑的四样东西。」', isKeyLine: true },
      '旦增看了一眼院子角落里那堆蒙了灰的画具：',
      { text: '「……你想画那幅画。」', isKeyLine: true },
    ],
    playerOptions: [
      '想。',
      '我只想让你能再看到它。',
      '你祖父的笔记里……记了怎么做。',
    ],
    nextDialogueId: 'dlg_danzeng_ch4_decision_r2',
    // 【AI生成指引】
    // 选A → 旦增看了玩家一眼，点头——但很轻，几乎没有幅度：「画过的人，知道难。」
    // 选B → 旦增沉默5秒：「再看到它……我已经十二年没进过经堂了。」→「不是我不想进。是画不在了。」
    // 选C → 旦增眼神一动：「你祖父……他记东西很仔细。」→「如果他都记下来了，那你应该能画。」
  },

  dlg_danzeng_ch4_decision_r2: {
    id: 'dlg_danzeng_ch4_decision_r2',
    title: '旦增',
    lines: [
      '旦增看着玩家。阳光把他的影子投在石头院墙上——很长。',
      { text: '「你想画，就画吧。但我要看你有没有那个心。」', isKeyLine: true },
      // 【系统解锁】所有玩法系统正式解锁
      '旦增：',
      '「残页如果还在村里，你应该能找到。颜料的做法……有些在我这儿，有些在别人那儿。你去问。」',
      '旦增：',
      '「还有……那幅画原来的样子，仁青应该有些照片。你要找他。」',
      '旦增：',
      '「如果你想好好做这件事……经堂旁边的煨桑台，很久没人用了。你得自己想办法。」',
      { text: '「……你祖父说，"不是因为你欠了我什么"。那你现在做这件事——也不是因为你欠了我什么。是你自己想做。」', isKeyLine: true },
      '旦增转身走进屋里。藏獒跟着他走进去，但走到门口回头看了你一眼——然后也进去了。',
    ],
    // 链尾：所有玩法系统解锁
    // 旦增四句话分别指向：1.残卷收集 2.颜料制作 3.图像解读 4.煨桑仪式
    // 过渡到下方"第四章前奏：残卷、颜料与唐卡"阶段
  },


  // ===== 第四章前奏：残卷、颜料与唐卡 =====
  // 【阶段定位】
  // 这一阶段发生在第三章结束后、第四章经堂开启之前。
  // 按照 GDD 流程：收集残卷→识别图像→制作颜料→完成煨桑→复刻唐卡→赠予旦增。
  // 玩法阶段无固定顺序，玩家可按任意顺序完成。
  // 制作唐卡必须在所有前奏完成后才能开始。


  // ----- 玩法一：残卷收集 -----
  // 四页残卷位置：1.玛尼堆 2.白玛角落 3.格桑画夹 4.经堂地面石缝
  // 前三页在前几章已获取，第四页在场景C已拾取

  dlg_residue_all_complete: {
    id: 'dlg_residue_all_complete',
    title: '系统提示',
    lines: [
      { text: '四页残卷全部集齐。记载的内容：五种唐卡颜料的古法，以及度母左眼的秘密——「此眼需画师以心中所念入笔，不可度量，不可模仿」。', isKeyLine: true },
      '残卷第四页的后半句被撕掉了——空白的撕痕还在纸上。被撕掉的那两个字，也许留着它们的人知道是什么。',
    ],
  },


  // ----- 玩法二：图像解读系统 -----
  // 仁青交付最后两张照片，玩家拼装五张到对应位置

  dlg_renqing_ch4_photo45: {
    id: 'dlg_renqing_ch4_photo45',
    title: '仁青',
    lines: [
      '「你要的照片，我全带来了。第四张是度母胸前——这个有点模糊，拍照的时候手抖了。第五张是角落的藏文，很小，但你仔细看应该能看到。」',
      '仁青停顿：',
      '「五张局部照片，拼起来应该能看出整幅画的样子。……但我拼不出来，我试过了。可能你比我更懂唐卡。」',
      { text: '「对了——模糊的那个部分……如果你搞清楚了，告诉我。我一直想知道那块到底是什么。」', isKeyLine: true },
    ],
    // 【系统记录】照片4/5·度母胸前(模糊) + 照片5/5·角落藏文 收入道具栏
  },

  // 【照片到位旁白】
  dlg_photo_1_narration: {
    id: 'dlg_photo_1_narration',
    title: '旁白',
    lines: [
      '【度母右手持莲到位】',
      '「度母右手持莲花——慈悲之花。左手施无畏印——护佑之手。一手持，一手护。持者不紧，护者不惧。」',
      { text: '「……旦增画这只手的时候，他在想什么？他一辈子都在画"保护"——但他保护不了她。」', isKeyLine: true },
    ],
  },

  dlg_photo_2_narration: {
    id: 'dlg_photo_2_narration',
    title: '旁白',
    lines: [
      '【度母背景山形到位】',
      { text: '「度母身后的山……这是措钦村背后那座山。走出村口就能看到——轮廓一模一样。旦增画的是"这个村子"。他画的度母不是天上的女神，是脚下这片土地的守护者。」', isKeyLine: true },
      '「如果你还有疑问，可以去问白玛或旦增。」',
    ],
  },

  dlg_photo_3_narration: {
    id: 'dlg_photo_3_narration',
    title: '旁白',
    lines: [
      '【度母左眼到位】',
      { text: '「度母的左眼——微睁，半开半闭。看见真相，但不开口。你已经从残卷上读到了那句话——"此眼需画师以心中所念入笔，不可度量，不可模仿。"」', isKeyLine: true },
      '「残卷上的字，后半句被人撕掉了。为什么撕？撕掉的人不想记住什么？这只眼睛不是按规范画的，不是按量度画的——是画师在心中想一个人，然后把那个人的目光画进了度母的眼睛。这是唐卡传统里最深的秘密——真正的唐卡不是模仿，是从心里长出来的。」',
      '「……旦增当年画这只眼睛时，心中所念是谁？也许有一天他会告诉你。」',
    ],
  },

  dlg_photo_4_narration: {
    id: 'dlg_photo_4_narration',
    title: '旁白',
    lines: [
      '【度母胸前模糊到位】',
      { text: '「度母胸前——照片里永远是模糊的。仁青说拍照时手抖了，但……也许是拍照的人心里有什么东西，让这一块永远看不清。度母胸前应有一面镜子——照见自己，照见众生。……但这一面镜子，在这张照片里，永远模糊。」', isKeyLine: true },
    ],
  },

  dlg_photo_5_narration: {
    id: 'dlg_photo_5_narration',
    title: '旁白',
    lines: [
      '【角落藏文到位】',
      '「角落的藏文——这是一段祈愿文。最后几个字不是标准的经文，是一个名字。」',
      { text: '「……白玛能认出这些字。如果你想知道这个名字是谁，去找她。」', isKeyLine: true },
    ],
  },

  // 【拼装完成】
  dlg_photo_assembly_complete: {
    id: 'dlg_photo_assembly_complete',
    title: '系统提示',
    lines: [
      { text: '五张照片全部拼装完成。度母的完整形态已经呈现——右手持莲、背景山形、左眼微睁、胸前模糊、角落藏文。这张拼合图像将成为你绘制唐卡的参照。', isKeyLine: true },
      '如果你对任何部位的含义还有疑问或好奇，可以询问白玛或旦增——他们是这方面的专家。',
    ],
  },


  // ----- 玩法三：颜料制作 -----
  // 五种颜料各自有旁白，骨白需与旦增对话

  dlg_pigment_boneWhite_ask: {
    id: 'dlg_pigment_boneWhite_ask',
    title: '旦增',
    lines: [
      '玩家集齐其它四种颜色后，去找旦增询问骨白的来源。',
      '旦增沉默很久（约10秒）。',
      { text: '「这是我妻子留下来的。我画那幅画的时候，用的是她的氆氇磨成的粉。……你已经知道该怎么做了。」', isKeyLine: true },
    ],
  },

  // 【五种颜料旁白】
  dlg_pigment_buddhaBlue_narration: {
    id: 'dlg_pigment_buddhaBlue_narration',
    title: '旁白',
    lines: [
      { text: '「佛青——智慧与虚空之色。如夜空，如深秋的最后一抹蓝。这不是装饰的颜色，是"看见真相"的颜色。」', isKeyLine: true },
    ],
  },

  dlg_pigment_cinnabar_narration: {
    id: 'dlg_pigment_cinnabar_narration',
    title: '旁白',
    lines: [
      { text: '「朱砂红——生命力与护法之色。火煅三次，研末过筛——从石头变成红色，要经过三次火的淬炼。……旦增在炉底刻下这些字，他自己也经历了三次火的淬炼——妻子去世、唐卡失踪、十二年沉默。」', isKeyLine: true },
    ],
  },

  dlg_pigment_gold_narration: {
    id: 'dlg_pigment_gold_narration',
    title: '旁白',
    lines: [
      { text: '「藏金——光明与佛性之色。高原的藏金莲，只在最冷的地方绽放。……格桑记住了爷爷说的"好看的颜色"，但他不知道这颜色叫什么，也不知道它代表什么。他只知道——"好看"。有时候，"好看"就够了。」', isKeyLine: true },
    ],
  },

  dlg_pigment_turquoise_narration: {
    id: 'dlg_pigment_turquoise_narration',
    title: '旁白',
    lines: [
      { text: '「松石绿——自然与慈悲之色。杜松叶、绿绒蒿、黄柏皮——三种植物，三个季节。……卓玛留着这张药方，不是为了治病，是为了记住——这个村子还有人需要这些颜色。」', isKeyLine: true },
    ],
  },

  dlg_pigment_boneWhite_narration: {
    id: 'dlg_pigment_boneWhite_narration',
    title: '旁白',
    lines: [
      { text: '「骨白——纯洁与涅槃之色。白色氆氇磨成的粉。……旦增的妻子留下的最后一块布，变成了这幅画里最纯净的颜色。世界上只有那一幅画上有这种白色——因为这种白色的来源，是一个人最后的布施。」', isKeyLine: true },
    ],
  },

  // ----- 骨白未收集·四种颜料已集齐触发 -----
  // 触发条件：佛青、朱砂红、藏金、松石绿四种颜料全部收集完毕，骨白尚未获取
  // 旁白语气：含蓄、不直接说"去找旦增"，而是从颜色本身的神秘感引导

  dlg_pigment_boneWhite_hint: {
    id: 'dlg_pigment_boneWhite_hint',
    title: '旁白',
    lines: [
      '四种颜色已经备齐了——佛青、朱砂红、藏金、松石绿。',
      '但颜料上还有一处空白。',
      '那是一种白色。不是石灰的白，不是雪的白，不是云的白。',
      { text: '「……这种白色，不是从山上来的，不是从水里来的。它从一个人身上来。画这幅画的人，知道它的出处——他亲手磨出来的。如果你想知道这种白色是什么，也许该问问他。」', isKeyLine: true },
    ],
  },


  // ----- 玩法四：唐卡绘制 -----

  // ----- 正确填色旁白（5个） -----


  // 【松石绿 → 山脉】
  dlg_color_correct_turquoise_mountain: {
    id: 'dlg_color_correct_turquoise_mountain',
    title: '旁白',
    lines: [
      '松石绿涂入山脉——度母身后的山缓缓显形。',
      '那不是天上的山，是脚下这片土地——措钦村背后那座山的轮廓，一笔一笔地浮出来。',
      { text: `「松石绿——自然与慈悲之色。绿松石藏语称"宇"，是大地的心。藏人把绿松石嵌在额头上，挂在脖子上，缝在衣袍上——不是因为好看，是因为'她活着'。山脉涂松石绿，意为'度母脚踏的这片土地，是有心的土地'。山不动，但山有呼吸——经幡替它呼吸，煨桑替它呼吸，住在山脚下的人替它呼吸。」`, isKeyLine: true },
    ],
    // 松石绿=大地之心。度母身后的山不是抽象的"圣山"，是具体的措钦村的山——
    // 这幅画里的一切都来自真实的地方、真实的人。
  },


  // 【骨白 → 脸庞】
  dlg_color_correct_boneWhite_face: {
    id: 'dlg_color_correct_boneWhite_face',
    title: '旁白',
    lines: [
      '骨白涂入脸庞——度母的面容浮现。',
      '不是普通的白。不是石灰的白，不是云的白。是氆氇磨成粉的白——一个人的最后的布施，变成了度母的脸。',
      { text: `「骨白——纯洁与涅槃之色。藏语称"嘎"，是白色中最净的那一层。度母的脸涂骨白，意为'她的面容是最初的善'——未染、未着、未被任何尘世的颜色遮盖。这张脸不是画师凭空画的，是从一个人的氆氇里磨出来的。面容即布施——看度母的脸，就是看一个人最后的善念。」`, isKeyLine: true },
    ],
    // 骨白=面容即布施。度母的脸不是"神仙的脸"，是"一个人的善念变成的脸"。
    // 那块氆氇的主人是谁，玩家已经知道了。
  },


  // 【朱砂红 → 护法火焰】
  dlg_color_correct_cinnabar_fire: {
    id: 'dlg_color_correct_cinnabar_fire',
    title: '旁白',
    lines: [
      '朱砂红涂入火焰——护法之焰在度母身侧燃起来。',
      '这不是温暖的火。是淬炼的火。朱砂要经过三次火煅才能从石头变成红色——就像一个人要经过三次失去才能从沉默变成开口。',
      { text: `「朱砂红——生命力与护法之色。藏语称"玛"，是血与火的颜色。护法火焰涂朱砂，意为"她在燃烧——不是烧毁，是护持"。度母身侧的火焰不是地狱之火，是护法之焰：烧掉无知，烧掉恐惧，烧掉'不敢看'。三次火煅——旦增经历了三次：妻子去世、唐卡失踪、十二年沉默。朱砂红就是他走过的那三次火。」`, isKeyLine: true },
    ],
    // 朱砂红=护持之火。三次火煅对应旦增的三次失去。
    // 度母身侧的火焰不是惩罚，是保护——烧掉的是"不敢面对"。
  },


  // 【青蓝 → 天空】
  dlg_color_correct_buddhaBlue_sky: {
    id: 'dlg_color_correct_buddhaBlue_sky',
    title: '旁白',
    lines: [
      '佛青涂入天空——度母的身色显形。',
      '不是蓝色的蓝。是虚空之蓝——像高原最深的夜空，像深秋最后一抹蓝。这种蓝不是画上去的，是从空性里长出来的。',
      { text: `「佛青——智慧与虚空之色。藏语称"纳"，是天空本身。度母身涂佛青，意为"她是虚空——无处不在，无迹可寻，但永远在看"。佛青不是装饰的颜色，是"看见真相"的颜色。天空不说话，但天空什么都看见了——度母的左眼微睁，半开半闭，和佛青的天空是同一种'看见'。不是全看，是看该看的。」`, isKeyLine: true },
    ],
    // 佛青=虚空之见。天空=度母的身体。度母的左眼=天空的注视方式。
    // "看见该看的"呼应残卷「不可度量，不可模仿」——看见，但不全看。
  },


  // 【金色 → 莲台底座】
  dlg_color_correct_gold_lotus: {
    id: 'dlg_color_correct_gold_lotus',
    title: '旁白',
    lines: [
      '藏金涂入莲台底座——度母脚下绽放金莲。',
      '高原的藏金莲，只在最冷的地方开花。越冷，越亮。越苦，越金。',
      { text: `「藏金——光明与佛性之色。藏语称"瑟"，是日月之金。莲台涂藏金，意为"她站的地方是光"。度母不是飘在空中的，她站在一朵莲花上——莲花从泥里长出来，金光从苦里长出来。藏金莲只在最冷的地方绽放：越冷越亮，越苦越金。莲台底座就是'一切修行的地基'——没有这朵莲花，度母没有地方站立。」`, isKeyLine: true },
    ],
    // 藏金=苦中之光。莲台=修行的地基。度母不是虚无飘渺的神，是站在苦里开出的光上的守护者。
    // "越冷越亮，越苦越金"——措钦村就是这个"冷"和"苦"。
  },


  // ----- 错误填色·白玛提示（5个位置，按位置分类） -----
  // 白玛的语气：温和、不急、但方向明确。她不说"你错了"，她说"这里该是……"


  // 【涂错山脉位置】——应该涂松石绿
  dlg_color_wrong_mountain: {
    id: 'dlg_color_wrong_mountain',
    title: '白玛',
    lines: [
      '白玛看着度母身后的山脉：',
      '「山脉涂了这个颜色……」',
      { text: '「度母身后是她的土地。土地是绿色的——松石绿。藏人把绿松石嵌在额头上，因为它是大地的心。山脉该涂松石绿。」', isKeyLine: true },
    ],
    // 白玛不说"错了"，她从文化含义出发引导——"土地是绿色的"
  },


  // 【涂错脸庞位置】——应该涂骨白
  dlg_color_wrong_face: {
    id: 'dlg_color_wrong_face',
    title: '白玛',
    lines: [
      '白玛看着度母的面容：',
      '「度母的脸……不该是这个颜色。」',
      { text: '「度母的面容是最净的——骨白。不是石灰白，不是云白，是氆氇磨成粉的白。一个人的最后布施，变成度母的脸。脸庞该涂骨白。」', isKeyLine: true },
    ],
    // 白玛再次提到氆氇——玩家已经知道骨白的来源，白玛的话既是提示也是呼应
  },


  // 【涂错护法火焰位置】——应该涂朱砂红
  dlg_color_wrong_fire: {
    id: 'dlg_color_wrong_fire',
    title: '白玛',
    lines: [
      '白玛看着度母身侧的火焰纹：',
      '「护法之焰……不该是这个颜色。」',
      { text: '「火焰是朱砂红——三次火煅才从石头变成的红。不是温暖的红，是护持的红。护法火焰涂朱砂，意为她在燃烧——烧掉无知、烧掉恐惧。火焰该涂朱砂红。」', isKeyLine: true },
    ],
    // 白玛用"护持的红"区分朱砂红和别的红色——不是暖色，是淬炼色
  },


  // 【涂错天空位置】——应该涂佛青
  dlg_color_wrong_sky: {
    id: 'dlg_color_wrong_sky',
    title: '白玛',
    lines: [
      '白玛看着度母的身色区域：',
      '「度母的身色……天空不该是这个颜色。」',
      { text: '「天空是佛青——虚空之蓝，看见真相之色。不是普通的蓝，是高原最深夜空的那种蓝。度母身涂佛青，意为她是虚空——无处不在，永远在看。天空该涂佛青。」', isKeyLine: true },
    ],
    // 白玛区分佛青和普通蓝——"不是普通的蓝，是虚空之蓝"
  },


  // 【涂错莲台底座位置】——应该涂藏金
  dlg_color_wrong_lotus: {
    id: 'dlg_color_wrong_lotus',
    title: '白玛',
    lines: [
      '白玛看着度母脚下的莲台：',
      '「莲台底座……不该是这个颜色。」',
      { text: '「莲台是藏金——苦中之光。藏金莲只在最冷的地方绽放，越冷越亮。度母站在一朵莲花上——莲花从泥里长出来，金光从苦里长出来。莲台该涂藏金。」', isKeyLine: true },
    ],
    // 白玛最后的提示把"苦中之光"和莲台连接——
    // 暗示这幅画的根基是"苦"，但站在苦上面的东西是"光"
  },

  // ----- 玩法五：煨桑仪式 -----


  // 【仪式成功演出】
  dlg_weisang_success: {
    id: 'dlg_weisang_success',
    title: '演出',
    lines: [
      '所有声音突然消失。',
      '煨桑烟笔直升起，直入天空。',
      { text: '风停了。措钦村从来不曾这么安静过。', isKeyLine: true },
      '远处有门轴转动的声音——旦增家的门，开了。旦增从家里走出来，站在院子里，抬头看着煨桑台的烟。',
      '村民们陆续从各家走出来，远远地站着，没有人说话，没有人靠近。他们只是……看着。',
    ],
  },

  dlg_weisang_success_baima: {
    id: 'dlg_weisang_success_baima',
    title: '白玛',
    lines: [
      '白玛走到煨桑台边，没有看玩家，看着烟，说了一句：',
      { text: '「……可以了。」', isKeyLine: true },
    ],
    // 仪式成功后：
    // - 藏獒走到玩家脚边蹲下
    // - 此后旦增会主动找玩家（而非玩家找他）
    // - 系统提示：「煨桑仪式成功完成。」
  },


  // ----- 玩法六：制作唐卡 -----

  // 【煨桑成功后旦增主动找玩家】
  dlg_danzeng_ch4_before_paint: {
    id: 'dlg_danzeng_ch4_before_paint',
    title: '旦增',
    lines: [
      '旦增走到玩家面前——这是他十二年来第一次主动走向任何人。',
      { text: '「你点了烟。……现在你可以画了。我给你看一样东西。」', isKeyLine: true },
      '旦增打开卧室里从未开过的木箱——',
      '里面是：妻子的黑白照片 + 一块白色氆氇的残余。',
      '旦增看着照片，没有说话——但玩家第一次看到旦增的表情不是"沉默"，是"记得"。',
      { text: '「……她。」', isKeyLine: true },
    ],
  },

  // 【构图完成旁白】
  dlg_tangka_composition_narration: {
    id: 'dlg_tangka_composition_narration',
    title: '旁白',
    lines: [
      '度母的轮廓，在画布上显现。她站在这片山之间，右手持莲，左手护佑——和照片上的一样。',
      { text: '「……你画的是她的形。接下来，你要画的是她的魂。」', isKeyLine: true },
    ],
  },

  // 【颜色完成旁白】
  dlg_tangka_color_narration: {
    id: 'dlg_tangka_color_narration',
    title: '旁白',
    lines: [
      { text: '「五种颜色，五种意义——佛青是看见，朱砂是淬炼，藏金是光明，松石是慈悲，骨白是涅槃。……旦增当年一笔一笔地涂上去，每一种颜色都是他的一生。你现在做的，和他当年做的一样。」', isKeyLine: true },
    ],
  },

  // 【左眼谜题提示】
  dlg_tangka_leftEye_hint: {
    id: 'dlg_tangka_leftEye_hint',
    title: '系统提示',
    lines: [
      { text: '度母的左眼——残卷说「此眼需画师以心中所念入笔」。你画这只眼睛的时候，心里想的是什么？', isKeyLine: true },
    ],
    playerOptions: [
      '旦增的妻子。',
      '祖父。',
      '（其他答案）',
    ],
    // 答案正确（旦增的妻子）→ 谜题解开
    // 答案错误 → 系统提示：「……不是'帮'。是'一个人'。旦增画这只眼睛的时候，心里只有一个名字。你能猜到那个名字吗？」
    // 玩家重新选择→答案正确后解开
  },

  // 【左眼完成旁白】
  dlg_tangka_leftEye_narration: {
    id: 'dlg_tangka_leftEye_narration',
    title: '旁白',
    lines: [
      { text: '「度母的左眼——微睁，半开半闭。看见真相，但不开口。……你画这只眼睛的时候，心里想的是一个人。旦增当年也是这样——他心里只有一个名字，他把那个人的目光画进了度母的眼睛。这只眼睛不是量度出来的，不是模仿出来的——是从心里画出来的。」', isKeyLine: true },
    ],
  },

  // 【唐卡完成】
  dlg_tangka_complete: {
    id: 'dlg_tangka_complete',
    title: '系统提示',
    lines: [
      { text: '唐卡绘制完成。度母护法图——你替旦增再画了一次。', isKeyLine: true },
    ],
    // 链尾：触发玩法七（展示与赠予）
  },


  // ----- 玩法七：展示与赠予·旦增破心魔 -----

  // 【展示给格桑】
  dlg_gesang_ch4_show: {
    id: 'dlg_gesang_ch4_show',
    title: '格桑',
    lines: [
      '格桑看着唐卡，嘴巴张开又合上——他不知道该说什么：',
      '「……你画的。」',
      '格桑停顿，翻出自己的素描——那张他画了很多次但一直画不对的度母像：',
      '「我画了好多次……不像。你画的……像。」',
      { text: '「我阿古能画这种画吗？……他以前能。」', isKeyLine: true },
    ],
  },

  // 【展示给白玛】
  dlg_baima_ch4_show: {
    id: 'dlg_baima_ch4_show',
    title: '白玛',
    lines: [
      '白玛看着唐卡，手指停在骨白区域——她认出了那个颜色：',
      '「……这个白色。」',
      '白玛停顿5秒：',
      { text: '「画它的人，把命画进去了。你替他画了——但这个白色，还是她的。」', isKeyLine: true },
      '白玛看着玩家：',
      { text: '「你得把这个交给他。不是给我，不是给格桑——是给他。他等了十二年，就等这一幅画重新出现在他面前。」', isKeyLine: true },
    ],
  },

  // 【展示给卓玛】
  dlg_zhuoma_ch4_show: {
    id: 'dlg_zhuoma_ch4_show',
    title: '卓玛',
    lines: [
      '卓玛看着唐卡，没有说话——停顿约10秒：',
      '「……像。」',
      '卓玛停顿，看着画框里的度母：',
      '「和我小时候在经堂里看到的那幅……几乎一模一样。」',
      '卓玛声音变轻——第一次不是干练的语气：',
      '「我爸画的那幅……他画了四十九天。你画了多久？」',
      '卓玛停顿，然后重新恢复干练语气：',
      { text: '「好了。你该把这个交给他了。他不会来找你的——你得去找他。」', isKeyLine: true },
    ],
  },

  // 【展示给仁青】
  dlg_renqing_ch4_show: {
    id: 'dlg_renqing_ch4_show',
    title: '仁青',
    lines: [
      '仁青看着唐卡，很认真地对比自己的照片：',
      '「……和我拍到的几乎一模一样。除了——」',
      '仁青指着胸前模糊区域，现在唐卡上那里是空白——一面镜子还没画：',
      '「这个部分。照片里永远模糊，你画的……你也没画？」',
      { text: '「也许这一块本来就不该画。度母的镜子——是空的。照见自己，照见众生。……你画空了，可能是对的。」', isKeyLine: true },
    ],
  },

  // 【最终赠予：旦增接过唐卡】
  dlg_danzeng_ch4_give_open: {
    id: 'dlg_danzeng_ch4_give_open',
    title: '旦增',
    lines: [
      '旦增站在院子里——煨桑仪式成功后，他开始走出院子了。',
      '旦增看着玩家手里的唐卡——他没有伸手：',
      { text: '「……你画完了。」', isKeyLine: true },
    ],
    playerOptions: [
      '给你。',
      '这是你妻子的。',
      '（把唐卡放在旦增面前的桌子上，不说话）',
    ],
    nextDialogueId: 'dlg_danzeng_ch4_give_r2',
    // 【AI生成指引】
    // 选A → 旦增伸手接过唐卡（第一次伸手触碰）→ 手指停在骨白区域 → 停顿15秒 →「……她。」
    // 选B → 旦增停顿5秒：「……你知道了。」→伸手接过→手指停在骨白→
    //   「你知道这个白色是从哪里来的。……那你也知道——我为什么十二年不说话。」
    // 选C → 旦增看着桌上的唐卡，没有伸手→停顿15秒→终于伸手拿起来→手指停在骨白→「……她。」
  },

  dlg_danzeng_ch4_give_r2: {
    id: 'dlg_danzeng_ch4_give_r2',
    title: '旦增',
    lines: [
      '旦增（无论玩家如何回应，手指都停在骨白区域）：',
      '旦增看着唐卡上的度母——度母的左眼微睁，半开半闭：',
      { text: '「……这只眼睛。」', isKeyLine: true },
      '旦增停顿3秒：',
      { text: '「你画对了。」', isKeyLine: true },
      '旦增更轻地——几乎是自言自语：',
      { text: '「她……还看着我。」', isKeyLine: true },
    ],
    nextDialogueId: 'dlg_danzeng_ch4_finale',
  },

  // 【旦增走进经堂·收束演出】
  dlg_danzeng_ch4_finale: {
    id: 'dlg_danzeng_ch4_finale',
    title: '演出',
    lines: [
      '旦增拿着唐卡，走向经堂——十二年来他第一次自己走进经堂。',
      '他把唐卡挂在那个空画框里——画框不再空了。',
      '旦增站在画前，手指停在骨白区域。他不再沉默——他开始念六字真言。',
      { text: '「唵嘛呢叭咪吽。」', isKeyLine: true },
      '这是十二年来旦增第一次在经堂里念六字真言。',
      '藏獒走到经堂门口蹲下——以前它蹲在旦增院子门口，现在它蹲在经堂门口。',
      '白玛站在经堂外，看着烟，看着旦增，没有说话。',
      '卓玛站在村委会门口，看着经堂，没有说话。',
      '格桑站在村口，远远地看着，没有说话。',
      '村民们在各自的家门口站着——没有人说话，没有人靠近。他们只是看着。',
      { text: '风声回来了。经幡声回来了。奶牛的声音回来了。措钦村的声音，回来了。', isKeyLine: true },
    ],
    // 【系统提示】：第四章完成。唐卡已挂回经堂。旦增走出了院子。
    //   你做的这一切，不只是复刻了一幅画——你帮一个人找回了他的信仰。
  },

  // ===================================================================
  // ===== 第五章：抉择与结局（来源：GDD & 结局设计详细版 v1.0） =====
  // ===================================================================
  //
  // 【第五章定位】
  // 按照 GDD「抵达→试探→裂缝→经堂→抉择与结局」的五章结构，
  // 第四章以旦增接过唐卡走进经堂收束叙事主线。
  // 第五章是玩家的内省时刻——不是「接下来做什么」，而是「这一切意味着什么」。
  // 游戏不做圆满解答，不展示"后来怎样"。在旦增心开始松动的瞬间收束。
  //
  // 【设计原则（来源：结局设计详细版）】
  // - 留白结局：不交代唐卡是否找回、旦增是否完全走出心结
  // - 视听序列：90 秒拉远镜头 + BGM 消散 + 纯黑屏 + credits
  // - 无文字结语：不封口，让玩家带着感受离开
  //

  // ----- 第五章·转折：从"做"到"看" -----

  dlg_ch5_transition: {
    id: 'dlg_ch5_transition',
    title: '内心OS',
    lines: [
      '村子安静下来了。',
      '经堂的门还开着。旦增还在里面。',
      '我站在院子里。风吹过来——不再是刚来村口时那种陌生的风。它经过了经堂、煨桑台、玛尼堆，经过了旦增的手，经过了祖父的笔记。',
      { text: '祖父说——「措钦村的风，什么都记得。」', isKeyLine: true },
      '我现在有点明白他的意思了。',
      '我不是来找一幅画的。我是来替一个人，把没画完的东西画完。',
      '也不是替他。',
      '是替两个人。',
      { text: '……旦增说「她……还看着我。」那句话里，有两个人。', isKeyLine: true },
    ],
    // 链尾：自动进入视听演出序列
    nextDialogueId: 'dlg_end_cinematic_phase1',
  },

  // ===== 第五章·留白结局：视听演出 =====
  // 核心原则：不做圆满解答。不解释"后来怎样"。不在结束画面上放文字总结。
  // 游戏在旦增把唐卡挂回画框后，进入视听序列。总时长约90秒。
  // 【特别说明】以下节点为视听演出指令，不是传统对话节点。
  // 由引擎按时间线自动推进，玩家无交互。


  // ----- 第一段：静止（0-15秒） -----
  dlg_end_cinematic_phase1: {
    id: 'dlg_end_cinematic_phase1',
    title: '演出·静止',
    lines: [
      '【画面】旦增站在经堂里，面对画框上的唐卡。背影。夕阳从门外照进来，灰尘在光里浮着。',
      '【镜头】固定，不移动。玩家看着旦增的背影。',
      { text: '【声音】完全安静。只有经堂里微弱的风声（门开着，风穿过）。', isKeyLine: true },
    ],
    // 持续15秒后自动进入第二段
    nextDialogueId: 'dlg_end_cinematic_phase2',
  },


  // ----- 第二段：镜头拉远（15-40秒） -----
  dlg_end_cinematic_phase2: {
    id: 'dlg_end_cinematic_phase2',
    title: '演出·拉远',
    lines: [
      '【镜头开始缓慢拉远】',
      '旦增的背影 → 经堂内部全景（空画框不再空了） → 经堂门口（夕阳照着石阶） → 经堂外面的院子 → 院子门口',
      { text: '【BGM升起】藏族竹笛独奏从单音开始，不急不缓。不悲伤，不欢快，不激昂——只是「在路上」的感觉。', isKeyLine: true },
      '20-35秒：竹笛旋律展开 + 极微弦乐铺底。旋律简单，不超过8个音符的变化。',
      '35-40秒：旋律开始稀薄。',
    ],
    // 持续25秒后自动进入第三段
    nextDialogueId: 'dlg_end_cinematic_phase3',
  },


  // ----- 第三段：村庄全景（40-60秒） -----
  dlg_end_cinematic_phase3: {
    id: 'dlg_end_cinematic_phase3',
    title: '演出·村庄',
    lines: [
      '【镜头继续拉远】',
      '旦增的院子 → 村庄（炊烟、经幡、玛尼堆） → 山坡上的煨桑台 → 村口（格桑坐在石头上） → 远处的山脊线',
      { text: '【BGM稀薄】笛声渐弱，弦乐也渐弱。环境音层开始接管——风声、远处诵经、偶尔的犬吠。', isKeyLine: true },
      '45-55秒：环境音层成为主体，BGM几乎听不见了。',
      '55-60秒：BGM完全消散。只剩风声。',
    ],
    // 持续20秒后自动进入第四段
    nextDialogueId: 'dlg_end_cinematic_phase4',
  },


  // ----- 第四段：消散（60-80秒） -----
  dlg_end_cinematic_phase4: {
    id: 'dlg_end_cinematic_phase4',
    title: '演出·消散',
    lines: [
      '【镜头停在山脊线上】夕阳最后的金光落在山顶。画面中没有人，只有山和风。',
      { text: '【BGM完全消散】只剩风声。', isKeyLine: true },
      '65-75秒：纯风声。山脊线画面。',
      '75-80秒：风声渐消。',
    ],
    // 持续20秒后自动进入第五段
    nextDialogueId: 'dlg_end_cinematic_phase5',
  },


  // ----- 第五段：黑屏（80-90秒） -----
  dlg_end_cinematic_phase5: {
    id: 'dlg_end_cinematic_phase5',
    title: '演出·黑屏',
    lines: [
      '【画面缓缓暗下去】不是"关掉"，而是"日落"般的自然暗化。',
      '【风声也渐渐消失】',
      { text: '【完全安静 + 纯黑屏】持续约5秒。', isKeyLine: true },
      '然后——credits缓缓浮现。',
      '【没有结语文字。没有"山麓的风还在吹"。没有任何总结性语句。】',
      '纯黑屏 → credits → 结束。',
    ],
    // 链尾：游戏结束
    // 设计师批注：
    // - 为什么不做文字结语？文字结语会"封口"——把留白变成"有答案"。纯黑屏让玩家自己带着感受离开。
    // - 为什么BGM要消散而不是持续到credits？旋律上路了，然后消散在风里——"声音也上路了"。credits阶段完全安静。
    // - 为什么镜头从旦增拉到山脊线？"你该走了"。外来者做了有意义的事，然后继续上路。
    // - 为什么旦增不说话？他已经说了最关键的话。经堂里的静止是松动的沉默——他不需要再说什么了。
  },
};
