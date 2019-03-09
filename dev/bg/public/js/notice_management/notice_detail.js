/**
 * Created by licong on 2018/1/26.
 */
$(function () {
    var noticeId_global = undefined; //  公告ID(全局变量)
    if(parent.window.zhtj && parent.window.zhtj.noticeId) { // 编辑公告
        
        // change_current_title('编辑公告'); // 改变当前选中的页面标题
        noticeId_global = parent.window.zhtj.noticeId; // 公告ID(全局变量)
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
        // 公告详情
        NoticeManagementApi.detail({noticeId: noticeId_global}).then(function (data) {
            var notice =  data.data;
            $('#title').text(notice.title); // 公告标题
            $('#createTime').text(notice.createTime); // 发布时间
            $('#creatorName').text(notice.creatorName); // 发布者
            if(notice.filesList && notice.filesList.length > 0) { // 含有附件
                var filesList = '';
                for(var i=0; i<notice.filesList.length; i++) {
                    var filePath = notice.filesList[i].filePath;
                    var fileHref = filePath.replace('http', 'https');
                    filesList += '<div class="file_item"><a href="' + fileHref + '" title="点击下载">' + Utils.getUploaderSuffixName(filePath) + '</a></div>';
                }
                $('.files_box .file_num span').text(notice.filesList.length); // 附件数量
                $('.files_box .files').html(filesList); // 附件列表
                $('.files_box').show(); // 显示附件
            }

            var content = notice.content.replace(/&lt;pre宋体';font-size:9.0pt;"&gt;/g, '').replace(/&lt;\/pre宋体';font-size:9.0pt;"&gt;/g, '').replace(/&lt;strike&gt;/, '<span style="text-decoration: line-through;">').replace(/&lt;\/strike&gt;/, '</span>');
            // var content = notice.content.replace(/宋体';font-size:9.0pt;"/g, '').replace(/&lt;pre&gt;/g, '').replace(/&lt;\/pre&gt;/g, '');
            console.log('content', content);

            $('#editor').html(content);

            console.log('NoticeManagementApi.detail data', data);
        });
    }
});