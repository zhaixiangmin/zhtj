/**
 * Created by licong on 2018/5/30.
 */
$(function () {
    var oid = Utils.getQueryString('oid');
    var name = Utils.getQueryString('name'); // 组织名称
    $('#title_global').text(name);
    console.log('oid', oid);
    console.log('name', name);
    if(!oid) {
        $.alert('组织参数不能为空');
        return;
    }

    // 获取下级组织列表
    OrganizationApi.getSubOrgList({oid: oid}).then(function (data) {
        var list = data.dataList;
        var html = '';
        for(var i = 0; i < list.length; i++) {
            var item  = list[i];
            // html += '<li class="item" data-oid="' + item.oid + '">';
            html += '<li class="item" data-oid="' + item.oid + '" data-name="' + item.name + '">';
            html += '    <i class="icon"></i>';
            html += '    <div class="txt">' + item.name + '</div>';
            html += '</li>';
        }
        $('.box .list_box.organization .list').html(html);
    });

    // 获取组织的团干列表
    OrganizationApi.getTuanganList({oid: oid}).then(function (data) {
        var list = data.dataList;
        var html = '';
        for(var i = 0; i < list.length; i++) {
            var item  = list[i];
            html += '<li class="item" data-id="' + item.id + '">';
            html += '    <div class="img_box">';
            html += '        <img src="../../public/img/league-badge.png" class="avatar"/>';
            html += '    </div>';
            html += '    <div class="txt">' + item.name + '</div>';
            html += '</li>';
        }
        $('.box .list_box.cadre .list').html(html);
    });

    // 点击 组织
    $('.box .list_box.organization .list').on('click', '.item', function () {
        var oid = $(this).data('oid');
        var name = $(this).data('name');
        console.log('oid', oid);
        console.log('name', name);
        // window.location.href = '../organization/organization.html?oid=' + oid; // 组织列表页
        window.location.href = '../organization/organization.html?oid=' + oid + '&name=' + name; // 组织列表页
    });

    // 点击 团干
    $('.box .list_box.cadre .list').on('click', '.item', function () {
        var id = $(this).data('id');
        console.log('id', id);
        window.location.href = '../cadre/cadre_detail.html?id=' + id; // 团干详情页
    });
});