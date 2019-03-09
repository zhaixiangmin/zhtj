/**
 * Created by licong on 2017/11/30.
 */
$(function () {
    var rewardIds = Utils.getQueryString('rewardIds'); // 奖励ID
    if(!rewardIds) {
        $.alert('参数不能为空');
        return;
    }

    var isClick = false; // 是否已点击(true：已点击，false：未点击)
    // 点击 '确定'
    $('#confirm').click(function () {
        var result = $('#returnReason').val().trim();
        if(!result) {
            $.alert('请输入拒绝理由');
            return;
        }
        if(result.indexOf('@@') != -1) { // 不能包含特殊字符@@
            $.alert('不能包含特殊字符@@');
            return;
        }

        var rewardIdsArr = rewardIds.split('@@');
        var resultsArr = [];
        var returnReasonsArr = [];
        for(var i=0; i<rewardIdsArr.length; i++) {
            resultsArr.push(2); // 拒绝
            returnReasonsArr.push(result); // 退回原因
        }

        var params = {
            rewardIds: rewardIds, // 团员id
            results: resultsArr.join('@@'), // 多份审核结果(1-通过/同意，2-退回/拒绝))
            returnReasons: returnReasonsArr.join('@@') // 多份退回原因
        };

        if(isClick) { // 若已点击
            return;
        }
        isClick = true; // 设置已点击 -- 是否已点击(true：已点击，false：未点击)
        $('#confirm').addClass('clicked'); // 设置样式(半透明)

        // 团组织批量审核团员的多份奖励信息
        AwardsApi.rewardAudit(params).then(function (data) {
           $.alert(data.msg).then(function () {
               window.location.href = 'awards_audit.html'; // 资料审核 页面
           });
        }).always(function () {
            isClick = false; // 设置未点击 -- 是否已点击(true：已点击，false：未点击)
            $('#confirm').removeClass('clicked'); // 设置样式(半透明)
        });
    });
});