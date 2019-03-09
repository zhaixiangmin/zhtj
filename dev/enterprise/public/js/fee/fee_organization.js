/**
 * Created by licong on 2018/1/17.
 */
$(function () {
    var name = Utils.getQueryString('name');
    if(!name) {
        $.alert('参数不能为空');
        return;
    }
    
    var paramList = ['name', 'fullName', 'type', 'months', 'total', 'paidIn', 'unpaid', 'paidInAmount', 'unpaidAmount'];

    for(var i=0; i<paramList.length; i++) {
        var item = paramList[i];
        var text = Utils.getQueryString(item);
        $('#' + item).text(text);
    }

});