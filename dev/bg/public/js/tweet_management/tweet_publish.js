/**
 * Created by licong on 2017/12/15.
 */
$(function () {
    var type_global = undefined; // 推文类型(全局变量)

    $('.uploader_custom_control.tweet_image').myUploader({fileNumLimit: 1, description: '或将文件拖到这里，最多可选1个'}); // 初始化上传插件

    if(parent.window.zhtj && parent.window.zhtj.type) {
        type_global = parent.window.zhtj.type; // 推文类型(全局变量)
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
        // 推文类型名称
        var typeName = {
            '1': '精华',
            '2': '本地'
        };
        // 推文类型(1-精华，2-本地)
        $('#type').text(typeName[type_global]).data('id', type_global);
    }

    // 点击 '预览正文'
    $('.button_preview').click(function () {
        var linkUrl = $('#linkUrl').val().trim(); // 推文链接
        var href = $(this).attr('href'); // 当前href推文链接
        $(this).attr('href', linkUrl); // 设置链接
        if(!linkUrl) { // 推文链接 为空
            $.alert('请输入推文链接');
            $('.iframe').hide(); // 隐藏预览正文
            return;
        }

        if(linkUrl != href) { // 填写和当前显示不一致
            $('.iframe').show(); // 显示预览正文(避免已打开，但链接已修改，点击时关闭预览正文)
            return;
        }

        $('.iframe').toggle(); // 显示预览正文
    });

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击 '确定' 按钮
    $('#confirm').click(function () {
        var params = {
            // type: $('.checkbox.active').data('id'), // 推文类型(1-精华，2-本地)
            type: $('#type').data('id'), // 推文类型(1-精华，2-本地)
            title: $('#title').val().trim(), // 推文标题
            linkUrl: $('#linkUrl').val().trim(), // 推文链接
            image: $('.uploader_custom_control.tweet_image .fileUrlList').text() // 图片路径
        };

        console.log('params', params);

        if(!params.type) {
            $.alert('请选择类型');
            return;
        }
        if(!params.title) {
            $.alert('请输入标题');
            return;
        }
        if(!params.linkUrl) {
            $.alert('请输入推文链接');
            return;
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        if(params.type == 1) { // 精华
            // 推文发布精华
            TweetManagementApi.addEssence(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    var current_title = Utils.returnTabTitle(); // 当前面板标题
                    Utils.toggleNav('view/tweet_management/tweet_management.html', true); // 打开指定导航页面(首页文章管理)
                    Utils.toggleTab(current_title); // 关闭当前标签页(推文发布)
                });
            }).always(function () {
                isClick = false; // 设置为 未点击
                $('#confirm').css({opacity: 1}); // 改变按钮样式(不透明)
            });
        }else { // 本地
            // 推文发布本地
            TweetManagementApi.addNative(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    var current_title = Utils.returnTabTitle(); // 当前面板标题
                    Utils.toggleNav('view/tweet_management/tweet_management.html', true); // 打开指定导航页面(首页文章管理)
                    Utils.toggleTab(current_title); // 关闭当前标签页(推文发布)
                });
            }).always(function () {
                isClick = false; // 设置为 未点击
                $('#confirm').css({opacity: 1}); // 改变按钮样式(不透明)
            });
        }
    });
});