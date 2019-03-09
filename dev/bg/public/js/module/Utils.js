/**
 * Created by Administrator on 2017/7/29.
 */
$(function () {
  var declarationName = {
    // 我的团员
    'members_audit': '团员报到及资料修改审核', // 资料审核
    'reward_audit': '团员奖励审核', // 奖励审核
    'member_tuanganConversionMember': '将团员添加为团干', // 转为团干
    'members_applyForDeletion': '删除报错支部的团员', // 申请删除
    'members_confirmDeletion': '审核删除团员的申请' // 批准删除
  };

  //  鼠标悬浮事件 -- 数据表格工具栏按钮
  $(document.body).on('mouseover mouseout', '.panel.datagrid .datagrid-toolbar td a, .toolbar .linkbutton_box a', function (event) {
    if(event.type == 'mouseover') {
      var idName = $(this).attr('id');
      var top = $(this).offset().top + $(this).outerHeight() + 8;
      var left = $(this).offset().left;
      console.log('idName', idName);
      var text = declarationName[idName];
      if(text) {
        var html = '';
        // pointer-events: none;元素永远不会成为鼠标事件的target，避免抖动事件
        html += '<div class="tips_tool" style="pointer-events: none;position: fixed; left: ' + left + 'px; top: ' + top + 'px; z-index: 1; width: 140px; padding: 0 10px; font-size: 12px; line-height: 22px; background: #fff; color: #db4254; border: 1px solid #c8c8c8;">';
        html += ' <div class="my-red">' + text + '</div>';
        html += ' <div class="triangle_c8c8c8" style="position: absolute;left: 8px;top: -20px;z-index: 1;border: 10px solid;border-color: transparent transparent #c8c8c8 transparent;"></div>'; // 实三角(#c8c8c8)
        html += ' <div class="triangle_fff" style="position: absolute;left: 8px;top: -18px;z-index: 1;border: 10px solid;border-color: transparent transparent #fff transparent;"></div>'; // 白三角(#fff)
        html += '</div>';
        $(this).append(html);
      }
    } else if(event.type == 'mouseout') {
      $(this).find('.tips_tool').remove();
    }
  });

  // 鼠标点击事件 -- 说明文字
  $(document.body).on('click', '.declaration span', function () {
    var className = $(this).prop('className');

    if(!className) {
      return;
    }

    if(className.indexOf(' ') != -1) {
      className = className.substring(0, className.indexOf(' '));
    }
    $('#dialog_rules_' + className).dialog('open'); // 显示 弹出框
  });

  // 数据表格全选按钮
  $('.datagrid .panel-body .datagrid-view .datagrid-view1 .datagrid-header .datagrid-header-inner table tr td div.datagrid-header-check input').hover(function () {
    console.log('mouseenter');
    if($(this).parents('.datagrid-view').find('.tips_tool_input').length > 0) {
      $(this).parents('.datagrid-view').find('.tips_tool_input').show();
    }else {
      var html = '';
      html += '<div class="tips_tool_input" style="position: absolute; left: 34px; top: 40px; z-index: 1; width: 140px; padding: 0 10px; font-size: 12px; line-height: 22px; background: #fff; color: #db4254; border: 1px solid #c8c8c8;">';
      html += '<div class="my-red">选择当前页面的全部记录</div>';
      html += '<div class="triangle_c8c8c8" style="position: absolute;left: 8px;top: -10px;z-index: 1;border: 10px solid;border-color: transparent transparent #c8c8c8 transparent;border-top-width: 0;"></div>'; // 实三角(#c8c8c8)
      html += '<div class="triangle_fff" style="position: absolute;left: 8px;top: -8px;z-index: 1;border: 10px solid;border-color: transparent transparent #fff transparent;border-top-width: 0;"></div>'; // 白三角(#fff)
      html += '</div>';
      $(this).parents('.datagrid-view').append(html);
    }
  }, function () {
    console.log('mouseleave');
    $(this).parents('.datagrid-view').find('.tips_tool_input').hide();
  });
});

