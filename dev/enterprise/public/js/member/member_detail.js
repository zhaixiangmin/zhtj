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
        ,'leagueForUnit',  'occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'thePartyYears', 'signUpForVolunteerTime', 'incumbent', 'incumbentDesc', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember']; // 参数列表(全局变量)

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

    var auditStatus_global = undefined; // 审核状态(全局变量)

    // 显示待审核
    function showSub(myData) {
        var subList = ['income', 'isCadres', 'incumbent', 'incumbentDesc', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember'];
        for(var i=0; i<subList.length; i++) {
            var option = subList[i];
            var newName = 'new' + option.replace(/^\S/, function(s){return s.toUpperCase();}); // income -> 'newIncome';
            if(myData[option] != myData[newName]) { // 修改
                var title = $('#' + option).siblings('.info_item_title').text(); // 字段名称文本
                var oldValue = myData[option];
                var newValue = myData[newName];
                if(option == 'income') { // 收入
                    oldValue = myData[option + 'Str'];
                    newValue = myData[newName + 'Str'];
                }else if(option == 'isCadres') { // 是否团干部
                    oldValue = yesOrNoName[oldValue];
                    newValue = yesOrNoName[newValue];
                }else if(option == 'incumbent') { // 现任职务
                    oldValue = incumbentName[oldValue];
                    newValue = incumbentName[newValue];
                }else if(option == 'incumbentDesc') { // 职务名称
                    if(myData['newIncumbent'] != 9) { // 修改值为 非其他(本支部团干职务)
                        continue;
                    }
                    oldValue = oldValue;
                    newValue = newValue;
                    // oldValue = incumbentName[oldValue];
                    // newValue = incumbentName[newValue];
                }else if(option == 'tuanganProperties') { // 团干部性质
                    oldValue = tuanganPropertiesName[oldValue];
                    newValue = tuanganPropertiesName[newValue];
                }else if(option == 'isPartyCommitteeMember') { // 是否同级党委(支部)成员
                    oldValue = yesOrNoName[oldValue];
                    newValue = yesOrNoName[newValue];
                }
                var text = title + '由' + oldValue + '改为' + newValue;
                $('#' + option + '_sub').find('.info_item_title').text(text);
                $('#' + option + '_sub').find('.info_item_con').text('待审核');
                $('#' + option + '_sub').show();
            }
        }
    }

    // 根据ID获取团员
    MemberApi.getMembersById({mid: mid}).then(function (data) {
        console.log('MemberApi.getMembersById data', data);
        var myData = data.rows;
        if(!myData) { // 数据为空
            return;
        }

        // 基本信息/账号信息
        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            if(!myData[option] && option != 'residence') { // null 直接返回 且 户籍所在地
                continue;
            }


            if(option == 'auditStatus') { // 审核状态
                $('#auditStatus').text(auditStatusName[myData['auditStatus']]); // 资料状态
                // 审核状态(可不传，1:报到待审核，2:报到被退回，3:审核通过，4:修改资料待审核，5:修改资料被退回)
                if(myData['auditStatus'] == 4) { // 修改资料待审核
                    showSub(myData);
                }

                // 当前登录信息
                Enterprise.getSessionAccount({}).then(function (data) {
                    if(data.status == 'ALERT') { // 用户未登录
                        $.alert(data.msg);
                        return;
                    }

                    var account = data.account;
                    // orgType -- 1：组织，2：运营者，3：超管，4：团干
                    if(account.orgType != 4 && account.type == 5) { // 非团干(如果是团干，隐藏'审核'按钮)
                        auditStatus_global = myData['auditStatus']; // 审核状态(全局变量)
                        // 审核状态(可不传，1:报到待审核，2:报到被退回，3:审核通过，4:修改资料待审核，5:修改资料被退回)
                        if(auditStatus_global == 1) { // 报到待审核
                            $('#confirm').show(); // 显示 '审核' 按钮
                        }else if(auditStatus_global == 4) { // 修改资料待审核
                            $('#confirm').show(); // 显示 '审核' 按钮
                        }
                    }
                });

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

    // 点击 '审核' 按钮
    $('#confirm').click(function () {
        var type = $('.tab_box .tab_item.cur').data('id'); // 1：TA的报到资料 2：TA的奖惩信息
        if(type == 1) { // TA的报到资料
            window.location.href = 'data_audit_detail.html?mid=' + mid; // 资料审核 页面
        }else { // TA的奖惩信息

        }
    });

    // 切换标签页 -- 'TA的报到资料/TA的奖惩信息'
    $('.tab_box .tab_item').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.big_block').eq($(this).index()).show().siblings('.big_block').hide();
    });

    // // 点击 切换 选项卡
    // $('.tab_box .tab_item').click(function(event) {
    //     $(this).addClass('cur').siblings().removeClass('cur');
    //     $('.big_block').eq($(this).index()).show().siblings('.big_block').hide();
    // });



    /**
     * 渲染奖励列表
     * @param $selector {jquery对象} 选择器
     * @param list {array} 数据列表
     * @param type {int} 类型(1-团内奖励，2-团外奖励)
     */
    function renderAwardsList($selector, list, type) {
        var html = '';
        html += '<div class="table_list_block">';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
            html += '   <ul class="table_list" data-id="' + item.id + '" data-type="' + item.type + '">';
            // html += '       <li class="table_box">';
            // html += '           <span class="left">奖励类型</span><span class="right">团外奖励</span>';
            // html += '       </li>';
            html += '       <li class="table_box content" data-hasLevel="' + item.hasLevel + '">';
            html += '           <span class="left">奖励名称</span><span class="right">' + item.content + '</span>';
            html += '       </li>';
            html += '       <li class="table_box levelName">';
            html += '           <span class="left">获奖名次</span><span class="right">' + levelName + '</span>';
            html += '       </li>';
            html += '       <li class="table_box">';
            if(item.hasAttachFile) { // 有附件
                html += '           <span class="left">证明附件</span><span class="right attachment c_blue">查看</span>';
            }else { // 无附件
                html += '           <span class="left">证明附件</span><span class="right">无</span>';
            }
            html += '       </li>';
            html += '       <li class="table_box">';
            html += '           <span class="left">获奖时间</span><span class="right">' + item.rewardTime + '</span>';
            html += '       </li>';
            if(item.type == 1) { // 团内奖励
                html += '       <li class="table_box">';
                html += '           <span class="left">录入者</span><span class="right">' + item.recorderName + '</span>';
                html += '       </li>';
            }
            html += '       <li class="table_box">';
            html += '           <span class="left">授奖组织</span><span class="right">' + item.awardOrg + '</span>';
            html += '       </li>';
            html += '       <li class="table_box">';
            html += '           <span class="left">审核组织</span><span class="right">' + item.auditOrgName + '</span>';
            html += '       </li>';
            html += '       <li class="table_box">';
            html += '           <span class="left">奖励状态</span><span class="right c_red">' + item.statusStr + '</span>';
            html += '       </li>';
            // if(item.status == 2) { // 被退回 -- 奖励状态(0-待审核，1-审核通过，2-被退回，3-暂无奖励(已删除))
            //     html += '       <li class="table_box">';
            //     html += '           <span class="left">退回原因</span><span class="right">' + item.returnReason + '</span>';
            //     html += '       </li>';
            //     html += '       <li class="button_box">';
            //     html += '           <div class="button_block clearfix">';
            //     html += '               <span class="left button">修改</span><span class="right button">删除</span>';
            //     html += '           </div>';
            //     html += '       </li>';
            // }
            html += '   </ul>';
        }
        html += '</div>';
        $selector.html(html);
    }
    
    /**
     * 渲染惩罚列表
     * @param $selector {jquery对象} 选择器
     * @param list {array} 数据列表
     */
    function renderPunishmentList($selector, list) {
        var html = '';
        html += '<div class="table_list_block">';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
            html += '   <ul class="table_list" data-id="' + item.id + '">';
            html += '       <li class="table_box">';
            html += '           <span class="left">处罚记录</span><span class="right">' + item.content + '</span>';
            html += '       </li>';
            html += '       <li class="table_box">';
            if(item.hasAttachFile) { // 有附件
                html += '           <span class="left">附件</span><span class="right attachment c_blue">查看</span>';
            }else { // 无附件
                html += '           <span class="left">附件</span><span class="right">无</span>';
            }
            html += '       </li>';
            html += '       <li class="table_box">';
            html += '           <span class="left">处罚时间</span><span class="right">' + item.punishTime + '</span>';
            html += '       </li>';
            html += '       <li class="table_box">';
            html += '           <span class="left">录入组织</span><span class="right">' + item.recorderName + '</span>';
            html += '       </li>';
            html += '   </ul>';
        }
        html += '</div>';
        $selector.html(html);
    }
    
    // 奖惩
    // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
    MemberApi.rewardList({memberId: mid, type: 1}).then(function (data) { // 团内奖励
        console.log('MemberApi.rewardList data', data);
        var list = data.dataList;
        var $league_in = $('#league_in');
        if(list && list.length > 0) { // 列表无数据
            renderAwardsList($league_in, list, 1);
        }
    
        $league_in.show();
    });
    
    // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
    MemberApi.rewardList({memberId: mid, type: 2}).then(function (data) { // 团外奖励
        console.log('MemberApi.rewardList data', data);
        var list = data.dataList;
        var $league_in = $('#league_out');
        if(list && list.length > 0) { // 列表无数据
            renderAwardsList($league_in, list, 2);
        }
    
        $league_in.show();
    });

    // 团组织查看单个团员的惩罚信息列表
    MemberApi.punishmentList({memberId: mid}).then(function (data) {
        console.log('MemberApi.listByOrg data', data);
        var list = data.rows;
        var $punishment = $('#punishment');
        if(list && list.length > 0) { // 列表无数据
            renderPunishmentList($punishment, list); // 渲染惩罚列表
        }

        $punishment.show();
    });

    // 点击 '查看'(附件)
    $('.info_box').on('click', '.attachment', function () {
        var id = $(this).parents('.table_list').data('id'); // 奖励ID
        var module = 1; // 团员奖励 -- 附件所属模块(1-团员奖励，2-团员惩罚)
        var parentIDName = $(this).parents('.info_box').attr('id');
        console.log('parentIDName', parentIDName);
        if(parentIDName == 'punishment') { // 惩罚
            module = 2; // 团员惩罚 -- 附件所属模块(1-团员奖励，2-团员惩罚)
        }
        console.log('id', id);
        // var imgUrlArr = helpDetail.imgUrl.split(',');
        // var imgUrls = 'http://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/activityImage/20170329/20170329164430_761微信图片_20170329164724.jpg,http://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/activityImage/20170329/20170329133740_836微信图片_1.jpg';

        var params = {
            objectId: id, // 附件所属对象ID（奖励ID/惩罚ID等）
            module: module // 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚)
        };
        // 奖惩证明附件列表查看
        MemberApi.attachFileList(params).then(function (data) {
            var imgUrlArr = data.rows;  false;
            var autoPlay = imgUrlArr.length > 1 ? true : false;
            var html_img = '';
            var html_index = '';
            for(var i=0; i<imgUrlArr.length; i++) {
                var imgUrl = imgUrlArr[i].filePath;
                html_img += '<ul><li><a><img src="' + imgUrl + '"/></a></li></ul>';
                html_index += '<li>' + (i+1) + '</li>';
            }
            $('#bannerBox .bd').html(html_img);
            $('#bannerBox .hd ul').html(html_index);
            $('.curtain').show();
            TouchSlide({ slideCell:"#bannerBox", effect: "leftLoop", delayTime: 300, interTime: 3000 });
        });
    });

    // 点击 '幕布'
    $('.curtain').click(function () {
        $(this).hide();
    });

    // 点击 'banner' 内容(不隐藏幕布)
    $('#bannerBox').click(function () {
        return false;
    });


    // 点击图片放大事件
    $('#bannerBox').on('click', '.bd ul li', function () {
        console.log('点击图片');
        var imgUrl = $(this).find('img').attr('src');
        console.log('imgUrl', imgUrl);
        if(!imgUrl) {
            $.alert('图片链接为空');
            return;
        }

        window.location.href = '../img_scale/img_scale.html?imgUrl=' + imgUrl;
    });

});