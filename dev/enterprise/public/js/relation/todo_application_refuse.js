/**
 * Created by licong on 2018/1/24.
 */
$(function () {
    var params = { // 申请数据对象(全局变量)
        mid: Utils.getQueryString('mid'), // 团员ID
        otid: Utils.getQueryString('otid'), // 组织转接申请id
        otaid: Utils.getQueryString('otaid'), // 组织转接审核记录id
        // primalPid: Utils.getQueryString('primalPid'), // 原组织上级id
        // newPid: Utils.getQueryString('newPid'), // 新组织上级id
        auditStatus: 2  // 退回 -- 审核状态(1:同意，2：退回)
    };

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击 '确定'按钮
    $('#confirm').click(function () {
        params.returnReason = $('#returnReason').val().trim();
        if(!params.returnReason) {
            $.alert('请输入拒绝理由');
            return;
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});

        // 组织转接审核
        RelationApi.audit(params).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = 'todo_application.html'; // 跳转到 待审核页面
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});