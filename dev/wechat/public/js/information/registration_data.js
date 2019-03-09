/**
 * Created by licong on 2017/11/17.
 */
$(function () {
    var myData_global = undefined; // 我的资料(全局变量)
    var optionList_global = ['auditStatus', 'name', 'idCardType', 'idCard', 'csnyr', 'rtny', 'fullName', 'income', 'isCadres', 'nation', 'nationInfo', 'politicalOutlook', 'degreeOfEducation', 'highestEducation', 'residence', 'mobile'
        , 'leagueForUnit', 'occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'rdny', 'zczyzsj', 'incumbent', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember']; // 参数列表(全局变量)

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

    // 在本支部担任团干职务名称
    var incumbentName = {
        '1': '书记',
        '2': '副书记',
        '3': '常委',
        '4': '委员',
        '5': '候补委员',
        '6': '工作人员'
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

    // 证件类型名称
    var idCardTypeName = {
        '1': '普通居民身份证',
        '2': '境外身份证'
    };

    // 我的认证资料
    InformationApi.MyProfile({}).then(function (data) {
        var myData = data.rows;
        if(myData) {
            $('#isRealName').text(isRealName[myData['isRealName']]); // 实名认证状态
            if(myData['isRealName'] != 10) {
                $('#isRealName').css('color', '#c10021'); // 文字变红
            }
            myData_global = myData; // 我的资料(全局变量)
            for(var i=0; i<optionList_global.length; i++) {
                var option = optionList_global[i];

                if(myData[option] == null) { // 防止资料出现null --> ''
                    myData[option] = '';
                }

                if(option == 'name') {
                    $('.' + option).text(myData[option]); // 姓名
                    continue;
                }
                if(option == 'idCardType') {
                    if(myData[option]) {
                        $('#' + option).text(idCardTypeName[myData[option]]); // 证件类型
                    }else { // 无返回值
                        $('#' + option).text(idCardTypeName[1]); // 证件类型(默认 普通居民身份证)
                    }
                    continue;
                }
                if(option == 'csnyr') {
                    $('#' + option).text(myData['birthdayStr']); // 出生日期
                    continue;
                }
                if(option == 'rtny') {
                    $('#' + option).text(myData['leagueForYears']); // 入团年月
                    continue;
                }
                if(option == 'auditStatus') {
                    $('#' + option).text(auditStatusName[myData[option]]); // 审核状态
                    if(myData[option] == 2) { // 报到被退回
                        $('.bot_big_btn').show(); // 显示'修改资料' 底部按钮
                        // $('.member_personal_info .right_txt .status').css({top: 0, transform: 'translateY(0px)'});
                        // $('#auditStatus').parent().css({top: 0, transform: 'translateY(0px)'});
                        $('#returnReason').text(myData['returnReason']).parent().show(); // 退回原因
                        $.alert('您的认证资料已被团支部退回，您可修改后重新提交。');
                    }else if(myData[option] == 1) { // 报道待审核
                        // $.alert('您的认证资料已提交，请您耐心等待所在团支部的审核。审核通过后，即可进入智慧团建系统');
                        $.alert('认证资料已提交，请您联系团支书尽快审核您的报到申请。审核通过后，即可进入智慧团建系统');
                        $('#withdraw').show(); // 撤回报到
                        $('#withdraw').click(function () {
                            $('.dialog_widget_input').show(); // 显示'撤回弹出框'

                            // $.input('您确定要撤回团员报到申请吗？').then(function () {
                            // $.input('如身份信息、所在团支部及入团时间填写错误，您可撤回本次团员报到申请，确定撤回么？').then(function () {
                            //     var text = $('.dialog_confirm .input_box input').val();
                            //     console.log('text', text);
                            //     if(text != '撤回报到') {
                            //         $('.dialog_confirm .warning_box').show(); // 隐藏错误提示语
                            //         return;
                            //     }
                            //     $('.dialog_confirm .warning_box').hide(); // 隐藏错误提示语
                            //     console.log('after text', text);
                            //     // // 团员报道被撤回
                            //     // InformationApi.withdraw({}).then(function (data) {
                            //     //     $.alert(data.msg).then(function () {
                            //     //        window.location.reload(); // 刷新当前页面
                            //     //     });
                            //     // });
                            // }, function () {
                            //     $('.dialog_confirm .input_box input').val(''); // 清空输入框
                            //     $('.dialog_confirm .warning_box').hide(); // 隐藏错误提示语
                            //     console.log('取消');
                            // });
                        });
                    }else if(myData[option] == 0) { // 报道被撤回
                        $('.bot_big_btn').show(); // 显示'修改资料' 底部按钮
                        $('#returnReason').text('团员自行撤回申请').parent().show(); // 退回原因
                    }
                    continue;
                }
                if(option == 'income') { // 收入
                    $('#' + option).text(myData[option + 'Str']); // 设置收入名称
                    continue;
                }
                if(option == 'isCadres') { // 是否在本支部担任团干职务
                    $('#' + option).text(yesOrNoName[myData[option]]); // 设置是否团干部名称
                    // (1: 是，2：否)
                    if(myData[option] == 1) {
                        $('.isCadres').show();
                    }else {
                        $('.isCadres').hide();
                    }
                    continue;
                }
                if(option == 'incumbent') { // 本支部团干职务
                    $('#' + option).text(incumbentName[myData[option]]); // 设置本支部团干职务名称
                    continue;
                }
                if(option == 'tuanganProperties') { // 团干部性质
                    $('#' + option).text(tuanganPropertiesName[myData[option]]); // 设置团干部性质名称
                    continue;
                }
                if(option == 'isPartyCommitteeMember') { // 是否同级党支部（党组织）成员
                    $('#' + option).text(yesOrNoName[myData[option]]); // 设置是否同级党委(支部)成员名称
                    continue;
                }
                if(option == 'dateOfDuty') {
                    $('#' + option).text(myData['dateOfDuty']); // 任现职年月
                    continue;
                }
                if(option == 'isPartyCommitteeMember') { // 是否同级党支部（党组织）成员
                    $('#' + option).text(yesOrNoName[myData[option]]); // 设置是否同级党支部（党组织）成员
                    continue;
                }
                if(option == 'nation') { // 民族
                    var text = nationName[myData[option]];
                    if(myData[option] == 57) { // 其他(民族)
                        text = nationName[myData[option]] + ' ' + myData['nationInfo']; // 民族 + 民族名称
                    }
                    $('#' + option).text(text); // 设置民族名称
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
                    $('#' + option).text(myData['provinceName'] + myData['cityName'] + myData['countyName']); // 设置户籍所在地名称
                    continue;
                }
                if(option == 'occupation') { // 职业
                    $('#' + option).text(occupationName[myData[option]]); // 设置职业名称
                    continue;
                }
                if(option == 'rdny') {
                    var text = myData['thePartyYears'] ? myData['thePartyYears'] : '';
                    $('#' + option).text(text); // 入党年月
                    continue;
                }
                if(option == 'zczyzsj') {
                    var text = myData['signUpForVolunteerTime'] ? myData['signUpForVolunteerTime'] : '';
                        $('#' + option).text(text); // 注册志愿者时间
                    continue;
                }
                $('#' + option).text(myData[option]);
            }
        }
    });

    // 点击'取消' -- 撤回弹出框
    $('.dialog_widget_input').on('click', '.button_box .cancel', function () {
        $('.dialog_confirm .input_box input').val(''); // 清空输入框
        $('.dialog_confirm .warning_box').hide(); // 隐藏错误提示语
        $('.dialog_widget_input').hide(); // 隐藏'撤回弹出框'
        console.log('取消');
    });
    
    // 点击'确定' -- 撤回弹出框
    $('.dialog_widget_input').on('click', '.button_box .confirm', function () {
        var text = $('.dialog_confirm .input_box input').val();
        console.log('text', text);
        if(text != '撤回报到') {
            $('.dialog_confirm .warning_box').show(); // 隐藏错误提示语
            return;
        }
        $('.dialog_confirm .input_box input').val(''); // 清空输入框
        $('.dialog_confirm .warning_box').hide(); // 隐藏错误提示语
        $('.dialog_widget_input').hide(); // 隐藏'撤回弹出框'
        console.log('after text', text);
        // 团员报道被撤回
        InformationApi.withdraw({}).then(function (data) {
            $.alert(data.msg).then(function () {
               window.location.reload(); // 刷新当前页面
            });
        });
    });

    // 点击'修改资料' 底部按钮
    $('.bot_big_btn').click(function () {
        var zhtj = {
            isEdit: true // 当前是修改资料标识
        };

        zhtj['mid'] = myData_global['mid']; // 团员id
        for (var i = 0; i < optionList_global.length; i++) {
            var option = optionList_global[i];

            if(option == 'idCard') { // 身份证
                zhtj['idCard'] = undefined;
                continue;
            }
            if(option == 'csnyr') { // 出生日期
                zhtj[option] = myData_global['birthdayStr'];
                continue;
            }
            if(option == 'rtny') { // 入团年月
                zhtj[option] = myData_global['leagueForYears'];
                continue;
            }
            if(option == 'fullName') { // 所在团组织名称
                zhtj['oidName'] = myData_global[option];
                zhtj['oid'] = myData_global['oid'];
                continue;
            }
            if(option == 'income') { // 收入
                zhtj[option + 'Str'] = myData_global[option + 'Str'];
                zhtj[option] = myData_global[option];
                continue;
            }
            if(option == 'dateOfDuty') { // 任现职年月
                // zhtj[option] = myData_global['dateOfDuty'];
                zhtj['xzzny'] = myData_global['dateOfDuty'];
                continue;
            }
            if(option == 'residence') { // 户籍所在地
                zhtj['provinceDid'] = myData_global['provinceDid']; // 省份ID
                zhtj['cityDid'] = myData_global['cityDid']; // 市级ID
                zhtj['countyDid'] = myData_global['countyDid']; // 县级/区级ID
                zhtj['residence'] = myData_global['provinceName'] + myData_global['cityName'] + myData_global['countyName']; // 设置户籍所在地名称
                // zhtj['residence'] = myData_global['provinceName'] + myData_global['cityName'] + myData_global['countyName']; // 设置户籍所在地名称
                continue;
            }
            if(option == 'rdny') { // 入党年月
                zhtj[option] = myData_global['thePartyYears'];
                continue;
            }
            if(option == 'zczyzsj') { // 注册志愿者时间
                zhtj[option] = myData_global['signUpForVolunteerTime'];
                continue;
            }
            zhtj[option] = myData_global[option];
        }

        if($.cookie) {
            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
            window.location.href = 'registration_data_1.html'; // 跳转
        }

        // // 我的认证资料
        // InformationApi.MyProfile({}).then(function (data) {
        //     var myData = data.rows;
        //     if(myData) {
        //         zhtj['mid'] = myData['mid']; // 团员id
        //         for (var i = 0; i < optionList_global.length; i++) {
        //             var option = optionList_global[i];
        //
        //             if(option == 'idCard') { // 身份证
        //                 zhtj['idCard'] = undefined;
        //                 continue;
        //             }
        //             // if(option == 'rtny') { // 入团年月
        //             //     zhtj['rtny'] = myData[option];
        //             //     continue;
        //             // }
        //             if(option == 'fullName') { // 所在团组织名称
        //                 zhtj['oidName'] = myData[option];
        //                 zhtj['oid'] = myData['oid'];
        //                 continue;
        //             }
        //             // if(option == 'dateOfDuty') { // 任现职年月
        //             //     zhtj['dateOfDuty'] = myData[option];
        //             //     continue;
        //             // }
        //             if(option == 'residence') { // 户籍所在地
        //                 zhtj['provinceDid'] = myData['provinceDid']; // 省份ID
        //                 zhtj['cityDid'] = myData['cityDid']; // 市级ID
        //                 zhtj['residence'] = myData['provinceName'] + myData['cityName']; // 设置户籍所在地名称
        //                 continue;
        //             }
        //             // if(option == 'rdny') { // 入党年月
        //             //     zhtj['rdny'] = myData[option];
        //             //     continue;
        //             // }
        //             // if(option == 'zczyzsj') { // 注册志愿者时间
        //             //     zhtj['zczyzsj'] = myData[option];
        //             //     continue;
        //             // }
        //             zhtj[option] = myData[option];
        //         }
        //     }
        //
        //     if($.cookie) {
        //         $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
        //         window.location.href = 'registration_data_1.html'; // 跳转
        //     }
        // });
    });
});