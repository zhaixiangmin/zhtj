/**
 * Created by licong on 2018/8/7.
 */
$(function () {
    var otid = Utils.getQueryString('otid'); // 组织转接记录id
    console.log('otid', otid);
    if(!otid) {
        $.alert('组织转接参数不能为空');
        return;
    }


    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击 '确定'按钮
    $('#confirm').click(function () {
        var params = {
            otid: otid, // 组织转接申请id
            reasonForWithdrawal: $('#reasonForWithdrawal').val().trim() // 撤回原因
        };

        if(!params.reasonForWithdrawal) {
            $.alert('请输入撤回原因');
            return;
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});

        // 组织转接撤回
        RelationApi.withdraw(params).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = 'my_application.html'; // 跳转到 转接发起记录 页面
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});