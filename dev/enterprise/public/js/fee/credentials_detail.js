/**
 * Created by licong on 2018/1/23.
 */
$(function () {
    var cid = Utils.getQueryString('cid'); // 凭证ID
    var confirm = Utils.getQueryString('confirm'); // 是否已核实
    if(!cid || !confirm) {
        $.alert('凭证参数不能为空');
        return;
    }

    if(confirm == 0) { // 未确认 -- 0：未确认；1：已确认
        $('#confirm').show(); // 显示 '确认'按钮
    }

    // 查询已收凭证的公示轨迹
    FeeApi.getReceiveCredentialsTrack({cid: cid}).then(function (data) {
        var data = data.dataList;
        if(data) {
            var $table = $('.myTable');
            $('#months').text(data.months); // 月份
            $('#amount').text(data.amount); // 返还金额

            var trackList = data.track;
            var html = '';
            for(var i=0; i<trackList.length; i++) {
                var item = trackList[i];
                var style = 'cur'; // 未确认
                var auditText = '待确定'; // 未确认
                if(item.confirm == 1) { // 已确认
                    style = '';
                    auditText = item.toOrg + '已确认';
                }
                html += '<li class="list_item ' + style + '">';
                html += '    <i class="dot"></i>';
                html += '    <h1 class="h_title">' + auditText + '</h1>';
                html += '    <p class="date">' + item.createTime + '</p>';
                html += '    <p class="phare">' + item.fromOrg + '返还<em>' + item.amount + ' 元</em>到' + item.toOrg + ' </p>';
                html += '</li>';
            }
            $('.step_list').html(html); // 渲染 返还凭证轨迹
        }
    });


    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击 '确定'按钮
    $('#confirm').click(function () {
        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});
        // 核实凭证
        FeeApi.proveCredentials({cid: cid}).then(function (data) {
            $.alert(data.msg).then(function () {
                // window.location.href = 'credentials_received.html'; // 跳转到 凭证查询
                window.history.back(); // 返回上一页
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});