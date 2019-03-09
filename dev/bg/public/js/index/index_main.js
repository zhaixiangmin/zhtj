/**
 * Created by licong on 2017/8/30.
 */
$(function() {
    // var html = '';
    // // html += '<p style="text-align: center;">【系统公告】</p>';
    // html += '<p>尊敬的用户：</p>';
    // html += '<p>为更好地准备团费在线交纳工作，广东智慧团建系统在本周日进行升级，暂停服务。我们将尽快完成升级，并于明天（9月10日，周一）重新开放系统。届时第一时间通过本系统公告通知到您。如有不便，敬请谅解。</p>';
    // html += '<p style="text-align: right;">2018年9月9号</p>';
    // $.alert(html, '【系统公告】');

    var typeName = {
        '1': '领导机关团组织',
        '2': '团委',
        '3': '团工委',
        '4': '团总支',
        '5': '团支部'
    };

    var orgTypeName = {
        '1': '管理员',
        '2': '运营者账号',
        '3': '超级管理员'
    };
    
    // 当前登录信息
    League.getSessionAccount({}).then(function (data) {
        var account = data.account;
        if(account) {
            parent.window.zhtj_session = account; // 设置全局变量(各个子页面都可以使用)
            console.log('parent.window.zhtj_session', parent.window.zhtj_session);
            $('#name_header').text(account.fullName); // 商户名称(顶部栏)
            // orgType(1：组织，2：运营者，3：超管，4：团干)
            if(account.orgType == 2) { // 运营者显示姓名
                $('#role').text(account.operatorName);
                $('#name_role').text(account.operatorName);
            }else {
                $('#role').text(orgTypeName[account.orgType]); // 登录角色
                $('#name_role').text(orgTypeName[account.orgType]); // 登录角色
            }
            $('#type').text(typeName[account.type]); // 组织类型
        }

    });
    
    // 点击'帮助中心'
    $('#helpCenter').click(function () {
        Utils.toggleTab('帮助中心', 'view/help/help.html'); // 创建(打开)新面板(帮助中心)
    });
    // 点击'消息'
    $('#message').click(function () {
        Utils.toggleTab('我的消息', 'view/message/message.html'); // 创建(打开)新面板(我的消息)
    });
    // 点击 未读消息
    $('.message_tips_box').click(function () {
        parent.window.zhtj = {
            referer: 'index', // 来源(首页)
            status: '0' // 未读 - 审核状态
        };
        Utils.toggleTab('我的消息', 'view/message/message.html'); // 创建(打开)新面板(我的消息)
        
        return false; // 防止冒泡事件
    });

    // 点击'安全退出'
    $('#exitLogin').click(function () {
        $.alert('确定退出').then(function () {
            // 退出登录
            League.exitAccount({}).then(function () {
                window.location.href = 'index.html'; // 跳转到登录页面
            });
        });
    });

    // /**
    //  * 适应父容器高度(easyui-tabs)
    //  */
    // function adaptParentHeight() {
    //     var height_main = $('#main>.left-side-bar').outerHeight(); // 不能用height，tab的内容区域会变高，导致内容看不全
    //     if(height_main < 780) {
    //         height_main = 780;
    //     }
    //     var height_tabs_head = 51;
    //     var height_tabs_panels_padding = 20;
    //     $('#tabs').outerHeight(height_main);
    //     $('#tabs>.tabs-panels').outerHeight(height_main-height_tabs_head);
    //     $('#tabs>.tabs-panels>.panel').outerHeight(height_main-height_tabs_head-height_tabs_panels_padding);
    //     $('#tabs>.tabs-panels>.panel>.panel-body').outerHeight(height_main-height_tabs_head-height_tabs_panels_padding);
    // }

    // $('#tabs').on('mouseout', '.tabs-header .tabs-wrap .tabs li a span', function () {
    //     console.log('mouseout');
    //     $(this).attr('title', '');
    // });

    
    // 点击组织名称(顶部栏)
    $('#name_header').click(function () {
        $('#nav li>a[href="view/organization_management/person_infomation.html"]').click(); // 自调用 点击'组织资料'(左侧菜单)
    });

    // // 点击 '消息'(顶部栏)
    // $('#message').click(function () {
    //     //获取id=tabs的元素
    //     var $tabs = $("#tabs");
    //
    //     var text = $(this).text();
    //     var url = 'view/message/message.html'; // 消息
    //
    //     //根据标题看这个面板是否存在
    //     if ($tabs.tabs("exists", text)) {
    //         //如果存在 变成被选中的状态
    //         $tabs.tabs("select", text);
    //     } else {
    //         //如果不存在则添加
    //         $tabs.tabs('add', {
    //             title: text,
    //             closable: true,
    //             content: '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>' //创建面板内容
    //         });
    //     }
    // });


    // 获取用户的站内信
    MessageApi.getUnread({
        type: 0 // 账号类型(0组织，1团干)
    }).then(function (data) {
        var num_msg = data.data;
        if(num_msg && num_msg > 0) {
            $('.header-box .header .content .right-side .message .message_tips_box .message_tips .message_num').text(num_msg);
            $('.header-box .header .content .right-side .message .message_tips_box').show(); // 显示 消息提醒
        }
    });

    // 访问路径
    var undoPath = {
        'undo_registration': 'view/league_menber/league_menber.html', // 团员报到审核
        'undo_relation': 'view/relation/todo_application.html', // 组织关系转接审核
        'undo_rewards': 'view/league_menber/league_menber.html', // 团员奖励审核
    };
    // 待办事项(团员报到审核/组织关系转接审核/团员奖励审核)
    $('.undo_box .undo_list .undo_item').click(function () {
        var idName = $(this).attr('id');
        if(idName == 'undo_registration') { // 团员报到审核
            parent.window.zhtj = {
                referer: 'home', // 来源(首页)
                auditStatus: '1' // 报到待审核 - 报到资料状态
            };
            parent.window.zhtj.auditStatus = '1'; // 报到待审核 - 报到资料状态
        } else if(idName == 'undo_rewards') { // 团员奖励审核
            parent.window.zhtj = {
                referer: 'home', // 来源(首页)
                rewardStatus: '2' // 待本组织审核 -- 奖励状态
            };
        }
        Utils.toggleNav(undoPath[idName], true); // 创建(打开)新面板
    });
    // 访问路径
    var accessPath = {
        'access_organization': 'view/organization_management/organization_management.html', // 组织
        'access_cadre': 'view/cadre_management/cadre_management.html', // 团干
        'access_member': 'view/league_menber/league_menber.html', // 团员
        'access_fee': 'view/fee_management/fee_query.html', // 团费
        'access_relation': 'view/relation/todo_application.html', // 转接审核
        'access_more': 'view/organization_management/statistics.html', // 更多统计
    };
    // 点击快速入口(组织/团干/团员/团费/转接审核/更多统计)
    $('.fast_access .fast_access_part .access').click(function () {
        var idName = $(this).attr('id');
        if(idName == 'access_organization' && parent.window.zhtj_session.type == 5) { // 点击‘组织’图标&&组织类型为团支部
          // accessPath['access_organization'] = 'view/organization_management/person_infomation.html' // 组织详情页面
          Utils.toggleTab('组织资料', 'view/organization_management/person_infomation.html'); // 关闭/创建(打开)新面板 -- 组织资料页面
        }else {
          Utils.toggleNav(accessPath[idName], true); // 创建(打开)新面板
        }
    });

    // 点击'公告更多'
    $('.tab_box .notice_box .notice_title_box').click(function () {
        Utils.toggleTab('公告', 'view/notice_management/notice_list.html'); // 创建(打开)新面板(公告详情)
    });

    // 公告管理列表
    NoticeManagementApi.list({pageIndex: 1, pageSize: 6}).then(function (data) {
        var list = data.rows;
        var html='';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            html += '<li class="notice_item clearfix" data-id="' + item.id + '">';
            html += '	<a href="javascript:;" class="link">' + item.title + '</a>';
            html += '	<span class="date">' + item.createTime + '</span>';
            html += '</li>';
        }

        $('.notice_list').append(html);
    });

    // 点击公告标题
    $('.notice_list').on('click', '.notice_item', function () {
        parent.window.zhtj = {
            noticeId: $(this).data('id') // 公告ID
        };
        Utils.toggleTab('公告详情', 'view/notice_management/notice_detail.html'); // 创建(打开)新面板(公告详情)
    });



    // 后台管理权限获取
    League.limit({}).then(function (data) {
        // console.log('data', data);

        // 根据菜单名称获取图标
        function iconClsName(name) {
            if(name == '组织管理') {
                return 'icon-manage';
            }else if(name == '团干管理') {
                return 'icon-team';
            }else if(name == '权限设置') {
                return 'icon-limit';
            }else if(name == '系统管理') {
                return 'icon-system';
            }else if(name == '组织关系转接') {
                return 'icon-transfer';
            }else if(name == '消息管理') {
                return 'icon-message';
            }else if(name == '团费管理') {
                return 'icon-money';
            }else if(name == '团员管理') {
                return 'icon-member';
            }else if(name == '首页文章管理') {
                return 'icon-tweet';
            }else {
                return 'icon-team';
            }
        }

        if(data.rows && data.rows.length > 0) {
            var lastName = '';
            var limitList = data.rows;
            for(var i=0; i<limitList.length; i++){
                var html = '';
                var limit = limitList[i];
                html += '<ul>';
                if(limit.child && limit.child.length > 0) {
                    for(var j=0; j<limit.child.length; j++) {
                        var subLimit = limit.child[j];

                        var hrefHmtl = subLimit.href; // 链接html
                        if(subLimit.href && subLimit.limt && subLimit.limt.length > 0) {
                            hrefHmtl = subLimit.href + '?limit=' + subLimit.limt.join(',');
                        }

                        html += '	<li>';
                        html += '		<a href="' + hrefHmtl + '">' + subLimit.name + '</a>';
                        html += '	</li>';
                    }
                }

                html += '</ul>';

                $('#nav').accordion('add', {
                    title : limit.name,
                    iconCls : iconClsName(limit.name),
                    selected: true, // 必须设置，否则无法查看第二级导航折叠菜单（权限页面跳转） -- 设置为 true 就展开面板（panel）
                    // selected: false, // 默认
                    content : html
                });
                lastName = limit.name;
            }
            // console.log('lastName', lastName);
            if(lastName) {
                $('#nav').accordion('unselect', lastName); // 设置未选中最后一个
            }
        }

        // adaptParentHeight(); // 适应父容器高度(easyui-tabs)
    });

    // 点击'菜单导航'(创建/打开新面板)
    $('#nav').on('click', 'li>a' , function () {
        //获取id=tabs的元素
        var $tabs = $("#tabs");

        var text = $(this).text();
        var url = this.href;

        $('#nav li').removeClass('active');
        $(this).parent().addClass('active');

        // var developingMenuList = ['运营者管理', '团员管理', '新增组织团干', '团干管理', '测试1']; // 正在开发中菜单列表
        // var developingMenuList = ['我的团干']; // 正在开发中菜单列表
        // var developingMenuList = ['']; // 正在开发中菜单列表
        // for(var i=0; i<developingMenuList.length; i++) {
        //     var developingMenu = developingMenuList[i];
        //     if(text == developingMenu) {
        //         $.alert('正在开发中...');
        //         // return;
        //         return false;
        //     }
        // }
        // // 监听 事件
        // $tabs.tabs({
        //     onSelect: function (title, index) {
        //         console.log('title', title);
        //         console.log('index', index);
        //     }
        // });

        //根据标题看这个面板是否存在
        if ($tabs.tabs("exists", text)) {
            //如果存在 变成被选中的状态
            $tabs.tabs("select", text);
        } else {
            //如果不存在则添加
            $tabs.tabs('add', {
                title : text,
                closable : true,
                content : '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>' //创建面板内容
            });
        }

        $('html').scrollTop(0); // 滚动到顶部

        return false;
    });

    // 面板标题鼠标悬浮监听事件
    $('#tabs').on('mouseover', '.tabs-header .tabs-wrap .tabs li a span', function () {
        console.log('mouseover');
        $(this).attr('title', $(this).text());
    });

    $(window).resize(function () {          //当浏览器大小变化时

        //获取id=tabs的元素
        var $tabs = $("#tabs");
        $tabs.tabs('resize'); // 调整标签页（tabs）容器的尺寸并做布局

        // alert($(window).height());          //浏览器时下窗口可视区域高度
        // alert($(document).height());        //浏览器时下窗口文档的高度
        // alert($(document.body).height());   //浏览器时下窗口文档body的高度
        // alert($(document.body).outerHeight(true)); //浏览器时下窗口文档body的总高度 包括border padding margin
    });
});