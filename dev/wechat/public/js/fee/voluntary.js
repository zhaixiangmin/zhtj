/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    $('#donation').focus(); // 自动获取焦点

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击 '确认' 按钮
    $('#confirm').click(function () {
        var donation = $('#donation').val();
        if(!donation) {
            $.alert('请输入你要多交的金额');
            return;
        }
        if(donation.indexOf('.') != -1) {
            var num = donation.split('.')[1];
            if(num.length > 2) {
                $.alert('金额最多包含两位小数');
                return;
            }
        }
        if(donation > 1000) {
            $.alert('为了您的资金安全，团员自愿多交的团费超出1000元时，请线下联系您所在的基层团委。感谢您的支持。');
            return;
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});
        // 创建订单(自愿多交)
        FeeApi.createOrder({donation: donation}).then(function (data) {
            var order = data.dataList;
            if(order && order.orderNo) {
                window.location.href = 'voluntary_confirm.html?orderNo=' + order.orderNo + '&orderDesc=' + order.orderDesc + '&amount=' + order.amount; // 交纳确认(自愿多交) 页面
            }
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});