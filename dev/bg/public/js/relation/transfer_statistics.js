/**
 * Created by licong on 2018/8/3.
 */

$(function () {

    // 更新网格数据
    function refreshDG() {

        // 初始化数据网格
        $('#statistics_dg').datagrid({
            title: '组织关系转接数据统计',  //表格名称
            border: true,
            columns:[
                [
                    { title: "", colspan: 1, rowspan: 2},
                    // { title: "转出数据统计", colspan: 5 },
                    { title: "转出数据统计", colspan: 6 },
                    { title: "转入数据统计", colspan: 4 }
                ],
                [
                    { title: "", colspan: 2 },
                    { title: "已办理", colspan: 2 },
                    // { title: "总数"},
                    { title: "总数", colspan: 2},
                    { title: "" },
                    { title: "已办理", colspan: 2 },
                    { title: "总数" }
                ],
                [
                    {field: 'fullName', title: '组织名称', sortable: false},
                    {field: 'rolloutBranchAuditedNum', title :'转出支部<br/>审核通过人数', sortable: false},
                    {field: 'rolloutBranchParentAuditedNum', title :'转出支部上级<br/>审核通过人数', sortable: false},
                    {field: 'rolloutSuccessNum', title :'已成功<br/>转出人数', sortable: false},
                    {field: 'rolloutReturnNum', title :'被接收方<br/>拒收（退回）人数', sortable: false},
                    {field: 'rolloutApplySum', title :'已发起转出<br/>申请总人数', sortable: false},
                    {field: 'rolloutInsideSchoolSum', title :'已发起校内转接<br/>申请总团员数', sortable: false},
                    {field: 'rollinBranchAuditedNum', title :'转入支部<br/>审核通过人数', sortable: false},
                    {field: 'rollinSuccessNum', title :'已成功<br/>转入人数', sortable: false},
                    {field: 'rollinReturnNum', title :'被接收方<br/>拒收（退回）人数', sortable: false},
                    {field: 'rollinApplySum', title :'申请转入总人数<br/>(转出方已审核通过）', sortable: false}
                ]],
            loader: function (param, success, error) {
                // 组织关系转接数据统计信息分页列表
                RelationApi.transferStatisticsList({
                    pageIndex: param.page, // 当前页码
                    pageSize: param.rows // 每页记录数
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
            ]]
        });


        // 点击 '导出本页数据'
        $('#download').click(function () {
            var paginationOptions = $('#statistics_dg').datagrid('getPager').data("pagination" ).options;
            console.log('paginationOptions', paginationOptions);
            var queryParamsStr = '?pageIndex=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize; // 请求参数字符串
            console.log('queryParamsStr', queryParamsStr);
            window.location.href = League.path + '/bg/transferStatistics/export' + queryParamsStr; // 组织关系转接数据统计信息列表导出下载Excel
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);
    }

    init(); // 初始化函数
});