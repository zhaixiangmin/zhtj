/**
 * Created by licong on 2018/5/25.
 */
$(function () {
    var mid_global = undefined; //  团员ID(全局变量)
    var memberAdditionNames_global = undefined; //  团员附加信息名称(全局变量)
    var memberRewardIds_global = undefined; //  团员奖励记录ID(全局变量)
    var isShowAllFee_global = true; //  是否显示全部团费记录(全局变量)
    if(parent.window.zhtj && parent.window.zhtj.mid) {
        $('#time_now').text(new Date().format('yyyy-MM-dd'));
        mid_global = parent.window.zhtj.mid; // 团员ID(全局变量)
        memberAdditionNames_global = parent.window.zhtj.addition; // 团员附加信息名称(全局变量)
        memberRewardIds_global = parent.window.zhtj.reward; // 团员奖励记录ID(全局变量)
        isShowAllFee_global = parent.window.zhtj.isShowAllFee; // 是否显示全部团费记录(全局变量)
        console.log('before parent.window.zhtj', parent.window.zhtj);
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
        console.log('mid_global', mid_global);

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
                $reward = $('.box .box_item_info.reward .box_item_table.reward_in');
            }else if(type == 2) { // 团外奖励
                $reward = $('.box .box_item_info.reward .box_item_table.reward_out');
            }

            if(!list || list.length <= 0) { // 暂无记录
                $reward.find('.warning_no_content').show(); // 显示 暂无记录
                return;
            }

            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)


                html += '<div class="item_txt_box">';
                html += '    <span>' + item.content + '</span><span>' + levelName + '</span><span>' + item.rewardTime + '</span><span>' + item.recorderName + '</span><span>' + item.awardOrg + '</span><span>' + item.auditOrgName + '</span>';
                html += '</div>';
            }

            if(html) {
                $reward.find('.item_title_box').show(); // 显示 表头行
                $reward.find('.content_box_list').append(html); // 渲染奖励(团内奖励、团外奖励)
            }
        }

        // 基本信息 列表(全局变量)
        var baseList_global = ['name', 'developmentMemberNumber', 'genderStr', 'idCard', 'nation', 'politicalOutlook', 'leagueForYears', 'birthdayStr', 'highestEducation', 'domicilePlace', 'fullName', 'leagueForUnit', 'isRegisterVolunteer', 'volunteerServiceHours'];

        var params = {
            memberId: mid_global, // 团员ID
            showMemberAdditionNames: memberAdditionNames_global, // 团员附加信息名称(以逗号分隔)
            showMemberRewardIds: memberRewardIds_global, // 团员奖励记录ID(以逗号分隔)
            isShowAllFee: isShowAllFee_global // 是否显示全部团费记录
        };
        console.log('params', params);
        // 生成电子团员证获取信息
        LeagueMemberApi.leagueCardPreview(params).then(function (data) {

            var data = data.data;
            if(data) {
                var qrCodeImg = data.qrCodeImg;
                $('#qrCodeImg').attr('src', qrCodeImg); // 二维码

                // 基本信息
                var memberInfo = data.memberInfo;
                if(memberInfo) {
                    $('#photoUrl').attr('src', memberInfo.photoUrl); // 头像
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

                        html += '<div class="item_txt_box">';
                        html += '    <span>' + item.primalName + '</span><span>' + item.newName + '</span><span>' + reason + '</span><span>' + createTime + '</span><span>' + applyName + '</span><span>' + auditStatusName[item.auditStatus] + '</span>';
                        html += '</div>';
                    }

                    $('.box .box_item_info.transfer .box_item_table .item_title_box').show(); // 显示 表头行
                    $('.box .box_item_info.transfer .box_item_table .content_box_list').append(html);
                }else { // 暂无记录
                    $('.box .box_item_info.transfer .box_item_table .warning_no_content').show(); // 显示 暂无记录
                }

                // 团费交纳记录
                var paymentDetailsList = data.paymentDetailsList;
                if(paymentDetailsList && paymentDetailsList.length > 0) {
                    var html = '';
                    for(var i=0; i<paymentDetailsList.length; i++) {
                        var item = paymentDetailsList[i];


                        html += '<div class="item_txt_box">';
                        html += '    <span>' + item.months + '</span><span>' + item.fees + '</span><span>' + item.payTime + '</span><span>' + item.orderType + '</span>';
                        html += '</div>';
                    }

                    $('.box .box_item_info.fee .box_item_table .item_title_box').show(); // 显示 表头行
                    $('.box .box_item_info.fee .box_item_table .content_box_list').append(html);
                }else { // 暂无记录
                    $('.box .box_item_info.fee .box_item_table .warning_no_content').show(); // 显示 暂无记录
                }


                var rewardInnersList = data.rewardInnersList;
                var rewardOutsidesList = data.rewardOutsidesList;

                // 团内奖励
                renderAwardsList(1, rewardInnersList); // 渲染奖励列表
                // 团外奖励
                renderAwardsList(2, rewardOutsidesList); // 渲染奖励列表
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
    }

});