// 字符串两边去空格
String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

/**
 * 获得字符串实际长度，中文2，英文1
 * @returns {number} 长度
 */
String.prototype.getRealLen = function() {
  var realLength = 0, len = this.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = this.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
};

//日期格式化
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

var Utils = {};

/**
 * 验证ID，正确返回“true”，错误则返回错误信息
 * @param {Object} idCard
 */
Utils.checkIdCard = function(idCard) {
  //错误信息
  var status = ["true", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!"];

  //去掉首尾空格
  // idCard = trim(idCard.replace(/ /g, ""));
  idCard = trim(idCard);
  if(!idCard) {
    return '请输入身份证';
  }

  if (idCard.length == 15 || idCard.length == 18) {
    if (!checkArea(idCard)) {
      return status[4];
    } else if (!checkBrith(idCard)) {
      return status[2];
    } else if (idCard.length == 18 && !check18Code(idCard)) {
      return status[3];
    } else {
      return status[0];
    }
  } else {
    //不是15或者18，位数不对
    return status[1];
  }
};


/**
 * 验证身份证的地区码
 * @param {Object} idCard 身份证字符串
 */
function checkArea(idCard) {
  // 区域ID
  var areaMap = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };

  if (areaMap[parseInt(idCard.substr(0, 2))] == null) {
    return false;
  } else {
    return true;
  }
}


/**
 * 验证身份证号码中的生日是否是有效生日
 * @param idCard 身份证字符串
 * @return
 */
function checkBrith(idCard) {
  var result = true;

  if (15 == idCard.length) {
    var year = idCard.substring(6, 8);
    var month = idCard.substring(8, 10);
    var day = idCard.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
      result = false;
    }
  } else if (18 == idCard.length) {
    var year = idCard.substring(6, 10);
    var month = idCard.substring(10, 12);
    var day = idCard.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

    // 这里用getFullYear()获取年份，避免千年虫问题
    if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
      result = false;
    }
  } else {
    result = false;
  }

  return result;
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param idCardArr 身份证号码数组
 * @return
 */
function check18Code(idCardArr) {

  /**
   * 身份证15位编码规则：dddddd yymmdd xx p
   * dddddd：地区码
   * yymmdd: 出生年月日
   * xx: 顺序类编码，无法确定
   * p: 性别，奇数为男，偶数为女
   * <p />
   * 身份证18位编码规则：dddddd yyyymmdd xxx y
   * dddddd：地区码
   * yyyymmdd: 出生年月日
   * xxx:顺序类编码，无法确定，奇数为男，偶数为女
   * y: 校验码，该位数值可通过前17位计算获得
   * <p />
   * 18位号码加权因子为(从右到左) wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
   * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
   * 校验位计算公式：Y_P = mod( ∑(Ai×wi),11 )
   * i为身份证号码从右往左数的 2...18 位; Y_P为校验码所在校验码数组位置
   *
   */
    // 加权因子
  var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

  // 身份证验证位值.10代表X
  var valideCodeArr = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  var sum = 0; // 声明加权求和变量

  var verificationCode = idCardArr[17]; // 验证码
  if (idCardArr[17].toLowerCase() == 'x') {
    verificationCode = 10;// 将最后位为x的验证码替换为10方便后续操作
  }

  for (var i = 0; i < 17; i++) {
    sum += wi[i] * idCardArr[i];// 加权求和
  }

  var valCodePosition = sum % 11;// 得到验证码所位置
  if (verificationCode == valideCodeArr[valCodePosition]) {
    return true;
  } else {
    return false;
  }
}


//去掉字符串头尾空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// /**
//  * 验证姓名(不能为纯数字)
//  * @param name {string} 姓名
//  * @returns {boolean} (true：纯数字 -- 不通过，false：非纯数字)
//  */
// Utils.checkName = function(name) {
//     if(!name) {
//         return false;
//     }
//     var reg = /^[0-9]*$/;
//     return reg.test(name);
// };

