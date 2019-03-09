/**
 * Created by licong on 2018/1/17.
 */
$(function () {
    var currentSelectName_global = undefined; // 当前选择框名称(全局变量，months：选择月份，confirm：核实状态)
    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)

    // 是否已核实列表
    var list_confirm = [
        {key: '0', value: '未确认'},
        {key: '1', value: '已确认'}
    ];

    var params = {
        months: '', // 月份
        pageNo: 1, // 当前页码
        pageSize: 6 // 每页最大记录数
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 获取本组织收到的凭证
        FeeApi.getReceiveCredentials(params).then(function (data) {
            console.log('FeeApi.getReceiveCredentials data', data);
            var list = data.rows;
            var html = '';

            Utils.showDataWithFilter(params, list, isClear); // 显示数据(有筛选条件，没数据就显示没数据)

            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var className = undefined; // 样式
                if(!item.confirm) { // 未确认 -- 0：未确认；1：已确认
                    className = 'not_confirm';
                }
                html += '<tr data-id="' + item.id + '" data-confirm="' + item.confirm + '">';
                html += '    <td>' + item.months + '</td>'; // 月份
                html += '    <td>' + item.amount + '元</td>'; // 公示金额
                html += '    <td class="' + className + '">' + item.confirmStr + '</td>'; // 是否已核实
                html += '</tr>';
            }

            if(isClear) {
                $('#list').html(html);
            }else {
                $('#list').append(html);
            }

            if(list.length < params.pageSize) {
                isAll_global = true; // 设置为 全部数据加载完毕
                return;
            }

            params.pageNo++; // 页数自增
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

    /**
     * 渲染页面(选择弹出框)
     * @param $selector {jquery对象} 数据父元素(选择器jquery对象)
     * @param list {array} 数据列表
     * @param name {string} 名称(列表数据项的显示名称)
     */
    var initialSelect = function ($selector, list, name) {
        var html = '<li class="select_item" data-id="">全部</li>'; // 避免data-id为undefined，保持上一次的值不变
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            // var name = name ? name : 'name';
            html += '<li class="select_item" data-id="' + item.key + '">' + item.value + '</li>';
        }
        $selector.html(html);
    };

    // 点击'可选择项'(选择月份,可弹出框)
    $('#months').click(function () {
        var text = $(this).attr('id');
        currentSelectName_global = text; // 当前选择框名称(全局变量，months：选择月份，confirm：核实状态)

        // 获取可查询团费交纳情况的月份
        FeeApi.getPaymentTime({}).then(function (data) {
            var list = data.dataList;
            initialSelect($('.select_popup .select_list'), list); // 渲染页面(选择弹出框)
            $('.select_popup').fadeIn(150); // 显示选择弹出框
        });
    });

    // 点击'可选择项'(核实状态,可弹出框)
    $('#confirm').click(function () {
        var text = $(this).attr('id');
        currentSelectName_global = text; // 当前选择框名称(全局变量，months：选择月份，confirm：核实状态)

        initialSelect($('.select_popup .select_list'), list_confirm); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });


    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        $('#' + currentSelectName_global).text($(this).text());
        $('#' + currentSelectName_global).data('id', $(this).data('id'));
    });

    // 点击遮罩层(弹出框)
    $('.select_popup').click(function () {
        $('.select_popup').fadeOut(150); // 关闭弹出框
    });

    // 点击'查询'按钮
    $('#filter').click(function () {
        params.months = Utils.returnValidString($('#months').data('id')); // 月份
        params.confirm = $('#confirm').data('id'); // 核实状态
        params.pageNo = 1; // 重置当前页码
        renderList(true); // 渲染页面列表(替换)
    });

    // 点击列表(凭证记录项)
    $('#list').on('click', 'tr', function () {
        isAll_global = false; // 设置为 全部数据尚未加载完毕 -- 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
        var cid = $(this).data('id'); // 凭证ID
        var confirm = $(this).data('confirm'); // 是否已核实
        window.location.href = 'credentials_detail.html?cid=' + cid + '&confirm=' + confirm; // 跳转到 凭证详情页面
    });

});