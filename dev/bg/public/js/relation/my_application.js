/**
 * Created by licong on 2017/1/18.
 */

$(function () {
    var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)
    var currentSelectName = undefined; // 当前选择名称(全局变量，primalOid：转出团支部，newOid：转入团支部)
    var otid_global = undefined; // 组织转接申请id(全局变量)
    
    // 状态名称
    var auditStatusName = {
        '0': '撤回',
        '1': '转出团支部待审核',
        '2': '转出团支部的上级待审核',
        '3': '转入团支部待审核',
        '4': '转入团支部的上级待审核',
        '5': '接转成功',
        '6': '转出团支部退回',
        '7': '转出团支部的上级退回',
        '8': '转入团支部退回',
        '9': '转入团支部的上级退回',
        '10': '转出团支部同意',
        '11': '转出团支部的上级同意',
        '12': '转入团支部同意',
        '13': '转入团支部的上级同意'
    };

    // 状态提示语
    var auditStatusTips = {
        '0': '该转接申请已被撤回，不能再次申请撤回。',
        '4': '该转接申请已被接收方组织审核通过，无法撤回申请。',
        '5': '该转接申请已被接收方组织审核通过，无法撤回申请。',
        '6': '该转接申请已被退回，不能再次申请撤回。',
        '7': '该转接申请已被退回，不能再次申请撤回。',
        '8': '该转接申请已被退回，不能再次申请撤回。',
        '9': '该转接申请已被退回，不能再次申请撤回。'
    };

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#my_application').datagrid({
            title: '转接发起记录',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'mName', title :'姓名', sortable: false},
                {field: 'auditStatus', title :'状态', sortable: false, formatter: function(value, row, index){
                    // 申请人类型(1:组织，２团员)
                    if(value == 0) { // 撤回
                        // 申请人类型(1:组织，２团员)
                        if(row.applicantType == 1) { // 组织
                            return '组织撤回';
                        }else if(row.applicantType == 2) { // 团员
                            return '团员自行撤回';
                        }
                    }else { // 非撤回
                        return auditStatusName[value];
                    }
                }},
                {field: 'primalName', title :'转出团支部', sortable: false, formatter: function(value, row, index){
                    return Utils.validOrgName(value);
                }}, // 原组织名称
                {field: 'primalPName', title :'转出团支部的上级', sortable: false, formatter: function(value, row, index){
                    return Utils.validOrgName(value);
                }}, // 原组织上级名称
                {field: 'newName', title :'转入团支部', sortable: false, formatter: function(value, row, index){
                    return Utils.validOrgName(value);
                }}, // 新组织名称
                {field: 'newPName', title :'转入团支部的上级', sortable: false, formatter: function(value, row, index){
                    return Utils.validOrgName(value);
                }}, // 新组织上级名称
                {field: 'createTime', title :'申请日期', sortable: false}
            ]],
            loader: function (param, success, error) {
                // 组织转接发起转接
                RelationApi.applyList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    applicantType: 1, // 申请人类型(1:组织，２团员)
                    auditStatus: param.auditStatus, // 状态(可不传，接转状态（1:转出团支部待审核,2:转出团支部的上级待审核,3:转入团支部待审核,4:转入团支部的上级待审核,5:接转成功,6:转出团支部退回,7:转出团支部的上级退回,8:转入团支部退回,9:转入团支部的上级退回,10:转出团支部同意,11:转出团支部的上级同意,12:转入团支部同意,12:转入团支部的上级同意）)
                    mName: param.mName, // 团员姓名
                    // mobile: param.mobile, // 团员手机号码
                    primalOid: param.primalOid, // 原组织
                    newOid: param.newOid // 新组织
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#my_application').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        console.log('curr', curr);
                        $('#my_application').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
                $('#orgTransferApply_view').parent().show(); // 不用权限控制(查看)
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
                id: 'orgTransferApply_view',
                handler: function(){
                    var selectedData = $('#my_application').datagrid('getSelected');
                    console.log('selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    parent.window.zhtj = {
                        otid: selectedData.otid, // 组织转移申请ID
                        mid: selectedData.mid // 团员id
                    };
                    Utils.toggleTab('业务详情', 'view/relation/flow_chat.html'); // 创建(打开)新面板(业务详情)
                }
            }, '-', {
                iconCls: 'icon-my-reload',
                text: '撤回转接申请',
                id: 'orgTransferApply_withdraw',
                handler: function(){
                    var checkedList = $('#my_application').datagrid('getChecked');
                    console.log('checkedList', checkedList);
                    if(!checkedList || checkedList.length <= 0) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    if(checkedList.length > 1) {
                        $.alert('撤回转接申请暂不支持批量操作');
                        return;
                    }

                    var transfer = checkedList[0];

                    // 申请人类型(1:组织，２团员)
                    if(transfer.applicantType != 1) { // 非组织
                        $.alert('团员端发起的转接申请，仅该团员账号能撤回');
                        return;
                    }

                    if(transfer.primalOid != account_global.oid) { // 当前登录组织非发起组织
                        $.alert('组织端发起的转接申请，仅该组织（及该组织运营者）能撤回');
                        return;
                    }

                    // '1': '转出团支部待审核', '2' : '转出团支部的上级待审核', '3' : '转入团支部待审核',
                    if(transfer.auditStatus != 1 && transfer.auditStatus != 2 && transfer.auditStatus != 3) {
                        // $.alert('该转接申请已被撤回/退回，不能再次申请撤回');
                        $.alert(auditStatusTips[transfer.auditStatus]);
                        return;
                    }

                    otid_global = transfer.otid; // 组织转接申请id(全局变量)

                    $('#dialog_transfer_withdraw').dialog('open'); // 弹出对话框(撤回转接申请)
                }
            }]
        });

    }

    // 选择团支部(需要初始化的事件)
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
                RelationApi.getOrgByName({
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
            onClickRow: function (rowIndex, rowData) {
                console.log('rowData', rowData);
                // missionBranch_global = rowData.oid; // 所在团支部(全局变量)
                // $('#oid').find('input').val(rowData.fullName); // 渲染所在团支部(新增/编辑团干弹出框)
                // currentSelectName：当前选择名称(全局变量，primalOid：转出团支部，newOid：转入团支部)
                $('#' + currentSelectName +'_filter').data('oid', rowData.oid); // 渲染所在团支部ID
                $('#' + currentSelectName +'_filter').val(rowData.fullName); // 渲染所在团支部名称
                $('#dialog_missionBranch').dialog('close'); // 关闭对话框(所在团支部)
            }
        });
    }

    // 数据筛选(需要初始化的事件)
    function init_datafilter() {

        // 状态
        $('#auditStatus_filter').combobox({
            width: 173,
            valueField: 'key',
            textField: 'value',
            data: [
                {key: '', value: '全部'},
                {key: '1', value: '转出团支部待审核'},
                {key: '2', value: '转出团支部的上级待审核'},
                {key: '3', value: '转入团支部待审核'},
                {key: '4', value: '转入团支部的上级待审核'},
                {key: '5', value: '接转成功'},
                {key: '6', value: '转出团支部退回'},
                {key: '7', value: '转出团支部的上级退回'},
                {key: '8', value: '转入团支部退回'},
                {key: '9', value: '转入团支部的上级退回'}
                // {key: '10', value: '转出团支部同意'},
                // {key: '11', value: '转出团支部的上级同意'},
                // {key: '12', value: '转入团支部同意'},
                // {key: '13', value: '转入团支部的上级同意'}
            ]
        });

        // 点击 '转出团支部/转入团支部'(筛选条件)
        $('.primalOid_filter, .newOid_filter').click(function () {
            currentSelectName = 'primalOid'; // 转出团支部 -- 当前选择名称(全局变量，primalOid：转出团支部，newOid：转入团支部)
            if($(this).hasClass('newOid_filter')) {
                currentSelectName = 'newOid'; // 转入团支部 -- 当前选择名称(全局变量，primalOid：转出团支部，newOid：转入团支部)
            }
            $('#fullName_filter_missionBranch').val(''); // 清空团支部名称(选择团支部弹出框)
            // 加载'所在团支部' 数据网格
            $('#datagrid_missionBranch').datagrid('load', {
                fullName: ''
            });
        });

        // 点击 '转出团支部/转入团支部'的'x'图标 (数据筛选，弹出框 -- 选择所在团支部)
        $('#primalOid_filter_icon, #newOid_filter_icon').click(function () {
            var id = $(this).attr('id');
            console.log('id', id);
            $(this).parents('.search_box').find('input').val('').data('oid', ''); // 重置搜索框
            return false;
        });


        // 点击 搜索按钮(选择团支部)
        $('#filter_missionBranch').click(function () {
            var params = {
                fullName: $('#fullName_filter_missionBranch').val().trim() // 所在团支部
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#datagrid_missionBranch').datagrid('load', params);
        });


        // 点击查询按钮 -- 数据筛选
        $('#filter').click(function () {
            var params = {
                // pageNo: param.page, // 当前页码
                // pageSize: param.rows, // 每页记录数
                mName: $('#mName_filter').val().trim(), // 团员姓名
                // mobile: $('#mobile_filter').val().trim(), // 手机号码
                auditStatus: $('#auditStatus_filter').combobox('getValue'), // 状态(可不传，接转状态（1:转出团支部待审核,2:转出团支部的上级待审核,3:转入团支部待审核,4:转入团支部的上级待审核,5:接转成功,6:转出团支部退回,7:转出团支部的上级退回,8:转入团支部退回,9:转入团支部的上级退回,10:转出团支部同意,11:转出团支部的上级同意,12:转入团支部同意,12:转入团支部的上级同意）)
                primalOid: $('#primalOid_filter').data('oid'), // 转出团支部
                newOid: $('#newOid_filter').data('oid') // 转入团支部
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#my_application').datagrid('load', params);
        });
    }


    // 撤回转接申请(需要初始化的事件)
    function init_transfer_withdraw() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)

        // 申请删除团员 -- 对话框
        $('#dialog_transfer_withdraw').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#reasonForWithdrawal').val(''); // 清空删除原因文本框
            },
            buttons: [{
                text: '取消',
                // iconCls:'icon-cancel',
                handler: function () {
                    $('#dialog_transfer_withdraw').dialog('close'); // 关闭对话框
                }
            }, {
                text: '确定',
                // iconCls:'icon-ok',
                handler: function () {

                    var params = {
                        otid: otid_global, // 组织转接申请id
                        reasonForWithdrawal: $('#reasonForWithdrawal').val().trim() // 撤回原因
                    };
                    console.log('params', params);

                    if(!params.reasonForWithdrawal) {
                        $.alert('请录入撤回原因');
                        return;
                    }

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_transfer_withdraw .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 组织转接撤回
                    RelationApi.withdraw(params).then(function (data) {
                        $('#dialog_transfer_withdraw').dialog('close'); // 关闭对话框(撤回转接申请)
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#my_application')); // 更新表格数据(发起转接)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_transfer_withdraw .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        // 申请删除理由类型
        $('#deletedReason').combobox({
            valueField: 'id',
            textField: 'describe',
            width: 300,
            data: [
                { id: '', describe: '请选择删除理由' },
                { id: '1', describe: '团员报错团支部，且被误审核通过' },
                { id: '2', describe: '入团时间填错，且被审核通过' }
            ]
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_missionBranch(); // 选择团支部(需要初始化的事件)
        init_transfer_withdraw(); // 撤回转接申请(需要初始化的事件)
    }

    init(); // 初始化函数 
});