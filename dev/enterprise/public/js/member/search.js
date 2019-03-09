/**
 * Created by licong on 2017/11/29.
 */
$(function () {
    var selectName = {
        '1': '按团支部搜',
        '2': '按团员搜'
    };
    // 点击 下拉框(筛选)
    $('#selector').click(function(event) {
        var id = $(this).data('id'); // 类型(1：按团支部搜，2：按团员搜)
        var relativeID = id == 1 ? 2 : 1; // 另一个id
        $('.sel_list .item').hide(); // 隐藏所有下拉框
        $('.sel_list .item').eq(relativeID-1).show(); // 显示另一项
        $(this).siblings('.sel_list').slideToggle(100);
    });
    // 选中 下拉框
    // $('.search_out .sel_list').on('click', '.item', function(event) {
    $('.search_out .sel_list .item').click(function(event) {
        var placeholderText = {
          '1': '输入团支部简称搜索',
          '2': '输入团员姓名搜索'
        };
        var id = $(this).data('id');
        $(this).parent().slideUp(100).siblings().text($(this).text()).data('id', id);
        $('#keyword').val(''); // 清空
        $('#keyword').attr('placeholder', placeholderText[id]); // 修改placeholderText的内容
    });
    // 点击 搜索 图标
    $('#confirm').click(function () {
        var keyword = $('#keyword').val().trim(); // 搜索文本
        var type = $('#selector').data('id'); // 类型(1：按团支部搜，2：按团员搜)
        if(type == 1) { // 按团支部搜
            window.location.href = 'branch_search.html?keyword=' + keyword; // 团支部搜索页面
        }else { // 按团员搜
            window.location.href = 'member_search.html?keyword=' + keyword; // 团员搜索页面
        }
    });
});