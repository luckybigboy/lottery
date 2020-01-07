/*
 * @Author: chengengfeng
 * @Date: 2018-01-05 09:16:45
 * @Last Modified by: chengengfeng
 * @Last Modified time: 2019-06-28 14:36:46
*/

window.lorrery = {
  grandPrize: {step: 'grandPrize', prizeName: '特等奖', quantity: 1, prize: './image/grand-prize.png'},
  firstPrize: {step: 'firstPrize', prizeName: '一等奖', quantity: 6, prize: './image/first-prize.png'},
  secondPrize: {step: 'secondPrize', prizeName: '二等奖', quantity: 8, prize: './image/second-prize.png'},
  thirdPrize: {step: 'thirdPrize', prizeName: '三等奖', quantity: 12, prize: './image/third-prize.png'},
  fourthPrize: {step: 'fourthPrize', prizeName: '四等奖', quantity: 16, prize: './image/fourth-prize.png'},
  data: [],
  init0: [],
  init1: [],
  init2: [],
  init3: [],
  init4: [],
  p0Count: 1, // 特等奖数量
  p1Count: 6, // 一等奖数量
  p2Count: 8, // 二等奖数量
  p3Count: 12, // 三等奖数量
  p4Count: 16, // 四等奖数量
  p0Winner: [],
  p1Winner: [],
  p2Winner: [],
  p3Winner: [],
  p4Winner: [],
  // allWinner: [],
  isRuning: false,
  isRun: false,
  key: 0,
  timer: null,
  username: '',
  randomKey: 0,
  autoRandom: '',
  uname: '',
  maxLen: 0,
  count: 1, // 当不是再次点击就立马获取得奖者的时候，这里要设置为0
  currentPrize: 'fourthPrize', // 当前默认奖项
  // presentPrize: '', //
  currentArr: [],  // 当前默认奖项
  excludeArr: [],
  exArr: [],
  hasDom: false,
  delay: 500, // 延迟时长
  start: function(type) {
    switch (type) {
      case 'fourthPrize':
        this.hasDom = false;
        this.getName(type, this.p4Winner, this.p4Count);
        this.currentArr = this.init4;
        this.exArr = this.pushArr([this.init3, this.init2, this.init1, this.init0]);
      break;
      case 'thirdPrize':
        this.hasDom = false;
        this.getName(type, this.p3Winner, this.p3Count);
        this.currentArr = this.init3;
        this.exArr = this.pushArr([this.init2, this.init1, this.init0]);
      break;
      case 'secondPrize':
        this.hasDom = false;
        this.getName(type, this.p2Winner, this.p2Count);
        this.currentArr = this.init2;
        this.exArr = this.pushArr([this.init1, this.init0]);
      break;
      case 'firstPrize':
        this.hasDom = false;
        this.getName(type, this.p1Winner, this.p1Count);
        this.currentArr = this.init1;
        this.exArr = this.pushArr([this.init0]);
      break;
      case 'grandPrize':
        this.hasDom = false;
        this.getName(type, this.p0Winner, this.p0Count);
        this.currentArr = this.init0;
      break;
      default:
        return;
      break;
    }
  },
  getName: function(type, arr, counts) {
    this.currentPrize = type;
    if(this.isRun) {
      return;
    }
    if(!this.isRuning) {
      if (!this.data.length) {
        alert('无参与人员！');
        return;
      }
      // 如果等于最后一个奖项，并且抽取的人数和预定的人数一致
      if (type === 'grandPrize' && (arr.length >= this.p0Count)) {
        this.isRuning = false;
        alert("所有奖项抽取完毕！");
        window.clearInterval(this.timer);
        return;
      } else {
        this.startTrun();
        $(".btn").attr('src', './image/btn-stop.png');
      }
    } else {
      var that = this;

      $(".btn").html("抽取中").addClass('dis');

      that.run(type, arr);
      window.clearInterval(that.timer);
      this.autoRandom = setInterval(function() {
        if((arr.length + 1) > counts) { // 如果奖项只有1人的时候，前面获取了
          window.clearInterval(that.timer);
          window.clearInterval(that.autoRandom);
          that.isRun = false;
          that.hasDom = true;
          that.count = 1; 
          // console.log('///////////////////////////////////')
        } else {
          if(that.isRuning) {
            that.count++;
            that.run(type, arr);
            window.clearInterval(that.timer);
          } else {
            that.startTrun();
          }
        }
      }, that.delay);
    }
  },
  run: function(type, arr) {
    // console.log('======= current run：' + type);
    this.isRun = true;
    if (this.isRun) {
      $(".btn").attr('src', './image/btn-ing.png').addClass('dis');
    }

    if (type === 'grandPrize') {
      if (arr.length < (this.p0Count -1)) { // 中奖人数不止一个的时候
        this.pause(false, true);
        // $(".btn").text("抽取完毕");
        $(".btn").attr('src', './image/btn-end.png');
      } else { // 中奖人数只有一个的时候
        window.clearInterval(this.autoRandom);
        this.undo(false, true);
        $('#next-wrapper').hide();
      }
    } else if (type === 'firstPrize') {
      if (arr.length < (this.p1Count -1)) {
        // this.pause(false, true);
        // $(".btn").text("抽取完毕");
        if (this.count % 3 === 0) {
          this.pause(false, true);
        }
      } else {
        window.clearInterval(this.autoRandom);
        this.undo(false, true);
      }
    } else if (type === 'secondPrize') {
      if (arr.length < (this.p2Count - 1)) {
        if (this.count % 4 === 0) {
          this.pause(false, true);
        }
      } else {
        window.clearInterval(this.autoRandom);
        this.undo(false, true);
      }
    } else if (type === 'thirdPrize') { 
      if (arr.length < (this.p3Count - 1)) {
        if(this.count % 4 === 0) {
          this.pause(false, true);
        }
      } else {
        window.clearInterval(this.autoRandom);
        this.undo(false, true);
      }
    } else if (type === 'fourthPrize') {
      if (arr.length < (this.p4Count - 1)) {
        if (this.count % 4 === 0) {
          this.pause(false, true);
        }
      } else {
        window.clearInterval(this.autoRandom);
        this.undo(false, true);
      }
    }
    this.endTrun();
  },
  pause: function(isRun, hasDom) { // 分段抽奖暂停操作
    window.clearInterval(this.timer);
    window.clearInterval(this.autoRandom);
    this.isRun = isRun;
    this.hasDom = hasDom;
    this.count = 1; 
    $(".btn").attr('src', './image/btn-start.png').removeClass('dis');
    setTimeout(function() {
      $('.owner-name').text('获奖名单');
    }, 0);
  },
  undo: function(isRun, hasDom) { // 当前奖项名次抽取完毕解绑操作
    window.clearInterval(this.timer);
    window.clearInterval(this.autoRandom);
    this.isRun = isRun;
    this.hasDom = hasDom;
    this.count = 1;
    $(".btn").attr('src', './image/btn-end.png').addClass('dis');
    $('#next-wrapper').show();
    setTimeout(function() {
      $('.owner-name').text('获奖名单');
    }, 0);
  },
  startTrun: function() {
    var that = this;
    window.clearInterval(that.timer);
    // this.timer = window.setInterval(trunName, Math.floor( Math.random()*50) );
    this.timer = window.setInterval(trunName, 10 );
  },
  endTrun: function() {
    this.isRuning = false;
    // window.clearInterval(this.timer);
    if (this.currentPrize === 'grandPrize') {
      this.p0Winner.push(this.uname || this.data[this.randomKey]);
      $(".owner-name").text(this.uname);
      this.data.removeByValue(this.uname);
      this.createSpanDom(this.uname);
      if (this.init0) {
        this.init0.splice(this.key, 1);
      }
    } else if (this.currentPrize === 'firstPrize') {
      this.p1Winner.push(this.uname || this.data[this.randomKey]);
      $(".owner-name").text(this.uname);
      this.data.removeByValue(this.uname);
      this.createULDom(this.uname);
      if (this.init1) {
        this.init1.splice(this.key, 1);
      }
    } else if (this.currentPrize === 'secondPrize') {
      this.p2Winner.push(this.uname || this.data[this.randomKey]);
      $(".owner-name").text(this.uname);
      this.data.removeByValue(this.uname);
      this.createULDom(this.uname);
      if (this.init2) {
        this.init2.splice(this.key, 1);
      }
    } else if (this.currentPrize === 'thirdPrize') {
      this.p3Winner.push(this.uname || this.data[this.randomKey]);
      $(".owner-name").text(this.uname);
      this.data.removeByValue(this.uname);
      this.createULDom(this.uname);
      if (this.init3) {
        this.init3.splice(this.key, 1);
      }
    } else if (this.currentPrize === 'fourthPrize') {
      this.p4Winner.push(this.uname || this.data[this.randomKey]);
      $(".owner-name").text(this.uname);
      this.data.removeByValue(this.uname);
      this.createULDom(this.uname);
      if (this.init4) {
        this.init4.splice(this.key, 1);
      }
    }
  },
  setPrizeInfo: function(obj) {
    console.log('当前抽取：' + obj.quantity + ' 名');
    $('#grade').attr('src', obj.prize);
  },
  setPrize: function(prize) {
    $('.btn').data('step', prize.step);
    this.currentArr = [];
    this.exArr = [];
    this.excludeArr = [];
  },
  setNextPrize: function(p1, p2, flag, target) { // p1 下一个奖项，p2 下一个奖项显示的信息
    this.setPrize(p1);
    this.setPrizeInfo(p2);
    this.removeDom(flag, target);
    $('.owner-name').text('获奖名单');
    $(".btn").removeClass("dis").attr('src', './image/btn-start.png');
    $('#next-wrapper').hide();
  },
  createULDom: function(text) {
    if (!$("ul.list").length) {
      $('span.grand-one-prize').remove();
      // 如果是二次一等奖添加得奖者样式
      if (this.currentPrize !== 'firstPrize2') {
        $('.winners-list').append('<ul class="list"></ul>');
      } else {
        $('.winners-list').append('<ul class="list only2"></ul>');
      }
      $('.list').append('<li class="fade">'+ text +'</li>');
    } else {
      $('.list').append('<li class="fade">'+ text +'</li>');
    }
    // 设置获奖者上边距，从三等奖到一等奖都需要设置
    if (this.currentPrize === 'thirdPrize' || this.currentPrize === 'firstPrize2') {
      $("ul.list").css({'margin-top': '20px'});
    }
  },
  createSpanDom: function(text) {
    $('ul.list').remove();
    $('span.grand-one-prize').remove();
    $('.winners-list').append('<span class="grand-one-prize fade"></span>');
    $('span.grand-one-prize').text(text);
  },
  removeDom: function(type, target) {
    if(this.hasDom && type !== 'gp') {
      $('span.grand-one-prize').remove();
      $(target).find("li").remove();
    } else if (type === 'gp' && this.hasDom){
      $(target).text('');
      $('ul.list').remove();
    }
  },
  initPagePrize: function() {
    this.setPrizeInfo(this.fourthPrize);
    return this;
  },
  getRandomName: function() {
    this.excludeArr = this.exArr;
    this.randomKey = this.randomNumBoth(0, (this.data.length-1));
    this.uname = this.data[this.randomKey];
    if (this.excludeArr.contains(this.uname)) {
      this.randomKey = this.randomNumBoth(0, (this.data.length-1));
      this.uname = this.data[this.randomKey];
    } else {
      this.username = this.data[this.randomKey];
    }
  },
  randomNumBoth: function (Min, Max){ // min ≤ r ≤ max
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range);
    return num;
  },
  randomNum: function(Min, Max) { // min ≤ r < max
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range);
    return num;
  },
  pushArr: function(arr) {
    var ret = [];
    for (var a = 0, b = arr.length; a < b; a++) {
      for( var i = 0; i < arr[a].length; i++) {
        ret.push(arr[a][i]);
      }
    }
    return ret;
  },
  shuffle: function(arr) { // shffle Array
    let _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
      let j = this.getRandomInt(0, i);
      let t = _arr[i];
      _arr[i] = _arr[j];
      _arr[j] = t;
    };
    return _arr;
  },
  getRandomInt: function(min, max) { // min ≤ r ≤ max
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};
Array.prototype.contains = function (val) {
  if (Object.prototype.toString.call(val) === '[object Array]') {
    for (var a = 0, b = val.length; a < b; a++) {
      if(this.indexOf(val[a]) >= 0) {
        return true;
      }
    }
  } else if (this.indexOf(val) >= 0) {
    return true;
  }
  return false;
};
Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
};
function trunName() {
  lorrery.isRuning = true;
  if (lorrery.currentArr && lorrery.currentArr.length) {
    lorrery.maxLen = lorrery.currentArr.length;
    lorrery.key = lorrery.randomNum(0, lorrery.maxLen);
    lorrery.uname = lorrery.currentArr[lorrery.key];
    if (lorrery.data.contains(lorrery.currentArr) && lorrery.data.contains(lorrery.uname)) {
      lorrery.randomKey = lorrery.randomNumBoth(0, (lorrery.data.length-1));
      lorrery.username = lorrery.data[lorrery.randomKey];
    } else if(lorrery.currentArr.length && !lorrery.data.contains(lorrery.currentArr) || !lorrery.data.contains(lorrery.uname) || lorrery.exArr.contains(lorrery.uname)) {
      lorrery.getRandomName();
    }
  } else {
    lorrery.getRandomName();
  }
  $(".owner-name").text(lorrery.username);
};

