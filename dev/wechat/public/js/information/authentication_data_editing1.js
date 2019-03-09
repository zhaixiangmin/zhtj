/**
 * Created by licong on 2017/10/25.
 */
$(function () {
    var currentSelectName_global = undefined; // 当前选择框名称(全局变量，income：收入，politicalOutlook: 政治面貌, leagueForYears: 入团年月, isCadres：本支部团干职务，tuanganProperties：团干部性质，isPartyCommitteeMember：是否同级党支部（党组织）成员)
    var optionList_global = [ 'income', 'politicalOutlook', 'leagueForYears', 'isCadres', 'incumbent', 'incumbentDesc', 'xzzny', 'tuanganProperties', 'isPartyCommitteeMember']; // 参数列表(全局变量)
    
    var list_yesOrNo = [
        { id: 1, name: '是' },
        { id: 2, name: '否' }
    ];

    // 政治面貌
    var list_politicalOutlook = [
        {
            "id": "1",
            "name": "团员"
        },
        {
            "id": "2",
            "name": "党员"
        },
        {
            "id": "3",
            "name": "中共预备党员"
        }
    ];

    // 本支部团干职务
    var list_incumbent = [
        {
            "id": "1",
            "name": "书记"
        },
        {
            "id": "2",
            "name": "副书记"
        },
        {
            "id": "3",
            "name": "组织委员"
        },
        {
            "id": "4",
            "name": "宣传委员"
        },
        {
            "id": "5",
            "name": "文体委员"
        },
        {
            "id": "6",
            "name": "生产委员"
        },
        {
            "id": "7",
            "name": "权益委员"
        },
        {
            "id": "8",
            "name": "志愿委员"
        },
        {
            "id": "9",
            "name": "其他"
        }
    ];
    
    // 团干部性质
    var list_tuanganProperties = [
        { id: 1, name: '专职' },
        { id: 2, name: '兼职' },
        { id: 3, name: '挂职' }
    ];
    
    // 是否团干/是否同级党支部（党组织）成员
    var yesOrNoName = {
        '1': '是',
        '2': '否'
    };

    // 政治面貌名称
    var politicalOutlookName ={
        "1": "团员",
        "2": "党员",
        "3": "中共预备党员"
    };
    
    // 本支部团干职务名称
    var incumbentName = {
        '1': '书记',
        '2': '副书记',
        '3': '组织委员',
        '4': '宣传委员',
        '5': '文体委员',
        '6': '生产委员',
        '7': '权益委员',
        '8': '志愿委员',
        '9': '其他'
    };

    // 团干部性质名称
    var tuanganPropertiesName = {
        '1': '专职',
        '2': '兼职',
        '3': '挂职'
    };

    //
    var data_global = {
        income: undefined, // 收入
        politicalOutlook: undefined, // 政治面貌
        leagueForYears: undefined, // 入团年月
        isCadres: undefined, // 是否团干
        incumbent: undefined, // 本支部担任团干职务
        incumbentDesc: undefined, // 职务名称
        xzzny: undefined, // 任现职年月
        tuanganProperties: undefined, // 团干部性质
        isPartyCommitteeMember: undefined // 是否同级党支部（党组织）成员
    };
    
    // 我的认证资料
    InformationApi.MyProfile({}).then(function (data) {
        var myData = data.rows;

        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            if(myData[option] == null && option != 'xzzny') { // 非任现职年月 -- 防止资料出现null
                continue;
            }
            if(option == 'xzzny' && myData['dateOfDuty'] == null) { // 任现职年月 -- 防止资料出现null
                continue;
            }

            // 收入
            if(option == 'income') {
                $('#' + option).find('.arrow').text(myData[option + 'Str']);
                $('#' + option).find('.arrow').data('id', myData[option]);
                data_global[option] = myData[option];
                continue;
            }

            // 政治面貌
            if(option == 'politicalOutlook') {
                $('#' + option).find('.arrow').text(politicalOutlookName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                data_global[option] = myData[option];
                continue;
            }

            // 入团年月
            if(option == 'leagueForYears') {
                $('#' + option).find('.arrow').text(myData[option]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                data_global[option] = myData[option];
                continue;
            }

            // 是否在本支部担任团干职务
            if(option == 'isCadres') {
                $('#' + option).find('.arrow').text(yesOrNoName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                data_global[option] = myData[option];
                if(myData[option] && myData[option] == 1) { // 是否在本支部担任团干职务(1: 是，2：否) -> 是
                    $('.isCadres').show(); // 本支部团干职务/任现职年月/团干部性质/是否同级党支部（党组织）成员
                }
                continue;
            }

            if(option == 'incumbent') { // 本支部团干职务
                $('#' + option).find('.arrow').text(incumbentName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                data_global[option] = myData[option];
                if(myData[option] == 9) { // 其他(本支部团干职务)
                    $('#incumbentDesc').show(); // 显示 职务名称
                }else { // 非其他
                    $('#incumbentDesc').hide(); // 隐藏 职务名称
                }
                continue;
            }
            if(option == 'incumbentDesc') { // 职务名称
                $('#' + option).find('input').val(myData[option]);
                data_global[option] = myData[option];
                continue;
            }
            if(option == 'xzzny') { // 任现职年月
                $('#' + option).find('.arrow').text(myData['dateOfDuty']);
                data_global[option] = myData['dateOfDuty'];
                continue;
            }
            if(option == 'tuanganProperties') { // 团干部性质
                $('#' + option).find('.arrow').text(tuanganPropertiesName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                data_global[option] = myData[option];
                continue;
            }
            if(option == 'isPartyCommitteeMember') { // 是否同级党支部（党组织）成员
                $('#' + option).find('.arrow').text(yesOrNoName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                data_global[option] = myData[option];
                continue;
            }
        }
    });

    // 点击'可选择项'(收入,可弹出框)
    $('#income').click(function () {
        var text = $(this).attr('id');
        currentSelectName_global = text; // 当前选择框名称(全局变量，income：收入，politicalOutlook: 政治面貌, leagueForYears: 入团年月, isCadres：本支部团干职务，tuanganProperties：团干部性质，isPartyCommitteeMember：是否同级党支部（党组织）成员)

        // 交费档位查询
        InformationApi.getAllIncomeBracket({}).then(function (data) {
            var list = data.dataList;
            initialSelect($('.select_popup .select_list'), list, 'describe'); // 渲染页面(选择弹出框)
            $('.select_popup').fadeIn(150); // 显示选择弹出框
        })
    });

    /**
     * 渲染页面(选择弹出框)
     * @param $selector {jquery对象} 数据父元素(选择器jquery对象)
     * @param list {array} 数据列表
     * @param name {string} 名称(列表数据项的显示名称)
     */
    var initialSelect = function ($selector, list, name) {
        var html = '';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            var name = name ? name : 'name';
            html += '<li class="select_item" data-id="' + item.id + '">' + item[name] + '</li>';
        }
        $selector.html(html);
    };

    // 点击'可选择项'(政治面貌/是否在本支部担任团干职务/本支部团干职务/团干部性质/是否同级党支部（党组织）成员，可弹出框)
    $('#politicalOutlook, #isCadres, #incumbent, #tuanganProperties, #isPartyCommitteeMember').click(function () {
        var list = undefined;
        var text = $(this).attr('id');
        if(!text) {
            return;
        }
        currentSelectName_global = text; // 当前选择框名称(全局变量，income：收入，politicalOutlook: 政治面貌, leagueForYears: 入团年月, isCadres：本支部团干职务，tuanganProperties：团干部性质，isPartyCommitteeMember：是否同级党支部（党组织）成员)
        if(text == 'politicalOutlook'){ // 政治面貌
            list = list_politicalOutlook;
        }else if(text == 'isCadres'){ // 是否在本支部担任团干职务
            list = list_yesOrNo;
        }else if(text == 'incumbent'){ // 本支部团干职务
            list = list_incumbent;
        }else if(text == 'tuanganProperties'){ // 团干部性质
            list = list_tuanganProperties;
        }else if(text == 'isPartyCommitteeMember'){ // 是否同级党支部（党组织）成员
            list = list_yesOrNo;
        }
        initialSelect($('.select_popup .select_list'), list); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });

    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        $('#' + currentSelectName_global).find('.arrow').text($(this).text());
        $('#' + currentSelectName_global).find('.arrow').data('id', $(this).data('id'));
        if(currentSelectName_global == 'isCadres') { // 是否在本支部担任团干职务
            if($(this).data('id') == 1) { // 本支部团干职务(1: 是，2：否) -> 是
                $('.isCadres').show(); // 本支部团干职务/任现职年月/团干部性质/是否同级党支部（党组织）成员
                var incumbent = $('#incumbent').data('id');
                if(incumbent == 9) { // 其他
                    $('#incumbentDesc').show(); // 显示 职务名称
                }else { // 非其他
                    $('#incumbentDesc').hide(); // 隐藏 职务名称
                }
            }else {
                $('.isCadres').hide(); // 本支部团干职务/任现职年月/团干部性质/是否同级党支部（党组织）成员
            }
        }else if(currentSelectName_global == 'incumbent') { // 本支部团干职务
            var incumbent = $(this).data('id');
            if(incumbent == 9) { // 其他
                $('#incumbentDesc').show(); // 显示 职务名称
            }else { // 非其他
                $('#incumbentDesc').hide(); // 隐藏 职务名称
            }
        }
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

    // 点击'任职年月/入团年月'(弹出日期插件)
    $('#leagueForYears, #xzzny').click(function () {
        var text = $(this).attr('id');
        if(!text) {
            return;
        }
        currentSelectName_global = text; // 当前选择框名称(全局变量，income：收入，politicalOutlook: 政治面貌, leagueForYears: 入团年月, isCadres：本支部团干职务，tuanganProperties：团干部性质，isPartyCommitteeMember：是否同级党支部（党组织）成员)
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
            $('#' + currentSelectName_global).find('.arrow').text(year + '-' + month);
            // $('#xzzny').find('.arrow').text(year + '-' + month);
            $('.select_popup_pair').fadeOut(150); // 隐藏选择弹出框 -- 两边
        }

        return false; // 防止冒泡事件
    });

    // 点击遮罩层(弹出框 -- 两边)
    $('.select_popup_pair').click(function () {
        $('.select_popup_pair').fadeOut(150); // 关闭弹出框
    });



    // 点击'下一步'
    $('.bot_big_btn').click(function () {
        var params_info = {
            income: $('#income').find('.arrow').data('id'), // 收入
            politicalOutlook: $('#politicalOutlook').find('.arrow').data('id'), // 政治面貌
            rtny: $('#leagueForYears').find('.arrow').text(), // 入团年月
            isCadres: $('#isCadres').find('.arrow').data('id'), // 是否在本支部担任团干职务
            incumbent: $('#incumbent').find('.arrow').data('id'), // 本支部团干职务
            incumbentDesc: $('#incumbentDesc').find('input').val(), // 职务名称
            xzzny: $('#xzzny').find('.arrow').text(), // 任现职年月
            tuanganProperties: $('#tuanganProperties').find('.arrow').data('id'), // 本支部团干职务性质
            isPartyCommitteeMember: $('#isPartyCommitteeMember').find('.arrow').data('id') // 是否同级党支部（党组织）成员
        };
        if(!params_info.income || params_info.income == '请选择') {
            $.alert('请选择收入');
            return;
        }
        if(!params_info.politicalOutlook || params_info.politicalOutlook == '请选择') {
            $.alert('请选择政治面貌');
            return;
        }
        if(!params_info.rtny || params_info.rtny == '请选择') {
            $.alert('请选择入团年月');
            return;
        }
        if(!params_info.isCadres || params_info.isCadres == '请选择') {
            $.alert('请选择是否在本支部担任团干职务');
            return;
        }
        if(params_info.isCadres == 1) { // 本支部团干职务(1: 是，2：否) -> 是
            if(!params_info.incumbent) {
                $.alert('请输入本支部团干职务');
                return;
            }else if(params_info.incumbent == 9) { // 其他
                if(!params_info.incumbentDesc) {
                    $.alert('请输入职务名称');
                    return;
                }
            }else if (params_info.incumbent != 9) { // 非其他
                params_info.incumbentDesc = ''; // 清空 职务名称
            }
            if(!params_info.xzzny || params_info.xzzny == '请选择') {
                $.alert('请选择任现职年月');
                return;
            }
            if(!params_info.tuanganProperties || params_info.tuanganProperties == '请选择') {
                $.alert('请选择团干部性质');
                return;
            }
            if(!params_info.isPartyCommitteeMember || params_info.isPartyCommitteeMember == '请选择') {
                $.alert('请选择是否同级党委(支部)成员');
                return;
            }
        }else {
            params_info.incumbent = undefined; // 重置(本支部团干职务)
            params_info.incumbentDesc = undefined; // 重置(职务名称)
            params_info.xzzny = undefined; // 重置(任现职年月)
            params_info.tuanganProperties = undefined; // 重置(团干部性质)
            params_info.isPartyCommitteeMember = undefined; // 重置(是否同级党支部（党组织）成员)
        }

        var isDiff = false; // 是否变动(false：没变动，true：变动)
        for(var name in data_global) {
            if(data_global[name] != params_info[name]) {
                isDiff = true;
                break;
            }
        }

        if(!isDiff) { // 信息没修改
            $.alert('请修改信息').then(function () {
                console.log('测试数据');
            });
            return;
        }

        // 团员需要审核修改接口
        InformationApi.AuditEdit(params_info).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = 'authentication_data_edit.html'; // 返回'团员身份认证' 页面
            });
        })
    });

});