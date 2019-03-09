/**
 * Created by licong on 2017/11/30.
 */
$(function () {
    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
    var index_global = 0; // 序号(全局变量)

    // 审核状态名称
    var auditStatusName = {
        "0": "报到被撤回",
        "1": "报到待审核",
        "2": "报到被退回",
        "3": "审核通过",
        "4": "修改资料待审核",
        "5": "修改资料被退回"
    };

    var params = {
        // name: keyword, // 团员姓名
        auditStatus: '1', // 审核状态(可不传，1:报到待审核2:报到被退回,3:审核通过4:修改资料待审核,5:修改资料被退回)
        page: 1,
        rows: 5
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 团员列表
        MemberApi.getMembersTobeAudited(params).then(function (data) {
            console.log('MemberApi.getMembersTobeAudited data', data);
            var list = data.rows;

            Utils.showDataWithoutFilter(params, list); // 显示数据(无筛选条件，没数据就显示没数据)

            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                index_global++; // 序号(全局变量)
                html += '<div class="table_con table_tr clearfix">';
                html += '    <span class="td">' + index_global + '</span><span class="td">' + item.name + '</span><span class="td">' + auditStatusName[item.auditStatus] + '</span><span class="td"><a href="data_audit_detail.html?mid=' + item.mid + '">审核</a></span>';
                html += '</div>';
            }

            if(isClear) {
                $('.table_box').html(html);
            }else {
                $('.table_box').append(html);
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
});