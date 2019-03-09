/**
 * Created by licong on 2017/11/29.
 */
// 返回上一页
function goBack_common() {
    var pathname = window.location.pathname; // URL 的路径
    var pathList = [
        'member/data_audit.html', // 资料审核
        'awards/awards_audit.html', // 奖励审核
        'relation/todo_application.html', // 待审核
        'relation/draftsmanship.html', // 发起转接
        'relation/my_application.html', // 转接发起记录
        'message/message.html', // 我的消息
    ];
    for(var i=0; i<pathList.length; i++) {
        if(pathname.indexOf(pathList[i]) != -1) {
            window.location.href = '../../index.html'; // 首页
            return;
        }
    }
    // // 资料审核/奖励审核/待审核/发起转接/转接发起记录 页面
    // if(pathname.indexOf('member/data_audit.html') != -1 || pathname.indexOf('awards/awards_audit.html') != -1 || pathname.indexOf('relation/todo_application.html') != -1 || pathname.indexOf('relation/draftsmanship.html') != -1 || pathname.indexOf('relation/my_application.html') != -1) {
    //     window.location.href = '../../index.html'; // 首页
    //     return;
    // }

    window.history.back(); // 返回上一页
}

/**
 * 判断是否首页(true：是，false：否)
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
    var title = $('head title').text(); // 标头
    var html_arrow = '';
    var href_helpCenter = 'view/help/help.html'; // 跳转到'帮助中心'(首页)
    // 判断是否首页(true：是，false：否)
    if(!judgeIndex()) { // 非首页
        html_arrow += '<a style="position: absolute;left:0;width:1.68rem;height:100%;" onclick="goBack_common()"><em style="position: absolute;left:50%;top:50%;transform:translate(-50%, -50%);width:0.4rem;height:0.62rem;background-position:-4rem -1.5rem;background-image: url(../../public/img/spirit1.png);background-repeat:no-repeat;background-size:6rem;"></em></a>';
        href_helpCenter = '../help/help.html'; // 跳转到'帮助中心'(非首页)
    }

    // 首页
    var html = '<div style="position: relative;height:1.76rem;line-height:1.76rem;text-align: center;font-size:0.72rem;color:#fff;background-color: #D94453;">' + html_arrow + title + '<a href="' + href_helpCenter + '" id="helpCenter_common" style="position: absolute; right: 0.56rem; height: 1.76rem; line-height: 1.76rem; font-size: 0.72rem; color: #fff;">帮助中心</a></div>';
    $('body').prepend(html); // 添加到头部(标头)
});