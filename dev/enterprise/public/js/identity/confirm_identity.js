/**
 * Created by licong on 2017/12/18.
 */
$(function () {
    // 获取团干身份
    IdentityApi.getOrgName({}).then(function (data) {
        var data = data.dataList;
        $('#fullName').text(data.fullName); // 组织全称
        $('#name').text(data.name); // 组织简称
    });

    // 点击 '确定' 按钮
    $('#confirm').click(function () {
        var enterpriseName = $('#enterpriseName').val().trim();
        if(!enterpriseName) {
            $.alert('请输入企业代号');
            return;
        }
        if(!Utils.checkSpecialSymbol(enterpriseName)) {
            $.alert('企业代号不能含有特殊字符\\:?”\'<>|和空格');
            return;
        }
        // 企业微信名称保存
        IdentityApi.saveEnterpriseName({enterpriseName: enterpriseName}).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = '../../index.html'; // 跳转到 首页
            });
        });
    });

});