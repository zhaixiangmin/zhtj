/**
 * Created by licong on 2017/12/6.
 */
$(function () {
    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)

    var params = {
        fullName: undefined, // 组织名称
        page: 1, // 当前页
        rows: 5 // 每页显示条数
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 获取组织列表
        RelationApi.getOrgByName(params).then(function (data) {
            console.log('RelationApi.getOrgByName data', data);
            var list = data.rows;
            var html = '';

            Utils.showDataWithFilter(params, list, isClear); // 显示数据(有筛选条件，没数据就显示没数据)

            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var orgName = item.name + '（' + item.fullName + '）';
                orgName = Utils.returnSearchHighlightText(orgName, params.fullName);

                html += '<li class="ul_li" data-id="' + item.oid + '">' + orgName + '</li>';

                // html += '<li class="ul_li" data-id="' + item.oid + '">' + name + '</li>';
            }

            if(isClear) {
                $('.ul').html(html);
            }else {
                $('.ul').append(html);
            }

            if(list.length < params.rows) {
                isAll_global = true; // 设置为 全部数据加载完毕
                return;
            }
            
            params.page++; // 页数自增
            var documentHeight = $(document).height(); // 文档高度(整个网页的高度)
            var windowHeight = $(window).height(); // 可视窗口高度
            if(windowHeight >= documentHeight) { // 可视窗口未达到滚动事件的高度
                renderList(); // 渲染页面列表(自调用)
            }

        }).always(function () {
            isLoading_global = false; // 设置为 加载完成
        });
    }

    renderList(); // 渲染页面列表(初始化页面)

    // 窗口滚动事件
    $(window).scroll(function () {
        if(isLoading_global || isAll_global) { // 正在加载，且全部数据尚未加载完毕
            return;
        }
        var documentHeight = $(document).height(); // 文档高度(整个网页的高度)
        var windowHeight = $(window).height(); // 可视窗口高度
        var scrollTop = $(window).scrollTop(); // 滚动高度(浏览器可视窗口顶端距离网页顶端的高度)
        if( (windowHeight + scrollTop) / documentHeight > 0.9) {
            // 加载完成
            isLoading_global = true; // 设置为 正在加载
            renderList(); // 渲染页面列表
        }
    });

    // 点击 搜索 图标
    $('#confirm').click(function () {
        isAll_global = false; // 设置为 全部数据尚未加载完毕 -- 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
        params.fullName = $('#keyword').val().trim();
        params.page = 1; // 重置页码
        renderList(true); // 渲染页面列表
    });

    // 点击选中项(所在团支部)
    $('.ul').on('click', 'li', function () {
        // 存储到cookie(团员填写信息)
        if($.cookie) {
            var zhtj = {};
            if($.cookie('zhtj')) { // cookie已存在
                zhtj = JSON.parse($.cookie('zhtj'));
            }

            var oid = $(this).data('id');
            var oidName = $(this).text();

            if(oidName.indexOf('退回原籍团支部') != -1) {
                $.alert('您好，若要退回原籍团支部，请退出，重新选择转接类型为“退回原籍”，谢谢。');
                return;
            }

            if(oidName.indexOf('非共青团广东省委所辖的团组织') != -1) {
                $.alert('您好，暂不支持转去广东省外单位等非团广东省委所辖组织，谢谢。');
                return;
            }

            zhtj['newOid'] = oid;
            zhtj['newOidName'] = oidName;
        
            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
            window.location.href = 'draftsmanship.html'; // 跳转 发起转接 页面
        }
    });
});