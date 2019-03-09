/**
 * Created by licong on 2017/10/18.
 */
$(function () {
    var imgUrl = []; // 图片列表(字符串数组,全局变量)

    var $wrap = $('#uploader');

    // 图片容器
    var $queue = $('<ul class="filelist"></ul>').appendTo($wrap.find('.queueList'));

    // 状态栏，包括进度和控制按钮
    var $statusBar = $wrap.find('.statusBar');

    // 文件总体选择信息
    var $info = $statusBar.find('.info');

    // 上传按钮
    var $upload = $wrap.find('.uploadBtn');

    // 没选择文件之前的内容
    var $placeHolder = $wrap.find('.placeholder');

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

    // 可能有pedding，ready，uploading，confirm，done
    var state = 'pedding';

    // 所有文件的进度信息，key为file id
    var percentages = {};

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

            })($wrap);
        }else { // 压根就没有安装
            $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
        }

    }else if(!WebUploader.Uploader.support()) {
        $.alert('Web Uploader 不支持您的浏览器！');
        return;
    }

    var uploader = WebUploader.create({
        pick: { // 指定选择文件的按钮容器，不指定则不创建按钮
            id: '#filePicker',
            label: '点击选择文件'
        },
        dnd: '#dndArea', // Drag And Drop拖拽的容器，如果不指定，则不启动
        paste: '#uploader', // 指定监听paste事件的容器，如果不指定，不启用此功能
        swf: '../../public/vendor/webuploader/Uploader.swf',
        server: League.path + '/file_upload', // 服务器路径
        disableGlobalDnd: true, // 是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开
        fileNumLimit: 8, // 验证文件总数量, 超出则不允许加入队列
        fileSingleSizeLimit: 8 * 1024 * 1024 // 验证单个文件大小是否超出限制, 超出则不允许加入队列
        // formData: { // 文件上传请求的参数表，每次发送都会发送此对象中的参数
        //     uid: 123
        // },
        // chunked: false, // 是否要分片处理大文件上传(默认：false)
        // chunkSize: 512 * 1024, // 如果要分片，分多大一片(默认：5M)
        // fileSizeLimit: 200 * 1024 * 1024, // 验证文件总大小是否超出限制, 超出则不允许加入队列
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

    // 当一批文件添加进队列以后触发
    // uploader.on('filesQueued', function() {
    //     uploader.sort(function( a, b ) {
    //         if ( a.name < b.name )
    //           return -1;
    //         if ( a.name > b.name )
    //           return 1;
    //         return 0;
    //     });
    // });

    // 添加文件选择按钮
    uploader.addButton({
        id: '#filePicker2',
        label: '继续添加'
    });


    // 点击 '开始上传' 按钮
    $upload.on('click', function () {
        if($(this).hasClass('diaabled')) {
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
            '<span class="cancel">删除</span>' +
            '<span class="rotateRight">向右旋转</span>' +
            '<span class="rotateLeft">向左旋转</span></div>').appendTo($li);

        var $prgress = $li.find('p.progress span');
        var $wrap = $li.find('p.imgWrap'); // 局部变量
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
            $wrap.text('预览中');
            uploader.makeThumb(file, function (error, src) {
                var img;
                if(error) {
                    $wrap.text('不能预览');
                    return;
                }

                if(isSupportBase64) {
                    img = $('<img src="' + src + '" />');
                    $wrap.empty().append(img);
                }else {
                    $.ajax('../../server/preview.php', {
                        method: 'POST',
                        data: src,
                        dataType:'json'
                    }).done(function( response ) {
                        if (response.result) {
                            img = $('<img src="'+response.result+'">');
                            $wrap.empty().append( img );
                        } else {
                            $wrap.text("预览出错");
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

        // 图片操作(左转、右转、删除)
        $btns.on('click', 'span', function () {
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
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                })
            }else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');

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
            text = '选中' + fileCount + '张图片，共' + WebUploader.formatSize(fileSize) + '。';
        }else if(state == 'confirm') {
            stats = uploader.getStats();
            if(stats.uploadFailNum) {
                text = '已成功上传' + stats.successNum + '张图片，' + stats.uploadFailNum + '张图片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>';
            }
        }else {
            stats = uploader.getStats();
            text = '共' + fileCount + '张(' + WebUploader.formatSize(fileSize) + ')，已上传' + stats.successNum + '张';
            if(stats.uploadFailNum) {
                text += '，失败' + stats.uploadFailNum + '张';
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
            case 'pedding':
                $placeHolder.removeClass('element-invisible');
                $queue.hide();
                $statusBar.addClass('element-invisible');
                uploader.refresh(); // ??
                break;

            case 'ready':
                $placeHolder.addClass('element-invisible');
                $('#filePicker2').removeClass('element-invisible');
                $queue.show();
                $statusBar.removeClass('element-invisible');
                uploader.refresh(); // ??
                break;

            case 'uploading': // 某个文件开始上传前
                $('#filePicker2').addClass('element-invisible');
                $progress.show();
                $upload.text('暂停上传');
                break;

            case 'paused':
                $progress.show();
                $upload.text('继续上传');
                break;

            case 'confirm': // 当所有文件上传结束
                $progress.hide();
                $('#filePicker2').removeClass('element-invisible');
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

    // 当文件被加入队列以后触发
    uploader.onFileQueued = function (file) {
        console.log('onFileQueued');
        fileCount++; // 添加的文件数量
        fileSize += file.size; // 添加的文件总大小

        if(fileCount == 1) {
            $placeHolder.addClass('element-invisible'); // 隐藏 '图片选择' 排版
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

        $percent.css('width', percentage * 100 + '%'); // 某个图片底部的进度条
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
            setState('pedding'); // 设置状态栏view(updateStatus)
        }

        removeFile(file);

    };


    // 上传成功
    uploader.on('uploadSuccess', function(file, result) {
        console.log(result);
        imgUrl.push(result.url); // 图片列表(字符串数组,全局变量)
        $('#imgUrl').text(imgUrl.join(',')); // 图片字符串(绑定到id为imgUrl的选择器元素上，方便获取)
    });

    // 当validate不通过时，会以派送错误事件的形式通知调用者。
    uploader.onError = function (code) {
        if(code == 'F_DUPLICATE') {
            $.alert('图片不能重复添加');
            return;
        }
        if(code == 'F_EXCEED_SIZE') {
            $.alert('图片不能超过5M');
            return;
        }
        if(code == 'Q_EXCEED_NUM_LIMIT') {
            $.alert('图片不能超过8张');
            return;
        }


        $.alert('Error：' + code);
    };

    // 监听上传插件的所有事件
    uploader.on('all', function (type) {
        var stats;
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

    // 点击 '重新上传'失败图片 事件
    $info.on('click', '.retry', function () {
        uploader.retry(); // 重试上传，重试指定文件，或者从出错的文件开始重新上传
    });

    // 点击 '忽略'
    $info.on( 'click', '.ignore', function() {
        $.alert( 'todo' );
    });

    // 重置文件上传插件
    $('#imgUrl').click(function () {
        fileCount = 0;
        fileSize = 0;
        percentages = {};
        uploader.reset(); // 重置uploader。目前只重置了队列
        var $li = $('.filelist').find('li');
        $li.off().find('.file-panel').off().end().remove();
        setState('pedding'); // 设置状态栏view(updateStatus)
        imgUrl = []; // 清空图片数组
        $('#imgUrl').text(''); // 清空图片元素文本内容
    });

    $upload.addClass('state-' + state);

    updateTotalProgress(); // 更新总进度条
    uploader.refresh(); // [选择文件]按钮的长宽都是0，需要重新渲染一下网页(重新渲染或实例化Uploader)
});