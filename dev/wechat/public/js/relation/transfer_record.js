/**
 * Created by licong on 2018/1/23.
 */
$(function () {
    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)

    // 转出原因
    var causeName = {
        '1': '就业/工作调动',
        '2': '升学/转学',
        '3': '其他原因'
    };

    // 状态名称
    var auditStatusName = {
        '0': '撤回',
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

    var params = {
        applicantType: 2, // 团员 -- 申请人类型(1:组织，２团员) -- 后台和团员移动端=1，团员移动端=2
        page: 1,
        rows: 6
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 我的发起列表
        RelationApi.applyList(params).then(function (data) {
            console.log('RelationApi.applyList data', data);
            var list = data.rows;
            var html = '';

            Utils.showDataWithoutFilter(params, list); // 显示数据(无筛选条件，没数据就显示没数据)

            var isWithdraw = false; // 是否'撤回申请'按钮(true：'撤回申请'，false：'不可撤回')
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                // 转往（１：省内，２：非共青团广东省委所辖的团组织）
                var destination = item.headfor == 1 ? Utils.validOrgName(item.newName) : '非共青团广东省委所辖的团组织'; // 目的地
                var reason = item.cause != 3 ? causeName[item.cause] : item.causeOthers; // 原因
                var auditStatusDescText = auditStatusName[item.auditStatus];
                isWithdraw = false;
                if(item.applicantType == 2) { // 团员发起
                    if(item.auditStatus == 1 || item.auditStatus == 2 || item.auditStatus == 3 || item.auditStatus == 4) {
                        isWithdraw = true;
                    }
                }
                if(item.auditStatus == 0) { // 撤回
                    // 申请人类型(1:组织，２团员)
                    if(item.applicantType == 1) { // 组织发起
                        auditStatusDescText =  '组织撤回';
                    }else if(item.applicantType == 2) { // 团员发起
                        auditStatusDescText = '团员自行撤回';
                    }
                }
                html += '<li class="ul_li clearfix" data-id="' + item.otid + '">';
                html += '    <div class="record_text">';
                html += '        <p class="org_name prev_org">' + Utils.validOrgName(item.primalName) + '</p>';
                html += '        <p class="org_name next_org">' + destination + '</p>';
                html += '        <p class="reason">' + item.createTime + '&nbsp;&nbsp;&nbsp;' + reason + '</p>';
                html += '        <div style="position: relative;">';
                html +=  '          <p class="process">' + auditStatusDescText + '</p>';
                if(isWithdraw) {
                    html +=  '          <a class="withdraw" data-otid="' + item.otid + '" style="position: absolute; top: -0.1rem; right: 0; padding: 0.24rem 0.4rem; line-height: 1; font-size: 0.52rem; color: #fff; background: #D94453; border-radius: 0.1rem;">撤回申请</a>';
                }else { // 显示'不可撤回'按钮
                    html +=  '          <a class="unable" style="position: absolute; top: -0.1rem; right: 0; padding: 0.24rem 0.4rem; line-height: 1; font-size: 0.52rem; color: #fff; background: #CECECE; border-radius: 0.1rem;">不可撤回</a>';
                }
                html +=  '       </div>';
                html += '    </div>';
                html += '</li>';
            }

            if(isClear) {
                $('.ul').html(html);
            }else {
                $('.ul').append(html);
            }

            if(list.length < params.rows) {
                isAll_global = true; // 设置为 全部数据加载完毕
                return;
            }

            // 未加载全部数据/加载完成
            params.page++; // 页数自增
            var documentHeight = $(document).height(); // 文档高度(整个网页的高度)
            var windowHeight = $(window).height(); // 可视窗口高度
            if(windowHeight >= documentHeight) { // 可视窗口未达到滚动事件的高度
                renderList(); // 渲染页面列表(自调用)
            }

        }).always(function () {
            isLoading_global = false; // 设置为 加载完成
        });
    }

    renderList(); // 渲染页面列表(初始化页面)

    // 窗口滚动事件
    $(window).scroll(function () {
        if(isLoading_global || isAll_global) { // 正在加载，且全部数据尚未加载完毕
            return;
        }
        var documentHeight = $(document).height(); // 文档高度(整个网页的高度)
        var windowHeight = $(window).height(); // 可视窗口高度
        var scrollTop = $(window).scrollTop(); // 滚动高度(浏览器可视窗口顶端距离网页顶端的高度)
        if( (windowHeight + scrollTop) / documentHeight > 0.9) {
            // 加载完成
            isLoading_global = true; // 设置为 正在加载
            renderList(); // 渲染页面列表
        }
    });

    // 点击'撤回申请'按钮
    $('#transferRecord').on('click', '.withdraw', function () {
        var otid = $(this).data('otid');
        if(!otid) {
            $.alert('组织关系转移参数不能为空');
            return false;
        }
        
        window.location.href = 'transfer_withdraw.html?otid=' + otid; // 撤回申请

        return false;
    });

    // 点击'不可撤回'按钮
    $('#transferRecord').on('click', '.unable', function () {
        $.alert('为什么会提示无法撤回？<br/>• 如接收方支部已审核通过，确认接收，则无法再撤回申请。<br/>• 如转接申请是由支部发起的，团员本人不能申请撤回，需要发起申请的支部才能撤回。如有需要，可尽快联系支部撤回申请。');
        return false;
    });

    // 点击'列表项'(查看详情)
    $('#transferRecord').on('click', '.ul_li', function () {
        var otid = $(this).data('id'); // 组织转移申请ID
        window.location.href = 'transfer_record_detail.html?otid=' + otid; // 跳转到 '业务详情'页面
    });
});