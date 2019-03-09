/**
 * Created by licong on 2017/12/17.
 */
$(function () {
    var type = Utils.getQueryString('type');
    var mid = Utils.getQueryString('mid');
    var params = {
        memberId: mid, // 团员ID
        keywords: undefined // 组织名称
    };


    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 获取组织列表
        AwardsApi.getAuditOrgTree(params).then(function (data) {
            console.log('AwardsApi.getAuditOrgTree data', data);
            var list = data.dataList;
            var html = '';

            Utils.showDataWithFilter(params, list, isClear); // 显示数据(有筛选条件，没数据就显示没数据)

            for(var i=0; i<list.length; i++) {
                var item = list[i];
                html += '<li class="ul_li" data-id="' + item.oid + '">' + item.fullName + '</li>';
            }
            $('.ul').html(html);

        });
    }

    renderList(); // 渲染页面列表(初始化页面)

    // 点击 搜索 图标
    $('#confirm').click(function () {
        isAll_global = false; // 设置为 全部数据尚未加载完毕 -- 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
        params.keywords = $('#keyword').val().trim();
        renderList(true); // 渲染页面列表
    });

    // 点击选中项(所在团支部)
    $('.ul').on('click', 'li', function () {
        var oid = $(this).data('id');
        var oidName = $(this).text();

        // 存储到cookie(奖惩信息)
        if($.cookie && $.cookie('zhtj_awards')) {
            var zhtj_awards = JSON.parse($.cookie('zhtj_awards'));

            if(type == 'edit') { // 编辑获奖信息(上一页面)
                zhtj_awards['auditOrgId'] = oid;
                zhtj_awards['auditOrgName'] = oidName;
            }else {
                zhtj_awards['auditOrgIds'] = oid;
                zhtj_awards['auditOrgNames'] = oidName;
            }

            $.cookie('zhtj_awards', JSON.stringify(zhtj_awards), {path: '/'}); // 存储到cookie
            // window.location.href = 'add_awards.html'; // 跳转
            window.history.back(); // 返回上一页
        }
    });
});