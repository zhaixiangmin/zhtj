/**
 * Created by licong on 2017/9/20.
 */
$(function () {

  var oid_global = undefined; // 组织ID(全局变量)
  var fullName_global = undefined; // 组织全称(全局变量)
  var treeOid_global = undefined; // 树组织ID(全局变量)
  var flag_global = 1; // 下级组织 -- 展开的下级(0：本组织，非0：下级组织)
  var autoExpand_global = false; // 是否自动展开(true：是，false：否)
  var isFirstOpen_global = true; // 是 -- 是否首次打开面板(全局变量，true：是，false：否)

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

  // var sumList_global = ['tuanganCount', 'membersCount', 'leagueCadreEnteredNum', 'sumAll', 'sumBranch', 'sumLeagueCadre', 'sumLeagueMember', 'sumTransferringMember', 'sumTransferredMember']; // 统计列表
  var sumList_global = ['tuanganCount', 'membersCount', 'leagueCadreEnteredNum', 'sumAll', 'sumBranch', 'sumLeagueCadre', 'sumLeagueMember', 'sumTransferringRolloutMember', 'sumTransferredRolloutMember', 'sumTransferringRollinMember', 'sumTransferredRollinMember']; // 统计列表

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
      '1': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 基层团委
      '2': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 团工委
      '3': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 团总支
      '4': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 团支部
      '5': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
      // 超级管理员
      '6': ['oid', 'type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
    };

    $('.list.base .item').hide(); // 隐藏所有信息(基本信息)
    var optionList = options[value]; // 选项数组 ['fullName', 'name']

    for(var i=0;i < optionList.length; i++) {
      var option = optionList[i];
      if(option == 'password') {
        optionList.splice(i, 1); // 删除元素
        i--;
        continue;
      }
      $('#' + option + '_view').parent().show(); // 显示特定信息
    }

    optionList_global = optionList; // 基本信息显示列表(全局变量)
  }

  // 更新网格数据
  function refreshTree() {
    $('#tt').tree({
      lines: true, // 定义是否显示树线条
      formatter:function(node){
        return node.fullName;
      },
      onBeforeLoad: function(node, param){
        if(node && node.attributes) {
          node.attributes['oid'] = param.id;
        }
      },
      loader: function(param, success, error) {

        if(isFirstOpen_global) { // 首次打开面板 -- 是否首次打开面板(全局变量，true：是，false：否)
          if(!param.id) { // 非自动加载
            param.oid = 0;
            autoExpand_global = true; // 自动展开 -- 是否自动展开(true：是，false：否)
          }else { // 自动加载
            param.oid = param.id;
          }
          flag_global = 1; // 下级组织 -- 展开的下级(0：本组织，非0：下级组织)
        }else { // 非首次打开面板 -- 是否首次打开面板(全局变量，true：是，false：否)
          if(treeOid_global) { // 点击筛选组织
            // autoExpand_global = false; // 不自动展开 -- 是否自动展开(true：是，false：否)
            if(!param.id) { // 非自动加载
              param.oid = treeOid_global;
              flag_global = 0; // 本组织 -- 展开的下级(0：本组织，非0：下级组织)
              autoExpand_global = true; // 自动展开 -- 是否自动展开(true：是，false：否)
            }else { // 自动加载
              param.oid = param.id;
              flag_global = 1; // 下级组织 -- 展开的下级(0：本组织，非0：下级组织)
            }
          }else { // 手动展开节点
            param.oid = param.id;
            flag_global = 1; // 下级组织 -- 展开的下级(0：本组织，非0：下级组织)
          }
        }

        // 根据登录账号获取组织树
        OrganizationManagementApi.getOrgTree({
          oid: param.oid,
          flag: flag_global
        }).then(function (data) {
          for(var i=0; i<data.rows.length; i++) {
            data.rows[i].state = 'closed'; // 默认非叶子节点
            if(data.rows[i].isLeaf == 1) { // 叶子节点(是否是叶节点(功能节点) 0不是 1是)
              data.rows[i].state = 'open';
            }
            data.rows[i].id = data.rows[i].oid;
          }

          success(data.rows);
        }, function () {
          error();
          return false;
        })
      },
      onLoadSuccess: function (parent, data) {
        console.log('parent', parent);
        console.log('data', data);

        if(autoExpand_global) { // 若 自动展开 -- 是否自动展开(true：是，false：否)
          // state为'open'，不会自动加载
          if(data && data.length == 1) {
            var node = $('#tt').tree('find', data[0].oid); // 找到指定的节点并返回该节点对象
            if(node.isLeaf == 1) { // ；叶子节点
              autoExpand_global = false; // 不自动展开 -- 是否自动展开(true：是，false：否)
              isFirstOpen_global = false; // 设置为否 -- 是否首次打开面板(全局变量，true：是，false：否)
              treeOid_global = undefined; // 设置筛选oid为空(非空时，标识为筛选组织树)
            }
            $('#tt').tree('expand', node.target); // 展开节点
          }else { // 多个分叉节点/叶子节点错误标识为非叶子节点，此时length=0
            autoExpand_global = false; // 不自动展开 -- 是否自动展开(true：是，false：否)
            isFirstOpen_global = false; // 设置为否 -- 是否首次打开面板(全局变量，true：是，false：否)
            treeOid_global = undefined; // 设置筛选oid为空(非空时，标识为筛选组织树)
          }
        }
      },
      onDblClick: function (node) {
        // 根据组织ID获取组织
        OrganizationManagementApi.getOrgByOid({oid: node.oid}).then(function (data) {

          var organization = data.rows;
          showOption(organization.type); // 显示选项(基本信息、验证表单)
          oid_global = organization.oid; // 组织ID(全局变量)

          // 统计列表
          for(var i=0; i<sumList_global.length; i++) {
            var option = sumList_global[i];
            $('#' + option + '_view').text(organization[option]);
          }

          var html= '';
          if(organization.parentName) { // 超管不存在上级组织
            // 上级组织
            html += '<div class="item">';
            html += '    <span class="title">' + paramsName.parent + '：</span><span class="describe">' + organization.parentName + '</span>';
            html += '</div>';
          }
          var html_username = '';
          var html_addition = '';
          // 基本信息显示列表(全局变量)
          for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];
            if(!organization[option]) { // null，直接返回(避免出现null)
              continue;
            }

            var text = ''; // 值
            // 附加信息
            if(option == 'username') {
              text = organization[option];
              html_username += '<div class="item">';
              html_username += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
              html_username += '</div>';
            }else if (option == 'secretaryName' || option == 'groupOrganizationCode' || option == 'groupOrganizationWechatid' || option == 'groupOrganizationWeibo') {
              text = organization[option];
              html_addition += '<div class="item">';
              html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
              html_addition += '</div>';
            }else { // 基本信息
              if(option == 'type') { // 组织类型
                text = typeName[organization[option]]; // 设置组织类型
              }else if (option == 'industryCategory') { // 单位所属行业类别
                text = industryCategoryName[organization[option]]; // 设置单位所属行业类别
              }else {
                text = organization[option];
              }

              if(option == 'fullName') { // 组织全称
                fullName_global = organization[option]; // 组织全称(全局变量)
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
          $('#dialog_view .list_box .list.username .content').html(html_username); // 账号信息
          $('#dialog_view .list_box .list.base .content').html(html); // 基本信息
          $('#dialog_view .list_box .list.addition .content').html(html_addition); // 附加信息

          // 弹窗位置居中
          // $("#dialog_view").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_view').parents('.window').outerHeight())*0.5 });
          $('#dialog_view').dialog('open'); // 弹出对话框
        });
      }
    });

    init_missionBranch(); // 选择组织(需要初始化的事件)
  }

  // 还原组织树
  $('#undo').click(function () {
    isFirstOpen_global = true; // 是 -- 是否首次打开面板(全局变量，true：是，false：否)
    treeOid_global = undefined; // 初始化树组织ID(全局变量)
    $('.search_box input').val(''); // 清空搜索框
    var rootNodes = $('#tt').tree('getRoots');
    while(rootNodes.length) { // 遍历树的根节点
      var rootNode = rootNodes[0];
      if(rootNode && rootNode.target) {
        $('#tt').tree('remove', rootNode.target); // 删除根节点
      }
    }
    // autoExpand_global = false; // 不自动展开 -- 是否自动展开(true：是，false：否)
    $('#tt').tree('reload'); // 重新加载树
  });


  // 选择组织(需要初始化的事件)
  function init_missionBranch() {

    // 初始化数据网格
    $('#datagrid_organization').datagrid({
      border: true,  //表格是否显示边框
      columns:[[
        {field: 'fullName', title: '团组织全称', sortable: false}
      ]],
      loader: function (param, success, error) {
        if(!param || !('fullName' in param)) {
          return;
        }

        // 根据组织名称获取全部团支部组织(本级和所有下级，后台)
        OrganizationManagementApi.orgList({
          page: param.page, // 当前页码
          rows: param.rows, // 每页记录数
          // type: 5, // 团支部 -- 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
          fullName: param.fullName // 团组织全称
        }).then(function (data) {
          if(data.rows && data.rows.length <= 0) {
            var options = $('#datagrid_organization').datagrid('getPager').data("pagination").options;
            var curr = options.pageNumber; // 获取当前页
            if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
              success(data);
              error();
              return false;
            }
            $.alert('当前页是最后一页');
            $('#datagrid_organization').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
            error();
            return false;
          }
          success(data);
        }, function () {
          error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
        }).always(function () {
          $('#dialog_organization').dialog('open'); // 弹出对话框
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
      // striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
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
        treeOid_global = rowData.oid; // 树组织ID(全局变量)
        $('.search_box input').val(rowData.fullName); // 渲染搜索框
        var rootNodes = $('#tt').tree('getRoots');
        while(rootNodes.length) { // 遍历树的根节点
          var rootNode = rootNodes[0];
          if(rootNode && rootNode.target) {
            $('#tt').tree('remove', rootNode.target); // 删除根节点
          }
        }
        // autoExpand_global = false; // 不自动展开 -- 是否自动展开(true：是，false：否)
        $('#tt').tree('reload'); // 重新加载树
        $('#dialog_organization').dialog('close'); // 关闭对话框(所在团支部)
      }
    });

    // 点击搜索框(筛选条件，弹出框 -- 选择组织)
    $('#search_filter').click(function () {
      var params = {
        fullName: $('#fullName_filter').val().trim() // 组织名称
      };

      // 分页插件自动传递 page页码和rows页大小
      $('#datagrid_organization').datagrid('load', params);
    });

    // 点击 '选择组织节点' 框
    $('.search_box').click(function () {
      // treeID_global = $(this).parents('.tree_box').attr('id'); // 树ID(全局变量)
      $('#datagrid_organization').datagrid('load', {fullName: ''}); // 弹出对话框(重新加载组织表格)
    });
  }

  // 点击 '本级团干详情'/'本级团干入驻企业号人数'
  $('#tuanganCount_check, #leagueCadreEnteredNum_check').click(function () {
    parent.window.zhtj = {
      oid: oid_global,
      fullName: fullName_global // 组织全称(全局变量)
    };
    Utils.toggleNav('view/cadre_management/cadre_all.html', true); // 打开指定导航页面(所有下级组织团干)
  });

  // 点击 '本级团员详情'
  $('#membersCount_check').click(function () {
    parent.window.zhtj = {
      referer: 'tree', // 来源(组织管理-查看组织树)
      oid: oid_global,
      fullName: fullName_global // 组织全称(全局变量)
    };
    Utils.toggleNav('view/league_menber/league_menber.html', true); // 打开指定导航页面(我的团员)
  });

  // 点击 '本级及所有下级团组织的数据分析表'
  $('#organizationStatistic').click(function () {
    parent.window.zhtj = {
      referer: 'statistics', // 来源(组织管理-查看组织树)
      oid: oid_global // 组织ID
    };
    Utils.toggleTab('数据统计', 'view/organization_management/statistics.html'); // 创建(打开)新面板(数据统计)
    // Utils.toggleTab('组织数据统计表', 'view/organization_management/organization_statistics.html'); // 创建(打开)新面板(组织数据统计表)
  });

  // 点击 '团费交纳情况统计'
  $('#feeDetail').click(function () {
    parent.window.zhtj = {
      referer: 'tree', // 来源(组织管理-查看组织树)
      oid: oid_global, // 组织ID,
      fullName: fullName_global // 组织全称(全局变量)
    };
    Utils.toggleTab('团费查询', 'view/fee_management/fee_query.html'); // 创建(打开)新面板(团费查询)
  });

  function init() {
    //延迟加载,否则页面请求两次
    setTimeout(refreshTree, 100);
  }

  init(); // 初始化函数
});