/**
 * Created by licong on 2017/11/29.
 */
$(function () {
    var keyword = Utils.getQueryString('keyword'); // 团员姓名
    $('#keyword').val(keyword); // 赋值 团员姓名

    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
    var index_global = 0; // 序号(全局变量)

    var params = {
        name: keyword, // 团员姓名
        page: 1,
        rows: 6
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 南粤青年人才列表
        TalentApi.talentList(params).then(function (data) {
            console.log('TalentApi.talentList data', data);
            var list = data.rows;
            var html = '';

            Utils.showDataWithFilter(params, list, isClear); // 显示数据(有筛选条件，没数据就显示没数据)

            for(var i=0; i<list.length; i++) {
                var item = list[i];
                index_global++; // 序号(全局变量)
                var professionalTechnicalQualification = item.professionalTechnicalQualification ? item.professionalTechnicalQualification : '';
                var learningUnit = item.learningUnit ? item.learningUnit : '';
                html += '<a style="display: block;" class="table_con table_tr clearfix" href="talent_detail.html?gytpid=' + item.gytpid + '">';
                html += '    <span class="td">' + index_global + '</span><span class="td">' + item.name + '</span><span class="td">' + professionalTechnicalQualification + '</span><span style="text-indent: 0;text-align: center;" class="td">' + learningUnit + '</span>';
                html += '</a>';
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

    // 点击 搜索 图标
    $('#confirm').click(function () {
        isAll_global = false; // 设置为 全部数据尚未加载完毕 -- 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
        params.name = $('#keyword').val().trim();
        params.page = 1; // 重置页码
        index_global = 0; // 序号(全局变量)
        renderList(true); // 渲染页面列表
    });
});