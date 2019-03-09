/**
 * Created by licong on 2017/9/22.
 */
$(function () {
    var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)
    if(account_global) {
        var enterpriseName =  account_global.enterpriseName ? account_global.enterpriseName : '暂无信息';
        $('#oldEnterpriseName').val(enterpriseName); // 原企业微信名称
    }

    // // 当前登录信息
    // League.getSessionAccount({}).then(function (data) {
    //     var account = data.account;
    //     if(account) {
    //         var enterpriseName =  account.enterpriseName ? account.enterpriseName : '暂无信息';
    //         $('#oldEnterpriseName').val(enterpriseName); // 原企业微信名称
    //     }
    // });

    // 点击'企业微信名称-填写规则'
    $('.enterpriseName_rules').click(function () {
        $('#dialog_rules_enterpriseName').dialog('open'); // 弹出对话框
    });

    // 点击'确定'
    $('#submit').click(function () {
        var validateFlag = $('#fm').validate({
            rules: {
                'enterpriseName': {
                    required: true,
                    checkSpecialSymbol: true
                }
            },
            messages: {
                'enterpriseName': {
                    required: '请输入新企业微信名称'
                }
            },
            errorPlacement:function(error,element) { // 自定义错误放到哪里
                error.appendTo(element.parents("tr"));
            }
        }).form(); // 验证表单，填写信息是否完整
        if (!validateFlag) { // 表单填写未完成
            return;
        }

        var params = {
            enterpriseName: $('#enterpriseName').val().trim() // 新企业微信名称
        };

        // 企业微信名称保存
        SystemManagementApi.saveEnterpriseName(params).then(function (data) {
            $.alert(data.msg).then(function () {
                // 当前登录信息
                League.getSessionAccount({}).then(function (data) {
                    var account = data.account;
                    if(account) {
                        parent.window.zhtj_session = account; // 更新当前登录用户信息(全局变量)
                        window.location.reload(); // 刷新当前页面
                    }
                });
            });
        });
    })
});