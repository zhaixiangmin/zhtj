/**
 * Created by Administrator on 2017/6/28.
 */
;(function ($) {

    $.alert = function (text, title) {
        var $d = $.Deferred();

        // 页面已显示对话框，避免覆盖之前的提示文本
        var $dialog = $('.messager-window');
        // 有弹出框、不是隐藏且是警告框，直接返回Deffered对象，但不显示对话框(避免重复弹出同类对话框)
        if($dialog && $dialog.length > 0 && $dialog.css('display') != 'none') { // 有弹出框且不是隐藏(两个弹出框相隔时间太短，上一个关闭，但没有马上销毁，只是隐藏)
            if($dialog.find('.messager-button .l-btn-left').length == 1) { // 有警告框(不是确认框)
                return $d;
            }
        }

        if(text && text.indexOf('您的登录已失效，请重新登录') != -1) {
            // 自定义按钮顺序
            if ($.messager){
                $.messager.defaults.ok = '到登录页';
            }
        }else {
            // 自定义按钮顺序
            if ($.messager){
                $.messager.defaults.ok = '确定';
            }
        }

        title = title || '温馨提示';
        $.messager.alert(title, text, 'info', function () {// 自定义按钮顺序
            if(text && text.indexOf('您的登录已失效，请重新登录') != -1) {
                // parent.window.location.href = '../../index.html';
                parent.window.location.href = '../../../bg/index.html'; // 兼容frame页面和主页面
            }
            $d.resolve();
        });

        return $d;
    };

    $.confirm = function (text, title, buttonTextCancel, buttonTextSure) {
        var $d = $.Deferred();

        // 页面已显示对话框，避免覆盖之前的提示文本
        var $dialog = $('.messager-window');
        // 有弹出框、不是隐藏且是确认框，直接返回Deffered对象，但不显示对话框(避免重复弹出同类对话框)
        if($dialog && $dialog.length > 0 && $dialog.css('display') != 'none') { // 有弹出框且不是隐藏(两个弹出框相隔时间太短，上一个关闭，但没有马上销毁，只是隐藏)
            if($dialog.find('.messager-button .l-btn-left').length == 2) { // 有确认框(不是警告框)
                return $d;
            }
        }

        buttonTextCancel = buttonTextCancel ? buttonTextCancel : '取消';
        buttonTextSure = buttonTextSure ? buttonTextSure : '确定';
        // 自定义按钮顺序
        if ($.messager){
            $.messager.defaults.ok = buttonTextCancel;
            $.messager.defaults.cancel = buttonTextSure;
        }


        title = title || '温馨提示';
        $.messager.confirm(title, text, function (r) {
            if(r) { // 取消
                $d.reject();
                return;
            }
            $d.resolve();
        });

        // 恢复消息对话框的按钮顺序
        if ($.messager){
            $.messager.defaults.ok = '确定';
            $.messager.defaults.cancel = '取消';
        }

        return $d;
    };
})(jQuery);