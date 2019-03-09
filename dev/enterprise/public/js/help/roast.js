/**
 * Created by licong on 2018/5/29.
 */
$(function () {
    var isClick = false; // 是否点击(false：未点击，true：已点击)

    // 点击'提交'
    $('#confirm').click(function () {
        var params = {
            type: 0, // 组织(0：组织；1：团员)
            content: $('#roast').val().trim()
        };

        if(!params.content) {
            $.alert('请说下您对智慧团建系统的看法吧');
            return;
        }

        if(params.content.getRealLen() < 20) {
            $.alert('请至少输入十个中文字');
            return;
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});

        // 新增吐槽
        MemberApi.tsukkomiAdd(params).then(function (data) {
            $.alert(data.msg).then(function () {
                window.history.back(); // 返回上一页
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});