/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    // 团员未交团费查询
    FeeApi.getBill({}).then(function (data) {
        var fee = data.dataList;
        $('#feePayable').text(fee.feePayable); // 应交金额
        if(fee.number) {
            $('#number span').text(fee.number); // 未交月数
            $('#number').show(); // 显示欠费提示语
        }
    });

    // 点击 '费用大图'
    $('#unpaid_list').click(function () {
        window.location.href = 'unpaid_list.html';
    });
});