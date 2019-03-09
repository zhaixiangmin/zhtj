/**
 * Created by licong on 2018/5/25.
 */
$(function () {
    var paramsList_global = ['operater', 'operateId', 'model', 'operateTime', 'ip'];
    var paramsName = {
        'operater': '操作者',
        'operateId': '操作日志ID',
        'model': '操作项目',
        'operateTime': '操作时间',
        'ip': '请求IP'
    };

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#dg_operation_log').datagrid({
            title: '团费查询',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'operater', title :'操作者', sortable: false},
                {field: 'model', title :'操作项目', sortable: false},
                {field: 'operateTime', title :'操作时间', sortable: false},
                {field: 'ip', title:'请求IP', sortable: false}
            ]],
            loader: function (param, success, error) {
                // 获取运营者操作日志列表
                SystemManagementApi.getPerateLogList({
                    pageNo: param.page, // 当前页码
                    pageSize: param.rows, // 每页记录数
                    time: param.time // 日期
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#dg_operation_log').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#dg_operation_log').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
                        error();
                        return false;
                    }
                    success(data);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                });
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
                iconCls: 'icon-my-view',
                text: '查看',
                id: 'members_list',
                handler: function(){
                    var selectedData = $('#dg_operation_log').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 获取运营者操作日志详情
                    SystemManagementApi.getPerateLogDetails({operateId: selectedData.operateId}).then(function (data) {
                        var data = data.dataList;
                        var html = '';
                        for(var i = 0; i < paramsList_global.length; i++) {
                            var param = paramsList_global[i];
                            html += '<div class="item">';
                            html += '    <span class="title">' + paramsName[param] + '：</span><span class="describe">' + data[param] + '</span>';
                            html += '</div>';
                        }

                        var operates = data['operates'];

                        // 遍历 操作详情集合
                        for(var i = 0; i < operates.length; i++) {
                            console.log('operates.length', operates.length);
                            var operate = operates[i];
                            html += '<div class="item">';
                            html += '    <span class="title">操作结果' + (i+1) + '：</span><span class="describe">' + operate + '</span>';
                            html += '</div>';
                        }
                        
                        $('#dialog .list_box .list .content').html(html);
                        $('#dialog').dialog('open'); // 弹出对话框(查看)
                    });
                }
            }
            ]
        });
    }

    // 数据筛选
    function init_datafilter() {

        // 点击 '搜索'按钮(数据筛选)
        $('#filter').click(function () {
            var params = {
                time: $('#time_filter').combobox('getValue') // 日期
            };

            $('#dg_operation_log').datagrid('load', params); // 加载并显示第一页的行
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
    }

    init(); // 初始化函数

});