/**
 * Created by licong on 2018/5/29.
 */
$(function () {
    // 切换tab
    $('.up_box .tab_box li').click(function () {
        // 当前高亮，返回
        if($(this).hasClass('active')) {
            return;
        }

        var index = $('.up_box .tab_box li').index(this);
        console.log('index', index);
        $('.up_box .tab_box li').removeClass('active'); // 去除之前高亮按钮
        $(this).addClass('active'); // 高亮当前点击按钮
        $('.up_box .tab_content').hide();
        if(index == 0) { // 核心流程指引
            $('.up_box .tab_content.guide').show(); // 显示 核心流程指引 面板
        } else if(index == 1) { // 客服团队
            $('.up_box .tab_content.team').show(); // 显示 客服团队 面板
        } else if(index == 2) { // 我要吐槽
            $('.up_box .tab_content.roast_box').show(); // 显示 我要吐槽 面板
        }
    });

    // 点击'取消'按钮(我要吐槽)
    $('.cancel').click(function () {
        $('#roast').val(''); // 清空输入框(我要吐槽)
    });


    var isClick = false; // 是否点击(false：未点击，true：已点击)

    // 点击'确定'按钮(我要吐槽)
    $('.confirm').click(function () {

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
        $('.confirm').css({opacity: 0.5});

        // 新增吐槽
        HelpApi.tsukkomiAdd(params).then(function (data) {
            $.alert(data.msg).then(function () {
                $('#roast').val(''); // 清空输入框(我要吐槽)
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('.confirm').css({opacity: 1});
        });
    });
});