$(function () {
    var otid_global = Utils.getQueryString('otid'); // 组织转移申请ID
    if(!otid_global) {
        $.alert('组织转移参数不能为空');
        return;
    }

    // 申诉状态名称
    var appealStatusName = {
        '0': '申诉待审核',
        '1': '申诉成功',
        '2': '申诉失败'
    };

    // 查看组织转接申诉详情
    RelationApi.appealDetail({otid: otid_global}).then(function (data) {
        var appealDetail = data.dataList[0];
        console.log('appealDetail', appealDetail);
        $('#appealReason').text(appealDetail.reason); // 您的申诉理由

        var appealAttachmentUrlList = appealDetail.attachmentUrl.split(',');
        var html_img = '';
        var html_pdf = '';
        for(var i=0; i<appealAttachmentUrlList.length; i++) {
            var attachmentUrl = appealAttachmentUrlList[i];
            var photoStr = 'gif,jpg,jpeg,png,bmp';
            var ext = attachmentUrl.substring(attachmentUrl.lastIndexOf('.')+1, attachmentUrl.length).toLowerCase(); // 文件扩展名
            console.log('ext', ext);
            if(photoStr.indexOf(ext) != -1) { // 图片
                html_img += '<div class="img_box">';
                html_img += '    <img src="' + attachmentUrl + '" title="点击查看大图">';
                html_img += '</div>';
            }else { // 非图片
                html_pdf += '    <div class="file_box" style="margin: 10px 0;">';
                html_pdf += '        <a class="file" href="' + attachmentUrl + '" title="点击下载">' + Utils.getUploaderSuffixName(attachmentUrl) + '</a>';
                html_pdf += '    </div>';
            }
        }

        $('.list.list_img').html(html_img); // 渲染图片
        $('.list.list_file').html(html_pdf); // 渲染pdf


        // 申诉状态(0-申诉待审核，1-申诉成功，2-申诉失败)
        $('.result_item .status').text(appealStatusName[appealDetail.appealStatus]); // 申诉状态
        $('.result_item .date').text(appealDetail.appealTime); // 时间
        // 待审时的是primalParentOrgName为审核组织，已审时是auditOrgName为审核组织
        $('.result_item .org').text('审核组织：' + appealDetail.auditOrgName); // 审核组织
        if(appealDetail.appealStatus == 0) { // 申诉待审核
            $('.result_item .org').text('审核组织：' + appealDetail.primalParentOrgName); // 审核组织
        }else if(appealDetail.appealStatus == 1) { // 申诉成功
            $('.result_item').addClass('success'); // 添加样式类
            $('.result_item .declaration').text('该团员已成功转至' + appealDetail.newOrgName + '。'); // 转入组织名称
        }else if(appealDetail.appealStatus == 2) { // 申诉失败
            $('.result_item').addClass('fail'); // 添加样式类
            $('.result_item .declaration').text(appealDetail.returnReason); // 审核说明
        }
    })
});