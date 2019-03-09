/**
 * Created by licong on 2017/10/26.
 */
$(function () {
    var currentSelectName_global = undefined; // 当前选择框名称(全局变量，occupation：职业，isPartyCommitteeMember：是否同级党委（支部）成员)
    var currentDatePickerName_global = undefined; // 当前日期插件名称(全局变量，rdny：入党年月，zczyzsj：注册志愿者时间, xzzny：现任职年月)
    var leagueForYears_global = undefined; // 入团年月(全局变量)
    
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
    var list_isPartyCommitteeMember = [
        { "id": "1", "name": "是" },
        { "id": "2", "name": "否" }
    ];

    // var optionList_global = [ 'occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'thePartyYears', 'signUpForVolunteerTime']; // 参数列表(全局变量)
    var optionList_global = [ 'developmentMemberNumber', 'occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'rdny', 'zczyzsj']; // 参数列表(全局变量)

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

    // 我的认证资料
    InformationApi.MyProfile({}).then(function (data) {
        var myData = data.rows;
        if(myData['isCadres'] == 1) { // 是否团干部(1：是，2：否)
            $('.isCadres').show(); // 显示
        }
        leagueForYears_global = myData['leagueForYears']; // 入团年月(全局变量)
        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            if(myData[option] == null && option != 'rdny' && option != 'zczyzsj') { // 防止资料出现null --> ''
                continue;
            }
            if(option == 'rdny' && myData['thePartyYears'] == null) { // 入党年月
                continue;
            }
            if(option == 'zczyzsj' && myData['signUpForVolunteerTime'] == null) { // 注册志愿者时间
                continue;
            }

            if(option == 'occupation') { // 职业
                $('#' + option).find('.arrow').text(occupationName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                continue;
            }
            if(option == 'learningUnit' || option == 'email' || option == 'qqNum' || option == 'wechatId' || option == 'learningUnit' || option == 'weibo' || option == 'developmentMemberNumber') {
                $('#' + option).find('input').val(myData[option]); // 工作单位/电子邮箱/QQ/微信号/工作单位/微博号/团员编号
                continue;
            }
            if(option == 'rdny') { // 入党年月
                $('#' + option).find('.arrow').text(myData['thePartyYears']);
                continue;
            }
            if(option == 'zczyzsj') { // 注册志愿者时间
                $('#' + option).find('.arrow').text(myData['signUpForVolunteerTime']);
                continue;
            }
        }
    });

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

    // 点击'可选择项'(可弹出框) - 职业/是否统计党委(支部)成员
    $('#occupation, #isPartyCommitteeMember').click(function () {
        var list = undefined;
        var text = $(this).attr('id');
        if(!text) { // 空
            return;
        }
        currentSelectName_global = text; // 当前选择框名称(全局变量，income：收入，isCadres：是否团干部)
        if(text == 'occupation') { // 职业
            list = list_occupation;
        }else if(text == 'isPartyCommitteeMember'){ // 是否同级党委（支部）成员
            list = list_isPartyCommitteeMember;
        }
        initialSelect(list, $('.select_popup .select_list')); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });


    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        $('#' + currentSelectName_global).find('.arrow').text($(this).text());
        $('#' + currentSelectName_global).find('.arrow').data('id', $(this).data('id'));
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

    // 点击'入党年月/注册志愿者时间'(弹出日期插件)
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
                return false;
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


    // 点击 '下一步' 按钮
    $('.bot_big_btn').click(function () {
        var params_info = {
            type: 2, // 类型(1：必填，2：附加信息)
            developmentMemberNumber: $('#developmentMemberNumber').find('input').val(), // 团员编号
            occupation: $('#occupation').find('.arrow').data('id'), // 职业
            learningUnit: $('#learningUnit').find('input').val(), // 工作单位
            email: $('#email').find('input').val(), // 电子邮箱
            qqNum: $('#qqNum').find('input').val(), // QQ
            wechatId: $('#wechatId').find('input').val(), // 微信号
            weibo: $('#weibo').find('input').val(), // 微博号
            rdny: $('#rdny').find('.arrow').text(), // 入党年月
            zczyzsj: $('#zczyzsj').find('.arrow').text() // 注册志愿者时间
        };
        if(leagueForYears_global) { // 入团年月(全局变量)
            var year_leagueForYears = leagueForYears_global.split('-')[0];
            if(year_leagueForYears >= 2017 && !params_info.developmentMemberNumber) { // 2017年之后的团员，须输入团员编号
                // $.alert('请输入团员编号');
                $.alert('请输入团员编号<br/><br/>入团时间为2017年后的团员，团员报到时需填写“团员编号”（团员的唯一编号，入团志愿书中可得到）');
                return;
            }
        }

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

        if(params_info.email && !Utils.checkEMail(params_info.email)) { // 电子邮箱输入框不为空(验证邮箱格式)
            $.alert('请输入正确的电子邮箱');
            return;
        }

        console.log('params_info', params_info);
        
        // 团员不需要审核修改接口
        InformationApi.NotAuditEdit(params_info).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = 'authentication_data_edit.html'; // 返回'团员身份认证' 页面
                return;
            });
        });
    });

});