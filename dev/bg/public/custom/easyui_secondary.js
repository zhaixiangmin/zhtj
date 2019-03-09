/**
 * Created by licong on 2017/10/17.
 */
var easyuiWindowOnMove = function(left, top) {
    var $parent = $(this).parents('.window');
    var width = $parent.outerWidth(); // outerHeight:宽度＋补白＋边框，参数为true时：宽度＋补白＋边框＋边距
    var height = $parent.outerHeight(); // outerHeight:高度＋补白＋边框，参数为true时：高度＋补白＋边框＋边距
    var windowWidth = $(window).width(); // 可见区域宽度
    var windowHeight = $(window).height(); // 可见区域高度
    var docScrollLeft = $(document).scrollLeft(); // 水平滚动的距离
    var docScrollTop = $(document).scrollTop(); // 垂直滚动的距离
    // var documentWidth = $(document).width();
    // var documentHeight = $(document).height(); // 文档的高度(浏览器窗口大小改变，其不变)

    var widthDiff = windowWidth + docScrollLeft - width; // 内容区域与对话框的宽度差
    var heightDiff = windowHeight + docScrollTop - height; // 内容区域与对话框的高度差

    if (left < 0) {
        $(this).window('move', {
            "left" : 1
        });
    }
    if (top < 0) {
        $(this).window('move', {
            "top" : 1
        });
    }

    if (widthDiff > 0 && left > widthDiff) {
        $(this).window('move', {
            "left" : widthDiff
        });
    }
    if (heightDiff > 0 && top > heightDiff) {
        $(this).window('move', {
            "top" : heightDiff
        });
    }
};

var easyuiWindowOnOpen = function(left, top){
    $(this).window('move', {
        "top" : $(document).scrollTop() + ($(window).height()-$(this).parents('.window').outerHeight())*0.5
    });
};

// 重写默认的 defaults
// messager之类的窗口
$.fn.dialog.defaults.onMove = easyuiWindowOnMove;
$.fn.dialog.defaults.onOpen = easyuiWindowOnOpen; // 有效？？
// messager之类基于 window 的窗口
$.fn.window.defaults.onMove = easyuiWindowOnMove;

/**
 * easyui datagrid 行号宽度自适应扩展(onLoadSuccess: function () { $(this).datagrid("fixRownumber"); })
 */
$.extend($.fn.datagrid.methods, {
    fixRownumber : function (jq) {
        return jq.each(function () {
            var panel = $(this).datagrid("getPanel");
            var clone = $(".datagrid-cell-rownumber", panel).last().clone();
            clone.css({
                "position" : "absolute",
                left : -1000
            }).appendTo("body");
            var width = clone.width("auto").width();
            if (width > 25) {
                //多加5个像素,保持一点边距
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
                $(this).datagrid("resize");
                //一些清理工作
                clone.remove();
                clone = null;
            } else {
                //还原成默认状态
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
            }
        });
    }
});


/***** datebox默认设置 -- 开始 *******/
// 重写默认easyui 方法
$.fn.datebox.defaults.formatter = function (date) {
    // 选择时间大约当前时间(默认为当前时间)
    if(date.getTime() > new Date().getTime()) {
        return new Date().format('yyyy-MM-dd');
    }

    return date.format('yyyy-MM-dd');
};
$.fn.datebox.defaults.parser = function (s) {
    var t = Date.parse(s);
    if (!isNaN(t)){
        return new Date(t);
    } else {
        return new Date();
    }
};

// 添加'清空'按钮(日期插件)
var buttons = $.extend([], $.fn.datebox.defaults.buttons);
buttons.splice(1, 0, {
    text: '清空',
    handler: function(target){
        $(target).datebox('setValue', ''); // 清空日期值
        $(target).datebox('hidePanel'); // 隐藏该日期插件
    }
});
var buttonsCurrent = $.extend([], $.fn.datebox.defaults.buttons);
buttonsCurrent.splice(0, 1, {
    text: '至今',
    handler: function(target){
        $(target).datebox('setValue', ''); // 清空日期值(否则获取值为上一个时间日期值)
        $(target).datebox('textbox').val('至今'); // 设置日期值'至今'
        $(target).datebox('hidePanel'); // 隐藏该日期插件
    }
},{
    text: '清空',
    handler: function(target){
        $(target).datebox('setValue', ''); // 清空日期值
        $(target).datebox('hidePanel'); // 隐藏该日期插件
    }
});
/***** datebox默认设置 -- 结束 *******/


$(function () {
    // 点击 '附件'(图片)，查看大图
    $('.list.attachment').on('click', '.img_box, .img_box_delete', function () {
        var imgUrl = $(this).find('img').attr('src');
        if(!imgUrl) {
            $.alert('图片为空');
            return;
        }

        $('.maskBox img').attr('src', imgUrl); // 设置 图片
        $('.maskBox').show(); // 显示 大图
    });

    // 点击大图，关闭图片
    $('.maskBox').click(function () {
        $(this).hide(); // 隐藏 大图
    });
});