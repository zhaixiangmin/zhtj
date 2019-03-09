/**
 * Created by licong on 2017/9/18.
 */
$(function () {
  var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)
  var optionList_global = undefined; // 基本信息显示列表(全局变量) -->  ['fullName', 'name']
  var operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'
  var oid_global = undefined; // 下级组织ID(全局变量)
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

  /**
   * 显示选项(基本信息、验证表单)
   * @param value {string} 组织类型(类型，1领导机关团组织、2基层团委、3团工委、4团总支、5团支部)
   */
  function showOption(value) {
    if(!value) {
      return;
    }
    // 无企业微信名称
    var options = {
      // 领导机关团组织
      '1': ['oid', 'type', 'fullName', 'name', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 基层团委
      '2': ['oid', 'type', 'fullName', 'name', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 团工委
      '3': ['oid', 'type', 'fullName', 'name', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 团总支
      '4': ['oid', 'type', 'fullName', 'name', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 团支部
      '5': ['oid', 'type', 'fullName', 'name', 'mobile', 'email', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo']
    };

    var optionList = options[value]; // 选项数组 ['fullName', 'name']
    // 查看操作
    if(operation_global == '查看') {
      $('#fm_view .view').hide(); // 隐藏所有信息

      for(var i=0;i < optionList.length; i++) {
        var option = optionList[i];
        if(option == 'password') {
          optionList.splice(i, 1); // 删除元素
          i--;
          continue;
        }
        $('#' + option + '_view').parent().parent().show(); // 显示特定信息
      }
    }else if(operation_global == '新增') {
      $('#fm .check').hide(); // 隐藏所有信息

      for(var i=0;i < optionList.length; i++) {
        var option = optionList[i];
        if(option == 'oid') {
          optionList.splice(i, 1); // 删除元素
          i--;
          continue;
        }
        $('#' + option).parent().parent().show(); // 显示特定必填信息
      }
    }
    else if(operation_global == '编辑') {
      $('#fm_edit .check').hide(); // 隐藏所有信息

      for(var i=0;i < optionList.length; i++) {
        var option = optionList[i];
        if(option == 'password' || option == 'oid') {
          optionList.splice(i, 1); // 删除元素
          i--;
          continue;
        }
        $('#' + option + '_edit').parent().parent().show(); // 显示特定必填信息
      }
    }

    optionList_global = optionList; // 基本信息显示列表(全局变量)

  }

  var typeName = {
    '1': '领导机关团组织',
    '2': '基层团委',
    '3': '团工委',
    '4': '团总支',
    '5': '团支部'
  };

  // 更新网格数据
  function refreshDG() {

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

    // 初始化数据网格
    $('#organization_management').datagrid({
      title: '组织管理',  //表格名称
      border: true,  //表格是否显示边框
      columns:[[
        {field: 'oid', title: '团组织ID', sortable: false},
        {field: 'fullName', title: '团组织全称', sortable: false},
        {field: 'name', title :'团组织简称', sortable: false},
        {field: 'type', title:'组织类型', sortable: false, formatter: function(value, row, index){
            if (value){
              return typeName[value];
            }
          }},
        {field: 'parentName', title: '上级组织', sortable: false}
      ]],
      loader: function (param, success, error) {
        OrganizationManagementApi.getOrganizations({
          page: param.page, // 当前页码
          rows: param.rows, // 每页记录数
          type: param.type, // 组织类型(类型，1领导机关团组织、2基层团委、3团工委、4团总支、5团支部)
          fullName: param.fullName // 组织名称(组织名称)
        }).then(function (data) {
          if(data.rows && data.rows.length <= 0) {
            var options = $('#organization_management').datagrid('getPager').data("pagination").options;
            var curr = options.pageNumber; // 获取当前页
            if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
              success(data);
              error();
              return false;
            }
            $.alert('当前页是最后一页');
            // console.log('curr', curr);
            $('#organization_management').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
        id: 'organization_add',
        handler: function(){
          operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'

          // 获取组织类型
          OrganizationManagementApi.getOrgType({}).then(function (data) {
            var orgTypeList = data.rows;
            if(!orgTypeList || orgTypeList.length <= 0) {
              $.alert('下级组织类型为空，请联系省团委基层部负责人新增角色。');
              return;
            }
            for(var i=0; i<orgTypeList.length; i++) {
              orgTypeList[i].orgTypeName = typeName[orgTypeList[i].orgType];
            }
            $('#type').combobox('loadData', orgTypeList);

            $('#parentName').val(account_global.fullName); // 上级组织名称(当前登录组织就是该组织的上级组织)

            var orgType = orgTypeList[0].orgType; // 组织类型(类型，1领导机关团组织、2基层团委、3团工委、4团总支、5团支部)
            showOption(orgType); // 显示选项(基本信息、验证表单)

            // 弹窗位置居中
            // $("#dialog").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog').parents('.window').outerHeight())*0.5 });
            $('#dialog').dialog('open'); // 弹出对话框

            $('#username').val(''); // 清空账号(浏览器会把当前登录账号设置为默认值)
            $('#password').val(''); // 清空密码(浏览器会把当前登录密码设置为默认值)
          });

        }
      }, '-', {
        iconCls: 'icon-my-edit',
        text: '编辑',
        id: 'organization_edit',
        handler: function(){
          var selectedData = $('#organization_management').datagrid('getSelected');
          if(!selectedData) {
            $.alert('请选择需要操作的记录');
            return;
          }

          operation_global = '编辑'; // 当前操作(全局变量) -->  '新增'、'编辑'
          oid_global = selectedData.oid; // 下级组织ID(全局变量)

          $('#parentName_edit').val(account_global.fullName); // 上级组织名称(当前登录组织就是该组织的上级组织)

          // 获取组织类型
          OrganizationManagementApi.getOrgType({}).then(function (data) {
            var orgTypeList = data.rows;
            if(!orgTypeList || orgTypeList.length <= 0) {
              $.alert('组织类型为空，无法进行该操作');
              return;
            }
            for(var i=0; i<orgTypeList.length; i++) {
              orgTypeList[i].orgTypeName = typeName[orgTypeList[i].orgType];
            }
            $('#type_edit').combobox('loadData', orgTypeList);

            showOption(selectedData.type); // 显示选项(基本信息、验证表单)

            // 基本信息显示列表(全局变量)
            for(var i=0; i<optionList_global.length; i++) {
              var option = optionList_global[i];
              if(option == 'industryCategory' || option == 'type') {
                $('#' + option + '_edit').combobox('setValue', selectedData[option]); // 设置单位所属行业类别/组织类型
                continue;
              }
              $('#' + option + '_edit').val(selectedData[option]);
            }

            // 弹窗位置居中
            // $("#dialog_edit").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_edit').parents('.window').outerHeight())*0.5 });
            $('#dialog_edit').dialog('open'); // 弹出对话框
          });
        }
      }, '-', {
        iconCls: 'icon-my-view',
        text: '查看',
        id: 'organization_view',
        handler: function(){
          var selectedData = $('#organization_management').datagrid('getSelected');
          if(!selectedData) {
            $.alert('请选择需要操作的记录');
            return;
          }

          operation_global = '查看'; // 当前操作(全局变量) -->  '新增'、'编辑'

          showOption(selectedData.type); // 显示选项(基本信息、验证表单)
          // $('#parentName_view').val(selectedData.parentName); // 上级组织
          var html= '';
          if(selectedData.parentName) { // 超管不存在上级组织(应该不用)
            // 上级组织
            html += '<div class="item">';
            html += '    <span class="title">' + paramsName.parent + '：</span><span class="describe">' + selectedData.parentName + '</span>';
            html += '</div>';
          }
          var html_username = '';
          var html_addition = '';
          // 基本信息显示列表(全局变量)
          for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];
            if(!selectedData[option]) { // null，直接返回(避免出现null)
              continue;
            }

            var text = ''; // 值
            // 附加信息
            if(option == 'username') {
              text = selectedData[option];
              html_username += '<div class="item">';
              html_username += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
              html_username += '</div>';
            }else if (option == 'secretaryName' || option == 'groupOrganizationCode' || option == 'groupOrganizationWechatid' || option == 'groupOrganizationWeibo') {
              text = selectedData[option];
              html_addition += '<div class="item">';
              html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
              html_addition += '</div>';
            }else { // 基本信息
              if(option == 'type') { // 组织类型
                text = typeName[selectedData[option]]; // 设置组织类型
              }else if (option == 'industryCategory') { // 单位所属行业类别
                text = industryCategoryName[selectedData[option]]; // 设置单位所属行业类别
              }else {
                text = selectedData[option];
              }
              html += '<div class="item">';
              html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
              html += '</div>';
            }
          }
          if(!html_username) {
            html_username += '<div class="item">';
            html_username += '    <span class="title">暂无信息</span>';
            html_username += '</div>';
          }
          if(!html) {
            html += '<div class="item">';
            html += '    <span class="title">暂无信息</span>';
            html += '</div>';
          }
          if(!html_addition) {
            html_addition += '<div class="item">';
            html_addition += '    <span class="title">暂无信息</span>';
            html_addition += '</div>';
          }
          $('#dialog_view .list_box .list.account .content').html(html_username); // 账号信息
          $('#dialog_view .list_box .list.base .content').html(html); // 基本信息
          $('#dialog_view .list_box .list.addition .content').html(html_addition); // 附加信息

          // 弹窗位置居中
          // $("#dialog_view").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_view').parents('.window').outerHeight())*0.5 });
          $('#dialog_view').dialog('open'); // 弹出对话框
        }
      }, '-', {
        iconCls: 'icon-my-reload',
        text: '重置密码',
        id: 'organization_reset',
        handler: function(){
          var selectedData = $('#organization_management').datagrid('getSelected');
          if(!selectedData) {
            $.alert('请选择需要操作的记录');
            return;
          }

          $.alert('密码将重置为 a00000,确认重置密码？').then(function () {
            // type {int} 类型(1：组织账号，2：运营者账号)
            OrganizationManagementApi.resetBatchOrgPW({userName: selectedData.username, type: 1}).then(function (data) {
              $.alert(data.msg).then(function () {
                Utils.updateDataGrid($('#organization_management')); // 更新表格数据(组织管理)
              });
            });
          });
        }
      }, '-', {
        iconCls: 'icon-my-delete',
        text: '删除',
        id: 'organization_delete',
        handler: function(){
          var selectedData = $('#organization_management').datagrid('getSelected');
          // console.log('selectedData', selectedData);
          if(!selectedData) {
            $.alert('请选择需要操作的记录');
            return;
          }

          $.alert('确定删除该组织？').then(function () {
            OrganizationManagementApi.delete({oid: selectedData.oid}).then(function (data) {
              $.alert(data.msg).then(function () {
                Utils.updateDataGrid($('#organization_management')); // 更新表格数据(组织管理)
              });
            });
          });
        }
      }
      ]
    });

    // Utils.showLimitButtons(); // 显示权限按钮
  }

  // 数据筛选（需要初始化的事件）
  function init_datafilter() {
    $('#type_filter').combobox({
      valueField: 'value',
      textField: 'name',
      // editable: false, // 不可编辑，只可选
      // multiple: true, // 多选
      loader: function (param,success, error) {
        OrganizationManagementApi.getType({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取组织类型');
            error();
            return;
          }
          data.rows.unshift({ "value": "", "name": "全部"});
          success(data.rows);
        })
      }
    });
  }

  // 点击查询按钮 -- 数据筛选
  $('#filter').click(function () {
    var params = {
      type: $('#type_filter').combobox('getValue'), // 组织类型(类型，1领导机关团组织、2基层团委、3团工委、4团总支、5团支部)
      fullName: $('#fullName_filter').val().trim() // 组织名称(组织名称)
    };

    // 分页插件自动传递 page页码和rows页大小
    $('#organization_management').datagrid('load', params);
  });

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
          var validate = {
            rules: {
              'fullName': {
                required: true
              },
              'name': {
                required: true
                // checkSpecialSymbol: true
              },
              // 'enterpriseName': {
              //     required: true,
              //     checkSpecialSymbol: true
              // },
              'mobile': {
                required: true,
                checkMobileOrTel: true
              },
              'email': {
                required: true,
                email: true // 必须输入正确格式的电子邮件
              },
              'administrativeOmpilation': {
                required: true,
                digits:true // 必须输入整数
              },
              'administrativeNumber': {
                required: true,
                digits:true // 必须输入整数
              },
              'careerFormation': {
                required: true,
                digits:true // 必须输入整数
              },
              'serviceNumber': {
                required: true,
                digits:true // 必须输入整数
              },
              'industryCategory': {
                required: true,
                digits:true // 必须输入整数
              },
              'username': {
                required: true,
                checkDigitOrLetter: true
              },
              'password': {
                required: true,
                checkPassword: true
              }
            },
            messages: {
              'fullName': {
                required: '请输入团组织全称/组织ID'
              },
              'name': {
                required: '请输入团组织简称'
              },
              // 'enterpriseName': {
              //     required: '请输入团组织代号'
              // },
              'mobile': {
                required: '请输入团组织联系电话'
              },
              'email': {
                required: '请输入团组织电子邮箱'
              },
              'administrativeOmpilation': {
                required: '请输入本级团组织行政编制数'
              },
              'administrativeNumber': {
                required: '请输入行政编制实际配备数'
              },
              'careerFormation': {
                required: '请输入本级团组织事业编制数'
              },
              'serviceNumber': {
                required: '请输入事业编制实际配备数'
              },
              'industryCategory': {
                required: '请选择单位所属行业类别'
              },
              'username': {
                required: '请输入登录账号'
              },
              'password': {
                required: '请输入密码'
              }
            }
            // errorPlacement:function(error,element) { // 自定义错误放到哪里
            //     error.appendTo(element.parents("tr"));
            // }
          };
          var validateFlag = $('#fm').validate(validate).form(); // 验证表单，填写信息是否完整

          var type = $('#type').combobox('getValue'); // 组织类型
          if(!type) {
            var html = '<label id="type-error" class="error">请选择组织类型</label>';
            // $('#type').parents('tr').append(html);
            $('#type').parents('td').append(html);
            validateFlag = false;
          }

          if(!validateFlag) { // 表单填写未完成
            Utils.scrollToAnchor($('#fm')); // 跳到指定锚点
            return;
          }

          var params = {};

          // 基本信息显示列表(全局变量)
          for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];
            if(option == 'industryCategory' || option == 'type') {
              params[option] = $('#' + option).combobox('getValue'); // 获取单位所属行业类别/组织类型
              continue;
            }
            params[option] = $('#' + option).val().trim(); // 去除两边空格
          }

          if(isClick) { // 已点击
            return;
          }
          isClick = true; // 设置为 已点击
          $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

          // 下级组织新增
          OrganizationManagementApi.add(params).then(function (data) {
            $('#dialog').dialog('close'); // 关闭对话框
            $.alert(data.msg).then(function () {
              // 分页插件自动传递 page页码和rows页大小
              $('#organization_management').datagrid('load',{});
            });
          }).always(function () {
            isClick = false; // 设置为 未点击
            $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
          });
        }
      }]
    });

    // 获取组织类型
    $('#type').combobox({
      valueField: 'orgType',
      textField: 'orgTypeName',
      onSelect: function (selected) {
        // showOption(selected.value); // 显示选项(基本信息、验证表单)
        showOption(selected.orgType); // 显示选项(基本信息、验证表单)
      }
    });

    // 获取单位所属行业类别
    $('#industryCategory').combobox({
      valueField: 'value',
      textField: 'name',
      // editable: false, // 不可编辑，只可选
      // multiple: true, // 多选
      loader: function (param,success, error) {
        OrganizationManagementApi.getIndustryCategory({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取单位所属行业类别');
            error();
            return;
          }
          data.rows[0].selected = true; // 默认选中组织类型
          success(data.rows);
        })
      }
    });

    // 点击'团组织全称-填写规则'
    $('.fullName_rules').click(function () {
      $('#dialog_fullName_rules').dialog('open'); // 弹出对话框
    });

    // 点击'团组织简称-填写规则'
    $('.name_rules').click(function () {
      $('#dialog_name_rules').dialog('open'); // 弹出对话框
    });

    // 点击'组织类型-类型说明'
    $('.type_rules').click(function () {
      $('#dialog_type_rules').dialog('open'); // 弹出对话框
    });

    // // 点击'企业微信名称-填写规则'
    // $('.enterpriseName_rules').click(function () {
    //     $('#dialog_enterpriseName_rules').dialog('open'); // 弹出对话框
    // });
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
          var validate = {
            rules: {
              'type_edit': {
                required: true
              },
              'fullName_edit': {
                required: true
              },
              'name_edit': {
                required: true,
                // checkSpecialSymbol: true
              },
              // 'enterpriseName_edit': {
              //     required: true,
              //     checkSpecialSymbol: true
              // },
              'mobile_edit': {
                required: true,
                checkMobileOrTel: true
              },
              'email_edit': {
                required: true,
                email: true // 必须输入正确格式的电子邮件
              },
              'administrativeOmpilation_edit': {
                required: true,
                digits:true // 必须输入整数
              },
              'administrativeNumber_edit': {
                required: true,
                digits:true // 必须输入整数
              },
              'careerFormation_edit': {
                required: true,
                digits:true // 必须输入整数
              },
              'serviceNumber_edit': {
                required: true,
                digits:true // 必须输入整数
              },
              'industryCategory_edit': {
                required: true,
                digits:true // 必须输入整数
              },
              'username_edit': {
                required: true
              }
            },
            messages: {
              'type_edit': {
                required: '请选择组织类型'
              },
              'fullName_edit': {
                required: '请输入团组织全称/组织ID'
              },
              'name_edit': {
                required: '请输入团组织简称'
              },
              // 'enterpriseName_edit': {
              //     required: '请输入团组织代号'
              // },
              'mobile_edit': {
                required: '请输入团组织联系电话'
              },
              'email_edit': {
                required: '请输入团组织电子邮箱'
              },
              'administrativeOmpilation_edit': {
                required: '请输入本级团组织行政编制数'
              },
              'administrativeNumber_edit': {
                required: '请输入行政编制实际配备数'
              },
              'careerFormation_edit': {
                required: '请输入本级团组织事业编制数'
              },
              'serviceNumber_edit': {
                required: '请输入事业编制实际配备数'
              },
              'industryCategory_edit': {
                required: '请选择单位所属行业类别'
              },
              'username_edit': {
                required: '请输入登录账号'
              }
            }
          };
          var validateFlag = $('#fm_edit').validate(validate).form(); // 验证表单，填写信息是否完整
          // var validateFlag = $('#fm_edit').validate(validate_global).form(); // 验证表单，填写信息是否完整
          if(!validateFlag) { // 表单填写未完成
            Utils.scrollToAnchor($('#fm_edit')); // 跳到指定锚点
            return;
          }

          var params = {};

          // 基本信息显示列表(全局变量)
          for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];
            if(option == 'industryCategory' || option == 'type') {
              params[option] = $('#' + option + '_edit').combobox('getValue'); // 获取单位所属行业类别/组织类型
              continue;
            }
            params[option] = $('#' + option + '_edit').val().trim();
          }

          params.oid = oid_global; // 下级组织ID(全局变量)
          console.log('params', params);

          if(isClick) { // 已点击
            return;
          }
          isClick = true; // 设置为 已点击
          $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

          // 下级组织修改
          OrganizationManagementApi.edit(params).then(function (data) {
            $('#dialog_edit').dialog('close'); // 关闭对话框
            $.alert(data.msg).then(function () {
              Utils.updateDataGrid($('#organization_management')); // 更新表格数据(组织管理)
            });
          }).always(function () {
            isClick = false; // 设置为 未点击
            $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
          });

        }
      }]
    });

    // 获取组织类型
    $('#type_edit').combobox({
      valueField: 'orgType',
      textField: 'orgTypeName',
      onSelect: function (selected) {
        // showOption(selected.value); // 显示选项(基本信息、验证表单)
        showOption(selected.orgType); // 显示选项(基本信息、验证表单)
      }
    });

    // 获取单位所属行业类别
    $('#industryCategory_edit').combobox({
      valueField: 'value',
      textField: 'name',
      // editable: false, // 不可编辑，只可选
      // multiple: true, // 多选
      loader: function (param,success, error) {
        OrganizationManagementApi.getIndustryCategory({}).then(function (data) {
          if(!data.rows || data.rows.length <= 0) {
            $.alert('获取单位所属行业类别');
            error();
            return;
          }
          data.rows[0].selected = true; // 默认选中组织类型
          success(data.rows);
        })
      }
    });
  }

  function init() {
    //延迟加载,否则页面请求两次
    setTimeout(refreshDG, 100);

    init_datafilter(); // 数据筛选(需要初始化的事件)
    init_add(); // 新增(需要初始化的事件)
    init_edit(); // 编辑(需要初始化的事件)
  }

  init(); // 初始化函数
});