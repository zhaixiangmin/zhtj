/**
 * Created by licong on 2017/9/18.
 */

// 重写默认easyui 方法
$.fn.datebox.defaults.formatter = function (date) {
    // 选择时间大约当前时间(默认为当前时间)
    if(date.getTime() > new Date().getTime()) {
        return new Date().format('yyyy-MM-dd');
    }

    return date.format('yyyy-MM-dd');
};

$(function () {
    var awardsList_global = ['content', 'hasLevel', 'levelName', 'rewardTime', 'awardOrg']; // 奖励参数列表
    var punishList_global = ['content', 'punishTime', 'relieveTime']; // 处罚参数列表

    /**
     * 团员禁用提示语
     * @param idCard {string} 身份证号码
     * @returns {string}
     */
    function tipsDisabled(idCard) {
        return '团员<身份证号：' + idCard + '>已被组织设置为离团状态，不能再对其进行该项操作。您可以查看团员资料，或者对团员进行“恢复团籍”后操作。';
    }

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#rewards').datagrid({
            title: '奖惩',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'name', title :'姓名', sortable: false, width: 45},
                {field: 'mobile', title :'手机号码', sortable: false, width: 87},
                {field: 'fullName', title:'所在团支部', sortable: false, width: 405}
            ]],
            onBeforeLoad: function () {
                Utils.showLimitButtons(); // 显示权限按钮
            },
            onLoadSuccess: function () {
                $(this).datagrid("fixRownumber"); // 行号宽度自适应
            },
            // fit: true, // 固定表头
            // pagination: true,//如果表格需要支持分页，必须设置该选项为true
            pageNumber: 1, // 初始化页码
            pageSize: 20,   //表格中每页显示的行数
            pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
            rownumbers: true,   //是否显示行号
            nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
            // striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
            // method:'get',   //表格数据获取方式,请求地址是上面定义的url
            // sortName: 'dealTime',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
            // sortOrder: 'desc',  //使用倒序排序
            idField: 'mid', // 指示哪个字段是标识字段
            // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
            loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
            // singleSelect:true, // 设置为 true，则只允许选中一行
            frozenColumns: [[  //固定在表格左侧的栏
                {field: 'check', checkbox: true}
            ]]
        });

        // 点击 '添加奖/惩团员名单'
        $('#member_list_add').click(function () {
            $('#dialog').dialog('open'); // 弹出对话框
        });

        // 点击 '删除团员'
        $('#member_list_remove').click(function () {
            var selectedData = $('#rewards').datagrid('getChecked');
            console.log('selectedData', selectedData);
            if(!selectedData || selectedData.length <= 0) {
                $.alert('请选择需要操作的记录');
                return;
            }

            while(selectedData && selectedData.length > 0) {
                var item = selectedData[0];
                var rowIndex = $('#rewards').datagrid('getRowIndex', item.mid);
                selectedData.unshift(); // 删除数组第一个元素
                $('#rewards').datagrid('deleteRow', rowIndex); // 删除一行
            }
        });

        // 点击 '批量导入奖/惩团员名单'
        $('#member_list_import').click(function () {
            $('#dialog_rewards_multiple').dialog('open'); // 弹出对话框
        });

        // 点击 '录入奖励'
        $('#reward_add').click(function () {
            var selectedData = $('#rewards').datagrid('getChecked');
            console.log('添加奖励 selectedData', selectedData);
            if(!selectedData || selectedData.length <= 0) {
                $.alert('请选择需要操作的记录');
                return;
            }

            $('#levelName_awards').parents('tr').hide(); // 隐藏奖励等次
            $('#dialog_awards').dialog('open'); // 弹出对话框
        });

        // 点击 '录入惩罚'
        $('#punish_add').click(function () {
            var selectedData = $('#rewards').datagrid('getChecked');
            console.log('录入处罚 selectedData', selectedData);
            if(!selectedData || selectedData.length <= 0) {
                $.alert('请选择需要操作的记录');
                return;
            }

            $('#dialog_punish').dialog('open'); // 弹出对话框
        });


        // Utils.showLimitButtons(); // 显示权限按钮

        // 初始化数据网格
        $('#league_menber').datagrid({
            title: '团员管理',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'name', title :'姓名', sortable: false},
                {field: 'mobile', title :'手机号码', sortable: false},
                {field: 'fullName', title:'所在团支部', sortable: false}
            ]],
            loader: function (param, success, error) {
                LeagueMemberApi.list({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    name: param.name, // 姓名
                    oid: param.oid // 所在团支部(组织ID)(可不传，调接口)
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#league_menber').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        console.log('curr', curr);
                        $('#league_menber').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
            ]]
        });


        init_missionBranch(); // 选择所在团支部
    }


    // 选择所在团支部(需要初始化的事件)
    function init_missionBranch() {

        // 初始化数据网格
        $('#datagrid_organization').datagrid({
            border: true,  //表格是否显示边框
            columns: [[
                {field: 'fullName', title: '团组织全称', sortable: false}
            ]],
            loader: function (param, success, error) {
                if (!param || !('fullName' in param)) {
                    return;
                }

                // 根据当前登录获取团员列表所在组织
                LeagueMemberApi.orgList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    type: 5, // 类型(1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部 -- 空查全部)
                    fullName: param.fullName // 团组织全称
                }).then(function (data) {
                    if (data.rows && data.rows.length <= 0) {
                        var options = $('#datagrid_organization').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if (curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#datagrid_organization').datagrid({pageNumber: curr - 1}); // 返回上一页(最后一页)
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
            loadMsg: '数据正在努力加载，请稍后...', //加载数据时显示提示信息
            frozenColumns: [[  //固定在表格左侧的栏
                {field: 'check', checkbox: true, width: 55}
            ]],
            singleSelect: true, // 设置为 true，则只允许选中一行
            onClickRow: function (rowIndex, rowData) {
                // oid_global = rowData.oid; // 组织ID(全局变量)
                $('.search_box input').val(rowData.fullName); // 渲染搜索框
                $('.search_box input').data('oid', rowData.oid); // 设置搜索框 oid

                $('#dialog_organization').dialog('close'); // 关闭对话框(所在团支部)
            }
        });
    }

    // 数据筛选（需要初始化的事件）
    function init_datafilter() {
        // 点击查询按钮 -- 数据筛选
        $('#filter').click(function () {
            var params = {
                name: $('#name_filter').val().trim(), // 团员姓名
                oid: $('.search_box input').data('oid') // 所在团支部
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#league_menber').datagrid('load', params);
        });
    }

    // 团员对话框(需要初始化的事件)
    function init_dialog() {
        // 团员对话框 -- 对话框
        $('#dialog').dialog({
            cache: false,
            onClose: function () {
                $('#league_menber').datagrid('uncheckAll'); // 取消勾选当前页所有的行
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
                    var checked =  $('#league_menber').datagrid('getChecked');
                    console.log('checked', checked);
                    if(checked && checked.length > 0) {
                        for(var i=0; i<checked.length; i++) {
                            var item = checked[i];
                            var rowIndex = $('#rewards').datagrid('getRowIndex', item.mid);
                            console.log('dialog rowIndex', rowIndex);
                            if(rowIndex != -1) { // 重复数据(跳过)
                                continue;
                            }
                            // 团员禁用 不能再进行任何涉及数据修改的操作
                            if(item.disabled == 1) { // 是否禁用 -- 0:正常,1:禁用
                                $.alert(tipsDisabled(item.idCard));
                                continue;
                            }
                            $('#rewards').datagrid('appendRow',item); // 添加数据
                        }
                    }

                    $('#dialog').dialog('close'); // 关闭弹出框(团员)
                }
            }]
        });

        // 点击查询(查看团员对话框)
        $('#search_filter').click(function () {
            var params = {
                fullName: $('#fullName_filter').val().trim() // 组织名称
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#datagrid_organization').datagrid('load', params);
        });

        // 点击 搜索框(查看团员对话框，弹出框 -- 选择所在团支部)
        $('.search_box').click(function () {
            $('#datagrid_organization').datagrid('load', {fullName: ''});
        });
    }

    // 批量录入奖励信息(需要初始化的事件)
    function init_awards() {
        $('#rewardTime_awards').datebox('textbox').attr('placeholder', '请选择授予奖励的日期'); // 设置日期值'请选择授予奖励的日期'

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 批量录入奖励信息 -- 对话框
        $('#dialog_awards').dialog({
            cache: false,
            onClose: function () {
                // $('#fm_awards').form('clear'); // 对话框关闭前，清除表单数据
                $('#content_awards').val(''); // 清空 奖励名称
                $('#hasLevel_awards label.checkbox').removeClass('active'); // 清空 获奖名次
                $('#levelName_awards').val(''); // 清空 奖励等次
                $('#rewardTime_awards').datebox('setValue', ''); // 清空 获奖时间
                $('#rewardTime_awards').datebox('textbox').attr('placeholder', '请选择授予奖励的日期'); // 设置日期值'请选择授予奖励的日期'
                $('#awardOrg_awards').val(''); // 清空 授奖组织
                $('#dialog_awards .uploader_custom_control .fileUrlList').click(); // 重置上传插件
                
                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_awards').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                handler:function(){
                        var messages = {
                            'hasLevel': '请选择获奖名次',
                            'rewardTime': '请选择获奖时间'
                        };

                        var params = {};

                        // 验证
                        var validate = {
                            rules: {
                                'content_awards': {
                                    required: true
                                },
                                'levelName_awards': {
                                    required: true
                                },
                                'awardOrg_awards': {
                                    required: true
                                }
                            },
                            messages: {
                                'content_awards': {
                                    required: '请输入奖励名称'
                                },
                                'levelName_awards': {
                                    required: '请输入奖励等次'
                                },
                                'awardOrg_awards': {
                                    required: '请输入授奖组织'
                                }
                            },
                            errorPlacement:function(error,element) { // 自定义错误放到哪里
                                error.appendTo(element.parents("tr"));
                            }
                        };
                        var validator = $('#fm_awards').validate(validate);
                        var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                        // 基本信息显示列表(全局变量)
                        // var awardsList_global = ['content_awards', 'hasLevel', 'levelName_awards', 'rewardTime_awards', 'awardOrg_awards']; // 奖励参数列表
                        for(var i=0; i<awardsList_global.length; i++) {
                            var option = awardsList_global[i];
                            var option_awards = option + '_awards';
                            if(option == 'hasLevel') { // 获奖名次
                                var $checkbox = $('#' + option_awards).find('label.checkbox.active');
                                if(!$checkbox || $checkbox.length <= 0) {
                                    var html = '<label id="' + option_awards + '-error" class="error">' + messages[option] + '</label>';
                                    $('#' + option_awards).parents('tr').append(html);
                                    validateFlag = false;
                                }else {
                                    params[option] = $checkbox.data('haslevel');
                                }
                                continue;
                            }
                            if(option == 'rewardTime') { // 获奖时间
                                params[option] = $('#' + option_awards).datebox('getValue'); // 入团年月
                                if(!params[option]) {
                                    var html = '<label id="' + option_awards + '-error" class="error">' + messages[option] + '</label>';
                                    $('#' + option_awards).parents('tr').append(html);
                                    validateFlag = false;
                                }
                                continue;
                            }

                            if($('#' + option_awards) && $('#' + option_awards).length > 0) {
                                params[option] = $('#' + option_awards).val().trim(); // 去除两边空格
                            }
                        }

                        if(!validateFlag) { // 表单填写未完成(combobox)
                            Utils.scrollToAnchor($('#fm_awards')); // 跳到指定锚点
                            return;
                        }

                        params['filesPath'] = $('#dialog_awards .uploader_custom_control .fileUrlList').text(); // 上传附件
                        if(!params['filesPath']) {
                            $.alert('请上传获奖证明照片');
                            return;
                        }

                        var CheckedArr = $('#rewards').datagrid('getChecked');
                        var memberIdsArr = [];
                        for(var i=0; i<CheckedArr.length; i++) {
                            var mid =CheckedArr[i].mid;
                            memberIdsArr.push(mid);
                        }
                        params['memberIds'] = memberIdsArr.join('@@');

                        console.log('dialog_awards params', params);

                    $.confirm('组织为团员录入的奖励信息将默认通过，并将会在该团员的个人资料页进行公开，你确定要为选中的团员录入该奖励信息吗？', '', '取消，暂不录入', '确定录入').then(function () {


                        if(isClick) { // 已点击
                            return;
                        }
                        isClick = true; // 设置为 已点击
                        $('#dialog_awards .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                        // 批量奖励录入(团组织为批量团员录入奖励信息提交)
                        LeagueMemberApi.addBatch(params).then(function (data) {
                            $('#dialog_awards').dialog('close'); // 关闭对话框
                            $.alert(data.msg).then(function () {
                                window.location.reload(); // 刷新当前页面
                            });
                        }, function () {
                            isClick = false; // 设置为 未点击
                            $('#dialog_awards .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                        });


                    });
                }
            }]
        });

        // 点击 '单选框'
        $('.checkbox').click(function () {
            if($(this).hasClass('active')) {
                return;
            }else {
                var name = $(this).data('name');
                $('.checkbox[data-name="' + name + '"]').removeClass('active');
                $(this).addClass('active');
                if(name == 'level') {
                    if( $(this).data('haslevel')) { // 有奖励
                        $('#levelName_awards').parents('tr').show(); // 显示奖励等次
                    }else { // 无奖励
                        $('#levelName_awards').parents('tr').hide(); // 隐藏奖励等次
                    }
                }
            }
        });


        $('.uploader_custom_control.rewards_rewards').myUploader(); // 初始化上传插件
    }

    // 录入处罚信息(需要初始化的事件)
    function init_punish() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 批量录入奖励信息 -- 对话框
        $('#dialog_punish').dialog({
            // modal: true,
            // closed: true,
            cache: false,
            onClose: function () {
                // $('#fm_punish').form('clear'); // 对话框关闭前，清除表单数据(不能直接表单清空，否则上传插件将不能显示添加的图片)
                $('#content_punish').val(''); // 清空 处罚名称
                $('#punishTime_punish').datebox('setValue', ''); // 清空 处罚时间
                $('#relieveTime_punish').datebox('setValue', ''); // 清空 解除时间
                $('#dialog_punish .uploader_custom_control .fileUrlList').click(); // 重置上传插件
                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_punish').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                handler:function(){
                    var messages = {
                        'punishTime': '请选择处罚时间',
                        'relieveTime': '请选择解除时间'
                    };

                    var params = {};

                    // 验证
                    var validate = {
                        rules: {
                            'content_punish': {
                                required: true
                            }
                        },
                        messages: {
                            'content_punish': {
                                required: '请输入处罚名称'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validator = $('#fm_punish').validate(validate);
                    var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                    // 基本信息显示列表(全局变量)
                    // var punishList_global = ['content', 'punishTime', 'relieveTime']; // 处罚参数列表
                    for(var i=0; i<punishList_global.length; i++) {
                        var option = punishList_global[i];
                        var option_punish = option + '_punish';
                        if(option == 'punishTime') { // 处罚时间
                            params[option] = $('#' + option_punish).datebox('getValue');
                            if(!params[option]) {
                                var html = '<label id="' + option_punish + '-error" class="error">' + messages[option] + '</label>';
                                $('#' + option_punish).parents('tr').append(html);
                                validateFlag = false;
                            }
                            continue;
                        }
                        if(option == 'relieveTime') { // 解除时间
                            params[option] = $('#' + option_punish).datebox('getValue');
                            if(!params[option]) {
                                var html = '<label id="' + option_punish + '-error" class="error">' + messages[option] + '</label>';
                                $('#' + option_punish).parents('tr').append(html);
                                validateFlag = false;
                            }
                            continue;
                        }

                        if($('#' + option_punish) && $('#' + option_punish).length > 0) {
                            params[option] = $('#' + option_punish).val().trim(); // 去除两边空格
                        }
                    }

                    if(!validateFlag) { // 表单填写未完成(combobox)
                        Utils.scrollToAnchor($('#fm_punish')); // 跳到指定锚点
                        return;
                    }

                    var punishTimeMs = new Date(params['punishTime']).getTime(); // 返回 1970 年 1 月 1 日至今的毫秒数
                    var relieveTimeMs = new Date(params['relieveTime']).getTime(); // 返回 1970 年 1 月 1 日至今的毫秒数
                    var nowMs = new Date().getTime(); // 返回 1970 年 1 月 1 日至今的毫秒数
                    if(punishTimeMs >= relieveTimeMs) {
                        $.alert('解除时间需要大于处罚时间');
                        return;
                    }
                    if(nowMs >= relieveTimeMs) {
                        $.alert('解除时间需要大于当前时间');
                        return;
                    }

                    params['filesPath'] = $('#dialog_punish .uploader_custom_control .fileUrlList').text(); // 上传附件
                    if(!params['filesPath']) {
                        $.alert('请上传处罚证明照片');
                        return;
                    }

                    var CheckedArr = $('#rewards').datagrid('getChecked');
                    var memberIdsArr = [];
                    for(var i=0; i<CheckedArr.length; i++) {
                        var mid =CheckedArr[i].mid;
                        memberIdsArr.push(mid);
                    }
                    params['memberIds'] = memberIdsArr.join('@@');

                    console.log('dialog_punish params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_punish .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 批量惩罚录入(团组织为批量团员录入惩罚信息提交)
                    LeagueMemberApi.addBatchPunishment(params).then(function (data) {
                        $('#dialog_punish').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            window.location.reload(); // 刷新当前页面
                        });
                    }, function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_punish .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });

                }
            }]
        });

        // 点击 '单选框'
        $('.checkbox').click(function () {
            if($(this).hasClass('active')) {
                return;
            }else {
                var name = $(this).data('name');
                $('.checkbox[data-name="' + name + '"]').removeClass('active');
                $(this).addClass('active');
                if(name == 'level') {
                    if( $(this).data('haslevel')) { // 有奖励
                        $('#levelName_punish').parents('tr').show(); // 显示奖励等次
                    }else { // 无奖励
                        $('#levelName_punish').parents('tr').hide(); // 隐藏奖励等次
                    }
                }
            }
        });


        $('.uploader_custom_control.rewards_punish').myUploader(); // 初始化上传插件
    }


    // 批量导入团员信息
    function init_rewards_multiple() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 批量导入团员信息 -- 对话框
        $('#dialog_rewards_multiple').dialog({
            // modal: true,
            // closed: true,
            cache: false,
            onClose: function () {
                $('#dialog_rewards_multiple .fileUrlList').click(); // 重置上传插件
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_rewards_multiple').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                handler:function(){
                    var params = {
                        uploadExcelPath: $('#dialog_rewards_multiple .fileUrlList').text(), // 上传Excel文件路径
                        pageIndex: 1, // 当前页码
                        pageSize: 10 // 每页记录数
                    };

                    if(!params.uploadExcelPath) {
                        $.alert('请上传Excel文件');
                        return;
                    }

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_rewards_multiple .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 从团员Excel模板文件导入团员身份证匹配身份证获取团员列表
                    LeagueMemberApi.listByExcelImport(params).then(function (data) {
                        $('#dialog_rewards_multiple').dialog('close'); // 关闭对话框

                        var success = data.data.success;
                        var fail = data.data.fail;

                        if(fail && fail.rows && fail.rows.length > 0) { // 有失败的
                            // 分页插件自动传递 page页码和rows页大小
                            $('#datagrid_rewards_multiple_fail').datagrid('load', {uploadExcelPath: params.uploadExcelPath}); // 加载表格(批量导入团员失败)
                        }else if(success && success.rows && success.rows.length > 0){ // 全部成功(无失败)
                            $.alert('批量导入团员成功');
                            // 从团员Excel模板文件导入团员身份证匹配身份证获取团员列表
                            LeagueMemberApi.listByExcelImport({uploadExcelPath: params.uploadExcelPath}).then(function () { // 全部查询，不分页
                                var success = data.data.success;
                                for(var i=0; i<success.rows.length; i++) {
                                    var item = success.rows[i];
                                    var rowIndex = $('#rewards').datagrid('getRowIndex', item.mid);
                                    console.log('dialog rowIndex', rowIndex);
                                    if(rowIndex != -1) { // 重复数据(跳过)
                                        continue;
                                    }
                                    $('#rewards').datagrid('appendRow',item); // 添加数据
                                }
                            });
                        }
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_rewards_multiple .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });

                }
            }]
        });

        // 点击 '导入模板下载'
        $('.download').click(function () {
            console.log('download');

            window.location.href = League.path + '/file/download/member'; // 团员导入Excel模板下载
        });

        $('.uploader_file_custom_control.rewards_multiple').myFileUploader(); // 初始化文件上传插件
    }


    // 批量导入团员失败(需要初始化的事件)
    function init_rewards_multiple_fail() {

        // 初始化数据网格
        $('#datagrid_rewards_multiple_fail').datagrid({
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'failRow', title: '行号', sortable: false},
                {field: 'failCause', title: '原因', sortable: false}
            ]],
            loader: function (param, success, error) {
                if(!param || !('uploadExcelPath' in param)) { // 存在参数
                    return;
                }

                // 从团员Excel模板文件导入团员身份证匹配身份证获取团员列表
                LeagueMemberApi.listByExcelImport({
                    pageIndex: param.page, // 当前页码
                    pageSize: param.rows, // 每页记录数
                    uploadExcelPath: param.uploadExcelPath // 上传Excel文件路径
                }).then(function (data) {
                    var fail = data.data.fail;
                    // if(fail.rows && fail.rows.length <= 0) {
                    //     var options = $('#datagrid_rewards_multiple_fail').datagrid('getPager').data("pagination").options;
                    //     var curr = options.pageNumber; // 获取当前页
                    //     if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                    //         success(data);
                    //         error();
                    //         return false;
                    //     }
                    //     $.alert('当前页是最后一页');
                    //     console.log('curr', curr);
                    //     $('#datagrid_rewards_multiple_fail').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
                    //     error();
                    //     return false;
                    // }
                    success(fail);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                }).always(function () {
                    $('#dialog_rewards_multiple_fail').dialog('open'); // 弹出对话框
                });
            },
            // onLoadSuccess: function () {
            //     $(this).datagrid("fixRownumber"); // 行号宽度自适应
            // },
            pagination: true,//如果表格需要支持分页，必须设置该选项为true
            pageNumber: 1, // 初始化页码
            pageSize: 20,   //表格中每页显示的行数
            pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
            // rownumbers: true,   //是否显示行号
            nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
            striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
            // method:'get',   //表格数据获取方式,请求地址是上面定义的url
            // sortName: 'dealTime',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
            // sortOrder: 'desc',  //使用倒序排序
            // idField: 'ID', // 指示哪个字段是标识字段
            // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
            loadMsg:'数据正在努力加载，请稍后...' //加载数据时显示提示信息
            // frozenColumns: [[  //固定在表格左侧的栏
            //     {field: 'check', checkbox: true, width: 55}
            // ]],
            // singleSelect:true, // 设置为 true，则只允许选中一行
            // onClickRow: function (rowIndex, rowData) {
            //     console.log('rowData', rowData);
            //     missionBranch_global = rowData.oid; // 所在团支部(全局变量)
            //     // 当前操作(全局变量) -->  '新增'、'编辑'
            //     if(operation_global == '新增') {
            //         $('#missionBranch').val(rowData.fullName); // 渲染所在团支部(新增/编辑团干弹出框)
            //     }else { // 编辑
            //         $('#missionBranch_edit').val(rowData.fullName); // 渲染所在团支部(新增/编辑团干弹出框)
            //     }
            //     $('#dialog_missionBranch').dialog('close'); // 关闭对话框(所在团支部)
            // }
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_dialog(); // 对话框(需要初始化的事件)
        init_awards(); // 批量录入奖励信息(需要初始化的事件)
        init_punish(); // 录入处罚信息(需要初始化的事件)
        init_rewards_multiple(); // 批量导入团员信息(需要初始化的事件)
        init_rewards_multiple_fail(); // 批量导入团员失败(需要初始化的事件)
    }

    init(); // 初始化函数 
});