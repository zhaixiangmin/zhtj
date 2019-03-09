/**
 * Created by licong on 2017/11/30.
 */
$(function () {
    var mid = Utils.getQueryString('mid'); // 组织id
    var auditStatus = Utils.getQueryString('auditStatus'); // 审核状态
    if(!mid || !auditStatus) {
        $.alert('参数不能为空');
        return;
    }

    var isClick = false; // 是否已点击(true：已点击，false：未点击)
    // 点击 '确定'
    $('#confirm').click(function () {
        var params = {
            mid: mid, // 团员id
            auditStatus: auditStatus == 1 ? 2 : 5, // 审核状态(1:报到待审核2:报到被退回,3:审核通过4:修改资料待审核,5:修改资料被退回)
            returnReason: $('#returnReason').val().trim() // 退回原因
        };
        if(!params.returnReason) {
            $.alert('请输入拒绝理由');
            return;
        }

        if(isClick) { // 若已点击
            return;
        }
        isClick = true; // 设置已点击 -- 是否已点击(true：已点击，false：未点击)
        $('#confirm').addClass('clicked'); // 设置样式(半透明)

        // 团员审核
        MemberApi.audit(params).then(function (data) {
           $.alert(data.msg).then(function () {
               window.location.href = 'data_audit.html'; // 资料审核 页面
           });
        }).always(function () {
            isClick = false; // 设置未点击 -- 是否已点击(true：已点击，false：未点击)
            $('#confirm').removeClass('clicked'); // 设置样式(半透明)
        });
    });
});