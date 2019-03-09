/**
 * Created by licong on 2017/11/22.
 */

// 2018-09-14 16:34
// 显示公告(cookie屏蔽公告时间为空或更新公告时间大于屏蔽公告时间)
function showNotice() {
    var hide_notice_time = $.cookie('hide_notice_time'); // 屏蔽公告时间
    var update_notice_time = new Date('2018-09-14 16:34').getTime(); // 更新公告时间
    var showNotice = false; // 隐藏 -- 是否显示公告(true：显示，false：隐藏)
    if(!hide_notice_time || update_notice_time > hide_notice_time) { // 从未屏蔽公告/公告更新时间大于屏蔽公告时间(曾经屏蔽公告)
        showNotice = true; // 设置显示公告
    }
    if(showNotice) {
        var html = '';
        html += '<p style="text-align: center;">【系统更新公告】</p>';
        html += '<p>亲爱的共青团员：</p>';
        html += '<p>即日起，广东“智慧团建”系统已开通微信支付线上交纳团费功能。</p>';
        html += '<p><a style="color: #0d87ef;" href="view/img_scale/img_scale_notice.html">点击这里</a>查看详情。</p>';
        $('.dialog_widget_notice .content').html(html);
        $('.dialog_widget_notice').show(); // 显示弹出框(公告)

        // // 点击  图片链接(公告弹出框)
        // $('.dialog_widget_notice .photo').click(function () {
        //     window.location.href = 'view/img_scale/img_scale.html?imgUrl=noticeImg';
        // });

        // 点击'不再显示'按钮(公告弹出框)
        $('.dialog_widget_notice .cancel').click(function () {
            $('.dialog_widget_notice').hide(); // 隐藏弹出框(公告弹出框)
            $.cookie('hide_notice_time', update_notice_time, { expires: new Date('Fri, 31 Dec 9999 23:59:59 GMT'), path: '/' }); // 过期时间设置成永久
        });

        // 点击'关闭'按钮(公告)
        $('.dialog_widget_notice .confirm').click(function () {
            $('.dialog_widget_notice').hide(); // 隐藏弹出框(公告弹出框)
        });
    }
}

