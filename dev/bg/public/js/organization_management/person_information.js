/**
 * Created by licong on 2017/9/20.
 */
$(function () {
  var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)

  var optionList_global = undefined; // 基本信息显示列表(全局变量) -->  ['fullName', 'name']
  var paramsName = {
    'parent': '上级组织',
    'oid': '组织ID',
    'type': '组织类型',
    'fullName': '团组织全称',
    'name': '团组织简称',
    'enterpriseName': '企业微信名称',
    'mobile': '团组织联系电话',
    'email': '团组织电子邮箱',
    'administrativeOmpilation': '本级团组织行政编制数',
    'administrativeNumber': '行政编制实际配备数',
    'careerFormation': '本级团组织事业编制数',
    'serviceNumber': '事业编制实际配备数',
    'industryCategory': '单位所属行业类别',
    'username': '登录账号',
    'password': '密码',
    'secretaryName': '团组织书记姓名',
    'groupOrganizationCode': '团组织机构代码',
    'groupOrganizationWechatid': '团组织微信号',
    'groupOrganizationWeibo': '团组织微博号'
  };

  var typeName = {
    '1': '领导机关团组织',
    '2': '团委',
    '3': '团工委',
    '4': '团总支',
    '5': '团支部'
  };

  var industryCategoryName = {
    "1": "党政机关",
    "2": "事业单位（不含公立学校）",
    "3": "普通高等院校",
    "4": "职业教育学校",
    "5": "普通高中",
    "6": "初中",
    "7": "小学",
    "8": "国有企业",
    "9": "集体企业",
    "10": "非公企业",
    "11": "新社会组织（不含民办学校）",
    "12": "军队",
    "13": "武警",
    "14": "城市社区",
    "15": "农村",
    "16": "其他"
  };

  var additionList_global = ['secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo']; // 附加信息

  /**
   * 显示选项(基本信息、验证表单)
   * @param value {string} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
   */
  function showOption(value) {
    if(!value) {
      return;
    }
    var options = {
      // 领导机关团组织
      '1': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber'],
      // 基层团委
      '2': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile',  'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory'],
      // 团工委
      '3': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile',  'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory'],
      // 团总支
      '4': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile',  'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory'],
      // 团支部
      '5': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email',  'industryCategory'],
      // 超级管理员
      '6': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory']
    };

    optionList_global = options[value]; // 基本信息显示列表(全局变量)
  }

  if(account_global) {

    showOption(account_global.type); // 显示选项(基本信息、验证表单)

    var html= '';
    var html_addition = '';
    // 基本信息显示列表(全局变量)
    for(var i=0; i<optionList_global.length; i++) {
      var option = optionList_global[i];

      var text = ''; // 值

      if(option == 'type') { // 组织类型
        text = typeName[account_global[option]]; // 设置组织类型
      }else if (option == 'industryCategory') { // 单位所属行业类别
        text = industryCategoryName[account_global[option]]; // 设置单位所属行业类别
      }else {
        text = account_global[option];
      }

      text = text ? text : '';

      if(i%2 == 0){ // 偶数
        html += '<tr>';
      }
      if(option == 'enterpriseName') { // 企业微信名称
        html += '    <td>' + paramsName[option] + '：<span class="enterpriseName declaration">说明</span></td><td>' + text + '</td>';
      }else if(option == 'mobile') { // 团组织联系电话
        html += '    <td>' + paramsName[option] + '：<span class="mobile edit" style="color: #cf7721;cursor: pointer;">编辑</span></td><td>' + text + '</td>';
      }else {
        html += '    <td>' + paramsName[option] + '：</td><td>' + text + '</td>';
      }

      if(i%2 == 1){ // 基数
        html += '</tr>';
      }
    }
    if(i%2 == 1){ // 基数(最后一个补标签收尾)
      html += '</tr>';
    }
    $('table.base').append(html);

    $('#username').text(account_global.username); // 登录账号
    // 附加信息显示列表(全局变量)
    for(var i=0; i<additionList_global.length; i++) {
      var option = additionList_global[i];

      var text = account_global[option];

      text = text ? text : '';

      if(i%2 == 0){ // 偶数
        html_addition += '<tr>';
      }

      html_addition += '    <td>' + paramsName[option] + '：</td><td>' + text + '</td>';

      if(i%2 == 1){ // 基数
        html_addition += '</tr>';
      }
    }
    if(i%2 == 1){ // 基数(最后一个补标签收尾)
      html_addition += '</tr>';
    }
    $('table.addition').append(html_addition);
  }

  // 鼠标悬浮事件'说明' -- 企业微信名称
  $('.base').on('mouseover', '.declaration', function () {
    $('#dialog_rules_enterpriseName').dialog('open'); // 显示 弹出框(企业微信名称)
  });

  // 点击'编辑' -- 团组织联系电话
  $('.base').on('click', '.mobile.edit', function () {
    Utils.toggleTab('修改团组织联系电话', 'view/organization_management/edit_mobile.html'); // 创建(打开)新面板(团组织联系电话页面)
  });
});