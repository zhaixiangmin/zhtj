/**
 * Created by licong on 2017/9/22.
 */
$(function () {

    var operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'
    var rid_global = undefined; // 角色ID(全局变量)

    // 验证配置对象
    var validate_global = {
        rules: {
            'roleName': {
                required: true
            },
            'isSystem': {
                required: true
            },
            'orgType': {
                required: true
            },
            'orgLevel': {
                required: true
            }
        },
        massages: {
            'roleName': {
                required: '请输入角色名称'
            },
            'isSystem': {
                required: '请选择是否默认的'
            },
            'orgType': {
                required: '请选择组织类型'
            },
            'orgLevel': {
                required: '请选择组织级别'
            }
        },
        errorPlacement:function(error,element) { // 自定义错误放到哪里
            error.appendTo(element.parents("tr"));
        }
    };

    /**
     * 获取树状结构数组
     * @param data {array} 数组
     * @param pid {int} 父类ID
     * @param parentName {string} 父类名称
     * @returns {Array}
     */
    function getTree(data, pid, parentName) {
        var tmp = [];
        var index = 0;
        for(var i=0; i<data.length; i++) {
            var item = data[i];
            if (item[parentName] == pid) {
                tmp[index] = item;
                data.splice(i, 1); // 删除数组元素
                i--;
                var children = getTree(data, item['id'], parentName);
                if (children && children.length > 0) {
                    tmp[index]['children'] = children;
                    // tmp[index].checked = undefined;
                    delete tmp[index].checked;
                }
                index++;
            }
        }
        return tmp;
    }

    // 更新网格数据
    function refreshDG() {
        var typeName = {
            '1': '领导机关团组织',
            '2': '团委',
            '3': '团工委',
            '4': '团总支',
            '5': '团支部'
        };

        // 初始化数据网格
        $('#roles_management').datagrid({
            title: '角色管理',  //表格名称           iconCls: 'icon-edit',  //图标
            width: 900,   //表格宽度
            // width: 900,   //表格宽度
            // height: 520,   //表格高度，可指定高度，可自动
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'roleName', title: '角色名称', sortable: false},
                {field: 'orgType', title :'组织类型', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return typeName[value];
                    }
                }},
                {field: 'orgLevel', title:'组织层级', sortable: false},
                {field: 'description', title :'描述', width: 500, sortable: false}
            ]],
            loader: function (param, success, error) {
                // console.log('loader param============', param);

                PermissionSettingApi.findAllRole({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    keyword: param.keyword // 角色名字
                }).then(function (data) {
                    $('#error_tips').remove(); // 如果有提示文字 '暂无数据'，先清除

                    // console.log('loader data', data);
                    success(data);
                    if(data.total == 0) {
                        // console.log('暂无数据');
                        $('.datagrid-view').after('<p id="error_tips" style="text-align: center;">暂无数据</p>');
                    }
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
                    return false;
                });
            },
            onBeforeLoad: function () {
                Utils.showLimitButtons(); // 显示权限按钮
            },
            fit: true, // 固定表头
            pagination: true,//如果表格需要支持分页，必须设置该选项为true
            pageNumber: 1, // 初始化页码
            pageSize: 20,   //表格中每页显示的行数
            pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
            rownumbers: true,   //是否显示行号
            nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
            striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
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
                id: 'role_add',
                handler: function(){
                    operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'
                    $('#dialog').dialog('setTitle', operation_global + '角色'); // 修改对话框标题

                    $('#orgType').combobox('setValue', '1'); // 默认选中第一个
                    $('#orgLevel').combobox('setValue', '1'); // 默认选中第一个

                    // 弹窗位置居中
                    // $("#dialog").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog').parents('.window').outerHeight())*0.5 });
                    $('#dialog').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-edit',
                text: '编辑',
                id: 'role_edit',
                handler: function(){
                    var selectedData = $('#roles_management').treegrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    operation_global = '编辑'; // 当前操作(全局变量) -->  '新增'、'编辑'
                    $('#dialog').dialog('setTitle', operation_global + '角色'); // 修改对话框标题
                    rid_global = selectedData.rid; // 角色ID(全局变量)
                    
                    $('#fm').form('load', {
                        roleName: selectedData.roleName, // 角色名称
                        // isSystem: selectedData.isSystem, // 是否是默认的
                        // orgType: selectedData.orgType, // 组织类型
                        // orgLevel: selectedData.orgLevel, // 组织级别
                        description: selectedData.description // 描述
                    });

                    $('#isSystem').combobox('setValue', selectedData.isSystem); // 是否是默认的
                    $('#orgType').combobox('setValue', selectedData.orgType); // 组织类型
                    $('#orgLevel').combobox('setValue', selectedData.orgLevel); // 组织级别

                    // 弹窗位置居中
                    // $("#dialog").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog').parents('.window').outerHeight())*0.5 });
                    $('#dialog').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-configuration',
                text: '分配权限',
                id: 'role_allocate',
                handler: function(){
                    var selectedData = $('#roles_management').treegrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    rid_global = selectedData.rid; // 角色ID(全局变量)
                    $('#permission_allocate_tree').tree('reload');

                    // 弹窗位置居中
                    // $("#dialog_permission_allocate").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_permission_allocate').parents('.window').outerHeight())*0.5 });
                    $('#dialog_permission_allocate').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-view',
                text: '查看权限',
                id: 'role_view',
                handler: function(){
                    var selectedData = $('#roles_management').treegrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    rid_global = selectedData.rid; // 角色ID(全局变量)
                    $('#permission_tree').tree('reload');


                    // 弹窗位置居中
                    // $("#dialog_permission").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_permission').parents('.window').outerHeight())*0.5 });
                    $('#dialog_permission').dialog('open'); // 弹出对话框
                }
            }
            ]
        });

        // Utils.showLimitButtons(); // 显示权限按钮
    }

    // 数据筛选(需要初始化的事件
    function init_datafilter() {
        // 点击'查询'
        $('#filter').click(function () {
           var keyword = $('#keyword_filter').val().trim();
            // 分页插件自动传递 page页码和rows页大小
            $('#roles_management').datagrid('load', {keyword: keyword});
        });
    }

    // 新增/修改(需要初始化的事件)
    function init_add_edit() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)

        // 新增 -- 对话框
        $('#dialog').dialog({
            // modal: true,
            // closed: true,
            cache: false,
            onClose: function () {
                $('#fm').form('clear'); // 对话框关闭前，清除表单数据
                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                // iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                // iconCls:'icon-ok',
                handler:function(){
                    var validateFlag = $('#fm').validate(validate_global).form(); // 验证表单，填写信息是否完整
                    if(!validateFlag) { // 表单填写未完成
                        return;
                    }

                    var params = {
                        roleName: $('#roleName').val().trim(), // 角色名称
                        description: $('#description').val().trim(), // 描述
                        isSystem: 1, // 是否是默认的(默认1)
                        // isSystem: $('#isSystem').combobox('getValue'), // 是否是默认的(默认1)
                        orgType: $('#orgType').combobox('getValue'), // 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
                        orgLevel: $('#orgLevel').combobox('getValue') // 组织级别(1-10级)
                    };

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 当前操作(全局变量) -->  '新增'、'编辑'、'查看'
                    if(operation_global == '新增') {
                        // 角色新增
                        PermissionSettingApi.addRole(params).then(function (data) {
                            $('#dialog').dialog('close'); // 关闭对话框
                            $.alert(data.msg).then(function () {
                                // 分页插件自动传递 page页码和rows页大小
                                $('#roles_management').datagrid('load',{});
                            });
                        }).always(function () {
                            isClick = false; // 设置为 未点击
                            $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                        });
                    }else if(operation_global == '编辑') {
                        params.rid = rid_global; // 角色ID(全局变量)

                        // 角色修改
                        PermissionSettingApi.updateRole(params).then(function (data) {
                            $('#dialog').dialog('close'); // 关闭对话框
                            $.alert(data.msg).then(function () {
                                Utils.updateDataGrid($('#roles_management')); // 更新表格数据(组织管理)
                            }).always(function () {
                                isClick = false; // 设置为 未点击
                                $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                            });
                        });
                    }
                }
            }]
        });
        
        
        // 获取组织类型
        $('#orgType').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                PermissionSettingApi.getType({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取组织类型');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取组织级别
        $('#orgLevel').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                PermissionSettingApi.getOrgLevel({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取组织级别');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });
    }

    // 分配/查看权限(需要初始化的事件)
    function init_permission() {

        var tree_success_loaded = false; // 树加载完成(false：未加载完成，true：加载完成)

        // 查看权限 -- 树
        $('#permission_tree').tree({
            // lines: true, // 定义是否显示树线条
            checkbox: true, // 显示复选框
            // cascadeCheck: false, // 是否级联检查
            formatter:function(node){
                return node.text;
            },
            loader: function(param, success, error){
                console.log('permission_tree rid_global', rid_global);
                if(!rid_global) {
                    return;
                }
                // 查看权限(菜单树型列表)
                PermissionSettingApi.distrPermission({rid: rid_global}).then(function (data) {
                    var menuList = data.rows;
                    var menuTree = getTree(menuList, 0, 'pId'); // 获取树状结构数组
                    console.log('permission_tree menuTree', menuTree);
                    if(menuTree && menuTree.length > 0) {
                        menuTree = menuTree[0].children;
                    }
                    success(menuTree);
                    // success(data.rows);
                }, function () {
                    error();
                    return false;
                });
            },
            onBeforeLoad: function (node, param) {
                tree_success_loaded = false; // 树加载完成(false：未加载完成，true：加载完成)
            },
            onLoadSuccess: function (node, data) {
                tree_success_loaded = true; // 树加载完成(false：未加载完成，true：加载完成)
            },
            onBeforeCheck: function (node, checked) {
                // 树加载完成，禁止勾选事件
                if(tree_success_loaded) { // 树加载完成(false：未加载完成，true：加载完成)
                    return false;
                }
            }
        });

        // 查看权限 -- 对话框
        $('#dialog_permission').dialog({
            cache: false,
            onClose: function () {
                $('#fm_permission').form('clear'); // 对话框关闭前，清除表单数据
            }
        });

        // 分配权限 -- 树
        $('#permission_allocate_tree').tree({
            // lines: true, // 定义是否显示树线条
            checkbox: true, // 显示复选框
            // cascadeCheck: false, // 是否级联检查
            formatter:function(node){
                return node.text;
            },
            loader: function(param, success, error){
                if(!rid_global) {
                    return;
                }
                // 查看权限(菜单树型列表)
                PermissionSettingApi.distrPermission({rid: rid_global}).then(function (data) {
                    var menuList = data.rows;
                    var menuTree = getTree(menuList, 0, 'pId'); // 获取树状结构数组
                    console.log('permission_allocate_tree menuTree', menuTree);
                    if(menuTree && menuTree.length > 0) {
                        menuTree = menuTree[0].children;
                    }
                    success(menuTree);
                    // success(data.rows);
                }, function () {
                    error();
                    return false;
                });
            },
            // onCheck: function (node, checked) {
            //     var parent = $('#permission_allocate_tree').tree('getParent', node.target);
            //     if(parent) {
            //         if(checked) {
            //             $('#permission_allocate_tree').tree('check', parent.target); // 父节点勾选
            //         }
            //     }
            // }
        });

        // 分配权限 -- 对话框
        $('#dialog_permission_allocate').dialog({
            cache: false,
            onClose: function () {
                // $('#fm_permission_allocate').form('clear'); // 对话框关闭前，清除表单数据
            },
            buttons: [{
                text:'取消',
                // iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_permission_allocate').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                // iconCls:'icon-ok',
                handler:function(){
                    // var changePermissions = $('#permission_allocate_tree').tree('getChecked'); // 获取勾选节点
                    var changePermissions = $('#permission_allocate_tree').tree('getChecked', ['checked','indeterminate']); // 获取勾选节点
                    console.log('changePermissions', changePermissions);

                    if(!changePermissions || changePermissions.length <= 0) {
                        $.alert('请选择权限');
                        return;
                    }

                    var permissionList = [];
                    for(var i=0; i<changePermissions.length; i++) {
                        var changePermission = changePermissions[i];
                        permissionList.push(changePermission.id);
                    }
                    var permissionStr = permissionList.join('#'); // 修改权限字符串

                    var params = {
                        rid: rid_global, // 角色id(全局变量)
                        changePermissions: permissionStr // 权限ID(多个用#拼接传过来)
                    };
                    console.log('PermissionSettingApi.updateRolePermission params', params);
                    PermissionSettingApi.updateRolePermission(params).then(function (data) {
                        $.alert(data.msg).then(function () {
                            $('#dialog_permission_allocate').dialog('close'); // 关闭对话框
                        });
                    });
                }
            }]
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_add_edit(); // 新增/修改(需要初始化的事件)
        init_permission(); // 分配/查看权限(需要初始化的事件)
    }

    init(); // 初始化函数 
});