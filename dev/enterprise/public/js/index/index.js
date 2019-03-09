/**
 * Created by licong on 2017/12/12.
 */
$(function () {
    // var html = '';
    // html += '<p style="text-align: center;">【系统公告】</p>';
    // html += '<p>尊敬的用户：</p>';
    // html += '<p>为更好地准备团费在线交纳工作，广东智慧团建系统在本周日进行升级，暂停服务。我们将尽快完成升级，并于明天（9月10日，周一）重新开放系统。届时第一时间通过本系统公告通知到您。如有不便，敬请谅解。</p>';
    // html += '<p style="text-align: right;">2018年9月9号</p>';
    // $.alert(html);

    var loadedSessionAccount = false; // 是否已加载账号信息(false：未加载，true：已加载)
    var tid_global = undefined; // 团干ID(全局变量)
    var oid_global = undefined; // 组织ID(全局变量)

    $.cookie('zhtj', null, {path: '/'}); // 清除cookie(zhtj) -- 避免残留

    // 切换 '首页'/'我的'
    $('.bottom_btn_box .btn').click(function(event) {
        $(this).addClass('cur').siblings('.btn').removeClass('cur');
        $('.section_block').eq($(this).index()).show().siblings('.section_block').hide();
    });

    // 点击 '资料审核' 按钮
    $('#data_audit').click(function () {
        window.location.href = 'view/member/data_audit.html'; // 资料审核 页面
    });

    // 点击 '奖励审核' 按钮
    $('#awards_audit').click(function () {
        window.location.href = 'view/awards/awards_audit.html'; // 奖励审核 页面
    });

    // 当前登录信息
    Enterprise.getSessionAccount({}).then(function (data) {
        if(data.status == 'ALERT') { // 用户未登录
            $.alert(data.msg);
            return;
        }

        loadedSessionAccount = true; // 是否已加载账号信息(false：未加载，true：已加载)
        var account = data.account;
        // orgType -- 1：组织，2：运营者，3：超管，4：普通团干
        // if(account.orgType != 4) { // 非团干且团支部(如果是团干，隐藏'审核'按钮)
        if(account.orgType != 4) { // 非普通团干(如果是普通团干，隐藏'审核'按钮)
            $('.relation_box').show(); // (组织关系转接)模块显示
            $('.dbsx').show(); // 显示 待审核(组织关系转接)
            $('.ybsx').show(); // 显示 已审核(组织关系转接)
            $('#awards_audit').show(); // 显示 奖励审核(团员管理)
            if(account.type == 5) { // 团支部
                $('#data_audit').show(); // 显示 资料审核(团员管理)
                $('.qcsq').show(); // 显示 发起转接(组织关系转接)
                $('.wdsq').show(); // 显示 转接发起记录(组织关系转接)
            }
        }

        // 是否添加了运营者（1-组织账号，2-运营者账号,3超级管理员,4-有查看权限的团干）
        tid_global = account.tid; // 团干ID(全局变量)
        oid_global = account.oid; // 组织ID(全局变量)
        $('#operatorName').text(account.operatorName); // 名称
        if(account.orgType == 2) { // 运营者账号
            $('.operator.is').css('display', 'inline-block'); // 是运营者
            $('#operatorPositionTheLabel').text(account.operatorPositionTheLabel); // 运营者职务标签
        }else { // 非运营者账号
            $('.operator.not').css('display', 'inline-block'); // 非运营者
        }
        $('#fullName').text(account.fullName); // 当前所属组织
    });

    // 点击 '团干信息'
    $('.member_personal_info').click(function () {
        if(!loadedSessionAccount) {
            $.alert('正在加载，请稍后点击');
            return;
        }
        if(!tid_global) {
            $.alert('团干参数为空');
            return;
        }
        window.location.href='view/cadre/cadre_detail.html?tid=' + tid_global; // 跳转到 团干详情 页面
    });


    // 点击 '组织信息'
    $('.org').click(function () {
        if(!loadedSessionAccount) {
            $.alert('正在加载，请稍后点击');
            return;
        }
        if(!oid_global) {
            $.alert('组织参数为空');
            return;
        }
        window.location.href='view/organization/organization_detail.html?oid=' + oid_global; // 跳转到 组织详情 页面
    });
    
    // 点击 '切换工作组织'
    $('.switch').click(function () {
        if(!loadedSessionAccount) {
            $.alert('正在加载，请稍后点击');
            return;
        }
        if(!tid_global) {
            $.alert('团干参数为空');
            return;
        }
        window.location.href='view/identity/work_identity.html?tid=' + tid_global; // 跳转到 切换工作组织 页面
    });
});