/**
 * 验证姓名(不能为纯数字)
 * @param name {string} 姓名
 * @returns {number} (-1：name为空，1：含有数字，2：不是以中文开头或结尾，0：校验正确)
 */
Utils.checkName = function(name) {
  var flag = -1;
  var reg_num = /[0-9]{1,}/;
  // var reg_ch = /^[\u4E00-\u9FA5].*[\u4E00-\u9FA5]$/; // 中文开始，中文结束，中间可填充任何字符
  if(reg_num.test(name)) { // 含有数字
    flag = 1;
  }
  // else if(!reg_ch.test(name)) { // 不是以中文开头或结尾
  //     flag = 2;
  // }
  else { // 校验正确
    flag = 0;
  }
  return flag;
};

/**
 * 验证手机号码
 * @param mobile {string} 手机号码
 * @returns {boolean} 验证成功返回true，否则返回false
 */
Utils.checkMobile = function(mobile) {
  if(!mobile) {
    return false;
  }

  mobile = mobile.trim(); // 去空格

  var re = /^1\d{10}$/;
  return re.test(mobile);
};

/**
 * 验证手机号码
 * @param mobile {string} 手机号码
 * @returns {boolean} 验证成功返回true，否则返回false
 */
Utils.checkMobileOrTel = function(mobile) {
  if(!mobile) {
    return false;
  }

  mobile = mobile.trim(); // 去空格

  var re = /^1\d{10}$/;
  var tel = /^0\d{2,3}-?\d{7,8}$/;
  return re.test(mobile) || tel.test(mobile);
};

/**
 * 验证电子邮箱
 * @param email {string} 电子邮箱
 * @returns {boolean} 验证成功返回true，否则返回false
 */
Utils.checkEMail = function(email) {
  if(!email) {
    return false;
  }
  var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return re.test(email);
};

/**
 * 验证密码(六位数或以上数字字母结合)
 * @param password
 * @returns {boolean}
 */
Utils.checkPassword = function(password) {
  if(!password) {
    return false;
  }
  var re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/; // 由数字和字母组成，并且要同时含有数字和字母，且长度要在6位或以上
  return re.test(password);
};

/**
 * 验证只有字母或数字的组合
 * @param param {string} 请求参数
 * @returns {boolean}
 */
Utils.checkDigitOrLetter = function(param) {
  if(!param) {
    return false;
  }
  var re = /^[0-9a-zA-Z]+$/; // 由数字或字母组成
  return re.test(param);
};

/**
 * 检查特殊字符(企业代号)
 * @param param {string} 请求参数
 * @returns {boolean}
 */
Utils.checkSpecialSymbol = function(param) {
  if(!param) {
    return false;
  }
  var re = /^[^\\:\?”'<>\|\s]+$/; // 由数字或字母组成
  return re.test(param);
};


/**
 * 验证字节长度
 * @param str {string} 输入字符串
 * @param maxLen {int} 最大长度
 * @returns {boolean}
 */
Utils.checkByteLength = function(str, maxLen){
  console.log('Utils.checkByteLength str', str);
  console.log('Utils.checkByteLength maxLen', maxLen);
  var w = 0;
  for (var i=0; i<str.length; i++) {
    //charCodeAt()获取字符串中某一个字符的编码
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
      w++;
    } else {
      w+=2;
    }
    if (w > maxLen) {
      return false;
    }
  }

  return true;
};

/**
 * 获取URL的参数
 * @param name {string} 参数名称
 * @returns {*}
 */
Utils.getQueryString = function(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r) {
    // return  unescape(r[2]); // 中文会乱码，已废弃
    return  decodeURI(r[2]);
  }
  return null;
};

// /**
//  * 身份证出生日期用*替换
//  * @param IDCard {string} 身份证号码
//  * @returns {*}
//  * @constructor
//  */
// Utils.IDCardWithStars = function(IDCard) {
//     if(!IDCard || (IDCard.length != 15 && IDCard.length != 18)) {
//         return IDCard;
//     }
//
//     return IDCard.replace(/^(\d{6})(\d{8})(\d*)$/, "$1******$3"); // 440883199605233226 -> 440883********3226
// };


