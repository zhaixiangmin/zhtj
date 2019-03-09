/**
 * Created by licong on 2017/10/25.
 */
$(function () {
    var currentSelectName_global = undefined; // 当前选择框名称(全局变量，rtny：入团年月，csnyr：出生日期, idCardType: 证件类型 )
    var ym_global = undefined; // 年月(全局变量)
    // 证件类型
    var list_idCardType = [
        { id: 1, name: '普通居民身份证' },
        { id: 2, name: '境外身份证' }
    ];
    // 证件类型名称
    var idCardTypeName = {
        '1': '普通居民身份证',
        '2': '境外身份证'
    };
    var isEdit_global = undefined; // 当前是否修改资料标识(全局变量，true：是，false：否)
    var mid_global = undefined; // 团员ID(全局变量)

    // 身份证(失去焦点)
    $('#idCard input').blur(function () {
        var idCardType = $('#idCardType').find('.arrow').data('id'); // 证件类型(1：普通居民身份证，2：境外身份证)
        var idCard = $(this).val().trim().toUpperCase();
        if(idCard.length == 0) {
            $('#csnyr').find('.arrow').text('请选择'); // 重置 出生日期
        }

        if(idCardType == 2) { // 境外身份证
            return;
        }

        if(!idCard) {
            return;
        }
        var msg = Utils.checkIdCard(idCard); // 校验身份证
        if(msg != 'true') {
            $.alert(msg);
            return;
        }
        var params = {
            idCard: idCard, // 身份证
            type: isEdit_global ? 'edit': 'add', // 类型(新增：add，修改：edit)
            mid: isEdit_global ? mid_global : undefined // 团员id
        };

        if(idCard.length == 18) {
            var year = idCard.substring(6, 10);
            var month = idCard.substring(10, 12);
            var day = idCard.substring(12, 14);
            $('#csnyr').find('.arrow').text(year + '-' + month + '-' + day);
        }

        // 验证团员是否重复
        InformationApi.getMembersIdCard(params).then(function (data) {
            if(data.status == 'ALERT') {
                $.alert(data.msg);
                return;
            }

        });
    });

    if($.cookie && $.cookie('zhtj')) {
        var zhtj = JSON.parse($.cookie('zhtj'));
        console.log('zhtj', zhtj);
        if(zhtj['referrer'] == 'member_choose') { // 上一页面来源(选择支部成员)
            $('#idCardType').find('.arrow').text(list_idCardType[0].name).data('id', list_idCardType[0].id); // 证件类型默认选中 普通居民身份证
            $('#idCard').find('input').val(zhtj['idCard']); // 身份证
            $('#idCard input').blur(); // 触发身份证失去焦点事件
            zhtj['referrer'] = undefined; // 清除上一页面来源字段
            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
        }else { // 正常报到流程
            isEdit_global = zhtj['isEdit']; // 当前是否修改资料标识(全局变量，true：是，false：否)
            mid_global = zhtj['mid']; // 团员ID(全局变量)
            $('#name').find('input').val(zhtj['name']); // 姓名
            $('#idCard').find('input').val(zhtj['idCard']); // 身份证
            $('#csnyr').find('.arrow').text(zhtj['csnyr']); // 出生日期
            // 入团年月
            $('#rtny').find('.arrow').text(zhtj['rtny']);
            if(!isEdit_global || (isEdit_global && zhtj['oidIsChosen'])) { // 新增/编辑且重新选择团支部
                // 所在团支部ID/名称
                $('#oid').find('.arrow').text(zhtj['oidName']).data('id', zhtj['oid']);
            }
            $('#idCardType').find('.arrow').text(idCardTypeName[zhtj['idCardType']]).data('id', zhtj['idCardType']); // 证件类型
        }
    }else { // 无cookie
        $('#idCardType').find('.arrow').text(list_idCardType[0].name).data('id', list_idCardType[0].id); // 证件类型默认选中 普通居民身份证
    }

    // 440883198909183551
    // 点击'手机号码已过期不用，申请重新绑定'
    $('body').on('click', '.rebind', function () {
        if($.cookie) {
            if($.cookie('zhtj')) {
                $.cookie('zhtj', null, {path: '/'}); // 删除cookie(zhtj)
            }
            var zhtj = {
                phone: $(this).data('phone'), // 手机号码
                idCard: $(this).data('id') // 身份证号
            };
            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
        }
        window.location.href = '../bind/phone_bind.html'; // 跳转到'登录手机绑定'页面
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

    // 点击'可选择项'(证件类型)
    $('#idCardType').click(function () {
        currentSelectName_global = 'idCardType';
        initialSelect($('.select_popup .select_list'), list_idCardType); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });

    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        if(currentSelectName_global == 'idCardType') { // 证件类型
            $('#idCardType').find('.arrow').text($(this).text());
            $('#idCardType').find('.arrow').data('id', $(this).data('id'));
            $('#idCard input').blur(); // 触发事件 -- 身份证(失去焦点)
        }else { // 出生日期
            $('#csnyr').find('.arrow').text(ym_global + '-' + $(this).text());
        }

        return false; // 防止冒泡事件
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

    // 点击 '入团年月'(弹出日期插件)
    $('#rtny, #csnyr').click(function () {
        var text = $(this).attr('id');
        if(!text) {
            return;
        }
        if(text == 'csnyr') {
            var idCardType = $('#idCardType').find('.arrow').data('id'); // 证件类型
            if(idCardType && idCardType != 2) { // 普通居民身份证
                var csnyr = $('#csnyr').find('.arrow').text();
                if(!csnyr || csnyr == '请选择') {
                    var idCard = $('#idCard').find('input').val().trim().toUpperCase();
                    if(!idCard) {
                        $.alert('请输入准确完整的身份证号');
                    }else {
                        $('#idCard input').blur(); // 触发事件 -- 身份证(失去焦点)
                    }
                }else {
                    $.alert('出生日期以身份证日期为准，暂不支持编辑修改。如有错误，请核对是否身份证号码输入错误，可编辑修改身份证号。');
                    // $.alert('出生日期以身份证日期为准，暂不支持修改，请知悉。');
                }
                return;
            }
        }
        currentSelectName_global = text; // 当前选择框名称(全局变量，rtny：入团年月，csnyr：出生日期, idCardType: 证件类型)

        $('.select_popup_pair').show(); // 显示日期选择器
    });

    /**
     * 获取对应年月的天数
     * @param year {string} 年
     * @param month {string} 月
     * @returns {Array}
     */
    function getDaysArray(year, month) {
        var days = 0;
        var list_days = [];
        if(month==4||month==6||month==9||month==11){  //如果月份是4,6,9,11
            days = 30;
        }
        else if(month==2){  //如果月份是2
            if(year%4==0 || year%400==0 && year%100!=0){   //如果是闰年
                days = 29;
            }
            else{
                days = 28;  //如果是平年
            }
        }
        else{
            days = 31;  //如果月份是其它的
        }

        for(var i=1; i<=days; i++) {
            var d = i;
            if(d<10) {
                d = '0' + d;
            }
            list_days.push({ id: d, name: d });
        }
        
        return list_days;
    }

    // 点击选中项(选择弹出框 - 两边)
    $('.select_popup_pair .select_list_pair').on('click', '.select_item_pair', function(event) {
        var isLeft = $(this).parent().hasClass('select_list_pair_left');
        if(isLeft) { // 当前是左边(年份)
            if($(this).hasClass('active')) { // 当前项已选中
                return;
            }
            $(this).siblings().removeClass('active'); // 去除上一次选中样式
            $(this).addClass('active'); // 高亮当前选中项
        } else{
            var year = $('.select_popup_pair .select_list_pair.select_list_pair_left .select_item_pair.active').text(); // 年份
            if(!year) {
                return false; // 防止冒泡事件
            }
            var month = $(this).text(); // 月份
            if(new Date(year + '-' + month).getTime() > new Date().getTime()) {
                $.alert('选择时间不能大于当前时间');
                return false;
            }

            if(currentSelectName_global == 'csnyr') { // 出生日期
                ym_global = year + '-' + month; // 年月(全局变量)
                initialSelect($('.select_popup .select_list'), getDaysArray(year, month)); // 渲染页面(选择弹出框)
                $('.select_popup').fadeIn(150); // 显示选择弹出框
            } else { // 入团年月
                $('#' + currentSelectName_global).find('.arrow').text(year + '-' + month);
            }
            $('.select_popup_pair').fadeOut(150); // 隐藏选择弹出框 -- 两边
        }

        return false; // 防止冒泡事件
    });

    // 点击遮罩层(弹出框 -- 两边)
    $('.select_popup_pair').click(function () {
        $('.select_popup_pair').fadeOut(150); // 关闭弹出框
    });

    // 点击'所在团支部'(弹出框)
    $('#oid').click(function(event) {
        // $.alert('请认真核实你所在的团支部并准确选择，一旦提交，你的团员报到资料将由你选择的支部审核管理，除非该支部退回你的报到申请，否则无法修改“所在团支部”').then(function () {
        var waring_text = '<p>1. 请选本人当前所在团支部</p><p>2. 切勿选错，务必谨慎</p><br/><br/><p>资料将被送至所选支部审核，若选错，处理流程将很复杂，请务必咨询团支书后认真选择。</p>'
        $.alert(waring_text).then(function () {
            var params_info = {
                name: $('#name').find('input').val().trim(), // 姓名
                idCardType: $('#idCardType').find('.arrow').data('id'), // 证件类型
                idCard: $('#idCard').find('input').val().trim(), // 身份证
                csnyr: $('#csnyr').find('.arrow').text(), // 出生日期
                rtny: $('#rtny').find('.arrow').text(), // 入团年月
                oid: $('#oid').find('.arrow').data('id'), // 所在团支部ID
                oidName: $('#oid').find('.arrow').text() // 所在团支部名称
            };

            saveToCookie(params_info); // 保存到cookie

            window.location.href = 'branch_search.html'; // 团支部选择 页面
        });
        // $('.select_popup_search').fadeIn(150);
    });

    /**
     * 保存到cookie
     * @param params_info {object} 参数对象
     */
    function saveToCookie(params_info) {
        // 存储到cookie(团员填写信息)
        if($.cookie) {
            var zhtj = {};
            if($.cookie('zhtj')) { // cookie已存在
                zhtj = JSON.parse($.cookie('zhtj'));
            }
            for(var name in params_info) {
                zhtj[name] = params_info[name];
            }

            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
            window.location.href = 'registration_data_2.html'; // 跳转
        }
    }

    // 点击 '下一步' 按钮
    $('.bot_big_btn').click(function () {
        var params_info = {
            name: $('#name').find('input').val().trim(), // 姓名
            idCardType: $('#idCardType').find('.arrow').data('id'), // 证件类型
            idCard: $('#idCard').find('input').val().trim().toUpperCase(), // 身份证
            csnyr: $('#csnyr').find('.arrow').text(), // 出生日期
            rtny: $('#rtny').find('.arrow').text(), // 入团年月
            oid: $('#oid').find('.arrow').data('id'), // 所在团支部ID
            oidName: $('#oid').find('.arrow').text() // 所在团支部名称
        };

        if(!params_info.name) {
            $.alert('请输入你的真实姓名');
            return;
        }
        var flag = Utils.checkName(params_info.name);
        if(flag) {
            var text = '请输入你的真实姓名';
            if(flag == 1) {
                text = '姓名不能包含数字';
            }
            $.alert(text);
            return;
        }
        if(!params_info.idCardType) {
            $.alert('请选择证件类型');
            return;
        }
        if(!params_info.idCard) {
            $.alert('请输入准确完整的身份证号');
            return;
        }
        if(!params_info.csnyr || params_info.csnyr == '请选择') {
            $.alert('请选择出生日期');
            return;
        }
        // if(params_info.csnyr) {
        //     if(!Utils.validateMemberBirthday(params_info.csnyr)) { // 378691200000 -> 12年的毫秒数
        //         $.alert('您的年龄与要求不符，团章限定入团年龄在十四周岁以上，二十八周岁以下，请检查您的出生日期是否正确');
        //         return;
        //     }
        // }
        if(params_info.idCardType == 1) { // 普通居民身份证(1：普通居民身份证，2：境外身份证)
            var msg = Utils.checkIdCard(params_info.idCard); // 校验身份证
            if(msg != 'true') {
                $.alert(msg);
                return;
            }
        }
        if(!params_info.rtny || params_info.rtny == '请选择') {
            $.alert('请选择入团年月');
            return;
        }
        if(params_info.rtny && params_info.rtny.split('-')[0] >= 2017) {
            if(!Utils.validateMemberLeagueForTime(params_info.rtny, params_info.csnyr)) { // 378691200000 -> 12年的毫秒数
                $.alert('团章限定入团年龄在十四周岁以上，二十八周岁以下，请检查您的入团年月是否正确');
                return;
            }
        }
        if(!params_info.oid) {
            $.alert('请选择所在团支部');
            return;
        }

        var params = {
            idCard: params_info.idCard.toUpperCase(), // 身份证
            type: isEdit_global ? 'edit': 'add', // 类型(新增：add，修改：edit)
            mid: isEdit_global ? mid_global : undefined // 团员id
        };
        // 验证团员是否重复
        InformationApi.getMembersIdCard(params).then(function (data) {
            if(data.status == 'ALERT') {
                $.alert(data.msg);
                return;
            }

            saveToCookie(params_info); // 保存到cookie
        });
    });
});