/**
 * Created by licong on 2018/5/25.
 */
$(function () {
    var mid_global = undefined; //  团员ID(全局变量)
    if(parent.window.zhtj && parent.window.zhtj.mid) {
        mid_global = parent.window.zhtj.mid; // 团员ID(全局变量)
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
        console.log('mid_global', mid_global);

        // 勾选框 -- 团费交纳记录
        $('.box_item_info.fee #fee_check label').click(function () {
            if($(this).hasClass('active')) { // 已选中，返回
                return;
            }

            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });

        // 基本信息 列表(全局变量)
        var baseList_global = ['name', 'developmentMemberNumber', 'genderStr', 'idCard', 'nation', 'politicalOutlook', 'leagueForYears', 'birthdayStr', 'highestEducation', 'residence', 'fullName', 'leagueForUnit', 'isRegisterVolunteer', 'volunteerServiceHours'];

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

        // 政治面貌名称
        var politicalOutlookName ={
            "1": "团员",
            "2": "党员",
            "3": "中共预备党员"
        };

        // 证件类型名称
        var idCardTypeName = {
            '1': '普通居民身份证',
            '2': '境外身份证'
        };


        // 转出原因
        var causeName = {
            '1': '就业/工作调动',
            '2': '升学/转学',
            '3': '其他原因'
        };

        // 状态名称
        var auditStatusName = {
            '1': '转出团支部待审核',
            '2': '转出团支部的上级待审核',
            '3': '转入团支部待审核',
            '4': '转入团支部的上级待审核',
            '5': '接转成功',
            '6': '转出团支部退回',
            '7': '转出团支部的上级退回',
            '8': '转入团支部退回',
            '9': '转入团支部的上级退回',
            '10': '转出团支部同意',
            '11': '转出团支部的上级同意',
            '12': '转入团支部同意',
            '13': '转入团支部的上级同意'
        };

        // 根据ID获取团员
        LeagueMemberApi.getMembersById({mid: mid_global}).then(function (data) {
            var myData = data.rows;
            if(myData) {
                // if(myData['photoUrl'] && myData['photoUrl'] != 'null') { // 头像存在
                //     $('#photoUrl').attr('src', myData['photoUrl']);
                // }

                for(var i=0; i<baseList_global.length; i++) {
                    var option = baseList_global[i];

                    if(!myData[option] && option != 'residence') { // 空字段直接返回，不显示(户籍除外)
                        $('#' + option).parents('.content_item').hide();
                        continue;
                    }

                    if(option == 'name') {
                        $('#' + option).text(myData[option]); // 姓名
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
                    if(option == 'highestEducation') { // 最高学历
                        $('#' + option).text(degreeOfEducationName[myData[option]]); // 设置最高学历名称
                        continue;
                    }
                    if(option == 'residence') { // 户籍所在地
                        $('#' + option).text(Utils.returnValidString(myData['provinceName']) + Utils.returnValidString(myData['cityName']) + Utils.returnValidString(myData['countyName'])); // 设置户籍所在地名称
                        continue;
                    }
                    $('#' + option).text(myData[option]);
                }
            }
        });


        /**
         * 渲染奖励列表
         * @param type {int} 奖励类型(1-团内奖励，2-团外奖励)
         */
        function renderAwardsList(type) {
            var $reward = undefined;
            if(type == 1) { // 团内奖励
                $reward = $('.box .box_item_info.reward .box_item_table.reward_in');
            }else if(type == 2) { // 团外奖励
                $reward = $('.box .box_item_info.reward .box_item_table.reward_out');
            }
            LeagueMemberApi.rewardList({
                memberId: mid_global, // 团员ID
                type: type, // 奖励类型(1-团内奖励，2-团外奖励)
                status: 1, // 奖励状态(0：待审核，1：同意，2：退回)
                pageIndex: 1, // 当前页码(可不传，默认为1)
                // pageSize: 5 // 每页记录数(可不传，默认为10)
                pageSize: 50 // 每页记录数(可不传，默认为10)
            }).then(function (data) {
                console.log('type', type);
                var list = data.dataList;
                // list = undefined;
                if(!list || list.length <= 0) { // 无数据
                    $reward.find('.content_box_list .no_content').show(); // 显示'无数据'
                    return;
                }

                var html = '';
                for(var i=0; i<list.length; i++) {
                    var item = list[i];
                    var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
                    html += '<ul class="content_box" data-id="' + item.id + '">';
                    html += '    <i class="icon active"></i>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">奖励名称：</span>';
                    html += '        <span class="item_txt">' + item.content + '</span>';
                    html += '    </li>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">获奖名次：</span>';
                    html += '        <span class="item_txt">' + levelName + '</span>';
                    html += '    </li>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">获奖时间：</span>';
                    html += '        <span class="item_txt">' + item.rewardTime + '</span>';
                    html += '    </li>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">录入者：</span>';
                    html += '        <span class="item_txt">' + item.recorderName + '</span>';
                    html += '    </li>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">授奖组织：</span>';
                    html += '        <span class="item_txt">' + item.awardOrg + '</span>';
                    html += '    </li>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">审核组织：</span>';
                    html += '        <span class="item_txt">' + item.auditOrgName + '</span>';
                    html += '    </li>';
                    html += '</ul>';
                }

                $('.box .box_item_info.reward .title_txt .icon').show(); // 显示 标题'圆形选择按钮'
                $reward.find('.content_box_list').html(html); // 显示奖励数据列表
            });
        }

        renderAwardsList(1); // 加载团内奖励
        renderAwardsList(2); // 加载团外奖励
    }

    // 加载组织转接记录
    function renderTransation() {
        // 根据团员ID查询转接记录(auditStatus -- 5:接转成功)
        LeagueMemberApi.applyListByMid({mid: mid_global, auditStatus: 5}).then(function (data) {
            var list = data.rows;

            if(!list || list.length <= 0) { // 无数据，不显示
                return;
            }

            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var reason = item.cause != 3 ? causeName[item.cause] : item.causeOthers; // 原因
                // applicantType -- 申请人类型(1:组织，２团员)
                var applyName = item.applicantType == 1 ? item.primalName : '本人';
                html += '<ul class="content_box" data-otid="' + item.otid + '">';
                html += '    <li class="content_item">';
                html += '        <span class="item_title">转出组织：</span>';
                html += '        <span class="item_txt">' + item.primalName + '</span>';
                html += '    </li>';
                html += '    <li class="content_item">';
                html += '        <span class="item_title">转入组织：</span>';
                html += '        <span class="item_txt">' + item.newName + '</span>';
                html += '    </li>';
                html += '    <li class="content_item">';
                html += '        <span class="item_title">转接原因：</span>';
                html += '        <span class="item_txt">' + reason + '</span>';
                html += '    </li>';
                html += '    <li class="content_item">';
                html += '        <span class="item_title">申请时间：</span>';
                html += '        <span class="item_txt">' + item.createTime + '</span>';
                html += '    </li>';
                html += '    <li class="content_item">';
                html += '        <span class="item_title">申请人：</span>';
                html += '        <span class="item_txt">' + applyName + '</span>';
                html += '    </li>';
                html += '    <li class="content_item">';
                html += '        <span class="item_title">转接状态：</span>';
                html += '        <span class="item_txt">' + auditStatusName[item.auditStatus] + '</span>';
                html += '    </li>';
                html += '</ul>';
            }

            $('.box .box_item_info.transfer .box_item_table .content_box_list').html(html);
            $('.box .box_item_info.transfer').show(); // 显示 组织关系转接记录
        });
    }
    renderTransation();

    // 点击 勾选框 -- 奖励情况
    $('.box .box_item_info').on('click', '.icon', function () {
        if($(this).parents('.title_txt')) { // 标题的选择按钮
            if($(this).hasClass('active')) { // 当前状态为'选中'
                $(this).removeClass('active'); // 设置为'未选中'
                $(this).parents('.title_txt').parent().find('.icon').removeClass('active'); // 设置为'未选中'(所有子元素)
            }else { // 当前状态为'未选中'
                $(this).addClass('active'); // 设置为'选中'
                $(this).parents('.title_txt').parent().find('.icon').addClass('active'); // 设置为'选中'(所有子元素)
            }
        }else { // 子元素的选择按钮
            if($(this).hasClass('active')) { // 当前状态为'选中'
                $(this).removeClass('active'); // 设置为'未选中'
            }else { // 当前状态为'未选中'
                $(this).addClass('active'); // 设置为'选中'
            }
        }
    });


    // 点击 '生成电子团员证'
    $('#make_certification').click(function () {
        console.log('生成电子团员证');
        var params_addition = []; // 附加信息参数
        var params_reward = []; // 奖励参数(团内奖励、团外奖励)

        // 遍历 奖励(团内奖励、团外奖励)
        $('.box .box_item_info.reward .box_item_table .content_box_list .content_box').each(function () {
            if($(this).find('.icon').hasClass('active')) { // 当前状态为'选中'
                var id = $(this).data('id');
                params_reward.push(id);
            }
        });

        parent.window.zhtj = {
            mid: mid_global, // 团员ID
            addition: params_addition.join(','), // 附加信息参数
            reward: params_reward.join(','), // 奖励参数(团内奖励、团外奖励)
            isShowAllFee: $('#fee_check').find('label.active').data('id') == 1 ? true : false // 1：打印全部记录，2：打印近6个月的记录 // 是否显示全部团费记录
        };
        var current_title = Utils.returnTabTitle(); // 当前面板标题
        Utils.toggleTab('生成电子团员证', 'view/league_menber/member_certification_generation.html'); // 创建(打开)新面板(生成电子团员证)
        Utils.toggleTab(current_title); // 关闭当前标签页(电子团员证预览)

    });
});