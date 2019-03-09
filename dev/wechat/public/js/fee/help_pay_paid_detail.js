/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    var orderNo_global = Utils.getQueryString('orderNo'); // 订单号(全局变量)
    if(!orderNo_global) {
        $.alert('订单参数不能为空');
        return;
    }

    // 订单详情查询(查看帮TA交费记录)
    FeeApi.getOrderInfoDetails({orderNo: orderNo_global}).then(function (data) {
        console.log('FeeApi.getOrderInfoDetails data', data);
        var info = data.dataList;
        $('#amount').text(info.amount); // 金额
        $('#dealTime').text(info.dealTime); // 支付时间
        $('#number').text(info.number); // 交费成员人数
        if(info.details && info.details.length > 0) {
            var html = '';
            for(var i=0; i<info.details.length; i++) {
                var item = info.details[i];
                html += '<a class="list_item" href="javascript:;">';
                html += '    <div class="item_inner clearfix">';
                html += '        <div class="item_text clearfix">';
                html += '            <div class="text_left">' + item.name + '</div>';
                html += '            <div class="text_right">' + item.feePayable + '元</div>';
                html += '        </div>';
                html += '    </div>';
                html += '</a>';
            }
            $('.list').html(html);
        }
    });
});