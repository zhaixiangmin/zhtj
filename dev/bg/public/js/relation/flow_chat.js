/**
 * Created by licong on 2018/2/6.
 */
$(function () {

    // 状态描述(自定义)
    var auditStatusDesc = {
        '0': '撤回',
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

    // 接转原因名称
    var causeName = {
        '1': '就业/工作调动',
        '2': '升学/转学',
        '3': '其他原因'
    };

    // 转接类型名称
    var headforName = {
        '1': '转至省内',
        '2': '转至非共青团广东省委所辖的团组织',
        '3': '退回原籍'
    };
    
    var zhtj_global = undefined; //  组织转移对象
    if(parent.window.zhtj && parent.window.zhtj.otid) { // 查看("组织关系转接-待审核"、"组织关系转接-已审核")
        zhtj_global = parent.window.zhtj; // 组织转移对象
        console.log('parent.window.zhtj', parent.window.zhtj);
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
        
        
        
        if(zhtj_global.isSingle) { // 单个审核
            $('#mName').text(zhtj_global.mName); // 团员名称
            $('.check_application').show(); // 显示 审核申请功能
        }else { // 批量审核
            $('.multiple_application').show(); // 显示
        }
        
        if(zhtj_global.mid) { // 审核(待审核)
            $('.member_info').data('mid', zhtj_global.mid); // 团员id
        }

        // 点击'查看该团员资料'
        $('.member_info').click(function () {
            var mid = $(this).data('mid');
            parent.window.zhtj = {
                mid: mid // 团员id
            };
            Utils.toggleTab('团员详情', 'view/league_menber/league_menber_detail.html'); // 创建(打开)新面板(团员详情)
        });

        // 1-4：待审核，6-9：退回，10-13：审核同意，5：转接成功
        // 1:转出团支部待审核,2:转出团支部的上级待审核,3:转入团支部待审核,4:转入团支部的上级待审核,5:接转成功,6:转出团支部退回,7:转出团支部的上级退回,8:转入团支部退回,9:转入团支部的上级退回,10:转出团支部审核同意,11:转出团支部的上级审核同意,12:转入团支部审核同意,12:转入团支部的上级审核同意
        // 我的发起详细
        RelationApi.auditList({otid: zhtj_global.otid}).then(function (data) {
            var apply = data.ApplyList[0]; // 基本资料
            var list = data.rows; // 申请步骤状态列表
            var html = '';
            var html_step = ''; // 申请步骤图形线
            if(apply && list) {
                var len = list.length; // 申请步骤状态列表的长度
                var roleName = '团员';
                if(apply.applicantType == 1) { // 组织
                    roleName = '组织';
                }
                html_step += '<li class="step_item ed">';
                html_step += '    <em class="num">1</em>';
                html_step += '    <p class="p">' + roleName + '发起申请</p>';
                html_step += '</li>';

                // 头部说明部分
                $('#headfor').text(headforName[apply.headfor]); // 转接类型
                if(apply.studyWorkUnit) {
                    $('#studyWorkUnit').text(apply.studyWorkUnit); // 学习工作单位
                    $('#studyWorkUnit_box').show(); // 显示学习工作单位
                }
                if(apply.cause) {
                    var text = causeName[apply.cause];
                    if(apply.cause == 3) { // 其他原因
                        text += ' ' + apply.causeOthers;
                    }
                    $('#cause').text(text); // 转出原因
                    $('#cause_box').show(); // 显示转出原因
                }
                if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织
                    var residence = apply.provinceName + apply.cityName + apply.countyName;
                    if(residence) {
                        $('#residence').text(residence).parents('.item').show(); // 渲染学习工作单位地点名称 并显示
                    }
                }

                var auditStatusDescTextNow =  auditStatusDesc[apply.auditStatus]; // 当前审核状态

                // 申请人类型(1:组织，２团员)
                if(apply.auditStatus == 0) { // 撤回
                    if(apply.applicantType == 1) { // 组织
                        auditStatusDescTextNow = '组织撤回';
                    }else if(apply.applicantType == 2) { // 团员
                        auditStatusDescTextNow =  '团员自行撤回';
                    }
                }

                html += '<div class="state_title">当前状态：<em class="color1 auditStatus">' + auditStatusDescTextNow + '</em></div>';
                var applyReason = causeName[apply.cause]; // 申请原因
                if(apply.cause == 3) { // 其他原因
                    applyReason += ' ' + apply.causeOthers;
                }

                if(apply.applicantType == 1) { // 组织 -- 申请人类型(1:组织，２团员)
                    html_step += '<li class="step_item ed">';
                    html_step += '    <em class="num">2</em>';
                    html_step += '    <p class="p">转出团支部已同意</p>';
                    html_step += '</li>';
                    if(apply.headfor == 1 || apply.headfor == 3) { // 省内/退回原籍
                        html += '<p class="state_item"><em class="time">' + apply.createTime + '</em><em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em> 申请把 <em class="color1">' + apply.mName + '</em> 转接到<em class="color1">【' + Utils.validOrgName(apply.newName) + '】</em></p>';
                    }else if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织
                        html += '<p class="state_item"><em class="time">' + apply.createTime + '</em><em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em> 申请把 <em class="color1">' + apply.mName + '</em> 转接到<em class="color1">非共青团广东省委所辖的团组织</em></p>';
                    }
                    for(var i=0; i<list.length; i++) {
                        var item = list[i];
                        if (i == 0) {
                            var auditStatusDescText = auditStatusDesc[item.auditStatus]; // 审核状态名称
                            var returnReason = ''; // 退回原因
                            if(item.returnReason) {
                                returnReason = '（原因：' + item.returnReason + '）';
                            }

                            if(i >= len) { // 虚拟步骤
                                html_step += '<li class="step_item ed">';
                                html_step += '    <em class="num">' + (i+3) + '</em>';
                                html_step += '    <p class="p">转出团支部的上级组织待审核</p>';
                                html_step += '</li>';
                                continue;
                            }else { // 真实步骤
                                var cur_style = (i == (len-1) ? 'cur' : 'ed'); // 是否在当前步骤(cur：当前，ed：结束)
                                html_step += '<li class="step_item ' + cur_style + '">';
                                html_step += '    <em class="num">' + (i+3) + '</em>';
                                html_step += '    <p class="p">转出团支部的上级组织' + auditStatusDescText + '</p>';
                                html_step += '</li>';
                            }

                            html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em>的上级组织<em class="color1">【' + Utils.validOrgName(apply.primalPName) + '】</em>' + auditStatusDescText + returnReason + '</p>';


                            if(auditStatusDesc[item.auditStatus] == '已退回' || auditStatusDesc[item.auditStatus] == '撤回') { // 直接退出循环
                                break;
                            }
                        } else if (i == 1) {
                            // if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织(不用转入团支部审核，所以走不到这一步)
                            //     break;
                            // }

                            var auditStatusDescText = auditStatusDesc[item.auditStatus]; // 审核状态名称
                            var returnReason = ''; // 退回原因
                            if(item.returnReason) {
                                returnReason = '（原因：' + item.returnReason + '）';
                            }

                            if(item.auditStatus == 0) { // 撤回
                                auditStatusDescText = '撤回申请';
                                html_step += '<li class="step_item ed">';
                                html_step += '    <em class="num">' + (i+3) + '</em>';
                                html_step += '    <p class="p">转出团支部已撤回申请</p>';
                                html_step += '</li>';

                                html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">' + apply.mName + '</em> 转出团支部<em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em>' + auditStatusDescText + returnReason + '</p>';
                            }else { // 非撤回
                                if(i >= len) { // 虚拟步骤
                                    html_step += '<li class="step_item ed">';
                                    html_step += '    <em class="num">' + (i+3) + '</em>';
                                    html_step += '    <p class="p">转入团支部待审核</p>';
                                    html_step += '</li>';
                                    continue;
                                }else { // 真实步骤
                                    var cur_style = (i == (len-1) ? 'cur' : 'ed'); // 是否在当前步骤(cur：当前，ed：结束)
                                    html_step += '<li class="step_item ' + cur_style + '">';
                                    html_step += '    <em class="num">' + (i+3) + '</em>';
                                    html_step += '    <p class="p">转入团支部' + auditStatusDescText + '</p>';
                                    html_step += '</li>';
                                }

                                html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">' + apply.mName + '</em> 转入团支部<em class="color1">【' + Utils.validOrgName(apply.newName) + '】</em>' + auditStatusDescText + returnReason + '</p>';
                            }

                            if(auditStatusDesc[item.auditStatus] == '已退回' || auditStatusDesc[item.auditStatus] == '撤回') { // 直接退出循环
                                break;
                            }
                        } else if (i == 2) {
                            var auditStatusDescText = auditStatusDesc[item.auditStatus]; // 审核状态名称
                            var returnReason = ''; // 退回原因
                            if(item.returnReason) {
                                returnReason = '（原因：' + item.returnReason + '）';
                            }

                            if(item.auditStatus == 0) { // 撤回
                                auditStatusDescText = '撤回申请';
                                html_step += '<li class="step_item ed">';
                                html_step += '    <em class="num">' + (i+3) + '</em>';
                                html_step += '    <p class="p">转出团支部已撤回申请</p>';
                                html_step += '</li>';

                                html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">' + apply.mName + '</em> 转出团支部<em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em>' + auditStatusDescText + returnReason + '</p>';
                            }else { // 非撤回
                                if(i >= len) { // 虚拟步骤
                                    html_step += '<li class="step_item ed">';
                                    html_step += '    <em class="num">' + (i+3) + '</em>';
                                    html_step += '    <p class="p">转入团支部的上级组织待审核</p>';
                                    html_step += '</li>';
                                    continue;
                                }else { // 真实步骤
                                    var cur_style = (i == (len-1) ? 'cur' : 'ed'); // 是否在当前步骤(cur：当前，ed：结束)
                                    html_step += '<li class="step_item ' + cur_style + '">';
                                    html_step += '    <em class="num">' + (i+3) + '</em>';
                                    html_step += '    <p class="p">转入团支部的上级组织' + auditStatusDescText + '</p>';
                                    html_step += '</li>';
                                }

                                html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">【' + Utils.validOrgName(apply.newName) + '】</em>的上级组织<em class="color1">【' + Utils.validOrgName(apply.newPName) + '】</em>' + auditStatusDescText + returnReason + '</p>';
                            }

                            if(auditStatusDesc[item.auditStatus] == '已退回' || auditStatusDesc[item.auditStatus] == '撤回') { // 直接退出循环
                                break;
                            }
                        }
                    }
                }else if(apply.applicantType == 2) { // 团员
                    if(apply.headfor == 1 || apply.headfor == 3) { // 省内/退回原籍
                        html += '<p class="state_item"><em class="time">' + apply.createTime + '</em><em class="color1">' + apply.mName + '</em> 申请从<em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em>转接到<em class="color1">【' + Utils.validOrgName(apply.newName) + '】</em>（原因：' + applyReason + '）</p>';
                    }else if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织
                        html += '<p class="state_item"><em class="time">' + apply.createTime + '</em><em class="color1">' + apply.mName + '</em> 申请从<em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em>转接到<em class="color1">非共青团广东省委所辖的团组织</em>（原因：' + applyReason + '）</p>';
                    }
                    for(var i=0; i<list.length; i++) {
                        var item = list[i];
                        if(i == 0) {
                            if(i >= len) { // 虚拟步骤
                                html_step += '<li class="step_item ed">';
                                html_step += '    <em class="num">' + (i+2) + '</em>';
                                html_step += '    <p class="p">转出团支部待审核</p>';
                                html_step += '</li>';
                                continue;
                            }else { // 真实步骤
                                var cur_style = (i == (len-1) ? 'cur' : 'ed'); // 是否在当前步骤(cur：当前，ed：结束)
                                html_step += '<li class="step_item ' + cur_style + '">';
                                html_step += '    <em class="num">' + (i+2) + '</em>';
                                html_step += '    <p class="p">转出团支部' + auditStatusDesc[item.auditStatus] + '</p>';
                                html_step += '</li>';
                            }

                            var returnReason = ''; // 退回原因
                            if(item.returnReason) {
                                returnReason = '（原因：' + item.returnReason + '）';
                            }
                            html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">' + apply.mName + ' </em>转出团支部<em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em>' + auditStatusDesc[item.auditStatus] + returnReason + '</p>';

                            if(auditStatusDesc[item.auditStatus] == '已退回') { // 直接退出循环
                                break;
                            }
                        }else if(i == 1){
                            var auditStatusDescText = auditStatusDesc[item.auditStatus]; // 审核状态名称
                            var returnReason = ''; // 退回原因
                            if(item.returnReason) {
                                returnReason = '（原因：' + item.returnReason + '）';
                            }

                            if(i >= len) { // 虚拟步骤
                                html_step += '<li class="step_item ed">';
                                html_step += '    <em class="num">' + (i+2) + '</em>';
                                html_step += '    <p class="p">转出团支部的上级组织待审核</p>';
                                html_step += '</li>';
                                continue;
                            }else { // 真实步骤
                                var cur_style = (i == (len-1) ? 'cur' : 'ed'); // 是否在当前步骤(cur：当前，ed：结束)
                                html_step += '<li class="step_item ' + cur_style + '">';
                                html_step += '    <em class="num">' + (i+2) + '</em>';
                                html_step += '    <p class="p">转出团支部的上级组织' + auditStatusDescText + '</p>';
                                html_step += '</li>';
                            }
                            html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">【' + Utils.validOrgName(apply.primalName) + '】</em>的上级组织<em class="color1">【' + Utils.validOrgName(apply.primalPName) + '】</em>' + auditStatusDescText + returnReason + '</p>';

                            if(auditStatusDesc[item.auditStatus] == '已退回') { // 直接退出循环
                                break;
                            }
                        }else if (i == 2) {
                            // if(apply.headfor == 2) { // 非共青团广东省委所辖的团组织(不用转入团支部审核，所以走不到这一步)
                            //     break;
                            // }

                            var auditStatusDescText = auditStatusDesc[item.auditStatus]; // 审核状态名称
                            var returnReason = ''; // 退回原因
                            if(item.returnReason) {
                                returnReason = '（原因：' + item.returnReason + '）';
                            }
                            if(item.auditStatus == 0) { // 撤回
                                auditStatusDescText = '团员自行撤回';
                                html_step += '<li class="step_item ed">';
                                html_step += '    <em class="num">' + (i+2) + '</em>';
                                html_step += '    <p class="p">' + auditStatusDescText + '</p>';
                                html_step += '</li>';

                                html += '<p class="state_item"><em class="time">' + item.createTime + '</em>' + auditStatusDescText + returnReason + '</p>';
                            }else { // 非撤回
                                if(i >= len) { // 虚拟步骤
                                    html_step += '<li class="step_item ed">';
                                    html_step += '    <em class="num">' + (i+2) + '</em>';
                                    html_step += '    <p class="p">转入团支部待审核</p>';
                                    html_step += '</li>';
                                    continue;
                                }else { // 真实步骤
                                    var cur_style = (i == (len-1) ? 'cur' : 'ed'); // 是否在当前步骤(cur：当前，ed：结束)
                                    html_step += '<li class="step_item ' + cur_style + '">';
                                    html_step += '    <em class="num">' + (i+2) + '</em>';
                                    html_step += '    <p class="p">转入团支部' + auditStatusDescText + '</p>';
                                    html_step += '</li>';
                                }
                                html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">' + apply.mName + ' </em>转入团支部<em class="color1">【' + Utils.validOrgName(apply.newName) + '】</em>' + auditStatusDescText + returnReason + '</p>';
                            }

                            if(auditStatusDesc[item.auditStatus] == '已退回' || auditStatusDesc[item.auditStatus] == '撤回') { // 直接退出循环
                                break;
                            }
                        }else if(i == 3){
                            var auditStatusDescText = auditStatusDesc[item.auditStatus]; // 审核状态名称
                            var returnReason = ''; // 退回原因
                            if(item.returnReason) {
                                returnReason = '（原因：' + item.returnReason + '）';
                            }

                            if(item.auditStatus == 0) { // 撤回
                                auditStatusDescText = '团员自行撤回';
                                html_step += '<li class="step_item ed">';
                                html_step += '    <em class="num">' + (i+2) + '</em>';
                                html_step += '    <p class="p">' + auditStatusDescText + '</p>';
                                html_step += '</li>';

                                html += '<p class="state_item"><em class="time">' + item.createTime + '</em>' + auditStatusDescText + returnReason + '</p>';
                            }else { // 非撤回
                                if(i >= len) { // 虚拟步骤
                                    html_step += '<li class="step_item ed">';
                                    html_step += '    <em class="num">' + (i+2) + '</em>';
                                    html_step += '    <p class="p">转入团支部的上级组织待审核</p>';
                                    html_step += '</li>';
                                    continue;
                                }else { // 真实步骤
                                    var cur_style = (i == (len-1) ? 'cur' : 'ed'); // 是否在当前步骤(cur：当前，ed：结束)
                                    html_step += '<li class="step_item ' + cur_style + '">';
                                    html_step += '    <em class="num">' + (i+2) + '</em>';
                                    html_step += '    <p class="p">转入团支部的上级组织' + auditStatusDescText + '</p>';
                                    html_step += '</li>';
                                }

                                html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">【' + Utils.validOrgName(apply.newName) + '】</em>的上级组织<em class="color1">【' + Utils.validOrgName(apply.newPName) + '】</em>' + auditStatusDescText + returnReason +  '</p>';
                            }

                            if(auditStatusDesc[item.auditStatus] == '已退回' || auditStatusDesc[item.auditStatus] == '撤回') { // 直接退出循环
                                break;
                            }
                        }
                    }
                }

                if(auditStatusDesc[apply.auditStatus] == '已完成' || auditStatusDesc[apply.auditStatus] == '已退回' || auditStatusDesc[apply.auditStatus] == '撤回') { // 结束标识
                    var text = '已完成';
                    if(auditStatusDesc[apply.auditStatus] == '已退回' || auditStatusDesc[apply.auditStatus] == '撤回') {
                        text = '流程结束';
                    }
                    html_step = html_step.replace('cur', 'ed'); // 替换 当前状态为已结束
                    html_step += '<li class="step_item done">';
                    html_step += '    <em class="num"></em>';
                    html_step += '    <p class="p">' + text + '</p>';
                    html_step += '</li>';
                }

                $('.state_box').html(html); // 渲染 申请步骤状态列表
                $('.step_list').html(html_step); // 渲染 申请步骤图形线
            }
        });

        // 点击 单选框按钮
        $('.choose_btn .btn').click(function () {
            $(this).parents('.choose').find('.btn').removeClass('cur'); // 取消勾选单选框
            $(this).addClass('cur');
            if($(this).data('id') == 2) { // 退回 -- 审核状态(1:同意，2：退回)
                $('#returnReason').parent().show(); // 显示输入框(退回原因)
            }else { // 同意
                $('#returnReason').parent().hide(); // 隐藏输入框(退回原因)
            }
        });


        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 点击'提交审核'按钮
        $('#confirm').click(function () {
            var params = {
                mid:  zhtj_global.mid, // 团员id
                otid:  zhtj_global.otid, // 组织转接申请id
                otaid:  zhtj_global.otaid, // 组织转接审核记录id
                auditStatus: $('.choose_btn .btn.cur').data('id'), // 审核状态(1:同意，2：退回)
                returnReason: $('#returnReason').val().trim() // 退回原因(auditStatus=2传入)
            };
            console.log('params', params);

            if(!params.auditStatus) {
                $.alert('请审核该申请(同意/拒绝)');
                return;
            }
            if(params.auditStatus == 1) { // 同意
                params.returnReason = undefined;
            }else if (params.auditStatus == 2 && !params.returnReason) { // 退回
                $.alert('请输入退回原因');
                return;
            }

            console.log("RelationApi.audit params", params);

            if(isClick) { // 已点击
                return;
            }
            isClick = true; // 设置为 已点击
            $('#confirm').css({opacity: 0.5});

            // 组织转接审核
            RelationApi.audit(params).then(function (data) {
                $('#dialog_audit').dialog('close'); // 关闭对话框
                $.alert(data.msg).then(function () {
                    var current_title = Utils.returnTabTitle(); // 当前面板标题
                    // Utils.toggleTab('待审核'); // 关闭指定标签页(待审核)
                    Utils.toggleNav('view/relation/todo_application.html', true); // 打开指定导航页面(待审核)
                    Utils.toggleTab(current_title); // 关闭当前标签页(业务详情)
                });
            }).always(function () {
                isClick = false; // 设置为 未点击
                $('#confirm').css({opacity: 1});
            });
        });
        
    }
});