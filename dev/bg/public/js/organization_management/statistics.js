/**
 * Created by licong on 2018/5/2.
 */

$(function () {
  var orgId_global = undefined; // 组织ID(全局变量)
  var emptyOrgType_global = undefined; // 空心组织类型(全局变量，emptyLeagueCommittee-空心组织、emptyLeagueBranch-空心团支部、nullCadreLeagueBranch-无团干团支部)
  var oid_global = undefined; // 组织ID--查看组织树传入参数(全局变量)

  // 更新网格数据
  function refreshDG() {

    // 初始化数据网格
    $('#statistics_dg').datagrid({
      title: '直属下级数据统计',  //表格名称
      border: true,
      columns:[
        [
          { title: "团务数据统计", colspan: 9 },
          { title: "组织关系转接统计", colspan: 4 },
          { title: "月度业务响应统计<span class='rules month_business_rules'></span>", colspan: 6 }
        ],
        [
          {field: 'fullName', title: '组织名称', sortable: false},
          {field: 'sumAll', title :'已建立组织总数', sortable: false},
          {field: 'sumBranch', title :'已建立支部数', sortable: false},
          {field: 'emptyLeagueCommitteeNum', title :'空心团委数', sortable: false, styler: function(value, row, index){
              if(value) {
                return {class:'clickable'};
              }
            }},
          {field: 'emptyLeagueBranchNum', title :'空心团支部数', sortable: false, styler: function(value, row, index){
              if(value) {
                return {class:'clickable'};
              }
            }},
          {field: 'nullCadreLeagueBranchNum', title :'无团干团支部数', sortable: false, styler: function(value, row, index){
              if(value) {
                return {class:'clickable'};
              }
            }},
          {field: 'sumLeagueMember', title :'已报到团员数', sortable: false},
          {field: 'sumLeagueCadre', title :'已录入团干数', sortable: false},
          {field: 'sumLeagueCadreEntered', title :'已入驻企业号团干数', sortable: false},
          {field: 'sumTransferringRolloutMember', title :'转出中团员数', sortable: false},
          {field: 'sumTransferredRolloutMember', title :'已转出团员数', sortable: false},
          {field: 'sumTransferringRollinMember', title :'待确认接收团员数', sortable: false},
          {field: 'sumTransferredRollinMember', title :'已接收团员数', sortable: false},

          {field: 'respondMustNum', title: '本级累计需响应申请数', sortable: false},
          {field: 'respondTimelyNum', title: '本级及时响应数', sortable: false},
          {field: 'responseTimeRate', title: '本级及时响应率', sortable: false},
          {field: 'sumRespondMustNum', title: '累计需响应申请数', sortable: false},
          {field: 'sumRespondTimelyNum', title: '及时响应数', sortable: false},
          {field: 'sumResponseTimeRate', title: '及时响应率', sortable: false}
        ]],
      loader: function (param, success, error) {
        // 跨页面传参
        if(parent.window.zhtj && parent.window.zhtj.referer) {
          if(parent.window.zhtj.referer == 'statistics') { // "组织管理-查看组织树" 本级及所有下级团组织的数据分析表
            oid_global = parent.window.zhtj.oid; // 组织ID--查看组织树传入参数(全局变量)
            param.orgId = parent.window.zhtj.oid; // 默认选中筛选
          }
          var queryParams = {};
          $.each(param, function (key, value) {
            // 页码和页大小不用设置
            if(key != 'page' && key != 'rows') {
              queryParams[key] = value;
            }
          });
          $('#statistics_dg').datagrid({queryParams: queryParams}); // 设置datagrid请求参数，否则下载页面没有这些参数
          delete parent.window.zhtj; // 删除对象
          return;
        }

        // 直属下级数据统计信息分页列表
        OrganizationManagementApi.directSubOrgList({
          pageIndex: param.page, // 当前页码
          pageSize: param.rows, // 每页记录数
          statisticMonth: param.statisticMonth, // 统计月份
          orgId: oid_global // 组织id
          // orgId: param.orgId // 组织id
        }).then(function (data) {
          if(data.rows && data.rows.length <= 0) {
            var options = $('#statistics_dg').datagrid('getPager').data("pagination").options;
            var curr = options.pageNumber; // 获取当前页
            if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
              success(data);
              error();
              return false;
            }
            $.alert('当前页是最后一页');
            // console.log('curr', curr);
            $('#statistics_dg').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
            error();
            return false;
          }
          success(data);
        }, function () {
          error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
        });
      },
      // onBeforeLoad: function () {
      //     Utils.showLimitButtons(); // 显示权限按钮
      // },
      onLoadSuccess: function () {
        $(this).datagrid("fixRownumber"); // 行号宽度自适应
      },
      onClickCell: function (rowIndex, field, value) {
        // 可点击字段 空心团委数、空心团支部数、无团干团支部数
        if(field != 'emptyLeagueCommitteeNum' && field != 'emptyLeagueBranchNum' && field != 'nullCadreLeagueBranchNum') {
          return;
        }

        if(!value) { // 值为0，不用跳转
          return;
        }

        var rows = $('#statistics_dg').datagrid('getRows');//获得所有行
        var row = rows[rowIndex];//根据index获得其中一行。

        // emptyLeagueCommittee-空心组织、emptyLeagueBranch-空心团支部、nullCadreLeagueBranch-无团干团支部
        emptyOrgType_global = field.replace('Num', ''); // 空心组织类型(全局变量)
        orgId_global = row.oid; // 组织ID(全局变量)

        // 空心组织名称
        var emptyName = {
          'emptyLeagueCommittee': '空心团委',
          'emptyLeagueBranch': '空心团支部',
          'nullCadreLeagueBranch': '无团干团支部'
        };

        parent.window.zhtj = {
          num: value, // 空心团委数/空心团支部数/无团干团支部数
          orgId: orgId_global, // 组织ID(全局变量)
          emptyOrgType: emptyOrgType_global, // 空心组织类型(全局变量)
          emptyName: emptyName[emptyOrgType_global] // 空心组织名称
        };
        Utils.toggleTab(emptyName[emptyOrgType_global], 'view/organization_management/organization_empty.html'); // 创建(打开)新面板(空心组织)
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
      // fixed: true, // 设置为 true，则当 'fitColumns' 设置为 true 时放置调整宽度。
      loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
      singleSelect:true, // 设置为 true，则只允许选中一行
      frozenColumns: [[  //固定在表格左侧的栏
        {field: 'check', checkbox: true}
      ]],
      toolbar: [{
        iconCls: 'icon-my-view',
        text: '查看分类统计',
        // text: '查看',
        // id: 'organization_add',
        handler: function(){
          var selectedData = $('#statistics_dg').datagrid('getSelected');
          console.log('selectedData', selectedData);
          if(!selectedData) {
            $.alert('请选择需要操作的记录');
            return;
          }

          parent.window.zhtj = {
            oid: selectedData.oid // 组织ID
          };
          Utils.toggleTab('组织数据统计表', 'view/organization_management/organization_statistics.html'); // 创建(打开)新面板(组织数据统计表)
        }
      }
      ]
    });

    // 点击 '导出本页数据'
    $('#download').click(function () {
      var paginationOptions = $('#statistics_dg').datagrid('getPager').data("pagination" ).options;
      var queryParams = $('#statistics_dg').datagrid('options').queryParams;
      console.log('paginationOptions', paginationOptions);
      // var pageNumber = paginationOptions.pageNumber; // 当前页码
      // var pageSize = paginationOptions.pageSize; // 每页记录数
      var queryParamsStr = undefined;
      // 组织ID--查看组织树传入参数(全局变量)
      if(oid_global) { // 组织树跳转
        queryParamsStr = '?orgId=' + oid_global + '&pageIndex=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize; // 请求参数字符串
      }else { // 直接打开
        queryParamsStr = '?pageIndex=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize; // 请求参数字符串
      }
      // var queryParamsStr = '?orgId=' + oid_global + '&pageIndex=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize; // 请求参数字符串
      $.each(queryParams, function (key, value) {
        console.log('key', key);
        console.log('value', value);
        if(!value) { // 不能出现undefined
          value = '';
        }
        queryParamsStr += '&' + key + '=' + value;
      });
      console.log('queryParamsStr', queryParamsStr);
      window.location.href = League.path + '/bg/orgStatistics/directSubOrg/export' + queryParamsStr; // 直属下级数据统计信息列表导出Excel
      // window.location.href = League.path + '/bg/orgStatistics/directSubOrg/export' + '?pageIndex=' + pageNumber + '&pageSize=' + pageSize; // 直属下级数据统计信息列表导出Excel

    });


    // 点击'月度业务响应统计-？'
    $('.month_business_rules').click(function () {
      $('#dialog_month_business_rules').dialog('open'); // 弹出对话框
    });
  }


  // 数据筛选
  function init_datafilter() {
    /****************** (日期)日期插件年月开始 ********************/
    Utils.setDateBoxYearMonth($('#statisticMonth_filter')); // 设置日期插件为年月日期插件
    /****************** (日期)日期插件年月结束 ********************/

    // 点击查询按钮 -- 数据筛选
    $('#filter').click(function () {
      var params = {
        statisticMonth: $('#statisticMonth_filter').datebox('getValue').replace('-', ''), // 统计月份
      };

      console.log('#filter params', params);

      // 分页插件自动传递 page页码和rows页大小
      $('#statistics_dg').datagrid('load', params);
    });
  }

  function init() {
    //延迟加载,否则页面请求两次
    setTimeout(refreshDG, 100);

    init_datafilter(); // 数据筛选(需要初始化的事件)
  }

  init(); // 初始化函数
});