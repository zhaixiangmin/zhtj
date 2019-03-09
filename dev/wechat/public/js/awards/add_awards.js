/**
 * Created by licong on 2017/10/25.
 */
$(function () {
    var optionList_global = [ 'type', 'contents', 'hasLevels', 'levelNames', 'rewardTimes', 'auditOrgIds', 'awardOrgs']; // 参数列表(全局变量)
    var mid_global = undefined; // 团员ID(全局变量)

    // 我的认证资料
    AwardsApi.MyProfile({}).then(function (data) {
        var myData = data.rows;
        if(myData) {
            $('#auditOrgIds_other .right_txt').text(myData.fullName).data('id', myData.oid); // 所在团组织名称
            mid_global = myData.mid; // 团员ID(全局变量)
        }
    });

    // 恢复数据(cookie)
    if($.cookie && $.cookie('zhtj_awards')) {
        var zhtj_awards = JSON.parse($.cookie('zhtj_awards'));
        console.log('zhtj_awards', zhtj_awards);

        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            // 奖励类型
            if(option == 'type' && zhtj_awards[option]) {
                $('#' + option).find('label.checkbox_label[data-id="' + zhtj_awards[option] + '"]').addClass('active');
                if(zhtj_awards[option] == 1) { // 团内
                    $('#auditOrgIds').show(); // 显示 组织选择(团内)
                }else if(zhtj_awards[option] == 2) { // 团外
                    $('#auditOrgIds_other').show(); // 显示 所在团支部(团外)
                }
                continue;
            }

            // 奖励名称
            if(option == 'contents' && zhtj_awards[option]) {
                $('#' + option).find('input').val(zhtj_awards[option]);
                continue;
            }

            // 获奖名次
            // if(option == 'hasLevels' && zhtj_awards[option]) {
            if(option == 'hasLevels') {
                $('#' + option).find('label.checkbox_label[data-haslevel="' + zhtj_awards[option] + '"]').addClass('active');
                if(zhtj_awards[option] == true) { // 奖励有等次
                    $('#levelNames').show(); // 显示 奖励等次
                }
                continue;
            }

            // 奖励等次
            if(option == 'levelNames' && zhtj_awards[option]) {
                $('#' + option).find('input').val(zhtj_awards[option]);
                continue;
            }

            // 获奖时间
            if(option == 'rewardTimes' && zhtj_awards[option]) {
                $('#' + option).find('.arrow').text(zhtj_awards[option]);
                continue;
            }

            // 审核组织
            if(option == 'auditOrgIds' && zhtj_awards[option]) {
                $('#' + option).find('.arrow').data('id', zhtj_awards[option]).text(zhtj_awards['auditOrgNames']);
                continue;
            }

            // 授奖组织
            if(option == 'awardOrgs' && zhtj_awards[option]) {
                $('#' + option).find('input').val(zhtj_awards[option]);
                continue;
            }

        }
    }

    // 点击 '单选框'(添加选中样式)
    $('.checkbox_label').click(function () {
        var name = $(this).data('name');
        var id = $(this).data('id');
        var haslevel = $(this).data('haslevel');
        $(this).parent().find('label[data-name="' + name + '"]').removeClass('active');
        $(this).addClass('active');
        if(name == 'type') { // 奖励类型
            if(id == 1) { // 团内
                $('#auditOrgIds').show(); // 显示 组织选择
                $('#auditOrgIds_other').hide();
            }else { // 团外
                $('#auditOrgIds_other').show(); // 显示 所在团支部
                $('#auditOrgIds').hide();
            }
        }
        if(name == 'hasLevels') { // 获奖名次
            if(haslevel == true) { // 奖励有等次
                $('#levelNames').show();
            }else { // 奖励无等次
                $('#levelNames').hide();
            }
        }
    });


    /**
     * 生成日期列表弹出框
     * @param $selector {jquery对象} 数据父元素(选择器jquery对象)
     * @param year {string} 年份
     * @param month {string} 月份
     */
    var getListInDays = function ($selector, year, month) {
        var days = new Date(parseInt(year), parseInt(month), 0).getDate(); // 获取某月的天数
        var html = '';
        for(var i=0; i<days; i++) {
            var day = (i+1);
            if(day < 10) {
                day = '0' + day; // 01
            }
            var date = year + '-' + month + '-' + day;
            html += '<li class="select_item" data-date="' + date + '">' + day + '</li>';
        }
        $selector.html(html);
    };

    // 点击选中项(单排)
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        if(new Date($(this).data('date')).getTime() > new Date().getTime()) {
            $.alert('选择时间不能大于当前时间');
            return false;
        }

        $('.select_popup').fadeOut(150);
        $('#rewardTimes').find('.arrow').text($(this).data('date'));
    });

    // 点击遮罩层(弹出框)
    $('.select_popup').click(function () {
        $('.select_popup').fadeOut(150); // 关闭弹出框
    });

    // 初始化日期选择器
    (function initDateSelect() {
        var currentYear = new Date().getFullYear();
        var html = '';
        var html_month = '';
        for(var i=0; i<20; i++) {
            var year = currentYear - i;
            html += '<li class="select_item_pair">' + year + '</li>';
        }
        for(var j=1; j<13; j++) {
            var month = j;
            if(month<10) {
                month = '0' + month;
            }
            html_month += '<li class="select_item_pair">' + month + '</li>';
        }
        $('.select_popup_pair .select_list_pair.select_list_pair_left').html(html); // 年份
        $('.select_popup_pair .select_list_pair.select_list_pair_right').html(html_month); // 月份
    })();

    // 点击'获奖时间'(弹出日期插件)
    $('#rewardTimes').click(function () {
        $('.select_popup_pair').show(); // 显示日期选择器
    });

    // 点击选中项(选择弹出框 - 两边)
    $('.select_popup_pair .select_list_pair').on('click', '.select_item_pair', function(event) {
        var isLeft = $(this).parent().hasClass('select_list_pair_left');
        if(isLeft) { // 当前是左边(年份)
            if($(this).hasClass('active')) { // 当前项已选中
                return;
            }
            $(this).siblings().removeClass('active'); // 去除上一次选中样式
            $(this).addClass('active'); // 高亮当前选中项
        }else{
            var year = $('.select_popup_pair .select_list_pair.select_list_pair_left .select_item_pair.active').text(); // 年份
            if(!year) {
                return false; // 防止冒泡事件
            }

            var month = $(this).text(); // 月份
            if(new Date(year + '-' + month).getTime() > new Date().getTime()) {
                $.alert('选择时间不能大于当前时间');
                return false;
            }
            $('.select_popup_pair').fadeOut(150); // 隐藏选择弹出框 -- 两边
            getListInDays($('.select_popup .select_list'), year, month); // 生成日期列表弹出框
            $('.select_popup').fadeIn(150); // 显示选择弹出框
        }

        return false; // 防止冒泡事件
    });

    // 点击遮罩层(弹出框 -- 两边)
    $('.select_popup_pair').click(function () {
        $('.select_popup_pair').fadeOut(150); // 关闭弹出框
    });

    /**
     * 保存到cookie
     * @param params {object} 参数对象
     */
    function saveToCookie(params) {
        // 存储到cookie(团员填写信息)
        if($.cookie) {
            var zhtj_awards = {};
            for(var name in params) {
                zhtj_awards[name] = params[name];
            }
            console.log('saveToCookie zhtj_awards', zhtj_awards);

            $.cookie('zhtj_awards', JSON.stringify(zhtj_awards), {path: '/'}); // 存储到cookie
        }
    }

    // 点击'审核组织'(跳转组织选择页面)
    $('#auditOrgIds').click(function(event) {
        var rewardTimes =  $('#rewardTimes .arrow').text(); // 获奖时间
        var auditOrgIds =  $('#auditOrgIds .arrow').data('id'); // 审核组织 ID
        var auditOrgNames =  $('#auditOrgIds .arrow').text(); // 审核组织 名称
        var params = {
            type: $('#type label.checkbox_label.active').data('id'), // 奖励类型
            contents: $('#contents input').val().trim(), // 奖励名称
            hasLevels: $('#hasLevels label.checkbox_label.active').data('haslevel'), // 获奖名次
            levelNames: $('#levelNames input').val().trim(), // 奖励等次
            rewardTimes: rewardTimes == '请选择' ? undefined : rewardTimes, // 获奖时间
            auditOrgIds: auditOrgIds, // 审核组织 ID
            auditOrgNames: auditOrgNames == '请选择' ? undefined : auditOrgNames, // 审核组织 名称
            awardOrgs: $('#awardOrgs input').val().trim() // 授奖组织
        };

        saveToCookie(params); // 保存到cookie

        if(!mid_global) {
            $.alert('正在加载中，请稍候...');
            return;
        }
        window.location.href = 'branch_search.html?mid=' + mid_global; // 团支部选择 页面
    });

    $('.uploader_custom_control.add_awards').myUploader(); // 初始化上传插件

    // 点击'确定'
    $('.bot_big_btn').click(function () {
        var isClick = false; // 是否点击(false：未点击，true：已点击)

        var rewardTimes =  $('#rewardTimes .arrow').text(); // 获奖时间
        var auditOrgIds =  $('#auditOrgIds .arrow').data('id'); // 审核组织
        var params = {
            type: $('#type label.checkbox_label.active').data('id'), // 奖励类型
            contents: $('#contents input').val().trim(), // 奖励名称
            hasLevels: $('#hasLevels label.checkbox_label.active').data('haslevel'), // 获奖名次
            levelNames: $('#levelNames input').val().trim(), // 奖励等次
            rewardTimes: rewardTimes == '请选择' ? undefined : rewardTimes, // 获奖时间
            auditOrgIds: auditOrgIds, // 审核组织
            awardOrgs: $('#awardOrgs input').val().trim(), // 授奖组织
            filesPaths: $('.uploader_custom_control.add_awards .fileUrlList').text() // 证明附件
        };
        console.log('bot_big_btn params', params);
        if(!params.type) {
            $.alert('请选择奖励类型');
            return;
        }
        if(params.type != 1) { // 团外
            params.auditOrgIds = $('#auditOrgIds_other .right_txt').data('id'); // 所在团组织名称
        }
        if(!params.contents) {
            $.alert('请输入奖励名称');
            return;
        }
        if(!params.contents) {
            $.alert('请输入奖励名称');
            return;
        }
        if(Utils.hasSplitSymbolDouble(params.contents)) {
            $.alert('奖励名称不能包含特殊字符@@');
            return;
        }
        if(params.hasLevels != true && params.hasLevels != false) {
            $.alert('请选择获奖名次');
            return;
        }
        if(params.hasLevels && !params.levelNames) {
            $.alert('请输入奖励等次');
            return;
        }
        if(params.hasLevels && Utils.hasSplitSymbolDouble(params.levelNames)) {
            $.alert('奖励等次不能包含特殊字符@@');
            return;
        }
        if(!params.rewardTimes) {
            $.alert('请选择获奖时间');
            return;
        }
        if(!params.auditOrgIds) {
            $.alert('请选择审核组织');
            return;
        }
        if(!params.awardOrgs) {
            $.alert('请输入授奖组织');
            return;
        }
        if(Utils.hasSplitSymbolDouble(params.awardOrgs)) {
            $.alert('授奖组织不能包含特殊字符@@');
            return;
        }
        if(!params.filesPaths) {
            $.alert('请上传附件');
            return;
        }

        console.log('成功');
        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('.bot_big_btn').css({opacity: 0.5});
        AwardsApi.add(params).then(function (data) {
            $.alert(data.msg).then(function () {
                if($.cookie && $.cookie('zhtj_awards')) {
                    $.cookie('zhtj_awards', null, {path: '/'}); // 删除cookie(zhtj_awards)
                }
                console.log('zhtj_awards', $.cookie('zhtj_awards'));
               window.location.href = '../information/authentication_data_edit.html?type=2'; // 跳转 首页(奖惩信息面板)
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('.bot_big_btn').css({opacity: 1});
        });

    });

});