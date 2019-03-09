/**
 * Created by licong on 2018/5/25.
 */
$(function () {
    var mid_global = undefined; //  团员ID(全局变量)

    if(parent.window.zhtj && parent.window.zhtj.mid) {
        mid_global = parent.window.zhtj.mid; // 团员ID(全局变量)

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
            // 团组织查看单个团员的奖励信息列表
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
                if(!list || list.length <= 0) { // 无数据
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

                $reward.find('.content_box_list').append(html); // 显示奖励数据列表.
            });
        }

        renderAwardsList(1); // 加载团内奖励
        renderAwardsList(2); // 加载团外奖励

        // 点击 '下载PDF'
        $('#download_certification').click(function () {
            window.location.href = League.path + '/pdfCertificate/memberReward/download?memberId=' + mid_global; // 奖励记录信息下载PDF
        });
    }

});