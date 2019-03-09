/**
 * Created by licong on 2017/12/18.
 */
$(function () {
    var tid = Utils.getQueryString('tid');
    if(!tid) {
        $.alert('团干参数不能为空');
        return;
    }

    // 获取团干身份
    IdentityApi.chooseOrg({tid: tid}).then(function (data) {
        var list = data.dataList;
        var html = '';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            html += '<li class="item" data-oid="' + item.oid + '">' + item.fullName + '</li>';
            // html += '<li class="item""><a href="confirm_identity.html?tid=' + tid + '&oid=' + item.oid + '">' + item.fullName + '</a></li>';
        }
        $('.list').html(html);
    });

    // 点击 '选中项'
    $('.list').on('click', '.item', function () {
        var oid = $(this).data('oid');
        // 多重工作身份登录
        window.location.href = Enterprise.path + '/enterprise/multipleIdentitiesLogin?tid=' + tid + '&oid=' + oid; // 多重工作身份登录
    });

});