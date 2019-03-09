/**
 * Created by licong on 2018/6/19.
 */

$(function () {
    var mid_global = Utils.getQueryString('mid'); //  团员ID(全局变量)

    if(!mid_global) {
        $.alert('团员参数不能为空');
        return;
    }

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

        InformationApi.listByMember({
            memberId: mid_global, // 团员ID
            type: type, // 奖励类型(1-团内奖励，2-团外奖励)
            status: 1, // 奖励状态(0：待审核，1：同意，2：退回)
            pageIndex: 1, // 当前页码(可不传，默认为1)
            // pageSize: 5 // 每页记录数(可不传，默认为10)
            pageSize: 50 // 每页记录数(可不传，默认为10)
        }).then(function (data) {
            console.log('type', type);
            var list = data.dataList;
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
                if(item.recorderName) {
                    html += '    <li class="content_item"><span class="item_title">录入者：</span>';
                    html += '        <span class="item_txt">' + item.recorderName + '</span>';
                    html += '    </li>';
                }
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
        });

    }

    renderAwardsList(1); // 加载团内奖励
    renderAwardsList(2); // 加载团外奖励

    // 点击 '下载PDF'
    $('#download_certification').click(function () {
        window.location.href = League.path + '/pdfCertificate/memberReward/download?memberId=' + mid_global; // 奖励记录信息下载PDF
    });


});