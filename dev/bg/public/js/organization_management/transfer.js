/**
 * Created by licong on 2017/12/15.
 */
$(function () {
    var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)
    var init_flag_global = false; // 初始化组织树标识（false：未初始化，true：已初始化）
    var oid_global = undefined; // 组织ID(全局变量)
    if(account_global.oid) {
        oid_global = account_global.oid; // 组织ID(全局变量)
        if(account_global.fullName == '超级管理员') {
            oid_global =  0; // 设置oid为0
        }
    }
    var treeID_global = undefined; // 树ID(全局变量)

    var paramsName = {
        'parent': '上级组织',
        'type': '组织类型',
        'fullName': '团组织全称',
        'name': '团组织简称',
        'enterpriseName': '企业微信名称',
        'mobile': '团组织联系电话',
        'email': '团组织电子邮箱',
        'administrativeOmpilation': '本级团组织行政编制数',
        'administrativeNumber': '行政编制实际配备数',
        'careerFormation': '本级团组织事业编制数',
        'serviceNumber': '事业编制实际配备数',
        'industryCategory': '单位所属行业类别',
        'username': '登录账号',
        'password': '密码',
        'secretaryName': '团组织书记姓名',
        'groupOrganizationCode': '团组织机构代码',
        'groupOrganizationWechatid': '团组织微信号',
        'groupOrganizationWeibo': '团组织微博号'
    };

    var titleName = {
        'source': '选择组织(待迁出)',
        'target': '选择组织(迁入)'
    };

    var optionList_global = undefined; // 基本信息显示列表(全局变量) -->  ['fullName', 'name']

    var typeName = {
        '1': '领导机关团组织',
        '2': '团委',
        '3': '团工委',
        '4': '团总支',
        '5': '团支部'
    };

    var industryCategoryName = {
        "1": "党政机关",
        "2": "事业单位（不含公立学校）",
        "3": "普通高等院校",
        "4": "职业教育学校",
        "5": "普通高中",
        "6": "初中",
        "7": "小学",
        "8": "国有企业",
        "9": "集体企业",
        "10": "非公企业",
        "11": "新社会组织（不含民办学校）",
        "12": "军队",
        "13": "武警",
        "14": "城市社区",
        "15": "农村",
        "16": "其他"
    };

    var sumList_global = ['tuanganCount', 'membersCount', 'sumAll', 'sumBranch', 'sumLeagueCadre', 'sumLeagueMember']; // 统计列表

    /**
     * 显示选项(基本信息、验证表单)
     * @param value {string} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
     */
    function showOption(value) {
        if(!value) {
            return;
        }
        var options = {
            // 领导机关团组织
            '1': ['type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
            // 基层团委
            '2': ['type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
            // 团工委
            '3': ['type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
            // 团总支
            '4': ['type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
            // 团支部
            '5': ['type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
            // 超级管理员
            '6': ['type', 'fullName', 'name', 'enterpriseName', 'mobile', 'email', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber', 'industryCategory', 'username', 'password', 'secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo'],
        };

        $('#fm_view .view').hide(); // 隐藏所有信息
        var optionList = options[value]; // 选项数组 ['fullName', 'name']

        for(var i=0;i < optionList.length; i++) {
            var option = optionList[i];
            if(option == 'password') {
                optionList.splice(i, 1); // 删除元素
                i--;
                continue;
            }
            $('#' + option + '_view').parent().parent().show(); // 显示特定信息
        }

        optionList_global = optionList; // 基本信息显示列表(全局变量)
    }

    var nodeLevel = 0; // 节点层级(0：根节点，1：二级节点，2：三级节点)

    // 更新网格数据
    function refreshTree() {
        $('#source_tree').tree({
            lines: true, // 定义是否显示树线条
            checkbox: true, // 定义是否在每个节点前边显示复选框
            cascadeCheck: false, // 是否级联检查
            formatter:function(node){
                return node.fullName;
            },
            loader: function(param, success, error){
                if(oid_global) { // 重新加载树
                    param.oid = oid_global; // 组织ID(全局变量)
                    if(init_flag_global) { // 若已初始化
                        console.log('source_tree loader init_flag_global', init_flag_global);
                        oid_global = undefined; // 组织ID(全局变量)
                    }
                    param.flag = 0; // 搜索的看一个
                }else { // 展开树 或 首次加载树
                    param.flag = undefined; // 展开的下级
                    if(!param || !param.id) {
                        param.oid = 0;
                    } else {
                        param.oid = param.id
                    }
                }
                // 根据登录账号获取组织树
                OrganizationManagementApi.getOrgTree(param).then(function (data) {
                    for(var i=0; i<data.rows.length; i++) {
                        data.rows[i].state = 'closed'; // 默认非叶子节点
                        if(data.rows[i].isLeaf == 1) { // 叶子节点(是否是叶节点(功能节点) 0不是 1是)
                            data.rows[i].state = 'open';
                        }
                        data.rows[i].id = data.rows[i].oid;
                    }

                    success(data.rows);
                }, function () {
                    error();
                    return false;
                }).always(function () {
                    if(!init_flag_global) { // 若尚未初始化
                        oid_global = undefined; // 组织ID(全局变量)
                    }
                    init_flag_global = true; // 设置已初始化
                    console.log('source_tree always init_flag_global', init_flag_global);
                });
            },
            onSelect: function (node) {
                console.log('onSelect node', node);
                if(node.checked) { // 已选
                    $('#source_tree').tree('uncheck', node.target); // 触发取消勾选
                }else { // 未选
                    $('#source_tree').tree('check', node.target); // 触发勾选
                }
            },
            onCheck: function (node, checked) {
                // console.log('onCheck node', node);
                // console.log('onCheck checked', checked);
                if(checked) {
                    var checkedNodes = $('#source_tree').tree('getChecked'); // 获取勾选节点
                    console.log('checkedNodes', checkedNodes);
                    var parentID = undefined;
                    for(var i = 0; i < checkedNodes.length; i++) {
                        var checkedNode = checkedNodes[i];
                        if(i == 0) {
                            parentID = checkedNode.parentId;
                        }else {
                            if(parentID != checkedNode.parentId) {
                                $('#source_tree').tree('uncheck', node.target); // 触发取消勾选
                                $.alert('待迁出的组织必须隶属同一个上级组织');
                                return;
                            }
                        }
                        // console.log('嘻嘻');
                    }
                }
            },
            onDblClick: function (node) {
                // 根据组织ID获取组织
                OrganizationManagementApi.getOrgByOid({oid: node.oid}).then(function (data) {

                    var organization = data.rows;
                    showOption(organization.type); // 显示选项(基本信息、验证表单)

                    // 统计列表
                    for(var i=0; i<sumList_global.length; i++) {
                        var option = sumList_global[i];
                        $('#' + option + '_view').text(organization[option]);
                    }

                    var html= '';
                    if(organization.parentName) { // 超管不存在上级组织
                        // 上级组织
                        html += '<div class="item">';
                        html += '    <span class="title">' + paramsName.parent + '：</span><span class="describe">' + organization.parentName + '</span>';
                        html += '</div>';
                    }
                    var html_username = '';
                    var html_addition = '';
                    // 基本信息显示列表(全局变量)
                    for(var i=0; i<optionList_global.length; i++) {
                        var option = optionList_global[i];
                        if(!organization[option]) { // null，直接返回(避免出现null)
                            continue;
                        }

                        var text = ''; // 值
                        // 附加信息
                        if(option == 'username') {
                            text = organization[option];
                            html_username += '<div class="item">';
                            html_username += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                            html_username += '</div>';
                        }else if (option == 'secretaryName' || option == 'groupOrganizationCode' || option == 'groupOrganizationWechatid' || option == 'groupOrganizationWeibo') {
                            text = organization[option];
                            html_addition += '<div class="item">';
                            html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                            html_addition += '</div>';
                        }else { // 基本信息
                            if(option == 'type') { // 组织类型
                                text = typeName[organization[option]]; // 设置组织类型
                            }else if (option == 'industryCategory') { // 单位所属行业类别
                                text = industryCategoryName[organization[option]]; // 设置单位所属行业类别
                            }else {
                                text = organization[option];
                            }
                            html += '<div class="item">';
                            html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                            html += '</div>';
                        }
                    }
                    if(!html_username) {
                        html_username += '<div class="item">';
                        html_username += '    <span class="title">暂无信息</span>';
                        html_username += '</div>';
                    }
                    if(!html) {
                        html += '<div class="item">';
                        html += '    <span class="title">暂无信息</span>';
                        html += '</div>';
                    }
                    if(!html_addition) {
                        html_addition += '<div class="item">';
                        html_addition += '    <span class="title">暂无信息</span>';
                        html_addition += '</div>';
                    }
                    $('#dialog_view .list_box .list.username .content').html(html_username); // 账号信息
                    $('#dialog_view .list_box .list.base .content').html(html); // 基本信息
                    $('#dialog_view .list_box .list.addition .content').html(html_addition); // 附加信息

                    // 弹窗位置居中
                    // $("#dialog_view").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_view').parents('.window').outerHeight())*0.5 });
                    $('#dialog_view').dialog('open'); // 弹出对话框
                });
            }
        });
        
        $('#target_tree').tree({
            lines: true, // 定义是否显示树线条
            checkbox: true, // 定义是否在每个节点前边显示复选框
            cascadeCheck: false, // 是否级联检查
            formatter:function(node){
                return node.fullName;
            },
            loader: function(param, success, error){
                if(oid_global) { // 重新加载树
                    param.oid = oid_global; // 组织ID(全局变量)
                    if(init_flag_global) { // 若已初始化
                        console.log('target_tree loader init_flag_global', init_flag_global);
                        oid_global = undefined; // 组织ID(全局变量)
                    }
                    param.flag = 0; // 搜索的看一个
                }else { // 展开树 或 首次加载树
                    param.flag = undefined; // 展开的下级
                    if(!param || !param.id) {
                        param.oid = 0;
                    }
                    else {
                        param.oid = param.id
                    }
                }
                // 根据登录账号获取组织树
                OrganizationManagementApi.getOrgTree(param).then(function (data) {
                    for(var i=0; i<data.rows.length; i++) {
                        data.rows[i].state = 'closed'; // 默认非叶子节点
                        if(data.rows[i].isLeaf == 1) { // 叶子节点(是否是叶节点(功能节点) 0不是 1是)
                            data.rows[i].state = 'open';
                        }
                        data.rows[i].id = data.rows[i].oid;
                    }

                    success(data.rows);
                }, function () {
                    error();
                    return false;
                })
            },
            onSelect: function (node) {
                $('#target_tree').tree('check', node.target); // 选中时触发勾选
            },
            onCheck: function (node) { // 只能单选
                var cknodes = $('#target_tree').tree("getChecked"); // 获取勾选的节点(多个)

                // 只能单选
                if(cknodes.length >= 2) {
                    // 如果同时勾选中两个，最后勾选的保留(因为出现在数组(cknodes)的先后顺序不确定)
                    if(cknodes[0].oid == node.oid) {
                        $('#target_tree').tree('uncheck', cknodes[1].target);
                    }else {
                        $('#target_tree').tree('uncheck', cknodes[0].target);
                    }
                }
            },
            onDblClick: function (node) {
                // 根据组织ID获取组织
                OrganizationManagementApi.getOrgByOid({oid: node.oid}).then(function (data) {

                    var organization = data.rows;
                    showOption(organization.type); // 显示选项(基本信息、验证表单)

                    // 基本信息显示列表(全局变量)
                    for(var i=0; i<optionList_global.length; i++) {
                        var option = optionList_global[i];
                        if(option == 'type') { // 组织类型
                            $('#' + option + '_view').val(typeName[organization[option]]); // 设置组织类型
                            continue;
                        }
                        if(option == 'industryCategory') { // 单位所属行业类别
                            $('#' + option + '_view').val(industryCategoryName[organization[option]]); // 设置单位所属行业类别
                            continue;
                        }
                        $('#' + option + '_view').val(organization[option]);
                    }

                    // 弹窗位置居中
                    // $("#dialog_view").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_view').parents('.window').outerHeight())*0.5 });
                    $('#dialog_view').dialog('open'); // 弹出对话框
                });
            }
        });

        // 点击 '清空' 按钮
        $('#clear').click(function () {
            var nodes = $('#source_tree').tree('getChecked');
            for(var i=0; i<nodes.length; i++) {
                var node = nodes[i];
                $('#source_tree').tree('uncheck', node.target); // 触发取消勾选
            }
        });

        // 点击 '迁移' 按钮
        $('#transfer').click(function () {
            var oidAll = []; // 所有选中的组织id数组
            var oidNeed = []; // 需要的组织id数组(若全部子节点选中，只保留父节点)
            var parentArr = []; // 父节点数组
            var isNeed = true; // 是否需要选中节点(true：需要，false：不需要)
            var sourceOidArr = [];
            var sourceCheckedNodes = $('#source_tree').tree('getChecked'); // 待迁出的选中节点

            if(!sourceCheckedNodes || sourceCheckedNodes.length <= 0) {
                $.alert('请选择待迁出组织');
                return;
            }

            var targetCheckedNodes = $('#target_tree').tree('getChecked'); // 获取勾选节点
            if(!targetCheckedNodes || targetCheckedNodes.length != 1) { // 有且只能选中一个
                $.alert('请选择迁入组织');
                return;
            }

            var params = {
                oid: undefined, // 被移动的组织ID(多个用逗号分开)
                parentId: targetCheckedNodes[0].oid // 接收的组织ID
            };

            for(var i=0; i<sourceCheckedNodes.length; i++) { // 遍历 选中节点
                var sourceCheckedNode = sourceCheckedNodes[i];
                if(params.parentId == sourceCheckedNode.oid) { // 迁出组织不能包含迁入组织
                    $.alert('迁出组织不能包含迁入组织');
                    return;
                }

                sourceOidArr.push(sourceCheckedNode.oid);

                // oidAll.push(sourceCheckedNode.oid);
                // isNeed = true; // 重置 需要
                // for(var j=0; j<parentArr.length; j++) { // 遍历 过滤组织id
                //     var parentID = parentArr[j];
                //     if(sourceCheckedNode.parentId == parentID) { // 选中节点的父节点 存在 需要的组织id数组(过滤掉)
                //         isNeed = false; // 设置 不需要
                //         break;
                //     }
                // }
                // if(sourceCheckedNode.children) { // 父节点(有子节点)
                //     parentArr.push(sourceCheckedNode.oid);
                // }
                // if(isNeed) {
                //     oidNeed.push(sourceCheckedNode.oid); // 插入数组
                // }
            }

            // params.oid = oidNeed.join(',');
            params.oid = sourceOidArr.join(',');
            console.log('params', params);
            var tipsText = '左边栏选中的组织将会迁移至\<右边栏选中组织\>，迁移后将会影响到相关团务业务，请谨慎操作！请再次确认是否迁移？';
            var selectedNode = $('#target_tree').tree('getChecked'); // 获取选中的节点
            if(selectedNode && selectedNode.length > 0) {
                var fullName = selectedNode[0].fullName;
                tipsText = '左边栏选中的组织将会迁移至\<' + fullName + '组织\> ，迁移后将会影响到相关团务业务，请谨慎操作！请再次确认是否迁移？';
            }
            $.confirm(tipsText).then(function () {
                $.alert('组织迁移中，请稍等');
                var $dialogs = $('.messager-window');
                console.log('$dialogs', $dialogs);
                // 把全局对话框替换成‘我的’对话框
                $dialogs.each(function (index, element) {
                    var $dialog = $(element);
                    if($dialog && $dialog.length > 0 && $dialog.css('display') != 'none') { // 有弹出框且不是隐藏(两个弹出框相隔时间太短，上一个关闭，但没有马上销毁，只是隐藏)
                        var text = $dialog.find('.messager-body div').eq(1).text();
                        if(text && text.indexOf('组织迁移中，请稍等') != -1) { // 隐藏提示框(组织迁移中，请稍等)
                            $dialog.removeClass('messager-window').addClass('my-messager-window');
                        }
                    }
                });

                // 组织树迁移
                OrganizationManagementApi.moveOrganization(params).then(function (data) {
                    // // 页面已显示对话框，避免覆盖之前的提示文本
                    // var $dialog = $('.messager-window');
                    // // 有弹出框、不是隐藏且是警告框，直接返回Deffered对象，但不显示对话框(避免重复弹出同类对话框)
                    // if($dialog && $dialog.length > 0 && $dialog.css('display') != 'none') { // 有弹出框且不是隐藏(两个弹出框相隔时间太短，上一个关闭，但没有马上销毁，只是隐藏)
                    //     $dialog.find('.l-btn').click(); // 隐藏提示框(触发确定按钮)
                    // }

                    // 关闭'我的'
                    var $myDialog = $('.my-messager-window');
                    if($myDialog && $myDialog.length > 0 && $myDialog.css('display') != 'none') { // 有弹出框且不是隐藏(两个弹出框相隔时间太短，上一个关闭，但没有马上销毁，只是隐藏)
                        $myDialog.find('.l-btn').click(); // 隐藏‘我的’提示框(触发确定按钮)
                    }
                    $.alert(data.msg).then(function () {
                        window.location.reload(); // 刷新页面
                    });
                }, function () {
                    var $myDialog = $('.my-messager-window');
                    if($myDialog && $myDialog.length > 0 && $myDialog.css('display') != 'none') { // 有弹出框且不是隐藏(两个弹出框相隔时间太短，上一个关闭，但没有马上销毁，只是隐藏)
                        $myDialog.find('.l-btn').click(); // 隐藏‘我的’提示框(触发确定按钮)
                    }
                });
            });

        });

        init_missionBranch(); // 选择组织(需要初始化的事件)
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

                // 根据组织名称获取全部团支部组织(本级和所有下级，后台)
                OrganizationManagementApi.orgList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    // type: 5, // 团支部 -- 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
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
                oid_global = rowData.oid; // 组织ID(全局变量)
                $('#' + treeID_global).find('.search_box input').val(rowData.fullName); // 渲染搜索框
                var rootNodes = $('#' + treeID_global + '_tree').tree('getRoots');
                while(rootNodes.length) { // 遍历树的根节点
                    var rootNode = rootNodes[0];
                    if(rootNode && rootNode.target) {
                        $('#' + treeID_global + '_tree').tree('remove', rootNode.target); // 删除根节点
                    }
                }
                $('#' + treeID_global + '_tree').tree('reload'); // 重新加载树
                $('#dialog_organization').dialog('close'); // 关闭对话框(所在团支部)
            }
        });

        // 点击搜索(选择组织弹出框)
        $('#search_filter').click(function () {
            var params = {
                fullName: $('#fullName_filter').val().trim() // 组织名称
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#datagrid_organization').datagrid('load', params);
        });

        // 点击 搜索框
        $('.search_box').click(function () {
            treeID_global = $(this).parents('.tree_box').attr('id'); // 树ID(全局变量)
            $('#dialog_organization').dialog('setTitle', titleName[treeID_global]); // 设置标题(选择组织弹出框)
            $('#datagrid_organization').datagrid('load', {fullName: ''});
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshTree, 100);
    }

    init(); // 初始化函数
});