$(function () {
    // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
    // 团员启用状态
    var disabledName = {
        '0': '正常',
        '1': '禁用',
        '2': '满28周岁离团',
        '3': '满28周岁离团待审核',
        '4': '自行脱团',
        '5': '自行脱团待审核',
        '6': '自愿退团',
        '7': '自愿退团待审核',
        '8': '开除团籍',
        '9': '开除团籍待审核'
    };
    var normalMenu = ['authentication', 'my_org', 'my_msg', 'cost', 'org_relationship', 'tweet']; // 正常团员菜单列表
    var disabledMenu = ['authentication', 'tweet']; // 退团团员菜单列表(只能查看认证资料，不能编辑资料或新增奖励)
    var accessToken = $.cookie('__accessToken'); //获取本地accessToken
    if(accessToken) {
        // 智慧团建一号通登录
        InformationApi.bigDataLogin({accessToken: accessToken}).then(function (data) {
            console.log('bigDataLogin data', data);
        });
    }else { // 页面生成失败
        console.log('页面生成accessToken失败');
    }

    showNotice(); // 显示公告(cookie屏蔽公告时间为空或更新公告时间大于屏蔽公告时间)

    /**
     * 配备菜单
     * @param name {String} 名称
     * @param myMenu {Array} 自定义菜单
     * @param myData {Object} 团员数据对象
     */
    function configMenu(name, myMenu, myData) {
        if(myMenu.indexOf('authentication') != -1) { // 认证资料
            $('.authentication').attr('href', 'view/information/authentication_data_edit.html');
        }

        if(myMenu.indexOf('my_org') != -1) { // 我的组织
            $('.my_org').attr('href', 'view/organization/organization.html');
        }

        if(myMenu.indexOf('my_msg') != -1) { // 我的消息
            $('.my_msg').attr('href', 'view/message/message.html');
        }

        if(myMenu.indexOf('cost') != -1) { // 团费交纳
            var redirect_uri = League.api_qnzs + '/wechatOauth';
            var href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + League.appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=getOpenid4Pay#wechat_redirect'
            $('.cost').attr('href', href);

            // 团员未交团费查询(团费功能打开)
            InformationApi.getBill({}).then(function (data) {
                console.log('InformationApi.getBill data', data);
                // var href = 'view/fee/fee.html'; // 团费交纳页面(未逾期)
                // data.dataList.number = 5; // 测试数据
                if(data.dataList && data.dataList.number) {
                    var number = data.dataList.number; // 未交月数
                    var text = '';
                    if(number >= 6) {
                        text = '您已欠交团费，请尽快交纳';
                        // text = '您已欠团费超过6个月，逾期不交将有可能视为自动脱团，请尽快交纳';
                        // href = 'view/fee/fee_overdue.html'; // 团费交纳页面(逾期)
                    }else if (number > 3) {
                        text = '您已欠团费超过3个月，请尽快交纳';
                    }
                    if(text) { // 有提示语
                        $('#fee_tips').text(text);
                        $('#fee_tips').parent().show(); // 显示提示语
                    }
                    // $('.menu_block .menu_items.cost').attr('href', href); // 绑定团费交纳页面链接
                }
            });
        }

        if(myMenu.indexOf('org_relationship') != -1) { // 组织关系转接
            $('.org_relationship').attr('href', 'view/relation/transfer.html');
        }

        if(myMenu.indexOf('tweet') != -1) { // 推文列表
            $('.act_list_box').show(); // 显示推文列表
            var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
            var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
            var params = {
                type: 1, // 精华推文列表 -- 推文类型(1-精华推文列表，2-本地推文列表)
                pageIndex: 1, // 当前页码
                pageSize: 6 // 每页记录数
            };

            // 切换'标签页'(精华活动/本地活动)
            $('.act_list_box .list_title .title').click(function () {
                if($(this).hasClass('cur')) {
                    return;
                }

                $(this).addClass('cur').siblings().removeClass('cur');
                var text = $(this).text();
                if(text == '精华') { // 推文类型(1-精华推文列表，2-本地推文列表)
                    params.type = 1; // 精华推文列表
                }else {
                    params.type = 2; // 本地推文列表
                }
                params.pageIndex = 1; // 重置当前页码
                isAll_global = false; // 重置全部数据加载标识
                renderList(true); // 渲染页面列表
            });

            /**
             * 渲染页面列表
             * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
             */
            function renderList(isClear) {
                // 精华/本地推文列表
                InformationApi.introducedArticleList(params).then(function (data) {
                    console.log('InformationApi.listByMember data', data);
                    var list = data.rows;
                    var html = '';

                    Utils.showDataWithoutFilter(params, list); // 显示数据(无筛选条件，没数据就显示没数据)

                    for(var i=0; i<list.length; i++) {
                        var item = list[i];
                        var imgUrl = item.image ? item.image : 'public/img/tweet-default.png';
                        html += '<a class="item" href="' + item.linkUrl + '">';
                        html += '    <div class="pic_box"><img src="' + imgUrl + '" class="pic" /></div>';
                        html += '    <p class="item_txt">' + item.title + '</p>';
                        html += '</a>';
                    }

                    if(isClear) {
                        $('.act_list').html(html);
                    }else {
                        $('.act_list').append(html);
                    }

                    if(list.length < params.pageSize) {
                        isAll_global = true; // 设置为 全部数据加载完毕
                        return;
                    }

                    // 未加载全部数据/加载完成
                    params.pageIndex++; // 页数自增

                }).always(function () {
                    isLoading_global = false; // 设置为 加载完成
                });
            }

            if(!isLoading_global && !isAll_global) { // 加载完成，且全部数据已加载完毕
                renderList(); // 渲染页面列表(初始化页面)
            }

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
        }

        // 点击 '我的交友'
        $('.my_friends').click(function () {
            $.alert('实名靠谱的优质单身青年都将齐聚在此，敬请期待');
        });

        // 点击'功能模块图标'
        $('.menu_items').click(function () {
            var href = $(this).attr('href');
            if(!href) {
                $.alert('团员<身份证号：' + myData.idCard + '>已被组织设置为' + disabledName[myData.disabled] + '状态，不能再进行该项操作。您可以查看资料，或者联系组织处理。');
            }
        });
    }



    // 政治面貌名称
    var politicalOutlookName ={
        "1": "团员",
        "2": "党员",
        "3": "中共预备党员"
    };

    // 我的认证资料
    InformationApi.MyProfile({}).then(function (data) {
        var myData = data.rows;
        $('#name').text(myData.name); // 姓名
        $('#politicalOutlook').text(politicalOutlookName[myData.politicalOutlook]); // 政治面貌

        // myData.disabled = 0; // 测试正常

        // 团籍状态 -- 0:正常,1:禁用.2:满28周岁离团,3:满28周岁离团待审核,4:自行脱团,5:自行脱团待审核,6:自愿退团,7:自愿退团待审核,8:开除团籍,9:开除团籍待审核
        // 禁用/满28周岁离团/自行脱团/自愿退团/开除团籍
        if(myData.disabled == 1 || myData.disabled == 2 || myData.disabled == 4 || myData.disabled == 6 || myData.disabled == 8) {
            configMenu('disabled', disabledMenu, myData);
        }else { // 正常
            configMenu('normal', normalMenu, myData);
        }
    });

});