/**
 * Created by licong on 2017/9/21.
 */
$(function () {

    var operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'
    var validate_global = undefined; // 验证对象(全局变量)
    var parentId_global = undefined; // 父节点(全局变量)
    var mid_global = undefined; // 菜单ID(全局变量)
    var button_operation_global = '新增'; // 按钮当前操作(全局变量) -->  '新增'、'编辑'
    var button_pid_global = undefined; // 按钮ID操作(全局变量)

    /**
     * 获取验证对象
     */
    function getValidate() {
        // 规则(验证)
        var rules = {
            'title': {
                required: true
            },
            'href': {
                required: true
            },
            'isLeaf': {
                required: true
            },
            'sortBy': {
                required: true
            }
        };

        // 提示信息(验证)
        var messages = {
            'title': {
                required: '请输入名称'
            },
            'href': {
                required: '请输入链接'
            },
            'isLeaf': {
                required: '请选择是否叶子节点'
            },
            'sortBy': {
                required: '请输入序号'
            }
        };

        // 验证
        var validate = {
            rules: rules,
            messages: messages,
            errorPlacement:function(error,element) { // 自定义错误放到哪里
                error.appendTo(element.parents("tr"));
            }
        };

        validate_global = validate; // 验证对象(全局变量)
    }

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
            if(item.isLeaf == 0 && !item.children) { // 不是叶结点(是否是叶节点(功能节点) 0：不是，1：是)
                item.children = []; // 不是叶结点，以目录方式存在
            }
            if (item[parentName] == pid) {
                tmp[index] = item;
                data.splice(i, 1); // 删除数组元素
                i--;
                var children = getTree(data, item['mid'], parentName);
                if (children && children.length > 0) {
                    tmp[index]['children'] = children;
                }
                index++;
            }
        }
        return tmp;
    }

    // 更新树状网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#tt').treegrid({
            width: 900,   //表格宽度
            idField: 'mid',
            treeField: 'title',
            columns:[[
                {field:'title', title:'标题', align: 'left'},
                {field:'href', title:'链接URL地址'},
                {field:'sortBy', title:'排序', width: 200}
                // {field:'href', title:'链接URL地址'},
            ]],
            loader: function(param, success, error){
                // 菜单树型列表
                PermissionSettingApi.getAllMenuTree(param).then(function (data) {
                    var menuList = data.rows;
                    var menuTree = getTree(menuList, 0, 'parentId'); // 获取树状结构数组
                    success(menuTree);
                }, function () {
                    error();
                    return false;
                });
            },
            onBeforeLoad: function () {
                Utils.showLimitButtons(); // 显示权限按钮
            },
            fit: true, // 固定表头
            fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动
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
                id: 'menus_add',
                handler: function(){
                    $('#parent_tree').tree('reload'); // 重新加载
                    operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'
                    $('#dialog').dialog('setTitle', operation_global + '菜单'); // 新增对话框标题

                    // 弹窗位置居中
                    // $("#dialog").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog').parents('.window').outerHeight())*0.5 });
                    $('#dialog').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-edit',
                text: '编辑',
                id: 'menus_update',
                handler: function(){
                    var selectedData = $('#tt').treegrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    $('#parent_tree').tree('reload'); // 重新加载
                    operation_global = '编辑'; // 当前操作(全局变量) -->  '新增'、'编辑'
                    $('#dialog').dialog('setTitle', operation_global + '菜单'); // 修改对话框标题
                    parentId_global = selectedData.parentId; // 父节点(全局变量)
                    mid_global = selectedData.mid; // 菜单ID(全局变量)

                    $('#fm').form('load', {
                        title: selectedData.title, // 标题
                        href: selectedData.href, // 链接URL地址
                        isLeaf: selectedData.isLeaf, // 是否是叶子节点
                        sortBy: selectedData.sortBy // 排序
                    });

                    // 弹窗位置居中
                    // $("#dialog").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog').parents('.window').outerHeight())*0.5 });
                    $('#dialog').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-configuration',
                text: '配置按钮',
                id: 'menus_button_add',
                handler: function(){
                    var selectedData = $('#tt').treegrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }
                    // 是否是叶节点(功能节点) 0：不是，1：是
                    if(selectedData.isLeaf == 0) {
                        $.alert('请选择正确的子节点');
                        return;
                    }

                    mid_global = selectedData.mid; // 菜单ID(全局变量)

                    $('#button_list').datagrid('load', {
                        mid: selectedData.mid
                    });
                }
            }
            ]
        });

        // Utils.showLimitButtons(); // 显示权限按钮
    }

    // 新增/编辑(需要初始化的事件)
    function init_add_edit() {
        getValidate(); // 获取验证对象

        $('#parent_tree').tree({
            // lines: true, // 定义是否显示树线条
            checkbox: true, // 显示复选框
            cascadeCheck: false, // 是否级联检查
            formatter:function(node){
                return node.title;
            },
            loader: function(param, success, error){
                // 菜单树型列表
                PermissionSettingApi.getAllMenuTree(param).then(function (data) {
                    var menuList = data.rows;
                    var menuTree = getTree(menuList, 0, 'parentId'); // 获取树状结构数组
                    success(menuTree);
                }, function () {
                    error();
                    return false;
                });
            },
            onSelect: function (node) {
                $('#parent_tree').tree('check', node.target); // 选中时触发勾选
            },
            onCheck: function (node) {
                var cknodes = $('#parent_tree').tree("getChecked"); // 获取勾选的节点(多个)

                // 只能单选
                if(cknodes.length >= 2) {
                    // 如果同时勾选中两个，最后勾选的保留(因为出现在数组(cknodes)的先后顺序不确定)
                    if(cknodes[0].mid == node.mid) {
                        $('#parent_tree').tree('uncheck', cknodes[1].target);
                    }else {
                        $('#parent_tree').tree('uncheck', cknodes[0].target);
                    }
                }
            }
        });

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 新增/编辑 -- 对话框
        $('#dialog').dialog({
            // modal: true,
            // closed: true,
            cache: false,
            onClose: function () {
                $('#fm').form('clear'); // 对话框关闭前，清除表单数据
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
                    // 当前操作(全局变量) -->  '新增'、'编辑'
                    if(operation_global == '新增') {
                        var validateFlag = $('#fm').validate(validate_global).form(); // 验证表单，填写信息是否完整
                        if(!validateFlag) { // 表单填写未完成
                            return;
                        }

                        var checked = $('#parent_tree').tree('getChecked'); // 获取勾选节点
                        if(!checked || checked.length != 1) { // 有且只能选中一个
                            $.alert('请选择父节点');
                            return;
                        }

                        var params = {
                            parentId: checked[0].mid, // 父节点
                            title: $('#title').val().trim(), // 标题
                            href: $('#href').val().trim(), // 链接URL地址
                            isLeaf: $("input[name='isLeaf']:checked").val(), // 是否是叶子节点
                            sortBy: $('#sortBy').val().trim() // 排序
                        };

                        if(isClick) { // 已点击
                            return;
                        }
                        isClick = true; // 设置为 已点击
                        $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                        // 菜单新增
                        PermissionSettingApi.addMenu(params).then(function (data) {
                            $('#dialog').dialog('close'); // 关闭对话框
                            $.alert(data.msg).then(function () {
                                // 分页插件自动传递 page页码和rows页大小
                                $('#tt').treegrid('load',{});
                            });
                        }).always(function () {
                            isClick = false; // 设置为 未点击
                            $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                        });
                    }else if(operation_global == '编辑') {
                        var validateFlag = $('#fm').validate(validate_global).form(); // 验证表单，填写信息是否完整
                        if(!validateFlag) { // 表单填写未完成
                            return;
                        }

                        var checked = $('#parent_tree').tree('getChecked'); // 获取勾选节点
                        var parentId = parentId_global; // 父节点(全局变量)
                        if(checked && checked.length == 1) { // 有选父节点
                            parentId = checked[0].mid;
                        }

                        if(parentId == mid_global) {
                            $.alert('父节点不能为自身节点');
                            return;
                        }

                        var params = {
                            parentId: parentId, // 父节点
                            mid: mid_global, // 菜单ID(全局变量)
                            title: $('#title').val().trim(), // 标题
                            href: $('#href').val().trim(), // 链接URL地址
                            isLeaf: $("input[name='isLeaf']:checked").val(), // 是否是叶子节点
                            sortBy: $('#sortBy').val().trim() // 排序
                        };

                        if(isClick) { // 已点击
                            return;
                        }
                        isClick = true; // 设置为 已点击
                        $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                        // 菜单修改
                        PermissionSettingApi.updateMenu(params).then(function (data) {
                            $('#dialog').dialog('close'); // 关闭对话框
                            $.alert(data.msg).then(function () {
                                // 分页插件自动传递 page页码和rows页大小
                                $('#tt').treegrid('load',{});
                            });
                        }).always(function () {
                            isClick = false; // 设置为 未点击
                            $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                        });
                    }
                }
            }]
        });
    }

    // 按钮列表(需要初始化的事件)
    function init_button_list() {
        // 初始化数据网格
        $('#button_list').datagrid({
            // title: '按钮列表',  //表格名称           iconCls: 'icon-edit',  //图标
            // width: 1300,   //表格宽度
            // height: 520,   //表格高度，可指定高度，可自动
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'permissionName', title: '按钮名称', sortable: false},
                {field: 'permissionCode', title :'权限编码', sortable: false},
                {field: 'description', title: '描述', sortable: false}
            ]],
            loader: function (param, success, error) {
                if(!param || !param.mid) {
                    return;
                }

                // 菜单按钮列表
                PermissionSettingApi.findButtonsByPpid(param).then(function (data) {
                    success(data.rows);

                    // 弹窗位置居中
                    // $("#dialog_button").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_button').parents('.window').outerHeight())*0.5 });
                    $('#dialog_button').dialog('open'); // 弹出对话框
                }, function () {
                    error();
                    return false;
                });
            },
            pagination: true,//如果表格需要支持分页，必须设置该选项为true
            pageNumber: 1, // 初始化页码
            pageSize: 20,   //表格中每页显示的行数
            pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
            // rownumbers: true,   //是否显示行号
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
                handler: function(){

                    button_operation_global = '新增'; // 按钮当前操作(全局变量) -->  '新增'、'编辑'
                    $('#dialog_edit_button').dialog('setTitle', button_operation_global + '按钮'); // 修改对话框标题(新增按钮)

                    // 弹窗位置居中
                    // $("#dialog_edit_button").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_edit_button').parents('.window').outerHeight())*0.5 });
                    $('#dialog_edit_button').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-edit',
                text: '编辑',
                handler: function(){
                    var selectedData = $('#button_list').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    button_operation_global = '编辑'; // 按钮当前操作(全局变量) -->  '新增'、'编辑'
                    $('#dialog_edit_button').dialog('setTitle', button_operation_global + '按钮'); // 修改对话框标题(新增按钮)
                    button_pid_global = selectedData.pid; // 按钮ID操作(全局变量)

                    $('#fm_edit_button').form('load', {
                        permissionName: selectedData.permissionName, // 按钮名称
                        permissionCode: selectedData.permissionCode, // 按钮编码
                        description: selectedData.description // 描述
                    });

                    // 弹窗位置居中
                    // $("#dialog_edit_button").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_edit_button').parents('.window').outerHeight())*0.5 });
                    $('#dialog_edit_button').dialog('open'); // 弹出对话框
                }
            }]
        });

        // 配置按钮 -- 对话框
        $('#dialog_edit_button').dialog({
            // modal: true,
            // closed: true,
            cache: false,
            onClose: function () {
                $('#fm').form('clear'); // 对话框关闭前，清除表单数据
            },
            buttons: [{
                text:'取消',
                // iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_edit_button').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                // iconCls:'icon-ok',
                handler:function() {
                    var validateFlag = $('#fm_edit_button').validate({
                        rules: {
                            'permissionName': {
                                required: true
                            },
                            'permissionCode': {
                                required: true
                            },
                            'description': {
                                required: true
                            }
                        },
                        messages: {
                            'permissionName': {
                                required: '请输入按钮名称'
                            },
                            'permissionCode': {
                                required: '请输入按钮编码'
                            },
                            'description': {
                                required: '请输入描述'
                            }
                        }
                    }).form(); // 验证表单，填写信息是否完整
                    if (!validateFlag) { // 表单填写未完成
                        return;
                    }

                    if(button_operation_global == '新增') {
                        var params = {
                            mid: mid_global, // 菜单ID(全局变量)
                            permissionName: $('#permissionName').val().trim(), // 按钮名称
                            permissionCode: $('#permissionCode').val().trim(), // 按钮编码
                            description: $('#description').val().trim() // 描述
                        };

                        // 菜单按钮新增
                        PermissionSettingApi.addButtonMenu(params).then(function (data) {
                            $('#dialog_edit_button').dialog('close'); // 关闭对话框
                            $.alert(data.msg).then(function () {
                                // 分页插件自动传递 page页码和rows页大小
                                $('#button_list').datagrid('load', {mid: mid_global}); // 菜单ID(全局变量)
                            });
                        });
                    }else if(button_operation_global == '编辑') {
                        var params = {
                            pid: button_pid_global, // 按钮ID操作(全局变量)
                            permissionName: $('#permissionName').val().trim(), // 按钮名称
                            permissionCode: $('#permissionCode').val().trim(), // 按钮编码
                            description: $('#description').val().trim() // 描述
                        };

                        // 菜单按钮修改
                        PermissionSettingApi.updateButton(params).then(function (data) {
                            $('#dialog_edit_button').dialog('close'); // 关闭对话框
                            $.alert(data.msg).then(function () {
                                // 分页插件自动传递 page页码和rows页大小
                                $('#button_list').datagrid('load', {mid: mid_global}); // 菜单ID(全局变量)
                            });
                        });
                    }
                }
            }]
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);
        
        init_add_edit(); // 新增/编辑(需要初始化的事件)
        init_button_list(); // 按钮列表(需要初始化的事件)
    }

    init(); // 初始化函数

});