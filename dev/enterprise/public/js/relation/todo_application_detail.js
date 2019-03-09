/**
 * Created by licong on 2018/1/24.
 */
$(function () {
    var mid_global = Utils.getQueryString('mid'); // 团员ID(全局变量)
    var otid_global = Utils.getQueryString('otid'); // 组织转移申请ID(全局变量)
    var otaid_global = Utils.getQueryString('otaid'); // 组织转接审核记录id(全局变量)
    if(!mid_global || !otid_global || !otaid_global) {
        $.alert('组织转移参数不能为空');
        return;
    }
    
    // 转出原因
    var causeName = {
        '1': '就业/工作调动',
        '2': '升学/转学',
        '3': '其他原因'
    };

    // 状态名称
    var auditStatusName = {
        '1': '转出团支部待审核',
        '2': '转出团支部的上级待审核',
        '3': '转入团支部待审核',
        '4': '转入团支部的上级待审核',
        '5': '接转成功',
        '6': '转出团支部退回',
        '7': '转出团支部的上级退回',
        '8': '转入团支部退回',
        '9': '转入团支部的上级退回',
        '10': '转出团支部同意',
        '11': '转出团支部的上级同意',
        '12': '转入团支部同意',
        '13': '转入团支部的上级同意'
    };

    // 状态描述(自定义)
    var auditStatusDesc = {
        '1': '待审核', // 转出团支部待审核
        '2': '待审核', // 转出团支部的上级待审核
        '3': '待审核', // 转入团支部待审核
        '4': '待审核', // 转入团支部的上级待审核
        '5': '已完成', // 接转成功
        '6': '已退回', // 转出团支部退回
        '7': '已退回', // 转出团支部的上级退回
        '8': '已退回', // 转入团支部退回
        '9': '已退回', // 转入团支部的上级退回
        '10': '已同意', // 转出团支部同意
        '11': '已同意', // 转出团支部的上级同意
        '12': '已同意', // 转入团支部同意
        '13': '已同意' // 转入团支部的上级同意
    };

    // 转接类型名称
    var headforName = {
        '1': '转至省内',
        '2': '转至非共青团广东省委所辖的团组织',
        '3': '退回原籍'
    };


    // 1-4：待审核，6-9：退回，10-13：审核同意，5：转接成功
    // 1:转出团支部待审核,2:转出团支部的上级待审核,3:转入团支部待审核,4:转入团支部的上级待审核,5:接转成功,6:转出团支部退回,7:转出团支部的上级退回,8:转入团支部退回,9:转入团支部的上级退回,10:转出团支部审核同意,11:转出团支部的上级审核同意,12:转入团支部审核同意,12:转入团支部的上级审核同意
    // 我的发起详细
    RelationApi.auditList({otid: otid_global}).then(function (data) {
        var apply = data.ApplyList[0]; // 基本资料
        var list = data.rows; // 申请步骤状态列表
        var html = '';
        if(apply && list) {
            var len = list.length; // 申请步骤状态列表的长度
            $('#mName').text(apply.mName); // 团员名称
            $('#auditStatus').text(auditStatusName[apply.auditStatus]); // 接转状态
            $('#mid').data('id', apply.mid); // 团员ID
            $('#createTime').text(apply.createTime); // 创建时间

            // 头部说明部分
            $('#headfor').text(headforName[apply.headfor]); // 转接类型
            if(apply.studyWorkUnit) {
                $('#studyWorkUnit').text(apply.studyWorkUnit); // 学习工作单位
                $('#studyWorkUnit').parents('.item').show(); // 显示学习工作单位
            }
            if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织
                var residence = apply.provinceName + apply.cityName + apply.countyName;
                if(residence) {
                    $('#residence').text(residence).parents('.item').show(); // 渲染学习工作单位地点名称 并显示
                }
            }

            $('#primalName').text(Utils.validOrgName(apply.primalName)); // 原组织名称
            $('#newName').text(Utils.validOrgName(apply.newName)); // 新组织名称

            // if(apply.headfor == 1 || apply.headfor == 3) { // 省内/退回原籍
            //     $('#newName').text(Utils.validOrgName(apply.newName)); // 新组织名称
            //     html += '<li class="list_item ' + cur_style + '">';
            //     html += '    <i class="dot"></i>';
            //     html += '    <h1 class="h_title">转出团支部已同意</h1>';
            //     html += '    <p class="date">' + apply.createTime + '</p>';
            //     html += '    <p class="phare"><em>【' + Utils.validOrgName(apply.primalName) + '】</em>申请把 <em>' + apply.mName + '</em> 转接到<em>【' + Utils.validOrgName(apply.newName) + '】</em></p>';
            //     html += '</li>';
            // }else if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织
            //     $('#newName').text('非共青团广东省委所辖的团组织'); // 新组织名称
            //     html += '<li class="list_item ' + cur_style + '">';
            //     html += '    <i class="dot"></i>';
            //     html += '    <h1 class="h_title">转出团支部已同意</h1>';
            //     html += '    <p class="date">' + apply.createTime + '</p>';
            //     html += '    <p class="phare"><em>【' + Utils.validOrgName(apply.primalName) + '】</em>申请把 <em>' + apply.mName + '</em> 转接到 <em>非共青团广东省委所辖的团组织</em></p>';
            //     html += '</li>';
            // }

            $('#cause').text(causeName[apply.cause]); // 原因
            if(apply.cause == 3) { // 其他原因
                $('#causeOthers').text(apply.causeOthers); // 其他原因(输入框)
                $('#causeOthers').show(); // 显示 其他原因 项
            }

            if(apply.applicantType == 1) { // 组织 -- 申请人类型(1:组织，２团员)
                if(apply.headfor == 1 || apply.headfor == 3) { // 省内/退回原籍
                    $('#newName').text(Utils.validOrgName(apply.newName)); // 新组织名称
                    html += '<li class="list_item ' + cur_style + '">';
                    html += '    <i class="dot"></i>';
                    html += '    <h1 class="h_title">转出团支部已同意</h1>';
                    html += '    <p class="date">' + apply.createTime + '</p>';
                    html += '    <p class="phare"><em>【' + Utils.validOrgName(apply.primalName) + '】</em>申请把 <em>' + apply.mName + '</em> 转接到<em>【' + Utils.validOrgName(apply.newName) + '】</em></p>';
                    html += '</li>';
                }else { // 非共青团广东省委所辖的团组织
                    $('#newName').text('非共青团广东省委所辖的团组织'); // 新组织名称
                    html += '<li class="list_item ' + cur_style + '">';
                    html += '    <i class="dot"></i>';
                    html += '    <h1 class="h_title">转出团支部已同意</h1>';
                    html += '    <p class="date">' + apply.createTime + '</p>';
                    html += '    <p class="phare"><em>【' + Utils.validOrgName(apply.primalName) + '】</em>申请把 <em>' + apply.mName + '</em> 转接到 <em>非共青团广东省委所辖的团组织</em></p>';
                    html += '</li>';
                }
                for(var i=0; i<list.length; i++) {
                    var item = list[i];
                    if (i == 0) {
                        var returnReason = ''; // 退回原因
                        if(item.returnReason) {
                            returnReason = '（原因：' + item.returnReason + '）';
                        }
                        var cur_style = (i == (len-1) ? 'cur' : ''); // 是否在当前步骤(cur：当前，''：结束)
                        html += '<li class="list_item ' + cur_style + '">';
                        html += '    <i class="dot"></i>';
                        html += '    <h1 class="h_title">转出团支部的上级组织' + auditStatusDesc[item.auditStatus] + '</h1>';
                        html += '    <p class="date">' + item.createTime + '</p>';
                        html += '    <p class="phare"><em>【' + Utils.validOrgName(apply.primalName) + '】</em>的上级组织<em>【' + Utils.validOrgName(apply.primalPName) + '】</em>' + auditStatusDesc[item.auditStatus] + returnReason + '</p>';
                        html += '</li>';
                    } else if (i == 1) {
                        if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织(不用转入团支部审核，所以走不到这一步)
                            continue;
                        }
                        var returnReason = ''; // 退回原因
                        if(item.returnReason) {
                            returnReason = '（原因：' + item.returnReason + '）';
                        }
                        var cur_style = (i == (len-1) ? 'cur' : ''); // 是否在当前步骤(cur：当前，''：结束)
                        html += '<li class="list_item ' + cur_style + '">';
                        html += '    <i class="dot"></i>';
                        html += '    <h1 class="h_title">转入团支部' + auditStatusDesc[item.auditStatus] + '</h1>';
                        html += '    <p class="date">' + item.createTime + '</p>';
                        html += '    <p class="phare"><em>' + apply.mName + '</em> 转入所在组织<em>【' + Utils.validOrgName(apply.newName) + '】</em>' + auditStatusDesc[item.auditStatus] + returnReason + '</p>';
                        html += '</li>';
                    } else if (i == 2) {
                        var returnReason = ''; // 退回原因
                        if(item.returnReason) {
                            returnReason = '（原因：' + item.returnReason + '）';
                        }
                        var cur_style = (i == (len-1) ? 'cur' : ''); // 是否在当前步骤(cur：当前，''：结束)
                        html += '<li class="list_item ' + cur_style + '">';
                        html += '    <i class="dot"></i>';
                        html += '    <h1 class="h_title">转入团支部的上级组织' + auditStatusDesc[item.auditStatus] + '</h1>';
                        html += '    <p class="date">' + item.createTime + '</p>';
                        html += '    <p class="phare"><em>【' + Utils.validOrgName(apply.newName) + '】</em>的上级组织<em>【' + Utils.validOrgName(apply.newPName) + '】</em>' + auditStatusDesc[item.auditStatus] + returnReason + '</p>';
                        html += '</li>';
                    }
                }
            }else if(apply.applicantType == 2) { // 团员
                if(apply.headfor == 1 || apply.headfor == 3) { // 省内/退回原籍
                    html += '<li class="list_item ' + cur_style + '">';
                    html += '    <i class="dot"></i>';
                    html += '    <h1 class="h_title">团员发起申请</h1>';
                    html += '    <p class="date">' + apply.createTime + '</p>';
                    html += '    <p class="phare"><em>' + apply.mName + '</em>申请从 <em>【' + Utils.validOrgName(apply.primalName) + '】</em> 转接到<em>【' + Utils.validOrgName(apply.newName) + '】</em></p>';
                    html += '</li>';
                }else if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织
                    html += '<li class="list_item ' + cur_style + '">';
                    html += '    <i class="dot"></i>';
                    html += '    <h1 class="h_title">团员发起申请</h1>';
                    html += '    <p class="date">' + apply.createTime + '</p>';
                    html += '    <p class="phare"><em>' + apply.mName + '</em>申请从 <em>【' + Utils.validOrgName(apply.primalName) + '】</em> 转接到<em>非共青团广东省委所辖的团组织</em></p>';
                    html += '</li>';
                }
                for(var i=0; i<list.length; i++) {
                    var item = list[i];
                    if(i == 0) {
                        var returnReason = ''; // 退回原因
                        if(item.returnReason) {
                            returnReason = '（原因：' + item.returnReason + '）';
                        }
                        var cur_style = (i == (len-1) ? 'cur' : ''); // 是否在当前步骤(cur：当前，''：结束)
                        html += '<li class="list_item ' + cur_style + '">';
                        html += '    <i class="dot"></i>';
                        html += '    <h1 class="h_title">转出团支部' + auditStatusDesc[item.auditStatus] + '</h1>';
                        html += '    <p class="date">' + item.createTime + '</p>';
                        html += '    <p class="phare"><em>' + apply.mName + '</em> 转出所在组织<em>【' + Utils.validOrgName(apply.primalName) + '】</em>' + auditStatusDesc[item.auditStatus] + returnReason + '</p>';
                        html += '</li>';
                    }else if(i == 1){
                        var returnReason = ''; // 退回原因
                        if(item.returnReason) {
                            returnReason = '（原因：' + item.returnReason + '）';
                        }
                        var cur_style = (i == (len-1) ? 'cur' : ''); // 是否在当前步骤(cur：当前，''：结束)
                        html += '<li class="list_item ' + cur_style + '">';
                        html += '    <i class="dot"></i>';
                        html += '    <h1 class="h_title">转出团支部的上级组织' + auditStatusDesc[item.auditStatus] + '</h1>';
                        html += '    <p class="date">' + item.createTime + '</p>';
                        html += '    <p class="phare"><em>【' + Utils.validOrgName(apply.primalName) + '】</em>的上级组织<em>【' + Utils.validOrgName(apply.primalPName) + '】</em>' + auditStatusDesc[item.auditStatus] + returnReason + '</p>';
                        html += '</li>';
                    }else if (i == 2) {
                        if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织(不用转入团支部审核，所以走不到这一步)
                            continue;
                        }
                        var returnReason = ''; // 退回原因
                        if(item.returnReason) {
                            returnReason = '（原因：' + item.returnReason + '）';
                        }
                        var cur_style = (i == (len-1) ? 'cur' : ''); // 是否在当前步骤(cur：当前，''：结束)
                        html += '<li class="list_item ' + cur_style + '">';
                        html += '    <i class="dot"></i>';
                        html += '    <h1 class="h_title">转入团支部' + auditStatusDesc[item.auditStatus] + '</h1>';
                        html += '    <p class="date">' + item.createTime + '</p>';
                        html += '    <p class="phare"><em>' + apply.mName + '</em> 转入所在组织<em>【' + Utils.validOrgName(apply.newName) + '】</em>' + auditStatusDesc[item.auditStatus] + returnReason + '</p>';
                        html += '</li>';
                    }else if(i == 3){
                        var returnReason = ''; // 退回原因
                        if(item.returnReason) {
                            returnReason = '（原因：' + item.returnReason + '）';
                        }
                        var cur_style = (i == (len-1) ? 'cur' : ''); // 是否在当前步骤(cur：当前，''：结束)
                        html += '<li class="list_item ' + cur_style + '">';
                        html += '    <i class="dot"></i>';
                        html += '    <h1 class="h_title">转入团支部的上级组织' + auditStatusDesc[item.auditStatus] + '</h1>';
                        html += '    <p class="date">' + item.createTime + '</p>';
                        html += '    <p class="phare"><em>【' + Utils.validOrgName(apply.newName) + '】</em>的上级组织<em>【' + Utils.validOrgName(apply.newPName) + '】</em>' + auditStatusDesc[item.auditStatus] + returnReason + '</p>';
                        html += '</li>';
                    }
                }
            }

            if(auditStatusDesc[apply.auditStatus] == '已完成' || auditStatusDesc[apply.auditStatus] == '已退回') { // 结束标识
                var text = '已完成';
                if(auditStatusDesc[apply.auditStatus] == '已退回') {
                    text = '流程结束';
                }
                html = html.replace('cur', ''); // 替换 当前状态为已结束
                html += '<li class="list_item cur">';
                html += '    <i class="dot"></i>';
                html += '    <h1 class="h_title">' + text + '</h1>';
                html += '</li>';
            }

            $('.step_list').html(html); // 渲染 申请步骤状态列表
        }
    });

    // 点击'查看团员资料'按钮
    $('#mid').click(function () {
        window.location.href = '../member/member_detail.html?mid=' + mid_global; // 跳转到 团员详情页面
    });

    // 点击'拒绝'按钮
    $('#refuse').click(function () {
        var href = 'mid=' + mid_global + '&otid=' + otid_global + '&otaid=' + otaid_global;
        window.location.href = 'todo_application_refuse.html?' + href;
    });

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击'同意'按钮
    $('#confirm').click(function () {
        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});

        $.confirm('您确定同意该团员的组织关系转接申请？').then(function () {

            // 组织转接审核
            RelationApi.audit({
                mid: mid_global, // 团员ID(全局变量)
                otid: otid_global, // 组织转接申请id(全局变量)
                otaid: otaid_global, // 组织转接审核记录id(全局变量)
                auditStatus: 1 // 同意 -- 审核状态(1:同意，2：退回)
            }).then(function (data) {
                $.alert(data.msg).then(function () {
                    window.location.href = 'todo_application.html'; // 跳转到 待审核页面
                });
            }).always(function () {
                isClick = false; // 设置为 未点击
                $('#confirm').css({opacity: 1});
            });
        }, function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});