/**
 * Created by licong on 2017/11/28.
 */
$(function () {
    var mid = Utils.getQueryString('mid'); // 组织id
    if(!mid) {
        $.alert('参数不能为空');
        return;
    }

    console.log('mid', mid);
    var optionList_global = ['auditStatus', 'name', 'idCardType', 'idCard', 'leagueForYears', 'fullName', 'income', 'isCadres', 'nation', 'politicalOutlook', 'degreeOfEducation', 'highestEducation', 'residence', 'mobile'
        , 'leagueForUnit', 'occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'thePartyYears', 'signUpForVolunteerTime', 'incumbent', 'incumbentDesc', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember']; // 参数列表(全局变量)

    // 是否
    var yesOrNoName = {
        '1': '是',
        '2': '否'
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


    // 本支部团干职务名称
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

    // 证件类型名称
    var idCardTypeName = {
        '1': '普通居民身份证',
        '2': '境外身份证'
    };

    /**
     * 团员禁用提示语
     * @param idCard {string} 身份证号码
     * @returns {string}
     */
    function tipsDisabled(idCard) {
        return '团员<身份证号：' + idCard + '>已被组织设置为离团状态，不能再对其进行该项操作。您可以查看团员资料，或者对团员进行“恢复团籍”后操作。';
    }


    // 根据ID获取团员
    MemberApi.getMembersById({mid: mid}).then(function (data) {
        console.log('MemberApi.getMembersById data', data);
        var myData = data.rows;
        if(!myData) { // 数据为空
            return;
        }

        $('#confirm').data('mid', myData.mid).data('name', myData.name).data('disabled', myData.disabled); // 绑定团员ID和名称

        // 基本信息/账号信息
        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            if(!myData[option] && option != 'residence') { // null 直接返回 且 户籍所在地
                continue;
            }

            if(option == 'auditStatus') { // 审核状态
                $('#auditStatus').text(auditStatusName[myData['auditStatus']]);
                continue;
            }

            if(option == 'idCardType') { // 证件类型
                if(myData[option]) {
                    $('#' + option).text(idCardTypeName[myData[option]]); // 证件类型
                }else { // 无返回值
                    $('#' + option).text(idCardTypeName[1]); // 证件类型(默认 普通居民身份证)
                }
                continue;
            }
            
            if(option == 'isCadres') { // 是否团干部
                $('#' + option).text(yesOrNoName[myData[option]]);
                // 修改资料待审核且修改值为是 或者 非修改资料待审核且值为是
                if((myData['auditStatus'] == 4 && myData['newIsCadres'] == 1) || (myData['auditStatus'] != 4 && myData[option] == 1)) {
                    $('.isCadres').show();
                }else {
                    $('.isCadres').hide();
                }
                continue;
            }
            if(option == 'incumbent') { // 现任职务
                $('#' + option).text(incumbentName[myData[option]]); // 设置现任职务名称
                if(myData[option] != 9) { // 非其他(现任职务)
                    $('#incumbentDesc').parents('.info_item').hide(); // 隐藏
                }
                continue;
            }
            if(option == 'incumbentDesc') { // 职务名称
                $('#' + option).text(myData[option]); // 设置职务名称
                continue;
            }
            if(option == 'tuanganProperties') { // 团干部性质
                $('#' + option).text(tuanganPropertiesName[myData[option]]); // 设置团干部性质名称
                continue;
            }
            if(option == 'isPartyCommitteeMember') { // 是否同级党委(支部)成员
                $('#' + option).text(yesOrNoName[myData[option]]); // 设置是否同级党委(支部)成员名称
                continue;
            }
            if(option == 'income') { // 收入
                $('#' + option).text(myData[option + 'Str']); // 设置收入名称
                continue;
            }
            if(option == 'nation') { // 民族
                var text = nationName[myData[option]];
                if(myData[option] == 57) { // 其他(民族)
                    text = nationName[myData[option]] + ' ' + myData['nationInfo']; // 民族 + 民族名称
                }
                $('#' + option).text(text); // 设置民族名称
                // $('#' + option).text(nationName[myData[option]]); // 设置民族名称
                continue;
            }
            if(option == 'politicalOutlook') { // 政治面貌
                $('#' + option).text(politicalOutlookName[myData[option]]); // 设置政治面貌名称
                continue;
            }
            if(option == 'degreeOfEducation') { // 全日制学历
                $('#' + option).text(degreeOfEducationName[myData[option]]); // 设置全日制学历名称
                continue;
            }
            if(option == 'highestEducation') { // 最高学历
                $('#' + option).text(degreeOfEducationName[myData[option]]); // 设置最高学历名称
                continue;
            }
            if(option == 'residence') { // 户籍所在地
                $('#' + option).text(Utils.returnValidString(myData['provinceName']) + Utils.returnValidString(myData['cityName']) + Utils.returnValidString(myData['countyName'])); // 设置户籍所在地名称
                continue;
            }
            if(option == 'occupation') { // 职业
                $('#' + option).text(occupationName[myData[option]]); // 设置职业名称
                continue;
            }

            $('#' + option).text(myData[option]);
        }
    });

    // 点击'转出该团员'
    $('#confirm').click(function () {

        var mid = $(this).data('mid'); // 团员ID
        var midName = $(this).data('name'); // 团员名称
        var disabled = $(this).data('disabled'); // 是否禁用 -- 0:正常,1:禁用
        // 团员禁用 不能再进行任何涉及数据修改的操作
        if(disabled == 1) { // 禁用
            $.alert(tipsDisabled($('#idCard').text()));
            return;
        }

        // 组织转接发起转接验证
        RelationApi.checkMembers({type: 1, mid: mid}).then(function (data) { // 组织 -- 类型(1：组织，2：团员)
            console.log('RelationApi.applyAdd data', data);
            if (data.status == 'ALERT') {
                $.alert(data.msg);
                return;
            }

            // 存储到cookie(团员填写信息)
            if($.cookie) {
                var zhtj = {};
                if($.cookie('zhtj')) { // cookie已存在
                    zhtj = JSON.parse($.cookie('zhtj'));
                }

                zhtj['mid'] = mid;
                zhtj['midName'] = midName;

                $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
                window.location.href = 'draftsmanship.html'; // 跳转 组织关系转接 页面
            }
        });

    });

});