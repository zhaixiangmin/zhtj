/**
 * Created by licong on 2017/8/17.
 */
$(function () {
    // var imgUrl = Utils.getQueryString('imgUrl'); // 图片链接
    var imgUrl = window.location.search.substring(8); // 图片链接(去除?imgUrl=，可以防止imgUrl含有&符号，导致获取不全)
    console.log('imgUrl', imgUrl);
    if(!imgUrl) {
        $.alert('图片参数不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }

    var clientHeight = window.document.documentElement.clientHeight; // 屏幕实际高度
    $('#maskBox').css('line-height', clientHeight + 'px'); // 设置黑屏的行高(保证图片居中)
    $('#maskBox').find('img').attr('src', imgUrl); // 替换全屏图片

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