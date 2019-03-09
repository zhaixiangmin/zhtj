/**
 * Created by licong on 2017/9/18.
 */

$(function () {
    var mid_global = undefined; // 团员ID(全局变量)
    var cityDid_global = undefined; // 城市ID(全局变量)
    var audiStatus_global = undefined; // 审核状态(全局变量)
    var isRealName_global = undefined; // 实名认证(全局变量)
    var isCadres_global = undefined; // 是否团干(1: 是，2：否)
    // var name_idCard_global = undefined; // 名字身份证(申请删除团员 -- 全局变量)
    var params_rewardIn_global =  { // 奖励参数(团内，全局变量)
        type: 1, // 奖励类型(1-团内奖励，2-团外奖励)
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: 2 // 每页记录数(可不传，默认为10)
    };
    var params_rewardOut_global =  { // 奖励参数(团外，全局变量)
        type: 2, // 奖励类型(1-团内奖励，2-团外奖励)
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: 2 // 每页记录数(可不传，默认为10)
    };
    var params_punishment_global =  { // 惩罚参数(团外，全局变量)
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: 2 // 每页记录数(可不传，默认为10)
    };

    var optionList_global = ['name', 'idCard', 'birthday', 'leagueForYears', 'fullName', 'income', 'isCadres', 'incumbent', 'incumbentDesc', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember', 'nation', 'nationInfo', 'politicalOutlook', 'degreeOfEducation', 'highestEducation', 'residence', 'mobile'
        , 'leagueForUnit', 'occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'thePartyYears', 'signUpForVolunteerTime']; // 参数列表(全局变量)

    // 基本信息 列表(全局变量)
    var baseList_global = ['name', 'idCardType', 'idCard', 'isRealName', 'birthday', 'leagueForYears', 'fullName', 'income', 'isCadres', 'incumbent', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember', 'nation', 'politicalOutlook', 'degreeOfEducation', 'highestEducation', 'residence', 'mobile', 'leagueForUnit'];
    // 附加信息 列表(全局变量)
    var additionList_global = ['occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'thePartyYears', 'signUpForVolunteerTime'];


    // 奖惩列表(全局变量)
    var awardsList_global = ['type', 'content', 'levelName', 'rewardTime', 'awardOrg', 'hasAttachFile', 'recorderName'];

    var retreatList_global = ['name', 'idCard', 'fullName', 'applyOrgFullName', 'disabled', 'retreatReasonForApplication', 'retreatApplicationDescription'];

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

        'applyOrgFullName': '发起申请团支部',
        'disabled': '申请类型',
        'retreatReasonForApplication': '申请理由',
        'retreatApplicationDescription': '申请理由说明'
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

    // 审核状态名称
    var auditStatusName = {
        "0": "报到被撤回",
        "1": "报到待审核",
        "2": "报到被退回",
        "3": "审核通过",
        "4": "修改资料待审核",
        "5": "修改资料被退回"
    };

    // 团干部性质名称
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

    // 团员删除状态 1：正常2：已申请删除，待审核，3：已申请删除，被退回
    // 团员删除状态名称
    var deletedStateName = {
        '1': '正常',
        '2': '已申请删除，待审核',
        '3': '已申请删除，被退回'
    };

    // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
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

    // 删除理由名称
    var deletedReasonName = {
        '1': '团员报错团支部，且被误审核通过',
        '2': '团员报错团支部，且被误审核通过'
    };

    // 证件类型名称
    var idCardTypeName = {
        '1': '普通居民身份证',
        '2': '境外身份证'
    };

    /**
     * 渲染奖励列表
     * @param operateApi {function} 接口函数
     * @param operateParams {object} 参数
     * @param $selector {jquery对象} 选择器
     * @param isOperate {boolean} 是否可操作 -- 编辑/删除(true：可操作，false：不可操作)
     */
    function renderAwardsList_operation(operateApi, operateParams, $selector, isOperate) {
        operateParams.memberId = mid_global; // 团员ID(全局变量)
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
                // html += '       <div class="item">';
                // html += '           <span class="title">奖励类型</span><span class="describe">团外奖励</span>';
                // html += '       </div>';
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
                if(item.type == 1 && item.recorderName) { // 团内奖励
                    html += '       <div class="item">';
                    html += '           <span class="title">录入者</span><span class="describe">' + item.recorderName + '</span>';
                    html += '       </div>';
                }
                html += '       <div class="item">';
                html += '           <span class="title">授奖组织</span><span class="describe">' + item.awardOrg + '</span>';
                html += '       </div>';
                html += '       <div class="item">';
                html += '           <span class="title">审核组织</span><span class="describe">' + item.auditOrgName + '</span>';
                html += '       </div>';
                html += '       <div class="item">';
                html += '           <span class="title">奖励状态</span><span class="describe c_red">' + item.statusStr + '</span>';
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
     * 渲染惩罚列表
     * @param operateApi {function} 接口函数
     * @param operateParams {object} 参数
     * @param $selector {jquery对象} 选择器
     * @param isOperate {boolean} 是否可操作 -- 编辑/删除(true：可操作，false：不可操作)
     */
    function renderPunishmentList_operation(operateApi, operateParams, $selector, isOperate) {

        operateParams.memberId = mid_global; // 团员ID(全局变量)
        operateApi(operateParams).then(function (data) {
            var list = data.rows;
            if (!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                $selector.hide(); // 隐藏 奖惩
                return;
            }


            $selector.show(); // 显示奖惩
            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
                html += '   <ul class="item_list" data-id="' + item.id + '">';
                html += '       <div class="item">';
                html += '           <span class="title">处罚记录</span><span class="describe">' + item.content + '</span>';
                html += '       </div>';
                html += '       <div class="item">';
                if(item.hasAttachFile) { // 有附件
                    html += '           <span class="title">附件</span><span class="describe attachment c_blue">查看</span>';
                }else { // 无附件
                    html += '           <span class="title">附件</span><span class="describe">无</span>';
                }
                html += '       </div>';
                html += '       <div class="item">';
                html += '           <span class="title">处罚时间</span><span class="describe">' + item.punishTime + '</span>';
                html += '       </div>';
                html += '       <div class="item">';
                html += '           <span class="title">录入组织</span><span class="describe">' + item.recorderName + '</span>';
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
                    // if (row.isRealName == 1 || row.isRealName == 2){ // 银行未通过、阿里云未通过
                    //     return row.notHideIdCard;
                    // }
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
                {field: 'auditTimeStr', title:'资料审核时间', sortable: false},
                // {field: 'auditTimeStr', title:'报到审核通过时间', sortable: false},
                {field: 'auditStatus', title:'报到资料状态', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return auditStatusName[value];
                    }
                }, styler: function(value,row,index){
                    if (value && (value == 1 || value == 4)){ // 报到待审核、修改资料待审核
                        return {class: 'warning'};
                    }
                }},
                {field: 'rewardStatusStr', title:'奖励状态', sortable: false, styler: function(value, row, index){
                    // 待审核/已通过/被退回/暂无奖励
                    if (value && (value == '待审核')){ // 待审核
                        return {class: 'warning'};
                    }
                }},
                {field: 'fullName', title:'所在团支部', sortable: false},
                {field: 'developmentMemberNumber', title:'团员编号', sortable: false},
                {field: 'deletedState', title:'删除状态', sortable: false, formatter: function(value, row, index){
                    // 团员删除状态 1：正常，2：已申请删除，待审核，3：已申请删除，被退回
                    if(value) {
                        return deletedStateName[value];
                    }

                    // return '正常';
                }},
                {field: 'disabled', title:'团籍状态', sortable: false, formatter: function(value, row, index){
                    // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                    return disabledName[value];
                }}
            ]],
            loader: function (param, success, error) {
                // 跨页面传参
                if(parent.window.zhtj && parent.window.zhtj.referer) {
                    if(parent.window.zhtj.referer == 'message') { // "消息管理-我的消息"
                        if('auditStatus' in parent.window.zhtj) { // 报到待审核
                            param.auditStatus =  parent.window.zhtj.auditStatus; // 报到待审核 - 报到资料状态
                            $('#auditStatus_filter').combobox('setValue', parent.window.zhtj.auditStatus); // 默认选中筛选(报到待审核 - 报到资料状态)
                        }else if('rewardStatus' in parent.window.zhtj) { // 奖励待审核
                            param.rewardStatus =  parent.window.zhtj.rewardStatus; // 待审核 - 奖励状态
                            $('#rewardStatus_filter').combobox('setValue', parent.window.zhtj.rewardStatus); // 默认选中筛选(待审核 - 奖励状态)
                        }else if('disabled' in parent.window.zhtj) { // 团籍状态
                            param.disabled =  parent.window.zhtj.disabled; // 离脱退开
                            $('#disabled_filter').combobox('setValue', parent.window.zhtj.disabled); // 默认选中筛选(离脱退开 - 团籍状态)
                            // param.name =  parent.window.zhtj.name; // 团员姓名
                            // $('#name_filter').val(parent.window.zhtj.name); // 默认值
                        }
                    }else if(parent.window.zhtj.referer == 'tree') { // "组织管理-查看组织树" 本级团员详情
                        param.oid = parent.window.zhtj.oid; // 默认选中筛选(所在团支部)
                        $('#oid_filter').val(parent.window.zhtj.fullName).data('oid', parent.window.zhtj.oid); // 渲染搜索框
                    }else if(parent.window.zhtj.referer == 'home') { // "首页"
                        if('auditStatus' in parent.window.zhtj) { // 报到待审核
                            param.auditStatus =  parent.window.zhtj.auditStatus; // 报到待审核 - 报到资料状态
                            $('#auditStatus_filter').combobox('setValue', parent.window.zhtj.auditStatus); // 默认选中筛选(报到待审核 - 报到资料状态)
                        }else if('rewardStatus' in parent.window.zhtj) { // 奖励待审核
                            param.rewardStatus =  parent.window.zhtj.rewardStatus; // 待审核 - 奖励状态
                            $('#rewardStatus_filter').combobox('setValue', parent.window.zhtj.rewardStatus); // 默认选中筛选(待审核 - 奖励状态)
                        }
                    }
                    var queryParams = {};
                    $.each(param, function (key, value) {
                        // 页码和页大小不用设置
                        if(key != 'page' && key != 'rows') {
                            queryParams[key] = value;
                        }
                    });
                    $('#league_menber').datagrid({queryParams: queryParams}); // 设置datagrid请求参数，否则下载页面没有这些参数
                    delete parent.window.zhtj; // 删除对象
                    return;
                }

                // 团员列表
                LeagueMemberApi.list({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    name: param.name, // 团员姓名
                    degreeOfEducation: param.degreeOfEducation, // 全日制学历(可不传，1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
                    auditStatus: param.auditStatus, // 审核状态(可不传，1:报到待审核,2:报到被退回,3:审核通过,4:修改资料待审核,5:修改资料被退回)
                    rewardStatus: param.rewardStatus, // 奖励状态(可不传，-1：暂无奖励，0：待审核，1：审核通过，2：已退回)
                    deletedState: param.deletedState, // 删除状态(可不传，1：正常，2：已申请删除，待审核，3：已申请删除，被退回)
                    mobile: param.mobile, // 手机号码
                    disabled: param.disabled, // 团籍状态(0: 正常, 3: 满28周岁离团待审核, 5: 自行脱团待审核, 7: 自愿退团待审核, 9: 开除团籍待审核)
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
                        $('#league_menber').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
                var isAllHide = true; // 自定义工具栏按钮是否全隐藏
                $('.toolbar .linkbutton_box').each(function () {
                    if($(this).css('display') != 'none') {
                        isAllHide = false;
                    }
                });
                if(isAllHide) { // 自定义工具栏按钮全部隐藏
                    $('#north_region').css('height', '144'); // 北部的高度缩减到 原来无 自定义工具栏的高度
                    $('#center_region').parent().css('top', '144px'); // 将数据网格填补已隐藏的自定义工具栏空白
                }
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
                iconCls: 'icon-my-edit',
                text: '编辑',
                id: 'members_edit',
                handler: function(){
                    var selectedData = $('#league_menber').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 团员禁用 不能再进行任何涉及数据修改的操作
                    if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                        $.alert(tipsDisabled(selectedData.idCard));
                        return;
                    }

                    // 审核状态(可不传，1:报到待审核,2:报到被退回,3:审核通过,4:修改资料待审核,5:修改资料被退回)
                    if(selectedData.auditStatus != 3) { // 非 审核通过
                        $.alert('报到资料状态为审核通过才能编辑');
                        return;
                    }

                    mid_global = selectedData.mid; // 团员ID(全局变量)

                    // 基本信息显示列表(全局变量)
                    for(var i=0; i<optionList_global.length; i++) {
                        var option = optionList_global[i];
                        if(option == 'incumbent') { // 团内现任职务
                            $('#' + option).combobox('setValue', selectedData[option]);
                            if(selectedData[option] == 9) { // 其他(团内现任职务)
                                $('#incumbentDesc').parents('tr').show(); // 显示 职务名称
                            }else {
                                $('#incumbentDesc').parents('tr').hide(); // 隐藏 职务名称
                            }
                            continue;
                        }
                        if(option == 'incumbentDesc') { // 团内现任职务
                            $('#' + option).val(selectedData[option]);
                            continue;
                        }
                        if(option == 'income' || option == 'isCadres' || option == 'nation' || option == 'politicalOutlook' || option == 'degreeOfEducation' || option == 'highestEducation' || option == 'occupation') {
                            $('#' + option).combobox('setValue', selectedData[option]); // 设置收入/是否团干部/民族/政治面貌/全日制学历/最高学历/职业
                            if(option == 'isCadres') {
                                // (1: 是，2：否)
                                if(selectedData[option] == 1) {
                                    $('#fm .isCadres').show(); // 显示(团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                                }else {
                                    $('#fm .isCadres').hide(); // 隐藏(团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                                }
                            }else if(option == 'nation'){ // 民族
                                if(selectedData[option] == 57) { // 其他(民族)
                                    $('#nationInfo').parents('tr').show(); // 显示 民族名称
                                }else { // 56个民族
                                    $('#nationInfo').parents('tr').hide(); // 隐藏 民族名称
                                }
                            }
                            continue;
                        }
                        if(option == 'residence') { // 户籍
                            cityDid_global = selectedData['cityDid']; // 城市ID(全局变量)
                            $('#provinceDid').combobox('setValue', selectedData['provinceDid']); // 设置省份
                            // 根据省级ID查询市级
                            LeagueMemberApi.getDistrictByPid({did: selectedData['provinceDid']}).then(function (data) {
                                $('#cityDid').combobox('loadData', data.rows); // 加载城市列表数据
                                $('#cityDid').combobox('setValue', selectedData['cityDid']); // 设置城市
                            });
                            // 根据省级ID查询市级 -- 加载县级(区级)
                            LeagueMemberApi.getDistrictByPid({did: selectedData['cityDid']}).then(function (data) {
                                $('#countyDid').combobox('loadData', data.rows); // 加载县级/区级列表数据
                                $('#countyDid').combobox('setValue', selectedData['countyDid']); // 设置县级/区级
                            });
                            continue;
                        }
                        if(option == 'birthday') {
                            $('#' + option).datebox('setValue', selectedData['birthdayStr']); // 出生日期
                            continue;
                        }
                        if(option == 'thePartyYears' || option == 'signUpForVolunteerTime' || option == 'dateOfDuty') {
                            $('#' + option).datebox('setValue', selectedData[option]); // 入党年月/注册志愿者时间/任现职年月
                            continue;
                        }
                        if(option == 'tuanganProperties') { // 团干部性质
                            $('#' + option).combobox('setValue', selectedData[option]); // 设置团干部性质名称
                            // $('#' + option + '_view').val(tuanganPropertiesName[selectedData[option]]); // 设置团干部性质名称
                            continue;
                        }
                        if(option == 'isPartyCommitteeMember') {
                            $('#' + option).combobox('setValue', selectedData[option]); // 设置是否同级党委（支部）成员
                            continue;
                        }
                        $('#' + option).val(selectedData[option]);
                    }

                    // 弹窗位置居中
                    // $("#dialog_audiStatus").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog').parents('.window').outerHeight())*0.5 });
                    $('#dialog').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-view',
                text: '查看',
                id: 'members_list',
                handler: function(){
                    var selectedData = $('#league_menber').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    mid_global = selectedData.mid; // 团员ID(全局变量)

                    var html = '';
                    // 基本信息
                    for(var i=0; i<baseList_global.length; i++) {
                        var option = baseList_global[i];
                        if(!selectedData[option] && option != 'residence') { // null，直接返回(避免出现null)
                            continue;
                        }
                        // (团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                        if(selectedData['isCadres'] == 2 && (option == 'incumbent' || option == 'dateOfDuty' || option == 'tuanganProperties' || option == 'isPartyCommitteeMember')) { // 否 -- 是否团干部名称(1: 是，2：否)
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
                        }else if (option == 'isRealName') { // 实名认证状态
                            text = isRealName[selectedData[option]]; // 设置实名认证状态
                            var value = selectedData[option];
                            if (value == 1 || value == 2 || value == 4){ // 银行未通过、阿里云未通过、银行定时未通过
                                style = 'warning'; // 添加文字样式
                            }
                        }else if (option == 'birthday') { // 出生日期
                            text = selectedData[option + 'Str']; // 设置出生日期
                        }else if (option == 'income') { // 收入
                            text = selectedData[option + 'Str']; // 设置收入名称
                        }else if (option == 'isCadres') { // 是否团干部
                            text = yesOrNoName[selectedData[option]]; // 设置是否团干部名称
                        }else if (option == 'incumbent') {
                            text = incumbentName[selectedData[option]]; // 设置团内现任职务
                            if(selectedData[option] == 9){ // 其他(团内现任职务)
                                text = incumbentName[selectedData[option]] + ' ' + selectedData['incumbentDesc'];
                            }
                        }else if (option == 'tuanganProperties') { // 团干部性质
                            text = tuanganPropertiesName[selectedData[option]]; // 设置团干部性质名称
                        }else if (option == 'isPartyCommitteeMember') { // 是否同级党委(支部)成员
                            text = yesOrNoName[selectedData[option]]; // 设置是否同级党委(支部)成员名称
                        }else if (option == 'nation') { // 民族
                            // text = nationName[selectedData[option]]; // 设置民族名称
                            text = nationName[selectedData[option]];
                            if(selectedData[option] == 57) { // 其他(民族)
                                text = nationName[selectedData[option]] + ' ' + selectedData['nationInfo']; // 民族 + 民族名称
                            }
                        }else if (option == 'politicalOutlook') { // 政治面貌
                            text = politicalOutlookName[selectedData[option]]; // 设置政治面貌名称
                        }else if (option == 'degreeOfEducation') { // 全日制学历
                            text = degreeOfEducationName[selectedData[option]]; // 设置全日制学历名称
                        }else if (option == 'highestEducation') { // 最高学历
                            text = degreeOfEducationName[selectedData[option]]; // 设置最高学历名称
                        }else if (option == 'residence') { // 户籍所在地
                            text = Utils.returnValidString(selectedData['provinceName']) + Utils.returnValidString(selectedData['cityName']) + Utils.returnValidString(selectedData['countyName']); // 设置户籍所在地名称
                        }else {
                            text = selectedData[option]; // 姓名/入团年月/所在团支部/任现职年月/手机号码
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
                    $('#dialog_view .list_box .list.base .content').html(html);

                    var html_addition = '';
                    // 附加信息
                    for(var i=0; i<additionList_global.length; i++) {
                        var option = additionList_global[i];
                        if (!selectedData[option]) { // null，直接返回(避免出现null)
                            continue;
                        }

                        var text = '';
                        if(option == 'occupation') { // 职业
                            text = occupationName[selectedData[option]]; // 设置职业名称
                        }else {
                            text = selectedData[option]; // 学习工作单位/电子邮箱/QQ/微信号/微博号/团员编号/入党年月/注册志愿者时间
                        }

                        html_addition += '<div class="item">';
                        html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                        html_addition += '</div>';
                    }
                    if(!html_addition) {
                        // html_addition = '<div>暂无信息</div>';
                        html_addition += '<div class="item">';
                        html_addition += '    <span class="title">暂无信息</span>';
                        html_addition += '</div>';
                    }
                    $('#dialog_view .list_box .list.addition .content').html(html_addition);

                    var html_img = '';
                    // 附件
                    var realNameFileUrl = selectedData.realNameFileUrl;
                    if(realNameFileUrl) {
                        var realNameFileUrlList = realNameFileUrl.split(',');
                        for(var i=0; i<realNameFileUrlList.length; i++) {
                            var imgUrl = realNameFileUrlList[i];
                            html_img += '<div class="img_box">';
                            html_img += '    <img src="' + imgUrl + '" title="点击查看大图">';
                            html_img += '</div>';
                        }
                        html_img += '<div class="item" style="clear: both;">';
                        html_img += '    <span class="title">线下实名认证通过理由：</span><span class="describe">' + selectedData.realNameReason + '</span>';
                        html_img += '</div>';
                        $('#dialog_view .list_box .list.attachment .content').html(html_img);
                        $('#dialog_view .list_box .list.attachment').show(); // 显示 附件项
                    }else {
                        $('#dialog_view .list_box .list.attachment').hide(); // 隐藏 附件项
                        // html_img += '<div class="item">';
                        // html_img += '    <span class="title">暂无信息</span>';
                        // html_img += '</div>';
                    }

                    // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardIn_global, $('#dialog_view .rewardIn')); // 团内奖励

                    // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardOut_global, $('#dialog_view .rewardOut')); // 团外奖励

                    // 团组织查看单个团员的惩罚信息列表
                    renderPunishmentList_operation(LeagueMemberApi.punishmentList, params_punishment_global, $('#dialog_view .punishment')); // 惩罚

                    // 弹窗位置居中
                    // $("#dialog_view").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_view').parents('.window').outerHeight())*0.5 });
                    $('#dialog_view').dialog('open'); // 弹出对话框
                }
            }
            , '-', {
                iconCls: 'icon-my-disable',
                text: '离脱退团/开除团籍',
                id: 'members_retreatApply',
                handler: function(){
                    var selectedData = $('#league_menber').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 审核状态
                    if(selectedData.auditStatus < 3) {
                        $.alert('该团员处于' + auditStatusName[selectedData.auditStatus] + '状态，请勿操作');
                        return;
                    }

                    // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                    if(selectedData.disabled != 0) { // 非正常
                        $.alert('该团员已处于' + disabledName[selectedData.disabled] + '状态，请勿重复操作');
                        return;
                    }

                    isCadres_global = selectedData.isCadres; // 是否团干(全局变量 -- 1: 是，2：否)
                    mid_global = selectedData.mid; // 团员ID(全局变量)

                    // 弹窗位置居中
                    $('#dialog_retreat_apply').dialog('open'); // 弹出对话框(离脱退团/开除团籍)
                }
            }, '-', {
                iconCls: 'icon-my-disable',
                text: '离脱退团/开除团籍审核',
                id: 'members_retreatAudit',
                handler: function(){
                    var selectedData = $('#league_menber').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                    if(selectedData.disabled != 3 && selectedData.disabled != 5 && selectedData.disabled != 7 && selectedData.disabled != 9) { // 满28周岁离团待审核/自行脱团待审核/自愿退团待审核/开除团籍待审核
                        $.alert('该团员已处于' + disabledName[selectedData.disabled] + '状态，请勿重复操作');
                        return;
                    }

                    mid_global = selectedData.mid; // 团员ID(全局变量)

                    var html = '';
                    // 基本信息
                    // ['name', 'idCard', 'fullName', 'applyOrgFullName', 'disabled', 'retreatReasonForApplication', 'retreatApplicationDescription']
                    for(var i=0; i<retreatList_global.length; i++) {
                        var option = retreatList_global[i];
                        if(!selectedData[option]) { // null，直接返回(避免出现null)
                            continue;
                        }

                        var text = '';
                        var style = '';
                        if (option == 'idCard') { // 身份证
                            if(selectedData['isRealName'] == 1 || selectedData['isRealName'] == 2) { // 银行未通过、阿里云未通过
                                text = selectedData['notHideIdCard']; // 不带星号身份证号
                            }else {
                                text = selectedData[option]; // 带星号身份证号
                            }
                        }else if (option == 'disabled') { // 团籍类型
                            text = disabledName[selectedData[option]]; // 设置团籍类型名称
                        }else if (option == 'retreatReasonForApplication') { // 申请理由
                            var textList = selectedData[option].split(',');
                            for(var j=0; j<textList.length; j++) {
                                if(textList[j] && retreatReasonName[textList[j]]) {
                                    text += retreatReasonName[textList[j]];
                                    if(j != textList.length-1) {
                                        text += '，';
                                    }
                                }
                            }
                            // text = retreatReasonName[selectedData[option]]; // 设置申请理由名称
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
                    $('#dialog_retreat_audit .list_box .list.base .content').html(html);

                    // 附件
                    var retreatAttachmentUrl = selectedData.retreatAttachmentUrl;
                    if(retreatAttachmentUrl) {
                        var html_img = '';
                        var html_pdf = '';
                        var pdf_once = false; // 是否曾经有pdf(true：有，false：没有)

                        var retreatAttachmentUrlList = retreatAttachmentUrl.split(',');
                        for(var i=0; i<retreatAttachmentUrlList.length; i++) {
                            var attachmentUrl = retreatAttachmentUrlList[i];
                            var photoStr = 'gif,jpg,jpeg,png,bmp';
                            var ext = attachmentUrl.substring(attachmentUrl.lastIndexOf('.')+1, attachmentUrl.length).toLowerCase(); // 文件扩展名
                            console.log('ext', ext);
                            if(photoStr.indexOf(ext) != -1) { // 图片
                                html_img += '<div class="img_box">';
                                html_img += '    <img src="' + attachmentUrl + '" title="点击查看大图">';
                                html_img += '</div>';
                            }else { // 非图片
                                if(!pdf_once) { // 曾经没有pdf
                                    html_pdf += '<div class="files" style="clear: both;">';
                                    pdf_once = true;
                                }
                                html_pdf += '    <div class="file_item" style="margin: 10px 0;">';
                                html_pdf += '        <a style="display: inline-block;padding-left: 25px;font-size: 14px;text-decoration: none;color: #0d87ef;background: #fff url(../../public/img/clip.png) no-repeat left center;" href="' + attachmentUrl + '" title="点击下载">' + Utils.getUploaderSuffixName(attachmentUrl) + '</a>';
                                html_pdf += '    </div>';
                            }
                        }
                        if(html_pdf) {
                            html_pdf += '</div>';
                        }
                        html_img += html_pdf; // 添加pdf文件展示
                        $('#dialog_retreat_audit .list_box .list.attachment .content').html(html_img);
                        $('#dialog_retreat_audit .list_box .list.attachment').show(); // 显示 附件项
                    }else {
                        $('#dialog_retreat_audit .list_box .list.attachment').hide(); // 隐藏 附件项
                    }

                    // 弹窗位置居中
                    $('#dialog_retreat_audit').dialog('open'); // 弹出对话框

                }
            }
            // , '-', {
            //     iconCls: 'icon-my-audit',
            //     text: '资料审核',
            //     id: 'members_audit',
            //     handler: function(){
            //         var selectedData = $('#league_menber').datagrid('getSelected');
            //         if(!selectedData) {
            //             $.alert('请选择需要操作的记录');
            //             return;
            //         }
            //
            //         // 团员禁用 不能再进行任何涉及数据修改的操作
            //         if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
            //             $.alert(tipsDisabled(selectedData.idCard));
            //             return;
            //         }
            //
            //         isRealName_global = selectedData.isRealName; // 实名认证(全局变量)
            //
            //         // '10': '通过'(通过) ，'1': '校验中'(银行未通过)，'2': '校验失败'(阿里云未通过)，'3': '线下验证通过'(线下验证通过)，'4': '校验中'(银行定时未通过)
            //         if(selectedData.isRealName == 1 || selectedData.isRealName == 4) { // 校验中
            //             $.alert('该团员的实名认证状态为校验中，暂时无法审核！');
            //             return;
            //         }
            //
            //         // 审核状态(可不传，1:报到待审核,2:报到被退回,3:审核通过,4:修改资料待审核,5:修改资料被退回)
            //         if(selectedData.auditStatus == 2) {
            //             $.alert('该团员的报到申请已被退回，您无需再次审核！');
            //             return;
            //         }
            //         if(selectedData.auditStatus == 3) {
            //             $.alert('该团员状态为审核通过，您无需再次审核！');
            //             return;
            //         }
            //         if(selectedData.auditStatus == 5) {
            //             $.alert('该团员的修改资料申请已被退回，您无需再次审核！');
            //             return;
            //         }
            //
            //         $('.realNameAudit').hide(); // 隐藏实名认证相关信息
            //         // var list = ['income', 'isCadres', 'incumbent', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember'];
            //         if(selectedData.auditStatus == 4) { // 修改资料待审核
            //             function returnValidText(value) {
            //                 return value ? value : '空值';
            //             }
            //
            //             if(selectedData.income != selectedData.newIncome) {
            //                 $('#income_update').text(selectedData['incomeStr']); // 工资(修改前)
            //                 $('#newIncome_update').text(selectedData['newIncomeStr']); // 工资(修改后)
            //                 $('#income_update').parent().show();
            //             }else {
            //                 $('#income_update').parent().hide();
            //             }
            //
            //             if(selectedData.politicalOutlook != selectedData.newPoliticalOutlook) {
            //                 $('#politicalOutlook_update').text(politicalOutlookName[selectedData['politicalOutlook']]); // 政治面貌(修改前)
            //                 $('#newPoliticalOutlook_update').text(politicalOutlookName[selectedData['newPoliticalOutlook']]); // 政治面貌(修改后)
            //                 $('#politicalOutlook_update').parent().show();
            //             }else {
            //                 $('#politicalOutlook_update').parent().hide();
            //             }
            //
            //             if(selectedData.leagueForYears != selectedData.newLeagueForYears) {
            //                 $('#leagueForYears_update').text(selectedData['leagueForYears']); // 入团年月(修改前)
            //                 $('#newLeagueForYears_update').text(selectedData['newLeagueForYears']); // 入团年月(修改后)
            //                 $('#leagueForYears_update').parent().show();
            //             }else {
            //                 $('#leagueForYears_update').parent().hide();
            //             }
            //
            //             if(selectedData.isCadres != selectedData.newIsCadres) {
            //                 $('#isCadres_update').text(yesOrNoName[selectedData.isCadres]); // 是否团干(修改前)
            //                 $('#newIsCadres_update').text(yesOrNoName[selectedData.newIsCadres]); // 是否团干(修改后)
            //                 $('#isCadres_update').parent().show();
            //             }else {
            //                 $('#isCadres_update').parent().hide();
            //             }
            //             if(selectedData.newIsCadres == 1) { // 是否为团干部(1: 是，2：否) -> 是
            //                 $('#fm_audiStatus .myTable .isCadres').show(); // 团内现任职务/现任职年月/团干部性质/是否同级党委(支部)成员
            //
            //                 if(selectedData.incumbent != selectedData.newIncumbent) {
            //                     $('#incumbent_update').text(returnValidText(incumbentName[selectedData.incumbent])); // 团内现任职务(修改前)
            //                     $('#newIncumbent_update').text(incumbentName[selectedData.newIncumbent]); // 团内现任职务(修改后)
            //                     $('#incumbent_update').parent().show();
            //                 }else {
            //                     $('#incumbent_update').parent().hide();
            //                 }
            //
            //                 if(selectedData.newIncumbent == 9) { // 其他(团内现任职务)
            //                     if(selectedData.incumbentDesc != selectedData.newIncumbentDesc) {
            //                         $('#incumbentDesc_update').text(returnValidText(selectedData.incumbentDesc)); // 职务名称(修改前)
            //                         $('#newIncumbentDesc_update').text(selectedData.newIncumbentDesc); // 职务名称(修改后)
            //                         $('#incumbentDesc_update').parent().show(); // 显示 职务名称
            //                     }else {
            //                         $('#incumbentDesc_update').parent().hide(); // 隐藏 职务名称
            //                     }
            //                 }else { // 非其他(团内现任职务)
            //                     $('#incumbentDesc_update').parent().hide(); // 隐藏 职务名称
            //                 }
            //
            //                 if(selectedData.dateOfDuty != selectedData.newDateOfDuty) {
            //                     $('#dateOfDuty_update').text(returnValidText(selectedData.dateOfDuty)); // 现任职年月(修改前)
            //                     $('#newDateOfDuty_update').text(selectedData.newDateOfDuty); // 现任职年月(修改后)
            //                     $('#dateOfDuty_update').parent().show();
            //                 }else {
            //                     $('#dateOfDuty_update').parent().hide();
            //                 }
            //                 if(selectedData.tuanganProperties != selectedData.newTuanganProperties) {
            //                     $('#tuanganProperties_update').text(returnValidText(tuanganPropertiesName[selectedData.tuanganProperties])); // 团干部性质(修改前)
            //                     $('#newTuanganProperties_update').text(tuanganPropertiesName[selectedData.newTuanganProperties]); // 团干部性质(修改后)
            //                     $('#tuanganProperties_update').parent().show();
            //                 }else {
            //                     $('#tuanganProperties_update').parent().hide();
            //                 }
            //                 if(selectedData.isPartyCommitteeMember != selectedData.newIsPartyCommitteeMember) {
            //                     $('#isPartyCommitteeMember_update').text(returnValidText(yesOrNoName[selectedData.isPartyCommitteeMember])); // 是否同级党委(支部)成员(修改前)
            //                     $('#newIsPartyCommitteeMember_update').text(yesOrNoName[selectedData.newIsPartyCommitteeMember]); // 是否同级党委(支部)成员(修改后)
            //                     $('#isPartyCommitteeMember_update').parent().show();
            //                 }else {
            //                     $('#isPartyCommitteeMember_update').parent().hide();
            //                 }
            //             }else {
            //                 $('#fm_audiStatus .myTable .isCadres').hide(); // 团内现任职务/现任职年月/团干部性质/是否同级党委(支部)成员
            //             }
            //             $('.myTable').show(); // 显示 修改内容表格
            //             $('.tips').hide(); // 提示文字(所有)
            //             $('#audit_edit').show(); // 提示文字(修改)
            //         }else{ // 报到待审核
            //             $('.myTable').hide(); // 隐藏 修改内容表格
            //             $('.tips').hide(); // 提示文字(所有)
            //             $('#audit_registration').show(); // 提示文字(报道)
            //         }
            //
            //
            //         // 团员信息
            //         var html = '';
            //         // 基本信息
            //         for(var i=0; i<baseList_global.length; i++) {
            //             var option = baseList_global[i];
            //             if(!selectedData[option] && option != 'residence') { // null，直接返回(避免出现null)
            //                 continue;
            //             }
            //             // (团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
            //             if(selectedData['isCadres'] == 2 && (option == 'incumbent' || option == 'dateOfDuty' || option == 'tuanganProperties' || option == 'isPartyCommitteeMember')) { // 否 -- 是否团干部名称(1: 是，2：否)
            //                 continue;
            //             }
            //
            //             var text = '';
            //             var style = '';
            //
            //             if(option == 'idCardType') { // 证件类型
            //                 if(selectedData[option]) {
            //                     text = idCardTypeName[selectedData[option]];
            //                 }else { // 无返回值
            //                     text = idCardTypeName[1]; // 证件类型(默认 普通居民身份证)
            //                 }
            //             }else if (option == 'idCard') { // 身份证
            //                 if(selectedData['isRealName'] == 1 || selectedData['isRealName'] == 2) { // 银行未通过、阿里云未通过
            //                     text = selectedData['notHideIdCard']; // 不带星号身份证号
            //                 }else {
            //                     text = selectedData[option]; // 带星号身份证号
            //                 }
            //             }else if (option == 'income') { // 收入
            //                 text = selectedData[option + 'Str']; // 设置收入名称
            //             }else if (option == 'isRealName') { // 实名认证状态
            //                 text = isRealName[selectedData[option]]; // 设置实名认证状态
            //                 var value = selectedData[option];
            //                 if (value == 1 || value == 2 || value == 4){ // 银行未通过、阿里云未通过、银行定时未通过
            //                     style = 'warning'; // 添加文字样式
            //                 }
            //             }else if (option == 'isCadres') { // 是否团干部
            //                 text = yesOrNoName[selectedData[option]]; // 设置是否团干部名称
            //             }else if (option == 'incumbent') {
            //                 text = incumbentName[selectedData[option]]; // 设置团内现任职务
            //                 if(selectedData[option] == 9) { // 其他(团内现任职务)
            //                     text = incumbentName[selectedData[option]] + ' ' + selectedData['incumbentDesc'];
            //                 }
            //             }else if (option == 'tuanganProperties') { // 团干部性质
            //                 text = tuanganPropertiesName[selectedData[option]]; // 设置团干部性质名称
            //             }else if (option == 'isPartyCommitteeMember') { // 是否同级党委(支部)成员
            //                 text = yesOrNoName[selectedData[option]]; // 设置是否同级党委(支部)成员名称
            //             }else if (option == 'nation') { // 民族
            //                 text = nationName[selectedData[option]]; // 设置民族名称
            //                 if(selectedData[option] == 57) { // 其他(民族)
            //                     text = nationName[selectedData[option]] + ' ' + selectedData['nationInfo']; // 设置民族名称
            //                 }
            //             }else if (option == 'politicalOutlook') { // 政治面貌
            //                 text = politicalOutlookName[selectedData[option]]; // 设置政治面貌名称
            //             }else if (option == 'degreeOfEducation') { // 全日制学历
            //                 text = degreeOfEducationName[selectedData[option]]; // 设置全日制学历名称
            //             }else if (option == 'highestEducation') { // 最高学历
            //                 text = degreeOfEducationName[selectedData[option]]; // 设置最高学历名称
            //             }else if (option == 'residence') { // 户籍所在地
            //                 text = Utils.returnValidString(selectedData['provinceName']) + Utils.returnValidString(selectedData['cityName']) + Utils.returnValidString(selectedData['countyName']); // 设置户籍所在地名称
            //             }else {
            //                 text = selectedData[option]; // 姓名/入团年月/所在团支部/任现职年月/手机号码
            //             }
            //
            //             html += '<div class="item">';
            //             html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe ' + style + '">' + text + '</span>';
            //             html += '</div>';
            //         }
            //         if(!html) {
            //             // html = '<div>暂无信息</div>';
            //             html += '<div class="item">';
            //             html += '    <span class="title">暂无信息</span>';
            //             html += '</div>';
            //         }
            //         $('#dialog_audiStatus .list_box .list.base .content').html(html); // 渲染基本信息
            //
            //         var html_addition = '';
            //         // 附加信息
            //         for(var i=0; i<additionList_global.length; i++) {
            //             var option = additionList_global[i];
            //             if (!selectedData[option]) { // null，直接返回(避免出现null)
            //                 continue;
            //             }
            //
            //             var text = '';
            //             if(option == 'occupation') { // 职业
            //                 text = occupationName[selectedData[option]]; // 设置职业名称
            //             }else {
            //                 text = selectedData[option]; // 学习工作单位/电子邮箱/QQ/微信号/微博号/团员编号/入党年月/注册志愿者时间
            //             }
            //
            //             html_addition += '<div class="item">';
            //             html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
            //             html_addition += '</div>';
            //         }
            //         if(!html_addition) {
            //             // html_addition = '<div>暂无信息</div>';
            //             html_addition += '<div class="item">';
            //             html_addition += '    <span class="title">暂无信息</span>';
            //             html_addition += '</div>';
            //         }
            //         $('#dialog_audiStatus .list_box .list.addition .content').html(html_addition); // 渲染附加信息
            //
            //         var html_img = '';
            //         var realNameFileUrl = selectedData.realNameFileUrl;
            //         if(realNameFileUrl) {
            //             var realNameFileUrlList = realNameFileUrl.split(',');
            //             for(var i=0; i<realNameFileUrlList.length; i++) {
            //                 var imgUrl = realNameFileUrlList[i];
            //                 html_img += '<div class="img_box">';
            //                 html_img += '    <img src="' + imgUrl + '" title="点击查看大图">';
            //                 html_img += '</div>';
            //             }
            //             $('#dialog_audiStatus .list_box .list.attachment .content').html(html_img); // 渲染附加信息
            //             $('#dialog_audiStatus .list_box .list.attachment').show(); // 显示 附件项
            //         }else {
            //             $('#dialog_audiStatus .list_box .list.attachment').hide(); // 隐藏 附件项
            //         }
            //
            //         // 弹窗位置居中
            //         // $("#dialog_audiStatus").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_audiStatus').parents('.window').outerHeight())*0.5 });
            //         $('#dialog_audiStatus').dialog('open'); // 弹出对话框
            //
            //         mid_global = selectedData.mid; // 团员ID(全局变量)
            //         audiStatus_global = selectedData.auditStatus; // 审核状态(全局变量)
            //         $('#returnReason_auditStatus').parents('tr').hide(); // 隐藏退回原因输入框
            //
            //     }
            // }, '-', {
            //     iconCls: 'icon-my-rewards-audit',
            //     text: '奖励审核',
            //     id: 'reward_audit',
            //     handler: function(){
            //         var selectedData = $('#league_menber').datagrid('getSelected');
            //         if(!selectedData) {
            //             $.alert('请选择需要操作的记录');
            //             return;
            //         }
            //
            //         // 团员禁用 不能再进行任何涉及数据修改的操作
            //         if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
            //             $.alert(tipsDisabled(selectedData.idCard));
            //             return;
            //         }
            //
            //         // 奖励状态( 0：待审核，1：已通过， 2：被退回，null：暂无奖励)
            //         if(selectedData.rewardStatus != 0) {
            //             $.alert('该团员奖励状态为' + selectedData.rewardStatusStr + '，您无需再次审核！');
            //             return;
            //         }
            //
            //         // 获取单个审核组织需要审核的奖励记录列表
            //         LeagueMemberApi.listByOrg({memberId: selectedData.mid}).then(function (data) {
            //             var list = data.dataList;
            //
            //             if(!list || list.length <= 0) {
            //                 $.alert('当前组织不是该奖励的授奖组织，所以您无需审核，相关的授奖组织会完成审核操作。查找待本组织审核的奖励，可在上方筛选条件 “奖励状态” 中选择 “待本组织审核”，搜索即可过滤得出结果');
            //                 return;
            //             }
            //
            //             var html = '';
            //             // 奖励类型名称
            //             var typeName = {
            //                 '1': '团内奖励',
            //                 '2': '团外奖励'
            //             };
            //             for(var i=0; i<list.length; i++) {
            //                 var item = list[i];
            //                 html += '<div class="list" style="margin-bottom: 40px;">';
            //                 html += '   <div class="item_list" style="margin-bottom: 10px;" data-id="' + item.id + '">';
            //                 for(var j=0; j<awardsList_global.length; j++) {
            //                     var option = awardsList_global[j];
            //                     var text = '';
            //                     var style = '';
            //
            //                     if(option == 'type') { // 奖励类型
            //                         text = typeName[item[option]];
            //                     }else if(option == 'hasAttachFile') { // 证明附件
            //                         if(!item[option]) {
            //                             continue;
            //                         }
            //                         text = '查看';
            //                         style = 'c_blue';
            //                         // style = 'warming';
            //                     }else {
            //                         text = item[option];
            //                     }
            //
            //                     html += '       <div class="item">';
            //                     html += '           <span class="title">' + paramsName[option] + '：</span><span class="describe ' + style + '">' + text + '</span>';
            //                     html += '       </div>';
            //                 }
            //                 html += '   </div>';
            //                 html += '   <div class="check_box" id="check_box' + item.id + '" data-id="' + item.id + '">';
            //                 html += '       <div class="title">请审核<span>' + selectedData.name + '</span>的奖励申请' + (i+1) + '</div>';
            //                 html += '       <label data-id="1"><i></i><span>通过</span></label><label data-id="2"><i></i><span>退回</span></label>';
            //                 html += '       <textarea placeholder="请输入您退回的原因" class="returnReason" maxlength="249" style="display: none;margin-top: 20px;padding: 10px;width: 100%; height: 100px;"></textarea>';
            //                 html += '   </div>';
            //                 html += '</div>';
            //             }
            //             $('#dialog_awards .list_box .list .content').html(html);
            //             $('#dialog_awards').dialog('open'); // 显示弹出框
            //         });
            //     }
            // }
            , '-', {
                iconCls: 'icon-my-rewards-edit',
                text: '奖惩修改',
                id: 'reward_edit',
                handler: function(){
                    var selectedData = $('#league_menber').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 团员禁用 不能再进行任何涉及数据修改的操作
                    if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                        $.alert(tipsDisabled(selectedData.idCard));
                        return;
                    }

                    if(!selectedData.hasReward && !selectedData.hasPunish) {
                        $.alert('该团员暂无奖惩');
                        return;
                    }

                    mid_global = selectedData.mid; // 团员ID(全局变量)

                    // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardIn_global, $('#dialog_awards_operation .rewardIn'), true); // 团内奖励

                    // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardOut_global, $('#dialog_awards_operation .rewardOut'), true); // 团外奖励

                    // 团组织查看单个团员的惩罚信息列表
                    renderPunishmentList_operation(LeagueMemberApi.punishmentList, params_punishment_global, $('#dialog_awards_operation .punishment'), true); // 惩罚

                    // 弹窗位置居中
                    $('#dialog_awards_operation').dialog('open'); // 弹出对话框
                }
            }
                , '-', {
                    iconCls: 'icon-my-cadre-transfer',
                    text: '转为团干',
                    id: 'member_tuanganConversionMember',
                    handler: function(){
                        var selectedData = $('#league_menber').datagrid('getSelected');
                        if(!selectedData) {
                            $.alert('请选择需要操作的记录');
                            return;
                        }

                        // 团员禁用 不能再进行任何涉及数据修改的操作
                        if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                            $.alert(tipsDisabled(selectedData.idCard));
                            return;
                        }

                        parent.window.zhtj = selectedData;
                        Utils.toggleNav('view/cadre_management/cadre_management.html', true); // 打开指定导航页面(我的团干)
                    }
                }, '-', {
                    iconCls: 'icon-my-delete',
                    text: '申请删除',
                    id: 'members_applyForDeletion',
                    handler: function(){
                        var selectedData = $('#league_menber').datagrid('getSelected');
                        if(!selectedData) {
                            $.alert('请选择需要操作的记录');
                            return;
                        }

                        // 团员禁用 不能再进行任何涉及数据修改的操作
                        if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                            $.alert(tipsDisabled(selectedData.idCard));
                            return;
                        }

                        // 团员删除状态 1：正常，2：已申请删除，待审核，3：已申请删除，被退回
                        if(selectedData.deletedState == 2) { // 已申请删除，待审核
                            $.alert('该团员已处于删除审核中，请勿重复操作');
                            return;
                        }

                        // name_idCard_global = selectedData.name + selectedData.idCard; // 名字身份证(申请删除团员 -- 全局变量)
                        $('#name_idCard').text(selectedData.name + selectedData.idCard); // 名字身份证
                        mid_global = selectedData.mid; // 团员ID(全局变量)
                        // 弹窗位置居中
                        $('#dialog_apply_delete').dialog('open'); // 弹出对话框(申请删除团员)
                    }
                }, '-', {
                    iconCls: 'icon-my-delete',
                    text: '批准删除',
                    id: 'members_confirmDeletion',
                    handler: function(){
                        var selectedData = $('#league_menber').datagrid('getSelected');
                        if(!selectedData) {
                            $.alert('请选择需要操作的记录');
                            return;
                        }

                        // 团员禁用 不能再进行任何涉及数据修改的操作
                        if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                            $.alert(tipsDisabled(selectedData.idCard));
                            return;
                        }

                        // 团员删除状态 1：正常，2：已申请删除，待审核，3：已申请删除，被退回
                        if(selectedData.deletedState != 2) { // 正常/已申请删除，被退回
                            $.alert('如需审批删除，请先申请');
                            return;
                        }

                        var $dialog_permission_delete = $('#dialog_permission_delete');
                        $dialog_permission_delete.find('.name_idCard_permission').text(selectedData.name + selectedData.idCard); // 名字身份证
                        $dialog_permission_delete.find('.name_permission').text(selectedData.name); // 名字
                        $dialog_permission_delete.find('.deletedReason').text(deletedReasonName[selectedData.deletedReason]); // 删除理由
                        $dialog_permission_delete.find('.deletedRemarks').text(Utils.returnValidString(selectedData.deletedRemarks)); //申请删除文字说明

                        mid_global = selectedData.mid; // 团员ID(全局变量)
                        // 弹窗位置居中
                        $('#dialog_permission_delete').dialog('open'); // 弹出对话框(批准删除团员)
                    }
                }
            ]
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

                // 根据当前登录获取团员列表所在组织
                LeagueMemberApi.orgList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    type: 5, // 类型(1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部 -- 空查全部)
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
                    $('#dialog_organization').dialog('open'); // 弹出对话框(选择所在团支部弹出框)
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
                // oid_global = rowData.oid; // 组织ID(全局变量)
                $('#oid_filter').val(rowData.fullName); // 渲染搜索框
                $('#oid_filter').data('oid', rowData.oid); // 设置搜索框 oid

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

        // 点击 '所在团支部' (数据筛选，弹出框 -- 选择所在团支部)
        $('#oid_filter_box').click(function () {
            $('#datagrid_organization').datagrid('load', {fullName: ''});
        });

        // 点击 '所在团支部'的'x'图标 (数据筛选，弹出框 -- 选择所在团支部)
        $('#oid_filter_icon').click(function () {
            $('#oid_filter').val('').data('oid', ''); // 渲染搜索框
            return false;
        });
    }

    // 数据筛选（需要初始化的事件）
    function init_datafilter() {
        // 奖励状态
        $('#rewardStatus_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            data: [
                {value: '', name: '全部'},
                {value: '-1', name: '无奖励'},
                {value: '0', name: '待审核'},
                {value: '1', name: '有奖励'},
                {value: '2', name: '待本组织审核'}
                // {value: '2', name: '<span style="color: red;">待本组织审核</span>'}
            ]
        });

        // 获取全日制学历列表
        $('#degreeOfEducation_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                LeagueMemberApi.getHighestEducationList({}).then(function (data) {
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

        // 获取审核状态列表
        $('#auditStatus_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                LeagueMemberApi.auditStatus({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取审核状态列表为空');
                        error();
                        return;
                    }
                    // data.rows.pop(); // 删除并返回数组的最后一个元素
                    data.rows.splice(1,1); // 删除并返回数组的最后一个元素
                    data.rows.unshift({ value: '', name: '全部'});
                    success(data.rows);
                })
            }
        });

        // 删除状态
        $('#deletedState_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            data: [
                {value: '', name: '全部'},
                {value: '1', name: '正常'},
                {value: '2', name: '已申请删除，待审核'},
                {value: '3', name: '已申请删除，被退回'}
            ]
        });

        // 团籍状态
        $('#disabled_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            data: [
                {value: '', name: '全部'},
                {value: '0', name: '正常'},
                {value: '3', name: '满28周岁离团待审核'},
                {value: '5', name: '自行脱团待审核'},
                {value: '7', name: '自愿退团待审核'},
                {value: '9', name: '开除团籍待审核'}
            ]
        });


        // 点击'资料审核' -- 工具栏
        $('#members_audit').click(function () {

            var selectedData = $('#league_menber').datagrid('getSelected');
            if(!selectedData) {
                $.alert('请选择需要操作的记录');
                return;
            }

            // 团员禁用 不能再进行任何涉及数据修改的操作
            if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                $.alert(tipsDisabled(selectedData.idCard));
                return;
            }

            isRealName_global = selectedData.isRealName; // 实名认证(全局变量)

            // '10': '通过'(通过) ，'1': '校验中'(银行未通过)，'2': '校验失败'(阿里云未通过)，'3': '线下验证通过'(线下验证通过)，'4': '校验中'(银行定时未通过)
            if(selectedData.isRealName == 1 || selectedData.isRealName == 4) { // 校验中
                $.alert('该团员的实名认证状态为校验中，暂时无法审核！');
                return;
            }

            // 审核状态(可不传，1:报到待审核,2:报到被退回,3:审核通过,4:修改资料待审核,5:修改资料被退回)
            if(selectedData.auditStatus == 2) {
                $.alert('该团员的报到申请已被退回，您无需再次审核！');
                return;
            }
            if(selectedData.auditStatus == 3) {
                $.alert('该团员状态为审核通过，您无需再次审核！');
                return;
            }
            if(selectedData.auditStatus == 5) {
                $.alert('该团员的修改资料申请已被退回，您无需再次审核！');
                return;
            }

            $('.realNameAudit').hide(); // 隐藏实名认证相关信息
            // var list = ['income', 'isCadres', 'incumbent', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember'];
            if(selectedData.auditStatus == 4) { // 修改资料待审核
                function returnValidText(value) {
                    return value ? value : '空值';
                }

                if(selectedData.income != selectedData.newIncome) {
                    $('#income_update').text(selectedData['incomeStr']); // 工资(修改前)
                    $('#newIncome_update').text(selectedData['newIncomeStr']); // 工资(修改后)
                    $('#income_update').parent().show();
                }else {
                    $('#income_update').parent().hide();
                }

                if(selectedData.politicalOutlook != selectedData.newPoliticalOutlook) {
                    $('#politicalOutlook_update').text(politicalOutlookName[selectedData['politicalOutlook']]); // 政治面貌(修改前)
                    $('#newPoliticalOutlook_update').text(politicalOutlookName[selectedData['newPoliticalOutlook']]); // 政治面貌(修改后)
                    $('#politicalOutlook_update').parent().show();
                }else {
                    $('#politicalOutlook_update').parent().hide();
                }

                if(selectedData.leagueForYears != selectedData.newLeagueForYears) {
                    $('#leagueForYears_update').text(selectedData['leagueForYears']); // 入团年月(修改前)
                    $('#newLeagueForYears_update').text(selectedData['newLeagueForYears']); // 入团年月(修改后)
                    $('#leagueForYears_update').parent().show();
                }else {
                    $('#leagueForYears_update').parent().hide();
                }

                if(selectedData.isCadres != selectedData.newIsCadres) {
                    $('#isCadres_update').text(yesOrNoName[selectedData.isCadres]); // 是否团干(修改前)
                    $('#newIsCadres_update').text(yesOrNoName[selectedData.newIsCadres]); // 是否团干(修改后)
                    $('#isCadres_update').parent().show();
                }else {
                    $('#isCadres_update').parent().hide();
                }
                if(selectedData.newIsCadres == 1) { // 是否为团干部(1: 是，2：否) -> 是
                    $('#fm_audiStatus .myTable .isCadres').show(); // 团内现任职务/现任职年月/团干部性质/是否同级党委(支部)成员

                    if(selectedData.incumbent != selectedData.newIncumbent) {
                        $('#incumbent_update').text(returnValidText(incumbentName[selectedData.incumbent])); // 团内现任职务(修改前)
                        $('#newIncumbent_update').text(incumbentName[selectedData.newIncumbent]); // 团内现任职务(修改后)
                        $('#incumbent_update').parent().show();
                    }else {
                        $('#incumbent_update').parent().hide();
                    }

                    if(selectedData.newIncumbent == 9) { // 其他(团内现任职务)
                        if(selectedData.incumbentDesc != selectedData.newIncumbentDesc) {
                            $('#incumbentDesc_update').text(returnValidText(selectedData.incumbentDesc)); // 职务名称(修改前)
                            $('#newIncumbentDesc_update').text(selectedData.newIncumbentDesc); // 职务名称(修改后)
                            $('#incumbentDesc_update').parent().show(); // 显示 职务名称
                        }else {
                            $('#incumbentDesc_update').parent().hide(); // 隐藏 职务名称
                        }
                    }else { // 非其他(团内现任职务)
                        $('#incumbentDesc_update').parent().hide(); // 隐藏 职务名称
                    }

                    if(selectedData.dateOfDuty != selectedData.newDateOfDuty) {
                        $('#dateOfDuty_update').text(returnValidText(selectedData.dateOfDuty)); // 现任职年月(修改前)
                        $('#newDateOfDuty_update').text(selectedData.newDateOfDuty); // 现任职年月(修改后)
                        $('#dateOfDuty_update').parent().show();
                    }else {
                        $('#dateOfDuty_update').parent().hide();
                    }
                    if(selectedData.tuanganProperties != selectedData.newTuanganProperties) {
                        $('#tuanganProperties_update').text(returnValidText(tuanganPropertiesName[selectedData.tuanganProperties])); // 团干部性质(修改前)
                        $('#newTuanganProperties_update').text(tuanganPropertiesName[selectedData.newTuanganProperties]); // 团干部性质(修改后)
                        $('#tuanganProperties_update').parent().show();
                    }else {
                        $('#tuanganProperties_update').parent().hide();
                    }
                    if(selectedData.isPartyCommitteeMember != selectedData.newIsPartyCommitteeMember) {
                        $('#isPartyCommitteeMember_update').text(returnValidText(yesOrNoName[selectedData.isPartyCommitteeMember])); // 是否同级党委(支部)成员(修改前)
                        $('#newIsPartyCommitteeMember_update').text(yesOrNoName[selectedData.newIsPartyCommitteeMember]); // 是否同级党委(支部)成员(修改后)
                        $('#isPartyCommitteeMember_update').parent().show();
                    }else {
                        $('#isPartyCommitteeMember_update').parent().hide();
                    }
                }else {
                    $('#fm_audiStatus .myTable .isCadres').hide(); // 团内现任职务/现任职年月/团干部性质/是否同级党委(支部)成员
                }
                $('.myTable').show(); // 显示 修改内容表格
                $('.tips').hide(); // 提示文字(所有)
                $('#audit_edit').show(); // 提示文字(修改)
            }else{ // 报到待审核
                $('.myTable').hide(); // 隐藏 修改内容表格
                $('.tips').hide(); // 提示文字(所有)
                $('#audit_registration').show(); // 提示文字(报道)
            }


            // 团员信息
            var html = '';
            // 基本信息
            for(var i=0; i<baseList_global.length; i++) {
                var option = baseList_global[i];
                if(!selectedData[option] && option != 'residence') { // null，直接返回(避免出现null)
                    continue;
                }
                // (团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                if(selectedData['isCadres'] == 2 && (option == 'incumbent' || option == 'dateOfDuty' || option == 'tuanganProperties' || option == 'isPartyCommitteeMember')) { // 否 -- 是否团干部名称(1: 是，2：否)
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
                }else if (option == 'income') { // 收入
                    text = selectedData[option + 'Str']; // 设置收入名称
                }else if (option == 'isRealName') { // 实名认证状态
                    text = isRealName[selectedData[option]]; // 设置实名认证状态
                    var value = selectedData[option];
                    if (value == 1 || value == 2 || value == 4){ // 银行未通过、阿里云未通过、银行定时未通过
                        style = 'warning'; // 添加文字样式
                    }
                }else if (option == 'isCadres') { // 是否团干部
                    text = yesOrNoName[selectedData[option]]; // 设置是否团干部名称
                }else if (option == 'incumbent') {
                    text = incumbentName[selectedData[option]]; // 设置团内现任职务
                    if(selectedData[option] == 9) { // 其他(团内现任职务)
                        text = incumbentName[selectedData[option]] + ' ' + selectedData['incumbentDesc'];
                    }
                }else if (option == 'tuanganProperties') { // 团干部性质
                    text = tuanganPropertiesName[selectedData[option]]; // 设置团干部性质名称
                }else if (option == 'isPartyCommitteeMember') { // 是否同级党委(支部)成员
                    text = yesOrNoName[selectedData[option]]; // 设置是否同级党委(支部)成员名称
                }else if (option == 'nation') { // 民族
                    text = nationName[selectedData[option]]; // 设置民族名称
                    if(selectedData[option] == 57) { // 其他(民族)
                        text = nationName[selectedData[option]] + ' ' + selectedData['nationInfo']; // 设置民族名称
                    }
                }else if (option == 'politicalOutlook') { // 政治面貌
                    text = politicalOutlookName[selectedData[option]]; // 设置政治面貌名称
                }else if (option == 'degreeOfEducation') { // 全日制学历
                    text = degreeOfEducationName[selectedData[option]]; // 设置全日制学历名称
                }else if (option == 'highestEducation') { // 最高学历
                    text = degreeOfEducationName[selectedData[option]]; // 设置最高学历名称
                }else if (option == 'residence') { // 户籍所在地
                    text = Utils.returnValidString(selectedData['provinceName']) + Utils.returnValidString(selectedData['cityName']) + Utils.returnValidString(selectedData['countyName']); // 设置户籍所在地名称
                }else {
                    text = selectedData[option]; // 姓名/入团年月/所在团支部/任现职年月/手机号码
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
            $('#dialog_audiStatus .list_box .list.base .content').html(html); // 渲染基本信息

            var html_addition = '';
            // 附加信息
            for(var i=0; i<additionList_global.length; i++) {
                var option = additionList_global[i];
                if (!selectedData[option]) { // null，直接返回(避免出现null)
                    continue;
                }

                var text = '';
                if(option == 'occupation') { // 职业
                    text = occupationName[selectedData[option]]; // 设置职业名称
                }else {
                    text = selectedData[option]; // 学习工作单位/电子邮箱/QQ/微信号/微博号/团员编号/入党年月/注册志愿者时间
                }

                html_addition += '<div class="item">';
                html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                html_addition += '</div>';
            }
            if(!html_addition) {
                // html_addition = '<div>暂无信息</div>';
                html_addition += '<div class="item">';
                html_addition += '    <span class="title">暂无信息</span>';
                html_addition += '</div>';
            }
            $('#dialog_audiStatus .list_box .list.addition .content').html(html_addition); // 渲染附加信息

            var html_img = '';
            var realNameFileUrl = selectedData.realNameFileUrl;
            if(realNameFileUrl) {
                var realNameFileUrlList = realNameFileUrl.split(',');
                for(var i=0; i<realNameFileUrlList.length; i++) {
                    var imgUrl = realNameFileUrlList[i];
                    html_img += '<div class="img_box">';
                    html_img += '    <img src="' + imgUrl + '" title="点击查看大图">';
                    html_img += '</div>';
                }
                $('#dialog_audiStatus .list_box .list.attachment .content').html(html_img); // 渲染附加信息
                $('#dialog_audiStatus .list_box .list.attachment').show(); // 显示 附件项
            }else {
                $('#dialog_audiStatus .list_box .list.attachment').hide(); // 隐藏 附件项
            }

            // 弹窗位置居中
            // $("#dialog_audiStatus").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_audiStatus').parents('.window').outerHeight())*0.5 });
            $('#dialog_audiStatus').dialog('open'); // 弹出对话框

            mid_global = selectedData.mid; // 团员ID(全局变量)
            audiStatus_global = selectedData.auditStatus; // 审核状态(全局变量)
            $('#returnReason_auditStatus').parents('tr').hide(); // 隐藏退回原因输入框


        });

        // 点击'奖励审核' -- 工具栏
        $('#reward_audit').click(function () {
            var selectedData = $('#league_menber').datagrid('getSelected');
            if(!selectedData) {
                $.alert('请选择需要操作的记录');
                return;
            }

            // 团员禁用 不能再进行任何涉及数据修改的操作
            if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                $.alert(tipsDisabled(selectedData.idCard));
                return;
            }

            // 奖励状态( 0：待审核，1：已通过， 2：被退回，null：暂无奖励)
            if(selectedData.rewardStatus != 0) {
                $.alert('该团员奖励状态为' + selectedData.rewardStatusStr + '，您无需再次审核！');
                return;
            }

            // 获取单个审核组织需要审核的奖励记录列表
            LeagueMemberApi.listByOrg({memberId: selectedData.mid}).then(function (data) {
                var list = data.dataList;

                if(!list || list.length <= 0) {
                    $.alert('当前组织不是该奖励的授奖组织，所以您无需审核，相关的授奖组织会完成审核操作。查找待本组织审核的奖励，可在上方筛选条件 “奖励状态” 中选择 “待本组织审核”，搜索即可过滤得出结果');
                    return;
                }

                var html = '';
                // 奖励类型名称
                var typeName = {
                    '1': '团内奖励',
                    '2': '团外奖励'
                };
                for(var i=0; i<list.length; i++) {
                    var item = list[i];
                    html += '<div class="list" style="margin-bottom: 40px;">';
                    html += '   <div class="item_list" style="margin-bottom: 10px;" data-id="' + item.id + '">';
                    for(var j=0; j<awardsList_global.length; j++) {
                        var option = awardsList_global[j];
                        var text = '';
                        var style = '';

                        if(option == 'type') { // 奖励类型
                            text = typeName[item[option]];
                        }else if(option == 'hasAttachFile') { // 证明附件
                            if(!item[option]) {
                                continue;
                            }
                            text = '查看';
                            style = 'c_blue';
                            // style = 'warming';
                        }else {
                            text = item[option];
                        }

                        html += '       <div class="item">';
                        html += '           <span class="title">' + paramsName[option] + '：</span><span class="describe ' + style + '">' + text + '</span>';
                        html += '       </div>';
                    }
                    html += '   </div>';
                    html += '   <div class="check_box" id="check_box' + item.id + '" data-id="' + item.id + '">';
                    html += '       <div class="title">请审核<span>' + selectedData.name + '</span>的奖励申请' + (i+1) + '</div>';
                    html += '       <label data-id="1"><i></i><span>通过</span></label><label data-id="2"><i></i><span>退回</span></label>';
                    html += '       <textarea placeholder="请输入您退回的原因" class="returnReason" maxlength="249" style="display: none;margin-top: 20px;padding: 10px;width: 100%; height: 100px;"></textarea>';
                    html += '   </div>';
                    html += '</div>';
                }
                $('#dialog_awards .list_box .list .content').html(html);
                $('#dialog_awards').dialog('open'); // 显示弹出框
            });

        });
        
        //
        // // 点击'离脱退团/开除团籍' -- 工具栏
        // $('#members_retreatApply').click(function () {
        //     var selectedData = $('#league_menber').datagrid('getSelected');
        //     if(!selectedData) {
        //         $.alert('请选择需要操作的记录');
        //         return;
        //     }
        //
        //     // 审核状态
        //     if(selectedData.auditStatus < 3) {
        //         $.alert('该团员处于' + auditStatusName[selectedData.auditStatus] + '状态，请勿操作');
        //         return;
        //     }
        //
        //     // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
        //     if(selectedData.disabled != 0) { // 非正常
        //         $.alert('该团员已处于' + disabledName[selectedData.disabled] + '状态，请勿重复操作');
        //         return;
        //     }
        //
        //     isCadres_global = selectedData.isCadres; // 是否团干(全局变量 -- 1: 是，2：否)
        //     mid_global = selectedData.mid; // 团员ID(全局变量)
        //
        //     // 弹窗位置居中
        //     $('#dialog_retreat_apply').dialog('open'); // 弹出对话框(离脱退团/开除团籍)
        // });
        //
        // // 点击'离脱退团/开除团籍审核' -- 工具栏
        // $('#members_retreatAudit').click(function () {
        //     var selectedData = $('#league_menber').datagrid('getSelected');
        //     if(!selectedData) {
        //         $.alert('请选择需要操作的记录');
        //         return;
        //     }
        //
        //     // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
        //     if(selectedData.disabled != 3 && selectedData.disabled != 5 && selectedData.disabled != 7 && selectedData.disabled != 9) { // 满28周岁离团待审核/自行脱团待审核/自愿退团待审核/开除团籍待审核
        //         $.alert('该团员已处于' + disabledName[selectedData.disabled] + '状态，请勿重复操作');
        //         return;
        //     }
        //
        //     mid_global = selectedData.mid; // 团员ID(全局变量)
        //
        //     var html = '';
        //     // 基本信息
        //     // ['name', 'idCard', 'fullName', 'applyOrgFullName', 'disabled', 'retreatReasonForApplication', 'retreatApplicationDescription']
        //     for(var i=0; i<retreatList_global.length; i++) {
        //         var option = retreatList_global[i];
        //         if(!selectedData[option]) { // null，直接返回(避免出现null)
        //             continue;
        //         }
        //
        //         var text = '';
        //         var style = '';
        //         if (option == 'idCard') { // 身份证
        //             if(selectedData['isRealName'] == 1 || selectedData['isRealName'] == 2) { // 银行未通过、阿里云未通过
        //                 text = selectedData['notHideIdCard']; // 不带星号身份证号
        //             }else {
        //                 text = selectedData[option]; // 带星号身份证号
        //             }
        //         }else if (option == 'disabled') { // 团籍类型
        //             text = disabledName[selectedData[option]]; // 设置团籍类型名称
        //         }else if (option == 'retreatReasonForApplication') { // 申请理由
        //             var textList = selectedData[option].split(',');
        //             for(var j=0; j<textList.length; j++) {
        //                 if(textList[j] && retreatReasonName[textList[j]]) {
        //                     text += retreatReasonName[textList[j]];
        //                     if(j != textList.length-1) {
        //                         text += '，';
        //                     }
        //                 }
        //             }
        //             // text = retreatReasonName[selectedData[option]]; // 设置申请理由名称
        //         }else {
        //             text = selectedData[option]; // 姓名/所在团支部/申请理由说明
        //         }
        //
        //         html += '<div class="item">';
        //         html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe ' + style + '">' + text + '</span>';
        //         html += '</div>';
        //     }
        //     if(!html) {
        //         // html = '<div>暂无信息</div>';
        //         html += '<div class="item">';
        //         html += '    <span class="title">暂无信息</span>';
        //         html += '</div>';
        //     }
        //     $('#dialog_retreat_audit .list_box .list.base .content').html(html);
        //
        //     // 附件
        //     var retreatAttachmentUrl = selectedData.retreatAttachmentUrl;
        //     if(retreatAttachmentUrl) {
        //         var html_img = '';
        //         var html_pdf = '';
        //         var pdf_once = false; // 是否曾经有pdf(true：有，false：没有)
        //
        //         var retreatAttachmentUrlList = retreatAttachmentUrl.split(',');
        //         for(var i=0; i<retreatAttachmentUrlList.length; i++) {
        //             var attachmentUrl = retreatAttachmentUrlList[i];
        //             var photoStr = 'gif,jpg,jpeg,png,bmp';
        //             var ext = attachmentUrl.substring(attachmentUrl.lastIndexOf('.')+1, attachmentUrl.length).toLowerCase(); // 文件扩展名
        //             console.log('ext', ext);
        //             if(photoStr.indexOf(ext) != -1) { // 图片
        //                 html_img += '<div class="img_box">';
        //                 html_img += '    <img src="' + attachmentUrl + '" title="点击查看大图">';
        //                 html_img += '</div>';
        //             }else { // 非图片
        //                 if(!pdf_once) { // 曾经没有pdf
        //                     html_pdf += '<div class="files" style="clear: both;">';
        //                     pdf_once = true;
        //                 }
        //                 html_pdf += '    <div class="file_item" style="margin: 10px 0;">';
        //                 html_pdf += '        <a style="display: inline-block;padding-left: 25px;font-size: 14px;text-decoration: none;color: #0d87ef;background: #fff url(../../public/img/clip.png) no-repeat left center;" href="' + attachmentUrl + '" title="点击下载">' + Utils.getUploaderSuffixName(attachmentUrl) + '</a>';
        //                 html_pdf += '    </div>';
        //             }
        //         }
        //         if(html_pdf) {
        //             html_pdf += '</div>';
        //         }
        //         html_img += html_pdf; // 添加pdf文件展示
        //         // html_img += '<div class="item" style="clear: both;">';
        //         // html_img += '    <p class="my-red">提示说明：审核通过后，团员的团籍将发生重要性改变，请你谨慎确定是否要通过该申请。</p>';
        //         // html_img += '</div>';
        //         $('#dialog_retreat_audit .list_box .list.attachment .content').html(html_img);
        //         $('#dialog_retreat_audit .list_box .list.attachment').show(); // 显示 附件项
        //     }else {
        //         $('#dialog_retreat_audit .list_box .list.attachment').hide(); // 隐藏 附件项
        //     }
        //
        //     // 弹窗位置居中
        //     $('#dialog_retreat_audit').dialog('open'); // 弹出对话框
        //
        // });

        // 点击 '电子团员证'
        $('#member_certification').click(function () {
            var selectedData = $('#league_menber').datagrid('getSelected');
            if(!selectedData) {
                $.alert('请选择需要操作的记录');
                return;
            }

            // 团员禁用 不能再进行任何涉及数据修改的操作
            if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                $.alert(tipsDisabled(selectedData.idCard));
                return;
            }

            // 入团时所在单位 团员电子证须填写
            if(!selectedData.leagueForUnit) {
                // $.alert('请填写入团时所在单位');
                $.alert('电子团员证中，“入团时所在单位”不能为空，请联系团员补充完整该信息。<br/>团员可通过微信公众号进入团员端首页->认证资料->点击“编辑”进行修改。');
                return;
            }

            // window.location.href = League.path + '/pdfCertificate/leagueCard/download?memberId=' + selectedData.mid + '&showMemberAdditionNames=&showMemberRewardIds='; // 电子团员证团员相关信息下载PDF

            parent.window.zhtj = {
                mid: selectedData.mid // 团员id
            };
            Utils.toggleTab('电子团员证预览', 'view/league_menber/member_certification.html'); // 创建(打开)新面板(电子团员证预览)
        });

        // 点击 '奖励记录下载'
        $('#member_reward').click(function () {
            var selectedData = $('#league_menber').datagrid('getSelected');
            if(!selectedData) {
                $.alert('请选择需要操作的记录');
                return;
            }

            // 团员禁用 不能再进行任何涉及数据修改的操作
            if(selectedData.disabled == 1) { // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
                $.alert(tipsDisabled(selectedData.idCard));
                return;
            }

            // window.location.href = League.path + '/pdfCertificate/memberReward/download?memberId=' + selectedData.mid; // 奖励记录信息下载PDF

            parent.window.zhtj = {
                mid: selectedData.mid // 团员id
            };
            Utils.toggleTab('奖励记录下载', 'view/league_menber/member_rewards_generation.html'); // 创建(打开)新面板(奖励记录下载)
        });

        // 点击 '导出本页数据'
        $('#download').click(function () {
            var paginationOptions = $('#league_menber').datagrid('getPager').data("pagination" ).options;
            var queryParams = $('#league_menber').datagrid('options').queryParams;
            console.log('queryParams', queryParams);
            console.log('paginationOptions', paginationOptions);
            var queryParamsStr = '?pageIndex=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize; // 请求参数字符串
            $.each(queryParams, function (key, value) {
                // console.log('key', key);
                // console.log('value', value);
                if(!value) { // 不能出现undefined
                    value = '';
                }
                queryParamsStr += '&' + key + '=' + value;
            });
            console.log('queryParamsStr', queryParamsStr);
            window.location.href = League.path + '/members/bg/export' + queryParamsStr; // 团员列表导出Excel
        });
    }

    // 点击查询按钮 -- 数据筛选
    $('#filter').click(function () {
        var params = {
            // pageNo: param.page, // 当前页码
            // pageSize: param.rows, // 每页记录数
            name: $('#name_filter').val().trim(), // 团员姓名
            degreeOfEducation: $('#degreeOfEducation_filter').combobox('getValue'), // 全日制学历(可不传，1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
            auditStatus: $('#auditStatus_filter').combobox('getValue'), // 审核状态(可不传，1:报到待审核,2:报到被退回,3:审核通过,4:修改资料待审核,5:修改资料被退回)
            rewardStatus: $('#rewardStatus_filter').combobox('getValue'), // 奖励状态(可不传，-1：暂无奖励，0：待审核，1：审核通过，2：已退回)
            deletedState: $('#deletedState_filter').combobox('getValue'), // 删除状态(可不传，1：正常，2：已申请删除，待审核，3：已申请删除，被退回)
            mobile: $('#mobile_filter').val().trim(), // 手机号码
            disabled: $('#disabled_filter').combobox('getValue'), // 团籍状态(0: 正常, 3: 满28周岁离团待审核, 5: 自行脱团待审核, 7: 自愿退团待审核, 9: 开除团籍待审核)
            oid: $('#oid_filter').data('oid') // 所在团支部
        };

        // 分页插件自动传递 page页码和rows页大小
        $('#league_menber').datagrid('load', params);
    });

    // 离脱退团/开除团籍(需要初始化的事件)
    function init_retreat_apply() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 申请删除团员 -- 对话框
        $('#dialog_retreat_apply').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#disabled').combobox('setValue', ''); // 初始化团籍状态
                $('#retreatReasonForApplication').combobox('setValue', ''); // 初始化申请理由
                $('#retreatApplicationDescription').val(''); // 清空文本框(申请说明)
                $('#dialog_retreat_apply .uploader_custom_control .fileUrlList').click(); // 重置上传插件
            },
            buttons: [{
                text: '取消申请',
                // iconCls:'icon-cancel',
                handler: function () {
                    $('#retreatReasonForApplication').parents('tr').hide(); // 隐藏申请理由
                    $('#dialog_retreat_apply').dialog('close'); // 关闭对话框
                }
            }, {
                text: '确定申请',
                // iconCls:'icon-ok',
                handler: function () {

                    // 验证
                    var validate = {
                        errorPlacement: function (error, element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };

                    var validateFlag = $('#fm_retreat_apply').validate(validate).form(); // 验证表单，填写信息是否完整


                    var disabled = $('#disabled').combobox('getValue'); // 团籍状态
                    var retreatReasonForApplication = $('#retreatReasonForApplication').combobox('getValues').join(','); // 申请理由
                    if(!disabled) {
                        var html = '<label id="disabled-error" class="error">请选择团籍状态</label>';
                        $('#disabled').parents('tr').append(html);
                        validateFlag = false;
                    }else {
                        // 判断申请理由
                        if(disabled == 4) { // 自行脱团
                            if(!retreatReasonForApplication) {
                                var html = '<label id="disabled-error" class="error">请选择申请理由</label>';
                                $('#retreatReasonForApplication').parents('tr').append(html);
                                validateFlag = false;
                            }
                        }else {
                            retreatReasonForApplication = undefined;
                        }
                    }

                    var retreatApplicationDescription = $('#retreatApplicationDescription').val().trim(); // 申请说明
                    if(!retreatApplicationDescription) {
                        var html = '<label id="disabled-error" class="error">请输入申请说明</label>';
                        $('#retreatApplicationDescription').parents('tr').append(html);
                        validateFlag = false;
                    }else {
                        // 判断申请说明
                        if(disabled && disabled != 2 && retreatApplicationDescription.length < 30) { // 非 满28周岁离团
                            var html = '<label id="disabled-error" class="error">请输入申请说明(至少30字)</label>';
                            $('#retreatApplicationDescription').parents('tr').append(html);
                            validateFlag = false;
                        }
                    }

                    if (!validateFlag) { // 表单填写未完成
                        Utils.scrollToAnchor($('#fm_retreat_apply')); // 跳到指定锚点
                        return;
                    }

                    var params = {
                        mid: mid_global, // 团员ID(全局变量)
                        disabled: disabled, // 团籍状态
                        retreatReasonForApplication: retreatReasonForApplication, // 申请理由
                        retreatApplicationDescription: $('#retreatApplicationDescription').val().trim(), // 申请说明
                        retreatAttachmentUrl: $('#dialog_retreat_apply .uploader_custom_control .fileUrlList').text() // 申请说明
                    };

                    if(!params.retreatAttachmentUrl) {
                        window.location.href = '#member_retreat_anchor'; // 滚动到指定锚点(上传证明材料)
                        $.alert('请上传证明材料');
                        return;
                    }

                    console.log('params', params);


                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_retreat_apply .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团员离脱退团及开除团籍申请
                    LeagueMemberApi.retreatApply(params).then(function (data) {
                        $('#dialog_retreat_apply').dialog('close'); // 关闭对话框(申请删除团员)
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_retreat_apply .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        // 团籍状态
        $('#disabled').combobox({
            valueField: 'id',
            textField: 'describe',
            width: 300,
            data: [
                { id: '', describe: '请选择处理类型' },
                { id: '2', describe: '满28周岁离团' },
                { id: '4', describe: '自行脱团' },
                { id: '6', describe: '自愿退团' },
                { id: '8', describe: '开除团籍' }
            ],
            onSelect: function (record) {
                var placeholder = '';
                $('.disabled_describe .disabled_item').hide(); // 隐藏业务说明全部子内容
                $('.retreatReasonForApplication').hide(); // 隐藏申请理由
                if(record.id == 2) { // 满28周岁离团
                    $('.disabled_describe .disabled_2').show();
                    placeholder = '请输入申请离团的理由或说明，如团员出生日期等';
                    // 团员离脱退团校验接口
                    LeagueMemberApi.retiredCheck({mid: mid_global}).then(function (data) {
                        if(isCadres_global == 1) { // 是团干 -- 1: 是，2：否
                            $.alert('年满二十八周岁仍在团内担任职务的团干保留团籍，该团员已在系统中被录入为团干，将其设置离团后，TA 在智慧团建平台上将不能办理组织关系转接和团费交纳业务，确定要对其进行离团操作吗？');
                        }
                    });
                }else if(record.id == 4) { // 自行脱团
                    $('.disabled_describe .disabled_4').show();
                    $('.retreatReasonForApplication').show();
                    placeholder = '请输入脱团处理的理由或补充说明，如何时开始拒交团费不过组织生活等（至少30字）';
                }else if(record.id == 6) { // 自愿退团
                    $('.disabled_describe .disabled_6').show();
                    placeholder = '请输入申请自愿退团的理由或说明（至少30字）';
                }else if(record.id == 8) { // 开除团籍
                    $('.disabled_describe .disabled_8').show();
                    placeholder = '请输入申请开除团籍的理由或说明（至少30字）';
                }
                $('#retreatApplicationDescription').val('').attr('placeholder', placeholder);
            }
        });

        // 申请理由
        $('#retreatReasonForApplication').combobox({
            valueField: 'id',
            textField: 'describe',
            width: 300,
            multiple: true,
            data: [
                // { id: '', describe: '请选择申请理由' },
                { id: '1', describe: '连续六个月不交纳团费' },
                { id: '2', describe: '不过团的组织生活' },
                { id: '3', describe: '连续六个月不做团组织分配的工作' }
            ]
        });

        $('.uploader_custom_control.member_retreat').myUploader({fileNumLimit: 10, accept: {jpg: 8, pdf: 2}, description: '最多可支持上传8张图片及2份PDF'}); // 初始化上传插件
    }
    
    // 离脱退团/开除团籍审核(需要初始化的事件)
    function init_retreat_audit() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 申请删除团员 -- 对话框
        $('#dialog_retreat_audit').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#auditStatus_retreat_audit label').removeClass('active'); // 清空单选框
                $('#retreatReturnReason_retreat_audit').val(''); // 清空理由文本框
                $('#retreatReturnReason_retreat_audit').parent().hide(); // 隐藏文本框
            },
            buttons: [{
                text: '取消',
                // iconCls:'icon-cancel',
                handler: function () {
                    $('#dialog_retreat_audit').dialog('close'); // 关闭对话框(申请删除团员)
                }
            }, {
                text: '确定',
                // iconCls:'icon-ok',
                handler: function () {
                    var params = {
                        mid: mid_global, // 团员ID(全局变量)
                        auditStatus: $('#dialog_retreat_audit').find('label.active').data('id'), // 1：通过，2：退回 -- 团籍状态
                        retreatReturnReason: $('#retreatReturnReason_retreat_audit').val().trim() // 原因
                    };

                    if(!params.auditStatus) {
                        window.location.href = '#auditStatus_retreat_audit';
                        $.alert('请选择审核状态');
                        return;
                    }

                    if(params.auditStatus == 2 && !params.retreatReturnReason) { // 退回且不输入原因
                        window.location.href = '#retreatReturnReason_retreat_audit';
                        $.alert('请输入退回的原因');
                        return;
                    }

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_retreat_audit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团员离脱退团及开除团籍审核
                    LeagueMemberApi.retreatAudit(params).then(function (data) {
                        $('#dialog_retreat_audit').dialog('close'); // 关闭对话框(申请删除团员)
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_retreat_audit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        // 点击单选框事件
        $('#auditStatus_retreat_audit label').click(function () {
            if($(this).hasClass('active')) { // 已选中，返回
                return;
            }

            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var status = $(this).data('id'); // 1：通过，2：退回
            // 1：通过，2：退回
            if(status == 2) { // 退回
                $('#retreatReturnReason_retreat_audit').parent().show(); // 显示
            }else { // 通过
                $('#retreatReturnReason_retreat_audit').parent().hide(); // 隐藏
            }
        });
    }

    // 查看团员(需要初始化的事件)
    function init_view() {
        // 查看团员
        $('#dialog_view').dialog({
            cache: false,
            onClose: function () {
                // 重置奖惩页码
                params_rewardIn_global.pageIndex = 1;
                params_rewardOut_global.pageIndex = 1;
                params_punishment_global.pageIndex = 1;
                $('#dialog_view .list_box .list .load-more').remove(); // 删除 '加载更多/全部加载完成'按钮
            }
        });
    }

    // 编辑(需要初始化的事件)
    function init_edit() {
        // 编辑 -- 对话框
        $('#dialog').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#fm').form('clear'); // 对话框关闭前，清除表单数据
                // $('#fm input').val(''); // 对话框关闭前，清除表单数据
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
                    var messages = {
                        'income': '请选择收入',
                        'idCard': '请选择是否团干部',
                        'incumbent': '请输入团内现任职务',
                        'xzzny': '请选择任现职年月',
                        'tuanganProperties': '请选择团干部性质',
                        'isPartyCommitteeMember': '请选择是否同级党委（支部）成员',
                        'nation': '请选择民族',
                        'politicalOutlook': '请选择政治面貌',
                        'degreeOfEducation': '请选择文化程度',
                        'highestEducation': '请选择最高学历',
                        'province': '请选择户籍所在地(省级)',
                        'city': '请选择户籍所在地(市级)',
                        'county': '请选择户籍所在地(县级/区级)'
                    };

                    // 验证
                    var validate = {
                        rules: {
                            'incumbentDesc': {
                                required: true
                            },
                            'nationInfo': {
                                required: true
                            },
                            'mobile': {
                                required: true,
                                checkMobile: true
                            },
                            'email': {
                                // required: true,
                                checkEMail: true
                            },
                            'leagueForUnit': {
                                required: true
                                // checkEMail: true
                            }
                        },
                        messages: {
                            'incumbentDesc': {
                                required: '请输入职务名称'
                            },
                            'nationInfo': {
                                required: '请输入民族名称'
                            },
                            'mobile': {
                                required: '请输入手机号码'
                            },
                            'email': {
                                required: '请输入正确电子邮箱'
                            },
                            'leagueForUnit': {
                                required: '请输入入团时所在单位'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    // var validateFlag = true; // 验证表单，填写信息是否完整
                    var validateFlag = $('#fm').validate(validate).form(); // 验证表单，填写信息是否完整

                    var params = {};
                    params.mid = mid_global; // 团员ID(全局变量)
                    // 基本信息显示列表(全局变量)
                    for(var i=0; i<optionList_global.length; i++) {
                        var option = optionList_global[i];

                        if(option == 'name' || option == 'idCard' || option == 'leagueForYears' || option == 'fullName' || option == 'incumbent' || option == 'incumbentDesc' || option == 'dateOfDuty' || option == 'tuanganProperties' || option == 'isPartyCommitteeMember') {
                            continue; // 姓名/身份证号/入团年月/所在团支部/团内现任职务/职务名称/任现职年月/团干部性质/是否同级党委（支部）成员
                        }

                        if(option == 'birthday') {
                            params['csnyr'] = $('#' + option).datebox('getValue'); // 出生日期
                            continue;
                        }
                        if(option == 'income' || option == 'isCadres' || option == 'nation' || option == 'politicalOutlook' || option == 'degreeOfEducation' || option == 'highestEducation') {
                            params[option] = $('#' + option).combobox('getValue'); // 收入/是否团干部/民族/政治面貌/全日制学历/最高学历
                            if(!params[option]) {
                                var html = '<label id="' + option + '-error" class="error">' + messages[option] + '</label>';
                                $('#' + option).parents('tr').append(html);
                                validateFlag = false;
                            }else if(option == 'nation' && params[option] != 57) { // 非其他(民族)
                                $('#nationInfo').val(''); // 清空 民族名称
                            }
                            continue;
                        }
                        if(option == 'residence') { // 户籍
                            params['provinceDid'] = $('#provinceDid').combobox('getValue'); // 省份ID
                            params['cityDid'] = $('#cityDid').combobox('getValue'); // 城市ID
                            params['countyDid'] = $('#countyDid').combobox('getValue'); // 县级/区级ID
                            if(!params['provinceDid'] || !params['cityDid'] || !params['countyDid']) {
                                var text = undefined;
                                if(!params['provinceDid']) {
                                    text = messages['province'];
                                }else if(!params['cityDid']) {
                                    text = messages['city'];
                                }else if(!params['countyDid']) {
                                    text = messages['county'];
                                }
                                var html = '<label id="' + option + '-error" class="error">' + text + '</label>';
                                $('#' + option).parents('tr').append(html);
                                validateFlag = false;
                            }
                            continue;
                        }
                        // if(option == 'incumbent') {
                        //     params[option] = $('#' + option).combobox('getValue'); // 团内现任职务
                        //     continue;
                        // }
                        // if(option == 'dateOfDuty') {
                        //     params['xzzny'] = $('#' + option).datebox('getValue'); // 任现职年月
                        //     continue;
                        // }
                        // if(option == 'tuanganProperties') {
                        //     params[option] = $('#' + option).combobox('getValue'); // 团干部性质
                        //     continue;
                        // }
                        // if(option == 'isPartyCommitteeMember') {
                        //     params[option] = $('#' + option).combobox('getValue'); // 是否同级党委（支部）成员
                        //     continue;
                        // }
                        if(option == 'occupation') {
                            params[option] = $('#' + option).combobox('getValue'); // 职业
                            continue;
                        }
                        if(option == 'thePartyYears') {
                            params['rdny'] = $('#' + option).datebox('getValue'); // 入党年月
                            continue;
                        }
                        if(option == 'signUpForVolunteerTime') {
                            params['zczyzsj'] = $('#' + option).datebox('getValue'); // 注册志愿者时间
                            continue;
                        }
                        params[option] = $('#' + option).val().trim();
                    }

                    if(params.isCadres == 1) { // 是否为团干部(1: 是，2：否) -> 是
                        var list = ['incumbent', 'xzzny', 'tuanganProperties', 'isPartyCommitteeMember'];
                        for(var i=0; i<list.length; i++) {
                            var item = list[i];
                            if(item == 'xzzny') { // 任现职年月
                                params[item] = $('#dateOfDuty').datebox('getValue');
                                if(!params[item]) {
                                    var html = '<label id="dateOfDuty-error" class="error">' + messages[item] + '</label>';
                                    $('#dateOfDuty').parents('tr').append(html);
                                    validateFlag = false;
                                }
                                continue;
                            }if(item == 'incumbent'){ // 职务名称
                                params[item] = $('#' + item).combobox('getValue');
                                if(params[item] == 9) { // 其他(团内现任职务)
                                    params['incumbentDesc'] = $('#incumbentDesc').val().trim(); // 设置 职务名称
                                }else { // 非其他(团内现任职务)
                                    params['incumbentDesc'] = ''; // 清空 职务名称
                                }
                            }else { // 团内现任职务/团干部性质/是否同级党委（支部）成员
                                params[item] = $('#' + item).combobox('getValue');
                            }
                            if(!params[item]) {
                                var html = '<label id="' + item + '-error" class="error">' + messages[item] + '</label>';
                                $('#' + item).parents('tr').append(html);
                                validateFlag = false;
                            }
                        }
                    }else {
                        params.incumbent = undefined; // 重置(团内现任职务)
                        params.incumbentDesc = undefined; // 重置(职务名称)
                        params.xzzny = undefined; // 重置(现任职年月)
                        params.tuanganProperties = undefined; // 重置(团干部性质)
                        params.isPartyCommitteeMember = undefined; // 重置(是否同级党委(支部)成员)
                    }

                    if(!validateFlag) { // 表单填写未完成
                        Utils.scrollToAnchor($('#fm')); // 跳到指定锚点
                        return;
                    }

                    // 团员修改
                    LeagueMemberApi.edit(params).then(function (data) {
                        $('#dialog').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    });
                }
            }]
        });

        // 获取收入列表
        $('#income').combobox({
            valueField: 'id',
            textField: 'describe',
            loader: function (param,success, error) {
                // 交费档位查询
                LeagueMemberApi.getAllIncomeBracket({}).then(function (data) {
                    if(!data.dataList || data.dataList.length <= 0) {
                        $.alert('获取收入列表');
                        error();
                        return;
                    }
                    success(data.dataList);
                })
            }
        });

        // 获取是否团干部列表
        $('#isCadres').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                LeagueMemberApi.yesOrNo({}).then(function (data) {
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

        // 团内现任职务
        $('#incumbent').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                LeagueMemberApi.getIncumbentList({}).then(function (data) {
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
                LeagueMemberApi.getNationList({}).then(function (data) {
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
                LeagueMemberApi.getMemberPoliticalOutlookList({}).then(function (data) {
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
                LeagueMemberApi.getHighestEducationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取全日制学历列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取最高学历列表
        $('#highestEducation').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                LeagueMemberApi.getHighestEducationList({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取最高学历列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 获取省份列表
        $('#provinceDid').combobox({
            valueField: 'did',
            textField: 'districtName',
            loader: function (param,success, error) {
                LeagueMemberApi.getDistrictByLevel({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取省份列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            },
            onSelect: function (record) {
                // 根据省级ID查询市级
                LeagueMemberApi.getDistrictByPid({did: record.did}).then(function (data) {
                    $('#cityDid').combobox('loadData', data.rows); // 加载城市列表数据
                    if(data.rows[0]) {
                        var cityId = data.rows[0].did; // 市级ID
                        $('#cityDid').combobox('setValue', cityId); // 默认选中列表的第一个

                        // 根据省级ID查询市级 -- 加载县级(区级)
                        LeagueMemberApi.getDistrictByPid({did: cityId}).then(function (data) {
                            $('#countyDid').combobox('loadData', data.rows); // 加载县级/区级列表数据
                            if(data.rows[0]) {
                                $('#countyDid').combobox('setValue', data.rows[0].did); // 默认选中列表的第一个
                            }
                        });

                    }
                });

            }
        });

        // 根据省级ID查询市级
        $('#cityDid').combobox({
            valueField: 'did',
            textField: 'districtName',
            onSelect: function (record) {
                // 根据省级ID查询市级 -- 加载县级(区级)
                LeagueMemberApi.getDistrictByPid({did: record.did}).then(function (data) {
                    $('#countyDid').combobox('loadData', data.rows); // 加载县级/区级列表数据
                    if(data.rows[0]) {
                        $('#countyDid').combobox('setValue', data.rows[0].did); // 默认选中列表的第一个
                    }
                });
            }
        });

        // 根据省级ID查询市级 -- 加载县级(区级)
        $('#countyDid').combobox({
            valueField: 'did',
            textField: 'districtName'
        });

        // 获取职业列表
        $('#occupation').combobox({
            valueField: 'value',
            textField: 'name',
            loader: function (param,success, error) {
                LeagueMemberApi.getOccupationList({}).then(function (data) {
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
                LeagueMemberApi.getTuanganProperties({}).then(function (data) {
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
                LeagueMemberApi.yesOrNo({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取是否同级党委（支部）成员');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });


        /****************** 日期插件年月开始 ********************/
        Utils.setDateBoxYearMonth($('#thePartyYears')); // 设置日期插件为年月日期插件(入党年月)
        Utils.setDateBoxYearMonth($('#signUpForVolunteerTime')); // 设置日期插件为年月日期插件(注册志愿者时间)
        /****************** 日期插件年月结束 ********************/
    }

    // 资料审核(需要初始化的事件)
    function init_audit() {
        // 审核团员 -- 对话框
        $('#dialog_audiStatus').dialog({
            cache: false,
            onClose: function () {
                $('#audit_auditStatus label').removeClass('active'); // 清空单选框
                $('#returnReason_auditStatus').val(''); // 清空理由文本框
                $('#returnReason_auditStatus').parent().hide(); // 隐藏文本框
                $('#dialog_audiStatus .uploader_custom_control .fileUrlList').click(); // 重置上传插件
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_audiStatus').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                handler:function(){
                    var params = {
                        mid: mid_global, // 团员ID(全局变量)
                        auditStatus: undefined, // 审核状态
                        returnReason: undefined, // 退回原因
                        realNameFileUrl: undefined, // 实名认证附件url
                        realNameReason: undefined // 实名认证审核原因
                    };
                    // 审核状态(可不传，1:报到待审核,2:报到被退回,3:审核通过,4:修改资料待审核,5:修改资料被退回)
                    var auditStatus = $('#audit_auditStatus').find('label.active').data('id'); // 1：通过，2：退回
                    if(!auditStatus) {
                        window.location.href = '#audit_auditStatus';
                        $.alert('请选择审核状态');
                        return;
                    }

                    if(auditStatus == 1) { // 通过(1：通过，2：退回)
                        params.auditStatus = 3; // 审核通过
                        // '10': '通过'(通过) ，'1': '校验中'(银行未通过)，'2': '校验失败'(阿里云未通过)，'3': '线下验证通过'(线下验证通过)，'4': '校验中'(银行定时未通过)
                        if(isRealName_global == 2) { // 校验失败(阿里云未通过)
                            var $realNameAudit = $('.realNameAudit');
                            if($realNameAudit && $realNameAudit.css('display') != 'none') { // 显示
                                params.realNameFileUrl = $('#dialog_audiStatus .uploader_custom_control .fileUrlList').text(); // 实名认证附件url
                                // params.realNameFileUrl = $('#imgUrl').text(); // 实名认证附件url
                                params.realNameReason = $('#realNameReason_auditStatus').val().trim(); // 实名认证审核原因
                                if(!params.realNameReason) { // 实名认证审核原因
                                    window.location.href = '#realNameReason_auditStatus_anchor';
                                    $.alert('请输入身份证实名通过的理由');
                                    return;
                                }
                                if(!params.realNameFileUrl) { // 实名认证附件url
                                    window.location.href = '#check_module';
                                    $.alert('请上传该团员手持身份证照片正反两面的照片');
                                    return;
                                }
                            }else { // 不显示
                                $.confirm('该团员实名校验不通过，请组织对团员身份证号进行核实').then(function () { // 确定
                                    window.location.href = '#audit_auditStatus';
                                    $('.tips').hide(); // 隐藏 提示信息(所有)
                                    $realNameAudit.show(); // 设置显示(线下实名验证填写，提示信息)
                                }, function () { // 取消
                                    $('#audit_auditStatus').find('label[data-id="2"]').click(); // 选中'退回'
                                });
                                return;
                            }
                        }
                    }else if(auditStatus == 2) { // 退回
                        params.returnReason = $('#returnReason_auditStatus').val().trim(); // 退回原因
                        if(!params.returnReason) {
                            $.alert('请输入您退回的原因');
                            return;
                        }
                        if(audiStatus_global == 1) { // 报到待审核
                            params.auditStatus = 2; // 报到被退回
                        }else if(audiStatus_global == 4) { // 修改资料待审核
                            params.auditStatus = 5; // 修改资料被退回
                        }
                    }

                    // 团员审核
                    LeagueMemberApi.audit(params).then(function (data) {
                        $('#imgUrl').click();
                        $('#dialog_audiStatus').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    });
                }
            }]
        });


        // 勾选框
        $('#fm_audiStatus #audit_auditStatus label').click(function () {
            if($(this).hasClass('active')) { // 已选中，返回
                return;
            }

            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var status = $(this).data('id'); // 1：通过，2：退回
            $('.realNameAudit').hide(); // 隐藏实名认证相关信息
            // 1：通过，2：退回
            if(status == 2) { // 退回
                $('#returnReason_auditStatus').parent().show(); // 显示
            }else { // 通过
                $('#returnReason_auditStatus').parent().hide(); // 隐藏
            }
        });

        // 点击 '查看模板'
        $('#check_module').click(function () {
            $('#dialog_check_module').dialog('open'); // 显示弹出框(查看模板)
        });

        $('.uploader_custom_control.member_data_audit').myUploader({description: '请上传团员本人头像与身份证照合影，支持拖放，最多可选8张'}); // 初始化上传插件
    }

    // 奖励审核(需要初始化的事件)
    function init_awards() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        $('#dialog_awards').dialog({
            cache: false,
            onClose: function () {
                $('#fm_audiStatus').form('clear'); // 对话框关闭前，清除表单数据
                // $('#fm_audiStatus input').val(''); // 对话框关闭前，清除表单数据
                // $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_awards').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                handler:function(){
                    var paramsArr = {
                        rewardIds: [], // 奖励ID
                        results: [], // 多份审核结果
                        returnReasons: [] // 多份退回原因
                    };
                    var $list = $('#dialog_awards .list_box .list .content').find('.check_box'); // 数据列表jquery对象
                    console.log('$list', $list);
                    var id_anchor = ''; // 锚点
                    for(var i=0; i<$list.length; i++) {
                        var $item = $($list[i]);
                        id_anchor = '#' + $item.attr('id'); // 锚点
                        var $active = $item.find('label.active');
                        var param = {
                            rewardIds: $item.data('id'), // 奖励ID
                            results: $active.length > 0 ? $active.data('id') : undefined, // 审核结果
                            returnReasons: $item.find('.returnReason').val().trim() // 退回原因
                        };
                        if(!param.results) { // 没有选择 奖励申请(直接返回)
                            continue;
                        }else if (param.results == 1) { // 通过
                            param.returnReasons = undefined;
                        }else if(param.results == 2) { // 退回
                            if(!param.returnReasons) { // 没有输入退回理由
                                window.location.href = id_anchor; // 跳到 锚点
                                $.alert('请输入您退回的原因');
                                return;
                            }
                            if(param.returnReasons.indexOf('@@') != -1) { // 包含特殊字符@@
                                window.location.href = id_anchor; // 跳到 锚点
                                $.alert('退回的原因不能包含特殊字符@@');
                                return;
                            }
                        }

                        paramsArr.rewardIds.push(param.rewardIds); // 奖励ID
                        paramsArr.results.push(param.results); // 多份审核结果
                        paramsArr.returnReasons.push(param.returnReasons); // 多份退回原因
                    }
                    console.log('paramsArr', paramsArr);
                    var params = {
                        rewardIds: paramsArr.rewardIds.join('@@'), // 奖励ID
                        results: paramsArr.results.join('@@'), // 多份审核结果
                        returnReasons: paramsArr.returnReasons.join('@@') // 多份退回原因
                    };
                    if(!params.rewardIds) {
                        window.location.href = id_anchor; // 跳到 锚点
                        $.alert('请审核奖励申请');
                        return;
                    }
                    console.log('params', params);

                    console.log('成功');

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_awards .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团组织批量审核团员的多份奖励信息
                    LeagueMemberApi.rewardAudit(params).then(function (data) {
                        $('#dialog_awards').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_awards .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });

                }
            }]
        });


        $('#dialog_awards .list_box .list .content').on('click', 'label', function () {
            if($(this).hasClass('active')) { // 已选中，返回
                return;
            }

            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var status = $(this).data('id'); // 1：通过，2：退回
            // 1：通过，2：退回
            if(status == 2) { // 退回
                $(this).parent().find('.returnReason').show(); // 显示 输入框
            }else { // 通过
                $(this).parent().find('.returnReason').hide(); // 隐藏
            }
        });
    }

    // 奖惩修改(需要初始化的事件)
    function init_awards_operation() {
        // 奖惩修改
        $('#dialog_awards_operation').dialog({
            cache: false,
            onClose: function () {
                // 重置奖惩页码
                params_rewardIn_global.pageIndex = 1;
                params_rewardOut_global.pageIndex = 1;
                params_punishment_global.pageIndex = 1;
                $('#dialog_awards_operation .list_box .list .load-more').remove(); // 删除 '加载更多/全部加载完成'按钮
            }
        });

        // 类型名称(奖励)
        var typeName = {
            '1': '团内',
            '2': '团外'
        };

        // 点击 '修改/删除'按钮
        $('#dialog_awards_operation').on('click', '.list .content .button', function () {
            var $button = $(this);
            var id = $button.parents('.item_list').data('id'); // 奖惩ID
            var isPunishment = $button.parents('.list').hasClass('punishment');
            if($button.hasClass('left')) { // 修改
                if(isPunishment) { // 惩罚
                    // 获取处罚详细信息
                    LeagueMemberApi.punishmentDetail({punishId: id}).then(function (data) {
                        var data = data.data;

                        if(data) {
                            if(data.filesList && data.filesList.length > 0) { // 附件(存在)
                                var list = data.filesList;
                                var html_img = '';
                                for(var i=0; i<list.length; i++) {
                                    var item = list[i];
                                    html_img += '<div class="img_box_delete">';
                                    html_img += '    <img src="' + item.filePath + '">';
                                    html_img += '    <span class="warning delete">删除</span>';
                                    html_img += '</div>';
                                }
                                if(html_img) {
                                    $('#dialog_punishment_edit .list.attachment.punishment_edit').html(html_img);
                                }
                            }else {
                                $('#dialog_punishment_edit list.attachment.punishment_edit').hide(); // 隐藏 图片(已存在)
                            }


                            $('#content_punishment').val(data['content']).data('id', data['id']); // 奖励名称

                            // 处罚时间
                            var punishTime = data['punishTime'].replace(/\./g, '/');
                            $('#punishTime_punishment').datebox('setValue', punishTime);

                            // 解除时间
                            var relieveTime = data['relieveTime'].replace(/\./g, '/');
                            $('#relieveTime_punishment').datebox('setValue', relieveTime);
                        }
                        $('#dialog_punishment_edit').dialog('open'); // 显示 弹出框(惩罚编辑)
                    });
                }else { // 奖励
                    LeagueMemberApi.rewardDetail({rewardId: id}).then(function (data) {
                        console.log('LeagueMemberApi.rewardDetail data', data);
                        var data = data.data;

                        var awardsList_edit_global = ['type', 'content', 'hasLevel', 'levelName', 'rewardTime', 'awardOrg', 'hasAttachFile', 'recorderName'];

                        if(data) {
                            if(data.filesList && data.filesList.length > 0) { // 附件(存在)
                                var list = data.filesList;
                                var html_img = '';
                                for(var i=0; i<list.length; i++) {
                                    var item = list[i];
                                    html_img += '<div class="img_box_delete">';
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

                                // 奖励类型
                                if (option == 'type' && data[option]) {
                                    $('#' + option + '_awards').find('label.checkbox[data-type="' + data[option] + '"]').addClass('active');
                                    $('#type_awards').val(typeName[data[option]]).data('id', data[option]); // 奖励类型名称
                                    if (data[option] == 1) { // 团内
                                        $('#auditOrgId_awards').val(data['auditOrgName']).data('id', data['auditOrgId']); // 审核组织(团内)
                                        $('#auditOrgId_awards').parents('tr').show(); // 显示 组织选择(团内)
                                        $('#auditOrgId_other_awards').parents('tr').hide(); // 隐藏 所在团支部(团外)
                                    } else if (data[option] == 2) { // 团外
                                        $('#auditOrgId_other_awards').val(data['auditOrgName']).data('id', data['auditOrgId']); // 审核组织(团外)
                                        $('#auditOrgId_awards').parents('tr').hide(); // 隐藏 组织选择(团内)
                                        $('#auditOrgId_other_awards').parents('tr').show(); // 显示 所在团支部(团外)
                                    }
                                    continue;
                                }

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

                                // 审核组织
                                if (option == 'auditOrgId' && data[option]) {
                                    $('#' + option + '_awards').data('id', data[option]).text(data['auditOrgName']);
                                    continue;
                                }

                                // 授奖组织
                                if (option == 'awardOrg' && data[option]) {
                                    $('#' + option + '_awards').val(data[option]);
                                    continue;
                                }
                            }
                        }
                        $('#dialog_awards_edit').dialog('open'); // 显示 弹出框(奖励编辑)
                    });
                }
            }else { // 删除
                var text = '确定删除该奖励？';
                if(isPunishment) {
                    text = '确定删除该惩罚？';
                }
                $.confirm(text).then(function () {
                    if(isPunishment) { // 惩罚
                        LeagueMemberApi.punishmentRemoveBatch({punishIds: id}).then(function (data) {
                            $.alert(data.msg).then(function () {
                                params_punishment_global.pageIndex = 1; // 重置页码
                                // 团组织查看单个团员的惩罚信息列表
                                renderPunishmentList_operation(LeagueMemberApi.punishmentList, params_punishment_global, $('#dialog_awards_operation .punishment'), true); // 刷新惩罚列表(奖惩修改对话框)
                            });
                        });
                    }else { // 奖励
                        var type = $button.parents('.list').hasClass('rewardIn') ? 1 : 2; // 奖励类型(1-团内奖励，2-团外奖励)
                        // 团组织(批量)移除(删除)团员的奖励信息
                        LeagueMemberApi.rewardRemoveBatch({rewardIds: id}).then(function (data) {
                            $.alert(data.msg).then(function () {
                                if (type == 1) { // 团内奖励
                                    params_rewardIn_global.pageIndex = 1; // 重置页码
                                    // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardIn_global, $('#dialog_awards_operation .rewardIn'), true); // 团内奖励
                                } else { // 团外奖励
                                    params_rewardOut_global.pageIndex = 1; // 重置页码
                                    // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardOut_global, $('#dialog_awards_operation .rewardOut'), true); // 团外奖励
                                }
                            });
                        });
                    }
                });
            }
        });

        // 点击'加载更多'
        $('.list_box .list').on('click', '.load-more', function () {
            var text = $(this).text();
            var $list = $(this).parents('.list');
            var isOperation = false; // 是否奖惩修改(true：是，false：不是)
            if($list.hasClass('operation')) {
                isOperation = true;
            }
            if(text == '加载更多') {
                if($list.hasClass('rewardIn')) { // 团内
                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardIn_global, $list, isOperation);
                }else if($list.hasClass('rewardOut')) { // 团外
                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardOut_global, $list, isOperation);
                }else if($list.hasClass('punishment')) { // 惩罚
                    renderPunishmentList_operation(LeagueMemberApi.punishmentList, params_punishment_global, $list, isOperation);
                }
            }
        });
    }


    // 奖励修改(需要初始化的事件)
    function init_awards_edit() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 奖励编辑 -- 对话框
        $('#dialog_awards_edit').dialog({
            cache: false,
            onClose: function () {
                // $('#fm_awards_edit').form('clear'); // 对话框关闭前，清除表单数据
                // $('#type_awards label.checkbox').removeClass('active'); // 清空 获奖类型
                $('#type_awards').val(''); // 清空 获奖类型
                $('#content_awards').val(''); // 清空 奖励名称
                $('#hasLevel_awards label.checkbox').removeClass('active'); // 清空 获奖名次
                $('#levelName_awards').val(''); // 清空 奖励等次
                $('#rewardTime_awards').datebox('setValue', ''); // 清空 获奖时间
                $('#awardOrg_awards').val(''); // 清空 授奖组织
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
                        'type': '请选择获奖类型',
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
                            'auditOrgId_awards': {
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
                            'auditOrgId_awards': {
                                required: '请选择审核组织'
                            },
                            'awardOrg_awards': {
                                required: '请输入授奖组织'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validator = $('#fm_awards_edit').validate(validate);
                    var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                    var awardsList_edit_global = ['type', 'content', 'hasLevel', 'levelName', 'rewardTime', 'awardOrg', 'hasAttachFile', 'recorderName'];
                    // 基本信息显示列表(全局变量)
                    for(var i=0; i<awardsList_edit_global.length; i++) {
                        var option = awardsList_edit_global[i];
                        var option_awards = option + '_awards';
                        if(option == 'type') { // 获奖类型
                            if($('#' + option_awards).data('id') == 1) { // 团内
                                params['auditOrgId'] = $('#auditOrgId_awards').data('id'); // 审核组织ID
                            }
                            continue;
                        }
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

                        if($('#' + option_awards) && $('#' + option_awards).length > 0) {
                            params[option] = $('#' + option_awards).val().trim(); // 去除两边空格
                        }
                    }

                    if(!validateFlag) { // 表单填写未完成(combobox)
                        Utils.scrollToAnchor($('#fm_awards_edit')); // 跳到指定锚点
                        return;
                    }

                    var filesArr = [];
                    if($('#dialog_awards_edit .img_box_delete') && $('#dialog_awards_edit .img_box_delete').length > 0) {
                        $('#dialog_awards_edit .img_box_delete').each(function () {
                            var imgUrl =  $(this).find('img').attr('src');
                            filesArr.push(imgUrl);
                        });
                    }
                    if($('#dialog_awards_edit .uploader_custom_control .fileUrlList').text()) {
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
                    params['rewardId'] = $('#dialog_awards_edit #content_awards').data('id'); // 奖励ID

                    console.log('dialog_awards_edit params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_awards_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团组织编辑修改团员的奖励信息
                    LeagueMemberApi.rewardEdit(params).then(function (data) {
                        $('#dialog_awards_edit').dialog('close'); // 关闭 对话框(奖励编辑)
                        $.alert(data.msg).then(function () {
                            // if(params['type'] == 1) { // 团内
                            if($('#type_awards').data('id') == 1) { // 团内
                                params_rewardIn_global.pageIndex = 1; // 重置页码
                                // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                                renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardIn_global, $('#dialog_awards_operation .rewardIn'), true); // 团内奖励
                            }else { // 团外
                                params_rewardOut_global.pageIndex = 1; // 重置页码
                                // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                                renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardOut_global, $('#dialog_awards_operation .rewardOut'), true); // 团外奖励
                            }
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_awards_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
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
                if(name == 'level') { // 获奖名次
                    if( $(this).data('haslevel')) { // 有奖励
                        $('#levelName_awards').parents('tr').show(); // 显示奖励等次
                    }else { // 无奖励
                        $('#levelName_awards').parents('tr').hide(); // 隐藏奖励等次
                    }
                }
            }
        });

        // 点击'审核组织'(团内)
        $('#auditOrgId_awards_td').click(function () {
            // 加载'审核组织' 数据网格
            $('#datagrid_auditOrg').datagrid('load', {
                fullName: ''
            });
        });

        // 点击'删除'(图片)
        $('#dialog_awards_edit').on('click', '.img_box_delete .delete', function () {
            var $img = $(this);
            $.confirm('确定删除该图片').then(function () {
                $img.parents('.img_box_delete').remove(); // 删除该图片
            });
        });

        $('.uploader_custom_control.member_rewards').myUploader(); // 初始化上传插件
    }

    // 选择审核组织(需要初始化的事件)
    function init_auditOrg() {
        // 初始化数据网格
        $('#datagrid_auditOrg').datagrid({
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'fullName', title: '审核组织', sortable: false}
            ]],
            loader: function (param, success, error) {
                if(!param || !('fullName' in param)) {
                    return;
                }

                // 获取审核组织列表
                LeagueMemberApi.getAuditOrgTree({
                    pageIndex: param.page, // 当前页码
                    pageSize: param.rows, // 每页记录数
                    keywords: param.fullName, // 组织名称
                    memberId: mid_global // 团员ID
                }).then(function (data) {
                    data.rows = data.dataList;
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#datagrid_auditOrg').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        console.log('curr', curr);
                        $('#datagrid_auditOrg').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
                        error();
                        return false;
                    }
                    success(data);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                }).always(function () {
                    $('#dialog_auditOrg').dialog('open'); // 弹出对话框
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
                $('#auditOrgId_awards').val(rowData.fullName).data('id', rowData.oid); // 审核组织
                $('#dialog_auditOrg').dialog('close'); // 关闭对话框(所在团支部)
            }
        });

        // 点击搜索(审核组织)
        $('#filter_auditOrg').click(function () {
            var params = {
                fullName: $('#fullName_filter_auditOrg').val() // 组织名称
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#datagrid_auditOrg').datagrid('load', params);
        });
    }

    // 惩罚修改(需要初始化的事件)
    function init_punishment_edit() {

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 惩罚修改 -- 对话框
        $('#dialog_punishment_edit').dialog({
            cache: false,
            onClose: function () {
                $('#content_punishment').val(''); // 清空 奖励名称
                $('#punishTime_punishment').datebox('setValue', ''); // 清空 处罚时间
                $('#relieveTime_punishment').datebox('setValue', ''); // 清空 解除时间
                $('#dialog_punishment_edit .uploader_custom_control .fileUrlList').click(); // 重置上传插件

                $('label.error').remove(); // 移除错误信息
            },
            buttons: [{
                text:'取消',
                handler:function(){
                    $('#dialog_punishment_edit').dialog('close'); // 关闭对话框
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
                            'content_punishment': {
                                required: true
                            }
                        },
                        messages: {
                            'content_punishment': {
                                required: '请输入奖励名称'
                            }
                        },
                        errorPlacement:function(error,element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };
                    var validator = $('#fm_punishment_edit').validate(validate);
                    var validateFlag = validator.form(); // 验证表单，填写信息是否完整

                    // 处罚时间
                    params['punishTime'] = $('#punishTime_punishment').datebox('getValue');
                    if(!params['punishTime']) {
                        var html = '<label id="punishTime_punishment-error" class="error">' + messages.punishTime + '</label>';
                        $('#punishTime_punishment').parents('tr').append(html);
                        validateFlag = false;
                    }

                    // 解除时间
                    params['relieveTime'] = $('#relieveTime_punishment').datebox('getValue');
                    if(!params['relieveTime']) {
                        var html = '<label id="relieveTime_punishment-error" class="error">' + messages.relieveTime + '</label>';
                        $('#relieveTime_punishment').parents('tr').append(html);
                        validateFlag = false;
                    }

                    params['content'] = $('#content_punishment').val().trim(); // 处罚名称(去除两边空格)

                    if(!validateFlag) { // 表单填写未完成(combobox)
                        Utils.scrollToAnchor($('#fm_punishment_edit')); // 跳到指定锚点
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

                    var filesArr = [];
                    if($('#dialog_punishment_edit .img_box_delete') && $('#dialog_punishment_edit .img_box_delete').length > 0) {
                        $('#dialog_punishment_edit .img_box_delete').each(function () {
                            var imgUrl =  $(this).find('img').attr('src');
                            filesArr.push(imgUrl);
                        });
                    }
                    if($('#dialog_punishment_edit .uploader_custom_control .fileUrlList').text()) {
                        filesArr = filesArr.concat($('#dialog_punishment_edit .uploader_custom_control .fileUrlList').text().split(','));
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
                    params['punishId'] = $('#dialog_punishment_edit #content_punishment').data('id'); // 处罚ID

                    console.log('dialog_punishment_edit params', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_punishment_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团组织编辑修改团员的惩罚信息
                    LeagueMemberApi.punishmentEdit(params).then(function (data) {
                        $('#dialog_punishment_edit').dialog('close'); // 关闭 对话框(惩罚编辑)
                        $.alert(data.msg).then(function () {
                            params_punishment_global.pageIndex = 1; // 重置页码
                            // 团组织查看单个团员的惩罚信息列表
                            renderPunishmentList_operation(LeagueMemberApi.punishmentList, params_punishment_global, $('#dialog_awards_operation .punishment'), true); // 刷新惩罚列表(奖惩修改对话框)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_punishment_edit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });

                }
            }]
        });

        // 点击'删除'(图片)
        $('#dialog_punishment_edit').on('click', '.img_box_delete .delete', function () {
            var $img = $(this);
            $.confirm('确定删除该图片').then(function () {
                $img.parents('.img_box_delete').remove(); // 删除该图片
            });
        });

        $('.uploader_custom_control.member_punishment').myUploader(); // 初始化上传插件
    }


    // 申请删除团员(需要初始化的事件)
    function init_apply_delete() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)

        // 申请删除团员 -- 对话框
        $('#dialog_apply_delete').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#deletedReason').combobox('setValue', ''); // 初始化删除理由类型
                $('#deletedRemarks').val(''); // 清空删除原因文本框
            },
            buttons: [{
                text: '暂时不删了',
                // iconCls:'icon-cancel',
                handler: function () {
                    $('#dialog_apply_delete').dialog('close'); // 关闭对话框
                }
            }, {
                text: '确定申请删除',
                // iconCls:'icon-ok',
                handler: function () {

                    // 验证
                    var validate = {
                        rules: {
                            'deletedRemarks': {
                                required: true,
                                checkChineseLen: true
                            }
                        },
                        messages: {
                            'deletedRemarks': {
                                required: '请输入文字说明'
                            }
                        },
                        errorPlacement: function (error, element) { // 自定义错误放到哪里
                            error.appendTo(element.parents("tr"));
                        }
                    };

                    var validateFlag = $('#fm_apply_delete').validate(validate).form(); // 验证表单，填写信息是否完整


                    var deletedReason = $('#deletedReason').combobox('getValue'); // 删除理由
                    if(!deletedReason) {
                        var html = '<label id="deletedReason-error" class="error">请选择删除理由</label>';
                        $('#deletedReason').parents('tr').append(html);
                        validateFlag = false;
                    }

                    if (!validateFlag) { // 表单填写未完成
                        Utils.scrollToAnchor($('#fm_apply_delete')); // 跳到指定锚点
                        return;
                    }

                    var params = {
                        mid: mid_global, // 团员ID(全局变量)
                        deletedReason: deletedReason, // 删除理由
                        deletedRemarks: $('#deletedRemarks').val().trim() // 删除描述
                    };

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_apply_delete .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团员删除
                    LeagueMemberApi.applyForDeletion(params).then(function (data) {
                        $('#dialog_apply_delete').dialog('close'); // 关闭对话框(申请删除团员)
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_apply_delete .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
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

    // 批准删除团员(需要初始化的事件)
    function init_permission_delete() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)

        // 批准删除团员 -- 对话框
        $('#dialog_permission_delete').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
            },
            buttons: [{
                text: '不同意删除',
                // iconCls:'icon-cancel',
                handler: function () {

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_permission_delete .dialog-button .l-btn:first-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团员确认删除(state：状态(1：同意：2：退回))
                    LeagueMemberApi.confirmDeletion({mid: mid_global, state: 2}).then(function (data) { // 退回
                        $('#dialog_permission_delete').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_permission_delete .dialog-button .l-btn:first-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }, {
                text: '同意删除',
                // iconCls:'icon-ok',
                handler: function () {

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_permission_delete .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 团员确认删除(state：状态(1：同意：2：退回))
                    LeagueMemberApi.confirmDeletion({mid: mid_global, state: 1}).then(function (data) { // 同意
                        $('#dialog_permission_delete').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#league_menber')); // 更新表格数据(团员管理)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_permission_delete .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
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

    // 点击'查看'(奖惩附件)
    $('.list').on('click', '.c_blue', function () {
        var id = $(this).parents('.item_list').data('id'); // 奖励ID
        var module = 1; // 团员奖励 -- 附件所属模块(1-团员奖励，2-团员惩罚，3-公告附件，4-南粤青年人才奖励附件)
        if($(this).parents('.list').hasClass('punishment')) { // 惩罚
            module = 2; // 团员惩罚 -- 附件所属模块(1-团员奖励，2-团员惩罚，3-公告附件，4-南粤青年人才奖励附件)
        }
        console.log('id', id);

        var params = {
            objectId: id, // 附件所属对象ID（奖励ID/惩罚ID等）
            module: module // 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚，3-公告附件，4-南粤青年人才奖励附件)
        };
        // 奖惩证明附件列表查看
        LeagueMemberApi.attachFileList(params).then(function (data) {
            var imgUrlArr = data.rows;
            var html_img = '';
            for(var i=0; i<imgUrlArr.length; i++) {
                var imgUrl = imgUrlArr[i].filePath;
                html_img += '<div class="img_box"><img src="' + imgUrl + '"></div>';
            }
            $('#dialog_picture .list_box .list').html(html_img);
            $('#dialog_picture').dialog('open'); // 显示弹出框(查看图片)
        });
    });

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_view(); // 查看团员(需要初始化的事件)
        init_retreat_apply(); // 离脱退团/开除团籍(需要初始化的事件)
        init_retreat_audit(); // 离脱退团/开除团籍审核(需要初始化的事件)
        init_edit(); // 编辑(需要初始化的事件)
        init_audit(); // 资料审核(需要初始化的事件)
        init_awards(); // 奖励审核(需要初始化的事件)
        init_awards_operation(); // 奖惩修改(需要初始化的事件)
        init_awards_edit(); // 奖励修改(需要初始化的事件)
        init_auditOrg(); // 选择审核组织(需要初始化的事件)
        init_punishment_edit(); // 惩罚修改(需要初始化的事件)
        init_apply_delete(); // 申请删除团员(需要初始化的事件)
        init_permission_delete(); // 批准删除团员(需要初始化的事件)
    }

    init(); // 初始化函数
});