// <td id="dateOfDuty_anchor">任现职年月：</td>
/**
 * 跳到指定锚点(时间插件要加_anchor)
 * @param parentSelector {selector} jquery对象
 */
Utils.scrollToAnchor = function($parentSelector) {
  var $error = $parentSelector.find('label.error:visible:first').parents('tr').find('td>input');
  if(!$error || $error.length <= 0) {
    $error = $parentSelector.find('label.error:visible:first').parents('tr').find('td>textarea');
  }
  if($error && $error.length > 0) {
    var id = $error[0].id;
    // if($($error[0]).hasClass('easyui-datebox')) { // 时间插件
    if ($($error[0]).is(':hidden')) { // 时间插件/下拉框
      window.location.href = '#' + id + '_anchor';
      return;
    }
    window.location.href = '#' + id; // 普通输入框
  }else { // 自定义单选框
    var $error_checkbox = $parentSelector.find('label.error:visible:first').parents('tr').find('td:last');
    var id_checkbox = $error_checkbox[0].id;
    window.location.href = '#' + id_checkbox;
  }
};

/**
 * 显示权限按钮
 */
Utils.showLimitButtons = function() {
  var limits = Utils.getQueryString('limit'); // 权限

  $('body>.datagrid .datagrid-toolbar td').hide(); // 隐藏所有工具栏按钮(非弹出框，父节点非easyui-layout的datagrid工具栏按钮--没有筛选条件)
  $('.layout-panel>.layout-body>.panel.datagrid>.panel-body>.datagrid-toolbar td').hide(); // 隐藏所有工具栏按钮(非弹出框，父节点是easyui-layout的datagrid工具栏按钮--有筛选条件)
  $('.toolbar>.linkbutton_box').not('.show').hide(); // 隐藏所有工具栏按钮(自定义)
  // $('#tb .linkbutton_box').hide(); // 隐藏所有工具栏按钮(自定义)

  if(limits) {
    limits = limits.split(','); // 将字符串解析成数组
    for(var i=0; i<limits.length; i++) {
      var limit = limits[i];
      $('#' + limit).parent().show(); // 显示权限按钮
    }
  }
};

/**
 * 返回值(空值则返回undefined -- 直接废弃该参数，避免传参时出现 eg. name=)
 * @param value {string} 传入值
 * @returns {undefined}
 */
Utils.returnValidValue = function(value) {
  return value ? value : undefined;
};

/**
 * 返回值(null则返回空字符串，避免出现null)
 * @param value {string} 传入值
 * @returns {undefined}
 */
Utils.returnValidString = function(value) {
  return value ? value : '';
};

/**
 * 关闭/打开指定导航页面(左侧导航栏) -- 用处：需要权限页面
 * @param path {string} 页面路径
 * @param isOpen {boolean} 是否打开该页面(true：打开，false：关闭)
 */
Utils.toggleNav = function(path, isOpen) {
  if(!path) {
    return;
  }
  var $tabs = parent.$('#tabs');
  var $nav = parent.$('#nav');
  var $tab_menu = $nav.find('li>a[href^="' + path + '"]');
  if(!$tab_menu || $tab_menu.length <= 0) {
    $.alert('该页面不存在');
    return;
  }
  var text = $tab_menu.text(); // 左侧菜单名称
  if ($tabs.tabs("exists", text)) {
    //如果存在 变成被选中的状态
    $tabs.tabs("close", text); // 关闭该页面
  }
  if(isOpen) { // 打开该页面
    $tab_menu.click(); // 自调用 打开菜单(左侧菜单)
  }
};

/**
 * 关闭/创建(打开)新面板 -- 用处：不需权限页面
 * @param title {string} 面板标题
 * @param path {string} 面板路径
 * @returns {boolean}
 */
