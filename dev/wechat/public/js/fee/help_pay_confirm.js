/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    var orderNo_global = Utils.getQueryString('orderNo'); // 订单号(全局变量)
    var orderDesc_global = Utils.getQueryString('orderDesc'); // 交费说明(全局变量)
    var amount_global = Utils.getQueryString('amount'); // 金额(全局变量)
    if(!orderNo_global) {
        $.alert('订单参数不能为空');
        return;
    }
    $('#orderNo').text(orderNo_global); // 订单号
    $('#fee_detail').text(orderDesc_global); // 费用说明(2017年6-8月)
    $('.amount').text(amount_global); // 费用

    // 点击 '立即支付' 按钮
    $('#pay').click(function () {
        // 支付
        FeeApi.JsAPIPay({orderNo: orderNo_global}).then(function (data) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                "appId" : data.dataList.appId,
                "timeStamp" : data.dataList.timeStamp,
                "nonceStr" : data.dataList.nonceStr,
                "package" : data.dataList.packageName,
                "signType" : data.dataList.signType,
                "paySign" : data.dataList.paySign
            }, function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    $.alert('支付成功').then(function () {
                        window.location.href = 'help_pay_success.html?orderNo=' + orderNo_global; // 跳转到 支付成功页面(帮TA交费)
                    });
                }else {
                    // 当自费或帮TA交费取消支付、或者支付失败时调用
                    $.ajax(League.path + '/bg/wechatPay/unlock', {data: {orderNo: orderNo_global}});
                    if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                        $.alert('支付取消');
                    }else {
                        $. alert('支付失败：'+ JSON.stringify(res));
                    }
                }
            });
        });
    });
});