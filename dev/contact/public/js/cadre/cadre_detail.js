/**
 * Created by licong on 2018/5/31.
 */
$(function () {
    var id = Utils.getQueryString('id');
    console.log('id', id);
    if(!id) {
        $.alert('团干参数不能为空');
        return;
    }

    // 获取团干详情
    CadreApi.getTuanganInfo({id: id}).then(function (data) {
        var data = data.dataList;
        $('#name').text(data.name);
        var incumbentList = data.incumbentList; // 职务列表
        var html_incumbent = '';
        for(var i = 0; i < incumbentList.length; i++) {
            var incumbent = incumbentList[i];
            html_incumbent += '<div class="incumbent_item">' + incumbent + '</div>';
        }
        $('.box .info_box .incumbent_list').html(html_incumbent); // 渲染职务列表
        var orgList = data.orgList; // 部门列表
        var html_org = '';
        for(var i = 0; i < orgList.length; i++) {
            var organization = orgList[i];
            var title = '';
            if(i == 0) {
                title = '部门';
            }
            html_org += '<div class="department_item" data-oid="' + organization.oid + '" data-name="' + organization.name + '">';
            html_org += '    <div class="department_box_sub">';
            html_org += '        <span class="title">' + title + '</span><span class="value">' + organization.name + '</span>';
            html_org += '    </div>';
            html_org += '    <div class="department_bottom">';
            html_org += '       <div class="department_txt">' + organization.parentName + '</div>';
            html_org += '    </div>';
            html_org += '</div>';
        }
        $('.box .other_box .department_list').html(html_org); // 渲染职务列表
    });

    // // 点击 '查看更多部门'
    // $('.more_department').click(function () {
    //     $(this).hide(); // 隐藏 '查看更多部门'
    //     $('.box .other_box .department_list .department_item').show();
    // });

    // 点击 部门
    $('.box .other_box .department_list').on('click', '.department_item', function () {
        var oid = $(this).data('oid');
        var name = $(this).data('name');
        console.log('oid', oid);
        console.log('name', name);
        window.location.href = '../../index.html?oid=' + oid + '&name=' + name; // 组织列表页
    });

    // 点击 '发消息'
    $('.message').click(function () {
        wx.openEnterpriseChat({
            // 注意：userIds和openIds至少选填一个，且userIds+openIds总数不能超过2000。
            userIds : id, //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
            openIds : '', // 参与会话的外部联系人列表，格式为openId1;openId2;…，用分号隔开。
            groupName : '', // 必填，会话名称。单聊时该参数传入空字符串""即可。
            success : function(res) {
                // 回调
                console.log('res', res);
            },
            fail : function(res) {
                if (res.errMsg.indexOf('function not exist') > -1) {
                    alert('版本过低请升级')
                }
            }
        });
    });
});