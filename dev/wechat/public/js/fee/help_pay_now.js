/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    var infos = Utils.getQueryString('infos');
    console.log('infos', infos);
    if(!infos) {
        $.alert('参数不能为空');
        return;
    }

    infos = infos.split('@@');
    var html = '';
    var amount = 0; // 金额
    var number = infos.length; // 数量
    for(var i=0; i<infos.length; i++) {
        var info = infos[i].split(',');
        html += '<a class="list_item" data-id="' + info[0] + '">';
        html += '    <div class="item_inner clearfix">';
        html += '        <div class="item_text clearfix">';
        html += '            <div class="text_left">' + info[1] + '</div>';
        html += '            <div class="text_right">' + info[2] + '元</div>';
        html += '        </div>';
        html += '    </div>';
        html += '</a>';
        amount = Utils.addNum(amount, info[2]); // 金额
        // amount += parseFloat(info[2]); // 金额
    }
    $('.list').html(html);
    $('#amount').text(amount); // 金额
    $('#number').text(number); // 数量

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击'选好了' 按钮
    $('#confirm').click(function () {
        var mids = [];
        $('.list .list_item').each(function () {
            mids.push($(this).data('id'));
        });
        mids = mids.join(','); // 转成字符串
        if(!mids) {
            $.alert('团员不能为空');
            return;
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});
        // 创建订单(帮TA交费)
        FeeApi.createOrder({mids: mids}).then(function (data) {
            var order = data.dataList;
            if(order && order.orderNo) {
                window.location.href = 'help_pay_confirm.html?orderNo=' + order.orderNo + '&orderDesc=' + order.orderDesc + '&amount=' + order.amount; // 交纳确认(帮TA交费) 页面
            }
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});