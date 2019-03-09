/**
 * Created by licong on 2018/6/19.
 */

$(function () {
    var mid_global = Utils.getQueryString('mid'); //  团员ID(全局变量)
    var memberAdditionNames_global = Utils.getQueryString('addition'); //  团员附加信息名称(全局变量)
    var memberRewardIds_global = Utils.getQueryString('reward'); //  团员奖励记录ID(全局变量)
    var isShowAllFee_global = Utils.getQueryString('isShowAllFee'); //  是否显示全部团费记录(全局变量 -- 1：打印全部记录，2：打印近6个月的记录)

    if(!mid_global) {
        $.alert('团员参数不能为空');
        return;
    }

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

    // 转出原因
    var causeName = {
        '1': '就业/工作调动',
        '2': '升学/转学',
        '3': '其他原因'
    };

    /**
     * 渲染奖励列表
     * @param type {int} 奖励类型(1-团内奖励，2-团外奖励)
     * @param list {array} 奖励列表
     */
    function renderAwardsList(type, list) {
        var $reward = undefined;
        if(type == 1) { // 团内奖励
            $reward = $('.box .box_item_table.reward_in');
        }else if(type == 2) { // 团外奖励
            $reward = $('.box .box_item_table.reward_out');
        }

        if(!list || list.length <= 0) { // 暂无记录
            $reward.find('.warning_no_content').show(); // 显示 暂无记录
            return;
        }

        var html = '';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)

            html += '<ul class="content_box">';
            html += '    <li class="content_item">';
            html += '        <span class="item_title">奖励名称：</span>';
            html += '        <span class="item_txt">' + item.content + '</span>';
            html += '    </li>';
            html += '    <li class="content_item"><span class="item_title">获奖名次：</span>';
            html += '        <span class="item_txt">' + levelName + '</span>';
            html += '    </li>';
            html += '    <li class="content_item"><span class="item_title">获奖时间：</span>';
            html += '        <span class="item_txt">' + item.rewardTime + '</span>';
            html += '    </li>';
            html += '    <li class="content_item"><span class="item_title">录入者：</span>';
            html += '        <span class="item_txt">' + item.recorderName + '</span>';
            html += '    </li>';
            html += '    <li class="content_item">';
            html += '        <span class="item_title">授奖组织：</span>';
            html += '        <span class="item_txt">' + item.awardOrg + '</span>';
            html += '    </li>';
            html += '    <li class="content_item"><span class="item_title">审核组织：</span>';
            html += '        <span class="item_txt">' + item.auditOrgName + '</span>';
            html += '    </li>';
            html += '</ul>';
        }

        $reward.find('.content_box_list').html(html); // 渲染奖励(团内奖励、团外奖励)
        // $reward.show(); // 显示 奖励(团内奖励、团外奖励)
    }

    // 基本信息 列表(全局变量)
    var baseList_global = ['name', 'developmentMemberNumber', 'genderStr', 'idCard', 'nation', 'politicalOutlook', 'leagueForYears', 'birthdayStr', 'highestEducation', 'domicilePlace', 'fullName', 'leagueForUnit', 'isRegisterVolunteer', 'volunteerServiceHours'];

    var params = {
        memberId: mid_global, // 团员ID
        showMemberAdditionNames: memberAdditionNames_global, // 团员附加信息名称(以逗号分隔)
        showMemberRewardIds: memberRewardIds_global, // 团员奖励记录ID(以逗号分隔)
        isShowAllFee: isShowAllFee_global // 是否显示全部团费记录(全局变量 -- 1：打印全部记录，2：打印近6个月的记录)
    };
    console.log('params', params);

    // 生成电子团员证获取信息
    InformationApi.leagueCardPreview(params).then(function (data) {

        var data = data.data;
        if(data) {
            $('#time_now').text(new Date().format('yyyy-MM-dd')); // 签发日期
            $('#qrCodeImg').attr('src', data.qrCodeImg); // 二维码

            // 基本信息
            var memberInfo = data.memberInfo;
            if(memberInfo) {
                for(var i=0; i<baseList_global.length; i++) {
                    var option = baseList_global[i];

                    if(!memberInfo[option]) { // 空字段直接返回，不显示(户籍除外)
                        $('#' + option).parents('.content_item').hide();
                        continue;
                    }

                    $('#' + option).text(memberInfo[option]);
                }
            }


            // 转接信息
            var orgTransfersList = data.orgTransfersList;
            if(orgTransfersList && orgTransfersList.length > 0) {
                var html = '';
                for(var i=0; i<orgTransfersList.length; i++) {
                    var item = orgTransfersList[i];
                    var reason = item.cause != 3 ? causeName[item.cause] : item.causeOthers; // 原因
                    // applicantType -- 申请人类型(1:组织，２团员)
                    var applyName = item.applicantType == 1 ? item.primalName : '本人';
                    var createTime = new Date(item.createTime.time).format('yyyy.MM.dd');

                    html += '<ul class="content_box">';
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
                    html += '        <span class="item_txt">' + createTime + '</span>';
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

                $('.box .box_item_table.transfer .content_box_list').html(html);
                // $('.box .box_item_table.transfer').show(); // 显示 组织关系转接记录
            }else { // 暂无记录
                $('.box .box_item_table.transfer .content_box_list .warning_no_content').show(); // 显示 暂无记录
            }

            // 团费交纳记录
            var paymentDetailsList = data.paymentDetailsList;
            if(paymentDetailsList && paymentDetailsList.length > 0) {
                var html = '';
                for(var i=0; i<paymentDetailsList.length; i++) {
                    var item = paymentDetailsList[i];
                    html += '<ul class="content_box">';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">交纳月份：</span>';
                    html += '        <span class="item_txt">' + item.months + '</span>';
                    html += '    </li>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">交纳金额：</span>';
                    html += '        <span class="item_txt">' + item.fees + '</span>';
                    html += '    </li>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">交纳时间：</span>';
                    html += '        <span class="item_txt">' + item.payTime + '</span>';
                    html += '    </li>';
                    html += '    <li class="content_item">';
                    html += '        <span class="item_title">交纳类型：</span>';
                    html += '        <span class="item_txt">' + item.orderType + '</span>';
                    html += '    </li>';
                    html += '</ul>';
                }

                $('.box .box_item_table.fee .content_box_list').html(html);
            }else { // 暂无记录
                $('.box .box_item_table.fee .content_box_list .warning_no_content').show(); // 显示 暂无记录
            }

            var rewardInnersList = data.rewardInnersList;
            var rewardOutsidesList = data.rewardOutsidesList;

            renderAwardsList(1, rewardInnersList); // 渲染奖励列表(团内奖励)
            renderAwardsList(2, rewardOutsidesList); // 渲染奖励列表(团外奖励)
        }
    });

    // 点击 '下载PDF'
    $('#download_certification').click(function () {

        // 拼接参数
        var questParams = [];
        for(name in params) {
            console.log('name', name);
            questParams.push(name + '=' + params[name]);
        }
        questParams = questParams.join('&');
        window.location.href = League.path + '/pdfCertificate/leagueCard/download?' + questParams;
    });


});