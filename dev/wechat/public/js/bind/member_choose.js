$(function () {
    var mid_choose_global = undefined; // 选择支部成员mid
    var mid_global = undefined; // 团员id(全局变量)
    if($.cookie && $.cookie('zhtj')) {
        var zhtj = JSON.parse($.cookie('zhtj'));
        console.log('zhtj', zhtj);
        if(!zhtj['mid']) {
            $.alert('团员参数不能为空').then(function () {
                window.location.href = 'phone_bind.html'; // 跳转到'登录手机号绑定'页面
            });
            return;
        }
        mid_global = zhtj['mid']; // 团员id(全局变量)

        if(!zhtj['chooseCount']) { // 选择次数
            $.alert('您共有两次机会选择团员验证方式，连续错误两次将终止此验证方式。');
        }else if(zhtj['chooseCount'] == 1) {
            $.alert('您共有两次机会选择团员验证方式，选项错误一次，你还有1次选择机会，请选择与你同一支部的成员。');
        }
    }

    var html = '';
    // 获取10个随机团员
    BindApi.getRandomMember({mid: mid_global}).then(function (data) {
        var list = data.dataList;
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            html += '<li class="list_item_checkbox" data-mid="' + item.id + '">' + item.name + '</li>';
        }
        $('.list_box').html(html);
    });

    // 点击 '单选框'(添加选中样式)
    $('.list_box').on('click', '.list_item_checkbox', function () {
        $(this).parent().find('.list_item_checkbox').removeClass('active');
        $(this).addClass('active');
    });

    /**
     * 保存信息到cookie
     */
    function saveToCookie(params_info, isClear) {
        // 存储到cookie(团员填写信息)
        if($.cookie) {
            var zhtj = {};
            if($.cookie('zhtj')) { // cookie已存在
                if(isClear) {
                    $.cookie('zhtj', null, {path: '/'}); // 删除cookie(zhtj)
                }else {
                    zhtj = JSON.parse($.cookie('zhtj'));
                }
            }
            for(var name in params_info) {
                zhtj[name] = params_info[name];
            }

            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
        }
    }

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    $('.bot_big_btn').click(function () {
        var chooseId = $('.list_box .list_item_checkbox.active').data('mid');
        if(!chooseId) {
            $.alert('请选择支部成员');
            return;
        }

        var params = {
            mid: mid_global, // 团员ID
            chooseId: chooseId // 选择的团员ID
        };

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('.bot_big_btn').css({opacity: 0.5});

        // 支部团员校验
        BindApi.chooseRandomMember(params).then(function (data) {
            if(data.status == 'ALERT') { // 选择错误
                if(mid_choose_global) { // 第二次选择
                    // 重复上一次选择
                    if(mid_choose_global == chooseId) {
                        $.alert('不能重复上一次选择，你还有1次选择机会，请选择与你同一支部的成员。');
                        return;
                    }

                    $.alert('你已两次选择错误，系统已禁止你使用此方式验证，请你选择其他方式更换号码，如登录原绑定账号后，在个人资料中自行编辑更改手机号。').then(function () {
                        if($.cookie && $.cookie('zhtj')) {
                            // $.cookie('zhtj', null, {path: '/'}); // 删除cookie(zhtj)

                            var zhtj = JSON.parse($.cookie('zhtj'));
                            var param_init = {
                                referrer: 'member_choose', // 上一页面来源
                                idCard: zhtj['idCard'] // 身份证号
                            };
                            saveToCookie(param_init, true); // 保存信息到cookie，并清空之前的数据
                            // saveToCookie({chooseCount: 2}); // 保存信息到cookie
                            window.location.href = '../information/registration_data_1.html'; // 跳转到'团员身份认证'页面
                        }
                    });
                    return;
                }

                // 第一次选择
                mid_choose_global = chooseId; // 设置选择支部成员mid
                $.alert('你的选项错误，你还有1次选择机会，请选择与你同一支部的成员。');
                saveToCookie({chooseCount: 1}); // 保存信息到cookie
                return;
            }

            // 选择正确
            var params_info = {
                chooseMid: $('.list_box .list_item_checkbox.active').data('mid'), // 选中团员ID
                chooseName: $('.list_box .list_item_checkbox.active').text() // 选中团员姓名
            };
            saveToCookie(params_info); // 保存信息到cookie
            window.location.href = 'phone_bind.html'; // 跳转到'登录手机号绑定'页面
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('.bot_big_btn').css({opacity: 1});
        });
    });
});