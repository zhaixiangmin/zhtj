$(function () {
    var otid_global = Utils.getQueryString('otid'); // 组织转移申请ID
    if(!otid_global) {
        $.alert('组织转移参数不能为空');
        return;
    }

    $('.uploader_custom_control.transfer_appeal').myUploader({fileNumLimit: 10, accept: {jpg: 8, pdf: 2}, description: '最多可支持上传8张图片及2份PDF'}); // 初始化上传插件

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击'提交'
    // 点击'确定'
    $('#confirm').click(function () {
        var isClick = false; // 是否点击(false：未点击，true：已点击)

        var params = {
            otid: otid_global, // 组织转接申请id
            reason: $('#appeal_reason').val().trim(), // 申诉理由
            attachmentUrl: $('.uploader_custom_control.transfer_appeal .fileUrlList').text() // 附件URL(证明团属关系的材料)
        };
        console.log('bot_big_btn params', params);
        
        if(!params.reason) {
            $.alert('请填写你要申诉的理由');
            return;
        }
        if(params.reason.length <= 100) {
            $.alert('申诉的理由要求100字以上');
            return;
        }
        if(!params.attachmentUrl) {
            $.alert('请上传可证明团属关系的材料');
            return;
        }

        console.log('成功');
        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});
        // 组织转接申诉申请
        RelationApi.appealAdd(params).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = '../relation/transfer_record_detail.html?otid=' + otid_global; // 跳转 组织关系转接(业务详情)
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });

    });

});