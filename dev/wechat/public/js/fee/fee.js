/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    // 团员未交团费查询
    FeeApi.getBill({}).then(function (data) {
        var fee = data.dataList;
        $('#feePayable').text(fee.feePayable); // 应交金额
        if(fee.number) { // 不等于0
            $('#number span').text(fee.number); // 未交月数
            $('#number').show(); // 显示欠费提示语
        }
    });

    // 我的认证资料
    League.MyProfile({}).then(function (data) {
        var myData = data.rows;

        // myData.fullName = '非共青团广东省委所辖的团组织'; // 测试省外
        if(myData.fullName != '非共青团广东省委所辖的团组织' && myData.fullName != '省外组织') { // 省外组织(不能操作团费相关业务)
            $('#help_pay').show(); // 显示“帮TA交费”
        }

    });

    // 点击 '费用大图'
    $('#unpaid_list').click(function () {
        window.location.href = 'unpaid_list.html';
    });

    // 点击 '立即交费'
    $('#confirm').click(function () {
        // 创建订单
        FeeApi.createOrder({}).then(function (data) {
            var order = data.dataList;
            if(order && order.orderNo) {
                window.location.href = 'fee_confirm.html?orderNo=' + order.orderNo + '&orderDesc=' + order.orderDesc; // 交纳确认 页面
            }
        });
    });

});