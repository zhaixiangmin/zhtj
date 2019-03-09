/**
 * Created by licong on 2018/1/24.
 */
$(function () {
    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
    var index_global = 0; // 序号(全局变量)

    var params = {
        page: 1,
        rows: 6
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 待办列表
        RelationApi.todoList(params).then(function (data) {
            console.log('RelationApi.todoList data', data);
            var list = data.rows;

            Utils.showDataWithoutFilter(params, list); // 显示数据(无筛选条件，没数据就显示没数据)

            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                index_global++; // 序号(全局变量)
                html += '<a class="tr con" href="todo_application_detail.html?mid=' + item.mid + '&otid=' + item.otid + '&otaid=' + item.otaid + '">';
                // html += '<div class="tr con">';
                html += '    <div class="td">' + index_global + '</div>';
                html += '    <div class="td">' + item.mName + '</div>';
                html += '    <div class="td">' + item.primalName + '</div>';
                html += '    <div class="td"><span class="btn">去审核</span></div>';
                html += '</a>';
            }

            if(isClear) {
                $('.table').html(html);
            }else {
                $('.table').append(html);
            }

            if(list.length < params.rows) {
                isAll_global = true; // 设置为 全部数据加载完毕
                return;
            }

            // 未加载全部数据/加载完成
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
});