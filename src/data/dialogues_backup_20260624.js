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
      '箭头指向中间的小路，通向村子中央。',
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

  // ===== 格桑 —— 第一章主线剧情对话（来源：第一章对话设计详细版 v1.3） =====

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
  dlg_bedroom_locked: {
    id: 'dlg_bedroom_locked',
    title: '卧室门',
    lines: [
      '旦增卧室的门虚掩着，但你站在门廊下，忽然觉得不该贸然进去。',
      '那是他妻子的房间。也许在更了解他之后，他会愿意让你看些什么。',
    ],
  },
  dlg_temple_locked: {
    id: 'dlg_temple_locked',
    title: '经堂门',
    lines: [
      '厚重的木门上绘着褪色的莲花纹，门缝里透出一丝酥油灯的气息。',
      '门从里面闩着。',
      '也许卓玛或白玛中的一位，足够信任你，愿意带你来看一眼——但你得先让他们见过那幅唐卡。',
    ],
  },
  dlg_temple_opened_by_baima: {
    id: 'dlg_temple_opened_by_baima',
    title: '白玛',
    lines: [
      '白玛从经幡下站起，向你略一点头。',
      '"你带着唐卡来了。"',
      '他没多话，转身走到经堂门前，从怀里取出一把旧铜钥匙。',
      '铜锁咔嗒一声弹开，白玛推开门，酥油灯的火光从门缝里溢出来。',
      '"钥匙卓玛也有。但问过你的人不一样。"',
      '他侧身让开门口："进去吧。有些东西，等你自己看。"',
    ],
  },
  dlg_temple_opened_by_zhuoma: {
    id: 'dlg_temple_opened_by_zhuoma',
    title: '卓玛',
    lines: [
      '卓玛不知道什么时候跟到了经堂外，靠在石墙上看着你。',
      '"我还是来了。"',
      '她从腰间解下一串钥匙，挑出最旧的那把，插进铜锁。',
      '经堂的门在黄昏里慢慢推开，积年的尘土在空气中翻飞。',
      '"进去吧。我就在外面等你。"',
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
      '片狭长如柳眉，背面覆着一层白绒；花朵五瓣，色作暗红——叶正是残卷所记的「金颜草」。',
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
      '（骨白·已就绪）',
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
    image: '/images/tangka/photo_hand.png',
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
    image: '/images/tangka/photo_mountain.png',
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
    image: '/images/tangka/photo_hand.png',
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
    image: '/images/tangka/photo_mountain.png',
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
    image: '/images/tangka/photo_eye.png',
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
    image: '/images/tangka/photo_script.png',
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
    image: '/images/tangka/photo_mirror.png',
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

  // ─── 旦增卧室·旧木盒 ───
  dlg_old_wood_box: {
    id: 'dlg_old_wood_box',
    title: '旧木盒',
    lines: [
      '床角的矮柜上搁着一只旧木盒，盒盖紧闭，锁扣已经生了铜绿。',
      '木盒表面刻着细细的祥云纹，边缘有些磨损——看上去被反复打开过很多次。',
      '你轻轻推了推盒盖，纹丝不动，似乎锁着什么重要的东西。',
    ],
  },

  // ─── 旦增卧室·照片揭示（仅触发一次）───
  dlg_danzeng_photo_reveal: {
    id: 'dlg_danzeng_photo_reveal',
    title: '旦增',
    lines: [
      '你正要放下木盒，旦增不知什么时候站在了你身后。',
      { text: '他没有说话，只是伸手接过木盒，用拇指轻轻拂去盒盖上的灰。', isKeyLine: true },
      '「这是我妻子留下的。」他的声音很轻，像是在对自己说。',
      '铜锁在他指尖弹开——原来从未真的锁住，只是他从未在旁人面前打开过。',
      '盒子里是一张褪了色的黑白照片。一个女人站在经堂前，微微笑着，阳光落在她肩上。',
      '旦增的拇指停在照片边缘，没有碰到她的脸。他的眼神很深，像是隔着几十年的时间在看一个人。',
      '你忽然明白，那个在唐卡颜料里反复寻找的、在每一笔勾勒里小心藏着的——从来不是技艺。',
      { text: '旦增把盒盖轻轻合上，锁扣咔嗒一声落下。他的目光从照片上移开，看了你一眼，什么都没有再说——但你已经知道了很多。', isKeyLine: true },
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
};
