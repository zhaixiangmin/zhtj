/**
 * Created by licong on 2017/9/18.
 */

$(function () {
    var mid_global = undefined; // 团员ID(全局变量)
    var oid_global = undefined; // 团支部ID(全局变量)

    var retreatList_global = ['name', 'idCard', 'fullName', 'disabled', 'retreatReasonForApplication', 'retreatApplicationDescription'];

    var paramsName = {
        'name': '姓名',
        'idCardType': '证件类型',
        'idCard': '身份证号',
        'isRealName': '实名认证状态',
        'birthday': '出生日期',
        'leagueForYears': '入团年月',
        'fullName': '所在团支部',
        'income': '收入',
        'isCadres': '是否团干部',
        'incumbent': '团内现任职务',
        'dateOfDuty': '任现职年月',
        'tuanganProperties': '团干部性质',
        'isPartyCommitteeMember': '是否同级党委（支部）成员',
        'nation': '民族',
        'politicalOutlook': '政治面貌',
        'degreeOfEducation': '全日制学历',
        'highestEducation': '最高学历',
        'residence': '户籍所在地',
        'mobile': '手机号码',
        'leagueForUnit': '入团时所在单位',
        'occupation': '职业',
        'learningUnit': '学习工作单位',
        'email': '电子邮箱',
        'qqNum': 'QQ',
        'wechatId': '微信号',
        'weibo': '微博号',
        'developmentMemberNumber': '团员编号',
        'thePartyYears': '入党年月',
        'signUpForVolunteerTime': '注册志愿者时间',

        'type': '奖励类型',
        'content': '奖励名称',
        'levelName': '获奖名次',
        'rewardTime': '获奖时间',
        'awardOrg': '授奖组织',
        'recorderName': '录入者',
        'hasAttachFile': '证明附件',

        'disabled': '申请类型',
        'retreatReasonForApplication': '申请理由',
        'retreatApplicationDescription': '申请理由说明'
    };

    // 全日制学历名称/最高学历
    var degreeOfEducationName = {
        "1": "初中",
        "2": "高中",
        "3": "大专",
        "4": "本科",
        "5": "硕士",
        "6": "博士",
        "7": "中职",
        "8": "中职中专在读",
        "9": "初中在读",
        "10": "高中在读",
        "11": "大专在读",
        "12": "本科在读",
        "13": "硕士在读",
        "14": "博士在读",
        "15": "小学"
    };

    // 职业名称
    var occupationName = {
        "1": "国有企业职工",
        "2": "非公企业职工",
        "3": "机关事业单位职工",
        "4": "社会组织员工",
        "5": "农民",
        "6": "学生",
        "7": "自由职业者",
        "8": "公办高校教职工",
        "9": "公办中学教职工",
        "10": "公办中职教职工",
        "11": "民办高校教职工",
        "12": "民办中学教职工",
        "13": "民办中职教职工",
        "14": "其他"
    };

    // 政治面貌名称
    var politicalOutlookName ={
        "1": "团员",
        "2": "党员",
        "3": "中共预备党员"
    };

    // 审核状态名称
    var auditStatusName = {
        "0": "报到被撤回",
        "1": "报到待审核",
        "2": "报到被退回",
        "3": "审核通过",
        "4": "修改资料待审核",
        "5": "修改资料被退回"
    };

    // 实名认证名称
    var isRealName = {
        '10': '通过', // 通过
        '1': '校验中', // 银行未通过
        '2': '校验失败', // 阿里云未通过
        '3': '线下验证通过', // 线下验证通过
        '4': '校验中' // 银行定时未通过
    };

    // 团员删除状态 1：正常2：已申请删除，待审核，3：已申请删除，被退回
    // 团员删除状态名称
    var deletedStateName = {
        '1': '正常',
        '2': '已申请删除，待审核',
        '3': '已申请删除，被退回'
    };

    // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
    // 团员启用状态
    var disabledName = {
        '0': '正常',
        '1': '禁用',
        '2': '满28周岁离团',
        '3': '满28周岁离团待审核',
        '4': '自行脱团',
        '5': '自行脱团待审核',
        '6': '自愿退团',
        '7': '自愿退团待审核',
        '8': '开除团籍',
        '9': '开除团籍待审核'
    };

    // 申请理由说明
    var retreatReasonName = {
        '1': '连续六个月不交纳团费',
        '2': '不过团的组织生活',
        '3': '连续六个月不做团组织分配的工作'
    };

    // 证件类型名称
    var idCardTypeName = {
        '1': '普通居民身份证',
        '2': '境外身份证'
    };

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#league_menber').datagrid({
            title: '团员管理',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'name', title :'姓名', sortable: false},
                {field: 'mobile', title :'手机号码', sortable: false},
                {field: 'idCardType', title:'证件类型', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return idCardTypeName[value];
                    }else {
                        return idCardTypeName[1];
                    }
                }},
                {field: 'idCard', title :'身份证号码', sortable: false, formatter: function(value, row, index){
                    return value; // 正常返回带星号身份证
                }},
                {field: 'isRealName', title:'实名认证状态', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return isRealName[value];
                    }
                }, styler: function(value,row,index){
                    if (value && (value == 1 || value == 2 || value == 4)){ // 银行未通过、阿里云未通过、银行定时未通过
                        return {class: 'warning'};
                    }
                }},
                {field: 'politicalOutlook', title:'政治面貌', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return politicalOutlookName[value];
                    }
                }},
                {field: 'degreeOfEducation', title:'全日制学历', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return degreeOfEducationName[value];
                    }
                }},
                {field: 'occupation', title:'职业', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return occupationName[value];
                    }
                }},
                {field: 'createTime', title:'申请报到时间', sortable: false},
                {field: 'auditTimeStr', title:'报到审核通过时间', sortable: false},
                {field: 'rewardStatusStr', title:'奖励状态', sortable: false, styler: function(value, row, index){
                    // 待审核/已通过/被退回/暂无奖励
                    if (value && (value == '待审核')){ // 待审核
                        return {class: 'warning'};
                    }
                }},
                {field: 'developmentMemberNumber', title:'团员编号', sortable: false},
                {field: 'disabled', title:'团籍状态', sortable: false, formatter: function(value, row, index){
                    // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                    return disabledName[value];
                }}
            ]],
            loader: function (param, success, error) {

                // 已脱/退团及开除团籍列表
                LeagueMemberApi.retiredGroupAndDismissedGroupList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    name: param.name, // 团员姓名
                    mobile: param.mobile, // 手机号码
                    disabled: param.disabled // 团籍状态
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
            singleSelect:true, // 设置为 true，则只允许选中一行
            frozenColumns: [[  //固定在表格左侧的栏
                {field: 'check', checkbox: true}
            ]],
            toolbar: [{
                iconCls: 'icon-my-enable',
                text: '恢复团籍',
                // id: 'members_audit',
                handler: function(){

                    var selectedData = $('#league_menber').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                    if(selectedData.disabled != 4 && selectedData.disabled != 6 && selectedData.disabled != 8) { // 自行脱团/自愿退团/开除团籍
                        $.alert('该团员已处于' + disabledName[selectedData.disabled] + '状态，请勿重复操作');
                        return;
                    }

                    mid_global = selectedData.mid; // 团员ID(全局变量)

                    var html = '';
                    // 基本信息
                    // ['name', 'idCard', 'fullName', 'disabled', 'retreatReasonForApplication', 'retreatApplicationDescription']
                    for(var i=0; i<retreatList_global.length; i++) {
                        var option = retreatList_global[i];
                        if(!selectedData[option]) { // null，直接返回(避免出现null)
                            continue;
                        }

                        var text = '';
                        var style = '';
                        if(option == 'idCardType') { // 证件类型
                            if(selectedData[option]) {
                                text = idCardTypeName[selectedData[option]];
                            }else { // 无返回值
                                text = idCardTypeName[1]; // 证件类型(默认 普通居民身份证)
                            }
                        }else if (option == 'idCard') { // 身份证
                            if(selectedData['isRealName'] == 1 || selectedData['isRealName'] == 2) { // 银行未通过、阿里云未通过
                                text = selectedData['notHideIdCard']; // 不带星号身份证号
                            }else {
                                text = selectedData[option]; // 带星号身份证号
                            }
                        }else if (option == 'disabled') { // 团籍类型
                            text = disabledName[selectedData[option]]; // 设置团籍类型
                        }else if (option == 'retreatReasonForApplication') { // 申请理由
                            text = '';
                            var retreatReasonForApplicationList = selectedData[option].split(',');
                            for (var j=0; j<retreatReasonForApplicationList.length; j++) {
                                text += retreatReasonName[retreatReasonForApplicationList[j]]; // 设置申请理由名称
                                if(j != retreatReasonForApplicationList.length-1) {
                                    text += '，';
                                }
                            }
                        }else {
                            text = selectedData[option]; // 姓名/所在团支部/申请理由说明
                        }

                        html += '<div class="item">';
                        html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe ' + style + '">' + text + '</span>';
                        html += '</div>';
                    }
                    if(!html) {
                        // html = '<div>暂无信息</div>';
                        html += '<div class="item">';
                        html += '    <span class="title">暂无信息</span>';
                        html += '</div>';
                    }
                    $('#dialog_restoration .list_box .list.base .content').html(html);

                    // 弹窗位置居中
                    $('#dialog_restoration').dialog('open'); // 弹出对话框

                }
                }
            ]
        });

        init_missionBranch(); // 选择恢复团籍到哪个团支部(需要初始化的事件)
    }

    // 数据筛选（需要初始化的事件）
    function init_datafilter() {
        // 团籍状态
        $('#disabled_filter').combobox({
            valueField: 'id',
            textField: 'describe',
            width: 300,
            data: [
                { id: '', describe: '全部' },
                { id: '4', describe: '自行脱团' },
                { id: '6', describe: '自愿退团' },
                { id: '8', describe: '开除团籍' }
            ]
        });

        // 点击查询按钮 -- 数据筛选
        $('#filter').click(function () {
            var params = {
                // pageNo: param.page, // 当前页码
                // pageSize: param.rows, // 每页记录数
                name: $('#name_filter').val().trim(), // 团员姓名
                mobile: $('#mobile_filter').val().trim(), // 手机号码
                disabled: $('#disabled_filter').combobox('getValue') // 团籍状态(4：自行脱团，6：自愿退团，8：开除团籍)
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#league_menber').datagrid('load', params);
        });

    }

    // 恢复团籍(需要初始化的事件)
    function init_restoration() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 恢复团籍 -- 对话框
        $('#dialog_restoration').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#fm_restoration').form('clear'); // 对话框关闭前，清除表单数据
            },
            buttons: [{
                text: '取消',
                // iconCls:'icon-cancel',
                handler: function () {
                    $('#dialog_restoration').dialog('close'); // 关闭对话框(恢复团籍)
                }
            }, {
                text: '确定恢复',
                // iconCls:'icon-ok',
                handler: function () {

                    // 验证
                    var validate = {
                        rules: {
                            'oid_restoration': {
                                required: true
                            }
                        },
                        messages: {
                            'oid_restoration': {
                                required: '请选择团支部'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validator = $('#fm_restoration').validate(validate);
                    var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                    if(!validateFlag) { // 表单填写未完成(combobox)
                        Utils.scrollToAnchor($('#fm_restoration')); // 跳到指定锚点
                        return;
                    }

                    var params = {
                        mid: mid_global, // 团员ID(全局变量)
                        oid: oid_global // 团支部ID(全局变量)
                    };

                    console.log('params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_restoration .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 恢复团籍
                    LeagueMemberApi.restorationOfGroupMembership(params).then(function (data) {
                        $('#dialog_restoration').dialog('close'); // 关闭对话框(恢复团籍)
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_restoration .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        // 点击'选择恢复团籍到哪个团支部'(新增团干，弹出框 -- 所在团支部)
        $('#oid_restoration_box').click(function () {
            // 加载'选择恢复团籍到哪个团支部' 数据网格
            $('#datagrid_missionBranch').datagrid('load', {
                fullName: ''
            });
        });
    }


    // 选择恢复团籍到哪个团支部(需要初始化的事件)
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
                LeagueMemberApi.getOrgByName({
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
            frozenColumns: [[  //固定在表格左侧的栏
                {field: 'check', checkbox: true, width: 55}
            ]],
            singleSelect:true, // 设置为 true，则只允许选中一行
            onClickRow: function (rowIndex, rowData) {
                console.log('rowData', rowData);
                oid_global = rowData.oid; // 团支部ID(全局变量)
                $('#oid_restoration').val(rowData.fullName); // 渲染所在团支部(新增/编辑团干弹出框)
                $('#dialog_missionBranch').dialog('close'); // 关闭对话框(所在团支部)
            }
        });

        // 点击搜索(所在团支部)
        $('#filter_missionBranch').click(function () {
            var params = {
                fullName: $('#fullName_filter_missionBranch').val().trim() // 所在团支部
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#datagrid_missionBranch').datagrid('load', params);
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_restoration(); // 恢复团籍(需要初始化的事件)
    }

    init(); // 初始化函数
});