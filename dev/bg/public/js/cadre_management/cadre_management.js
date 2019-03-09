/**
 * Created by licong on 2017/10/9.
 */

$(function () {
  var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)
  var operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'
  var type_global = undefined; // 组织类型(全局变量)
  var tid_global = undefined; // 团干ID(全局变量)
  var taiid_global = undefined;  // 附加信息ID(全局变量)
  var missionBranch_global = undefined; // 所在团支部(全局变量)
  var mobile_global = undefined; // 手机号码(全局变量)
  var isMyCadre_global = false; // 该团干是否属于本组织(全局变量，true：是，false：否)
  // 参数(全局变量)
  var paramsList_global = ['createName', 'name', 'idCard', 'missionBranch', 'nation', 'nationInfo', 'politicalOutlook', 'degreeOfEducation', 'leagueForYears', 'isCadres', 'mobile'
    , 'incumbent', 'tuanganProperties', 'duty', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'dateOfDuty', 'isPartyCommitteeMember', 'thePartyYears', 'signUpForVolunteerTime'];

  var baseList_global = ['createName', 'name', 'idCard', 'missionBranch', 'nation', 'politicalOutlook', 'degreeOfEducation', 'leagueForYears',  'isCadres', 'mobile']; // 基本信息(团干ID，全局变量)
  // 附加信息 列表(全局变量)
  var additionList_global = ['incumbent', 'tuanganProperties', 'duty', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'dateOfDuty', 'isPartyCommitteeMember', 'thePartyYears', 'signUpForVolunteerTime']; // 附加信息(全局变量)

  var paramsName = {
    'createName': '基本信息首次录入组织',
    'name': '姓名',
    'idCard': '身份证号',
    'missionBranch': '所在团支部',
    'nation': '民族',
    'politicalOutlook': '政治面貌',
    'degreeOfEducation': '文化程度',
    'leagueForYears': '入团年月', // rtny
    'isCadres': '是否团干部',
    'mobile': '手机号码',

    'incumbent': '团内现任职务',
    'tuanganProperties': '团干部性质',
    'duty': '团干自行录入的职务',
    'learningUnit': '学习工作单位',
    'email': '电子邮箱',
    'qqNum': 'QQ',
    'wechatId': '微信号',
    'weibo': '微博号',
    // 'xzzny': '任现职年月',
    'dateOfDuty': '任现职年月', // rzzyn
    'isPartyCommitteeMember': '是否同级党委（支部）成员',
    'thePartyYears': '入党年月', // rdny
    'signUpForVolunteerTime': '注册志愿者时间' // zczyzsj
  };

  var jbxxId_global = undefined; // 基本信息(团干ID，全局变量)
  // 实名制(全局变量)
  var realName_global = {
    idCard: undefined, // 身份证
    name: undefined // 名称
  };

  // 状态名称
  var disabledName = {
    '1': '禁用',
    '0': '启用'
  };

  // 政治面貌名称
  var politicalOutlookName = {
    '1': '共青团员',
    '2': '中共党员',
    '3': '中共预备党员',
    '4': '群众'
  };

  // 文化程度名称
  var degreeOfEducationName = {
    '1': '博士',
    '2': '博士在读',
    '3': '硕士',
    '4': '硕士在读',
    '5': '普通本科',
    '6': '普通本科在读',
    '7': '普通专科',
    '8': '普通专科在读',
    '9': '普通高中',
    '10': '普通高中在读',
    '11': '中等职业教育',
    '12': '中等职业教育在读',
    '13': '初中',
    '14': '初中在读',
    '15': '小学'
  };

  // 民族名称
  var nationName = {
    '1': '汉族',
    '2': '壮族',
    '3': '满族',
    '4': '回族',
    '5': '苗族',
    '6': '维吾尔族',
    '7': '土家族',
    '8': '彝族',
    '9': '蒙古族',
    '10': '藏族',
    '11': '布依族',
    '12': '侗族',
    '13': '瑶族',
    '14': '朝鲜族',
    '15': '白族',
    '16': '哈呢族',
    '17': '哈萨克族',
    '18': '黎族',
    '19': '傣族',
    '20': '畲族',
    '21': '僳僳族',
    '22': '仡佬族',
    '23': '东乡族',
    '24': '拉祜族',
    '25': '水族',
    '26': '佤族',
    '27': '纳西族',
    '28': '羌族',
    '29': '土族',
    '30': '仫佬族',
    '31': '锡伯族',
    '32': '柯尔克孜族',
    '33': '达斡尔族',
    '34': '景颇族',
    '35': '毛南族',
    '36': '撒拉族',
    '37': '布朗族',
    '38': '塔吉克族',
    '39': '阿昌族',
    '40': '普米族',
    '41': '鄂温克族',
    '42': '怒族',
    '43': '京族',
    '44': '基诺族',
    '45': '德昂族',
    '46': '保安族',
    '47': '俄罗斯族',
    '48': '裕固族',
    '49': '乌孜别克族',
    '50': '门巴族',
    '51': '鄂伦春族',
    '52': '独龙族',
    '53': '塔塔尔族',
    '54': '赫哲族',
    '55': '高山族',
    '56': '珞巴族',
    '57': '其他'
  };

  // 是/否名称
  var yesOrNoName = {
    '1': '是',
    '2': '否'
  };

  // 团干部性质名称
  var tuanganPropertiesName = {
    '1': '专职',
    '2': '兼职',
    '3': '挂职'
  };

  // 实名认证名称
  var isRealName = {
    '10': '通过', // 通过
    '1': '校验中', // 银行未通过
    '2': '校验失败', // 阿里云未通过
    '3': '线下验证通过', // 线下验证通过
    '4': '校验中' // 银行定时未通过
  };

  // 是否入驻企业号名称
  var activateStatusName = {
    '1': '是',
    '2': '已禁用',
    '4': '否'
  };


  var zhtj_global = undefined; //  组织转移对象

  // 更新网格数据
  function refreshDG() {
    // 初始化数据网格
    $('#cadre_management').datagrid({
      title: '团干管理',  // 表格名称
      border: true,  // 表格是否显示边框
      columns:[[
        {field: 'name', title: '姓名', sortable: false},
        {field: 'idCard', title :'身份证号码', sortable: false},
        {field: 'isRealName', title:'实名认证状态', sortable: false, formatter: function(value, row, index){
            if (value){
              return isRealName[value];
            }
          }, styler: function(value,row,index){
            if (value && (value == 1 || value == 2)){ // 认证中、未通过
              return {class: 'warning'};
            }
          }},
        {field: 'mobile', title: '手机号', sortable: false},
        {field: 'degreeOfEducation', title:'文化程度', sortable: false, formatter: function(value, row, index){
            if (value){
              return degreeOfEducationName[value];
            }
          }},
        {field: 'nation', title: '民族', sortable: false, formatter: function(value, row, index){
            if (value){
              return nationName[value];
            }
          }},
        // {field: 'incumbent', title: '国内现任职务', sortable: false},
        {field: 'politicalOutlook', title: '政治面貌', sortable: false, formatter: function(value, row, index){
            if (value){
              return politicalOutlookName[value];
            }
          }},
        {field: 'disabled', title: '状态', sortable: false, formatter: function(value, row, index){
            if (value || value == 0){
              return disabledName[value];
            }
          }},
        {field: 'operatorId', title: '是否本组织运营者', sortable: false, formatter: function(value, row, index){
            if (account_global.oid == value){
              return '是';
            }
            return '否';
          }},
        {field: 'activateStatus', title: '是否入驻企业号', sortable: false, formatter: function(value, row, index){
            if (value || value == 0){
              return activateStatusName[value];
            }
          }}
      ]],
      loader: function (param, success, error) {
        console.log('loader param============', param);

        CadreManagementApi.getCadreList({
          page: param.page, // 当前页码
          rows: param.rows, // 每页记录数
          disabled: param.disabled, // 是否禁用(0-正常1-禁用)
          name: param.name, // 姓名
          idCard: param.idCard, // 身份证
          mobile: param.mobile // 手机号码
        }).then(function (data) {
          if(data.rows && data.rows.length <= 0) {
            var options = $('#cadre_management').datagrid('getPager').data("pagination").options;
            var curr = options.pageNumber; // 获取当前页
            if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
              success(data);
              error();
              return false;
            }
            $.alert('当前页是最后一页');
            console.log('curr', curr);
            $('#cadre_management').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
            error();
            return false;
          }
          success(data);

        }, function () {
          error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
        });
      },
      onBeforeLoad: function () {
        Utils.showLimitButtons(); // 显示权限按钮
      },
      onLoadSuccess: function () {
        $(this).datagrid("fixRownumber"); // 行号宽度自适应
      },
      fit: true, // 固定表头
      pagination: true,//如果表格需要支持分页，必须设置该选项为true
      pageNumber: 1, // 初始化页码
      pageSize: 20,   //表格中每页显示的行数
      pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
      rownumbers: true,   //是否显示行号
      nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
      // striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
      // method:'get',   //表格数据获取方式,请求地址是上面定义的url
      // sortName: 'dealTime',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
      // sortOrder: 'desc',  //使用倒序排序
      // idField: 'ID', // 指示哪个字段是标识字段
      // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
      loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
      singleSelect:true, // 设置为 true，则只允许选中一行
      frozenColumns: [[  //固定在表格左侧的栏
        {field: 'check', checkbox: true}
      ]],
      toolbar: [{
        iconCls: 'icon-my-add',
        text: '新增',
        id: 'tuangan_add',
        handler: function(){
          operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'

          $('#nationInfo').parents('tr').hide(); // 隐藏民族名称
          $('#isCadres').val('是'); // 重置 是否为团干部（是）

          // 弹窗位置居中
          // $("#dialog").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog').parents('.window').outerHeight())*0.5 });
          $('#dialog').dialog('open'); // 弹出对话框
        }
      }, '-', {
        iconCls: 'icon-my-edit',
        text: '编辑',
        id: 'tuangan_edit',
        handler: function(){
          var selectedData = $('#cadre_management').datagrid('getSelected');
          console.log('selectedData', selectedData);
          if(!selectedData) {
            $.alert('请选择需要操作的记录');
            return;
          }

          operation_global = '编辑'; // 当前操作(全局变量) -->  '新增'、'编辑'
          tid_global = selectedData.tid; // 团干ID(全局变量)
          taiid_global = selectedData.taiid; // 附加信息ID(全局变量)
          mobile_global = selectedData.mobile; // 手机号码(全局变量)

          // 基本信息显示列表(全局变量)
          for(var i=0; i<paramsList_global.length; i++) {
            var option = paramsList_global[i];
            if(option == 'nation' || option == 'politicalOutlook' || option == 'degreeOfEducation') {
              $('#' + option + '_edit').combobox('setValue', selectedData[option]); // 获取民族/政治面貌/文化程度
              continue;
            }
            if(option == 'isCadres') { // 是否为团干部
              $('#' + option + '_edit').val(yesOrNoName[selectedData[option]]);
              continue;
            }
            if(option == 'leagueForYears') {
              $('#' + option + '_edit').datebox('setValue', selectedData[option]); // 入团年月
              continue;
            }
            if(option == 'missionBranch') {
              missionBranch_global = selectedData.missionBranch; // 所在团支部(全局变量)
              $('#' + option + '_edit').val(selectedData['missionBranchName']); // 所在团支部
              continue;
            }

            if(option == 'duty') {
              var dutyCode = selectedData['dutyCode'];

              // 根据组织ID获取组织
              CadreManagementApi.getOrgByOid({oid: selectedData.oid}).then(function (data) {
                var organization = data.rows;
                type_global = organization.type; // 组织类型(全局变量)
                // 1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部，6：超管
                if(organization.type == 1) { // 领导机关团组织
                  // 获取团干自行录入的职务列表(领导机关团组织)
                  CadreManagementApi.getDutyList({}).then(function (data) {
                    var propertiesList = data.rows;
                    $('#dutyCode_edit').combobox('loadData', propertiesList);
                  });

                  if(selectedData['dutyCode'] == 1 || selectedData['dutyCode'] == 2) { // 书记/副书记
                    $('#dutyDesc_edit').parents('tr').hide(); // 隐藏 团干自行录入的职务(输入框)
                  } else {
                    $('#dutyDesc_edit').parents('tr').show(); // 显示 团干自行录入的职务(输入框)
                  }
                }else { // 非领导机关团组织
                  // 获取团干自行录入的职务列表(非领导机关团组织)
                  CadreManagementApi.getDutyOtherList({}).then(function (data) {
                    var propertiesList = data.rows;
                    $('#dutyCode_edit').combobox('loadData', propertiesList);
                  });

                  if(selectedData['dutyCode'] == 9) { // 其他
                    $('#dutyDesc_edit').parents('tr').show(); // 显示 团干自行录入的职务(输入框)
                  } else { // 非其他
                    $('#dutyDesc_edit').parents('tr').hide(); // 隐藏 团干自行录入的职务(输入框)
                  }
                }

                if(dutyCode) {
                  $('#dutyCode_edit').combobox('setValue', dutyCode); // 团干自行录入的职务(下拉框)
                  $('#dutyDesc_edit').val(selectedData['dutyDesc']); // 团干自行录入的职务(输入框)
                }
              });

              continue;
            }
            if(option == 'tuanganProperties') {
              $('#' + option + '_edit').combobox('setValue', selectedData[option]); // 团干部性质
              continue;
            }
            if(option == 'dateOfDuty') {
              $('#' + option + '_edit').datebox('setValue', selectedData['dateOfDuty']); // 任现职年月
              continue;
            }
            if(option == 'isPartyCommitteeMember') {
              $('#' + option + '_edit').combobox('setValue', selectedData[option]); // 是否同级党委（支部）成员
              continue;
            }
            if(option == 'thePartyYears') {
              $('#' + option + '_edit').datebox('setValue', selectedData['thePartyYears']); // 入党年月
              continue;
            }
            if(option == 'signUpForVolunteerTime') {
              $('#' + option + '_edit').datebox('setValue', selectedData['signUpForVolunteerTime']); // 注册志愿者时间
              continue;
            }

            $('#' + option + '_edit').val(selectedData[option]);
          }

          // 创建团干的组织ID 等于 本组织ID
          if(selectedData.oid == selectedData.createId) {
            $('#fm_edit').find('tr').show();
          }else {
            $('#fm_edit').find('tr').not('.check').hide(); // 只显示class=check的行
            $('#fm_edit').find('th').parents('tr').show(); // 显示标题(基本信息、附加信息)
          }

          if(selectedData['nation'] != 57) { // 其他(民族)
            $('#nationInfo_edit').parents('tr').hide(); // 隐藏 民族名称
          }

          // 弹窗位置居中
          $('#dialog_edit').dialog('open'); // 弹出对话框
        }
      }
        , '-', {
          iconCls: 'icon-my-view',
          text: '查看',
          id: 'tuangan_getTuanganInfoById',
          handler: function(){
            var selectedData = $('#cadre_management').datagrid('getSelected');
            console.log('selectedData', selectedData);
            if(!selectedData) {
              $.alert('请选择需要操作的记录');
              return;
            }

            // 根据组织ID获取组织
            CadreManagementApi.getTuanganInfoById({tid: selectedData.tid}).then(function (data) {
              console.log('CadreApi.getTuanganInfoById data', data);
              var myData = data.rows;
              var Own = data.Own; // 附加信息(本组织)
              var other = data.other; // 附加信息(其它组织)
              if(myData) {
                var html = '';
                // 基本信息/账号信息
                for(var i=0; i<baseList_global.length; i++) {
                  var option = baseList_global[i];

                  if(!myData[option]) { // null，直接返回(避免出现null)
                    continue;
                  }

                  var text = ''; // 值

                  if(option == 'missionBranch') { // 所在团支部
                    text = myData['missionBranchName'];
                  }else if (option == 'nation') { // 民族
                    text = nationName[myData[option]];
                    if(myData[option] == 57) { // 其他(民族)
                      text = nationName[myData[option]] + ' ' + myData['nationInfo']; // 民族 + 民族名称
                    }
                  }else if (option == 'politicalOutlook') { // 政治面貌
                    text = politicalOutlookName[myData[option]];
                  }else if (option == 'degreeOfEducation') { // 文化程度
                    text = degreeOfEducationName[myData[option]];
                  }
                  else if (option == 'isCadres') { // 是否为团干部
                    text = yesOrNoName[myData[option]];
                  }else {
                    text = myData[option];
                  }

                  html += '<div class="item">';
                  html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                  html += '</div>';
                }
                $('#dialog_view .list_box .list.base .content').html(html);

                var html_operator = '';
                // 运营者信息
                if(myData['operatorId']) { // 运营者(显示运营者信息)
                  html_operator += '<div class="item">';
                  html_operator += '    <span class="title">是否运营者：</span><span class="describe">是</span>';
                  html_operator += '</div>';
                  html_operator += '<div class="item">';
                  html_operator += '    <span class="title">运营的组织：</span><span class="describe">' + myData.operatorName + '</span>';
                  html_operator += '</div>';
                  html_operator += '<div class="item">';
                  html_operator += '    <span class="title">运营的职位标签 ：</span><span class="describe">' + myData.positionTheLabel + '</span>';
                  html_operator += '</div>';
                }else {
                  // html_operator += '<div>暂无信息</div>';
                  html_operator += '<div class="item">';
                  html_operator += '    <span class="title">暂无信息</span>';
                  html_operator += '</div>';
                }
                $('#dialog_view .list_box .list.operator .content').html(html_operator); // 运营者信息
              }

              var html_addition = '';
              var html_other = '';
              // 附加信息(本组织)
              if(Own && Own.length > 0) {
                var OwnData = Own[0];
                for(var i=0; i<additionList_global.length; i++) {
                  var option = additionList_global[i];

                  if(!OwnData[option] && option != 'duty') { // null 直接返回(除团干自行录入的职务)
                    continue;
                  }

                  var text = ''; // 值
                  if(option == 'tuanganProperties') { // 团干部性质
                    text = tuanganPropertiesName[OwnData[option]];
                  }else if(option == 'duty') { // 团干自行录入的职务
                    if(!OwnData['dutyCode']) {
                      continue;
                    }
                    var dutyName = {};
                    // 1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部，6：超管
                    if(OwnData.orgType == 1) { // 领导机关团组织
                      // 职务名称
                      dutyName = {
                        '1': '书记',
                        '2': '副书记',
                        '3': '常委',
                        '4': '委员',
                        '5': '工作人员',
                        '6': '候补委员'
                      };
                      text = dutyName[OwnData['dutyCode']];
                      if(OwnData['dutyCode'] != 1 && OwnData['dutyCode'] != 2) { // 非 书记/副书记
                        text = dutyName[OwnData['dutyCode']] + ' ' + OwnData['dutyDesc'];
                      }
                    }else { // 非领导机关团组织
                      // 职务名称
                      dutyName = {
                        '1': '书记',
                        '2': '副书记',
                        '3': '组织委员',
                        '4': '宣传委员',
                        '5': '文体委员',
                        '6': '生产委员',
                        '7': '权益委员',
                        '8': '志愿委员',
                        '9': '其他'
                      };
                      text = dutyName[OwnData['dutyCode']];
                      if(OwnData['dutyCode'] == 9) { // 其他
                        text = dutyName[OwnData['dutyCode']] + ' ' + OwnData['dutyDesc'];
                      }
                    }

                  }else if(option == 'isPartyCommitteeMember') { // 是否同级党委（支部）成员
                    text = yesOrNoName[OwnData[option]];
                  }else {
                    text = OwnData[option];
                  }

                  html_addition += '<div class="item">';
                  html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                  html_addition += '</div>';
                }
                console.log('html_addition', html_addition);

                // 在其他组织的职务信息
                html_other += '<div class="item my-red">';
                html_other += '    <span class="title">团干所属组织1：</span><span class="describe">' + OwnData.createName + '</span>';
                html_other += '</div>';
                if(OwnData.incumbent) {
                  html_other += '<div class="item">';
                  html_other += '    <span class="title">团内现任职务：</span><span class="describe">' + OwnData.incumbent + '</span>';
                  html_other += '</div>';
                }
                if(OwnData.tuanganProperties && tuanganPropertiesName[OwnData.tuanganProperties]) {
                  html_other += '<div class="item">';
                  html_other += '    <span class="title">团干部性质：</span><span class="describe">' + tuanganPropertiesName[OwnData.tuanganProperties] + '</span>';
                  html_other += '</div>';
                }

              }else {
                html_addition += '<div class="item">';
                html_addition += '    <span class="title">暂无信息</span>';
                html_addition += '</div>';
              }
              $('#dialog_view .list_box .list.addition .content').html(html_addition); // 附加信息

              // 在其他组织的职务信息
              if(other && other.length > 0) {
                // var html_other = '';
                var increment = 0;
                if(html_other) {
                  increment = 1;
                }
                for(var i=0; i<other.length; i++) {
                  var otherData = other[i];
                  html_other += '<div class="item my-red">';
                  html_other += '    <span class="title">团干所属组织' + (i+1+increment)  + '：</span><span class="describe">' + otherData.createName + '</span>';
                  html_other += '</div>';
                  if(otherData.incumbent) {
                    html_other += '<div class="item">';
                    html_other += '    <span class="title">团内现任职务：</span><span class="describe">' + otherData.incumbent + '</span>';
                    html_other += '</div>';
                  }
                  if(otherData.tuanganProperties && tuanganPropertiesName[otherData.tuanganProperties]) {
                    html_other += '<div class="item">';
                    html_other += '    <span class="title">团干部性质：</span><span class="describe">' + tuanganPropertiesName[otherData.tuanganProperties] + '</span>';
                    html_other += '</div>';
                  }

                }
              }
              $('#dialog_view .list_box .list.other .content').html(html_other); // 在其他组织的职务信息

              $('#dialog_view').dialog('open'); // 弹出对话框
            });
          }
        }, '-', {
          iconCls: 'icon-my-enable',
          text: '启用',
          id: 'tuangan_enable',
          handler: function(){
            var selectedData = $('#cadre_management').datagrid('getSelected');
            console.log('selectedData', selectedData);
            if(!selectedData) {
              $.alert('请选择需要操作的记录');
              return;
            }

            if(selectedData.disabled == 0) { // 是否禁用(0-正常1-禁用)
              $.alert('该记录已经处于启用，不能启用');
              return;
            }

            // 团干启用
            CadreManagementApi.enable({taiid: selectedData.taiid}).then(function (data) {
              $.alert(data.msg).then(function () {
                Utils.updateDataGrid($('#cadre_management')); // 更新表格数据(团干管理)
              });
            });
          }
        }, '-', {
          iconCls: 'icon-my-disable',
          text: '禁用',
          id: 'tuangan_disable',
          handler: function(){
            var selectedData = $('#cadre_management').datagrid('getSelected');
            console.log('selectedData', selectedData);
            if(!selectedData) {
              $.alert('请选择需要操作的记录');
              return;
            }

            if(selectedData.disabled == 1) {
              $.alert('该记录已经处于禁用，不能禁用');
              return;
            }

            // 团干禁用
            CadreManagementApi.disable({taiid: selectedData.taiid}).then(function (data) {
              $.alert(data.msg).then(function () {
                Utils.updateDataGrid($('#cadre_management')); // 更新表格数据(团干管理)
              });
            });
          }
        }, '-', {
          iconCls: 'icon-my-delete',
          text: '删除',
          id: 'tuangan_delete',
          handler: function(){
            var selectedData = $('#cadre_management').datagrid('getSelected');
            console.log('selectedData', selectedData);
            if(!selectedData) {
              $.alert('请选择需要操作的记录');
              return;
            }

            // 检查团干附加信息
            CadreManagementApi.checkTuangan({tid: selectedData.tid}).then(function (data) {
              $.confirm(data.msg).then(function () {
                // 团干删除接口
                CadreManagementApi.delete({tid: selectedData.tid, taiid: selectedData.taiid, result: data.result}).then(function (data) {
                  Utils.updateDataGrid($('#cadre_management')); // 更新表格数据(团干管理)
                });
              });
            });
          }
        }, '-', {
          iconCls: 'icon-my-setting',
          text: '设置运营者',
          id: 'org_addUser',
          handler: function(){
            var selectedData = $('#cadre_management').datagrid('getSelected');
            console.log('selectedData', selectedData);
            if(!selectedData) {
              $.alert('请选择需要操作的记录');
              return;
            }

            if(selectedData.operatorId == selectedData.oid) { // 是本组织运营者
              $.alert('该团干已是本组织的运营者啦。');
              return;
            }
            if(selectedData.operatorId) {
              // $.alert('该团干已是' + selectedData.orgName + '组织的运营者，一个团干只能在一个组织担任运营者，所以您暂无法设置TA为本组织运营者。');
              $.alert('该团干已是' + selectedData.operatorName + '组织的运营者，一个团干只能在一个组织担任运营者，所以您暂无法设置TA为本组织运营者。');
              return;
            }

            tid_global = selectedData.tid; // 团干ID(全局变量)

            $('#name_cadre').val(selectedData.name); // 姓名
            $('#mobile_cadre').val(selectedData.mobile); // 手机号码
            $('#account_cadre').val(selectedData.mobile); // 登录账号
            $('#idCard_cadre').val(selectedData.idCard); // 身份证

            // 弹窗位置居中
            // $("#dialog_operator").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_operator').parents('.window').outerHeight())*0.5 });
            $('#dialog_operator').dialog('open'); // 弹出对话框
          }
        }, '-', {
          iconCls: 'icon-my-cancel',
          text: '取消运营者',
          id: 'org_deleteUser',
          handler: function(){
            var selectedData = $('#cadre_management').datagrid('getSelected');
            console.log('selectedData', selectedData);
            if(!selectedData) {
              $.alert('请选择需要操作的记录');
              return;
            }

            if(!selectedData.operatorId || selectedData.operatorId != account_global.oid) { // 非运营者/非本组织运营者
              $.alert('该团干没有在本组织担任运营者，此操作无效（组织只能取消团干在本组织的运营者身份）');
              return;
            }

            $.confirm('确定取消该团干在本组织的运营者身份？').then(function () {
              // 删除运营者
              CadreManagementApi.deleteTuanganOrg({tid: selectedData.tid}).then(function (data) {
                $.alert(data.msg).then(function () {
                  // // 分页插件自动传递 page页码和rows页大小
                  // $('#cadre_management').datagrid('load',{});
                  Utils.updateDataGrid($('#cadre_management')); // 更新表格数据(团干管理)
                });
              });
            });
          }
        }, '-', {
          iconCls: 'icon-my-reload',
          text: '重置运营者密码',
          id: 'org_resetPW',
          handler: function(){
            var selectedData = $('#cadre_management').datagrid('getSelected');
            console.log('selectedData', selectedData);
            if(!selectedData) {
              $.alert('请选择需要操作的记录');
              return;
            }

            if(!selectedData.operatorId) {
              $.alert('该记录不是运营者，无法重置运营者密码');
              return;
            }

            // $.alert('确定重置\"' + selectedData.name + '\"密码').then(function () {
            $.alert('确定重置运营者密码？').then(function () {
              // type {int} 类型(1：组织账号，2：运营者账号)
              CadreManagementApi.resetBatchOrgPW({userName: selectedData.mobile, type: 2}).then(function (data) {
                $.alert(data.msg).then(function () {
                  // // 分页插件自动传递 page页码和rows页大小
                  // $('#cadre_management').datagrid('load',{});
                  Utils.updateDataGrid($('#cadre_management')); // 更新表格数据(团干管理)
                });
              });
            });

          }
        }
      ]
    });


    // Utils.showLimitButtons(); // 显示权限按钮

    init_missionBranch(); // 所在团支部(需要初始化的事件)
  }

  // 新增(需要初始化的事件)
  function init_add() {
    var isClick = false; // 是否点击(false：未点击，true：已点击)

    // 新增 -- 对话框
    $('#dialog').dialog({
      cache: false,
      onClose: function () {
        $('#fm').form('clear'); // 对话框关闭前，清除表单数据
        $('#fm input').val(''); // 对话框关闭前，清除表单数据(type='number')
        $('label.error').remove(); // 移除错误信息
      },
      buttons: [{
        text:'取消',
        handler:function(){
          $('#dialog').dialog('close'); // 关闭对话框
        }
      },{
        text:'确定',
        handler:function(){
          var messages = {
            'nation': '请选择民族',
            'politicalOutlook': '请选择政治面貌',
            'degreeOfEducation': '请选择文化程度',
            'leagueForYears': '请选择入团年月',
            'tuanganProperties': '请选择团干部性质'
          };

          var params = {};

          // 验证
          var validate = {
            rules: {
              'name': {
                required: true,
                checkName: true
              },
              'idCard': {
                required: true,
                checkIdCard: true
              },
              'missionBranch': {
                required: true
              },
              'nationInfo': {
                required: true
              },
              'mobile': {
                required: true,
                checkMobile: true
              },
              'incumbent': {
                required: true
              }
            },
            messages: {
              'name': {
                required: '请输入姓名'
              },
              'idCard': {
                required: '请输入身份证号码'
              },
              'missionBranch': {
                required: '请选择所在团支部'
              },
              'nationInfo': {
                required: '请输入民族名称'
              },
              'mobile': {
                required: '请输入手机号码'
              },
              'incumbent': {
                required: '请输入团内现任职务'
              }
            },
            errorPlacement:function(error,element) { // 自定义错误放到哪里
              error.appendTo(element.parents("tr"));
            }
          };
          var validator = $('#fm').validate(validate);
          var validateFlag = validator.form(); // 验证表单，填写信息是否完整
          // 基本信息显示列表(全局变量)
          for(var i=0; i<paramsList_global.length; i++) {
            var option = paramsList_global[i];
            if(option == 'createName') {
              continue;
            }
            if(option == 'nation' || option == 'politicalOutlook' || option == 'degreeOfEducation') {
              params[option] = $('#' + option).combobox('getValue'); // 获取民族/政治面貌/文化程度
              if(!params[option]) {
                var html = '<label id="' + option + '-error" class="error">' + messages[option] + '</label>';
                $('#' + option).parents('tr').append(html);
                validateFlag = false;
              }
              continue;
            }
            if(option == 'isCadres') { // 是否为团干部
              params[option] = 1; // 自行设置为团干部(1: 是，2：否)
              continue;
            }

            if(option == 'leagueForYears') {
              params['rtny'] = $('#' + option).datebox('getValue'); // 入团年月
              if(!params['rtny']) {
                var html = '<label id="' + option + '-error" class="error">' + messages[option] + '</label>';
                $('#' + option).parents('tr').append(html);
                validateFlag = false;
              }
              continue;
            }
            if(option == 'missionBranch') {
              params[option] = missionBranch_global; // 所在团支部(全局变量)
              continue;
            }

            if(option == 'tuanganProperties') {
              params[option] = $('#' + option).combobox('getValue'); // 团干部性质
              if(!params[option]) {
                var html = '<label id="' + option + '-error" class="error">' + messages[option] + '</label>';
                $('#' + option).parents('tr').append(html);
                validateFlag = false;
              }
              continue;
            }
            if(option == 'dateOfDuty') {
              params['xzzny'] = $('#' + option).datebox('getValue'); // 任现职年月
              continue;
            }
            if(option == 'isPartyCommitteeMember') {
              params[option] = $('#' + option).combobox('getValue'); // 是否同级党委（支部）成员
              continue;
            }
            if(option == 'thePartyYears') {
              params['rdny'] = $('#' + option).datebox('getValue'); // 入党年月
              continue;
            }
            if(option == 'signUpForVolunteerTime') {
              params['zczyzsj'] = $('#' + option).datebox('getValue'); // 注册志愿者时间
              continue;
            }
            if(option == 'duty') { // 团干自行录入的职务
              continue;
            }

            if($('#' + option) && $('#' + option).length > 0) {
              params[option] = $('#' + option).val().trim(); // 去除两边空格
            }
          }
          if(!validateFlag) { // 表单填写未完成(combobox)
            Utils.scrollToAnchor($('#fm')); // 跳到指定锚点
            return;
          }

          if(isMyCadre_global) { // 该团干属于本组织
            $.alert('本组织已存在该记录，不能重复添加');
            return;
          }

          // 实名制验证不通过，且身份证和姓名都没修改
          if(realName_global.idCard && realName_global.name && realName_global.idCard == params.idCard && realName_global.name == params.name) {
            $.alert('实名认证失败,姓名与身份证不匹配,请修改');
            return;
          }

          if(isClick) { // 已点击
            return;
          }
          isClick = true; // 设置为 已点击
          $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

          // 验证团干是否重复(验证手机号码唯一性)
          CadreManagementApi.getTuanganByIdCardAndMobile({mobile: params.mobile}).then(function (data) {
            if(data.status != 'OK'){ // 该手机号码已存在
              // 重置实名制信息
              realName_global.idCard = undefined; // 身份证
              realName_global.name = undefined; // 姓名
              $.alert('该手机号码已存在');
              isClick = false; // 设置为 未点击
              $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
              return;
            }

            // 团干新增
            CadreManagementApi.add(params).then(function (data) {
              if(data.status == 'ALERT') { // 身份证实名制不通过
                realName_global.idCard = params.idCard; // 身份证
                realName_global.name = params.name; // 姓名
                $.alert(data.msg);
                isClick = false; // 设置为 未点击
                $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                return;
              }

              // 重置实名制信息
              realName_global.idCard = undefined; // 身份证
              realName_global.name = undefined; // 姓名

              $('#dialog').dialog('close'); // 关闭对话框
              $.alert(data.msg).then(function () {
                // 分页插件自动传递 page页码和rows页大小
                $('#cadre_management').datagrid('load',{});
              });
            }).always(function () {
              isClick = false; // 设置为 未点击
              $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
            });
          }, function () {
            isClick = false; // 设置为 未点击
            $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
          });

        }
      }]
    });

    // 点击'所在团支部'(新增团干，弹出框 -- 所在团支部)
    $('#missionBranch').click(function () {
      // 加载'所在团支部' 数据网格
      $('#datagrid_missionBranch').datagrid('load', {
        fullName: ''
      });
    });

    // 获取民族列表
    $('#nation').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getNationList({}).then(function (data) {
          var nationList = data.rows;
          if(!nationList || nationList.length <= 0) {
            $.alert('获取民族列表');
            error();
            return;
          }
          success(nationList);
        })
      },
      onSelect: function (selected) {
        $('#nation-error').remove(); // 移除民族错误提示信息
        if(selected.value == 57) { // 其他
          $('#nationInfo').parents('tr').show(); // 显示民族名称
        }else { // 56个民族
          $('#nationInfo').parents('tr').hide(); // 隐藏民族名称
        }
      }
    });

    // 获取政治面貌列表
    $('#politicalOutlook').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getPoliticalOutlookList({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取政治面貌列表');
            error();
            return;
          }
          success(data.rows);
        })
      }
    });

    // 获取文化程度列表
    $('#degreeOfEducation').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getDegreeOfEducationList({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取文化程度列表');
            error();
            return;
          }
          success(data.rows);
        })
      }
    });

    /****************** 日期插件年月开始 ********************/
    Utils.setDateBoxYearMonth($('#leagueForYears')); // 设置日期插件为年月日期插件(入团年月)
    Utils.setDateBoxYearMonth($('#dateOfDuty')); // 设置日期插件为年月日期插件(任现职年月)
    Utils.setDateBoxYearMonth($('#thePartyYears')); // 设置日期插件为年月日期插件(入党年月)
    Utils.setDateBoxYearMonth($('#signUpForVolunteerTime')); // 设置日期插件为年月日期插件(注册志愿者时间)
    /****************** 日期插件年月结束 ********************/

    // 是否同级党委（支部）成员
    $('#isPartyCommitteeMember').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getYesOrNo({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取是否列表');
            error();
            return;
          }
          success(data.rows);
        })
      }
    });


    // 获取团干部性质列表
    $('#tuanganProperties').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getTuanganProperties({}).then(function (data) {
          var propertiesList = data.rows;
          if(!propertiesList || propertiesList.length <= 0) {
            $.alert('获取团干部性质列表');
            error();
            return;
          }
          success(propertiesList);
        })
      },
      onSelect: function (selected) {
        $('#tuanganProperties-error').remove(); // 移除民族错误提示信息
      }
    });

    // 身份证(失去焦点)
    $('#idCard').blur(function () {
      var val = $(this).val().trim();
      if(!val) {
        return;
      }

      isMyCadre_global = false; // 该团干是否属于本组织(全局变量，true：是，false：否)

      // 验证团干是否重复
      CadreManagementApi.getTuanganByIdCardAndMobile({idCard: val}).then(function (data) {
        if(data.status == 'ALERT'){ // 团干已存在
          var html = '';
          var AdditionalInfoList = data.TuanganAdditionalInfo;
          if(AdditionalInfoList && AdditionalInfoList.length > 0) {
            for(var i=0; i<AdditionalInfoList.length; i++) {
              var AdditionalInfo = AdditionalInfoList[i];

              if(AdditionalInfo.oid == account_global.oid) { // 该团干属于本组织
                isMyCadre_global = true; // 该团干是否属于本组织(全局变量，true：是，false：否)
                $.alert('本组织已存在该记录，不能重复添加');
                return;
              }
            }
          }

          $('#dialog').dialog('close'); // 关闭对话框
          $.alert('该成员已是其他团组织的团干，点击查看详情').then(function () {
            jbxxId_global = data.rows.tid; // 基本信息(团干ID，全局变量)
            // 根据组织ID获取组织
            CadreManagementApi.getTuanganInfoById({tid: data.rows.tid}).then(function (data) {
              console.log('CadreApi.getTuanganInfoById data', data);
              var myData = data.rows;
              var Own = data.Own; // 附加信息(本组织)
              var other = data.other; // 附加信息(其它组织)
              if(myData) {
                var html = '';
                // 基本信息/账号信息
                for(var i=0; i<baseList_global.length; i++) {
                  var option = baseList_global[i];

                  if(!myData[option]) { // null，直接返回(避免出现null)
                    continue;
                  }

                  var text = ''; // 值

                  if(option == 'missionBranch') { // 所在团支部
                    text = myData['missionBranchName'];
                  }else if (option == 'nation') { // 民族
                    text = nationName[myData[option]];
                    if(myData[option] == 57) { // 其他(民族)
                      text = nationName[myData[option]] + ' ' + myData['nationInfo']; // 民族 + 民族名称
                    }
                  }else if (option == 'politicalOutlook') { // 政治面貌
                    text = politicalOutlookName[myData[option]];
                  }else if (option == 'degreeOfEducation') { // 文化程度
                    text = degreeOfEducationName[myData[option]];
                  }
                  // else if (option == 'rtny') { // 入团年月
                  //     text = myData['leagueForYears'];
                  // }
                  else if (option == 'isCadres') { // 是否为团干部
                    text = yesOrNoName[myData[option]];
                  }else {
                    text = myData[option];
                  }

                  html += '<div class="item">';
                  html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                  html += '</div>';
                }
                $('#dialog_exist .list_box .list.base .content').html(html);

                var html_operator = '';
                // 运营者信息
                if(myData['operatorId']) { // 运营者(显示运营者信息)
                  html_operator += '<div class="item">';
                  html_operator += '    <span class="title">是否运营者：</span><span class="describe">是</span>';
                  html_operator += '</div>';
                  html_operator += '<div class="item">';
                  html_operator += '    <span class="title">运营的组织：</span><span class="describe">' + myData.operatorName + '</span>';
                  html_operator += '</div>';
                  html_operator += '<div class="item">';
                  html_operator += '    <span class="title">运营的职位标签 ：</span><span class="describe">' + myData.positionTheLabel + '</span>';
                  html_operator += '</div>';
                }else {
                  // html_operator += '<div>暂无信息</div>';
                  html_operator += '<div class="item">';
                  html_operator += '    <span class="title">暂无信息</span>';
                  html_operator += '</div>';
                }
                $('#dialog_exist .list_box .list.operator .content').html(html_operator); // 运营者信息
              }

              var html_addition = '';
              var html_other = '';
              // 附加信息(本组织)
              if(Own && Own.length > 0) {
                var OwnData = Own[0];
                for(var i=0; i<additionList_global.length; i++) {
                  var option = additionList_global[i];

                  if(!OwnData[option] && option != 'duty') { // null 直接返回(除团干自行录入的职务)
                    continue;
                  }

                  var text = ''; // 值
                  if(option == 'tuanganProperties') { // 团干部性质
                    text = tuanganPropertiesName[OwnData[option]];
                  }else if(option == 'duty') { // 团干自行录入的职务
                    if(!OwnData['dutyCode']) {
                      continue;
                    }
                    var dutyName = {};
                    // 1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部，6：超管
                    if(OwnData.orgType == 1) { // 领导机关团组织
                      // 职务名称
                      dutyName = {
                        '1': '书记',
                        '2': '副书记',
                        '3': '常委',
                        '4': '委员',
                        '5': '工作人员',
                        '6': '候补委员'
                      };
                      text = dutyName[OwnData['dutyCode']];
                      if(OwnData['dutyCode'] != 1 && OwnData['dutyCode'] != 2) { // 非 书记/副书记
                        text = dutyName[OwnData['dutyCode']] + ' ' + OwnData['dutyDesc'];
                      }
                    } else { // 非领导机关团组织
                      if(OwnData['dutyCode'] == 9) { // 其他
                        text = dutyName[OwnData['dutyCode']] + ' ' + OwnData['dutyDesc'];
                      }
                    }

                  }else if(option == 'isPartyCommitteeMember') { // 是否同级党委（支部）成员
                    text = yesOrNoName[OwnData[option]];
                  }else {
                    text = OwnData[option];
                  }

                  html_addition += '<div class="item">';
                  html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                  html_addition += '</div>';
                }
                console.log('html_addition', html_addition);

                // 在其他组织的职务信息
                html_other += '<div class="item my-red">';
                html_other += '    <span class="title">团干所属组织1：</span><span class="describe">' + OwnData.createName + '</span>';
                html_other += '</div>';
                html_other += '<div class="item">';
                html_other += '    <span class="title">团内现任职务：</span><span class="describe">' + OwnData.incumbent + '</span>';
                html_other += '</div>';
                html_other += '<div class="item">';
                html_other += '    <span class="title">团干部性质：</span><span class="describe">' + tuanganPropertiesName[OwnData.tuanganProperties] + '</span>';
                html_other += '</div>';

              }else {
                html_addition += '<div class="item">';
                html_addition += '    <span class="title">暂无信息</span>';
                html_addition += '</div>';
              }
              $('#dialog_exist .list_box .list.addition .content').html(html_addition); // 附加信息

              // 在其他组织的职务信息
              if(other && other.length > 0) {
                // var html_other = '';
                var increment = 0;
                if(html_other) {
                  increment = 1;
                }
                for(var i=0; i<other.length; i++) {
                  var otherData = other[i];
                  html_other += '<div class="item my-red">';
                  html_other += '    <span class="title">团干所属组织' + (i+1+increment)  + '：</span><span class="describe">' + otherData.createName + '</span>';
                  html_other += '</div>';
                  html_other += '<div class="item">';
                  html_other += '    <span class="title">团内现任职务：</span><span class="describe">' + otherData.incumbent + '</span>';
                  html_other += '</div>';
                  html_other += '<div class="item">';
                  html_other += '    <span class="title">团干部性质：</span><span class="describe">' + tuanganPropertiesName[otherData.tuanganProperties] + '</span>';
                  html_other += '</div>';

                }
              }
              $('#dialog_exist .list_box .list.other .content').html(html_other); // 在其他组织的职务信息

              $('#dialog_exist').dialog('open'); // 弹出对话框
            });
          });
        }
      });
    });

    // 团干基本信息(已存在) -- 对话框
    $('#dialog_exist').dialog({
      cache: false,
      onClose: function () {
        $('#fm_exist').form('clear'); // 对话框关闭前，清除表单数据
      },
      buttons: [{
        text:'取消添加为团干',
        handler:function(){
          $('#dialog_exist').dialog('close'); // 关闭对话框
        }
      },{
        text:'继续添加为团干',
        handler:function(){
          $('#dialog_exist').dialog('close'); // 关闭对话框
          $('#dialog_exist_optional').dialog('open'); // 弹出对话框
        }
      }]
    });

    // 新增团干附加信息(已存在) -- 对话框
    $('#dialog_exist_optional').dialog({
      cache: false,
      onClose: function () {
        $('#fm_exist').form('clear'); // 对话框关闭前，清除表单数据
      },
      buttons: [{
        text:'取消',
        handler:function(){
          $('#dialog_exist_optional').dialog('close'); // 关闭对话框
        }
      },{
        text:'提交',
        handler:function(){
          var params = {
            jbxxId: jbxxId_global, // 基本信息ID(全局变量)
            incumbent: $('#incumbent_exist_optional').val().trim(), // 团内现任职务
            tuanganProperties: $('#tuanganProperties_exist_optional').combobox('getValue') // 团干部性质
          };

          // 验证
          var validate = {
            rules: {
              'incumbent_exist_optional': {
                required: true
              }
            },
            messages: {
              'incumbent_exist_optional': {
                required: '请输入团内现任职务'
              }
            },
            errorPlacement:function(error,element) { // 自定义错误放到哪里
              error.appendTo(element.parents("tr"));
            }
          };
          var validateFlag = $('#fm_exist_optional').validate(validate).form(); // 验证表单，填写信息是否完整
          if(!params['tuanganProperties']) {
            var html = '<label id="' + 'tuanganProperties_exist_optional' + '-error" class="error">请选择团干部性质</label>';
            $('#tuanganProperties_exist_optional').parents('tr').append(html);
            validateFlag = false;
          }
          console.log('validateFlag', validateFlag);
          if(!validateFlag) { // 表单填写未完成(combobox)
            return;
          }

          // 团干新增
          CadreManagementApi.add(params).then(function (data) {
            $('#dialog_exist_optional').dialog('close'); // 关闭对话框
            $.alert(data.msg).then(function () {
              // 分页插件自动传递 page页码和rows页大小
              $('#cadre_management').datagrid('load',{});
            });
          });

        }
      }]
    });

    // 获取团干部性质列表
    $('#tuanganProperties_exist_optional').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getTuanganProperties({}).then(function (data) {
          var propertiesList = data.rows;
          if(!propertiesList || propertiesList.length <= 0) {
            $.alert('获取团干部性质列表');
            error();
            return;
          }
          success(propertiesList);
        })
      },
      onSelect: function (selected) {
        $('#tuanganProperties_exist_optional-error').remove(); // 移除民族错误提示信息
      }
    });


    // 点击'团干部性质-？'
    $('.tuanganProperties_rules').click(function () {
      $('#dialog_tuanganProperties_rules').dialog('open'); // 弹出对话框
    });


    if(parent.window.zhtj) { // 团员转为团干
      zhtj_global = parent.window.zhtj; // 组织转移对象
      console.log('zhtj_global', zhtj_global);
      delete parent.window.zhtj; // 删除对象
      console.log('parent.window.zhtj', parent.window.zhtj);

      // 基本信息显示列表(全局变量)
      for(var i=0; i<paramsList_global.length; i++) {
        var option = paramsList_global[i];
        if(option == 'nation' || option == 'politicalOutlook') {
          $('#' + option).combobox('setValue', zhtj_global[option]); // 获取民族/政治面貌
          continue;
        }
        if(option == 'degreeOfEducation') { // 文化程度
          // 留空，团员是全日制学历，团干是文化程度，下拉框的值不对称
          continue;
        }

        if(option == 'isCadres') { // 是否为团干部
          $('#' + option).val(yesOrNoName[zhtj_global[option]]);
          continue;
        }
        if(option == 'leagueForYears') {
          $('#' + option).datebox('setValue', zhtj_global[option]); // 入团年月
          continue;
        }
        if(option == 'idCard') { // 身份证号码
          // 留空，身份证带有星号
          continue;
        }
        if(option == 'missionBranch') {
          missionBranch_global = zhtj_global.oid; // 所在团支部
          $('#' + option).val(zhtj_global['fullName']); // 所在团支部
          continue;
        }

        if(option == 'duty') {
          var dutyCode = zhtj_global['dutyCode'];
          $('#dutyCode_edit').combobox('setValue', dutyCode); // 团干自行录入的职务(下拉框)
          $('#dutyDesc_edit').val(zhtj_global['dutyDesc']); // 团干自行录入的职务(输入框)
          continue;
        }
        if(option == 'incumbent') { // 团内现任职务
          // 留空，团员是下拉框，团干是输入框
          continue;
        }
        if(option == 'tuanganProperties') {
          $('#' + option).combobox('setValue', zhtj_global[option]); // 团干部性质
          continue;
        }
        if(option == 'dateOfDuty') {
          $('#' + option).datebox('setValue', zhtj_global[option]); // 任现职年月
          continue;
        }
        if(option == 'isPartyCommitteeMember') {
          $('#' + option).combobox('setValue', zhtj_global[option]); // 是否同级党委（支部）成员
          continue;
        }
        if(option == 'thePartyYears') {
          $('#' + option).datebox('setValue', zhtj_global[option]); // 入党年月
          continue;
        }
        if(option == 'signUpForVolunteerTime') {
          $('#' + option).datebox('setValue', zhtj_global[option]); // 注册志愿者时间
          continue;
        }

        $('#' + option).val(zhtj_global[option]);
      }


      operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'

      $('#nationInfo').parents('tr').hide(); // 隐藏民族名称

      // 弹窗位置居中
      $('#dialog').dialog('open'); // 弹出对话框
    }
  }

  // 编辑(需要初始化的事件)
  function init_edit() {
    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 编辑 -- 对话框
    $('#dialog_edit').dialog({
      cache: false,
      onClose: function () {
        $('#fm_edit').form('clear'); // 对话框关闭前，清除表单数据
        $('#fm_edit input').val(''); // 对话框关闭前，清除表单数据
        $('label.error').remove(); // 移除错误信息
      },
      buttons: [{
        text:'取消',
        handler:function(){
          $('#dialog_edit').dialog('close'); // 关闭对话框
        }
      },{
        text:'确定',
        handler:function(){
          var messages = {
            'nation': '请选择民族',
            'politicalOutlook': '请选择政治面貌',
            'degreeOfEducation': '请选择文化程度',
            'leagueForYears': '请选择入团年月',
            'tuanganProperties': '请选择团干部性质'
          };

          var params = {};

          // 验证
          var validate_edit = {
            rules: {
              'missionBranch_edit': {
                required: true
              },
              'nationInfo_edit': {
                required: true
              },
              'mobile_edit': {
                required: true,
                checkMobile: true
              },
              'incumbent_edit': {
                required: true
              },
              'dutyDesc_edit': {
                required: true
              }
            },
            messages: {
              'missionBranch_edit': {
                required: '请选择所在团支部'
              },
              'nationInfo_edit': {
                required: '请输入民族名称'
              },
              'mobile_edit': {
                required: '请输入手机号码'
              },
              'incumbent_edit': {
                required: '请输入团内现任职务'
              },
              'dutyDesc_edit': {
                required: '请输入团干自行录入的职务信息'
              }
            },
            errorPlacement:function(error,element) { // 自定义错误放到哪里
              error.appendTo(element.parents("tr"));
            }
          };

          var validateFlag = $('#fm_edit').validate(validate_edit).form(); // 验证表单，填写信息是否完整

          // 基本信息显示列表(全局变量)
          for(var i=0; i<paramsList_global.length; i++) {
            var option = paramsList_global[i];
            if(option == 'createName' || option == 'name' || option == 'idCard') {
              continue;
            }
            if(option == 'nation' || option == 'politicalOutlook' || option == 'degreeOfEducation') {
              params[option] = $('#' + option + '_edit').combobox('getValue'); // 获取民族/政治面貌/文化程度
              if(!params[option]) {
                var html = '<label id="' + option + '-error" class="error">' + messages[option] + '</label>';
                $('#' + option + '_edit').parents('tr').append(html);
                validateFlag = false;
              }
              if(option == 'nation' && params[option] != 57) { // 其他(民族)
                $('#nationInfo_edit').val(''); // 清空 民族名称
              }
              continue;
            }
            if(option == 'isCadres') { // 是否为团干部
              params[option] = 1; // 1: 是，2：否
              continue;
            }
            if(option == 'leagueForYears') {
              params['rtny'] = $('#' + option + '_edit').datebox('getValue'); // 入团年月
              if(!params['rtny']) {
                var html = '<label id="' + option + '-error" class="error">' + messages[option] + '</label>';
                $('#' + option + '_edit').parents('tr').append(html);
                validateFlag = false;
              }
              continue;
            }
            if(option == 'missionBranch') {
              params[option] = missionBranch_global; // 所在团支部(全局变量)
              continue;
            }
            if(option == 'qqNum') { // QQ
              // params[option] = parseInt($('#' + option + '_edit').val().trim()); // 去除两边空格
              params[option] = $('#' + option + '_edit').val().trim(); // 去除两边空格
              continue;
            }

            if(option == 'tuanganProperties') {
              params[option] = $('#' + option + '_edit').combobox('getValue'); // 团干部性质
              if(!params[option]) {
                var html = '<label id="' + option + '-error" class="error">' + messages[option] + '</label>';
                $('#' + option + '_edit').parents('tr').append(html);
                validateFlag = false;
              }
              continue;
            }
            if(option == 'duty') {
              params['dutyCode'] = $('#dutyCode_edit').combobox('getValue'); // 团干自行录入的职务
              if(!params['dutyCode']) { // 团干自行录入的职务为空
                var html = '<label id="dutyCode_edit-error" class="error">请选择团干自行录入的职务</label>';
                $('#dutyCode_edit').parents('tr').append(html);
                validateFlag = false;
              }

              // 1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部，6：超管
              if(type_global == 1) { // 领导机关团组织
                if(params['dutyCode'] != 1 && params['dutyCode'] != 2) { // 书记/副书记
                  params['dutyDesc'] = $('#dutyDesc_edit').val().trim(); // 团干自行录入的职务信息
                }
              } else { // 非领导机关团组织
                if(params['dutyCode'] == 9) { // 其他
                  params['dutyDesc'] = $('#dutyDesc_edit').val().trim(); // 团干自行录入的职务信息
                }
              }

              continue;
            }

            if(option == 'dateOfDuty') {
              params['xzzny'] = $('#' + option + '_edit').datebox('getValue'); // 任现职年月
              continue;
            }
            if(option == 'isPartyCommitteeMember') {
              params[option] = $('#' + option + '_edit').combobox('getValue'); // 是否同级党委（支部）成员
              continue;
            }
            if(option == 'thePartyYears') {
              params['rdny'] = $('#' + option + '_edit').datebox('getValue'); // 入党年月
              continue;
            }
            if(option == 'signUpForVolunteerTime') {
              params['zczyzsj'] = $('#' + option + '_edit').datebox('getValue'); // 注册志愿者时间
              continue;
            }

            params[option] = $('#' + option + '_edit').val().trim(); // 去除两边空格
          }
          console.log('eidt params', params);
          if(!validateFlag) { // 表单填写未完成(combobox)
            Utils.scrollToAnchor($('#fm_edit')); // 跳到指定锚点
            return;
          }

          params.tid = tid_global; // 团干ID(全局变量)
          params.taiid = taiid_global; // 附加信息ID(全局变量)

          if(isClick) { // 已点击
            return;
          }
          isClick = true; // 设置为 已点击
          $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

          if(params.mobile != mobile_global) { // 手机号码已修改
            // 验证团干是否重复(验证手机号码唯一性)
            CadreManagementApi.getTuanganByIdCardAndMobile({mobile: params.mobile}).then(function (data) {
              if(data.status == 'ALERT'){ // 该手机号码已存在
                $.alert('该手机号码已存在');
                isClick = false; // 设置为 未点击
                $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                return;
              }

              // 团干修改
              CadreManagementApi.edit(params).then(function (data) {
                $('#dialog_edit').dialog('close'); // 关闭对话框
                $.alert(data.msg).then(function () {
                  // 分页插件自动传递 page页码和rows页大小
                  Utils.updateDataGrid($('#cadre_management')); // 更新表格数据(团干管理)
                });
              }).always(function () {
                isClick = false; // 设置为 未点击
                $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
              });
            }, function () {
              isClick = false; // 设置为 未点击
              $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
            });
          }else { // 手机号码未修改
            // 团干修改
            CadreManagementApi.edit(params).then(function (data) {
              $('#dialog_edit').dialog('close'); // 关闭对话框
              $.alert(data.msg).then(function () {
                // // 分页插件自动传递 page页码和rows页大小
                Utils.updateDataGrid($('#cadre_management')); // 更新表格数据(团干管理)
              });
            }).always(function () {
              isClick = false; // 设置为 未点击
              $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
            });
          }

        }
      }]
    });

    // 点击'所在团支部'(编辑团干，弹出框 -- 所在团支部)
    $('#missionBranch_edit').click(function () {
      // 加载'所在团支部' 数据网格
      $('#datagrid_missionBranch').datagrid('load', {
        fullName: ''
      });
    });

    // 获取民族列表
    $('#nation_edit').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getNationList({}).then(function (data) {
          var nationList = data.rows;
          if(!nationList || nationList.length <= 0) {
            $.alert('获取民族列表');
            error();
            return;
          }
          success(nationList);
        })
      },
      onSelect: function (selected) {
        $('#nation_edit-error').remove(); // 移除民族错误提示信息
        if(selected.value == 57) { // 其他
          $('#nationInfo_edit').parents('tr').show(); // 显示民族名称
        }else { // 56个民族
          $('#nationInfo_edit').parents('tr').hide(); // 隐藏民族名称
        }
      }
    });

    // 获取政治面貌列表
    $('#politicalOutlook_edit').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getPoliticalOutlookList({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取政治面貌列表');
            error();
            return;
          }
          success(data.rows);
        })
      }
    });

    // 获取文化程度列表
    $('#degreeOfEducation_edit').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getDegreeOfEducationList({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取文化程度列表');
            error();
            return;
          }
          success(data.rows);
        })
      }
    });

    // 是否同级党委（支部）成员
    $('#isPartyCommitteeMember_edit').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getYesOrNo({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取是否列表');
            error();
            return;
          }
          success(data.rows);
        })
      }
    });

    // 获取团干部性质列表
    $('#tuanganProperties_edit').combobox({
      valueField: 'value',
      textField: 'name',
      loader: function (param,success, error) {
        CadreManagementApi.getTuanganProperties({}).then(function (data) {
          var propertiesList = data.rows;
          if(!propertiesList || propertiesList.length <= 0) {
            $.alert('获取团干部性质列表');
            error();
            return;
          }
          success(propertiesList);
        })
      },
      onSelect: function (selected) {
        $('#tuanganProperties_edit-error').remove(); // 移除民族错误提示信息
      }
    });

    // 获取团干自行录入的职务列表
    $('#dutyCode_edit').combobox({
      valueField: 'value',
      textField: 'name',
      onSelect: function (selected) {
        $('#dutyCode_edit-error').remove(); // 移除团内现任职务错误提示信息
        if(type_global == 1) { // 领导机关团组织
          if(selected.value == 1 || selected.value == 2) { // 书记/副书记
            $('#dutyDesc_edit').parents('tr').hide(); // 隐藏
          }else {
            $('#dutyDesc_edit').parents('tr').show(); // 显示
            window.location.href = '#dutyDesc_edit'; // 跳到指定锚点(职务名称)
          }
        } else { // 非领导机关团组织
          if(selected.value == 9) { // 其他
            $('#dutyDesc_edit').parents('tr').show(); // 显示
            window.location.href = '#dutyDesc_edit'; // 跳到指定锚点(职务名称)
          }else {
            $('#dutyDesc_edit').parents('tr').hide(); // 隐藏
          }
        }
      }
    });

    /****************** 日期插件年月开始 ********************/
    Utils.setDateBoxYearMonth($('#leagueForYears_edit')); // 设置日期插件为年月日期插件(入团年月)
    Utils.setDateBoxYearMonth($('#dateOfDuty_edit')); // 设置日期插件为年月日期插件(任现职年月)
    Utils.setDateBoxYearMonth($('#thePartyYears_edit')); // 设置日期插件为年月日期插件(入党年月)
    Utils.setDateBoxYearMonth($('#signUpForVolunteerTime_edit')); // 设置日期插件为年月日期插件(注册志愿者时间)
    /****************** 日期插件年月结束 ********************/
  }

  // 数据筛选(需要初始化的事件)
  function init_datafilter() {
    // 状态
    $('#disabled_filter').combobox({
      width: 173,
      valueField: 'value',
      textField: 'name',
      data: [{
        value: '',
        name: '全部'
      },{
        value: '0',
        name: '启用'
      },{
        value: '1',
        name: '禁用'
      }]
    });

    // 点击搜索按钮 -- 数据筛选
    $('#filter').click(function () {
      var params = {
        disabled: $('#disabled_filter').combobox('getValue'), // 是否禁用(0-正常1-禁用)
        name: Utils.returnValidValue($('#name_filter').val().trim()), // 姓名
        idCard: Utils.returnValidValue($('#idCard_filter').val().trim()), // 身份证
        mobile: Utils.returnValidValue($('#mobile_filter').val().trim()) // 手机号码
      };

      // 分页插件自动传递 page页码和rows页大小
      $('#cadre_management').datagrid('load', params);
    });
  }

  // 所在团支部(需要初始化的事件)
  function init_missionBranch() {

    // 初始化数据网格
    $('#datagrid_missionBranch').datagrid({
      border: true,  //表格是否显示边框
      columns:[[
        {field: 'fullName', title: '团支部', sortable: false}
      ]],
      loader: function (param, success, error) {
        if(!param || !('fullName' in param)) {
          return;
        }

        // 根据组织名称获取团支部组织
        CadreManagementApi.getOrgByName({
          page: param.page, // 当前页码
          rows: param.rows, // 每页记录数
          fullName: param.fullName // 组织名称
        }).then(function (data) {
          if(data.rows && data.rows.length <= 0) {
            var options = $('#datagrid_missionBranch').datagrid('getPager').data("pagination").options;
            var curr = options.pageNumber; // 获取当前页
            if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
              success(data);
              error();
              return false;
            }
            $.alert('当前页是最后一页');
            console.log('curr', curr);
            $('#datagrid_missionBranch').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
            error();
            return false;
          }
          success(data);
        }, function () {
          error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
        }).always(function () {
          $('#dialog_missionBranch').dialog('open'); // 弹出对话框
        });
      },
      onLoadSuccess: function () {
        $(this).datagrid("fixRownumber"); // 行号宽度自适应
      },
      pagination: true,//如果表格需要支持分页，必须设置该选项为true
      pageNumber: 1, // 初始化页码
      pageSize: 20,   //表格中每页显示的行数
      pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
      rownumbers: true,   //是否显示行号
      nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
      striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
      // method:'get',   //表格数据获取方式,请求地址是上面定义的url
      // sortName: 'dealTime',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
      // sortOrder: 'desc',  //使用倒序排序
      // idField: 'ID', // 指示哪个字段是标识字段
      // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
      loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
      frozenColumns: [[  //固定在表格左侧的栏
        {field: 'check', checkbox: true, width: 55}
      ]],
      singleSelect:true, // 设置为 true，则只允许选中一行
      onClickRow: function (rowIndex, rowData) {
        console.log('rowData', rowData);
        missionBranch_global = rowData.oid; // 所在团支部(全局变量)
        // 当前操作(全局变量) -->  '新增'、'编辑'
        if(operation_global == '新增') {
          $('#missionBranch').val(rowData.fullName); // 渲染所在团支部(新增/编辑团干弹出框)
        }else { // 编辑
          $('#missionBranch_edit').val(rowData.fullName); // 渲染所在团支部(新增/编辑团干弹出框)
        }
        $('#dialog_missionBranch').dialog('close'); // 关闭对话框(所在团支部)
      }
    });

    // 点击搜索(所在团支部)
    $('#filter_missionBranch').click(function () {
      var params = {
        fullName: $('#fullName_filter_missionBranch').val().trim() // 所在团支部
      };

      // 分页插件自动传递 page页码和rows页大小
      $('#datagrid_missionBranch').datagrid('load', params);
    });
  }

  // 新增运营者(需要初始化的事件)
  function init_add_operator() {
    // 新增运营者 -- 对话框
    $('#dialog_operator').dialog({
      cache: false,
      onClose: function () {
        $('#fm_operator').form('clear'); // 对话框关闭前，清除表单数据
        $('label.error').remove(); // 移除错误信息
      },
      buttons: [{
        text:'取消',
        // iconCls:'icon-cancel',
        handler:function(){
          $('#dialog_operator').dialog('close'); // 关闭对话框
        }
      },{
        text:'确定',
        // iconCls:'icon-ok',
        handler:function(){

          // 验证
          var validate = {
            rules: {
              'password_cadre': {
                required: true,
                checkPassword: true
              },
              'positionTheLabel_cadre': {
                required: true
              }
            },
            messages: {
              'password_cadre': {
                required: '请输入登录密码'
              },
              'positionTheLabel_cadre': {
                required: '请输入职位标签'
              }
            },
            errorPlacement:function(error,element) { // 自定义错误放到哪里
              error.appendTo(element.parents("tr"));
            }
          };

          var params = {
            tid: tid_global, //  团干ID(全局变量)
            password: $('#password_cadre').val().trim(), // 去除两边空格
            positionTheLabel: $('#positionTheLabel_cadre').val().trim() // 去除两边空格
          };
          console.log('dialog_operator params', params);

          var validateFlag = $('#fm_operator').validate(validate).form(); // 验证表单，填写信息是否完整
          if(!validateFlag) { // 表单填写未完成
            return;
          }

          // 新增运营者
          CadreManagementApi.addTuanganOrg(params).then(function (data) {
            $('#dialog_operator').dialog('close'); // 关闭对话框
            $.alert(data.msg).then(function () {
              Utils.updateDataGrid($('#cadre_management')); // 更新表格数据(团干管理)
            });
          });
        }
      }]
    });
  }

  // 批量导入团干信息
  function init_cadre_multiple() {

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 批量导入团干信息 -- 对话框
    $('#dialog_cadre_multiple').dialog({
      // modal: true,
      // closed: true,
      cache: false,
      onClose: function () {
        $('#dialog_cadre_multiple .fileUrlList').click(); // 重置上传插件
      },
      buttons: [{
        text:'取消',
        handler:function(){
          $('#dialog_cadre_multiple').dialog('close'); // 关闭对话框
        }
      },{
        text:'确定',
        handler:function(){
          var params = {
            uploadExcelPath: $('#dialog_cadre_multiple .fileUrlList').text(), // 上传Excel文件路径
            pageIndex: 1, // 当前页码
            pageSize: 10 // 每页记录数
          };

          if(!params['uploadExcelPath']) {
            $.alert('请上传Excel文件');
            return;
          }

          if(isClick) { // 已点击
            return;
          }
          isClick = true; // 设置为 已点击
          $('#dialog_cadre_multiple .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

          // 从团干Excel模板文件导入团干信息批量添加
          CadreManagementApi.addBatchByExcelImport(params).then(function (data) {
            $('#dialog_cadre_multiple').dialog('close'); // 关闭对话框

            var success = data.data.success;
            var fail = data.data.fail;

            if(fail && fail.rows && fail.rows.length > 0) { // 有失败的
              // 分页插件自动传递 page页码和rows页大小
              $('#datagrid_cadre_multiple_fail').datagrid('loadData', fail); // 加载表格(批量导入团干失败)
              $('#dialog_cadre_multiple_fail').dialog('open'); // 显示弹出框(批量导入团员失败)
            }

            $.alert('批量导入团干成功数量：' + success.total + '，失败数量：' + fail.total);

            if(success && success.total > 0){ // 有成功的
              // 分页插件自动传递 page页码和rows页大小
              $('#cadre_management').datagrid('load',{}); // 刷新数据表格(团干管理)
            }
          }).always(function () {
            isClick = false; // 设置为 未点击
            $('#dialog_cadre_multiple .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
          });

        }
      }]
    });

    // 点击 '导入模板下载'
    $('#download').click(function () {
      console.log('download');

      window.location.href = League.path + '/file/download/league'; // 团干导入Excel模板下载
    });

    // 点击'批量导入团干'
    $('#tuangan_addBatch').click(function () {
      $('#dialog_cadre_multiple').dialog('open'); // 弹出对话框
    });

    $('.uploader_file_custom_control.cadre_multiple').myFileUploader(); // 初始化文件上传插件
  }


  // 批量导入团干失败(需要初始化的事件)
  function init_cadre_multiple_fail() {

    // 初始化数据网格
    $('#datagrid_cadre_multiple_fail').datagrid({
      border: true,  //表格是否显示边框
      columns:[[
        {field: 'failRow', title: '行号', sortable: false},
        {field: 'failCause', title: '原因', sortable: false}
      ]],
      pagination: true,//如果表格需要支持分页，必须设置该选项为true
      pageNumber: 1, // 初始化页码
      pageSize: 20,   //表格中每页显示的行数
      pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
      // rownumbers: true,   //是否显示行号
      nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
      striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
      // method:'get',   //表格数据获取方式,请求地址是上面定义的url
      // sortName: 'dealTime',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
      // sortOrder: 'desc',  //使用倒序排序
      // idField: 'ID', // 指示哪个字段是标识字段
      // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
      loadMsg:'数据正在努力加载，请稍后...' //加载数据时显示提示信息
    });
  }


  function init() {
    //延迟加载,否则页面请求两次
    setTimeout(refreshDG, 100);

    init_datafilter(); // 数据筛选(需要初始化的事件)
    init_add(); // 新增(需要初始化的事件)
    init_edit(); // 编辑(需要初始化的事件)
    init_add_operator(); // 新增运营者(需要初始化的事件)
    init_cadre_multiple(); // 批量导入团干信息
    init_cadre_multiple_fail(); // 批量导入团干失败
  }

  init(); // 初始化函数
});