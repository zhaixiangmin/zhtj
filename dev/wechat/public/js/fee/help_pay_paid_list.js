/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    // 获取帮TA交费记录
    FeeApi.getOrgPaymentRecords({}).then(function (data) {
        console.log('FeeApi.getOrgPaymentRecords data', data);
        var record = data.dataList;
        if(record) {
            $('#feePayable').text(record.feePayable); // 已交总金额
            $('#number').text(record.number); // 已交月数
            var html = '';
            if(record.details && record.details.length > 0) {
                for(var i=0; i<record.details.length; i++) {
                    var item = record.details[i];
                    html += '<a class="list_item num8" href="help_pay_paid_detail.html?orderNo=' + item.orderNo + '">';
                    html += '    <div class="item_inner clearfix">';
                    html += '        <div class="item_text clearfix">';
                    html += '            <div class="text_left">' + item.payTime + '</div>';
                    html += '            <div class="text_right">' + item.fees + '元</div>';
                    html += '        </div>';
                    html += '    </div>';
                    html += '</a>';
                }
                $('.list').html(html);
            }
        }else {
            $('#feePayable').text(0); // 已交总金额
            $('#number').text(0); // 已交月数
        }
    });
});