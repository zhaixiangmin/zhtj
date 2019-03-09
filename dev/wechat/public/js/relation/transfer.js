/**
 * Created by licong on 2018/1/19.
 */


$(function () {
    var provinceDid_global = undefined; // 省级ID(全局变量)
    var provinceName_global = undefined; // 省级名称(全局变量)
    var cityDid_global = undefined; // 市级ID(全局变量)
    var cityName_global = undefined; // 市级名称(全局变量)
    var currentSelectName_global = undefined; // 当前选择框名称(全局变量，residence：学习/工作单位地点，cause：转出原因)
    var interval_global = undefined; // 计数器对象(全局变量)
    var second_global = 60; // 倒数秒数(全局变量)
    var original_oid_global = undefined; // 原组织id(全局变量)


    // 点击 '单选框'(添加选中样式)
    $('.checkbox_label').click(function () {
        $(this).parent().find('.checkbox_label').removeClass('active');
        $(this).addClass('active');
        var id = $(this).data('id');
        if(id == 1) { // 转至广东省内的团支部
            $('.province_out').hide(); // 隐藏 学习/工作单位地点
            $('#newOid').show(); // 显示 转入组织
        }else if(id == 2){ // 转至非共青团广东省委所辖的团组织
            // $.alert('转出至非共青团广东省委所辖的团组织的团员将不能使用智慧团建系统部分核心功能，请谨慎操作，团省委将进行定期核查。 ');
            $.alert('当你将前往的团组织在广东省外，或该组织的隶属关系不在团广东省委下（如服兵役、部分金融系统等），可选择此项。<br/>转出至非共青团广东省委所辖的团组织后，团员将不能使用智慧团建系统的部分核心功能。请谨慎操作，团省委将进行定期核查。');
            $('#newOid').hide(); // 隐藏 转入组织
            $('.province_out').show(); // 显示 学习/工作单位地点
        }else if(id == 3){ // 退回原籍
            $.alert('请确保谨慎操作！');
            $('.province_out').hide(); // 隐藏 学习/工作单位地点
            $('#newOid').hide(); // 隐藏 转入组织
        }
    });

    // 我的认证资料
    League.MyProfile({}).then(function (data) {
        var myData = data.rows;
        $('#phone').text(myData.mobile); // 手机号码
        original_oid_global = myData.oid; // 原组织id(全局变量)
        if(myData.fullName == '非共青团广东省委所辖的团组织' || myData.fullName == '省外组织') { // 省外组织()
            $('.checkbox_label[data-id="1"]').click(); // 默认选中 '转至广东省内的团支部'选项
            $('.checkbox_label[data-id="2"]').hide(); // 隐藏 '转至非共青团广东省委所辖的团组织'选项
        }
    });

    // 恢复数据
    if($.cookie && $.cookie('zhtj')) {
        var zhtj = JSON.parse($.cookie('zhtj'));
        console.log('zhtj', zhtj);

        if(zhtj['headfor']) {
            // $('#headfor').find('.checkbox_label').eq(parseInt(zhtj['headfor']) - 1).addClass('active'); // 转往（１：省内，２：非共青团广东省委所辖的团组织, 3：退回原籍）
            $('#headfor').find('.checkbox_label').eq(parseInt(zhtj['headfor']) - 1).click(); // 转往（１：省内，２：非共青团广东省委所辖的团组织, 3：退回原籍）
        }
        if(zhtj['newOid']) {
            $('#newOid').find('.arrow').data('id', zhtj['newOid']); //转入组织ID
            $('#newOid').find('.arrow').text(zhtj['newOidName']); // 转入组织名称
            $('#newOid').fadeIn(150); // 显示 输入框(转入组织)
        }
        if(zhtj['cause']) {
            $('#cause').find('.arrow').data('id', zhtj['cause']); //接转原因（1:就业/工作调动，２：升学/转学，３：其他原因）
            $('#cause').find('.arrow').text(zhtj['causeName']); // 接转原因名称
            if(zhtj['cause'] == 3) { // 其他原因
                $('#causeOthers').val(zhtj['causeOthers']); // 其他原因(cause=3填写其他原因)
                $('#causeOthers').fadeIn(150); // 显示 输入框(其他原因)
            }
        }
        if(zhtj['studyWorkUnit']) { // 学习/工作单位
            $('#studyWorkUnit').find('input').val(zhtj['studyWorkUnit']);
        }
        if(zhtj['residence']) { // 学习/工作单位地点
            $('#residence').find('.arrow').data('provinceDid', zhtj['provinceDid']); // 省份ID
            $('#residence').find('.arrow').data('cityDid', zhtj['cityDid']); // 市级ID
            $('#residence').find('.arrow').data('countyDid', zhtj['countyDid']); // 县级ID
            $('#residence').find('.arrow').text(zhtj['residence']); // 户籍所在地名称
        }
    }


    /**
     * 保存到cookie
     */
    function saveToCookie() {
        // 存储到cookie(团员填写信息)
        if($.cookie) {
            var zhtj = {};
            if($.cookie('zhtj')) { // cookie已存在
                zhtj = JSON.parse($.cookie('zhtj'));
            }

            var headfor = $('#headfor').find('.checkbox_label.active').data('id'); // 转往（１：省内，２：非共青团广东省委所辖的团组织, 3：退回原籍）
            var newOid = $('#newOid').find('.arrow').data('id'); // 转入组织ID
            var cause = $('#cause').find('.arrow').data('id'); // 接转原因（1:就业/工作调动，２：升学/转学，３：其他原因）
            var studyWorkUnit = $('#studyWorkUnit').find('input').val().trim(); // 学习/工作单位
            var residence = $('#residence').find('.arrow').text().trim(); // 学习/工作单位地点
            if(headfor) { // 转往
                zhtj['headfor'] = headfor;
            }
            if(newOid) { // 转入组织
                zhtj['newOid'] = newOid;
                zhtj['newOidName'] = $('#newOid').find('.arrow').text(); // 转入组织名称
            }
            if(cause) { // 接转原因
                zhtj['cause'] = cause;
                zhtj['causeName'] = $('#cause').find('.arrow').text(); // 接转原因名称
                if(cause == 3) { // 其他原因
                    zhtj['causeOthers'] = $('#causeOthers').val().trim(); // 其他原因(cause=3填写其他原因)
                }
            }
            if(studyWorkUnit) { // 学习/工作单位
                zhtj['studyWorkUnit'] = studyWorkUnit;
            }
            if(residence) { // 学习/工作单位地点
                zhtj['provinceDid'] = $('#residence').find('.arrow').data('provinceDid'); // 省份ID
                zhtj['cityDid'] = $('#residence').find('.arrow').data('cityDid'); // 市级ID
                zhtj['countyDid'] = $('#residence').find('.arrow').data('countyDid'); // 县级ID
                zhtj['residence'] = $('#residence').find('.arrow').text(); // 户籍所在地名称
            }

            $.cookie('zhtj', JSON.stringify(zhtj), {path: '/'}); // 存储到cookie
        }
    }

    // 点击 '转入组织'
    $('#newOid').click(function () {
        if(!original_oid_global) {
            $.alert('数据加载中，请稍后点击');
            return;
        }
        saveToCookie(); // 保存到cookie
        window.location.href = 'branch_search.html?oid=' + original_oid_global; // 跳转 选择团支部 页面
    });

    /**
     * 渲染页面(选择弹出框)
     * @param $selector {jquery对象} 数据父元素(选择器jquery对象)
     * @param list {array} 数据列表
     * @param idStr {string} id字符串
     * @param nameStr {string} name字符串
     */
    var initialSelect = function ($selector, list, idStr, nameStr) {
        var html = '';
        var id = idStr ? idStr : 'id';
        var name = nameStr ? nameStr : 'name';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            html += '<li class="select_item" data-id="' + item[id] + '">' + item[name] + '</li>';
        }
        $selector.html(html);
    };

    // 转出原因
    var list_cause = [
        {
            "id": "1",
            "name": "就业/工作调动"
        },
        {
            "id": "2",
            "name": "升学/转学"
        },
        {
            "id": "3",
            "name": "其他原因"
        }
    ];

    // 点击'可选择项'(转出原因,可弹出框)
    $('#cause').click(function () {
        currentSelectName_global = 'cause'; // 当前选择框名称(全局变量，residence：学习/工作单位地点，cause：转出原因)
        initialSelect($('.select_popup .select_list'), list_cause); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });

    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150); // 隐藏 下拉框

        if(currentSelectName_global == 'residence') { // 户籍所在地(县级或区级)
            $('#' + currentSelectName_global).find('.arrow').text(provinceName_global + cityName_global + $(this).text()); // 设置户籍所在地名称
            $('#' + currentSelectName_global).find('.arrow').data('provinceDid', provinceDid_global); // 省份ID
            $('#' + currentSelectName_global).find('.arrow').data('cityDid', cityDid_global); // 市级ID
            $('#' + currentSelectName_global).find('.arrow').data('countyDid', $(this).data('id')); // 县级/区级ID
        }else if(currentSelectName_global == 'cause') { // 转出原因
            $('#cause').find('.arrow').text($(this).text());
            $('#cause').find('.arrow').data('id', $(this).data('id'));
            if($(this).data('id') == 3) { // 其他原因
                $('.other_reason_box').fadeIn(150); // 显示 输入框(其他原因)
            }else { // 就业/工作调动、升学/转学
                $('.other_reason_box').fadeOut(150); // 隐藏 输入框(其他原因)
            }
        }

    });


    // 点击遮罩层(弹出框)
    $('.select_popup').click(function () {
        $('.select_popup').fadeOut(150); // 关闭弹出框
    });
    

    /**
     * 渲染页面(选择弹出框 - 两边)
     * @param $selector {jquery对象} 数据父元素(选择器jquery对象)
     * @param list {array} 数据列表
     */
    var initialSelectPair = function ($selector, list) {
        var html = '';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            html += '<li class="select_item_pair" data-did="' + item.did + '">' + item.districtName + '</li>';
        }
        $selector.html(html);
    };

    // 默认加载省级列表和第一个省级的地市列表
    // 获取省级数据
    RelationApi.getDistrictByLevel({}).then(function (data) {
        console.log('RelationApi.getDistrictByLevel data', data);
        var list = data.rows;
        initialSelectPair($('.select_popup_pair .select_list_pair.select_list_pair_left'), list); //渲染页面(选择弹出框 - 两边) - 左边
        $('.select_popup_pair .select_list_pair.select_list_pair_left').children(":first").addClass('active'); // 默认选中第一个子节点
        if(list && list.length > 0) {
            var item = list[0];
            // 根据省级ID查询市级
            RelationApi.getDistrictByPid({did: item.did}).then(function (data) {
                var list_right = data.rows;
                initialSelectPair($('.select_popup_pair .select_list_pair.select_list_pair_right'), list_right); //渲染页面(选择弹出框 - 两边) - 右边
            });
        }
    });

    // 点击'可选择项'(可弹出框) -- 学习/工作单位
    $('#residence').click(function () {
        $('.select_popup_pair').fadeIn(150); // 显示选择弹出框 -- 两边
    });

    // 点击选中项(选择弹出框 - 两边)
    $('.select_popup_pair .select_list_pair').on('click', '.select_item_pair', function(event) {
        var isLeft = $(this).parent().hasClass('select_list_pair_left');
        if(isLeft) { // 当前是左边(省份)
            if($(this).hasClass('active')) { // 当前项已选中
                return;
            }
            $(this).siblings().removeClass('active'); // 去除相邻元素上一次选中样式
            $(this).addClass('active'); // 高亮当前选中项
            var did = $(this).data('did'); // 当前省份ID
            if(!did) {
                $.alert('当前省份参数为空');
                return;
            }
            $('.select_popup_pair .select_list_pair.select_list_pair_right').empty(); // 清空右边地市数据
            // 根据省级ID查询市级
            RelationApi.getDistrictByPid({did: did}).then(function (data) {
                var list_right = data.rows;
                initialSelectPair($('.select_popup_pair .select_list_pair.select_list_pair_right'), list_right); //渲染页面(选择弹出框 - 两边) - 右边
            });
        }else{
            var cityDid = $(this).data('did');
            provinceDid_global = $('.select_popup_pair .select_list_pair.select_list_pair_left .select_item_pair.active').data('did'); // 省份ID
            provinceName_global = $('.select_popup_pair .select_list_pair.select_list_pair_left .select_item_pair.active').text(); // 省份名称
            cityName_global = $(this).text(); // 市级名称
            cityDid_global = cityDid; // 市级ID

            // 根据省级ID查询市级 -- 加载县级(区级)
            RelationApi.getDistrictByPid({did: cityDid}).then(function (data) {
                var list = data.rows;
                currentSelectName_global = 'residence'; // 当前选择框名称(全局变量，residence：学习/工作单位，cause：转出原因)
                initialSelect($('.select_popup .select_list'), list, 'did', 'districtName'); // 渲染页面(选择弹出框)

                $('.select_popup_pair').fadeOut(150); // 隐藏选择弹出框 -- 两边
                $('.select_popup').fadeIn(150); // 显示选择弹出框
            });
        }

        return false; // 防止冒泡事件
    });

    // 点击遮罩层(弹出框 -- 两边)
    $('.select_popup_pair').click(function () {
        $('.select_popup_pair').fadeOut(150); // 关闭弹出框
    });


    // 计数器计数
    function timeCount(second) {
        interval_global = setInterval(function () {
            var $span = $('.code_count span'); // 倒数秒数选择器
            var current_sec = $span.text(); // 当前秒数
            if(current_sec <= 1) {
                clearInterval(interval_global); // 停止计数器
                $('.code_count').hide(); // 隐藏 倒数文本

                if($('.code_txt').text() == '发送验证码') {
                    $('.code_txt').text('重发验证码');
                }
                $('.code_txt').show(); // 显示 '重发验证码'
                return;
            }
            $span.text(--current_sec); // 渲染秒数选择器
        }, 1000);
    }

    var isClick_code = false; // 是否点击重发验证码(false：未点击，true：已点击)
    // 开始数秒
    function startCount(second) {
        var phone = $('#phone').text();
        if(!phone) {
            $.alert('手机号码不能为空');
            return;
        }

        if(isClick_code) { // 已点击
            return;
        }
        isClick_code = true; // 设置为 已点击
        $('.code_txt').css({opacity: 0.5});
        // 发送验证码接口
        RelationApi.createSecurityCodeSend({phone: phone}).then(function () {
            $('.code_txt').hide(); // 隐藏 '重发验证码'
            $('.code_count span').text(second); // 初始化秒数
            timeCount(second); // 计数器计数
            $('.code_count').show(); // 显示 倒数文本
        }).always(function () {
            isClick_code = false; // 设置为 未点击
            $('.code_txt').css({opacity: 1});
        });
    }

    var params = undefined;
    // 点击 '下一步'按钮
    $('#next').click(function () {
        params = {
            headfor: $('#headfor').find('.checkbox_label.active').data('id'), // 转往（１：省内，２：非共青团广东省委所辖的团组织, 3：退回原籍）
            newOid: $('#newOid').find('.arrow').data('id'), // 转入组织
            cause: $('#cause').find('.arrow').data('id'), // 接转原因（1:就业/工作调动，２：升学/转学，３：其他原因）
            causeOthers: $('#causeOthers').val(), // 其他原因(cause=3填写其他原因)
            applicantType: 2, // 团员 -- 申请人类型(1:组织，２团员)
            studyWorkUnit: $('#studyWorkUnit').find('input').val().trim(), // 学习/工作单位
            provinceDid: $('#residence').find('.arrow').data('provinceDid'), // 省份ID
            cityDid: $('#residence').find('.arrow').data('cityDid'), // 市级ID
            countyDid: $('#residence').find('.arrow').data('countyDid'), // 县级ID
            residence: $('#residence').find('.arrow').text().trim() // 学习/工作单位地点名称
        };
        console.log('params', params);

        if(!params.headfor) {
            $.alert('请选择转往省内/非共青团广东省委所辖的团组织/退回原籍');
            return;
        }else if (params.headfor == 1) { // 省内
            if(!params.newOid) { // 转入组织为空
                $.alert('请选择转入组织');
                return;
            }
        }else if(params.headfor == 2) { // 非共青团广东省委所辖的团组织
            if(!params.provinceDid || !params.cityDid) {
                $.alert('请选择学习/工作单位地点');
                return;
            }
        }

        if(!params.studyWorkUnit) {
            $.alert('请输入学习/工作单位');
            return;
        }
        if(!params.cause) {
            $.alert('请选择转出原因');
            return;
        }else if(params.cause == 3) { // 其他原因且 其他原因为空
            if(!params.causeOthers) {
                $.alert('请输入其他原因');
                return;
            }else if(params.causeOthers.getRealLen() < 10) {
                $.alert('其他原因至少10个字符');
                return;
            }
        }

        // console.log('成功提交');
        // if($('.code_txt').css('display') != 'none') { // 当前状态是重发验证码，才开始计数
        //     startCount(second_global); // 开始数秒
        // }
        $('.code_popup_box').show(); // 显示弹出框(验证码弹出框)
    });

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击'提交'
    $('#confirm').click(function () {
        params.mobile = $('#phone').text(); // 手机号码
        params.phoneCode = $('#phoneCode').val().trim(); // 手机验证码
        if(!params.mobile) {
            $.alert('手机号码不能为空');
            return;
        }
        if(!params.phoneCode) {
            $.alert('请输入验证码');
            return;
        }

        console.log('confirm params', params);
        console.log('输入验证码成功');

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});
        // 组织转接发起转接验证
        RelationApi.checkMembers({type: 2}).then(function (data) { // 团员 -- 类型(1：组织，2：团员)
            console.log('RelationApi.applyAdd data', data);
            if(data.status == 'ALERT') {
                isClick = false; // 设置为 未点击
                $('#confirm').css({opacity: 1});
                $.alert(data.msg);
                return;
            }

            // 组织转接发起转接
            RelationApi.applyAdd(params).then(function (data) {
                $('.code_popup_box').hide(); // 隐藏弹出框(验证码弹出框)
                $.alert(data.msg).then(function () {
                    $.cookie('zhtj', null, {path: '/'}); // 清除cookie(zhtj)
                    window.location.href = '../../index.html'; // 跳转 首页
                });
            }).always(function () {
                isClick = false; // 设置为 未点击
                $('#confirm').css({opacity: 1});
            });
        }, function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });

    });

    // 点击关闭按钮(验证码弹出框)
    $('.close_icon').click(function () {
        $('.code_popup_box').hide(); // 隐藏弹出框(验证码弹出框)
    });

    // 点击'重发验证码'
    $('.code_txt').click(function () {
        startCount(second_global); // 开始数秒
    });


    // 点击 '不再使用，需要更换号码'
    $('.tips_bottom').click(function () {
        saveToCookie(); // 保存到cookie
        window.location.href = League.url_qnzs + '/wechat/view/person_center/edit_phone.html?url=' + window.location.href; // 跳转 '青年之声-个人资料编辑' 页面
    });
});