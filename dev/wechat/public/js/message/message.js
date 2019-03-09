/**
 * Created by licong on 2017/11/14.
 */
$(function () {
    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
    
    var params = {
        type: 1, // 账号类型(0组织，1团干)
        pageNo: 1,
        pageSize: 6
    };

    /**
     * 渲染页面列表
     */
    function renderList() {
        // 获取用户的站内信
        MessageApi.findAllMessage(params).then(function (data) {
            console.log('MessageApi.findAllMessage data', data);
            var list = data.rows;
            var html = '';

            Utils.showDataWithoutFilter(params, list); // 显示数据(无筛选条件，没数据就显示没数据)

            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var cur = item.statusStr == '未读' ? 'cur' : '';
                html += '<div class="my_msg_item ' + cur + '">';
                html += '    <div class="msg_item_txt">';
                html += '        <div class="txt_up clearfix">';
                html += '            <span class="fl txt_up_l">' + item.title + '</span>';
                html += '        </div>';
                html += '        <div class="txt_up clearfix">';
                html += '            <span class="fr txt_up_r">' + item.receiveTime + '</span>';
                html += '        </div>';
                html += '        <p class="txt_down" data-id="' + item.receiveId + '" data-status="' + item.status + '">' + item.content + '</p>';
                html += '    </div>';
                html += '</div>';
            }
            $('.my_msg_list').append(html);

            if(list.length < params.pageSize) {
                isAll_global = true; // 设置为 全部数据加载完毕
            }
        }).always(function () {
            params.pageNo++; // 页数自增
            isLoading_global = false; // 设置为 加载完成
        });
    }

    /**
     * 初始加载列表
     */
    function initLoadList() {
        var documentHeight = $(document).height(); // 文档高度(整个网页的高度)
        var windowHeight = $(window).height(); // 可视窗口高度
        while(windowHeight >= documentHeight && !isLoading_global && !isAll_global) {
            // 加载完成
            isLoading_global = true; // 设置为 正在加载
            renderList(); // 渲染页面列表
        }
    }

    initLoadList(); // 初始加载列表

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

    // 点击'查看详情'
    $('.my_msg_list').on('click', '.my_msg_item', function () {
        var path = '../../' + $(this).find('.txt_down a').data('path');
        var status = $(this).find('.txt_down').data('status'); // 消息状态
        if(status == 0) { // 未读 -- 消息状态(0未读，1已读，2已删)
            var params_detail = {
                receiveId: $(this).find('.txt_down').data('id'), // 站内信ID
                type: 1, // 账号类型(0组织，1团干)
                status: 1 // 消息状态(0未读，1已读，2已删)
            };
            // 改变私信的状态
            MessageApi.changeStatus(params_detail).then(function (data) {
                window.location.href = path; // 跳转到资料认证页面
            });
        }else { // 已读/删除
            console.log('已读/删除');
            window.location.href = path; // 跳转到资料认证页面
        }
    });
});