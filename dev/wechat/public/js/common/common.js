/**
 * Created by licong on 2017/11/29.
 */
// 返回上一页
function goBack_common() {
    var pathname = window.location.pathname; // URL 的路径
    // if(pathname.indexOf('member/data_audit.html') != -1) { // 资料审核 页面
    if(pathname.indexOf('information/registration_data_1.html') != -1) { // 报道认证资料1 页面
        window.location.href = 'registration.html'; // 报道认证 页面
        return;
    }else if(pathname.indexOf('fee/fee.html') != -1 || pathname.indexOf('fee/fee_overdue.html') != -1 || pathname.indexOf('relation/transfer.html') != -1) { // 团费交纳(未逾期)/团费交纳(已逾期)/组织关系转接 -- 接口跳转，正常返回无法回到首页
        window.location.href = '../../index.html'; // 跳转到 首页
    }else if(pathname.indexOf('fee/fee_paid_list.html') != -1 || pathname.indexOf('fee/help_pay.html') != -1) { // 已交清单/帮TA交费
        window.location.href = 'fee.html'; // 跳转到 团费交纳
    }else if(pathname.indexOf('fee/help_pay_paid_list.html') != -1) { // 帮TA交费清单
        window.location.href = 'help_pay.html'; // 跳转到 帮TA交费
    }else if(pathname.indexOf('relation/transfer_record.html') != -1) { // 组织关系转接记录
        window.location.href = 'transfer.html'; // 跳转到 组织关系转接
    }

    window.history.back(); // 返回上一页
}

/**
 * 判断是否首页
 * @returns {boolean} true：首页，false：非首页
 */
function judgeIndex() {
    var pathname = window.location.pathname; // URL 的路径
    // console.log('pathname', pathname);
    if(!pathname || pathname == '/') { // 首页
        return true;
    }

    var pathname_array = pathname.split('/'); // ['view', 'organization', 'organization_detail.html']
    var pathname_last = pathname_array[pathname_array.length -1]; // 'organization_detail.html'
    if(pathname_last == 'index.html') { // 首页
        return true;
    }
    // console.log('pathname_last', pathname_last);

    return false; // 非首页
}

$(function () {
    var pathname = window.location.pathname; // URL 的路径
    var title = $('head title').text(); // 标头
    var html_arrow = '';
    var href_helpCenter = '../help/help.html'; // 跳转到'帮助中心'(非首页)
    // var href_helpCenter = 'view/help/help.html'; // 跳转到'帮助中心'(首页)
    // 判断是否首页(true：是，false：否)
    if(judgeIndex()) { // 首页
        href_helpCenter = 'view/help/help.html'; // 跳转到'帮助中心'(首页)
    }else{ // 非首页
        href_helpCenter = '../help/help.html'; // 跳转到'帮助中心'(非首页)
        if(pathname.indexOf('information/registration.html') == -1 && pathname.indexOf('relation/transfer_confirm.html') == -1) { // 非 报道认证页面/组织关系转接确认
            html_arrow += '<a style="position: absolute;left:0;width:1.68rem;height:100%;" onclick="goBack_common()"><em style="position: absolute;left:50%;top:50%;transform:translate(-50%, -50%);width:0.4rem;height:0.62rem;background-position:-4rem -1.5rem;background-image: url(../../public/img/spirit1.png);background-repeat:no-repeat;background-size:6rem;"></em></a>';
        }
    }

    var html = '<div style="position: relative;height:1.76rem;line-height:1.76rem;text-align: center;font-size:0.72rem;color:#fff;background-color: #D94453;">' + html_arrow + title + '<a href="' + href_helpCenter + '" id="helpCenter_common" style="position: absolute; right: 0.56rem; height: 1.76rem; line-height: 1.76rem; font-size: 0.72rem; color: #fff;">帮助中心</a></div>';
    $('body').prepend(html); // 添加到头部(标头)
});