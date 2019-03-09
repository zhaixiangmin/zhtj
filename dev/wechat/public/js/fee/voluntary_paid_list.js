/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    // 自愿多交历史记录查询
    FeeApi.getDonateRecords({}).then(function (data) {
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
                    html += '                <p class="text1">' + item.payName + '</p>';
                    html += '                <p class="text2">' + item.payTime + '</p>';
                    html += '            </div>';
                    html += '            <div class="text_right"><span>' + item.fees + '</span>元</div>';
                    html += '        </div>';
                    html += '    </div>';
                    html += '</a>';
                }
                $('.list').html(html);
            }
        }else { // 查询无记录时
            $('#feePayable').text(0); // 已交总金额
            $('#number').text(0); // 已交月数
        }
    });
});