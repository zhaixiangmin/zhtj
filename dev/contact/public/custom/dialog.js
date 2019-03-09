/**
 * Created by licong on 2017/6/28.
 */
// 苹果手机上的QQ浏览器UC浏览器都点击body、document、window无效。最后找到了解决办法，就是给要点击的元素加个css样式cursor：pointer；
;(function ($) {

    $.alert = function (content, title) {
        var $d = $.Deferred();

        if(!title) {
            title = '温馨提示';
        }

        var $dialog_confirm = $('.dialog_widget_confirm');
        if($dialog_confirm && $dialog_confirm.length && $dialog_confirm.css('display') == 'block') { // confirm弹出框 显示状态
            return $d; // 直接返回
        }

        var $dialog = $('.dialog_widget_alert'); // 对话框jquery对象
        // alert对话框存在
        if($dialog && $dialog.length > 0) {
            if($dialog.css('display') == 'block') { // 显示状态
                return $d; // 直接返回
            }

            // 隐藏状态
            $dialog.find('.title').text(title);
            $dialog.find('.content').text(content);
            $dialog.show(); // 显示
            
            // 监听 '确定' 按钮
            $('body').on('click', '.dialog_widget_alert .confirm', function () {
                $('.dialog_widget_alert').hide();
                $(this).off('click'); // 移除点击事件
                $d.resolve();
            });

            return $d;
        }

        var html = '';
        html += '<div class="dialog_widget_alert" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.3);z-index: 9999;">';
        html += '    <div class="dialog_alert" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 84%; min-height: 7rem; z-index: 9999; padding: 1.8rem 0.6rem; background: #fff; border-radius: 0.2rem;">';
        html += '        <div class="title" style="line-height: 0.88rem;font-size: 0.72rem;text-align: center;font-weight: bold;color: #000;">' + title + '</div>';
        // html += '        <div class="content" style="margin: 1rem 1.4rem 1.8rem 1.4rem;max-height: 7rem;line-height: 0.88rem;font-size: 0.68rem;color: #333;overflow: auto;">' + content + '</div>';
        html += '        <div class="content" style="margin: 1rem 1.4rem 1.8rem 1.4rem;max-height: 4rem;line-height: 0.88rem;font-size: 0.68rem;color: #333;overflow: auto;">' + content + '</div>';
        html += '        <div class="confirm" style="cursor: pointer;width: 100%;height: 2rem;line-height: 2rem;font-size: 0.72rem;text-align: center;color: #fff;background: #D94453;border-radius: 0.2rem;">确定</div>';
        html += '    </div>';
        html += '</div>';
        $('body').append(html);

        // 监听 '确定' 按钮
        $('body').on('click', '.dialog_widget_alert .confirm', function () {
            $('.dialog_widget_alert').hide();
            $(this).off('click'); // 移除点击事件
            $d.resolve();
        });

        return $d;
    };


    // $.alert = function (content, title) {
    //     var $d = $.Deferred();
    //
    //     if(!title) {
    //         title = '温馨提示';
    //     }
    //
    //     var $dialog_confirm = $('.dialog_widget_confirm');
    //     if($dialog_confirm && $dialog_confirm.length && $dialog_confirm.css('display') == 'block') { // confirm弹出框 显示状态
    //         return $d; // 直接返回
    //     }
    //
    //     var $dialog = $('.dialog_widget_alert'); // 对话框jquery对象
    //     // alert对话框存在
    //     if($dialog && $dialog.length > 0) {
    //         if($dialog.css('display') == 'block') { // 显示状态
    //             return $d; // 直接返回
    //         }
    //
    //         // 隐藏状态
    //         $dialog.find('.title').text(title);
    //         $dialog.find('.content').text(content);
    //         $dialog.show(); // 显示
    //
    //         // 监听 '确定' 按钮
    //         $('body').on('click', '.dialog_widget_alert .confirm', function () {
    //             $('.dialog_widget_alert').hide();
    //             $(this).off('click'); // 移除点击事件
    //             $d.resolve();
    //         });
    //
    //         return $d;
    //     }
    //
    //     var html = '';
    //     html += '<div class="dialog_widget_alert" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.3);z-index: 9999;">';
    //     html += '    <div class="dialog_alert" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 84%; min-height: 7rem; z-index: 9999; padding: 1.8rem 0.6rem; background: #fff; border-radius: 0.2rem;">';
    //     html += '        <div class="title" style="line-height: 0.88rem;font-size: 0.72rem;text-align: center;font-weight: bold;color: #000;">' + title + '</div>';
    //     html += '        <div class="content" style="padding: 1rem 1.4rem 1.8rem 1.4rem;line-height: 0.88rem;font-size: 0.68rem;color: #333;">' + content + '</div>';
    //     html += '        <div class="confirm" style="cursor: pointer;width: 100%;height: 2rem;line-height: 2rem;font-size: 0.72rem;text-align: center;color: #fff;background: #D94453;border-radius: 0.2rem;">确定</div>';
    //     html += '    </div>';
    //     html += '</div>';
    //     $('body').append(html);
    //
    //     // 监听 '确定' 按钮
    //     $('body').on('click', '.dialog_widget_alert .confirm', function () {
    //         $('.dialog_widget_alert').hide();
    //         $(this).off('click'); // 移除点击事件
    //         $d.resolve();
    //     });
    //
    //     return $d;
    // };

    $.confirm = function (content, title) {
        var $d = $.Deferred();

        if(!title) {
            title = '温馨提示';
        }

        var $dialog_alert = $('.dialog_widget_alert');
        if($dialog_alert && $dialog_alert.length && $dialog_alert.css('display') == 'block') { // alert弹出框 显示状态
            return $d; // 直接返回
        }

        var $dialog = $('.dialog_widget_confirm'); // 对话框jquery对象
        // confirm对话框存在
        if($dialog && $dialog.length > 0) {
            if($dialog.css('display') == 'block') { // 显示状态
                return $d; // 直接返回
            }

            // 隐藏状态
            $dialog.find('.title').text(title);
            $dialog.find('.content').text(content);
            $dialog.show(); // 显示
            
            // 监听 '取消' 按钮
            $('body').on('click', '.dialog_widget_confirm .button_box .cancel', function () {
                $('.dialog_widget_confirm').hide();
                $(this).off('click'); // 移除点击事件
                $d.reject();
            });

            // 监听 '确定' 按钮
            $('body').on('click', '.dialog_widget_confirm .button_box .confirm', function () {
                $('.dialog_widget_confirm').hide();
                $(this).off('click'); // 移除点击事件
                $d.resolve();
            });

            return $d;
        }

        var html = '';
        html += '<div class="dialog_widget_confirm" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.3);z-index: 9999;">';
        html += '    <div class="dialog_confirm" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 84%; min-height: 7rem; z-index: 9999; padding: 1.8rem 0.6rem; background: #fff; border-radius: 0.2rem;">';
        html += '        <div class="title" style="line-height: 0.88rem;font-size: 0.72rem;text-align: center;font-weight: bold;color: #000;">' + title + '</div>';
        html += '        <div class="content" style="margin: 1rem 1.4rem 1.8rem 1.4rem;max-height: 4rem;line-height: 0.88rem;font-size: 0.68rem;color: #333;overflow: auto;">' + content + '</div>';
        html += '        <div class="button_box" style="position: relative;width: 100%;height: 2rem;line-height: 2rem;font-size: 0.72rem;text-align: center;color: #fff;">';
        html += '           <div class="cancel" style="cursor: pointer;position: absolute;left: 0;width: 48%;background: #CECECE;border-radius: 0.2rem;">取消</div>';
        html += '           <div class="confirm" style="cursor: pointer;position: absolute;right: 0;width: 48%;background: #D94453;border-radius: 0.2rem;">确定</div>';
        html += '       </div>';
        html += '    </div>';
        html += '</div>';
        $('body').append(html);

        // 监听 '取消' 按钮
        $('body').on('click', '.dialog_widget_confirm .button_box .cancel', function () {
            $('.dialog_widget_confirm').hide();
            $(this).off('click'); // 移除点击事件
            $d.reject();
        });

        // 监听 '确定' 按钮
        $('body').on('click', '.dialog_widget_confirm .confirm', function () {
            $('.dialog_widget_confirm').hide();
            $(this).off('click'); // 移除点击事件
            $d.resolve();
        });

        return $d;
    };


})(jQuery);