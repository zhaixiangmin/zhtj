/**
 * Created by licong on 2017/11/29.
 */
// 返回上一页
function goBack_common() {
    // var pathname = window.location.pathname; // URL 的路径
    // 资料审核/奖励审核/待审核/发起转接 页面
    // if(pathname.indexOf('member/data_audit.html') != -1 || pathname.indexOf('awards/awards_audit.html') != -1 || pathname.indexOf('relation/todo_application.html') != -1 || pathname.indexOf('relation/draftsmanship.html') != -1) {
    //     window.location.href = '../../index.html'; // 首页
    //     return;
    // }

    window.history.back(); // 返回上一页
}

$(function () {
    /**
     * 判断是否首页(true：是，false：否)
     */
    function judgeIndex() {
        var pathname = window.location.pathname; // URL 的路径
        console.log('pathname', pathname);
        if(!pathname || pathname == '/') { // 首页
            return true;
        }

        var pathname_array = pathname.split('/'); // ['view', 'organization', 'organization_detail.html']
        var pathname_last = pathname_array[pathname_array.length -1]; // 'organization_detail.html'
        if(pathname_last == 'index.html') { // 首页
            return true;
        }
        console.log('pathname_last', pathname_last);

        return false; // 非首页
    }
    var title = $('head title').text(); // 标头
    var html_arrow = '';
    var search_path = 'public/img/search.png'; // 搜索图标路径(首页)
    // 判断是否首页(true：是，false：否)
    if(!judgeIndex()) { // 非首页
        html_arrow += '<a style="position: absolute;left:0;width:1.68rem;height:100%;" onclick="goBack_common()"><em style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 0.6rem; height: 0.6rem; background-image: url(../../public/img/left-arrow.png); background-repeat: no-repeat; background-size: contain;"></em></a>';
        search_path = '../../public/img/search.png'; // 搜索图标路径(非首页)
    }

    // 首页
    var html = '';
    html += '<div style="position: relative;height:1.76rem;line-height:1.76rem;font-size:0.72rem;color:#fff;background-color: #5077AA;">';
    html += html_arrow;
    html += '   <span id="title_global" style="display: inline-block; padding: 0 1.68rem; height: 1.76rem; width: 9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + title + '</span>';
    html += '   <a style="position: absolute;right:0;width:1.68rem;height:100%;" href="javascript:;">';
    html += '       <em style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 0.6rem; height: 0.6rem; background-image: url(' + search_path + '); background-repeat: no-repeat; background-size: contain;"></em>';
    html += '   </a>';
    html += '</div>';
    // var html = '<div style="position: relative;height:1.76rem;line-height:1.76rem;text-align: center;font-size:0.72rem;color:#fff;background-color: #5077AA;">' + html_arrow + title + '<a style="position: absolute;right:0;width:1.68rem;height:100%;" href="javascript:;"><em style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 0.6rem; height: 0.6rem; background-image: url(' + search_path + '); background-repeat: no-repeat; background-size: contain;"></em></a></div>';
    // var html = '<div style="position: relative;height:1.76rem;line-height:1.76rem;text-align: center;font-size:0.72rem;color:#fff;background-color: #5077AA;">' + html_arrow + title + '<a id="search" style="position: absolute;  width: 0.66rem;height: 0.66rem;background: url(../../public/img/search.png) no-repeat;background-size: contain;"></a></div>';
    // var html = '<div style="position: relative;height:1.76rem;line-height:1.76rem;text-align: center;font-size:0.72rem;color:#fff;background-color: #5077AA;">' + html_arrow + title + '<a href="' + href_helpCenter + '" id="helpCenter_common" style="position: absolute; right: 0.56rem; height: 1.76rem; line-height: 1.76rem; font-size: 0.72rem; color: #fff;">帮助中心</a></div>';
    $('body').prepend(html); // 添加到头部(标头)
});