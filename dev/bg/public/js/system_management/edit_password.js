/**
 * Created by licong on 2017/9/22.
 */
$(function () {
    // 点击'确定'
    $('#submit').click(function () {
        var validateFlag = $('#fm').validate({
            rules: {
                'oldPassword': {
                    required: true
                },
                'newPassword': {
                    required: true,
                    checkPassword: true
                },
                'newPasswordConfirm': {
                    required: true,
                    checkPassword: true
                }
            },
            messages: {
                'oldPassword': {
                    required: '请输入原密码'
                },
                'newPassword': {
                    required: '请输入新密码'
                },
                'newPasswordConfirm': {
                    required: '请输入确认新密码'
                }
            },
            errorPlacement:function(error,element) { // 自定义错误放到哪里
                error.appendTo(element.parents("tr"));
            }
        }).form(); // 验证表单，填写信息是否完整
        if (!validateFlag) { // 表单填写未完成
            return;
        }

        var newPasswordConfirm = $('#newPasswordConfirm').val().trim(); // 确认新密码
        var params = {
            oldPassword: $('#oldPassword').val().trim(), // 原密码
            newPassword: $('#newPassword').val().trim() // 新密码
        };

        if(newPasswordConfirm != params.newPassword) {
            $.alert('新密码与确认新密码不一致');
            return;
        }

        // 修改密码
        SystemManagementApi.modifyPassWord(params).then(function (data) {
            $.alert(data.msg).then(function () {
                parent.window.location.href = '../../index.html'; // 跳转到登录页面
                // $('#fm').form('clear'); // 清除表单数据
            });
        });
    })
});