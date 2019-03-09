/**
 * Created by licong on 2018/7/23.
 */
$(function () {
    var id_global = undefined; // 记录ID(全局变量)

    // 更新网格数据
    function  refreshDG() {
        // 初始化数据网格
        $('#dg_fee_return_rate').datagrid({
            title: '团费返还比例设置',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'parentName', title :'上级组织', sortable: false},
                {field: 'oid', title :'组织oid', sortable: false},
                {field: 'orgName', title :'组织名称', sortable: false},
                {field: 'fullName', title :'组织全称', sortable: false},
                {field: 'account', title :'银行账号', sortable: false},
                {field: 'retention', title :'留存比例', sortable: false, formatter: function(value, row, index){
                    return value + '%';
                }}
            ]],
            loader: function (param, success, error) {

                // 分页获取组织团费留存比例记录
                FeeManagementApi.getAppropriateRetentionList({
                    pageNo: param.page, // 当前页码
                    pageSize: param.rows, // 每页记录数
                    oid: param.oid // 组织ID
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#dg_fee_return_rate').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#dg_fee_return_rate').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
                        error();
                        return false;
                    }
                    success(data);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                });
            },
            onBeforeLoad: function () {
                // Utils.showLimitButtons(); // 显示权限按钮
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
                id: '',
                handler: function(){
                    var selectedData = $('#dg_fee_return_rate').datagrid('getSelected');

                    // 弹窗位置居中
                    $('#dialog_add').dialog('open'); // 弹出对话框(新增)
                }
            }, '-', {
                iconCls: 'icon-my-edit',
                text: '编辑',
                id: '',
                handler: function(){
                    var selectedData = $('#dg_fee_return_rate').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    id_global = selectedData.id; // 记录ID(全局变量)

                    $('#oid_edit').val(selectedData.oid); // 组织oid
                    $('#account_edit').val(selectedData.account); // 银行账号
                    $('#retention_edit').val(selectedData.retention); // 留存比例

                    // 弹窗位置居中
                    $('#dialog_edit').dialog('open'); // 弹出对话框(编辑)
                }
            }, '-', {
                iconCls: 'icon-my-delete',
                text: '删除',
                id: '',
                handler: function(){
                    var selectedData = $('#dg_fee_return_rate').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    $.confirm('确定删除《' + selectedData.fullName + '》组织的记录').then(function () {
                        // 删除组织留存比例
                        FeeManagementApi.delAppropriateRetention({id: selectedData.id}).then(function (data) {
                           $.alert(data.msg).then(function () {
                               Utils.updateDataGrid($('#dg_fee_return_rate')); // 更新表格数据(团费返还比例)
                           });
                        });
                    });
                }
            }, '-', {
                iconCls: 'icon-my-export',
                text: '导出',
                id: '',
                handler: function(){
                    window.location.href = League.path + '/bg/exportAppropriateRetention'; // 导出组织留存比例
                }
            }, '-', {
                iconCls: 'icon-my-import',
                text: '导入',
                id: '',
                handler: function(){
                    $.confirm('导入数据后会覆盖当前列表内容，请谨慎操作').then(function () {
                        $('#dialog_multiple_import').dialog('open'); // 弹出对话框(批量导入)
                    });
                }
            }
            ]
        });
    }


    // 新增(需要初始化的事件)
    function init_add() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)

        // 编辑 -- 对话框
        $('#dialog_add').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#fm_add').form('clear'); // 对话框关闭前，清除表单数据
                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                // iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_add').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                // iconCls:'icon-ok',
                handler:function(){

                    // 验证
                    var validate = {
                        rules: {
                            'oid_add': {
                                required: true
                            },
                            'account_add': {
                                required: true
                            },
                            'retention_add': {
                                required: true,
                                digits: true
                            }
                        },
                        messages: {
                            'oid_add': {
                                required: '请输入组织oid'
                            },
                            'account_add': {
                                required: '请输入银行账号'
                            },
                            'retention_add': {
                                required: '请输入留存比例',
                                digits: '请输入0-100的整数'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };

                    var validateFlag = $('#fm_add').validate(validate).form(); // 验证表单，填写信息是否完整

                    if(!validateFlag) { // 表单填写未完成
                        Utils.scrollToAnchor($('#fm_add')); // 跳到指定锚点
                        return;
                    }

                    var params = {
                        oid: $('#oid_add').val().trim(), // 组织ID
                        account: $('#account_add').val().trim().replace(/\s/g, ''), // 银行账户 -- 去除中间和两边空格
                        retention: $('#retention_add').val().trim() // 留存比例
                    };

                    console.log('params add', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_add .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 新增组织留存比例
                    FeeManagementApi.addAppropriateRetention(params).then(function (data) {
                        $('#dialog_add').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#dg_fee_return_rate').datagrid('load',{}); // 刷新数据表格(团费返还比例)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_add .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });
    }

    // 编辑(需要初始化的事件)
    function init_edit() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)

        // 编辑 -- 对话框
        $('#dialog_edit').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#fm_edit').form('clear'); // 对话框关闭前，清除表单数据
                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                // iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_edit').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                // iconCls:'icon-ok',
                handler:function(){

                    // 验证
                    var validate = {
                        rules: {
                            'retention_edit': {
                                required: true,
                                digits: true
                            }
                        },
                        messages: {
                            'retention_edit': {
                                required: '请输入留存比例',
                                digits: '请输入0-100的整数'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };

                    var validateFlag = $('#fm_edit').validate(validate).form(); // 验证表单，填写信息是否完整

                    if(!validateFlag) { // 表单填写未完成
                        Utils.scrollToAnchor($('#fm_edit')); // 跳到指定锚点
                        return;
                    }

                    var params = {
                        id: id_global, // 记录ID(全局变量)
                        retention: $('#retention_edit').val().trim() // 留存比例
                    };

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 修改组织留存比例
                    FeeManagementApi.editAppropriateRetention(params).then(function (data) {
                        $('#dialog_edit').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#dg_fee_return_rate')); // 更新表格数据(团费返还比例)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });
    }


    // 批量导入
    function init_multiple_import() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 批量导入 -- 对话框
        $('#dialog_multiple_import').dialog({
            // modal: true,
            closed: true,
            cache: false,
            onClose: function () {
                $('#dialog_multiple_import .fileUrlList').click(); // 重置上传插件
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_multiple_import').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                handler:function(){
                    var params = {
                        uploadExcelPath: $('#dialog_multiple_import .fileUrlList').text() // 上传Excel文件路径
                    };

                    if(!params['uploadExcelPath']) {
                        $.alert('请上传Excel文件');
                        return;
                    }

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_multiple_import .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 导入组织留存比例
                    FeeManagementApi.importAppropriateRetention(params).then(function (data) {
                        console.log('FeeManagementApi.importAppropriateRetention data', data);
                        $('#dialog_multiple_import').dialog('close'); // 关闭对话框

                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#dg_fee_return_rate').datagrid('load',{}); // 刷新数据表格(团费返还比例)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_multiple_import .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });

                }
            }]
        });

        $('.uploader_file_custom_control.uploader_multiple_import').myFileUploader(); // 初始化文件上传插件
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_add(); // 新增(需要初始化的事件)
        init_edit(); // 编辑(需要初始化的事件)
        init_multiple_import(); // 批量导入
    }

    init(); // 初始化函数 
});