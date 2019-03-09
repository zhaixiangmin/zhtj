/**
 * Created by licong on 2017/10/9.
 */

$(function () {
    var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)
    var baseList_global = ['createName', 'name', 'idCard', 'missionBranch', 'nation', 'politicalOutlook', 'degreeOfEducation', 'leagueForYears',  'isCadres', 'mobile']; // 基本信息(全局变量)
    // 附加信息 列表(全局变量)
    var additionList_global = ['incumbent', 'tuanganProperties', 'duty', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'dateOfDuty', 'isPartyCommitteeMember', 'thePartyYears', 'signUpForVolunteerTime']; // 附加信息(全局变量)

    var paramsName = {
        'createName': '基本信息首次录入组织',
        'name': '姓名',
        'idCard': '身份证号',
        'missionBranch': '所在团支部',
        'nation': '民族',
        'politicalOutlook': '政治面貌',
        'degreeOfEducation': '文化程度',
        'leagueForYears': '入团年月',
        'isCadres': '是否团干部',
        'mobile': '手机号码',

        'incumbent': '团内现任职务',
        'tuanganProperties': '团干部性质',
        'duty': '团干自行录入的职务',
        'learningUnit': '学习工作单位',
        'email': '电子邮箱',
        'qqNum': 'QQ',
        'wechatId': '微信号',
        'weibo': '微博号',
        'dateOfDuty': '任现职年月',
        'isPartyCommitteeMember': '是否同级党委（支部）成员',
        'thePartyYears': '入党年月',
        'signUpForVolunteerTime': '注册志愿者时间'
    };

    // 状态名称
    var disabledName = {
        '1': '禁用',
        '0': '启用'
    };

    // 政治面貌名称
    var politicalOutlookName = {
        '1': '共青团员',
        '2': '中共党员',
        '3': '中共预备党员' ,
        '4': '群众'
    };

    // 文化程度名称
    var degreeOfEducationName = {
        '1': '博士',
        '2': '博士在读',    
        '3': '硕士',    
        '4': '硕士在读',    
        '5': '普通本科',    
        '6': '普通本科在读',    
        '7': '普通专科',    
        '8': '普通专科在读',    
        '9': '普通高中',    
        '10': '普通高中在读',    
        '11': '中等职业教育',    
        '12': '中等职业教育在读',    
        '13': '初中',    
        '14': '初中在读',    
        '15': '小学'
    };

    // 民族名称
    var nationName = {
        '1': '汉族',
        '2': '壮族',
        '3': '满族',
        '4': '回族',
        '5': '苗族',
        '6': '维吾尔族',
        '7': '土家族',
        '8': '彝族',
        '9': '蒙古族',
        '10': '藏族',
        '11': '布依族',
        '12': '侗族',
        '13': '瑶族',
        '14': '朝鲜族',
        '15': '白族',
        '16': '哈呢族',
        '17': '哈萨克族',
        '18': '黎族',
        '19': '傣族',
        '20': '畲族',
        '21': '僳僳族',
        '22': '仡佬族',
        '23': '东乡族',
        '24': '拉祜族',
        '25': '水族',
        '26': '佤族',
        '27': '纳西族',
        '28': '羌族',
        '29': '土族',
        '30': '仫佬族',
        '31': '锡伯族',
        '32': '柯尔克孜族',
        '33': '达斡尔族',
        '34': '景颇族',
        '35': '毛南族',
        '36': '撒拉族',
        '37': '布朗族',
        '38': '塔吉克族',
        '39': '阿昌族',
        '40': '普米族',
        '41': '鄂温克族',
        '42': '怒族',
        '43': '京族',
        '44': '基诺族',
        '45': '德昂族',
        '46': '保安族',
        '47': '俄罗斯族',
        '48': '裕固族',
        '49': '乌孜别克族',
        '50': '门巴族',
        '51': '鄂伦春族',
        '52': '独龙族',
        '53': '塔塔尔族',
        '54': '赫哲族',
        '55': '高山族',
        '56': '珞巴族'
    };

    // 是/否名称
    var yesOrNoName = {
        '1': '是',
        '2': '否'
    };

    var tuanganPropertiesName = {
        '1': '专职',
        '2': '兼职',
        '3': '挂职'
    };

    // 实名认证名称
    var isRealName = {
        '10': '通过', // 通过
        '1': '校验中', // 银行未通过
        '2': '校验失败', // 阿里云未通过
        '3': '线下验证通过', // 线下验证通过
        '4': '校验中' // 银行定时未通过
    };

    // 是否入驻企业号名称
    var activateStatusName = {
        '1': '是',
        '2': '已禁用',
        '4': '否'
    };

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#cadre_management').datagrid({
            title: '团干管理',  // 表格名称
            border: true,  // 表格是否显示边框
            columns:[[
                {field: 'name', title: '姓名', sortable: false},
                {field: 'idCard', title :'身份证号码', sortable: false},
                {field: 'isRealName', title:'实名认证状态', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return isRealName[value];
                    }
                }, styler: function(value,row,index){
                    if (value && (value == 1 || value == 2)){ // 认证中、未通过
                        return {class: 'warning'};
                    }
                }},
                {field: 'mobile', title: '手机号', sortable: false},
                {field: 'degreeOfEducation', title:'文化程度', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return degreeOfEducationName[value];
                    }
                }},
                {field: 'nation', title: '民族', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return nationName[value];
                    }
                }},
                // {field: 'incumbent', title: '国内现任职务', sortable: false},
                {field: 'politicalOutlook', title: '政治面貌', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return politicalOutlookName[value];
                    }
                }},
                {field: 'disabled', title: '状态', sortable: false, formatter: function(value, row, index){
                    if (value || value == 0){
                        return disabledName[value];
                    }
                }},
                {field: 'operatorId', title: '是否运营者', sortable: false, formatter: function(value, row, index){
                    if (!value){
                        return '否';
                    }
                    return '是';
                }},
                {field: 'fullName', title: '团干所属组织', sortable: false},
                {field: 'activateStatus', title: '是否入驻企业号', sortable: false, formatter: function(value, row, index){
                    if (value || value == 0){
                        return activateStatusName[value];
                    }
                }}
            ]],
            loader: function (param, success, error) {
                if(parent.window.zhtj) {
                    param.oid = parent.window.zhtj.oid; // 默认加载(传参，"组织管理-查看组织树" 本级团干详情/本级团干入驻企业号人数)
                    $('.search_box input').val(parent.window.zhtj.fullName).data('oid', parent.window.zhtj.oid); // 渲染搜索框
                    delete parent.window.zhtj; // 删除对象
                }

                CadreManagementApi.lowerList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    disabled: param.disabled, // 是否禁用(0-正常1-禁用)
                    name: param.name, // 姓名
                    oid: param.oid // 组织id(调用41接口)
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#cadre_management').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#cadre_management').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
                id: 'tuangan_getTuanganInfoByIdXj',
                handler: function(){
                    var selectedData = $('#cadre_management').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 根据组织ID获取组织
                    CadreManagementApi.getTuanganInfoById({tid: selectedData.tid}).then(function (data) {
                        console.log('CadreApi.getTuanganInfoById data', data);
                        var myData = data.rows;
                        var Own = data.Own; // 附加信息(本组织)
                        var other = data.other; // 附加信息(其它组织)
                        if(myData) {
                            var html = '';
                            // 基本信息/账号信息
                            for(var i=0; i<baseList_global.length; i++) {
                                var option = baseList_global[i];

                                if(!myData[option]) { // null，直接返回(避免出现null)
                                    continue;
                                }

                                var text = ''; // 值

                                if(option == 'missionBranch') { // 所在团支部
                                    text = myData['missionBranchName'];
                                }else if (option == 'nation') { // 民族
                                    text = nationName[myData[option]];
                                    if(myData[option] == 57) { // 其他(民族)
                                        text = nationName[myData[option]] + ' ' + myData['nationInfo']; // 民族 + 民族名称
                                    }
                                }else if (option == 'politicalOutlook') { // 政治面貌
                                    text = politicalOutlookName[myData[option]];
                                }else if (option == 'degreeOfEducation') { // 文化程度
                                    text = degreeOfEducationName[myData[option]];
                                }else if (option == 'isCadres') { // 是否为团干部
                                    text = yesOrNoName[myData[option]];
                                }else {
                                    text = myData[option];
                                }

                                html += '<div class="item">';
                                html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                                html += '</div>';
                            }
                            $('#dialog_view .list_box .list.base .content').html(html);

                            var html_operator = '';
                            // 运营者信息
                            if(myData['operatorId']) { // 运营者(显示运营者信息)
                                html_operator += '<div class="item">';
                                html_operator += '    <span class="title">是否运营者：</span><span class="describe">是</span>';
                                html_operator += '</div>';
                                html_operator += '<div class="item">';
                                html_operator += '    <span class="title">运营的组织：</span><span class="describe">' + myData.operatorName + '</span>';
                                html_operator += '</div>';
                                html_operator += '<div class="item">';
                                html_operator += '    <span class="title">运营的职位标签 ：</span><span class="describe">' + myData.positionTheLabel + '</span>';
                                html_operator += '</div>';
                            }else {
                                // html_operator += '<div>暂无信息</div>';
                                html_operator += '<div class="item">';
                                html_operator += '    <span class="title">暂无信息</span>';
                                html_operator += '</div>';
                            }
                            $('#dialog_view .list_box .list.operator .content').html(html_operator); // 运营者信息
                        }

                        var html_addition = '';
                        var html_other = '';
                        // 附加信息(本组织)
                        if(Own && Own.length > 0) {
                            var OwnData = Own[0];
                            for(var i=0; i<additionList_global.length; i++) {
                                var option = additionList_global[i];

                                if(!OwnData[option] && option != 'duty') { // null 直接返回(除团干自行录入的职务)
                                    continue;
                                }

                                var text = ''; // 值
                                if(option == 'tuanganProperties') { // 团干部性质
                                    text = tuanganPropertiesName[OwnData[option]];
                                }else if(option == 'duty') { // 团干自行录入的职务
                                    if(!OwnData['dutyCode']) {
                                        continue;
                                    }
                                    var dutyName = {};
                                    // 1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部，6：超管
                                    if(OwnData.orgType == 1) { // 领导机关团组织
                                        // 职务名称
                                        dutyName = {
                                            '1': '书记',
                                            '2': '副书记',
                                            '3': '常委',
                                            '4': '委员',
                                            '5': '工作人员',
                                            '6': '候补委员'
                                        };
                                        text = dutyName[OwnData['dutyCode']];
                                        if(OwnData['dutyCode'] != 1 && OwnData['dutyCode'] != 2) { // 非 书记/副书记
                                            text = dutyName[OwnData['dutyCode']] + ' ' + OwnData['dutyDesc'];
                                        }
                                    }else { // 非领导机关团组织
                                        // 职务名称
                                        dutyName = {
                                            '1': '书记',
                                            '2': '副书记',
                                            '3': '组织委员',
                                            '4': '宣传委员',
                                            '5': '文体委员',
                                            '6': '生产委员',
                                            '7': '权益委员',
                                            '8': '志愿委员',
                                            '9': '其他'
                                        };
                                        text = dutyName[OwnData['dutyCode']];
                                        if(OwnData['dutyCode'] == 9) { // 其他
                                            text = dutyName[OwnData['dutyCode']] + ' ' + OwnData['dutyDesc'];
                                        }
                                    }

                                }else if(option == 'isPartyCommitteeMember') { // 是否同级党委（支部）成员
                                    text = yesOrNoName[OwnData[option]];
                                }else {
                                    text = OwnData[option];
                                }

                                html_addition += '<div class="item">';
                                html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                                html_addition += '</div>';
                            }
                            console.log('html_addition', html_addition);

                            // 在其他组织的职务信息
                            html_other += '<div class="item my-red">';
                            html_other += '    <span class="title">团干所属组织1：</span><span class="describe">' + OwnData.createName + '</span>';
                            html_other += '</div>';
                            if(OwnData.incumbent) {
                                html_other += '<div class="item">';
                                html_other += '    <span class="title">团内现任职务：</span><span class="describe">' + OwnData.incumbent + '</span>';
                                html_other += '</div>';
                            }
                            if(OwnData.tuanganProperties && tuanganPropertiesName[OwnData.tuanganProperties]) {
                                html_other += '<div class="item">';
                                html_other += '    <span class="title">团干部性质：</span><span class="describe">' + tuanganPropertiesName[OwnData.tuanganProperties] + '</span>';
                                html_other += '</div>';
                            }

                        }else {
                            html_addition += '<div class="item">';
                            html_addition += '    <span class="title">暂无信息</span>';
                            html_addition += '</div>';
                        }
                        $('#dialog_view .list_box .list.addition .content').html(html_addition); // 附加信息

                        // 在其他组织的职务信息
                        if(other && other.length > 0) {
                            // var html_other = '';
                            var increment = 0;
                            if(html_other) {
                                increment = 1;
                            }
                            for(var i=0; i<other.length; i++) {
                                var otherData = other[i];
                                html_other += '<div class="item my-red">';
                                html_other += '    <span class="title">团干所属组织' + (i+1+increment)  + '：</span><span class="describe">' + otherData.createName + '</span>';
                                html_other += '</div>';
                                if(otherData.incumbent) {
                                    html_other += '<div class="item">';
                                    html_other += '    <span class="title">团内现任职务：</span><span class="describe">' + otherData.incumbent + '</span>';
                                    html_other += '</div>';
                                }
                                if(otherData.tuanganProperties && tuanganPropertiesName[otherData.tuanganProperties]) {
                                    html_other += '<div class="item">';
                                    html_other += '    <span class="title">团干部性质：</span><span class="describe">' + tuanganPropertiesName[otherData.tuanganProperties] + '</span>';
                                    html_other += '</div>';
                                }

                            }
                        }
                        $('#dialog_view .list_box .list.other .content').html(html_other); // 在其他组织的职务信息

                        $('#dialog_view').dialog('open'); // 弹出对话框
                    });
                }
            }]
        });

        // Utils.showLimitButtons(); // 显示权限按钮

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

                // 根据当前登录获取团员列表所在组织
                CadreManagementApi.orgList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
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
                $('.search_box input').val(rowData.fullName); // 渲染搜索框
                $('.search_box input').data('oid', rowData.oid); // 设置搜索框 oid

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

        // 点击 搜索框(团干所属组织，弹出框 -- 选择组织)
        $('.search_box').click(function () {
            $('#datagrid_organization').datagrid('load', {fullName: ''});
        });

        // 点击 '所在团支部'的'x'图标 (数据筛选，弹出框 -- 选择所在团支部)
        $('#oid_filter_icon').click(function () {
            $('#oid_filter').val('').data('oid', ''); // 渲染搜索框
            return false;
        });
    }

    // 数据筛选(需要初始化的事件)
    function init_datafilter() {
        // 状态
        $('#disabled_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            data: [{
                value: '',
                name: '全部'
            },{
                value: '0',
                name: '启用'
            },{
                value: '1',
                name: '禁用'
            }]
        });

        // 点击搜索按钮 -- 数据筛选
        $('#filter').click(function () {
            var params = {
                disabled: $('#disabled_filter').combobox('getValue'), // 是否禁用(0-正常1-禁用)
                name: $('#name_filter').val().trim(), // 姓名
                oid: $('#oid_filter').data('oid') // 团干所属组织
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#cadre_management').datagrid('load', params);
        });

    }

    // 查看对话框(需要初始化的事件)
    function init_dialog() {
        // 新增 -- 对话框
        $('#dialog_view').dialog({
            cache: false,
            onClose: function () {
                $('#fm_view').form('clear'); // 对话框关闭前，清除表单数据
            }
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_dialog(); // 查看对话框(需要初始化的事件)
    }

    init(); // 初始化函数
});