/**
 * Created by licong on 2018/11/26.
 */
;(function ($) {
    $.fn.myUploader = function (options) {
        var defaults = {
            fileNumLimit: 8, // 验证文件总数量
            accept: undefined, // 允许上传文件类型参数 eg.{jpg: 8, pdf: 2}
            description: '或将文件拖到这里，最多可选8个' // 文字描述
        };

        var opts = $.extend({}, defaults, options);

        var html = '';
        html += '<div class="fileUrlList" style="display: none;"></div>';
        html += '<div class="wrapper">';
        html += '    <div class="container"><!--头部，相册选择和格式选择-->';
        html += '        <div class="uploader"><!--队列-->';
        html += '            <div class="queueList">';
        html += '                <div class="placeholder">';
        html += '                    <div class="filePicker"></div>';
        html += '                    <p>' + opts.description + '</p></div>';
        html += '            </div><!--状态栏-->';
        html += '            <div class="statusBar" style="display: none;">';
        html += '                <div class="progress"><span class="text">0%</span><span class="percentage"></span></div>';
        html += '                <div class="info"></div>';
        html += '                <div class="btns clearfix">';
        html += '                    <div class="filePicker2"></div>';
        html += '                    <div class="uploadBtn">开始上传</div>';
        html += '                </div>';
        html += '            </div>';
        html += '        </div>';
        html += '    </div>';
        html += '</div>';

        // html += '<div class="fileUrlList" style="display: none;"></div>';
        // html += '<div class="wrapper">';
        // html += '    <div class="container"><!--头部，相册选择和格式选择-->';
        // html += '        <div class="uploader"><!--队列-->';
        // html += '            <div class="queueList">';
        // html += '                <div class="placeholder">';
        // html += '                    <div class="filePicker"></div>';
        // html += '                    <p>' + opts.description + '</p>';
        // html += '                </div>';
        // html += '            </div><!--状态栏-->';
        // html += '            <div class="statusBar" style="display: none;">';
        // html += '                <div class="progress"><span class="text">0%</span><span class="percentage"></span></div>';
        // html += '                <div class="info"></div>';
        // html += '                <div class="btns">';
        // html += '                    <div class="filePicker2"></div>';
        // html += '                    <div class="uploadBtn">开始上传</div>';
        // html += '                </div>';
        // html += '            </div>';
        // html += '        </div>';
        // html += '    </div>';
        // html += '</div>';
        $(this).html(html);

        var className = '.' + $(this).prop('className').replace(' ', '.'); // 父容器类名字符串

        var fileUrlList = []; // 文件链接列表(字符串数组,全局变量)

        var $uploader_custom_control = $(this);

        var $fileUrlList = $uploader_custom_control.find('.fileUrlList'); // 存储文件链接容器

        // 文件容器
        var $queue = $('<ul class="filelist"></ul>').appendTo($uploader_custom_control.find('.queueList'));

        // 状态栏，包括进度和控制按钮
        var $statusBar = $uploader_custom_control.find('.statusBar');

        // 文件总体选择信息
        var $info = $statusBar.find('.info');

        // 上传按钮
        var $upload = $uploader_custom_control.find('.uploadBtn');

        // 没选择文件之前的内容
        var $placeHolder = $uploader_custom_control.find('.placeholder');

        // 进度条
        var $progress = $statusBar.find('.progress').hide();

        // 添加的文件数量
        var fileCount = 0;

        // 添加的文件总大小
        var fileSize = 0;

        // 优化retina，在retina下这个值是2
        var ratio = window.devicePixelRatio || 1;

        // 缩略图大小
        var thumbnailWidth = 110 * ratio;
        var thumbnailHeight = 110 * ratio;

        // 可能有pending，ready，uploading，confirm，done
        var state = 'pending';

        // 所有文件的进度信息，key为file id
        var percentages = {};

        var accept = []; // 允许上传文件类型


        // 判断浏览器是否支持图片的base64
        var isSupportBase64 = (function () {
            var data = new Image();
            var support = true;
            data.onload = data.onerror = function () {
                if(this.width != 1 || this.height != 1) {
                    support = false;
                }
            };
            data.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
            return support;
        })();

        // 检测是否已经安装flash，检测flash的版本
        var flashVersion = (function () {
            var version;

            try {
                version = navigator.plugins['Shockwave Flash'];
                version = version.description;
            }catch(ex) {
                try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
                }catch(ex2) {
                    version = '0.0';
                }
            }
            version = version.match(/\d+/g);
            return parseFloat(version[0] + '.' + version[1], 10);
        })();

        // 检测是否支持transition(过渡，转变)
        var supportTransition = (function () {
            var s = document.createElement('p').style;
            var r = 'transition' in s || 'WebkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s;
            s = null;
            return r;
        })();

        // 针对是否已经安装flash，做一些处理
        if(!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {

            // flash 安装了但是版本过低
            if(flashVersion) {
                (function (container) {
                    window['expressinstallcallback'] = function (state) {
                        switch(state) {
                            case 'Download.Cancelled':
                                $.alert('您取消了更新！');
                                break;
                            case 'Download.Failed':
                                $.alert('安装失败！');
                                break;
                            default:
                                $.alert('安装已成功，请刷新！');
                                break;
                        }
                        delete window['expressinstallcallback'];
                    };

                    var swf = '../../public/js/image-upload/expressInstall.swf';

                    var html = '<object type="application/x-shockwave-flash" data=' + swf + '"';

                    if(WebUploader.browser.ie) {
                        html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
                    }

                    html += 'width="100%" height="100%" style="outline:0">' +
                        '<param name="movie" value="' + swf + '" />' +
                        '<param name="wmode" value="transparent" />' +
                        '<param name="allowscriptaccess" value="always" />' +
                        '</object>';

                    container.html(html);

                })($uploader_custom_control);
            }else { // 压根就没有安装
                $uploader_custom_control.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
            }

        }else if(!WebUploader.Uploader.support()) {
            $.alert('Web Uploader 不支持您的浏览器！');
            return;
        }

        // 允许上传文件类型处理
        if(opts.accept) {
            for(var key in opts.accept) {
                console.log('key', key);
                if(key == 'jpg') {
                    accept.push({
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,png,bmp',
                        mimeTypes: 'image/*'
                    });
                } else if(key == 'pdf') {
                    accept.push({
                        title: 'Pdf',
                        extensions: 'pdf',
                        mimeTypes: 'application/pdf'
                    });
                }
            }
        }

        var uploader = WebUploader.create({
            pick: { // 指定选择文件的按钮容器，不指定则不创建按钮
                id: className + ' .filePicker',
                label: '点击选择文件'
            },
            dnd: className + ' .placeholder', // Drag And Drop拖拽的容器，如果不指定，则不启动
            paste: className + ' .uploader', // 指定监听paste事件的容器，如果不指定，不启用此功能
            swf: '../../public/vendor/webuploader/Uploader.swf',
            server: League.path + '/file_upload', // 服务器路径
            disableGlobalDnd: true, // 是否禁掉整个页面的拖拽功能，如果不禁用，文件拖进来的时候会默认被浏览器打开
            fileNumLimit: opts.fileNumLimit, // 验证文件总数量, 超出则不允许加入队列
            fileSingleSizeLimit: 5 * 1024 * 1024, // 验证单个文件大小是否超出限制, 超出则不允许加入队列
            accept: accept // 允许上传文件类型
        });

        // 拖拽时不接受 js, txt 文件。
        uploader.on('dndAccept', function (items) {
            var denied = false;
            var len = items.length;
            // 修改js类型
            var unAllowed = 'text/plain;application/javascript';

            for(var i= 0; i<len; i++) {
                // ~(-1) = 0, ~(0) = -1, ~(1) = -2
                if(~unAllowed.indexOf(items[i].type)) {
                    denied = true;
                    break;
                }
            }

            return !denied;
        });

        // 文件资源浏览器打开事件
        uploader.on('dialogOpen', function () {
            console.log('dialogOpen');
        });

        // 添加文件选择按钮
        uploader.addButton({
            id: className + ' .filePicker2',
            label: '继续添加'
        });


        // 点击 '开始上传' 按钮
        $upload.on('click', function () {
            if($(this).hasClass('disabled')) {
                return false;
            }

            if(state == 'ready') {
                uploader.upload(); // 开始上传(此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。可以指定开始某一个文件)
            }else if(state == 'paused') {
                uploader.upload(); // 开始上传(此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。可以指定开始某一个文件)
            }else if(state == 'uploading') {
                uploader.stop(); // 暂停上传(第一个参数为是否中断上传当前正在上传的文件。如果第一个参数是文件，则只暂停指定文件)
            }

        });

        // 更新总进度条(调用updateStatus)
        function updateTotalProgress() {
            var loaded = 0;
            var total = 0;
            var spans = $progress.children();
            var percent;

            $.each(percentages, function (k, v) {
                total += v[0]; // 总文件体积
                loaded += v[0] * v[1]; // 已经上传成功的文件体积
            });

            percent = total ? loaded / total : 0;

            spans.eq(0).text(Math.round(percent * 100) + '%'); // 进度条文字
            spans.eq(1).css('width', Math.round(percent * 100) + '%'); // 进度条宽度

            updateStatus();
        }

        // 当有文件添加进来时执行，负责view的创建，及文件监听事件
        function addFile(file) {
            var $li = $('<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>' +
                '<p class="progress"><span></span></p>' +
                '</li>');

            var $btns = $('<div class="file-panel">' +
                '<div class="file-panel-item"><span class="cancel">删除</span></div>' +
                '<div class="file-panel-item"><span class="rotateRight">向右旋转</span></div>' +
                '<div class="file-panel-item"><span class="rotateLeft">向左旋转</span></div>' +
                '</div>').appendTo($li);

            var $prgress = $li.find('p.progress span');
            var $imgWrap = $li.find('p.imgWrap'); // 局部变量
            var $info = $('<p class="error"></p>');

            var showError = function (code) {
                var text = '';
                switch(code) {
                    case 'exceed_size':
                        text = '文件大小超出';
                        break;
                    case 'interrupt':
                        text = '上传暂停';
                        break;
                    default:
                        text = '上传失败，请重试';
                        break;
                }

                $info.text(text).appendTo($li);
            };

            if(file.getStatus() == 'invalid') {
                showError(file.statusText);
            }else {
                $imgWrap.text('预览中');
                uploader.makeThumb(file, function (error, src) {
                    var img;
                    if(error) {
                        $imgWrap.text('不能预览');
                        return;
                    }

                    if(isSupportBase64) {
                        img = $('<img src="' + src + '" />');
                        $imgWrap.empty().append(img);
                    }else {
                        $.ajax('../../server/preview.php', {
                            method: 'POST',
                            data: src,
                            dataType:'json'
                        }).done(function( response ) {
                            if (response.result) {
                                img = $('<img src="'+response.result+'">');
                                $imgWrap.empty().append( img );
                            } else {
                                $imgWrap.text("预览出错");
                            }
                        });
                    }

                }, thumbnailWidth, thumbnailHeight);

                percentages[file.id] = [file.size, 0];
                file.rotation = 0;
            }

            // 监听file事件
            file.on('statuschange', function (cur, prev) {
                console.log('statuschange cur', cur);
                console.log('statuschange prev', prev);

                if(prev == 'progress') { // 上传中(当前状态：complete)
                    $prgress.hide().width(0);
                } else if(prev == 'queued'){ //进入队列,等待上传(当前状态：progress)
                    $li.off('mouseenter mouseleave');
                    $btns.remove();
                }

                // error：上传出错，可重试，invalid：文件不合格，不能重试上传。会自动从队列中移除。
                if(cur == 'error' || cur == 'invalid') {
                    showError(file.statusText);
                    percentages[file.id][1] = 1;
                }else if(cur == 'interrupt'){ // 上传中断，可续传
                    showError('interrupt');
                }else if(cur == 'queued') { // 已经进入队列, 等待上传
                    $info.remove();
                    $prgress.css('display', 'block');
                    percentages[file.id][1] = 0;
                }else if(cur == 'progress') { // 上传中
                    $info.remove();
                    $prgress.css('display', 'block');
                }else if(cur == 'complete') {
                    $prgress.hide().width(0);
                    $li.append('<span class="success"></span>');
                }

                $li.removeClass('state-' + prev).addClass('state-' + cur);
            });

            $li.on('mouseenter', function () {
                $btns.stop().animate({height: 30});
            });

            $li.on('mouseleave', function () {
                $btns.stop().animate({height: 0});
            });

            // 文件操作(左转、右转、删除)
            $btns.on('click', '.file-panel-item', function () {
                var index = $(this).index();
                var deg;

                switch (index) {
                    case 0:
                        uploader.removeFile(file); // 触发 onFileDequeued 事件
                        return;
                    case 1:
                        file.rotation += 90;
                        break;
                    case 2:
                        file.rotation -= 90;
                        break;
                }

                if(supportTransition) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $imgWrap.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    })
                }else {
                    $imgWrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');

                }

            });

            $li.appendTo($queue);

        }

        // 更新状态栏
        function updateStatus() {
            console.log('updateStatus fileCount：' + fileCount + ', state：' + state);
            var text = '';
            var stats;

            if(state == 'ready') {
                text = '选中' + fileCount + '个文件，共' + WebUploader.formatSize(fileSize) + '。';
            }else if(state == 'confirm') {
                stats = uploader.getStats();
                if(stats.uploadFailNum) {
                    text = '已成功上传' + stats.successNum + '个文件，' + stats.uploadFailNum + '个文件上传失败，<a class="retry" href="#">重新上传</a>失败文件或<a class="ignore" href="#">忽略</a>';
                }
            }else {
                stats = uploader.getStats();
                text = '共' + fileCount + '个(' + WebUploader.formatSize(fileSize) + ')，已上传' + stats.successNum + '个';
                if(stats.uploadFailNum) {
                    text += '，失败' + stats.uploadFailNum + '个';
                }
            }

            $info.html(text);

        }

        // 设置状态栏view(updateStatus)
        function setState(val) {
            var stats;

            if(val == state) {
                return;
            }

            $upload.removeClass('state-' + state);
            $upload.addClass('state-' + val);
            state = val;

            switch (state) {
                case 'pending':
                    $placeHolder.removeClass('element-invisible');
                    $queue.hide();
                    $statusBar.addClass('element-invisible');
                    uploader.refresh(); // ??
                    break;

                case 'ready':
                    $placeHolder.addClass('element-invisible');
                    $(className + ' .filePicker2').removeClass('element-invisible');
                    $queue.show();
                    $statusBar.removeClass('element-invisible');
                    uploader.refresh(); // ??
                    break;

                case 'uploading': // 某个文件开始上传前
                    $(className + ' .filePicker2').addClass('element-invisible');
                    $progress.show();
                    $upload.text('暂停上传');
                    break;

                case 'paused':
                    $progress.show();
                    $upload.text('继续上传');
                    break;

                case 'confirm': // 当所有文件上传结束
                    $progress.hide();
                    $(className + ' .filePicker2').removeClass('element-invisible');
                    $upload.text('开始上传');

                    stats = uploader.getStats();
                    if(stats.successNum && !stats.uploadFailNum) {
                        setState('finish');
                        return;
                    }
                    break;

                case 'finish':
                    stats = uploader.getStats();
                    if(stats.successNum) {
                        $.alert('上传成功');
                    }else {
                        state = 'done';
                        location.reload(); // 刷新当前页面
                    }
                    break;
            }

            updateStatus();

        }

        // 当文件被加入队列之前触发。如果此事件handler的返回值为false，则此文件不会被添加进入队列。
        uploader.on( 'beforeFileQueued', function (file) {
            var len = $uploader_custom_control.siblings('.list.attachment').children('.img_box').length;
            // 限制文件数量
            if(len+fileCount >= opts.fileNumLimit) {
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


            // 限制文件类型
            if(opts.accept) { // 指定文件上传类型和数量
                var $p = $queue.find('li p.title');
                var photoStr = 'gif,jpg,jpeg,png,bmp';
                var photoNum = 0;
                var pdfNum = 0;
                for(var i=0; i<$p.length; i++) {
                    var text = $($p[i]).text();
                    var ext = text.substring(text.lastIndexOf('.')+1).toLowerCase();
                    if(photoStr.indexOf(ext) != -1) {
                        photoNum++;
                    }else if('pdf' == ext) {
                        pdfNum++;
                    }
                }
                if(photoStr.indexOf(file.ext.toLowerCase()) != -1) { // 图片
                    if(photoNum >= opts.accept['jpg']) {
                        $.alert('最多上传' + opts.accept['jpg'] + '张图片');
                        return false; // 阻止事件冒泡和默认动作
                    }
                } else if(file.ext.toLowerCase() == 'pdf') { // pdf文件
                    if(pdfNum >= opts.accept['pdf']) {
                        $.alert('最多上传' + opts.accept['pdf'] + '份PDF');
                        return false; // 阻止事件冒泡和默认动作
                    }
                }
            }
        });

        // 当文件被加入队列以后触发
        uploader.onFileQueued = function (file) {
            fileCount++; // 添加的文件数量
            fileSize += file.size; // 添加的文件总大小

            if(fileCount == 1) {
                $placeHolder.addClass('element-invisible'); // 隐藏 '文件选择' 排版
                $statusBar.show(); // 显示状态栏
            }

            addFile(file);

            setState('ready');

            updateTotalProgress(); // 更新总进度条(调用updateStatus)
        };

        // 上传过程中触发，携带上传进度
        uploader.onUploadProgress = function (file, percentage) {
            var $li = $('#' + file.id);
            var $percent = $li.find('.progress span');

            $percent.css('width', percentage * 100 + '%'); // 某个文件底部的进度条
            percentages[file.id][1] = percentage;
            updateTotalProgress(); // 更新总进度条
        };

        // 删除文件view及percentages数据(updateTotalProgress)
        function removeFile(file) {
            var $li = $('#' + file.id);

            delete percentages[file.id];
            updateTotalProgress(); // 更新状态栏
            $li.off().find('.file-panel').off().end().remove();
        }

        // 当文件被移除队列后触发
        uploader.onFileDequeued = function (file) {
            fileCount--;
            fileSize -= file.size;

            if(!fileCount) {
                setState('pending'); // 设置状态栏view(updateStatus)
            }

            removeFile(file);

        };


        // 上传成功
        uploader.on('uploadSuccess', function(file, result) {
            if(result.error == 1) {
                $.alert(file.name + ' 上传失败，原因：' + result.message).then(function () {
                    uploader.removeFile(file); // 触发 onFileDequeued 事件
                });
                return;
            }

            fileUrlList.push(result.url); // 文件链接列表(字符串数组,全局变量)
            $fileUrlList.text(fileUrlList.join(',')); // 文件链接字符串(绑定到class为fileUrlList(class为uploader_custom_control的子元素)的选择器元素上，方便获取)
        });


        // 失败处理
        uploader.on('uploadError', function(file, reason) {
            $.alert(file.name + ' 上传出错');
            // .then(function () {
            //     uploader.removeFile(file); // 触发 onFileDequeued 事件
            // });
        });

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

        // 监听上传插件的所有事件
        uploader.on('all', function (type) {
            switch(type) {
                // 当所有文件上传结束时触发
                case 'uploadFinished':
                    setState('confirm');
                    break;

                // 某个文件开始上传前触发，一个文件只会触发一次
                case 'uploadStart':
                    setState('uploading');
                    break;

                // 当开始上传流程暂停时触发
                case 'stopUpload':
                    setState('paused');
                    break;
            }
        });

        // 点击 '重新上传'失败文件 事件
        $info.on('click', '.retry', function () {
            uploader.retry(); // 重试上传，重试指定文件，或者从出错的文件开始重新上传
        });

        // 点击 '忽略'
        $info.on( 'click', '.ignore', function() {
            // 遍历“上传失败，请重试”文件，并删除
            $queue.find('li p.error').each(function () {
                var fileId = $(this).parents('li').attr('id');
                uploader.removeFile(fileId); // 触发 onFileDequeued 事件
            });
        });

        // 重置文件上传插件
        $fileUrlList.click(function () {
            fileCount = 0;
            fileSize = 0;
            percentages = {};
            uploader.reset(); // 重置uploader。目前只重置了队列
            var $li = $queue.find('li');
            $li.off().find('.file-panel').off().end().remove();
            setState('pending'); // 设置状态栏view(updateStatus)
            fileUrlList = []; // 清空文件链接数组
            $(this).text(''); // 清空存储文件链接容器内容
        });

        $upload.addClass('state-' + state);

        updateTotalProgress(); // 更新总进度条
        uploader.refresh(); // [选择文件]按钮的长宽都是0，需要重新渲染一下网页(重新渲染或实例化Uploader)

        console.log('opts', opts);
    }
})(jQuery);