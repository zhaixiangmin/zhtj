/**
 * Created by licong on 2017/11/28.
 */
$(function () {
    var mid = Utils.getQueryString('mid'); // 组织id
    if(!mid) {
        $.alert('参数不能为空');
        return;
    }

    $('#view_data').attr('href', 'member_detail.html?mid=' + mid);
    var isRealName_global = undefined; // 实名认证(全局变量)
    var auditStatus_global = undefined; // 审核状态(全局变量)

    // 是否
    var yesOrNoName = {
        '1': '是',
        '2': '否'
    };

    // 政治面貌名称
    var politicalOutlookName = {
        "1": "团员",
        "2": "党员",
        "3": "中共预备党员"
    };

    // 审核状态名称
    var auditStatusName = {
        "0": "报到被撤回",
        "1": "报到待审核",
        "2": "报到被退回",
        "3": "审核通过",
        "4": "修改资料待审核",
        "5": "修改资料被退回"
    };

    // 团内现任职务名称
    var incumbentName = {
        '1': '书记',
        '2': '副书记',
        '3': '常委',
        '4': '委员',
        '5': '候补委员',
        '6': '工作人员'
    };

    // 团干部性质名称
    var tuanganPropertiesName = {
        '1': '专职',
        '2': '兼职',
        '3': '挂职'
    };

    // 申请类型
    var applyTypeName = {
        '1': '团员报到',
        '4': '修改资料'
    };

    // 实名认证名称
    var isRealName = {
        '10': '通过', // 通过
        '1': '校验中', // 银行未通过
        '2': '校验失败', // 阿里云未通过
        '3': '线下验证通过', // 线下验证通过
        '4': '校验中' // 银行定时未通过
    };

    // 显示待审核
    function showSub(myData) {
        var list = ['income', 'politicalOutlook', 'leagueForYears', 'isCadres', 'incumbent', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember'];
        var titleName = {
            'income': '收入',
            'politicalOutlook': '政治面貌',
            'leagueForYears': '入团年月',
            'isCadres': '是否团干部',
            'incumbent': '现任职务',
            'dateOfDuty': '任现职年月',
            'tuanganProperties': '团干部性质',
            'isPartyCommitteeMember': '是否同级党委(支部)成员'
        };
        var html = '';
        for(var i=0; i<list.length; i++) {
            var option = list[i];
            var newName = 'new' + option.replace(/^\S/, function(s){return s.toUpperCase();}); // income -> 'newIncome';
            if(myData[option] != myData[newName]) { // 修改
                var oldValue = myData[option];
                var newValue = myData[newName];
                if(option == 'income') { // 收入
                    oldValue = myData[option + 'Str'];
                    newValue = myData[newName + 'Str'];
                }else if(option == 'politicalOutlook') { // 政治面貌
                    oldValue = politicalOutlookName[oldValue];
                    newValue = politicalOutlookName[newValue];
                }else if(option == 'isCadres') { // 是否团干部
                    oldValue = yesOrNoName[oldValue];
                    newValue = yesOrNoName[newValue];
                }else if(option == 'incumbent') { // 现任职务
                    oldValue = incumbentName[oldValue];
                    newValue = incumbentName[newValue];
                }else if(option == 'tuanganProperties') { // 团干部性质
                    oldValue = tuanganPropertiesName[oldValue];
                    newValue = tuanganPropertiesName[newValue];
                }else if(option == 'isPartyCommitteeMember') { // 是否同级党委(支部)成员
                    oldValue = yesOrNoName[oldValue];
                    newValue = yesOrNoName[newValue];
                }
                var text = titleName[option];
                html += '<tr>';
                html += '    <td>' + text + '</td>';
                html += '    <td>' + oldValue + '</td>';
                html += '    <td>' + newValue + '</td>';
                html += '</tr>';
                if(option == 'isCadres' && myData[newName] == 2) { // 否 -- 是否为团干部(1: 是，2：否)
                    break;
                }
            }else { // 没修改
                if(option == 'isCadres' && myData[newName] == 2) { // 否 -- 是否为团干部(1: 是，2：否)
                    break;
                }
            }
        }
        $('#data_edit table').append(html); // 染渲 表格(修改资料)
    }

    // // 显示待审核
    // function showSub(myData) {
    //     var list = ['income', 'isCadres', 'incumbent', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember'];
    //     var titleName = {
    //         'income': '收入',
    //         'isCadres': '是否团干部',
    //         'incumbent': '现任职务',
    //         'dateOfDuty': '任现职年月',
    //         'tuanganProperties': '团干部性质',
    //         'isPartyCommitteeMember': '是否同级党委(支部)成员'
    //     };
    //     var html = '';
    //     for(var i=0; i<list.length; i++) {
    //         var option = list[i];
    //         var newName = 'new' + option.replace(/^\S/, function(s){return s.toUpperCase();}); // income -> 'newIncome';
    //         if(myData[option] != myData[newName]) { // 修改
    //             var oldValue = myData[option];
    //             var newValue = myData[newName];
    //             if(option == 'income') { // 收入
    //                 oldValue = myData[option + 'Str'];
    //                 newValue = myData[newName + 'Str'];
    //             }else if(option == 'isCadres') { // 是否团干部
    //                 oldValue = yesOrNoName[oldValue];
    //                 newValue = yesOrNoName[newValue];
    //             }else if(option == 'tuanganProperties') { // 团干部性质
    //                 oldValue = tuanganPropertiesName[oldValue];
    //                 newValue = tuanganPropertiesName[newValue];
    //             }else if(option == 'isPartyCommitteeMember') { // 是否同级党委(支部)成员
    //                 oldValue = yesOrNoName[oldValue];
    //                 newValue = yesOrNoName[newValue];
    //             }
    //             var text = titleName[option];
    //             html += '<tr>';
    //             html += '    <td>' + text + '</td>';
    //             html += '    <td>' + oldValue + '</td>';
    //             html += '    <td>' + newValue + '</td>';
    //             html += '</tr>';
    //         }
    //     }
    //     $('#data_edit table').append(html); // 染渲 表格(修改资料)
    // }

    // 根据ID获取团员
    MemberApi.getMembersById({mid: mid}).then(function (data) {
        console.log('MemberApi.getMembersById data', data);
        var myData = data.rows;
        if(!myData) { // 数据为空
            return;
        }

        isRealName_global = myData.isRealName; // 实名认证(全局变量)
        $('#name').text(myData['name']); // 团员姓名
        $('#auditStatus').text(auditStatusName[myData['auditStatus']]); // 审核状态
        $('#applyType').text(applyTypeName[myData['auditStatus']]); // 申请类型
        if(myData['isRealName'] == 1 || myData['isRealName'] == 2) {
            $('#isRealName').css('color', '#d94453'); // 文字变红
        }
        $('#isRealName').text(isRealName[myData['isRealName']]); // 实名认证状态
        auditStatus_global = myData['auditStatus']; // 审核状态(全局变量)
        // $('#cancel').attr('href', 'data_audit_refuse.html?mid=' + mid + '&auditStatus=' + myData['auditStatus']); // 取消按钮(跳转链接)
        if(myData['auditStatus'] == 1) { // 报到待审核
            $('#member_registration').show(); // 显示 团员报到 表格
        }else if(myData['auditStatus'] == 4) { // 修改资料待审核
            showSub(myData);
            $('#data_edit').show(); // 显示 修改资料 表格
        }

    });

    var isClick = false; // 是否已点击(true：已点击，false：未点击)
    // 点击 '同意'
    $('#confirm').click(function () {
        var params = {
            mid: mid, // 团员id
            auditStatus: 3 // 审核通过 -- 审核状态(1:报到待审核，2:报到被退回，3:审核通过，4:修改资料待审核，5:修改资料被退回)
        };
        if(!isRealName_global) {
            $.alert('正在加载中，请稍候点击...');
            return;
        }
        // isRealName_global -- '10': '通过'(通过) ，'1': '校验中'(银行未通过)，'2': '校验失败'(阿里云未通过)，'3': '线下验证通过'(线下验证通过)，'4': '校验中'(银行定时未通过)
        if(isRealName_global == 2) { // 校验失败
            $.alert('该团员身份证校验未通过，请到PC端进行审核');
            return;
        }
        if(isRealName_global == 1 || isRealName_global == 4) { // 校验中
            $.alert('该团员的实名认证状态为校验中，暂时无法审核！');
            return;
        }

        if(isClick) { // 若已点击
            return;
        }
        // 团员身份证通过
        $.confirm('您确定同意该申请？').then(function () {
            isClick = true; // 设置已点击 -- 是否已点击(true：已点击，false：未点击)
            $('#confirm').addClass('clicked'); // 设置样式(半透明)
            
            // 团员审核
            MemberApi.audit(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    window.location.href = 'data_audit.html'; // 资料审核 页面
                });
            }).always(function () {
                isClick = false; // 设置未点击 -- 是否已点击(true：已点击，false：未点击)
                $('#confirm').removeClass('clicked'); // 设置样式(半透明)
            });
        });
    });

    // 点击 '拒绝'
    $('#cancel').click(function () {
        if(!auditStatus_global) {
            $.alert('正在加载中，请稍候点击...');
            return;
        }
        window.location.href = 'data_audit_refuse.html?mid=' + mid + '&auditStatus=' + auditStatus_global; // 跳转 拒绝页面
    });

});