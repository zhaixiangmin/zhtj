/**
 * Created by licong on 2018/11/26.
 */
;(function ($) {
    $.fn.myFileUploader = function (options) {
        var defaults = {
            fileNumLimit: 1, // 验证文件总数量
            accept: [{
                title: 'xls',
                extensions: 'xls,xlsx',
                mimeTypes: 'application/vnd.ms-excel'
            }, {
                title: 'xlsx',
                extensions: 'xlsx',
                mimeTypes: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }]
        };

        var opts = $.extend({}, defaults, options);

        var className = '.' + $(this).prop('className').replace(' ', '.'); // 父容器类名字符串
        var fileUrlList = []; // 文件链接列表(字符串数组,全局变量)
        var $uploader_file_custom_control = $(this);
        var $fileUrlList = $uploader_file_custom_control.find('.fileUrlList'); // 存储文件链接容器

        // 初始化Web Uploader
        var uploader = WebUploader.create({
            auto: true, // 不需要手动调用上传，有文件选择即开始上传
            // // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: className + ' .filePicker',

            // swf文件路径
            swf: '../../public/vendor/webuploader/Uploader.swf',
            server: League.path + '/file_upload', // 服务器路径
            resize: false,
            disableGlobalDnd: true, // 是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开
            fileNumLimit: opts.fileNumLimit, // 验证文件总数量, 超出则不允许加入队列
            // 只允许excel
            accept: opts.accept // 允许上传文件类型
            // fileSingleSizeLimit: 5 * 1024 * 1024 // 验证单个文件大小是否超出限制, 超出则不允许加入队列
        });

        // 当文件被加入队列之前触发。如果此事件handler的返回值为false，则此文件不会被添加进入队列。
        uploader.on( 'beforeFileQueued', function (file) {
            var $list = $uploader_file_custom_control.find('.fileList');
            // 限制文件数量
            var len = $list.find('div.item').length;
            if(len >= opts.fileNumLimit) {
                $.alert('文件只能上传' + opts.fileNumLimit + '个');
                return false; // 阻止事件冒泡和默认动作
            }else {
                // 限制文件类型
                var fileTypes = 'gif,jpg,jpeg,png,bmp ,swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb ,doc,docx,xls,xlsx,ppt,htm,html,xml,txt,zip,rar,gz,bz2,pdf,pptx';
                if(fileTypes.indexOf(file.ext.toLowerCase()) == -1) { // 验证支持类型
                    $.alert('文件类型不支持：' + file.ext);
                    return false; // 阻止事件冒泡和默认动作
                }
            }

        });

        // 当有文件被添加进队列的时候
        uploader.on( 'fileQueued', function( file ) {
            console.log('fileQueued');

            var html = '';
            html += '<div id="' + file.id + '" class="item">';
            html += '   <p class="filenameList">';
            html += '       <span class="info">' + file.name + '</span>';
            html += '   </p>';
            html += '   <p class="progress"><span></span></p>';
            html += '</div>';

            $uploader_file_custom_control.find('.fileList').append(html);
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $percent = $li.find('.progress span');
            $percent.css( 'width', percentage * 100 + '%' );
        });

        // 文件成功
        uploader.on( 'uploadSuccess', function( file, result ) {
            if(result.error == 1) {
                $.alert(file.name + ' 上传失败，原因：' + result.message).then(function () {
                    uploader.removeFile(file); // 触发 onFileDequeued 事件
                });
                return;
            }

            fileUrlList.push(result.url); // 文件链接列表(字符串数组,全局变量)
            $fileUrlList.text(fileUrlList.join(',')); // 文件链接字符串(绑定到class为fileUrlList(class为uploader_custom_control的子元素)的选择器元素上，方便获取)

            $( '#'+file.id ).find('.progress').hide(); // 隐藏进度条
            $( '#'+file.id ).data('name', result.url); // 文件名称绑定
            $( '#'+file.id ).find('p.filenameList').append('<span class="delete">删除</span>'); // 去除'删除'文字
            // 点击'删除' -- 文件
            $( '#'+file.id ).on('click', '.filenameList span.delete', function () {
                uploader.removeFile(file); // 触发 onFileDequeued 事件
            });
        });

        // 失败处理
        uploader.on( 'uploadError', function(file, reason) {
            $.alert(file.name + ' 上传出错').then(function () {
                uploader.removeFile(file); // 触发 onFileDequeued 事件
            });
        });


        // 删除文件view及percentages数据(updateTotalProgress)
        function removeFile(file) {
            var $item = $('#' + file.id);
            $item.off().remove();
        }

        // 当文件被移除队列后触发
        uploader.onFileDequeued = function (file) {
            removeFile(file);
        };

        // 当validate不通过时，会以派送错误事件的形式通知调用者。
        uploader.onError = function (code) {
            if(code == 'F_DUPLICATE') {
                $.alert('文件不能重复添加');
                return;
            }else if(code == 'F_EXCEED_SIZE') {
                $.alert('文件不能超过5M');
                return;
            }else if(code == 'Q_EXCEED_NUM_LIMIT' || code == '超过上传文件个数限制') {
                $.alert('文件不能超过' + opts.fileNumLimit + '个');
                return;
            }else if(code == 'Q_TYPE_DENIED') {
                $.alert('文件类型不支持');
                return;
            }

            $.alert('错误：' + code);
        };

        // 重置文件上传插件
        $fileUrlList.click(function () {
            var $item = $uploader_file_custom_control.find('.fileList div.item');
            $item.remove();
            uploader.reset(); // 重置uploader。目前只重置了队列
            fileUrlList = []; // 清空文件链接数组
            $(this).text(''); // 清空存储文件链接容器内容
        });

    }
})(jQuery);