/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    // 团员已交团费查询
    FeeApi.getPaymentRecords({}).then(function (data) {
        var record = data.dataList;
        if(record) {
            $('#feePayable').text(record.feePayable); // 已交总金额
            $('#number').text(record.number); // 已交月数
            var html = '';
            if(record.details && record.details.length > 0) {
                for(var i=0; i<record.details.length; i++) {
                    var item = record.details[i];
                    html += '<a class="list_item self" href="javascript:;">';
                    html += '    <div class="item_inner clearfix">';
                    html += '        <div class="item_text clearfix">';
                    html += '            <div class="text_left">';
                    html += '                <p class="text">' + item.months + '</p>';
                    html += '            </div>';
                    html += '            <div class="text_left">';
                    // html += '                <div><span class="text1">焦雅婷</span><em class="tiny">本人</em></div>';
                    html += '                <div><span class="text1">' + item.payName + '</span></div>';
                    html += '                <p class="text2">' + item.payTime + '</p>';
                    html += '            </div>';
                    html += '            <div class="text_right"><span>' + item.fees + '</span>元</div>';
                    html += '        </div>';
                    html += '    </div>';
                    html += '</a>';
                }
                $('.list').html(html);
            }
        }
    });
});