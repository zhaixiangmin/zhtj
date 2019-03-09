/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    var orderNo_global = Utils.getQueryString('orderNo'); // 订单号(全局变量)
    if(!orderNo_global) {
        $.alert('订单参数不能为空');
        return;
    }

    // 订单查询
    FeeApi.getOrderInfo({orderNo: orderNo_global}).then(function (data) {
        var orderInfo = data.dataList;
        $('#amount').text(orderInfo.amount); // 已交团费
        $('#orderDesc').text(orderInfo.orderDesc); // 已交团费
    });
});