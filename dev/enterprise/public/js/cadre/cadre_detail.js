/**
 * Created by licong on 2017/11/28.
 */
$(function () {
    var tid = Utils.getQueryString('tid'); // 团干id
    if(!tid) {
        $.alert('参数不能为空');
        return;
    }

    console.log('tid', tid);
    var baseList_global = ['createName', 'name', 'idCard', 'missionBranch', 'nation', 'politicalOutlook', 'degreeOfEducation', 'leagueForYears',  'isCadres', 'mobile']; // 基本信息(全局变量)
    // 附加信息 列表(全局变量)
    var additionList_global = ['incumbent', 'tuanganProperties', 'duty', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'dateOfDuty', 'isPartyCommitteeMember', 'thePartyYears', 'signUpForVolunteerTime']; // 附加信息(全局变量)
    var operatorList = ['operatorName', 'positionTheLabel']; // 运营者信息

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

    // 政治面貌名称
    var politicalOutlookName ={
        "1": "团员",
        "2": "党员",
        '3': '中共预备党员',
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

    // 职务名称
    var dutyName = {
        '1': '书记',
        '2': '副书记',
        '3': '常委',
        '4': '委员',
        '5': '候补委员',
        '6': '工作人员'
    };

    // 根据团干ID获取团干当前登录账号附加信息
    CadreApi.getTuanganInfoById({tid: tid}).then(function (data) {
        console.log('CadreApi.getTuanganInfoById data', data);
        var myData = data.rows;
        var Own = data.Own; // 附加信息(本组织)
        var other = data.other; // 附加信息(其它组织)
        if(myData) {
            var html = '';
            // 基本信息/账号信息
            for(var i=0; i<baseList_global.length; i++) {
                var option = baseList_global[i];

                if(!myData[option]) { // null 直接返回
                    continue;
                }

                var text = ''; // 值

                if(option == 'nation') { // 民族
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
                }else if (option == 'missionBranch') { // 所在团支部
                    text = myData['missionBranchName'];
                }else {
                    text = myData[option];
                }

                html += '<li class="info_item_compact">';
                if(option == 'createName') { // 基本团干所属组织信息录入者
                    html += '    <span class="info_item_title longer">' + paramsName[option] + '</span>';
                }else {
                    html += '    <span class="info_item_title">' + paramsName[option] + '</span>';
                }

                if(option == 'idCard' || option == 'missionBranch') {
                    html += '    <span class="right_txt longer">' + text + '</span>';
                }else if (option == 'createName') { // 基本团干所属组织信息录入者
                    html += '    <span class="right_txt shorter">' + text + '</span>';
                }else {
                    html += '    <span class="right_txt">' + text + '</span>';
                }
                html += '</li>';
            }
            $('.base .info_list').html(html);

            var html_operator = '';
            // 运营者信息
            if(myData['operatorId']) { // 运营者(显示运营者信息)
                html_operator += '<li class="info_item_compact">';
                html_operator += '    <span class="info_item_title">是否运营者</span><span class="right_txt">是</span>';
                html_operator += '</li>';
                if(myData.operatorName) {
                    html_operator += '<li class="info_item_compact">';
                    html_operator += '    <span class="info_item_title">运营的组织</span><span class="right_txt longer">' + myData.operatorName + '</span>';
                    html_operator += '</li>';
                }
                if(myData.positionTheLabel) {
                    html_operator += '<li class="info_item_compact">';
                    html_operator += '    <span class="info_item_title">运营的职位标签 </span><span class="right_txt longer">' + myData.positionTheLabel + '</span>';
                    html_operator += '</li>';
                }
            }

            if(!html_operator){ // 运营者信息为空
                html_operator += '<li class="info_item_compact"><span class="info_item_title">暂无信息</span></li>'
            }
            $('#operator .info_list').html(html_operator); // 运营者信息
            
        }

        var html_addition = '';
        var html_other = '';
        // 附加信息(本组织)
        if(Own && Own.length > 0) {
            var OwnData = Own[0];
            // var $own = $('#own');
            for(var i=0; i<additionList_global.length; i++) {
                var option = additionList_global[i];

                if(!OwnData[option] && option != 'duty') { // null 直接返回
                    continue;
                }

                var text = ''; // 值
                var longer = 'longer';
                if(option == 'tuanganProperties') { // 团干部性质
                    text = tuanganPropertiesName[OwnData[option]];
                }else if(option == 'duty') { // 团干自行录入的职务
                    // text = dutyName[OwnData['dutyCode']] + ' ' + OwnData['dutyDesc'];
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
                    longer = '';
                }else {
                    text = OwnData[option];
                }

                html_addition += '<li class="info_item_compact">';
                html_addition += '    <span class="info_item_title">' + paramsName[option] + '</span>';
                html_addition += '    <span class="right_txt ' + longer + '">' + text + '</span>';
                html_addition += '</li>';
            }

            // 在其他组织的职务信息
            html_other += '<ul class="info_list mt_30">';
            html_other += '    <li class="info_item_compact">'; // 基本团干所属组织信息录入者
            html_other += '        <span class="info_item_title">团干所属组织1</span>';
            html_other += '        <span class="right_txt longer">' + OwnData.createName + '</span>';
            html_other += '    </li>';
            html_other += '    <li class="info_item_compact">'; // 团内现任职务
            html_other += '        <span class="info_item_title">团内现任职务</span>';
            html_other += '        <span class="right_txt">' + OwnData.incumbent + '</span>';
            html_other += '    </li>';
            html_other += '    <li class="info_item_compact">'; // 团干部性质
            html_other += '        <span class="info_item_title">团干部性质</span>';
            html_other += '        <span class="right_txt">' + tuanganPropertiesName[OwnData.tuanganProperties] + '</span>';
            html_other += '    </li>';
            html_other += '</ul>';
        }

        if(!html_addition) { // 附加信息为空
            html_addition = '<li class="info_item_compact"><span class="info_item_title">暂无信息</span></li>';
        }
        $('#own .info_list').html(html_addition); // 附加信息

        // 在其他组织的职务信息
        if(other && other.length > 0) {
            // var html_other = '';
            var increment = 0;
            if(html_other) {
                increment = 1;
            }
            for(var i=0; i<other.length; i++) {
                var otherData = other[i];
                html_other += '<ul class="info_list mt_30">';
                html_other += '    <li class="info_item_compact">'; // 基本团干所属组织信息录入者
                html_other += '        <span class="info_item_title">团干所属组织' + (i+1+increment)  + '</span>';
                html_other += '        <span class="right_txt longer">' + otherData.createName + '</span>';
                html_other += '    </li>';
                html_other += '    <li class="info_item_compact">'; // 团内现任职务
                html_other += '        <span class="info_item_title">团内现任职务</span>';
                html_other += '        <span class="right_txt">' + otherData.incumbent + '</span>';
                html_other += '    </li>';
                html_other += '    <li class="info_item_compact">'; // 团干部性质
                html_other += '        <span class="info_item_title">团干部性质</span>';
                html_other += '        <span class="right_txt">' + tuanganPropertiesName[otherData['tuanganProperties']] + '</span>';
                html_other += '    </li>';
                html_other += '</ul>';
            }
        }

        if(!html_other) { // 职务信息为空
            html_other = '<li class="info_item_compact"><span class="info_item_title">暂无信息</span></li>';
        }
        $('#other').append(html_other);
    })
});