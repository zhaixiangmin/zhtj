/**
 * Created by licong on 2017/10/31.
 */
$(function () {
    var mid_global = undefined; // 团员ID(全局变量)
    var leagueForUnit_global = undefined; // 入团时所在单位(全局变量)
    var isLimited_global = false; // 是否限制(全局变量，省外/禁用，true：限制，false：不限制)

    /**
     * 默认选中项(1：基本资料，2：奖惩)
     * @param index {int} 序号(1：奖惩信息，2：奖惩信息)
     */
    function chooseItem(index) {
        index = index == 2 ? 1 : 0;
        var $tab_item = $('.tab_box .tab_item').eq(index);
        $tab_item.addClass('cur').siblings().removeClass('cur');
        $('.big_block').eq(index).show().siblings('.big_block').hide();
    }

    var type_global = Utils.getQueryString('type'); // 类型(1：报到资料，2：奖惩信息，全局变量)
    chooseItem(type_global); // 默认选中项(1：报到资料，2：奖惩信息)
    
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

    // 在本支部担任团干职务名称
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

    var auditStatus_global = undefined; // 审核状态(全局变量)
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

    // 显示待审核
    function showSub(myData) {
        var subList = ['income', 'politicalOutlook', 'leagueForYears', 'isCadres', 'incumbent', 'incumbentDesc', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember'];
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
                }else if(option == 'politicalOutlook') { // 政治面貌
                    oldValue = politicalOutlookName[oldValue];
                    newValue = politicalOutlookName[newValue];
                }else if(option == 'isCadres') { // 是否在本支部担任团干职务
                    oldValue = yesOrNoName[oldValue];
                    newValue = yesOrNoName[newValue];
                }else if(option == 'incumbent') { // 本支部团干职务
                    if(myData['newIsCadres'] == 2) { // 否 -- (是否在本支部担任团干职务)
                        continue; // 隐藏该项
                    }
                    oldValue = incumbentName[oldValue];
                    newValue = incumbentName[newValue];
                }
                else if(option == 'incumbentDesc') { // 职务名称
                    if(myData['newIsCadres'] == 2) { // 否 -- (是否在本支部担任团干职务)
                        continue; // 隐藏该项
                    }
                    if(myData['newIncumbent'] && myData['newIncumbent'] != 9) { // 修改值为 非其他(本支部团干职务)
                        continue; // 隐藏改选项
                    }
                    oldValue = oldValue;
                    newValue = newValue;
                }
                else if(option == 'dateOfDuty') { // 任现职年月
                    if(myData['newIsCadres'] == 2) { // 否 -- (是否在本支部担任团干职务)
                        continue; // 隐藏该项
                    }
                }
                else if(option == 'tuanganProperties') { // 团干部性质
                    if(myData['newIsCadres'] == 2) { // 否 -- (是否在本支部担任团干职务)
                        continue; // 隐藏该项
                    }
                    oldValue = tuanganPropertiesName[oldValue];
                    newValue = tuanganPropertiesName[newValue];
                }else if(option == 'isPartyCommitteeMember') { // 是否同级党支部（党组织）成员
                    if(myData['newIsCadres'] == 2) { // 否 -- (是否在本支部担任团干职务)
                        continue; // 隐藏该项
                    }
                    oldValue = yesOrNoName[oldValue];
                    newValue = yesOrNoName[newValue];
                }
                oldValue = oldValue ? oldValue : '空值';
                var text = title + '由' + oldValue + '改为' + newValue;
                $('#' + option + '_sub').find('.info_item_title').text(text);
                $('#' + option + '_sub').find('.arrow').text('待审核');
                $('#' + option + '_sub').show();
            }
        }
    }

    // 我的认证资料
    InformationApi.MyProfile({}).then(function (data) {
        var myData = data.rows;
        if(myData) {
            mid_global = myData.mid;
            leagueForUnit_global = myData.leagueForUnit; // 入团时所在单位
            if(myData['photoUrl'] && myData['photoUrl'] != 'null') { // 头像存在
                $('#photoUrl').attr('src', myData['photoUrl']);
            }

            $('#isRealName').text(isRealName[myData['isRealName']]); // 实名认证状态
            if(myData['isRealName'] != 10) {
                $('#isRealName').css('color', '#c10021'); // 文字变红
            }

            // myData.disabled = 0; // 测试正常

            // myData.disabled = 1; // 测试禁用
            // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
            // 禁用/满28周岁离团/自行脱团/自愿退团/开除团籍
            if(myData.fullName == '非共青团广东省委所辖的团组织' || myData.fullName == '省外组织' || myData.disabled == 1 || myData.disabled == 2 || myData.disabled == 4 || myData.disabled == 6 || myData.disabled == 8) { // 省外/禁用
                $('.limited').hide(); // 隐藏资料编辑/奖励添加
                if($('.button_box').length > 0) { // 先加载奖励
                    $('.button_box').hide(); // 隐藏奖励可以操作奖励的按钮
                }else { // 后加载奖励或没有以操作奖励的奖励
                    isLimited_global = true; // 设置成限制
                }
            }

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
                if(option == 'auditStatus') {
                    $('#' + option).text(auditStatusName[myData[option]]); // 审核状态
                    auditStatus_global = myData[option]; // 审核状态(全局变量)
                    // 审核状态(可不传，1:报到待审核2:报到被退回,3:审核通过4:修改资料待审核,5:修改资料被退回)
                    if(auditStatus_global == 3) { // 审核通过
                        $('#makeCard').show(); // 显示'生成电子团员证'按钮
                    }else if(auditStatus_global == 4) { // 修改资料待审核
                        showSub(myData);
                    }else if(auditStatus_global == 5) { // 修改资料被退回
                        $('#auditStatus').parent().css({top: 0, transform: 'translateY(0px)'});
                        // $('#returnReason').text(myData['returnReason']).parent().show(); // 退回原因
                        $('#returnReason span').text(myData['returnReason']).parent().show(); // 退回原因
                    }
                    continue;
                }
                if(option == 'isCadres') { // 是否在本支部担任团干职务
                    $('#' + option).text(yesOrNoName[myData[option]]); // 设置是否团干部名称
                    // (1: 是，2：否)
                    // 修改资料待审核且修改值为是 或者 非修改资料待审核且值为是
                    if((myData['auditStatus'] == 4 && myData['newIsCadres'] == 1) || (myData['auditStatus'] != 4 && myData[option] == 1)) {
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
                if(option == 'incumbentDesc') { // 职务名称
                    $('#' + option).text(myData[option]); // 设置职务名称
                    if(myData['newIncumbent'] && myData['newIncumbent'] != 9) { // 非其它(本支部团干职务)
                        $('#' + option).parents('.info_item').hide();
                    }
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
        }
    });

    // 切换标签页 -- 'TA的报到资料/TA的奖惩信息'
    $('.tab_box .tab_item').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.big_block').eq($(this).index()).show().siblings('.big_block').hide();
    });

    // 点击 '生成电子团员证'
    $('#makeCard').click(function () {
        if(!mid_global) {
            $.alert('正在加载中，请稍候点击...');
            return;
        }

        // 入团时所在单位 生成电子团员证需填写
        if(!leagueForUnit_global) {
            // $.alert('请填写入团时所在单位');
            $.alert('电子团员证中，入团所在单位不能为空，请补充完整该信息。<br/>可在本页，点击“编辑”进行修改。');
            return;
        }

        window.location.href = 'member_certification.html'; // 电子团员证(筛选页面)
        // window.location.href = League.path + '/pdfCertificate/leagueCard/download?memberId=' + mid_global + '&showMemberAdditionNames=&showMemberRewardIds='; // 电子团员证团员相关信息下载PDF
    });

    // 点击 '奖励记录下载'
    $('.download_reward').click(function () {
        if(!mid_global) {
            $.alert('正在加载中，请稍候点击...');
            return;
        }
        // window.location.href = League.path + '/pdfCertificate/memberReward/download?memberId=' + mid_global; // 奖励记录信息下载PDF
        window.location.href = 'member_reward_generated.html?mid=' + mid_global; // 奖励记录信息下载页面
    });

    // 点击'退回原因' -- 弹出框显示文字，避免文字太长
    $('#returnReason').click(function () {
        var text = $(this).text();
        if(text) {
            $.alert(text);
        }
    });

    // 点击'编辑'
    $('#edit').click(function () {
        if(!auditStatus_global) {
            $.alert('正在获取信息，请稍后');
            return;
        }
        // 审核状态(可不传，1:报到待审核2:报到被退回,3:审核通过4:修改资料待审核,5:修改资料被退回)
        if(auditStatus_global == 4) {
            $.alert('修改资料待审核');
            return;
        }
        window.location.href = 'authentication_data_editing1.html'; // 跳转页面
    });

    /**
     * 渲染奖励列表
     * @param operateApi {function} 接口函数
     * @param operateParams {object} 参数
     * @param $selector {jquery对象} 选择器
     */
    function renderAwardsList(operateApi, operateParams, $selector) {
        if ($selector.find('.table_list_block').find('.load-more').length > 0) { // 存在'加载更多'(这位置)
            $selector.find('.table_list_block').find('.load-more').remove(); // 删除'加载更多'
        }
        operateApi(operateParams).then(function (data) {
            // html += '<div class="table_list_block">';
            var list = data.dataList;
            if (!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                var html_none = '';
                html_none += '<ul class="info_list">';
                html_none += '    <li class="info_item on_info clearfix">';
                html_none += '        <span class="info_item_title">暂无获奖信息</span>';
                html_none += '    </li>';
                html_none += '</ul>';
                $selector.html(html_none);
                return;
            }

            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
                html += '<ul class="table_list" data-id="' + item.id + '" data-type="' + item.type + '">';
                // html += '       <li class="table_box">';
                // html += '           <span class="left">奖励类型</span><span class="right">团外奖励</span>';
                // html += '       </li>';
                html += '   <li class="table_box content" data-hasLevel="' + item.hasLevel + '">';
                html += '       <span class="left">奖励名称</span><span class="right">' + item.content + '</span>';
                html += '   </li>';
                html += '   <li class="table_box levelName">';
                html += '       <span class="left">获奖名次</span><span class="right">' + levelName + '</span>';
                html += '   </li>';
                html += '   <li class="table_box">';
                if(item.hasAttachFile) { // 有附件
                    html += '        <span class="left">证明附件</span><span class="right attachment c_blue">查看</span>';
                }else { // 无附件
                    html += '        <span class="left">证明附件</span><span class="right">无</span>';
                }
                html += '    </li>';
                html += '    <li class="table_box">';
                html += '        <span class="left">获奖时间</span><span class="right">' + item.rewardTime + '</span>';
                html += '    </li>';
                if(item.type == 1) { // 团内奖励
                    html += '    <li class="table_box">';
                    html += '        <span class="left">录入者</span><span class="right">' + item.recorderName + '</span>';
                    html += '    </li>';
                }
                html += '    <li class="table_box">';
                html += '        <span class="left">授奖组织</span><span class="right">' + item.awardOrg + '</span>';
                html += '    </li>';
                html += '    <li class="table_box">';
                html += '        <span class="left">审核组织</span><span class="right">' + item.auditOrgName + '</span>';
                html += '    </li>';
                html += '    <li class="table_box">';
                html += '        <span class="left">奖励状态</span><span class="right c_red">' + item.statusStr + '</span>';
                html += '    </li>';
                if(item.status == 2) { // 被退回 -- 奖励状态(0-待审核，1-审核通过，2-被退回，3-暂无奖励(已删除))
                    html += '    <li class="table_box">';
                    html += '        <span class="left">退回原因</span><span class="right">' + item.returnReason + '</span>';
                    html += '    </li>';
                    if(!isLimited_global) { // 不限制 -- 是否限制(全局变量，省外/禁用，true：限制，false：不限制)
                        html += '    <li class="button_box">';
                        html += '        <div class="button_block clearfix">';
                        html += '            <span class="left button">修改</span><span class="right button">删除</span>';
                        html += '        </div>';
                        html += '    </li>';
                    }
                }
                html += '</ul>';
            }

            if (operateParams.pageIndex == 1) {
                $selector.find('.table_list_block').html(html);
            } else {
                $selector.find('.table_list_block').append(html);
            }

            if (list.length >= operateParams.pageSize) { // 也许有下一页
                $selector.find('.table_list_block').append('<li class="load-more" style="text-align: center;font-size: 0.24rem;">加载更多</li>');
            } else { // 加载完毕
                if (operateParams.pageIndex > 1) { // 不是第一页
                    // $selector.find('.table_list_block').find('.load-more').remove(); // 删除'加载更多'
                    $selector.find('.table_list_block').append('<li class="load-more" style="text-align: center;font-size: 0.24rem;">全部加载完成</li>');
                    // $selector.find('.table_list_block').find('.load-more').text('全部加载完成');
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
     */
    function renderPunishmentList(operateApi, operateParams, $selector) {
        if ($selector.find('.table_list_block').find('.load-more').length > 0) { // 存在'加载更多'(这位置)
            $selector.find('.table_list_block').find('.load-more').remove(); // 删除'加载更多'
        }
        operateApi(operateParams).then(function (data) {
            var list = data.rows;
            if (!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                var html_none = '';
                html_none += '<ul class="info_list">';
                html_none += '    <li class="info_item on_info clearfix">';
                html_none += '        <span class="info_item_title">暂无处罚信息</span>';
                html_none += '    </li>';
                html_none += '</ul>';
                $selector.html(html_none);
                return;
            }

            var html = '';
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

            if (operateParams.pageIndex == 1) {
                $selector.find('.table_list_block').html(html);
            } else {
                $selector.find('.table_list_block').append(html);
            }

            if (list.length >= operateParams.pageSize) { // 也许有下一页
                $selector.find('.table_list_block').append('<li class="load-more" style="text-align: center;font-size: 0.24rem;">加载更多</li>');
            } else { // 加载完毕
                if (operateParams.pageIndex > 1) { // 不是第一页
                    $selector.find('.table_list_block').append('<li class="load-more" style="text-align: center;font-size: 0.24rem;">全部加载完成</li>');
                }
            }
            operateParams.pageIndex++;
        });
    }

    // 点击'加载更多'
    $('.info_box').on('click', '.load-more', function () {
        var idName = $(this).parents('.info_box').attr('id');
        var text = $(this).text(); // 文字
        if(text == '加载更多') {
            if(idName == 'league_in') { // 奖励(团内)
                renderAwardsList(InformationApi.listByMember, params_rewardIn_global, $('#league_in')); // 渲染奖励列表(团内)
            }else if(idName == 'league_out') { // 奖励(团外)
                renderAwardsList(InformationApi.listByMember, params_rewardOut_global, $('#league_out')); // 渲染奖励列表(团外)
            }else { // 惩罚
                renderPunishmentList(InformationApi.listByMemberPunishment, params_punishment_global, $('#punishment')); // 渲染惩罚列表
            }
        }
    });

    renderAwardsList(InformationApi.listByMember, params_rewardIn_global, $('#league_in')); // 渲染奖励列表(团内)

    renderAwardsList(InformationApi.listByMember, params_rewardOut_global, $('#league_out')); // 渲染奖励列表(团外)



    // // 获取单个团员的惩罚信息列表
    // // InformationApi.listByMemberPunishment({}).then(function (data) {
    // InformationApi.listByMemberPunishment(params_punishment_global).then(function (data) {
    //     console.log('InformationApi.listByMemberPunishment data', data);
    //     var list = data.rows;
    //     var $punishment = $('#punishment');
    //     if(list && list.length > 0) { // 列表无数据
    //         renderPunishmentList($punishment, list); // 渲染惩罚列表
    //     }
    //
    //     $punishment.show();
    // });

    renderPunishmentList(InformationApi.listByMemberPunishment, params_punishment_global, $('#punishment')); // 渲染惩罚列表



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
        InformationApi.list(params).then(function (data) {
           var imgUrlArr = data.rows;
            // var autoPlay = imgUrlArr.length > 1 ? true : false;
            var pnLoop = imgUrlArr.length > 1 ? true : false; // 前/后按钮是否继续循环，若为false则当翻动到最前/后页时，前/后按钮点击无效，同时增加prevStop/nextStop类名控制样色
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
            TouchSlide({ slideCell:"#bannerBox", effect: "leftLoop", delayTime: 300, interTime: 3000, pnLoop: pnLoop });
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

    // 点击 编辑/删除 按钮
    $('.info_box').on('click', '.table_list_block .table_list .button', function () {

        var isEdit = $(this).hasClass('left'); // 是否编辑(true：编辑，false：删除)
        var rewardId = $(this).parents('.table_list').data('id');
        console.log('rewardId', rewardId);
        if(!isEdit) { // 删除
            $.confirm('确定删除该奖励？').then(function () {
                InformationApi.remove({rewardId: rewardId}).then(function (data) {
                    $.alert(data.msg).then(function () {
                        window.location.reload(); // 刷新当前页面
                    });
                });
            });
            return;
        }

        console.log('测试下一步');
        window.location.href = '../awards/edit_awards.html?rewardId=' + rewardId; // 跳转到 编辑获奖信息 页面
    });
    
});