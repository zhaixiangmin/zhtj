/**
 * Created by licong on 2017/9/18.
 */

$(function () {
    var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)

    var operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'
    var talentPoolId_global = undefined; // 南粤青年ID(全局变量)
    var params_reward_global =  { // 奖励参数
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: 2 // 每页记录数(可不传，默认为10)
    };
    var params_workResume_global =  { // 工作履历参数
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: 2 // 每页记录数(可不传，默认为10)
    };

    var optionList_global = ['name', 'sex', 'idCard', 'nation', 'nationInfo', 'politicalOutlook', 'degreeOfEducation', 'occupation', 'tuanganProperties', 'oid', 'isPartyCommitteeMember', 'learningUnit', 'professionalTechnicalQualification'
        , 'mobile', 'email', 'qqNum', 'wechatId', 'weibo', 'incumbent', 'incumbentDesc', 'xzzny', 'dutyStyle']; // 参数列表(全局变量)
    
    var paramsName = {
        'name': '姓名',
        'sex': '性别',
        'idCard': '身份证号',
        'nation': '民族',
        'nationInfo': '民族名称',
        'politicalOutlook': '政治面貌',
        'degreeOfEducation': '全日制学历',
        'occupation': '职业',
        'tuanganProperties': '团干部性质',
        'oid': '录入组织',
        'isPartyCommitteeMember': '是否同级党委（支部）成员',
        'learningUnit': '学习工作单位',
        'professionalTechnicalQualification': '专业技术资格',
        'mobile': '手机号码',
        'email': '电子邮箱',
        'qqNum': 'QQ',
        'wechatId': '微信号',
        'weibo': '微博号',
        'income': '收入',
        'isCadres': '是否团干部',
        'incumbent': '团内现任职务',
        'incumbentDesc': '职务名称',
        'xzzny': '任现职年月',
        'dutyStyle': '任现职方式',

        'type': '奖励类型',
        'content': '奖励名称',
        'levelName': '获奖名次',
        'rewardTime': '获奖时间',
        'awardOrg': '授奖组织',
        'recorderName': '录入者',
        'hasAttachFile': '证明附件'
    };
    
    // 是否
    var yesOrNoName = {
        '1': '是',
        '2': '否'
    };

    // 团内现任职务名称
    var incumbentName = {
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
        '56': '珞巴族',
        '57': '其他'
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

    // 团干部性质名称
    var tuanganPropertiesName = {
        '1': '专职',
        '2': '兼职',
        '3': '挂职'
    };

    // 性别名称
    var sexName = {
        '1': '男',
        '2': '女'
    };

    /**
     * 渲染奖励列表
     * @param operateApi {function} 接口函数
     * @param operateParams {object} 参数
     * @param $selector {jquery对象} 选择器
     * @param isOperate {boolean} 是否可操作 -- 编辑/删除(true：可操作，false：不可操作)
     */
    function renderAwardsList_operation(operateApi, operateParams, $selector, isOperate) {
        operateParams.talentPoolId = talentPoolId_global; // 南粤青年ID(全局变量)
        operateApi(operateParams).then(function (data) {
            // html += '<div class="table_list_block">';
            var list = data.dataList;
            if(!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                $selector.hide(); // 隐藏 奖惩
                return;
            }

            $selector.show(); // 显示奖惩
            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
                html += '   <ul class="item_list" data-id="' + item.id + '">';
                html += '       <div class="item" data-hasLevel="' + item.hasLevel + '">';
                html += '           <span class="title">奖励名称</span><span class="describe">' + item.content + '</span>';
                html += '       </div>';
                html += '       <div class="item levelName">';
                html += '           <span class="title">获奖名次</span><span class="describe">' + levelName + '</span>';
                html += '       </div>';
                html += '       <div class="item">';
                if(item.hasAttachFile) { // 有附件
                    html += '           <span class="title">证明附件</span><span class="describe attachment c_blue">查看</span>';
                }else { // 无附件
                    html += '           <span class="title">证明附件</span><span class="describe">无</span>';
                }
                html += '       </div>';
                html += '       <div class="item">';
                html += '           <span class="title">获奖时间</span><span class="describe">' + item.rewardTime + '</span>';
                html += '       </div>';
                if(isOperate) { // 可操作
                    html += '       <div class="item clearfix" style="text-align: center;">';
                    html += '           <span class="button left">修改</span>';
                    html += '           <span class="button right" >删除</span>';
                    html += '       </div>';
                }
                html += '   </ul>';
            }
            // html += '</div>';
            if(operateParams.pageIndex == 1) {
                $selector.find('.content').html(html);
            }else {
                $selector.find('.content').append(html);
            }

            if(list.length >= operateParams.pageSize) { // 也许有下一页
                if($selector.find('.load-more').length <= 0) { // 不存在'加载更多'
                    $selector.append('<div class="load-more" style="text-align: center;cursor: pointer;">加载更多</div>');
                }
            }else { // 加载完毕
                if(operateParams.pageIndex > 1) { // 不是第一页
                    $selector.find('.load-more').text('全部加载完成');
                }
            }
            operateParams.pageIndex++;
        });
    }


    /**
     * 渲染工作履历列表
     * @param operateApi {function} 接口函数
     * @param operateParams {object} 参数
     * @param $selector {jquery对象} 选择器
     * @param isOperate {boolean} 是否可操作 -- 编辑/删除(true：可操作，false：不可操作)
     */
    function renderWorkResumeList_operation(operateApi, operateParams, $selector, isOperate) {
        operateParams.talentPoolId = talentPoolId_global; // 南粤青年ID(全局变量)
        operateApi(operateParams).then(function (data) {
            var list = data.dataList;
            if(!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                $selector.hide(); // 隐藏 工作履历
                return;
            }

            $selector.show(); // 显示 工作履历
            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                html += '   <ul class="item_list" data-id="' + item.wid + '">';
                html += '       <div class="item">';
                html += '           <span class="title">工作单位</span><span class="describe">' + item.workUnit + '</span>';
                html += '       </div>';
                html += '       <div class="item">';
                html += '           <span class="title">单位职务</span><span class="describe">' + item.unitDuty + '</span>';
                html += '       </div>';
                html += '       <div class="item">';
                html += '           <span class="title">任职开始时间</span><span class="describe">' + item.tenureBeginTime + '</span>';
                html += '       </div>';
                html += '       <div class="item">';
                html += '           <span class="title">任职结束时间</span><span class="describe">' + item.tenureEndTime + '</span>';
                html += '       </div>';
                if(isOperate) { // 可操作
                    html += '       <div class="item clearfix" style="text-align: center;">';
                    html += '           <span class="button left">修改</span>';
                    html += '           <span class="button right" >删除</span>';
                    html += '       </div>';
                }
                html += '   </ul>';
            }
            if(operateParams.pageIndex == 1) {
                $selector.find('.content').html(html);
            }else {
                $selector.find('.content').append(html);
            }

            if(list.length >= operateParams.pageSize) { // 也许有下一页
                if($selector.find('.load-more').length <= 0) { // 不存在'加载更多'
                    $selector.append('<div class="load-more" style="text-align: center;cursor: pointer;">加载更多</div>');
                }
            }else { // 加载完毕
                if(operateParams.pageIndex > 1) { // 不是第一页
                    $selector.find('.load-more').text('全部加载完成');
                }
            }
            operateParams.pageIndex++;
        });
    }

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#talent_datagrid').datagrid({
            title: '人才库管理',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'name', title :'姓名', sortable: false},
                {field: 'sex', title :'性别', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return sexName[value];
                    }
                }},
                {field: 'mobile', title :'手机号码', sortable: false},
                {field: 'idCard', title :'身份证号', sortable: false, formatter: function(value, row, index){
                    return value; // 正常返回带星号身份证
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
                }}
            ]],
            loader: function (param, success, error) {
                // 南粤青年人才列表
                TalentApi.talentList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    name: param.name, // 团员姓名
                    mobile: param.mobile, // 手机号码
                    degreeOfEducation: param.degreeOfEducation // 全日制学历(可不传，1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#talent_datagrid').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#talent_datagrid').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
                iconCls: 'icon-my-add',
                text: '新增',
                id: 'gdYouthTalentPool_add',
                handler: function(){
                    operation_global = '新增'; // 当前操作(全局变量) -->  '新增'、'编辑'
                    $('#nationInfo').parents('tr').hide(); // 隐藏民族名称
                    $('#incumbentDesc').parents('tr').hide(); // 隐藏职务名称


                    if(account_global) {
                        $('#oid').val(account_global.fullName); // 组织名称(录入组织)
                    }

                    $('#dialog').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-edit',
                text: '编辑',
                id: 'gdYouthTalentPool_edit',
                handler: function(){
                    var selectedData = $('#talent_datagrid').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }
                    operation_global = '编辑'; // 当前操作(全局变量) -->  '新增'、'编辑'

                    talentPoolId_global = selectedData.gytpid; // 南粤青年ID(全局变量)

                    // 根据南粤青年人才ID获取详情
                    TalentApi.getGdYouthTalentPoolsById({gytpid: selectedData.gytpid}).then(function (data) {
                        var info = data.rows; // 基本信息
                        // var WorkResumeList = data.WorkResumeList; // 工作履历
                        // 基本信息显示列表(全局变量)
                        for(var i=0; i<optionList_global.length; i++) {
                            var option = optionList_global[i];
                            var optionEdit = option + '_edit';


                            // 性别/民族/政治面貌/全日制学历/职业/团干部性质/是否同级党委（支部）成员/团内现任职务
                            if(option == 'sex' || option == 'nation' || option == 'politicalOutlook' || option == 'degreeOfEducation' || option == 'occupation' || option == 'tuanganProperties' ||
                                option == 'isPartyCommitteeMember' || option == 'incumbent') {
                                $('#' + optionEdit).combobox('setValue', info[option]);
                                if(option == 'nation') { // 民族
                                    if(info[option] == 57) { // 民族为其他
                                        $('#nationInfo_edit').show(); // 显示民族信息
                                    }else {
                                        $('#nationInfo_edit').hide(); // 隐藏民族信息
                                    }
                                }
                                continue;
                            }

                            if(option == 'oid') { // 录入组织
                                $('#' + optionEdit).val(info['fullName']);
                                continue;
                            }

                            // 任现职年月
                            if(option == 'xzzny') {
                                $('#' + optionEdit).datebox('setValue', info['dateOfDuty']);
                                continue;
                            }

                            // 姓名/身份证号/学习工作单位/专业技术资格/手机号码/电子邮箱/QQ/微信号/微博号/团内现任职务/职务名称/任现职方式
                            $('#' + optionEdit).val(info[option]);
                        }

                    });

                    // 弹窗位置居中
                    $('#dialog_edit').dialog('open'); // 弹出对话框(编辑数据)
                }
            }, '-', {
                iconCls: 'icon-my-view',
                text: '查看',
                id: 'gdYouthTalentPool_view',
                handler: function(){
                    var selectedData = $('#talent_datagrid').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    talentPoolId_global = selectedData.gytpid; // 南粤青年ID(全局变量)

                    var html = '';
                    // 根据南粤青年人才ID获取详情
                    TalentApi.getGdYouthTalentPoolsById({gytpid: selectedData.gytpid}).then(function (data) {
                        var info = data.rows; // 基本信息
                        var text = '';
                        // 基本信息显示列表(全局变量)
                        for(var i=0; i<optionList_global.length; i++) {
                            var option = optionList_global[i];
                            if(!info[option] && option != 'xzzny') { // 信息为空时，隐藏该字段(任现职年月 除外)
                                continue;
                            }

                            if(option == 'sex') { // 性别
                                text = sexName[info[option]];
                            }else if(option == 'nation') { // 民族
                                text = nationName[info[option]];
                            } else if (option == 'nationInfo') { // 民族信息
                                text = info[option];
                                if(info['nation'] != 57) { // 民族不为其他(隐藏民族信息)
                                    continue;
                                }
                            }else if(option == 'politicalOutlook') { // 政治面貌
                                text = politicalOutlookName[info[option]];
                            }else if(option == 'degreeOfEducation') { // 全日制学历
                                text = degreeOfEducationName[info[option]];
                            }else if(option == 'occupation') { // 职业
                                text = occupationName[info[option]];
                            }else if(option == 'tuanganProperties') { // 团干部性质
                                text = tuanganPropertiesName[info[option]];
                            }else if(option == 'isPartyCommitteeMember') { // 是否同级党委（支部）成员
                                text = yesOrNoName[info[option]];
                            }else if (option == 'oid') { // 录入组织
                                text = info['fullName'];
                            }else if (option == 'xzzny') { // 任现职年月
                                text = info['dateOfDuty'];
                            }else if(option == 'incumbent') { // 团内现任职务
                                text = incumbentName[info[option]];
                            }
                            else if (option == 'incumbentDesc') { // 职务名称
                                text = info[option];
                                if(info['incumbent'] != 9) { // 团内现任职务不为其他(隐藏职务名称)
                                    continue;
                                }
                            }
                            else{
                                // 姓名/身份证号/学习工作单位/专业技术资格/手机号码/电子邮箱/QQ/微信号/微博号/任现职方式
                                text = info[option];
                            }

                            html += '<div class="item">';
                            html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                            html += '</div>';
                        }
                        if(html) {
                            $('#dialog_view .list.base .content').html(html); // 基本信息
                        }
                    });

                    // 获取单个南粤青年的奖励信息列表
                    renderAwardsList_operation(TalentApi.rewardListByTalent, params_reward_global, $('#dialog_view .list.reward'), true); // 渲染奖励列表
                    
                    // 获取单个南粤青年的工作履历列表
                    renderWorkResumeList_operation(TalentApi.workResumeListByTalent, params_workResume_global, $('#dialog_view .list.workResume'), true); // 渲染奖励列表

                    // 弹窗位置居中
                    $('#dialog_view').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-delete',
                text: '删除',
                id: 'gdYouthTalentPool_delete',
                handler: function(){
                    var selectedData = $('#talent_datagrid').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    $.confirm('确定删除该记录吗？').then(function () {
                        // 南粤青年人才删除
                        TalentApi.talentDelete({gytpid: selectedData.gytpid}).then(function () {
                            Utils.updateDataGrid($('#talent_datagrid')); // 更新表格数据(南粤人才库管理)
                        });
                    });
                }
            }, '-', {
                iconCls: 'icon-my-rewards',
                text: '新增奖励',
                id: 'gdYouthTalentPoolReward_add',
                handler: function(){
                    var selectedData = $('#talent_datagrid').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    talentPoolId_global = selectedData.gytpid; // 南粤青年ID(全局变量)
                    $('#dialog_awards .levelName').hide(); // 隐藏奖励等次
                    $('#dialog_awards').dialog('open'); // 显示对话框(新增奖励)
                }
            }, '-', {
                iconCls: 'icon-my-resume-add',
                text: '新增工作履历',
                id: 'gdYouthTalentPoolWorkResume_add',
                handler: function(){
                    var selectedData = $('#talent_datagrid').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    talentPoolId_global = selectedData.gytpid; // 南粤青年ID(全局变量)
                    $('#dialog_workResume').dialog('open'); // 显示对话框(新增工作履历)
                }
            }
            ]
        });

        // Utils.showLimitButtons(); // 显示权限按钮
    }
    // 数据筛选（需要初始化的事件）
    function init_datafilter() {
        // 获取全日制学历列表
        $('#degreeOfEducation_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getHighestEducationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取全日制学历列表为空');
                        error();
                        return;
                    }
                    data.rows.unshift({ value: '', name: '全部'});
                    success(data.rows);
                })
            }
        });
        
    }

    // 点击查询按钮 -- 数据筛选
    $('#filter').click(function () {
        var params = {
            // pageNo: param.page, // 当前页码
            // pageSize: param.rows, // 每页记录数
            name: $('#name_filter').val().trim(), // 团员姓名
            mobile: $('#mobile_filter').val().trim(), // 手机号码
            degreeOfEducation: $('#degreeOfEducation_filter').combobox('getValue') // 全日制学历(可不传，1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
        };
    
        // 分页插件自动传递 page页码和rows页大小
        $('#talent_datagrid').datagrid('load', params);
    });

    // 查看团员(需要初始化的事件)
    function init_view() {
        // 查看团员
        $('#dialog_view').dialog({
            cache: false,
            onClose: function () {
                params_reward_global.pageIndex = 1; // 重置奖励页码
                params_workResume_global.pageIndex = 1; // 重置工作履历页码
                $('#dialog_view .list_box .list .load-more').remove(); // 删除 '加载更多/全部加载完成'按钮
            }
        });
    }

    // 新增人才数据(需要初始化的事件)
    function init_add() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 新增 -- 对话框
        $('#dialog').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#fm').form('clear'); // 对话框关闭前，清除表单数据
                $('#fm input').val(''); // 对话框关闭前，清除表单数据
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
                    // 验证
                    var validate = {
                        rules: {
                            'name': {
                                required: true,
                                checkName: true
                            },
                            'sex': {
                                required: true
                            },
                            'idCard': {
                                required: true,
                                checkIdCard: true
                            }
                        },
                        messages: {
                            'name': {
                                required: '请输入姓名'
                            },
                            'sex': {
                                required: '请选择性别'
                            },
                            'idCard': {
                                required: '请输入身份证号码'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    // var validateFlag = true; // 验证表单，填写信息是否完整
                    var validateFlag = $('#fm').validate(validate).form(); // 验证表单，填写信息是否完整

                    var sex = $('#sex').combobox('getValue'); // 性别
                    if(!sex) {
                        var html = '<label id="sex-error" class="error">请选择性别</label>';
                        $('#sex').parents('tr').append(html);
                        validateFlag = false;
                    }

                    var mobile = $('#mobile').val().trim(); // 手机号码
                    if(mobile && !Utils.checkMobileOrTel(mobile)) {
                        var html = '<label id="mobile-error" class="error">请输入正确手机号</label>';
                        $('#mobile').parents('tr').append(html);
                        validateFlag = false;
                    }
                    
                    var email = $('#email').val().trim(); // 电子邮箱
                    if(email && !Utils.checkEMail(email)) {
                        var html = '<label id="email-error" class="error">请输入正确电子邮箱</label>';
                        $('#email').parents('tr').append(html);
                        validateFlag = false;
                    }

                    if(!validateFlag) { // 表单填写未完成
                        Utils.scrollToAnchor($('#fm')); // 跳到指定锚点
                        return;
                    }

                    var params = {};
                    // 基本信息显示列表(全局变量)
                    for(var i=0; i<optionList_global.length; i++) {
                        var option = optionList_global[i];

                        // 性别/民族/政治面貌/全日制学历/职业/团干部性质/是否同级党委（支部）成员/团内现任职务
                        if(option == 'sex' || option == 'nation' || option == 'politicalOutlook' || option == 'degreeOfEducation' || option == 'occupation' || option == 'tuanganProperties' ||
                            option == 'isPartyCommitteeMember' || option == 'incumbent') {
                            params[option] = $('#' + option).combobox('getValue');
                            continue;
                        }
                        
                        if(option == 'oid') { // 录入组织
                            // params[option] = $('#' + option).data('id');
                            continue;
                        }

                        // 任现职年月
                        if(option == 'xzzny') {
                            params[option] = $('#' + option).datebox('getValue');
                            continue;
                        }

                        // 姓名/身份证号/学习工作单位/专业技术资格/手机号码/电子邮箱/QQ/微信号/微博号/团内现任职务/职务名称/任现职年月/任现职方式
                        params[option] = $('#' + option).val().trim(); // 去除输入框两边的空格
                    }
                    console.log('params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 南粤青年人才新增
                    TalentApi.talentAdd(params).then(function (data) {
                        $('#dialog').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#talent_datagrid').datagrid('load',{}); // 刷新数据表格(南粤人才库管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        // 获取是否团干部列表
        $('#isCadres').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.yesOrNo({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取是否团干部列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            },
            onSelect: function (record) {
                // (1: 是，2：否)
                if(record.value == 1) {
                    $('#fm .isCadres').show(); // 显示(团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                }else {
                    $('#fm .isCadres').hide(); // 隐藏(团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                }
            }
        });

        // 获取性别列表
        $('#sex').combobox({
            valueField: 'value',
            textField: 'name',
            data: [
                {value: '1', name: '男'},
                {value: '2', name: '女'}
            ]
        });

        // 团内现任职务
        $('#incumbent').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getIncumbentList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取团内现任职务列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            },
            onSelect: function (selected) {
                if(selected.value == 9) { // 其他(职务名称)
                    $('#incumbentDesc').parents('tr').show(); // 显示 职务名称
                }else { // 非其他(职务名称)
                    $('#incumbentDesc').parents('tr').hide(); // 隐藏 职务名称
                }
            }
        });
        
        // 获取民族列表
        $('#nation').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getNationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取民族列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            },
            onSelect: function (selected) {
                // $('#nation-error').remove(); // 移除民族错误提示信息
                if(selected.value == 57) { // 其他
                    $('#nationInfo').parents('tr').show(); // 显示民族名称
                }else { // 56个民族
                    $('#nationInfo').parents('tr').hide(); // 隐藏民族名称
                }
            }
        });

        // 获取政治面貌列表
        $('#politicalOutlook').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                // 获取政治面貌列表(团员)
                TalentApi.getMemberPoliticalOutlookList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取政治面貌列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取全日制学历列表
        $('#degreeOfEducation').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getHighestEducationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取全日制学历列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取职业列表
        $('#occupation').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getOccupationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取职业列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });
        
        // 获取团干部性质列表
        $('#tuanganProperties').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getTuanganProperties({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取团干部性质列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取是否同级党委（支部）成员
        $('#isPartyCommitteeMember').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.yesOrNo({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取是否同级党委（支部）成员');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });
    }

    // 编辑人才数据(需要初始化的事件)
    function init_edit() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 编辑人才数据 -- 对话框
        $('#dialog_edit').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#fm_edit').form('clear'); // 对话框关闭前，清除表单数据
                $('#fm_edit input').val(''); // 对话框关闭前，清除表单数据
                $('label.error').remove(); // 移除错误信息
                // $('#fm_edit').find('.work_box').remove(); // 清除工作履历
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
                            'name': {
                                required: true
                            },
                            'sex': {
                                required: true
                            },
                            'idCard': {
                                required: true
                            }
                        },
                        messages: {
                            'name': {
                                required: '请输入姓名'
                            },
                            'sex': {
                                required: '请选择性别'
                            },
                            'idCard': {
                                required: '请输入身份证号码'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validateFlag = $('#fm_edit').validate(validate).form(); // 验证表单，填写信息是否完整

                    var sex = $('#sex_edit').combobox('getValue'); // 性别
                    if(!sex) {
                        var html = '<label id="sex_edit-error" class="error">请选择性别</label>';
                        $('#sex').parents('tr').append(html);
                        validateFlag = false;
                    }

                    var mobile = $('#mobile_edit').val().trim(); // 手机号码
                    if(mobile && !Utils.checkMobileOrTel(mobile)) {
                        var html = '<label id="mobile_edit-error" class="error">请输入正确手机号</label>';
                        $('#mobile_edit').parents('tr').append(html);
                        validateFlag = false;
                    }

                    var email = $('#email_edit').val().trim(); // 电子邮箱
                    if(email && !Utils.checkEMail(email)) {
                        var html = '<label id="email_edit-error" class="error">请输入正确电子邮箱</label>';
                        $('#email_edit').parents('tr').append(html);
                        validateFlag = false;
                    }

                    if(!validateFlag) { // 表单填写未完成
                        Utils.scrollToAnchor($('#fm_edit')); // 跳到指定锚点
                        return;
                    }

                    var params = {};
                    // 基本信息显示列表(全局变量)
                    for(var i=0; i<optionList_global.length; i++) {
                        var option = optionList_global[i];
                        var optionEdit = option + '_edit';

                        // 性别/民族/政治面貌/全日制学历/职业/团干部性质/是否同级党委（支部）成员/团内现任职务
                        if(option == 'sex' || option == 'nation' || option == 'politicalOutlook' || option == 'degreeOfEducation' || option == 'occupation' || option == 'tuanganProperties' ||
                            option == 'isPartyCommitteeMember' || option == 'incumbent') {
                            params[option] = $('#' + optionEdit).combobox('getValue');
                            continue;
                        }

                        if(option == 'oid') { // 录入组织
                            // params[option] = $('#' + optionEdit).data('id');
                            continue;
                        }

                        // 任现职年月
                        if(option == 'xzzny') {
                            params[option] = $('#' + optionEdit).datebox('getValue');
                            continue;
                        }

                        // 姓名/身份证号/学习工作单位/专业技术资格/手机号码/电子邮箱/QQ/微信号/微博号/团内现任职务/职务名称/任现职年月/任现职方式
                        params[option] = $('#' + optionEdit).val().trim(); // 去除输入框两边的空格
                    }

                    params['gytpid'] = talentPoolId_global; // 南粤青年ID(全局变量)

                    console.log('params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 南粤青年人才修改
                    TalentApi.talentEdit(params).then(function (data) {
                        $('#dialog_edit').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#talent_datagrid').datagrid('load',{}); // 刷新数据表格(南粤人才库管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        // 获取是否团干部列表
        $('#isCadres_edit').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.yesOrNo({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取是否团干部列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            },
            onSelect: function (record) {
                // (1: 是，2：否)
                if(record.value == 1) {
                    $('#fm_edit .isCadres').show(); // 显示(团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                }else {
                    $('#fm_edit .isCadres').hide(); // 隐藏(团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                }
            }
        });

        // 获取性别列表
        $('#sex_edit').combobox({
            valueField: 'value',
            textField: 'name',
            data: [
                {value: '1', name: '男'},
                {value: '2', name: '女'}
            ]
        });

        // 团内现任职务
        $('#incumbent_edit').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getIncumbentList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取团内现任职务列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            },
            onSelect: function (selected) {
                if(selected.value == 9) { // 其他(职务名称)
                    $('#incumbentDesc').parents('tr').show(); // 显示 职务名称
                }else { // 非其他(职务名称)
                    $('#incumbentDesc').parents('tr').hide(); // 隐藏 职务名称
                }
            }
        });

        // 获取民族列表
        $('#nation_edit').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getNationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取民族列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            },
            onSelect: function (selected) {
                // $('#nation-error').remove(); // 移除民族错误提示信息
                if(selected.value == 57) { // 其他
                    $('#nationInfo').parents('tr').show(); // 显示民族名称
                }else { // 56个民族
                    $('#nationInfo').parents('tr').hide(); // 隐藏民族名称
                }
            }
        });

        // 获取政治面貌列表
        $('#politicalOutlook_edit').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                // 获取政治面貌列表(团员)
                TalentApi.getMemberPoliticalOutlookList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取政治面貌列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取全日制学历列表
        $('#degreeOfEducation_edit').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getHighestEducationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取全日制学历列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取职业列表
        $('#occupation_edit').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getOccupationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取职业列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取团干部性质列表
        $('#tuanganProperties_edit').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.getTuanganProperties({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取团干部性质列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取是否同级党委（支部）成员
        $('#isPartyCommitteeMember_edit').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                TalentApi.yesOrNo({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取是否同级党委（支部）成员');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });
    }

    // 新增奖励信息(需要初始化的事件)
    function init_awards() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 新增奖励信息 -- 对话框
        $('#dialog_awards').dialog({
            cache: false,
            onClose: function () {
                // $('#fm_awards').form('clear'); // 对话框关闭前，清除表单数据
                $('#contents_awards').val(''); // 清空 奖励名称
                $('#hasLevels_awards label.checkbox').removeClass('active'); // 清空 获奖名次
                $('#levelNames_awards').val(''); // 清空 奖励等次
                $('#rewardTimes_awards').datebox('setValue', ''); // 清空 获奖时间
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
                    var tipsName = {
                        'hasLevels': '请选择获奖名次',
                        'rewardTimes': '请选择获奖时间'
                    };

                    var params = {};

                    // 验证
                    var validate = {
                        rules: {
                            'contents_awards': {
                                required: true
                            },
                            'levelNames_awards': {
                                required: true
                            }
                        },
                        messages: {
                            'contents_awards': {
                                required: '请输入奖励名称'
                            },
                            'levelNames_awards': {
                                required: '请输入奖励等次'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validator = $('#fm_awards').validate(validate);
                    var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                    // 基本信息显示列表(全局变量)
                    var awardsList_global = ['contents', 'hasLevels', 'levelNames', 'rewardTimes']; // 奖励参数列表
                    for(var i=0; i<awardsList_global.length; i++) {
                        var option = awardsList_global[i];
                        var option_awards = option + '_awards';
                        if(option == 'hasLevels') { // 获奖名次
                            var $checkbox = $('#' + option_awards).find('label.checkbox.active');
                            if(!$checkbox || $checkbox.length <= 0) { // 未选
                                var html = '<label id="' + option_awards + '-error" class="error">' + tipsName[option] + '</label>';
                                $('#' + option_awards).parents('tr').append(html);
                                validateFlag = false;
                            }else { // 已选
                                params[option] = $checkbox.data('haslevel');
                            }
                            continue;
                        }
                        if(option == 'rewardTimes') { // 获奖时间
                            params[option] = $('#' + option_awards).datebox('getValue'); // 入团年月
                            if(!params[option]) {
                                var html = '<label id="' + option_awards + '-error" class="error">' + tipsName[option] + '</label>';
                                $('#' + option_awards).parents('tr').append(html);
                                validateFlag = false;
                            }else{
                                var rewardTimesMs = new Date(params[option]).getTime(); // 获奖时间毫秒数
                                var nowMs = new Date().getTime(); // 当前时间毫秒数
                                if(rewardTimesMs > nowMs) {
                                    var html = '<label id="' + option_awards + '-error" class="error">不能大于当前时间</label>';
                                    $('#' + option_awards).parents('tr').append(html);
                                    validateFlag = false;
                                }
                            }
                            continue;
                        }

                        // 奖励名称/奖励等次
                        if($('#' + option_awards) && $('#' + option_awards).length > 0) {
                            params[option] = $('#' + option_awards).val().trim(); // 去除两边空格
                        }
                    }

                    if(!validateFlag) { // 表单填写未完成(combobox)
                        Utils.scrollToAnchor($('#fm_awards')); // 跳到指定锚点
                        return;
                    }

                    params['filesPaths'] = $('#dialog_awards .uploader_custom_control .fileUrlList').text(); // 上传附件
                    if(!params['filesPaths']) {
                        $.alert('请上传附件');
                        return;
                    }
                    params['talentPoolId'] = talentPoolId_global; // 南粤青年ID(全局变量)

                    console.log('dialog_awards params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_awards .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团组织批量录入南粤青年的奖励信息
                    TalentApi.talentRewardAdd(params).then(function (data) {
                        $('#dialog_awards').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#talent_datagrid')); // 更新表格数据(南粤人才库管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_awards .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        $('.uploader_custom_control.talent_rewards_add').myUploader(); // 初始化上传插件
    }

    // 奖励编辑(需要初始化的事件)
    function init_awards_edit() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 奖励编辑 -- 对话框
        $('#dialog_awards_edit').dialog({
            cache: false,
            onClose: function () {
                // $('#fm_awards_edit').form('clear'); // 对话框关闭前，清除表单数据
                $('#content_awards').val(''); // 清空 奖励名称
                $('#hasLevel_awards label.checkbox').removeClass('active'); // 清空 获奖名次
                $('#levelName_awards').val(''); // 清空 奖励等次
                $('#rewardTime_awards').datebox('setValue', ''); // 清空 获奖时间
                $('#dialog_awards_edit .uploader_custom_control .fileUrlList').click(); // 重置上传插件

                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_awards_edit').dialog('close'); // 关闭对话框
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
                            }
                        },
                        messages: {
                            'content_awards': {
                                required: '请输入奖励名称'
                            },
                            'levelName_awards': {
                                required: '请输入奖励等次'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validator = $('#fm_awards_edit').validate(validate);
                    var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                    var awardsList_edit_global = ['content', 'hasLevel', 'levelName', 'rewardTime'];
                    // 基本信息显示列表(全局变量)
                    for(var i=0; i<awardsList_edit_global.length; i++) {
                        var option = awardsList_edit_global[i];
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
                            params[option] = $('#' + option_awards).datebox('getValue');
                            if(!params[option]) {
                                var html = '<label id="' + option_awards + '-error" class="error">' + messages[option] + '</label>';
                                $('#' + option_awards).parents('tr').append(html);
                                validateFlag = false;
                            }
                            continue;
                        }

                        // 奖励名称/奖励等次
                        if($('#' + option_awards) && $('#' + option_awards).length > 0) {
                            params[option] = $('#' + option_awards).val().trim(); // 去除两边空格
                        }
                    }

                    if(!validateFlag) { // 表单填写未完成(combobox)
                        Utils.scrollToAnchor($('#fm_awards_edit')); // 跳到指定锚点
                        return;
                    }

                    var filesArr = [];
                    if($('#dialog_awards_edit .img_box_delete') && $('#dialog_awards_edit .img_box_delete').length > 0) { // 已存在图片
                        $('#dialog_awards_edit .img_box_delete').each(function () {
                            var imgUrl =  $(this).find('img').attr('src');
                            filesArr.push(imgUrl);
                        });
                    }
                    if($('#dialog_awards_edit .uploader_custom_control .fileUrlList').text()) { // 新增图片
                        filesArr = filesArr.concat($('#dialog_awards_edit .uploader_custom_control .fileUrlList').text().split(','));
                    }
                    if(!filesArr || filesArr.length <= 0) {
                        $.alert('请上传附件');
                        return;
                    }
                    if(filesArr.length > 8) {
                        $.alert('上传附件最多8张');
                        return;
                    }
                    params['filesPath'] = filesArr.join(',');
                    params['talentPoolRewardId'] = $('#dialog_awards_edit #content_awards').data('id'); // 南粤青年人才奖励ID

                    console.log('dialog_awards_edit params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_awards_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团组织编辑修改南粤青年的奖励信息
                    TalentApi.talentRewardEdit(params).then(function (data) {
                        $('#dialog_awards_edit').dialog('close'); // 关闭 对话框(奖励编辑)
                        $.alert(data.msg).then(function () {
                            params_reward_global.pageIndex = 1; // 重置页码
                            // 获取单个南粤青年的奖励信息列表
                            renderAwardsList_operation(TalentApi.rewardListByTalent, params_reward_global, $('#dialog_view .list.reward'), true); // 渲染奖励列表
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_awards_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });

                }
            }]
        });

        // 点击'删除'(图片)
        $('#dialog_awards_edit').on('click', '.img_box_delete .delete', function () {
            var $img = $(this);
            $.confirm('确定删除该图片').then(function () {
                $img.parents('.img_box_delete').remove(); // 删除该图片
            });
        });

        $('.uploader_custom_control.talent_rewards_edit').myUploader(); // 初始化上传插件
    }

    // 新增工作履历(需要初始化的事件)
    function init_workResume() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 新增奖励信息 -- 对话框
        $('#dialog_workResume').dialog({
            cache: false,
            onClose: function () {
                $('#fm_workResume').form('clear'); // 对话框关闭前，清除表单数据
                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_workResume').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                handler:function(){
                    // 验证
                    var validate = {
                        rules: {
                            'workUnits': {
                                required: true
                            },
                            'unitDutys': {
                                required: true
                            }
                        },
                        messages: {
                            'workUnits': {
                                required: '请输入工作单位'
                            },
                            'unitDutys': {
                                required: '请输入单位职务'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validator = $('#fm_workResume').validate(validate);
                    var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                    // 任职开始时间
                    var tenureBeginTimes = $('#tenureBeginTimes').datebox('getValue'); // 任职开始时间
                    console.log('init_workResume tenureBeginTimes', tenureBeginTimes);
                    if(!tenureBeginTimes) {
                        var html = '<label id="tenureBeginTimes-error" class="error">请选择任职开始时间</label>';
                        $('#tenureBeginTimes').parents('tr').append(html);
                        validateFlag = false;
                    }else{
                        var tenureBeginTimesMs = new Date(tenureBeginTimes).getTime(); // 任职开始时间
                        var nowMs = new Date().getTime(); // 当前时间毫秒数
                        if(tenureBeginTimesMs > nowMs) {
                            var html = '<label id="tenureBeginTimes-error" class="error">不能大于当前时间</label>';
                            $('#tenureBeginTimes').parents('tr').append(html);
                            validateFlag = false;
                        }
                    }

                    // 任职结束时间
                    // var tenureBeginTimes = $('#tenureBeginTimes').datebox('getValue'); // 任职时间
                    var tenureEndTimesVal = $('#tenureEndTimes').datebox('textbox').val(); // 任职时间(可以获取中文)
                    console.log('init_workResume tenureEndTimes', tenureEndTimes);
                    if(!tenureEndTimesVal) {
                        var html = '<label id="tenureEndTimes-error" class="error">请选择任职结束时间</label>';
                        $('#tenureEndTimes').parents('tr').append(html);
                        validateFlag = false;
                    }else {
                        var tenureEndTimes = $('#tenureEndTimes').datebox('getValue');
                        if(tenureEndTimes) { // 不是'至今'
                            var tenureBeginTimesMs = new Date(tenureBeginTimes).getTime(); // 任职开始时间毫秒数
                            var tenureEndTimesMs = new Date(tenureEndTimes).getTime(); // 任职结束时间毫秒数
                            if(tenureEndTimesMs < tenureBeginTimesMs) {
                                var html = '<label id="tenureEndTimes-error" class="error">任职结束时间不能小于任职开始时间</label>';
                                $('#tenureEndTimes').parents('tr').append(html);
                                validateFlag = false;
                            }
                        }
                    }

                    if(!validateFlag) { // 表单填写未完成(combobox)
                        Utils.scrollToAnchor($('#fm_workResume')); // 跳到指定锚点
                        return;
                    }
                    
                    var params = {
                        talentPoolId: talentPoolId_global, // 南粤青年ID
                        workUnits: $('#workUnits').val().trim(), // 多份工作单位
                        unitDutys: $('#unitDutys').val().trim(), // 多份单位职务
                        tenureBeginTimes : $('#tenureBeginTimes').datebox('getValue'), // 多份任职时间
                        tenureEndTimes : $('#tenureEndTimes').datebox('getValue') // 多份任职时间(不可以获取中文，中文为空值)
                    };
                    console.log('params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_workResume .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});
                    
                    // 团组织批量录入南粤青年的工作履历
                    TalentApi.talentWorkResumeAdd(params).then(function (data) {
                        $('#dialog_workResume').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            // // 分页插件自动传递 page页码和rows页大小
                            // $('#talent_datagrid').datagrid('load',{}); // 刷新数据表格(南粤人才库管理)
                            Utils.updateDataGrid($('#talent_datagrid')); // 更新表格数据(南粤人才库管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_workResume .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });
    }

    // 编辑工作履历(需要初始化的事件)
    function init_workResume_edit() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 新增奖励信息 -- 对话框
        $('#dialog_workResume_edit').dialog({
            cache: false,
            onClose: function () {
                $('#fm_workResume_edit').form('clear'); // 对话框关闭前，清除表单数据
                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_workResume_edit').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                handler:function(){
                    var messages = {
                        'tenureBeginTime': '请选择任职时间'
                    };

                    // 验证
                    var validate = {
                        rules: {
                            'workUnit_edit': {
                                required: true
                            },
                            'unitDuty_edit': {
                                required: true
                            }
                        },
                        messages: {
                            'workUnit_edit': {
                                required: '请输入工作单位'
                            },
                            'unitDuty_edit': {
                                required: '请输入单位职务'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validator = $('#fm_workResume_edit').validate(validate);
                    var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                    // 任职开始时间
                    var tenureBeginTime = $('#tenureBeginTime_edit').datebox('getValue'); // 任职开始时间
                    if(!tenureBeginTime) {
                        var html = '<label id="tenureBeginTime_edit-error" class="error">请选择任职开始时间</label>';
                        $('#tenureBeginTime_edit').parents('tr').append(html);
                        validateFlag = false;
                    }else{
                        var tenureBeginTimeMs = new Date(tenureBeginTime).getTime(); // 任职开始时间
                        var nowMs = new Date().getTime(); // 当前时间毫秒数
                        if(tenureBeginTimeMs > nowMs) {
                            var html = '<label id="tenureBeginTime-error" class="error">不能大于当前时间</label>';
                            $('#tenureBeginTime_edit').parents('tr').append(html);
                            validateFlag = false;
                        }
                    }

                    // 任职结束时间
                    var tenureEndTimeVal = $('#tenureEndTime_edit').datebox('textbox').val(); // 任职时间(可以获取中文)
                    console.log('init_workResume tenureEndTime', tenureEndTime);
                    if(!tenureEndTimeVal) {
                        var html = '<label id="tenureEndTime-error" class="error">请选择任职结束时间</label>';
                        $('#tenureEndTime_edit').parents('tr').append(html);
                        validateFlag = false;
                    }else {
                        var tenureEndTime = $('#tenureEndTime_edit').datebox('getValue');
                        if(tenureEndTime) { // 不是'至今'
                            var tenureBeginTimesMs = new Date(tenureBeginTime).getTime(); // 任职开始时间毫秒数
                            var tenureEndTimeMs = new Date(tenureEndTime).getTime(); // 任职结束时间毫秒数
                            if(tenureEndTimeMs < tenureBeginTimesMs) {
                                var html = '<label id="tenureEndTime-error" class="error">任职结束时间不能小于任职开始时间</label>';
                                $('#tenureEndTime_edit').parents('tr').append(html);
                                validateFlag = false;
                            }
                        }
                    }

                    if(!validateFlag) { // 表单填写未完成(combobox)
                        Utils.scrollToAnchor($('#fm_workResume_edit')); // 跳到指定锚点
                        return;
                    }

                    var params = {
                        workResumeId: $('#workUnit_edit').data('id'), // 南粤青年人才工作履历ID
                        workUnit: $('#workUnit_edit').val().trim(), // 工作单位
                        unitDuty: $('#unitDuty_edit').val().trim(), // 单位职务
                        tenureBeginTime : $('#tenureBeginTime_edit').datebox('getValue'), // 任职开始时间
                        tenureEndTime : $('#tenureEndTime_edit').datebox('getValue') // 任职结束时间

                    };

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_workResume_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团组织编辑修改南粤青年的工作履历
                    TalentApi.talentWorkResumeEdit(params).then(function (data) {
                        $('#dialog_workResume_edit').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            params_workResume_global.pageIndex = 1; // 重置页码
                            // 获取单个南粤青年的工作履历列表
                            renderWorkResumeList_operation(TalentApi.workResumeListByTalent, params_workResume_global, $('#dialog_view .list.workResume'), true); // 渲染工作履历列表
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_workResume_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });
    }

    // 点击 '单选框'(奖励 -- 新增/编辑)
    $('.checkbox').click(function () {
        if($(this).hasClass('active')) {
            return;
        }

        var name = $(this).data('name');
        $('.checkbox[data-name="' + name + '"]').removeClass('active');
        $(this).addClass('active');
        if(name == 'level') { // 获奖名次
            if( $(this).data('haslevel')) { // 有奖励
                $(this).parents('form').find('.levelName').show(); // 显示奖励等次
            }else { // 无奖励
                $(this).parents('form').find('.levelName').hide(); // 隐藏奖励等次
            }
        }
    });

    // 点击'加载更多'(奖励/工作履历)
    $('.list_box .list').on('click', '.load-more', function () {
        var text = $(this).text();
        var $list = $(this).parents('.list');
        if(text == '加载更多') {
            if($list.hasClass('reward')) { // 奖励
                // 获取单个南粤青年的奖励信息列表
                renderAwardsList_operation(TalentApi.rewardListByTalent, params_reward_global, $('#dialog_view .list.reward'), true); // 渲染奖励列表
            }else if ($list.hasClass('workResume')) { // 工作履历
                // 获取单个南粤青年的工作履历列表
                renderWorkResumeList_operation(TalentApi.workResumeListByTalent, params_workResume_global, $('#dialog_view .list.workResume'), true); // 渲染工作履历列表
            }
        }
    });

    // 点击 '编辑/删除'按钮(奖励/工作履历)
    $('#dialog_view').on('click', '.list .content .button', function () {
        var $button = $(this);
        var isWorkResume = $button.parents('.list').hasClass('workResume'); // 是否工作履历(true：工作履历，false：奖励)
        var id = $button.parents('.item_list').data('id'); // 奖励ID
        if($button.hasClass('left')) { // 编辑
            if(isWorkResume) { // 工作履历
                // 获取单个南粤青年工作履历详细信息
                TalentApi.talentWorkResumeDetail({workResumeId: id}).then(function (data) {
                    console.log('TalentApi.talentWorkResumeDetail data', data);
                    var data = data.data;
                    if(data) {
                        $('#workUnit_edit').val(data['workUnit']).data('id', data['wid']); // 工作单位
                        $('#unitDuty_edit').val(data['unitDuty']); // 单位职务
                        var tenureBeginTime = data['tenureBeginTime'].replace(/\./g, '/');
                        $('#tenureBeginTime_edit').datebox('setValue', tenureBeginTime); // 任职开始时间
                        if(data['tenureEndTime'] == '至今') { // 至今
                            $('#tenureEndTime_edit').datebox('setValue', ''); // 清空日期值(否则获取值为上一个时间日期值)
                            $('#tenureEndTime_edit').datebox('textbox').val('至今'); // 任职结束时间
                        }else { // 正常日期值
                            var tenureEndTime = data['tenureEndTime'].replace(/\./g, '/');
                            $('#tenureEndTime_edit').datebox('setValue', tenureEndTime); // 任职结束时间
                        }
                    }
                    $('#dialog_workResume_edit').dialog('open'); // 显示 弹出框(编辑工作履历)
                });
            }else { // 奖励
                // 获取单个南粤青年奖励详细信息
                TalentApi.talentRewardDetail({talentPoolRewardId: id}).then(function (data) {
                    console.log('TalentApi.talentRewardDetail data', data);
                    var data = data.data;

                    var awardsList_edit_global = ['content', 'hasLevel', 'levelName', 'rewardTime'];

                    if(data) {
                        if(data.filesList && data.filesList.length > 0) { // 附件(存在)
                            var list = data.filesList;
                            var html_img = '';
                            for(var i=0; i<list.length; i++) {
                                var item = list[i];
                                html_img += '<div class="img_box">';
                                html_img += '    <img src="' + item.filePath + '">';
                                html_img += '    <span class="warning delete">删除</span>';
                                html_img += '</div>';
                            }
                            if(html_img) {
                                $('#dialog_awards_edit .list.attachment.awards_edit').html(html_img);
                            }
                        }else {
                            $('#dialog_awards_edit list.attachment.awards_edit').hide(); // 隐藏 图片(已存在)
                        }

                        for(var i=0; i<awardsList_edit_global.length; i++) {
                            var option = awardsList_edit_global[i];

                            // 奖励名称
                            if (option == 'content' && data[option]) {
                                $('#' + option + '_awards').val(data[option]).data('id', data['id']);
                                continue;
                            }

                            // 获奖名次
                            if (option == 'hasLevel') {
                                $('#' + option + '_awards').find('label.checkbox[data-haslevel="' + data[option] + '"]').addClass('active');
                                if (data[option] == true) { // 奖励有等次
                                    $('#levelName_awards').parents('tr').show(); // 显示 奖励等次
                                }else {
                                    $('#levelName_awards').parents('tr').hide(); // 隐藏 奖励等次
                                }
                                continue;
                            }

                            // 奖励等次
                            if (option == 'levelName' && data[option]) {
                                $('#' + option + '_awards').val(data[option]);
                                continue;
                            }

                            // 获奖时间
                            if (option == 'rewardTime' && data[option]) {
                                var rewardTime = data[option].replace(/\./g, '/');
                                $('#' + option + '_awards').datebox('setValue', rewardTime);
                                continue;
                            }
                        }
                    }
                    $('#dialog_awards_edit').dialog('open'); // 显示 弹出框(奖励编辑)
                });
            }
        }else { // 删除
            var text = '确定删除该奖励？';
            if(isWorkResume) { // 工作履历
                text = '确定删除该工作履历？';
                $.confirm(text).then(function () {
                    // 删除南粤青年的工作履历
                    TalentApi.talentWorkResumedeleteBatch({workResumeIds: id}).then(function (data) {
                        $.alert(data.msg).then(function () {
                            params_workResume_global.pageIndex = 1; // 重置页码
                            // 获取单个南粤青年的奖励信息列表
                            renderWorkResumeList_operation(TalentApi.workResumeListByTalent, params_workResume_global, $('#dialog_view .list.workResume'), true); // 渲染工作履历列表
                        });
                    });
                });
            }else { // 奖励
                $.confirm(text).then(function () {
                    // 团组织(批量)移除(删除)团员的奖励信息
                    TalentApi.talentRewardDeleteBatch({talentPoolRewardIds: id}).then(function (data) {
                        $.alert(data.msg).then(function () {
                            params_reward_global.pageIndex = 1; // 重置页码
                            // 获取单个南粤青年的工作履历列表
                            renderAwardsList_operation(TalentApi.rewardListByTalent, params_reward_global, $('#dialog_view .list.reward'), true); // 渲染奖励列表
                        });
                    });
                });
            }
        }
    });

    // 点击'查看'(奖励)
    $('.list').on('click', '.c_blue', function () {
        var id = $(this).parents('.item_list').data('id'); // 奖励ID
        console.log('id', id);

        var params = {
            objectId: id, // 附件所属对象ID（奖励ID/惩罚ID等）
            module: 4 // 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚，3-公告附件，4-南粤青年人才奖励附件)
        };
        // 奖惩证明附件列表查看
        TalentApi.attachFileList(params).then(function (data) {
            var imgUrlArr = data.rows;
            var html_img = '';
            for(var i=0; i<imgUrlArr.length; i++) {
                var imgUrl = imgUrlArr[i].filePath;
                html_img += '<div class="img_box"><img src="' + imgUrl + '" title="点击查看大图"></div>';
            }
            $('#dialog_picture .list_box .list').html(html_img);
            $('#dialog_picture').dialog('open'); // 显示弹出框(查看图片)
        });
    });

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_add(); // 新增人才数据(需要初始化的事件)
        init_edit(); // 编辑人才数据(需要初始化的事件)
        init_view(); // 查看团员(需要初始化的事件)\
        init_awards(); // 新增奖励信息(需要初始化的事件)
        init_awards_edit(); // 奖励编辑(需要初始化的事件)
        init_workResume(); // 新增工作履历(需要初始化的事件)
        init_workResume_edit(); // 编辑工作履历(需要初始化的事件)
    }

    init(); // 初始化函数 
});