lorrery.initPagePrize().data = [
'林吉星',
'陈畅',
'马维佳',
'许尔扬',
'张丽敏',
'马志彬',
'章逸柔',
'周盈',
'李润金',
'李洁敏',
'廖斯纳',
'李淑娴',
'曹淑玲',
'吴莉莎',
'陈晓娜',
'许玉芬',
'黎咏欣',
'廖运红',
'陈雪花',
'郑单琪',
'罗丹阳',
'李婷',
'陈朝彬',
'杨惠卿',
'姚伟芃',
'梁家源',
'霍润鉴',
'陈展恒',
'陈柏开',
'陈家峻',
'刘文金',
'刘金标',
'刘凯勤',
'陈淑霞',
'刘洁超',
'潘秋莎',
'刘启聪',
'黄梓婷',
'曾浩斌',
'朱文婷',
'辛杰锋',
'林泳梅',
'杨丽芳',
'周健汉',
'董佳康',
'郭雨婷',
'郑燕凤',
'赵同豆',
'戴庭文',
'田兵兰',
'刘广宇',
'牛航凯',
'戴利玲',
'刘伊男',
'周丽娜',
'范瑞年',
'刘伟锋',
'唐银华',
'李琪龙',
'梁钰堂',
'魏卫勤',
'张丽玲',
'梁茜茜',
'阳金玲',
'黄建仁',
'刘振亚',
'罗鸣',
'谷月云',
'王轩',
'李明贵',
'何高洁',
'卢仲照',
'陈耿峰',
'欧阳杰军',
'张武平',
'翟由良',
'王丘丽',
'王丽萍',
'熊兰',
'高先凤',
'象沙沙',
'象丽君',
'曾石养',
'曾泽怡',
'梁媛',
'马丽',
'顾英',
'段新华',
'黄芸',
'王丽',
'周菊兰',
'任立滨',
'程静',
'黄伟琼',
'赵杰文',
'李霞',
'林晓华',
'杨嘉俊',
'关宝玉',
'何惠贞',
'邓意明',
'邓意焕',
'邓意银',
'陈慧映',
'梁少樱',
'黄景星',
'何旭峰',
'商喜梅',
'房广基',
'叶媛媛',
'叶配强',
'林东英',
'刘正坤',
'何长庆',
'余先凤',
'钟秀珍',
'李坪辉',
'陈军',
'赵凤英',
'陈乾',
'邓小凤',
'朱春华',
'肖美',
'麦俊锋',
'麦皓翔',
'何宝珠',
'陈铁柱',
'张耀珊',
'谭晓明',
'梁晓丽',
'肖宇航',
'彭伟芳',
'范月碧',
'梁广华',
'梁毅施',
'Alexender',
'袁志良',
'何嘉颖',
'黎佳韫',
'李茜乔',
'徐畅',
'袁玉万',
'万春喜',
'谭永帮',
'邹洪冬',
'方方园',
'欧培鸿',
'杨辉炽',
'徐洲',
'黄生友',
'袁柱彬',
'梁平平',
'熊可',
'莫永富',
'卜继璇',
'李浩慈',
'戴明杰',
'向晓芳',
'黄培泽',
'骆娟娟',
'赵欣',
'戴哲',
'苏静',
'徐惠芳',
'徐海彤',
'黎佳欣',
'邓晋龙',
'黎福财',
'崔惠玲',
'林瑞娥',
'黎惠文',
'潘瑞霞',
'邝家荣',
'梁月珍',
'车胜能',
'王慧娟',
'陆锦绣',
'朱锦文',
'许玲',
'郭铭扬',
'杨春明',
'林东海',
'曹丽银',
'冯珮莎',
'周少英',
'周美霞',
'郑文涛',
'黎锦诗',
'黎健镜',
'何凤鸣',
'何梓聪',
'周家南',
'崔晓君',
'周镜东',
'陈绮青',
'陈梅珍',
'张雪莲',
'欧翠颜',
'陈绮玲',
'唐云波',
'林仲桥',
'李智广',
'张惠庆',
'潘林添',
'李妙宇',
'黄凤娟',
'陈少云',
'何梅清',
'雷财娟',
'何锦明',
'张桂莲',
'彭火荣',
'汤永健',
'张忠',
'杨泽',
'李杨健',
'梁斌',
'赵兴秋',
'刘琼',
'刘奎军',
'庄洁慧',
'陈明康',
'周盈盈',
'谢志勇',
'黄峰',
'张国栋',
'许峻硕',
'陈聪',
'马腾',
'黄锦松',
'吴立坤',
'王顺发',
'甄巍',
'梁永林',
'刘镇山',
'杨健',
'许杰鑫',
'陈玉华',
'陈陆',
'魏子群',
'陈焕龙',
'江发强',
'张景开',
'张巨开',
'陈来开',
'黄萍娟',
'张梅芳',
'李其佳',
'吴永标',
'陈开智',
'何雪梅',
'温楚翘',
'董淑仪',
'董慧仪',
'董兰君',
'卢钻娣',
'谭伟钻',
'罗英华',
'何伟林',
'高焕莲',
'陈巧平',
'何结珍',
'陈好娟',
'何桂珍',
'邬丽玲',
'何风冰',
'邱盛全',
'朱玲珍',
'朱桂坤',
'胡银好',
'朱华珍',
'吴间梅',
'黎新强',
'何笑心',
'何丽笑',
'潘绮雯',
'梁伟红',
'邱桂红',
'何焕珍',
'余雪梅',
'黎映华',
'罗炜珠',
'谭少兰',
'郑优凤',
'李垣昌',
'李淑贤',
'吕七屏',
'谭彩容',
'张寿君',
'许钊辉',
'李尧仙',
'韦炯华',
'林锡庆',
'林虎青',
'王连阳',
'王树春',
'林南盛',
'林木泉',
'林惠娟',
'徐雅芳',
'杨秋娜',
'林怡曼',
'张春燕',
'郑旭豪',
'蔡目目',
'周和勇',
'李耀新',
'袁坤',
'莫佳淮',
'罗炳辉',
'吴敏',
'潘敏娟',
'吴秀芳',
'陈永安',
'黄笑兰',
'李培林',
'卢瑞兰',
'梁月莲',
'赵学阳',
'罗序谦',
'何孝全',
'曾连香',
'魏仁六',
'王霞',
'石博文',
'张玲',
'许星耀',
'卢笑红',
'肖宏亮',
'肖繆',
'卢桂贤',
'史俊杰',
'杨萍',
'姚利玲',
'陈迎甜',
'欧联兴',
'黄宇均',
'陈琳',
'钟翠金',
'蔡清瞿',
'蔡铨枝',
'何根英',
'马建菊',
'李丽珠',
'蔡锐贤',
'卢焕萍',
'陈凯澄',
'陈永光',
'陈金叶',
'陈金英',
'蔡钰怡',
'周日玲',
'周日莲',
'范彩云',
'邓玲芬',
'邓玉珍',
'李顺娴',
'范碧兰',
'郑炯华',
'钟启明',
'温维标',
'温建华',
'李顺心',
'周群英',
'周灵英',
'许嘉玲',
'谭江钊',
'潘丽芬',
'苏浩强',
'冯金燕',
'冯志明',
'谢敏聪',
'阮伟能',
'赵石飞',
'陈丹',
'罗清华',
'蔡梅艳',
'张金丽',
'张洁',
'杨芬芬',
'杨辉',
'杨晓雯',
'阮周桦',
'李式明',
'辛昭荣',
'郭秉霖',
'王其铭',
'于安波',
'宋海燕',
'高伟',
'杨萌',
'任善伯',
'周飞',
'符盼婷',
'潘米田',
'梁珊珊',
'韦国晓',
'颜琨',
'邱昌伟',
'吕黄敬',
'谭杭洲',
'洪志桥',
'徐春秀',
'唐艺灼',
'邓双全',
'邓双红',
'刘佑昌',
'梁便英',
'黄开叶',
'欧逸航',
'梁惠媚',
'潘润娟',
'陈源珊',
'余少基',
'杨淑婷',
'许永安',
'郭雪红',
'龙云',
'谢润池',
'谭伟杰',
'郭镇洪',
'张建雄',
'黄炳祺',
'陈居河',
'卢嘉仪',
'卢秀联',
'伍广浩',
'彭宇珩',
'高妙珊',
'黄雪敏',
'冯锦仪',
'苏坤贤',
'谭小莹',
'谭添标',
'刘东华',
'梁坚荣',
'黄合广',
'欧阳翠芳',
'黎小军',
'高敏芳',
'曾叶青',
'卢桂森',
'卢永强',
'梁巧华',
'于叶连',
'胡锡添',
'何颖梅',
'赵惠梅',
'苏泳瑜',
'冯键洋',
'杨少芬',
'麦娴娟',
'余境林',
'卢伟基',
'卢艳萍',
'何婉华',
'殷浩然'
];

  // set nextPrize
  $('#nextPrize').click(function() {
    // console.log(lorrery.currentPrize);
    if (lorrery.currentPrize === 'fourthPrize') {
      $("ul.list").removeClass('no4').removeClass('only2');
      lorrery.setNextPrize(lorrery.thirdPrize, lorrery.thirdPrize, 'tp', '.list');
    } else if (lorrery.currentPrize === 'thirdPrize') {
      $("ul.list").removeClass('no4').removeClass('only2');
      lorrery.setNextPrize(lorrery.secondPrize, lorrery.secondPrize, 'sp', '.list');
    } else if (lorrery.currentPrize === 'secondPrize') {
      $("ul.list").addClass('no4').removeClass('only2');
      lorrery.setNextPrize(lorrery.firstPrize, lorrery.firstPrize, 'fp', '.list');
    } else if (lorrery.currentPrize === 'firstPrize') {
      lorrery.setNextPrize(lorrery.grandPrize, lorrery.grandPrize, 'gp', 'span.grand-one-prize');
    }
  });

  // start lorrery
  $('.btn').click(function() {
    var type = $(this).data('step');
    lorrery.start(type);
  });