Utils.toggleTab = function(title, path) {
  //获取id=tabs的元素
  var $tabs = parent.$('#tabs');

  var text = title;

  if ($tabs.tabs("exists", text)) {
    //如果存在 关闭该页面
    $tabs.tabs("close", text);
  }

  if(path) { // 打开标签面板(路径存在)
    //如果不存在则添加
    $tabs.tabs('add', {
      title : text,
      closable : true,
      content : '<iframe scrolling="auto" frameborder="0"  src="' + path + '" style="width:100%;height:100%;"></iframe>' //创建面板内容
    });
  }

  $('html').scrollTop(0); // 滚动到顶部

  return false;
};

/**
 * 改变当前选中的页面标题
 * @param title {string} 标题名称
 */
Utils.changeTabTitle = function(title) {
  parent.$('#tabs>.tabs-header>.tabs-wrap>.tabs li.tabs-selected span.tabs-title').text(title);
};

/**
 * 返回当前选中的页面标题
 * @returns {*}
 */
Utils.returnTabTitle = function() {
  return parent.$('#tabs>.tabs-header>.tabs-wrap>.tabs li.tabs-selected span.tabs-title').text();
};

/**
 * 更新表格数据
 * @param $datagrid
 */
Utils.updateDataGrid = function ($datagrid) {
  var queryParams = $datagrid.datagrid('options').queryParams;
  var param = {};
  $.each(queryParams, function (key, value) {
    param[key] = value;
  });
  // 分页插件自动传递 page页码和rows页大小
  $datagrid.datagrid('reload', param); // 刷新数据表格
};

/**
 * 组织有效名称
 * @param name {string}  组织名称
 * @returns {string}
 */
Utils.validOrgName = function (name) {
  return name ? name : '该组织已被删除';
};

/**
 * 设置日期插件为年月日期插件
 * @param $obj {object} jquery对象
 */
Utils.setDateBoxYearMonth = function ($obj) {

  var $p_month_filter = $obj.datebox('panel'); //日期选择对象
  var $span_month_filter = $p_month_filter.find('.calendar-title span'); //显示月份层的触发控件

  $obj.datebox({
    onShowPanel: function () {//显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
      $span_month_filter.click(); //触发click事件弹出月份层
    },
    formatter: function (date) {
      // 选择时间大约当前时间(默认为当前时间)
      if(date.getTime() > new Date().getTime()) {
        return new Date().format('yyyy-MM');
      }

      return date.format('yyyy-MM');
    }
  });

  // 选择月份事件
  $p_month_filter.on('click', 'div.calendar-menu-month-inner td', function (e) {
    e.stopPropagation(); //禁止冒泡执行easyui给月份绑定的事件
    var year = $span_month_filter.html().split(' ')[1]; // 年份
    if(isNaN(year)) { // NaN
      return;
    }
    var month = parseInt($(this).attr('abbr'), 10); //月份 之前是这样的month = parseInt($(this).attr('abbr'), 10) + 1;
    month = month < 10 ? '0'+month : month;
    $obj.datebox('hidePanel') //隐藏日期对象
      .datebox('setValue', year + '-' + month); //设置日期的值
  });

  // 年份输入框按下回车键
  $p_month_filter.on('keypress', 'div.calendar-menu-year-inner .calendar-menu-year', function (e) {
    e.stopPropagation(); //禁止冒泡执行easyui给月份绑定的事件
    if(e.keyCode == 13){
      $obj.datebox('hidePanel'); //隐藏日期对象
    }

  });
};

/**
 * 获取上传文件的名称
 * @param url {string} 文件的url
 * @returns {string} 上传文件的截取名称(eg. http://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20181210/20181210095256_27_test1.pdf -> test1.pdf)
 */
Utils.getUploaderSuffixName = function (url) {
  var fullName = url.substring(url.lastIndexOf('/')+1);
  if(fullName) {
    var index = fullName.indexOf('_');
    if(index != -1) {
      index = fullName.indexOf('_', index+1);
      if(index != -1) {
        return fullName.substring(index+1);
      }
    }
  }
  return fullName;
};
