/**
 * Created by licong on 2018/5/2.
 */

$(function () {
    var orgId_global = undefined; // 组织ID(全局变量)
    // emptyLeagueCommittee-空心组织、emptyLeagueBranch-空心团支部、nullCadreLeagueBranch-无团干团支部
    var emptyOrgType_global = undefined; // 空心组织类型(全局变量)
    var num_global = undefined; // 组织数量(全局变量)


    if(parent.window.zhtj && parent.window.zhtj.orgId && parent.window.zhtj.emptyOrgType) { // 编辑公告
        orgId_global = parent.window.zhtj.orgId; // 公告ID(全局变量)
        emptyOrgType_global = parent.window.zhtj.emptyOrgType; // 空心组织类型(全局变量)
        num_global = parent.window.zhtj.num; // 组织数量(全局变量)
        $('#download').text('下载所有' + parent.window.zhtj.emptyName + '列表');
        // emptyName_global = parent.window.zhtj.emptyName; // 空心组织名称(全局变量)
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
    }

    // 更新网格数据
    function refreshDG() {

        // 初始化数据网格
        $('#datagrid_empty').datagrid({
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'fullName', title: '团组织全称', sortable: false},
                {field: 'parentName', title: '上级组织全称', sortable: false},
                {field: 'typeName', title: '组织类型', sortable: false},
                {field: 'createTime', title: '组织建立时间', sortable: false},
                {field: 'sumLeagueMember', title: '团员人数', sortable: false}
            ]],
            loader: function (param, success, error) {
                if(!orgId_global || !emptyOrgType_global) {
                    return;
                }

                // 单个组织的空心组织明细分页列表
                OrganizationManagementApi.emptyOrgList({
                    pageIndex: param.page, // 当前页码
                    pageSize: param.rows, // 每页记录数
                    orgId: orgId_global, // 组织ID(全局变量)
                    statEmptyOrgType: emptyOrgType_global // 空心组织类型(全局变量)
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#datagrid_empty').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#datagrid_empty').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
            // frozenColumns: [[  //固定在表格左侧的栏
            //     {field: 'check', checkbox: true}
            // ]],
            // singleSelect:true, // 设置为 true，则只允许选中一行
        });

        // 点击 '下载所有空心团支部列表'
        $('#download').click(function () {
            if(num_global > 60000) { // 组织数量(全局变量)
                $.alert('下载列表数量不能超过60000');
                return;
            }
            var queryParamsStr = '?orgId=' + orgId_global + '&statEmptyOrgType=' + emptyOrgType_global; // 请求参数字符串
            console.log('queryParamsStr', queryParamsStr);
            window.location.href = League.path + '/bg/orgStatistics/singleOrg/emptyOrg/export' + queryParamsStr; // 单个组织的空心组织明细列表下载导出Excel
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);
    }

    init(); // 初始化函数
});