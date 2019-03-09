/**
 * Created by licong on 2017/10/25.
 */
$(function () {
    if($.cookie && $.cookie('zhtj')) {
        var zhtj = JSON.parse($.cookie('zhtj'));
        console.log('zhtj', zhtj);
        if(!zhtj['phone'] || !zhtj['idCard']) { // 不是从'团员身份认证'页面进来(避免分享链接或直接打开该链接进来)
            $.alert('参数不能为空').then(function () {
                window.location.href = '../information/registration_data_1.html'; // 跳转到'团员身份认证'页面
            });
            return;
        }
        $('#phone').text(zhtj['phone']);
        $('#name').find('input').val(zhtj['name']); // 姓名
        $('#idCard').find('.right_txt').text(zhtj['idCard']); // 身份证
        // 入团年月
        $('#leagueForYears').find('.arrow').text(zhtj['leagueForYears']);
        if(zhtj['oidIsChosen']) { // 已选择团支部
            // 所在团支部ID/名称
            $('#oid').find('.arrow').text(zhtj['oidName']).data('id', zhtj['oid']);
        }
        if(zhtj['chooseCount'] && zhtj['chooseCount'] == 2) { // 两次选择支部成员错误
            $('#headfor').find('.checkbox_label[data-id="1"]').data('disable', 'true'); // 设置禁止使用(支部团员验证)
        }
        if(zhtj['chooseMid']) { // 选中支部团员
            // $('#headfor').find('.checkbox_label[data-id="1"]').addClass('active'); // 选中单选框（支部团员验证）
            $('#headfor').hide(); // 隐藏验证方式
            $('#chooseMember').data('mid', zhtj['mid']); // 团员id（支部团员验证）
            $('#chooseMember').data('chooseid', zhtj['chooseMid']); // 选中团员id（支部团员验证）
            $('#chooseMember').text(zhtj['chooseName']); // 团员名称（支部团员验证）
            $('#chooseMember').parent().show(); // 显示
        }
    }else { // 不是从'团员身份认证'页面进来(避免分享链接或直接打开该链接进来)
        $.alert('参数不能为空').then(function () {
            window.location.href = '../information/registration_data_1.html'; // 跳转到'团员身份认证'页面
        });
        return;
    }

    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        return false; // 防止冒泡事件
    });


    // 点击遮罩层(弹出框)
    $('.select_popup').click(function () {
        $('.select_popup').fadeOut(150); // 关闭弹出框
    });

    // 初始化日期选择器
    (function initDateSelect() {
        var currentYear = new Date().getFullYear();
        var html = '';
        var html_month = '';
        for(var i=0; i<50; i++) {
            var year = currentYear - i;
            html += '<li class="select_item_pair">' + year + '</li>';
        }
        for(var j=1; j<13; j++) {
            var month = j;
            if(month<10) {
                month = '0' + month;
            }
            html_month += '<li class="select_item_pair">' + month + '</li>';
        }
        $('.select_popup_pair .select_list_pair.select_list_pair_left').html(html); // 年份
        $('.select_popup_pair .select_list_pair.select_list_pair_right').html(html_month); // 月份
    })();

    // 点击 '入团年月'(弹出日期插件)
    $('#leagueForYears').click(function () {
        var text = $(this).attr('id');
        if(!text) {
            return;
        }

        $('.select_popup_pair').show(); // 显示日期选择器
    });

    // 点击选中项(选择弹出框 - 两边)
    $('.select_popup_pair .select_list_pair').on('click', '.select_item_pair', function(event) {
        var isLeft = $(this).parent().hasClass('select_list_pair_left');
        if(isLeft) { // 当前是左边(年份)
            if($(this).hasClass('active')) { // 当前项已选中
                return;
            }
            $(this).siblings().removeClass('active'); // 去除上一次选中样式
            $(this).addClass('active'); // 高亮当前选中项
        } else{
            var year = $('.select_popup_pair .select_list_pair.select_list_pair_left .select_item_pair.active').text(); // 年份
            if(!year) {
                return false; // 防止冒泡事件
            }
            var month = $(this).text(); // 月份
            if(new Date(year + '-' + month).getTime() > new Date().getTime()) {
                $.alert('选择时间不能大于当前时间');
                return false;
            }

            $('#leagueForYears').find('.arrow').text(year + '-' + month);

            $('.select_popup_pair').fadeOut(150); // 隐藏选择弹出框 -- 两边
        }

        return false; // 防止冒泡事件
    });

    // 点击遮罩层(弹出框 -- 两边)
    $('.select_popup_pair').click(function () {
        $('.select_popup_pair').fadeOut(150); // 关闭弹出框
    });

    // 点击'所在团支部'(弹出框)
    $('#oid').click(function(event) {
        saveToCookie(); // 保存到cookie
        window.location.href = 'branch_search.html'; // 团支部选择 页面
    });

    /**
     * 保存到cookie
     */
    function saveToCookie(params) {
        // 存储到cookie(团员填写信息)
        if($.cookie) {
            var zhtj = {};
            if($.cookie('zhtj')) { // cookie已存在
                zhtj = JSON.parse($.cookie('zhtj'));
            }
            var params_info = {
                name: $('#name').find('input').val().trim(), // 姓名
                idCard: $('#idCard').find('.right_txt').text(), // 身份证
                leagueForYears: $('#leagueForYears').find('.arrow').text(), // 入团年月
                oid: $('#oid').find('.arrow').data('id'), // 所在团支部ID
                oidName: $('#oid').find('.arrow').text() // 所在团支部名称
            };
            for(var name in params_info) {
                zhtj[name] = params_info[name];
            }
            if(params) {
                for(var name in params) {
                    zhtj[name] = params[name];
                }
            }

            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
        }
    }

    // 点击 '单选框'(添加选中样式)
    $('.checkbox_label').click(function () {
        var params_info = {
            name: $('#name').find('input').val().trim(), // 姓名
            idCard: $('#idCard').find('.right_txt').text().toUpperCase(), // 身份证
            leagueForYears: $('#leagueForYears').find('.arrow').text(), // 入团年月
            oid: $('#oid').find('.arrow').data('id') // 所在团支部ID
        };

        if(!params_info.name) {
            $.alert('请输入你的真实姓名');
            return;
        }
        if(!params_info.leagueForYears || params_info.leagueForYears == '请选择') {
            $.alert('请选择入团年月');
            return;
        }
        if(!params_info.oid) {
            $.alert('请选择所在团支部');
            return;
        }

        // 验证团员是否存在
        BindApi.existMember(params_info).then(function (data) {
            var data = data.dataList;
            if(data) {
                saveToCookie({mid: data.mid }); // 保存到cookie
                window.location.href = 'member_choose.html'; // 跳转页面(选择支部成员)
            }
        });
    });

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击 '下一步' 按钮
    $('.bot_big_btn').click(function () {
        var params = {
            mid: $('#chooseMember').data('mid'), // 团员id（支部团员验证）
            name: $('#name').find('input').val().trim(), // 姓名
            idCard: $('#idCard').find('.right_txt').text().toUpperCase(), // 身份证
            leagueForYears: $('#leagueForYears').find('.arrow').text(), // 入团年月
            oid: $('#oid').find('.arrow').data('id'), // 所在团支部ID
            chooseId: $('#chooseMember').data('chooseid') // 选中团员id（支部团员验证）
        };

        if(!params.name) {
            $.alert('请输入你的真实姓名');
            return;
        }
        if(!params.leagueForYears || params.leagueForYears == '请选择') {
            $.alert('请选择入团年月');
            return;
        }
        if(!params.oid) {
            $.alert('请选择所在团支部');
            return;
        }
        if(!params.chooseId) { // 支部团员验证
            $.alert('请选择支部团员验证');
            return;
        }

        console.log('.bot_big_btn params', params);

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('.bot_big_btn').css({opacity: 0.5});
        // 修改团员映射
        BindApi.memberInfoRebinding(params).then(function (data) {
            $.alert(data.msg).then(function () {
                if($.cookie && $.cookie('zhtj')) {
                    $.cookie('zhtj', null, {path: '/'}); // 删除cookie(zhtj)
                }
                window.location.href = '../../index.html'; // 跳转到'首页'
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('.bot_big_btn').css({opacity: 1});
        });

    });
});