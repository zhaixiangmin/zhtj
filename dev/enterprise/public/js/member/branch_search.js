/**
 * Created by licong on 2017/11/29.
 */
$(function () {
    var keyword = Utils.getQueryString('keyword'); // 关键字
    $('#keyword').val(keyword); // 赋值搜索输入框
    
    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)

    var params = {
        name: keyword, // 组织名称
        type: 5, // 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
        page: 1,
        rows: 5
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 根据当前登录获取团员列表所在组织
        MemberApi.orgList(params).then(function (data) {
            console.log('MemberApi.orgList data', data);
            var list = data.rows;
            var html = '';

            Utils.showDataWithFilter(params, list, isClear); // 显示数据(有筛选条件，没数据就显示没数据)

            for(var i=0; i<list.length; i++) {
                var item = list[i];
                html += '<a class="result_item" href="branch_detail.html?oid=' + item.oid + '&name=' + item.name + '&num=' + item.type + '">'; // type团员数？？
                html += '    <div class="item_sec clearfix">';
                html += '        <p class="item_sec_title">团组织简称：</p>';
                html += '        <p class="item_sec_con">' + item.name + '</p>';
                html += '    </div>';
                // html += '    <div class="item_sec clearfix">';
                // html += '        <p class="item_sec_title">团员数：</p>';
                // html += '        <p class="item_sec_con">' + item.type + '</p>'; // type团员数？？
                // html += '    </div>';
                html += '</a>';
            }

            if(isClear) {
                $('.result_list').html(html);
            }else {
                $('.result_list').append(html);
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
        params.name = $('#keyword').val().trim();
        params.page = 1; // 重置页码
        renderList(true); // 渲染页面列表
    });
});