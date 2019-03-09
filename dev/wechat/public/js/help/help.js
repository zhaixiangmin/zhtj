/**
 * Created by licong on 2018/4/2.
 */
$(function () {
   // 点击"拨打热线"
   $('.call_box').click(function () {
       $('#dialog_box').show(); // 显示弹出框(拨打电话)
   });

   // 点击"取消"、"确定"按钮
   $('#cancel, #confirm').click(function () {
       $('#dialog_box').hide(); // 隐藏弹出框(拨打电话)
   });
});