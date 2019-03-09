/**
 * Created by licong on 2017/10/26.
 */
$(function () {
    var optionList_global = [ 'occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'rdny', 'zczyzsj']; // 参数列表(全局变量)

    // 职业名称
    var occupationName = {
        "1": "国有企业职工",
        "2": "非公企业职工",
        "3": "机关事业单位职工",
        "4": "社会组织员工",
        "5": "农民",
        "6": "学生",
        "7": "自由职业者",
        "8": "公办高校教职工",
        "9": "公办中学教职工",
        "10": "公办中职教职工",
        "11": "民办高校教职工",
        "12": "民办中学教职工",
        "13": "民办中职教职工",
        "14": "其他"
    };

    if($.cookie && $.cookie('zhtj')) {
        var zhtj = JSON.parse($.cookie('zhtj'));
        console.log('zhtj', zhtj);
        
        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            if(zhtj[option] == null) { // 防止资料出现null
                continue;
            }

            if(option == 'occupation') { // 职业
                $('#' + option).find('.arrow').text(occupationName[zhtj[option]]);
                $('#' + option).find('.arrow').data('id', zhtj[option]);
                continue;
            }
            if(option == 'learningUnit' || option == 'email' || option == 'qqNum' || option == 'wechatId' || option == 'learningUnit' || option == 'weibo' || option == 'developmentMemberNumber') {
                $('#' + option).find('input').val(zhtj[option]); // 工作单位/电子邮箱/QQ/微信号/工作单位/微博号/团员编号
                continue;
            }
            if(option == 'rdny') { // 入党年月
                $('#rdny').find('.arrow').text(zhtj[option]);
                continue;
            }
            if(option == 'zczyzsj') { // 注册志愿者时间
                $('#zczyzsj').find('.arrow').text(zhtj[option]);
                continue;
            }
        }
        
    }

    var currentDatePickerName_global = undefined; // 当前日期插件名称(全局变量，rdny：入党年月，zczyzsj：注册志愿者时间, xzzny：现任职年月)

    /**
     * 渲染页面(选择弹出框)
     * @param $selector {jquery对象} 数据父元素(选择器jquery对象)
     * @param list {array} 数据列表
     */
    var initialSelect = function (list, $selector) {
        var html = '';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            html += '<li class="select_item" data-id="' + item.id + '">' + item.name + '</li>';
        }
        $selector.html(html);
    };

    var list_occupation = [
        { "id": "1", "name": "国有企业职工" },
        { "id": "2", "name": "非公企业职工" },
        { "id": "3", "name": "机关事业单位职工" },
        { "id": "4", "name": "社会组织员工" },
        { "id": "5", "name": "农民" },
        { "id": "6", "name": "学生" },
        { "id": "7", "name": "自由职业者" },
        { "id": "8", "name": "公办高校教职工" },
        { "id": "9", "name": "公办中学教职工" },
        { "id": "10", "name": "公办中职教职工" },
        { "id": "11", "name": "民办高校教职工" },
        { "id": "12", "name": "民办中学教职工" },
        { "id": "13", "name": "民办中职教职工" },
        { "id": "14", "name": "其他" }
    ];

    // 点击'可选择项'(可弹出框)
    $('#occupation').click(function () {
        initialSelect(list_occupation, $('.select_popup .select_list')); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });


    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        $('#occupation').find('.arrow').text($(this).text());
        $('#occupation').find('.arrow').data('id', $(this).data('id'));
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

    // 点击 '入党年月/注册志愿者时间'(弹出日期插件)
    $('#rdny, #zczyzsj').click(function () {
        var text = $(this).attr('id');
        if(!text) { // 空
            return;
        }
        currentDatePickerName_global = text; // 当前日期插件名称(全局变量，rdny：入党年月，zczyzsj：注册志愿者时间)
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
            // $('#xzzny').find('.arrow').text(year + '-' + month);
            // 当前日期插件名称(全局变量，rdny：入党年月，zczyzsj：注册志愿者时间)
            $('#' + currentDatePickerName_global).find('.arrow').text(year + '-' + month);
            $('.select_popup_pair').fadeOut(150); // 隐藏选择弹出框 -- 两边
        }

        return false; // 防止冒泡事件
    });

    // 点击 '清空'(日期弹出框)
    $('.select_popup_pair .clear').click(function () {
        $('#' + currentDatePickerName_global).find('.arrow').text('请选择');
    });

    // 点击遮罩层(弹出框 -- 两边)
    $('.select_popup_pair').click(function () {
        $('.select_popup_pair').fadeOut(150); // 关闭弹出框
    });


    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 审核 -- 对话框
    // 点击 '下一步' 按钮
    $('.bot_big_btn').click(function () {
        var params_info = {
            developmentMemberNumber: $('#developmentMemberNumber').find('input').val().trim(), // 团员编号
            occupation: $('#occupation').find('.arrow').data('id'), // 职业
            learningUnit: $('#learningUnit').find('input').val().trim(), // 工作单位
            email: $('#email').find('input').val().trim(), // 电子邮箱
            qqNum: $('#qqNum').find('input').val().trim(), // QQ
            wechatId: $('#wechatId').find('input').val().trim(), // 微信号
            weibo: $('#weibo').find('input').val().trim(), // 微博号
            rdny: $('#rdny').find('.arrow').text(), // 入党年月
            zczyzsj: $('#zczyzsj').find('.arrow').text() // 注册志愿者时间
        };
        // if(params_info.developmentMemberNumber && !params_info.developmentMemberNumber.match(/^\d{12}$/)) { // 团员编号
        //     $.alert('团员编号为12位阿拉伯数字（团员的唯一编号，入团志愿书中可得到）');
        //     return;
        // }
        if(params_info.email && !Utils.checkEMail(params_info.email)) {
            $.alert('请填写正确的电子邮箱');
            return;
        }
        if(params_info.rdny == '请选择') { // 入党年月
            params_info.rdny = undefined;
        }
        if(params_info.zczyzsj == '请选择') { // 注册志愿者时间
            params_info.zczyzsj = undefined;
        }

        // 存储到cookie(团员填写信息)
        if($.cookie && $.cookie('zhtj')) {
            var zhtj = JSON.parse($.cookie('zhtj'));
            if(zhtj.rtny) { // 入团年月
                var year_rtny = zhtj.rtny.split('-')[0];
                if(year_rtny >= 2017) { // 2017年之后的团员，须输入团员编号
                    if(!params_info.developmentMemberNumber || !params_info.developmentMemberNumber.match(/^\d{12}$/)) {
                        $.alert('请正确输入团员编号<br/><br/>入团时间为2017年后的团员，团员报到时需填写“团员编号”（团员的唯一编号，为12位数字，入团志愿书中可得到）');
                        return;
                    }
                }
            }

            for(var name in params_info) { // 遍历params_info对象
                zhtj[name] = params_info[name];
            }
            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie

            // 实名制验证不通过，且身份证和姓名都没修改
            if(zhtj.idCard_realName && zhtj.name_realName && zhtj.idCard_realName == zhtj.idCard && zhtj.name_realName == zhtj.name) {
                $.alert('实名认证失败,姓名与身份证不匹配,请修改').then(function () {
                    window.location.href = 'registration_data_1.html'; // 跳转页面(身份证/姓名)
                });
                return;
            }

            if(isClick) { // 已点击
                return;
            }
            isClick = true; // 设置为 已点击
            $('.bot_big_btn').css({opacity: 0.5});
            // 团员新增/修改接口
            InformationApi.addOrEdit(zhtj).then(function (data) {
                if(data.status == 'ALERT') { // 身份证实名制不通过
                    zhtj.idCard_realName = zhtj.idCard; // 身份证(实名制)
                    zhtj.name_realName = zhtj.name; // 姓名(实名制)
                    $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
                    $.alert(data.msg).then(function () {
                        window.location.href = 'registration_data_1.html'; // 跳转页面(身份证/姓名)
                    });
                    return;
                }

                $.cookie('zhtj', null, {path: '/'}); // 删除cookie(zhtj)
                $('.popup_box_confirm').find('.ph').text(data.msg); // 提示语(弹出框内容)
                $('.popup_box_confirm').show(); // 显示 弹出框
            }).always(function () {
                isClick = false; // 设置为 未点击
                $('.bot_big_btn').css({opacity: 1});
            });

        }

    });
    
    // 红包定时动图
    setInterval(function(){
        if(!$('.popup_box_confirm .link').hasClass('move')){
            $('.popup_box_confirm .link').addClass('move');
        }else{
            $('.popup_box_confirm .link').removeClass('move');
        }
    }, 400);

    // 点击事件(弹出框按钮)
    $('.popup_box_confirm').find('.btn.left').click(function () {
        window.location.href = 'registration_data.html'; // 跳转到等待认证通过页面
    }); // 知道了，关闭(弹出框按钮)
    // 点击事件(弹出框按钮)
    $('.popup_box_confirm').find('.btn.right').click(function () {
        window.location.href = 'https://www.12355.net/wechat/index.html'; // 跳转青年之声移动端首页
    }); // 知道了，去青年之声逛逛(弹出框按钮)
});