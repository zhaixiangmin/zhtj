/**
 * Created by licong on 2018/1/19.
 */


$(function () {
    var otid_global = Utils.getQueryString('otid'); // 转接记录id(全局变量)
    if(!otid_global) {
        $.alert('转接记录参数不能为空');
        return;
    }

    var interval_global = undefined; // 计数器对象(全局变量)
    var second_global = 60; // 倒数秒数(全局变量)

    // 我的认证资料
    League.MyProfile({}).then(function (data) {
        var myData = data.rows;
        $('#phone').text(myData.mobile); // 手机号码
        // startCount(second_global); // 开始数秒
    });

    // 我的发起详细
    RelationApi.auditList({otid: otid_global}).then(function (data) {
        var apply = data.ApplyList[0]; // 基本资料
        $('#primalName').text(apply.primalName); // 转出支部
        $('#newName').text(apply.newName); // 接收支部
    });

    // 计数器计数
    function timeCount(second) {
        interval_global = setInterval(function () {
            var $span = $('.code_count span'); // 倒数秒数选择器
            var current_sec = $span.text(); // 当前秒数
            if(current_sec <= 1) {
                clearInterval(interval_global); // 停止计数器
                $('.code_count').hide(); // 隐藏 倒数文本
                $('.code_txt').text('重发验证码').show(); // 显示 '重发验证码'
                return;
            }
            $span.text(--current_sec); // 渲染秒数选择器
        }, 1000);
    }

    var isClick_code = false; // 是否点击重发验证码(false：未点击，true：已点击)
    // 开始数秒
    function startCount(second) {
        var phone = $('#phone').text();
        if(!phone) {
            $.alert('手机号码不能为空');
            return;
        }

        if(isClick_code) { // 已点击
            return;
        }
        isClick_code = true; // 设置为 已点击
        $('.code_txt').css({opacity: 0.5});
        // 发送验证码接口
        RelationApi.createSecurityCodeSend({phone: phone}).then(function () {
            $('.code_txt').hide(); // 隐藏 '重发验证码'
            $('.code_count span').text(second); // 初始化秒数
            timeCount(second); // 计数器计数
            $('.code_count').show(); // 显示 倒数文本
        }).always(function () {
            isClick_code = false; // 设置为 未点击
            $('.code_txt').css({opacity: 1});
        });
    }


    // 点击'重发验证码'
    $('.code_txt').click(function () {
        startCount(second_global); // 开始数秒
    });

    // 点击 '不再使用，需要更换号码'
    $('.tips_bottom').click(function () {
        window.location.href = League.url_qnzs + '/wechat/view/person_center/edit_phone.html?url=' + window.location.href; // 跳转 '青年之声-个人资料编辑' 页面
    });

    // 点击'再考虑下'
    $('#refuse').click(function () {
        window.location.href = '../../index.html'; // 跳转到首页
    });

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击'提交'
    $('#confirm').click(function () {
        var params = {
            otid: otid_global, // 转接id
            phone: $('#phone').text(), // 手机号码
            phoneCode: $('#phoneCode').val().trim() // 手机验证码
        };

        if(!params.phone) {
            $.alert('手机号码不能为空');
            return;
        }
        if(!params.phoneCode) {
            $.alert('请输入验证码');
            return;
        }

        // 测试数据
        // params.mid = 4551805;
        // params.type = 2;
        console.log('confirm params', params);
        console.log('输入验证码成功');

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});

        // 组织转接号码验证
        RelationApi.phoneValidateCode(params).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = '../../index.html'; // 跳转 首页
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });

    });
});