/**
 * Created by licong on 2017/12/15.
 */
$(function () {

    $('.uploader_file_custom_control.notice_add').myFileUploader({fileNumLimit: 8, accept: []}); // 初始化文件上传插件

    var editor = undefined; // 富文本框编辑器
    
    // 富文本框，定义函数并执行
    function editor_create() {
        // 富文本框
        var E = window.wangEditor;
        editor = new E('#editor');
        // 或者 var editor = new E( document.getElementById('editor') )
        editor.customConfig.zIndex = 100; // 配置编辑区域的 z-index
        editor.customConfig.showLinkImg = false; // 隐藏“网络图片”tab
        editor.customConfig.uploadImgServer = League.path + '/file_upload'; // 配置服务器端地址
        editor.customConfig.withCredentials = true; // withCredentials（跨域传递 cookie）
        // 自定义菜单配置
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            // 'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            // 'video',  // 插入视频
            // 'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];

        // 监听函数(上传图片)
        editor.customConfig.uploadImgHooks = {
            // 图片上传之前触发
            // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，files 是选择的图片文件
            before: function (xhr, editor, files) {
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，当图片插入错误时触发
                // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
                $.alert('系统繁忙，请稍后再来吧！');
            },
            error: function (xhr, editor) {
                // 图片上传错时触发
            },
            timeout: function (xhr, editor) {
                // 图片上传超时触发
                $.alert('系统繁忙，请稍后再来吧！');
            },
            customInsert: function (inserImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片时间（而不是编辑器自动插入图片!!!）
                // inserImg 是 插入图片的函数，editor 是编辑器对象，result 是服务器端返回结果
                var url = result.url;
                inserImg(url);
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        };

        editor.create();
    }
    editor_create();

    var noticeId_global = undefined; //  公告ID(全局变量)
    if(parent.window.zhtj && parent.window.zhtj.noticeId) { // 编辑公告
        noticeId_global = parent.window.zhtj.noticeId; // 公告ID(全局变量)
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
        // 公告详情
        NoticeManagementApi.detail({noticeId: noticeId_global}).then(function (data) {
            var notice =  data.data;
            $('#title').val(notice.title); // 公告标题
            // $('#content').val(notice.content); // 公告内容

            var content = notice.content.replace(/&lt;pre宋体';font-size:9.0pt;"&gt;/g, '').replace(/&lt;\/pre宋体';font-size:9.0pt;"&gt;/g, '').replace(/&lt;strike&gt;/, '<span style="text-decoration: line-through;">').replace(/&lt;\/strike&gt;/, '</span>');
            // var content = notice.content.replace(/宋体';font-size:9.0pt;"/g, '').replace(/&lt;pre&gt;/g, '').replace(/&lt;\/pre&gt;/g, '');
            console.log('content', content);
            editor.txt.html(content); // 公告内容

            if(notice.filesList && notice.filesList.length > 0) {
                var html = '';
                for(var i = 0; i < notice.filesList.length; i++) {
                    var filePath = notice.filesList[i].filePath;
                    html += '<div class="item show" data-name="' + filePath + '">';
                    html += '   <p class="filenameList">';
                    html += '       <span class="info">' + Utils.getUploaderSuffixName(filePath) + '</span>';
                    html += '       <span class="delete">删除</span>';
                    html += '   </p>';
                    html += '</div>';
                }
                $('.uploader_file_custom_control.notice_add .fileList').html(html);
                $('.uploader_file_custom_control.notice_add .fileList').on('click', '.item.show .filenameList span.delete', function () {
                    $(this).parents('.item.show').remove();
                });
            }
            console.log('NoticeManagementApi.detail data', data);
        });
    }

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击 '确定' 按钮
    $('#confirm').click(function () {
        var params = {
            noticeId: Utils.returnValidValue(noticeId_global), // 公告ID
            title: $('#title').val(), // 公告标题
            content: editor.txt.html(), // 公告内容
            files: '' // 附件路径(可不传,多附件间以逗号分隔)
            // files: $('.fileUrl').text() // 附件路径(可不传,多附件间以逗号分隔)
        };

        console.log('params', params);

        if(!params.title) {
            $.alert('请输入标题');
            return;
        }
        if(!params.content || !params.content.replace(/<br>/g, '').replace(/<p>/g, '').replace(/<\/p>/g, '')) {
            $.alert('请输入公告内容');
            return;
        }

        // 获取附件参数
        var fileUrlArr = [];
        $('.uploader_file_custom_control.notice_add .fileList .item').each(function () {
            var name = $(this).data('name');
            fileUrlArr.push(name);
        });
        params.files = fileUrlArr.join(',');

        console.log('参数验证通过 fileUrlArr', fileUrlArr);
        console.log('参数验证通过 params', params);

        if(!noticeId_global) { // 公告发布
            if(isClick) { // 已点击
                return;
            }
            isClick = true; // 设置为 已点击
            $('#confirm').css({opacity: 0.5}); // 改变按钮样式(半透明)
            // 公告发布
            NoticeManagementApi.add(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    var current_title = Utils.returnTabTitle(); // 当前面板标题
                    Utils.toggleNav('view/notice_management/notice_management.html', true); // 打开指定导航页面(公告管理)
                    Utils.toggleTab(current_title); // 关闭当前标签页(公告发布)
                });
            }).always(function () {
                isClick = false; // 设置为 未点击
                $('#confirm').css({opacity: 1}); // 改变按钮样式(不透明)
            });
        }else { // 公告编辑
            // 公告编辑
            NoticeManagementApi.edit(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    var current_title = Utils.returnTabTitle(); // 当前面板标题
                    Utils.toggleNav('view/notice_management/notice_management.html', true); // 打开指定导航页面(公告管理)
                    Utils.toggleTab(current_title); // 关闭当前标签页(公告管理 -- 公告发布)
                });
            });
        }

    });
    
});