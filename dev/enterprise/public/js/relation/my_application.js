/**
 * Created by licong on 2018/1/24.
 */
$(function () {
    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
    var index_global = 0; // 序号(全局变量)

    var params = {
        applicantType: 1, // 组织 -- 申请人类型(1:组织，２团员) -- 后台和团员移动端=1，团员移动端=2
        page: 1,
        rows: 6
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 我的发起列表
        RelationApi.applyList(params).then(function (data) {
            console.log('RelationApi.applyList data', data);
            var list = data.rows;

            Utils.showDataWithoutFilter(params, list); // 显示数据(无筛选条件，没数据就显示没数据)

            var html = '';
            var isWithdraw = false; // 是否'撤回申请'按钮(true：'撤回申请'，false：'不可撤回')
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                index_global++; // 序号(全局变量)
                isWithdraw = false;
                if(item.applicantType == 1) { // 组织发起
                    if(item.auditStatus == 1 || item.auditStatus == 2 || item.auditStatus == 3) {
                        isWithdraw = true;
                    }
                }
                html += '<a class="tr con" href="done_application_detail.html?otid=' + item.otid + '">';
                // html += '    <div class="td">' + index_global + '</div>';
                html += '    <div class="td">' + item.mName + '</div>';
                html += '    <div class="td">' + item.primalName + '</div>';
                html += '    <div class="td">' + item.createTime + '</div>';
                if(isWithdraw) { // 显示'撤回申请'按钮
                    html += '    <div class="td withdraw" data-otid="' + item.otid + '" style="padding: 0.24rem 0.4rem; width: auto; line-height: 1; font-size: 0.52rem; color: #fff; background: #D94453; border-radius: 0.1rem;">撤回申请</div>';
                }else { // 显示'不可撤回'按钮
                    html += '    <div class="td" style="padding: 0.24rem 0.4rem; width: auto; line-height: 1; font-size: 0.52rem; color: #fff; background: #CECECE; border-radius: 0.1rem;">不可撤回</div>';
                }
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


    // 点击'撤回申请'按钮
    $('.table').on('click', '.withdraw', function () {
        var otid = $(this).data('otid');
        if(!otid) {
            $.alert('组织关系转移参数不能为空');
            return false;
        }

        window.location.href = 'transfer_withdraw.html?otid=' + otid; // 撤回申请
        return false;
    });
});