/**
 * Created by licong on 2018/5/30.
 */
$(function () {
    var oid_global = Utils.getQueryString('oid');
    // oid_global = Utils.returnValidString(oid_global);
    var name = Utils.getQueryString('name'); // 组织名称
    if(name) {
        var html_header = '';
        var nameOidList = name.split(',');
        for(var i= 0; i < nameOidList.length; i++) {
            var nameOidItem = nameOidList[i];
            var nameOidArr = nameOidItem.split('@');
            if(i == 0) {
                html_header += '<span>' + nameOidArr[0] + '</span>';
            }else {
                html_header += '<i>&nbsp;&gt;&nbsp;</i><span data-oid="' + nameOidArr[1] + '">' + nameOidArr[0] + '</span>';
            }
        }
        $('.box .header').html(html_header);
    }

    // 点击 头部索引
    $('.box .header').on('click', 'span', function () {
        if($(this).is($('.box .header span:last-child'))) { // 当前元素，直接返回
            return;
        }

        var name = $(this).text();
        var oid = Utils.returnValidString($(this).data('oid'));
        var $prev_span = $(this).prevAll('span');
        var nameOidList = [];
        $prev_span.each(function () {
            var nameOidItem = $(this).text();
            var oidItem = Utils.returnValidString($(this).data('oid'));
            nameOidList.unshift(nameOidItem + '@' + oidItem);
        });

        nameOidList.push(name + '@' + oid);
        var nameOidStr = nameOidList.join(',');
        window.location.href = './index.html?oid=' + oid + '&name=' + nameOidStr; // 组织列表页
    });

    // 获取下级组织列表
    IndexApi.getSubOrgList({oid: oid_global}).then(function (data) {
        var list = data.dataList;
        var html = '';
        for(var i = 0; i < list.length; i++) {
            var item  = list[i];
            html += '<li class="item" data-oid="' + item.oid + '" data-name="' + item.name + '">';
            html += '    <i class="icon"></i>';
            html += '    <div class="txt">' + item.name + '</div>';
            html += '</li>';
        }
        $('.box .list_box.organization .list').html(html);
    });

    // 获取组织的团干列表
    IndexApi.getTuanganList({oid: oid_global}).then(function (data) {
        var list = data.dataList;
        var html = '';
        for(var i = 0; i < list.length; i++) {
            var item  = list[i];
            html += '<li class="item" data-id="' + item.id + '">';
            html += '    <div class="img_box">';
            html += '        <img src="public/img/league-badge.png" class="avatar"/>';
            html += '    </div>';
            html += '    <div class="txt">' + item.name + '</div>';
            html += '</li>';
        }
        $('.box .list_box.cadre .list').html(html);
    });

    // 点击 组织
    $('.box .list_box.organization .list').on('click', '.item', function () {
        var oid = Utils.returnValidString($(this).data('oid'));
        var name = $(this).data('name');
        var nameOidList = [];
        $('.box .header span').each(function () {
            var nameOidItem = $(this).text();
            var oidItem = Utils.returnValidString($(this).data('oid'));
            nameOidList.push(nameOidItem + '@' + oidItem);
        });
        nameOidList.push(name + '@' + oid);
        var nameOidStr = nameOidList.join(',');
        window.location.href = './index.html?oid=' + oid + '&name=' + nameOidStr; // 组织列表页
    });

    // 点击 团干
    $('.box .list_box.cadre .list').on('click', '.item', function () {
        var id = $(this).data('id');
        window.location.href = 'view/cadre/cadre_detail.html?id=' + id; // 团干详情页
    });
});