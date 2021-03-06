/**
 * Created by licong on 2017/6/28.
 */
// 苹果手机上的QQ浏览器UC浏览器都点击body、document、window无效。最后找到了解决办法，就是给要点击的元素加个css样式cursor：pointer；
;(function ($) {
    $.alert = function (content) {
        var $d = $.Deferred();

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
            $dialog.find('.content').html(content);
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
        html += '    <div class="dialog_alert" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 84%; min-height: 4.68rem; z-index: 9999; background: #fff; border-radius: 0.2rem;">';
        html += '        <div class="content" style="margin: 0.8rem;max-height: 12rem;line-height: 0.88rem;font-size: 0.56rem;color: #333;overflow: auto;">' + content + '</div>';
        html += '        <div style="border-top: 1px solid #cecece;">';
        html += '           <div class="confirm" style="cursor: pointer;box-sizing: border-box; text-align: center; height: 2rem; line-height: 2rem; font-size: 0.56rem; color: #da4453; border-right: 1px solid #cecece;">确定</div>';
        html += '        </div>';
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

    $.confirm = function (content) {

        var $d = $.Deferred();

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
            $dialog.find('.content').html(content);
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
        html += '    <div class="dialog_confirm" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 84%; min-height: 4.68rem; z-index: 9999; background: #fff; border-radius: 0.2rem;">';
        html += '        <div class="content" style="margin: 0.8rem;max-height: 12rem;line-height: 0.88rem;font-size: 0.56rem;color: #333;overflow: auto;">' + content + '</div>';
        html += '        <div class="button_box" style="border-top: 1px solid #cecece;">';
        html += '           <div class="cancel" style="cursor: pointer;width: 50%; box-sizing: border-box; text-align: center; float: left; height: 2rem; line-height: 2rem; font-size: 0.56rem; color: #999; border-right: 1px solid #cecece;">取消</div>';
        html += '           <div class="confirm" style="cursor: pointer;color: #da4453; width: 50%; box-sizing: border-box; text-align: center; float: left; height: 2rem; line-height: 2rem; font-size: 0.56rem;">确定</div>';
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
