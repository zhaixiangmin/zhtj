/**
 * Created by licong on 2017/1/18.
 */

$(function () {
    var otaids_global = undefined; // 组织转接审核记录id(全局变量)

    var currentSelectName = undefined; // 当前选择名称(全局变量，primalOid：转出团支部，newOid：转入团支部)
    // 状态名称
    var auditStatusName = {
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

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#undo_application').datagrid({
            title: '我的发起',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'mName', title :'姓名', sortable: false},
                {field: 'auditStatus', title :'状态', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return auditStatusName[value];
                    }
                }},
                {field: 'studyWorkUnit', title :'学习工作单位', sortable: false}, // 学习工作单位
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
                {field: 'waitingDate', title :'流转至本组织待办日期', sortable: false}
            ]],
            loader: function (param, success, error) {
                // 待办列表
                RelationApi.todoList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    mName: param.mName, // 团员姓名
                    primalOid: param.primalOid, // 原组织
                    newOid: param.newOid // 新组织
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#undo_application').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        console.log('curr', curr);
                        $('#undo_application').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
            // singleSelect:true, // 设置为 true，则只允许选中一行
            frozenColumns: [[  //固定在表格左侧的栏
                {field: 'check', checkbox: true}
            ]],
            toolbar: [{
                iconCls: 'icon-my-audit',
                text: '审核',
                id: 'league_view',
                handler: function(){
                    // var selectedData = $('#undo_application').datagrid('getSelected');
                    var checkedList = $('#undo_application').datagrid('getChecked');
                    console.log('checkedList', checkedList);
                    if(!checkedList || checkedList.length <= 0) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    var otaidList = []; // 组织转接审核记录id列表
                    var html = '';
                    for(var i=0; i<checkedList.length; i++) {
                        otaidList.push(checkedList[i].otaid);
                        if(i == checkedList.length -1) { // 最后一条记录
                            html += '<a data-mid="' + checkedList[i].mid + '" data-otid="' + checkedList[i].otid + '">' + checkedList[i].mName + '</a> ' + checkedList.length;
                        }else {
                            html += '<a data-mid="' + checkedList[i].mid + '" data-otid="' + checkedList[i].otid + '">' + checkedList[i].mName + '</a>、';
                        }
                    }
                    // 修改文字
                    if(checkedList.length == 1) { // 单个
                        parent.window.zhtj = {
                            isSingle: true, // 是否单个审核(true：是)
                            mid: checkedList[0].mid, // 团员id
                            mName: checkedList[0].mName, // 团员姓名
                            otid: checkedList[0].otid, // 组织转移申请ID
                            otaid: checkedList[0].otaid // 组织转接审核记录id
                        };
                        Utils.toggleTab('业务详情', 'view/relation/flow_chat.html'); // 创建(打开)新面板(业务详情)
                    }else { // 多个
                        otaids_global = otaidList.join(','); // 组织转接审核记录id(全局变量)

                        $('#dialog_audit .member_list_box .member_list').html(html);
                        $('#dialog_audit').dialog('open'); // 弹出对话框(批量审核)
                    }
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
                $('#' + currentSelectName +'_filter').data('oid', rowData.oid); // 渲染所在团支部ID
                $('#' + currentSelectName +'_filter').val(rowData.fullName); // 渲染所在团支部名称
                $('#dialog_missionBranch').dialog('close'); // 关闭对话框(所在团支部)
            }
        });
    }

    // 数据筛选(需要初始化的事件)
    function init_datafilter() {

        // 点击 '转出团支部/转入团支部'
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

        // 点击 搜索(所在团支部)
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
                primalOid: $('#primalOid_filter').data('oid'), // 转出团支部
                newOid: $('#newOid_filter').data('oid') // 转入团支部
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#undo_application').datagrid('load', params);
        });
    }

    // 批量审核(需要初始化的事件)
    function init_audit() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 审核 -- 对话框
        // 申请转出团员 -- 对话框
        $('#dialog_audit').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#fm').form('clear'); // 对话框关闭前，清除表单数据
                $('.checkbox').removeClass('active'); // 取消勾选单选框
                $('#reason').val('').hide(); // 清空输入框并隐藏
            },
            buttons: [{
                text:'取消',
                // iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_audit').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                // iconCls:'icon-ok',
                handler:function(){
                    var params = {
                        otaids:  otaids_global, // 审核记录ID(多个ID之间用英文逗号分隔开)
                        auditStatus: $('#dialog_audit .checkbox.active').data('id'), // 审核状态(1:同意，2：退回)
                        returnReason: $('#reason').val().trim() // 退回原因(auditStatus=2传入)
                    };
                    console.log('params', params);

                    if(!params.auditStatus) {
                        $.alert('请审核该申请(同意/拒绝)');
                        return;
                    }
                    if(params.auditStatus == 1) { // 同意
                        params.returnReason = undefined;
                    }else if (params.auditStatus == 2 && !params.returnReason) { // 退回
                        $.alert('请输入退回原因');
                        return;
                    }

                    console.log('提交成功', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_audit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});
                    
                    // 批量审核团员审核
                    RelationApi.batchAudit(params).then(function (data) {
                        $('#dialog_audit').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#undo_application')); // 更新表格数据(待审核)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_audit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        // 点击单选框
        $('.checkbox').click(function () {
            var name = $(this).data('name');
            var id = $(this).data('id');
            $('.checkbox[data-name=' + name + ']').removeClass('active');
            $(this).addClass('active');
            if(id == 2) { // 退回
                $('#reason').show();
                // window.location.href = "#reason"; // 跳到指定锚点(理由)
            }else {
                $('#reason').hide();
            }
        });

        // 点击'团员姓名'(跳转到团员详情页面)
        $('.member_list_box .member_list').on('click', 'a', function () {
            var mid = $(this).data('mid');
            var otid = $(this).data('otid');
            parent.window.zhtj = {
                mid: mid, // 团员id
                otid: otid // 组织转接申请id
            };
            Utils.toggleTab('业务详情', 'view/relation/flow_chat.html'); // 创建(打开)新面板(业务详情)
        });
    }


    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_missionBranch(); // 选择团支部(需要初始化的事件)
        init_audit(); // 批量审核(需要初始化的事件)
    }

    init(); // 初始化函数 
});