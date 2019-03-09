/**
 * Created by licong on 2018/6/1.
 */
$(function () {
    /**
     * 渲染列表(成员/部门)
     */
    function render() {
        var type = $('.box .tab_box .tab span.active').data('type');
        console.log('render type', type);
        var params = {
            type: $('.box .tab_box .tab span.active').data('type'), // 搜索类型(0：组织；1：团干)
            keyword: $('.box .input_box input').val().trim()
        };
        
        $('.box .list_box .list').html(''); // 清空列表(成员/部门)
        $('.box .tips').hide(); // 隐藏提示
        if(params.keyword) { // 关键词不为空
            $('.box .tips.loading').show(); // 显示提示(加载中)
        }
        
        // 搜索通讯录
        CadreApi.search(params).then(function (data) {
            $('.box .tips').hide(); // 隐藏提示
            var list = data.dataList;
            if(!list) { // 输入框为空(删除输入框文字)
                return;
            }
            // 当前搜索部门且部门无数据/当前搜索成员且成员无数据
            if ((!list.Organization && type == 0) || (!list.Member && type == 1)) {
                $('.box .tips.not_found').show(); // 显示提示(找不到搜索结果)
                return;
            }

            if (list.Organization) { // 存在组织
                var organizations = list.Organization;
                var html = '';
                for (var i = 0; i < organizations.length; i++) {
                    var organization = organizations[i];
                    html += '<li class="item" data-oid="' + organization.oid + '" data-name="' + organization.name + '">';
                    html += '    <i class="icon"></i>';
                    html += '    <div class="txt">' + organization.name + '</div>';
                    html += '</li>';
                }
                $('.box .list_box.organization .list').html(html);
            }
            if (list.Member) { // 存在成员
                var members = list.Member;
                var html = '';
                for (var i = 0; i < members.length; i++) {
                    var member = members[i];
                    var department = '';
                    if (member.incumbentList && member.incumbentList.length > 0) {
                        var incumbent = member.incumbentList[0];
                        department = incumbent.split('-')[0];
                    }
                    html += '<li class="item" data-id="' + member.id + '">';
                    html += '    <div class="img_box">';
                    // html += '        <img src="../../public/img/league-badge.png" class="avatar"/>';
                    html += '        <img src="../../public/img/league-badge.png" class="avatar"/>';
                    html += '    </div>';
                    html += '    <div class="info_box">';
                    html += '       <div class="name">' + member.name + '</div>';
                    html += '       <div class="department">' + department + '</div>';
                    html += '    </div>';
                    html += '</li>';
                }
                $('.box .list_box.cadre .list').html(html);
            }
        });
    }
    
    
    // 点击 切换按钮
    $('.box .tab_box .tab span').click(function () {
        if($(this).hasClass('active')) { // 当前已是选中状态，直接返回
            return;
        }

        $(this).toggleClass('active').siblings().toggleClass('active'); // 切换当前选中按钮
        var type = $(this).data('type'); // 当前选中的类型
        console.log('type', type);
        render(); // 渲染列表(成员/部门)
    });

    // 自动检测输入框
    $('.box .search_box .input_box input').bind('input propertychange', function() {
        var val = $(this).val();
        console.log('val', val);
        render(); // 渲染列表(成员/部门)
    });

    // 点击'x'图标
    $('.box .search_box .input_box .cancel_icon').click(function () {
        $('.box .search_box .input_box input').val(''); // 清空输入框
    });

    // 点击 组织
    $('.box .list_box.organization .list').on('click', '.item', function () {
        var oid = Utils.returnValidString($(this).data('oid'));
        var name = $(this).data('name');
        var nameOidList = ['共青团中央@'];
        nameOidList.push(name + '@' + oid);
        var nameOidStr = nameOidList.join(',');
        window.location.href = '../../index.html?oid=' + oid + '&name=' + nameOidStr; // 组织列表页
    });

    // 点击 团干
    $('.box .list_box.cadre .list').on('click', '.item', function () {
        var id = $(this).data('id');
        window.location.href = './cadre_detail.html?id=' + id; // 团干详情页
    });

});