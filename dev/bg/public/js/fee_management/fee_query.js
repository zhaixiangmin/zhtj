/**
 * Created by licong on 2018/1/9.
 */

$(function () {
    var sub_global = 0; // 下级标记(全局变量，0：本级；1：下级)
    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#fee_query_treegrid').treegrid({
            title: '团费查询',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            idField: 'oid',
            treeField: 'name',
            columns:[[
                {field: 'name', title :'组织', align: 'left', sortable: false},
                {field: 'realTotal', title :'组织团员总数', sortable: false},
                {field: 'total', title :'应交费团员数', sortable: false},
                {field: 'paidIn', title :'已交团员数', sortable: false},
                {field: 'unpaid', title:'未交团员数', sortable: false},
                {field: 'paidInAmount', title:'当月交纳总额', sortable: false},
                // {field: 'paidInAmount', title:'交纳总额', sortable: false},
                {field: 'updateTimeStr', title:'统计时间', sortable: false}
            ]],
            loader: function (param, success, error) {

                // 跨页面传参
                if(parent.window.zhtj && parent.window.zhtj.referer) {
                    if(parent.window.zhtj.referer == 'tree') { // "组织管理-查看组织树" 本级团员详情
                        param.oid = parent.window.zhtj.oid; // 默认选中筛选(所在团支部)
                        $('#oid_filter').val(parent.window.zhtj.fullName).data('oid', parent.window.zhtj.oid); // 渲染搜索框
                    }
                    delete parent.window.zhtj; // 删除对象
                }

                console.log('param', param);
                if(!param.id) { // 默认加载/筛选
                    console.log('默认加载/筛选');
                    sub_global = 0; // 本级 -- 下级标记(全局变量，0：本级；1：下级)
                }else { // 展开下级
                    console.log('展开下级');
                    param.oid = param.id;
                    sub_global = 1; // 下级 -- 下级标记(全局变量，0：本级；1：下级)
                }

                // 获取团费统计
                FeeManagementApi.getPaymentStatistics({
                    month: param.month, // 月份
                    oid: param.oid, // 组织ID
                    sub: sub_global // 下级标记(0：本级；1：下级)
                }).then(function (data) {
                    success(data.dataList);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                });
            },
            onLoadSuccess: function (node, data) {
                console.log('node', node);
                console.log('data', data);
                $(this).datagrid("fixRownumber"); // 行号宽度自适应
                if(sub_global == 0) {
                    if(data && data.length > 0) {
                        $('#fee_query_treegrid').treegrid('expand',data[0].oid);
                    }
                }
            },
            fit: true, // 固定表头
            // pagination: true,//如果表格需要支持分页，必须设置该选项为true
            // pageNumber: 1, // 初始化页码
            // pageSize: 20,   //表格中每页显示的行数
            // pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
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
                iconCls: 'icon-my-view',
                // text: '查看',
                text: '查看交费团员明细',
                id: 'members_list',
                handler: function(){
                    var selectedData = $('#fee_query_treegrid').treegrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    var queryParams = $('#fee_query_treegrid').treegrid('options').queryParams;
                    parent.window.zhtj = {
                        oid: selectedData.oid, // 组织ID(全局变量)
                        month: queryParams['month'] // 月份
                    };
                    console.log('parent.window.zhtj', parent.window.zhtj);
                    Utils.toggleTab('团费详情', 'view/fee_management/fee_query_detail.html'); // 创建(打开)新面板(团费详情)
                }
            }
            ]
        });
    }
    
    // 数据筛选
    function init_datafilter() {
        // 点击 '搜索' 框(组织)
        $('.search_box').click(function () {
            $('#datagrid_organization').datagrid('load', {fullName: ''});
        });

        // 点击 '所在团支部'的'x'图标 (数据筛选，弹出框 -- 选择所在团支部)
        $('#oid_filter_icon').click(function () {
            $('#oid_filter').val('').data('oid', ''); // 渲染搜索框
            return false;
        });

        // 点击 '搜索'
        $('#filter').click(function () {
            var params = {
                month: $('#month_filter').datebox('getValue'), // 月份
                oid: $('#oid_filter').data('oid') // 组织ID
            };

            $('#fee_query_treegrid').treegrid('load', params); // 加载并显示第一页的行
        });

        /****************** 日期插件年月开始 ********************/
        Utils.setDateBoxYearMonth($('#month_filter')); // 设置日期插件为年月日期插件
        /****************** 日期插件年月结束 ********************/



        // 递归获取组织id
        function getOids(dataList) {
            var oidList = [];
            for(var i=0; i<dataList.length; i++) {
                var data = dataList[i];
                oidList.push(data.oid);
                if(data.children && data.children.length > 0) {
                    var oidChildren = getOids(data.children);
                    oidList = oidList.concat(oidChildren); // 连接两个数组
                }
            }
            return oidList;
        }

        // 点击 '导出本页数据'
        $('#download').click(function () {
            var dataList = $('#fee_query_treegrid').treegrid('getData');//获得所有行

            console.log('dataList', dataList);
            var oidList = getOids(dataList); // 递归获取组织id
            console.log('oidList', oidList);
            // if(oidList.length > 100) {
            if(oidList.length > 10000) {
                $.alert('您好，仅支持10000行以内的表格下载，请调整合并部分已展开的组织树分支，以便表格下载。');
                return;
            }

            var queryParams = $('#fee_query_treegrid').treegrid('options').queryParams;
            var queryParamsStr = '?oids=' + oidList.join(','); // 请求参数字符串
            $.each(queryParams, function (key, value) {
                console.log('key', key);
                console.log('value', value);
                if(!value) { // 不能出现undefined
                    value = '';
                }
                queryParamsStr += '&' + key + '=' + value;
            });
            window.location.href = League.path + '/bg/exportPaymentStatisticsForExcel' + queryParamsStr; // 导出组织团费统计
        });
    }
    
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

                // 根据当前登录获取团员列表所在组织
                FeeManagementApi.orgList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
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
                $('#oid_filter').val(rowData.fullName).data('oid', rowData.oid); // 渲染搜索框

                $('#dialog_organization').dialog('close'); // 关闭对话框(所在团支部)
            }
        });

        // 点击 '搜索'(选择组织弹出框)
        $('#search_filter').click(function () {
            var params = {
                fullName: $('#fullName_filter').val().trim() // 组织名称
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#datagrid_organization').datagrid('load', params);
        });

        // 点击 '搜索' 框
        $('.search_box').click(function () {
            $('#datagrid_organization').datagrid('load', {fullName: ''});
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_missionBranch(); // 选择组织(需要初始化的事件)
    }

    init(); // 初始化函数 
    
});