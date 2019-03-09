$(function () {
    /**
     * 分页函数
     * @param data {obj} 属性如下
     * pageIndex {int} 页码(默认值为1)
     * pageSize {int} 每页记录数(默认值为10
     * districtId {string} 地区ID
     * keyword {instringt} 站点名称关键字
     */
    function page(data) {
        // 人气服务站点数据列表分页
        $('.notice_box').pageFun({
            contentCell: '.notice_list', /*包裹数据列表的父容器*/
            maxPage: 6,/*显示页码框个数*/
            apiProxy: NoticeManagementApi.list, /*接口函数*/
            data: data,
            listFun: siteList, /*数据列表函数 -- 返回html字符串*/
            arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
        });
    }
    page({pageIndex: 1, pageSize: 10}); // 分页函数(好的)

    // 公告列表
    function siteList (list, arg) {
        var html='';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            html += '<li class="notice_item clearfix" data-id="' + item.id + '">';
            html += '	<a href="javascript:;" class="link">' + item.title + '</a>';
            html += '	<span class="date">' + item.createTime + '</span>';
            html += '</li>';
        }

        $('.notice_list').append(html);
        // $('.pageBox .siteList').append(html);
    }

    // 点击公告标题
    $('.notice_list').on('click', '.notice_item', function () {
        parent.window.zhtj = {
            noticeId: $(this).data('id') // 公告ID
        };
        Utils.toggleTab('公告详情', 'view/notice_management/notice_detail.html'); // 创建(打开)新面板(公告详情)
    });
});