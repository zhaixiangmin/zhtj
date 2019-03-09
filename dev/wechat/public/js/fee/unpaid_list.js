/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    // 团员未交团费查询
    FeeApi.getBill({}).then(function (data) {
        var fee = data.dataList;
        var list = data.dataList.details; // 未交团费列表
        $('#feePayable').text(fee.feePayable); // 应交金额
        if(fee.number) {
            $('#number span').text(fee.number); // 未交月数
            $('#number').show(); // 显示欠费提示语
        }

        var html = '';
        for(var i=0; i<list.length; i++) {
            var item = list[i];

            html += '<a class="list_item" href="javascript:;">';
            html += '    <div class="item_inner clearfix">';
            html += '        <div class="item_text clearfix">';
            html += '            <div class="text_left">';
            // html += '                <p class="text1 fl">八月</p>';
            html += '                <p class="text1 fl">' + item.months + '</p>';
            html += '                <p class="text2 fl">团费</p>';
            html += '            </div>';
            html += '            <div class="text_right">' + item.fees + '元</div>';
            html += '        </div>';
            html += '    </div>';
            html += '</a>';
        }
        $('.fee_list').html(html);
    });

});