/**
 * Created by licong on 2017/8/17.
 */
$(function () {
    var clientHeight = window.document.documentElement.clientHeight; // 屏幕实际高度
    $('#maskBox').css('line-height', clientHeight + 'px'); // 设置黑屏的行高(保证图片居中)

    // 图片加载完成
    imgLoad.onload = function () {
        console.log('imgLoad');
        $('.loading_global').hide(); // 隐藏 加载中
    };

    // 点击 '图片'
    $('#maskBox').click(function () {
        window.history.back();  //返回上一页
    });
});