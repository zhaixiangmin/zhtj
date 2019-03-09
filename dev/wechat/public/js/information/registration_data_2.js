/**
 * Created by licong on 2017/10/25.
 */
$(function () {
    var optionList_global = [ 'income', 'isCadres', 'incumbent', 'xzzny', 'tuanganProperties', 'isPartyCommitteeMember']; // 参数列表(全局变量)

    // 是否
    var yesOrNoName = {
        '1': '是',
        '2': '否'
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

    var currentSelectName_global = undefined; // 当前选择框名称(全局变量，income：收入，isCadres：是否在本支部担任团干职务)

    // 是否团干/是否同级党支部（党组织）成员
    var list_yesOrNo = [
        { id: 1, name: '是' },
        { id: 2, name: '否' }
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


    if($.cookie && $.cookie('zhtj')) {
        var zhtj = JSON.parse($.cookie('zhtj'));
        console.log('zhtj', zhtj);

        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            if(zhtj[option] == null) { // 防止资料出现null
                continue;
            }

            // 收入
            if(option == 'income' && zhtj[option]) {
                // $('#' + option).find('.arrow').text(zhtj[option]);
                $('#' + option).find('.arrow').data('id', zhtj[option]);
                if(zhtj[option]) {
                    $('#' + option).find('.arrow').text(zhtj[option + 'Str']);
                }
                continue;
            }

            // 是否在本支部担任团干职务
            if(option == 'isCadres' && zhtj[option]) {
                $('#' + option).find('.arrow').text(yesOrNoName[zhtj[option]]);
                $('#' + option).find('.arrow').data('id', zhtj[option]);
                if(zhtj[option] && zhtj[option] == 1) { // 是否为团干部(1: 是，2：否) -> 是
                    $('.isCadres').show(); // 本支部团干职务/任现职年月/团干部性质/是否同级党支部（党组织）成员
                }
                continue;
            }

            if(option == 'incumbent') { // 本支部团干职务
                $('#' + option).find('.arrow').text(incumbentName[zhtj[option]]);
                $('#' + option).find('.arrow').data('id', zhtj[option]);
                if(zhtj[incumbent] != 9) { // 其他(本支部团干职务)
                    $('#incumbentDesc').hide(); // 隐藏 职务名称
                }
                // $('#' + option).find('input').val(zhtj[option]);
                continue;
            }
            if(option == 'incumbentDesc') { // 职务名称
                $('#' + option).find('input').val(zhtj[option]);
                continue;
            }
            if(option == 'xzzny') { // 任现职年月
                $('#xzzny').find('.arrow').text(zhtj[option]);
                continue;
            }
            if(option == 'tuanganProperties') { // 团干部性质
                $('#' + option).find('.arrow').text(tuanganPropertiesName[zhtj[option]]);
                $('#' + option).find('.arrow').data('id', zhtj[option]);
                // $('#' + option).find('input').val(zhtj[option]);
                continue;
            }
            if(option == 'isPartyCommitteeMember') { // 是否同级党支部（党组织）成员
                $('#' + option).find('.arrow').text(yesOrNoName[zhtj[option]]);
                $('#' + option).find('.arrow').data('id', zhtj[option]);
                continue;
            }
        }
    }

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

    // 点击'可选择项'(是否在本支部担任团干职务/本支部团干职务/团干部性质/是否同级党支部（党组织）成员，可弹出框)
    // $('#income, #isCadres, #tuanganProperties, #isPartyCommitteeMember').click(function () {
    $('#isCadres, #incumbent, #tuanganProperties, #isPartyCommitteeMember').click(function () {
        var list = undefined;
        var text = $(this).attr('id');
        if(!text) {
            return;
        }
        currentSelectName_global = text; // 当前选择框名称(全局变量，income：收入，isCadres：是否在本支部担任团干职务，tuanganProperties：团干部性质，isPartyCommitteeMember：是否同级党支部（党组织）成员)
        if(text == 'isCadres'){ // 是否在本支部担任团干职务
            list = list_yesOrNo;
            $.alert('此处的团支部是指你在上一页面选择的“所在团支部”。').then(function () {
                initialSelect($('.select_popup .select_list'), list); // 渲染页面(选择弹出框)
                $('.select_popup').fadeIn(150); // 显示选择弹出框
            });
            return;
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

    // 点击'可选择项'(收入,可弹出框)
    $('#income').click(function () {
        var text = $(this).attr('id');
        $.alert('“收入”是你团费交纳额度的依据，请遵守团章，如实选择。').then(function () {
            currentSelectName_global = text; // 当前选择框名称(全局变量，income：收入，isCadres：是否在本支部担任团干职务，tuanganProperties：团干部性质，isPartyCommitteeMember：是否同级党支部（党组织）成员)

            // 交费档位查询
            InformationApi.getAllIncomeBracket({}).then(function (data) {
                var list = data.dataList;
                initialSelect($('.select_popup .select_list'), list, 'describe'); // 渲染页面(选择弹出框)
                $('.select_popup').fadeIn(150); // 显示选择弹出框
            })
        });
    });

    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        $('#' + currentSelectName_global).find('.arrow').text($(this).text());
        $('#' + currentSelectName_global).find('.arrow').data('id', $(this).data('id'));
        if(currentSelectName_global == 'isCadres') { // 是否在本支部担任团干职务
            if($(this).data('id') == 1) { // 是否为团干部(1: 是，2：否) -> 是
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


    // // 日期插件初始化
    // $( "#datepicker" ).datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    //     yearRange: '-20:+0',
    //     showMonthAfterYear: true,
    //     dateFormat: "yy-mm",
    //     monthNamesShort : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
    //     dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六" ],
    //     onSelect: function (dateText, inst) {
    //         $('#xzzny').find('.arrow').text(dateText);
    //         $('#datepicker').hide(); // 隐藏日期插件
    //     }
    // });
    //
    // // 点击'任职年月'(弹出日期插件)
    // $('#xzzny').click(function () {
    //     $('#datepicker').show(); // 显示日期插件
    // });
    
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

    // 点击'任职年月'(弹出日期插件)
    $('#xzzny').click(function () {
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
            $('#xzzny').find('.arrow').text(year + '-' + month);
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
            incomeStr: $('#income').find('.arrow').text(), // 收入名称
            isCadres: $('#isCadres').find('.arrow').data('id'), // 是否在本支部担任团干职务
            // incumbent: $('#incumbent').find('input').val().trim(), // 本支部团干职务
            incumbent: $('#incumbent').find('.arrow').data('id'), // 本支部团干职务
            incumbentDesc: $('#incumbentDesc').find('input').val(), // 职务名称
            xzzny: $('#xzzny').find('.arrow').text(), // 任现职年月
            tuanganProperties: $('#tuanganProperties').find('.arrow').data('id'), // 团干部性质
            isPartyCommitteeMember: $('#isPartyCommitteeMember').find('.arrow').data('id') // 是否同级党支部（党组织）成员
        };
        console.log('params_info', params_info);
        if(!params_info.income || params_info.income == '请选择') {
            $.alert('请选择收入');
            return;
        }
        if(!params_info.isCadres || params_info.isCadres == '请选择') {
            $.alert('请选择是否在本支部担任团干职务');
            return;
        }
        if(params_info.isCadres == 1) { // 是否为团干部(1: 是，2：否) -> 是
            if(!params_info.incumbent) { // 本支部团干职务
                $.alert('请输入本支部团干职务');
                return;
            }else if(params_info.incumbent == 9) { // 其他
                if(!params_info.incumbentDesc) {
                    $.alert('请输入职务名称');
                    return;
                }
            }else if (params_info.incumbent == 9) { // 非其他
                params_info.incumbentDesc = ''; // 清空 职务名称
            }
            if(!params_info.xzzny || params_info.xzzny == '请选择') { // 任现职年月
                $.alert('请选择任现职年月');
                return;
            }
            if(!params_info.tuanganProperties) { // 团干部性质
                $.alert('请输入团干部性质');
                return;
            }
            if(!params_info.isPartyCommitteeMember || params_info.isPartyCommitteeMember == '请选择') { // 是否同级党支部（党组织）成员
                $.alert('请选择现是否同级党支部（党组织）成员');
                return;
            }
        }else {
            params_info.incumbent = undefined; // 重置(本支部团干职务)
            params_info.incumbentDesc = undefined; // 重置(职务名称)
            params_info.xzzny = undefined; // 重置(任现职年月)
            params_info.tuanganProperties = undefined; // 重置(团干部性质)
            params_info.isPartyCommitteeMember = undefined; // 重置(是否同级党支部（党组织）成员)
        }

        // 存储到cookie(团员填写信息)
        if($.cookie && $.cookie('zhtj')) {
            var zhtj = JSON.parse($.cookie('zhtj'));
            for(var name in params_info) {
                zhtj[name] = params_info[name];
            }
            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
            window.location.href = 'registration_data_3.html'; // 跳转
        }
    });

});