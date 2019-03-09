/**
 * Created by licong on 2018/6/2.
 */
$(function () {
    var uri = window.location.href.split("#")[0];
    // console窗口打印一下入参
//	console.log("userid=" + userid);
    // 调用ajax获取后台权限验证配置
    $.ajax({
        url : Contact.path + '/jsapiLcSign',
        type : 'POST',
        data : {
            // 链接
            "link" : uri
        },
        async : true,
        cache : false,
        dataType : 'json',
        success : function(data) {
            // 注意：所有的JS接口只能在企业微信应用的可信域名下调用(包括子域名)，且可信域名必须有ICP备案且在管理端验证域名归属。
            wx.config({
                beta : true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId : data.dataList.appId, // 必填，企业微信的corpID
                timestamp : data.dataList.timestamp, // 必填，生成签名的时间戳
                nonceStr : data.dataList.nonceStr, // 必填，生成签名的随机串
                signature : data.dataList.signature,// 必填，签名，见附录1
                jsApiList : [ 'openEnterpriseChat' ]
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            // 通过ready接口处理成功验证
            wx.ready(function() {
                // 创建会话接口
//				wx.openEnterpriseChat({
//					// 注意：userIds和openIds至少选填一个，且userIds+openIds总数不能超过2000。
//					userIds : userid, //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
//					openIds : '', // 参与会话的外部联系人列表，格式为openId1;openId2;…，用分号隔开。
//					groupName : '', // 必填，会话名称。单聊时该参数传入空字符串""即可。
//					success : function(res) {
//						// 回调
//					},
//					fail : function(res) {
//						if (res.errMsg.indexOf('function not exist') > -1) {
//							alert('版本过低请升级')
//						}
//					}
//				});
                // 通过error接口处理失败验证
                wx.error(function(res) {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    $.alert(res.errMsg);
                });
            });
        },
        error : function() {
            alert('ajax request failed!!!');
            return;
        }
    });
});