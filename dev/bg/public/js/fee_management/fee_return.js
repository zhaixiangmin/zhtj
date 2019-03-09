/**
 * Created by licong on 2018/8/2.
 */

$(function () {
    // 获取当前组织账户余额
    FeeManagementApi.getBalance({}).then(function (data) {
        console.log('FeeManagementApi.getVirtualAmount data', data);
        $('#virtualAmount').text(data.data); // 虚拟账户金额
    });

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#fee_return_datagrid').datagrid({
            title: '团费返还',  //表格名称
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'appropriateTime', title :'返还月份', sortable: false},
                {field: 'totalAmount', title :'团费收交总额', sortable: false},
                {field: 'retentionAmount', title :'上级已返金额', sortable: false},
                {field: 'retention', title:'返还比例', sortable: false},
                {field: 'createTime', title:'返还日期', sortable: false}
            ]],
            loader: function (param, success, error) {
                // 分页获取组织收到的团费划拨记录
                FeeManagementApi.getAppropriateRecord({
                    pageNo: param.page, // 当前页码
                    pageSize: param.rows, // 每页记录数
                    startTime: Utils.returnValidString(param.startTime), // 返还起始月份
                    endTime: Utils.returnValidString(param.endTime) // 结束月份
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#fee_return_datagrid').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#fee_return_datagrid').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
                    var selectedData = $('#fee_return_datagrid').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    parent.window.zhtj = {
                        id: selectedData.id // 团费返还记录ID
                    };
                    console.log('parent.window.zhtj', parent.window.zhtj);
                    Utils.toggleTab('返还分配详情', 'view/fee_management/fee_return_detail.html'); // 创建(打开)新面板(返还分配详情)

                }
            }
            ]
        });
    }
    
    // 数据筛选
    function init_datafilter() {

        /****************** (返还起始月份)日期插件年月开始 ********************/
        Utils.setDateBoxYearMonth($('#startTime_filter')); // 设置日期插件为年月日期插件
        /****************** (返还起始月份)日期插件年月结束 ********************/
        
        /****************** (结束月份)日期插件年月开始 ********************/
        Utils.setDateBoxYearMonth($('#endTime_filter')); // 设置日期插件为年月日期插件
        /****************** (结束月份)日期插件年月结束 ********************/
        
        // 点击 '搜索'
        $('#filter').click(function () {
            var params = {
                startTime: $('#startTime_filter').datebox('getValue'), // 返还起始月份
                endTime: $('#endTime_filter').datebox('getValue') // 结束月份
            };

            // 只选返还起始月份
            if(!params.startTime && params.endTime) {
                $.alert('请选择返还起始月份！');
                return;
            }

            // 只选择结束月份
            if(params.startTime && !params.endTime) {
                $.alert('请选择结束月份！');
                return;
            }

            // 选择起始月份和结束月份
            if(params.startTime && params.endTime) {
                var startTime = new Date(params.startTime).getTime();
                var endTime = new Date(params.endTime).getTime();
                if(startTime >= endTime) {
                    $.alert('结束月份要大于返还起始月份！');
                    return;
                }
            }

            $('#fee_return_datagrid').datagrid('load', params); // 加载并显示第一页的行
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        // init_publish(); // 公示凭证(需要初始化的事件)
    }

    init(); // 初始化函数 
    
});