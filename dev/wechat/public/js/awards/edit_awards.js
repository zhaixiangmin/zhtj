/**
 * Created by licong on 2017/10/25.
 */
$(function () {
    var rewardId = Utils.getQueryString('rewardId'); // 奖励ID
    var optionList_global = [ 'type', 'content', 'hasLevel', 'levelName', 'rewardTime', 'auditOrgId', 'awardOrg', 'filesList']; // 参数列表(全局变量)
    var mid_global = undefined; // 团员ID(全局变量)

    // 我的认证资料
    AwardsApi.MyProfile({}).then(function (data) {
        var myData = data.rows;
        if(myData) {
            $('#auditOrgId_other .right_txt').text(myData.fullName).data('id', myData.oid); // 所在团组织名称
            mid_global = myData.mid; // 团员ID(全局变量)
        }
    });

    // 奖惩证明附件列表查看
    // 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚)
    AwardsApi.list({objectId: rewardId, module: 1}).then(function (data) {
        var imgUrls = data.rows;
        var html = '';
        for(var i=0; i<imgUrls.length; i++) {
            var imgUrl = imgUrls[i].filePath;
            html += '<a class="img_box"><img src="' + imgUrl + '"><span class="cancel">删除</span></a>'
        }
        $('#img').html(html); // 附件
    });

    /**
     * 初始化页面
     * @param data {object} 数据对象
     */
    var initialUI = function (data) {
        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            // 奖励类型
            if(option == 'type' && data[option]) {
                $('#' + option).find('label.checkbox_label[data-id="' + data[option] + '"]').addClass('active');
                if(data[option] == 1) { // 团内
                    $('#auditOrgId').show(); // 显示 组织选择(团内)
                }else if(data[option] == 2) { // 团外
                    $('#auditOrgId_other').show(); // 显示 所在团支部(团外)
                }
                continue;
            }

            // 奖励名称
            if(option == 'content' && data[option]) {
                $('#' + option).find('input').val(data[option]);
                continue;
            }

            // 获奖名次
            if(option == 'hasLevel') {
                $('#' + option).find('label.checkbox_label[data-haslevel="' + data[option] + '"]').addClass('active');
                if(data[option] == true) { // 奖励有等次
                    $('#levelName').show(); // 显示 奖励等次
                }
                continue;
            }

            // 奖励等次
            if(option == 'levelName' && data[option]) {
                $('#' + option).find('input').val(data[option]);
                continue;
            }

            // 获奖时间
            if(option == 'rewardTime' && data[option]) {
                var rewardTime = data[option].replace(/\./g, '-');
                $('#' + option).find('.arrow').text(rewardTime);
                continue;
            }

            // 审核组织
            if(option == 'auditOrgId' && data[option]) {
                $('#' + option).find('.arrow').data('id', data[option]).text(data['auditOrgName']);
                continue;
            }

            // 授奖组织
            if(option == 'awardOrg' && data[option]) {
                $('#' + option).find('input').val(data[option]);
                continue;
            }

            // // 附件列表
            // if(option == 'filesList' && data[option]) {
            //     var imgUrls = data[option];
            //     var html = '';
            //     for(var j=0; j<imgUrls.length; j++) {
            //         var imgUrl = imgUrls[j].filePath;
            //         html += '<a class="img_box"><img src="' + imgUrl + '"><span class="cancel">删除</span></a>'
            //     }
            //     $('#img').html(html); // 附件
            //     continue;
            // }

        }
    };

    // 恢复数据(cookie)
    if($.cookie && $.cookie('zhtj_awards')) {
        var zhtj_awards = JSON.parse($.cookie('zhtj_awards'));
        console.log('zhtj_awards', zhtj_awards);

        rewardId = zhtj_awards.rewardId; // 奖励ID
        initialUI(zhtj_awards); // 初始化页面

    }else { // 第一次加载
        AwardsApi.detail({rewardId: rewardId}).then(function (data) {
            console.log('AwardsApi.detail data', data);
            var data = data.data;
            initialUI(data); // 初始化页面
        });
    }

    // 点击 '单选框'(添加选中样式)
    $('.checkbox_label').click(function () {
        var name = $(this).data('name');
        var id = $(this).data('id');
        var hasLevel = $(this).data('haslevel');
        $(this).parent().find('label[data-name="' + name + '"]').removeClass('active');
        $(this).addClass('active');
        if(name == 'type') { // 奖励类型
            if(id == 1) { // 团内
                $('#auditOrgId').show(); // 显示 组织选择
                $('#auditOrgId_other').hide();
            }else { // 团外
                $('#auditOrgId_other').show(); // 显示 所在团支部
                $('#auditOrgId').hide();
            }
        }

        if(name == 'hasLevel') { // 获奖名次
            if(hasLevel == true) { // 奖励有等次
                $('#levelName').show();
            }else { // 奖励无等次
                $('#levelName').hide();
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
        $('#rewardTime').find('.arrow').text($(this).data('date'));
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
        for(var i=0; i<50; i++) {
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
    $('#rewardTime').click(function () {
        $('.select_popup_pair').show(); // 显示日期选择器
    });

    // 点击选中项(选择弹出框 - 两边)
    $('.select_popup_pair .select_list_pair').on('click', '.select_item_pair', function(event) { // 当前是左边(年份)
        var isLeft = $(this).parent().hasClass('select_list_pair_left');
        if(isLeft) { // 当前是左边(年份)
            if($(this).hasClass('active')) { // 当前项已选中
                return false; // 防止冒泡事件
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
    $('#auditOrgId').click(function(event) {
        var rewardTime =  $('#rewardTime .arrow').text(); // 获奖时间
        var auditOrgId =  $('#auditOrgId .arrow').data('id'); // 审核组织 ID
        var auditOrgName =  $('#auditOrgId .arrow').text(); // 审核组织 名称
        var params = {
            rewardId: rewardId, // 奖励ID
            type: $('#type label.checkbox_label.active').data('id'), // 奖励类型
            content: $('#content input').val().trim(), // 奖励名称
            hasLevel: $('#hasLevel label.checkbox_label.active').data('haslevel'), // 获奖名次
            levelName: $('#levelName input').val().trim(), // 奖励等次
            rewardTime: rewardTime == '请选择' ? undefined : rewardTime, // 获奖时间
            auditOrgId: auditOrgId, // 审核组织 ID
            auditOrgName: auditOrgName == '请选择' ? undefined : auditOrgName, // 审核组织 名称
            awardOrg: $('#awardOrg input').val().trim() // 授奖组织
        };

        saveToCookie(params); // 保存到cookie

        if(!mid_global) {
            $.alert('正在加载中，请稍候...');
            return;
        }
        window.location.href = 'branch_search.html?type=edit&mid=' + mid_global; // 团支部选择 页面
    });

    // 点击'删除'文字(图片)
    $('#img').on('click', '.img_box .cancel', function () {
        var $img_box = $(this).parent();
        $.confirm('确定删除该图片').then(function () {
            $img_box.remove(); // 删除图片
        });
    });


    $('.uploader_custom_control.edit_awards').myUploader(); // 初始化上传插件

    // 点击'确定'
    $('.bot_big_btn').click(function () {
        var isClick = false; // 是否点击(false：未点击，true：已点击)

        var rewardTime =  $('#rewardTime .arrow').text(); // 获奖时间
        var auditOrgId =  $('#auditOrgId .arrow').data('id'); // 审核组织

        var filesPath = [];
        // 原有图片
        $('.list.attachment .img_box img').each(function (i, e) {
            filesPath.push($(this).attr('src'));
        });
        console.log('before filesPath', filesPath);
        // 新增图片
        if($('.uploader_custom_control.edit_awards .fileUrlList').text()) {
            var imgUrlArr = $('.uploader_custom_control.edit_awards .fileUrlList').text().split(',');
            filesPath = filesPath.concat(imgUrlArr);
        }
        console.log('filesPath', filesPath);
        var params = {
            rewardId: rewardId, // 奖励ID
            type: $('#type label.checkbox_label.active').data('id'), // 奖励类型
            content: $('#content input').val().trim(), // 奖励名称
            hasLevel: $('#hasLevel label.checkbox_label.active').data('haslevel'), // 获奖名次
            levelName: $('#levelName input').val().trim(), // 奖励等次
            rewardTime: rewardTime == '请选择' ? undefined : rewardTime, // 获奖时间
            auditOrgId: auditOrgId, // 审核组织
            awardOrg: $('#awardOrg input').val().trim(), // 授奖组织
            filesPath: filesPath // 证明附件
        };
        console.log('bot_big_btn params', params);
        if(!params.type) {
            $.alert('请选择奖励类型');
            return;
        }
        if(params.type != 1) { // 团外
            params.auditOrgId = $('#auditOrgId_other .right_txt').data('id'); // 所在团组织名称
        }
        if(!params.content) {
            $.alert('请输入奖励名称');
            return;
        }
        if(params.hasLevel != true && params.hasLevel != false) {
            $.alert('请选择获奖名次');
            return;
        }
        if(params.hasLevel && !params.levelName) {
            $.alert('请输入奖励等次');
            return;
        }
        if(params.hasLevel && Utils.hasSplitSymbolDouble(params.levelName)) {
            $.alert('奖励等次不能包含特殊字符@@');
            return;
        }
        if(!params.rewardTime) {
            $.alert('请选择获奖时间');
            return;
        }
        if(!params.auditOrgId) {
            $.alert('请选择审核组织');
            return;
        }
        if(!params.awardOrg) {
            $.alert('请输入授奖组织');
            return;
        }
        if(!params.filesPath || params.filesPath.length <= 0) {
            $.alert('请上传附件');
            return;
        }
        if(params.filesPath.length > 8) {
            $.alert('附件最多8张');
            return;
        }
        params.filesPath = params.filesPath.join(','); // 转为字符串

        console.log('成功');
        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('.bot_big_btn').css({opacity: 0.5});
        AwardsApi.edit(params).then(function (data) {
            $.alert(data.msg).then(function () {
                $.cookie('zhtj_awards', null, {path: '/'}); // 删除cookie(zhtj_awards)
               window.location.href = '../information/authentication_data_edit.html'; // 跳转
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('.bot_big_btn').css({opacity: 1});
        });

    });

});