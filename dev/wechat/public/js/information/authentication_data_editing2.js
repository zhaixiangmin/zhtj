/**
 * Created by licong on 2017/10/25.
 */
$(function () {
    var currentSelectName_global = undefined; // 当前选择框名称(全局变量，nation：民族，degreeOfEducation：全日制学历，highestEducation：最高学历)
    var provinceDid_global = undefined; // 省级ID(全局变量)
    var cityDid_global = undefined; // 市级ID(全局变量)

    // 民族
    var list_nation = [
        {
            "id": "1",
            "name": "汉族"
        },
        {
            "id": "2",
            "name": "壮族"
        },
        {
            "id": "3",
            "name": "满族"
        },
        {
            "id": "4",
            "name": "回族"
        },
        {
            "id": "5",
            "name": "苗族"
        },
        {
            "id": "6",
            "name": "维吾尔族"
        },
        {
            "id": "7",
            "name": "土家族"
        },
        {
            "id": "8",
            "name": "彝族"
        },
        {
            "id": "9",
            "name": "蒙古族"
        },
        {
            "id": "10",
            "name": "藏族"
        },
        {
            "id": "11",
            "name": "布依族"
        },
        {
            "id": "12",
            "name": "侗族"
        },
        {
            "id": "13",
            "name": "瑶族"
        },
        {
            "id": "14",
            "name": "朝鲜族"
        },
        {
            "id": "15",
            "name": "白族"
        },
        {
            "id": "16",
            "name": "哈呢族"
        },
        {
            "id": "17",
            "name": "哈萨克族"
        },
        {
            "id": "18",
            "name": "黎族"
        },
        {
            "id": "19",
            "name": "傣族"
        },
        {
            "id": "20",
            "name": "畲族"
        },
        {
            "id": "21",
            "name": "僳僳族"
        },
        {
            "id": "22",
            "name": "仡佬族"
        },
        {
            "id": "23",
            "name": "东乡族"
        },
        {
            "id": "24",
            "name": "拉祜族"
        },
        {
            "id": "25",
            "name": "水族"
        },
        {
            "id": "26",
            "name": "佤族"
        },
        {
            "id": "27",
            "name": "纳西族"
        },
        {
            "id": "28",
            "name": "羌族"
        },
        {
            "id": "29",
            "name": "土族"
        },
        {
            "id": "30",
            "name": "仫佬族"
        },
        {
            "id": "31",
            "name": "锡伯族"
        },
        {
            "id": "32",
            "name": "柯尔克孜族"
        },
        {
            "id": "33",
            "name": "达斡尔族"
        },
        {
            "id": "34",
            "name": "景颇族"
        },
        {
            "id": "35",
            "name": "毛南族"
        },
        {
            "id": "36",
            "name": "撒拉族"
        },
        {
            "id": "37",
            "name": "布朗族"
        },
        {
            "id": "38",
            "name": "塔吉克族"
        },
        {
            "id": "39",
            "name": "阿昌族"
        },
        {
            "id": "40",
            "name": "普米族"
        },
        {
            "id": "41",
            "name": "鄂温克族"
        },
        {
            "id": "42",
            "name": "怒族"
        },
        {
            "id": "43",
            "name": "京族"
        },
        {
            "id": "44",
            "name": "基诺族"
        },
        {
            "id": "45",
            "name": "德昂族"
        },
        {
            "id": "46",
            "name": "保安族"
        },
        {
            "id": "47",
            "name": "俄罗斯族"
        },
        {
            "id": "48",
            "name": "裕固族"
        },
        {
            "id": "49",
            "name": "乌孜别克族"
        },
        {
            "id": "50",
            "name": "门巴族"
        },
        {
            "id": "51",
            "name": "鄂伦春族"
        },
        {
            "id": "52",
            "name": "独龙族"
        },
        {
            "id": "53",
            "name": "塔塔尔族"
        },
        {
            "id": "54",
            "name": "赫哲族"
        },
        {
            "id": "55",
            "name": "高山族"
        },
        {
            "id": "56",
            "name": "珞巴族"
        },
        {
            "id": "57",
            "name": "其他"
        }
    ];
    // // 政治面貌
    // var list_politicalOutlook = [
    //     {
    //         "id": "1",
    //         "name": "团员"
    //     },
    //     {
    //         "id": "2",
    //         "name": "党员"
    //     },
    //     {
    //         "id": "3",
    //         "name": "中共预备党员"
    //     }
    // ];
    // 全日制学历
    var list_degreeOfEducation = [
        {
            "id": "1",
            "name": "初中"
        },
        {
            "id": "2",
            "name": "高中"
        },
        {
            "id": "3",
            "name": "大专"
        },
        {
            "id": "4",
            "name": "本科"
        },
        {
            "id": "5",
            "name": "硕士"
        },
        {
            "id": "6",
            "name": "博士"
        },
        {
            "id": "7",
            "name": "中职"
        },
        {
            "id": "8",
            "name": "中职中专在读"
        },
        {
            "id": "9",
            "name": "初中在读"
        },
        {
            "id": "10",
            "name": "高中在读"
        },
        {
            "id": "11",
            "name": "大专在读"
        },
        {
            "id": "12",
            "name": "本科在读"
        },
        {
            "id": "13",
            "name": "硕士在读"
        },
        {
            "id": "14",
            "name": "博士在读"
        },
        {
            "id": "15",
            "name": "小学"
        }
    ];
    // 最高学历
    var list_highestEducation = [
        {
            "id": "1",
            "name": "初中"
        },
        {
            "id": "2",
            "name": "高中"
        },
        {
            "id": "3",
            "name": "大专"
        },
        {
            "id": "4",
            "name": "本科"
        },
        {
            "id": "5",
            "name": "硕士"
        },
        {
            "id": "6",
            "name": "博士"
        },
        {
            "id": "7",
            "name": "中职"
        },
        {
            "id": "8",
            "name": "中职中专在读"
        },
        {
            "id": "9",
            "name": "初中在读"
        },
        {
            "id": "10",
            "name": "高中在读"
        },
        {
            "id": "11",
            "name": "大专在读"
        },
        {
            "id": "12",
            "name": "本科在读"
        },
        {
            "id": "13",
            "name": "硕士在读"
        },
        {
            "id": "14",
            "name": "博士在读"
        },
        {
            "id": "15",
            "name": "小学"
        }
    ];

    var optionList_global = ['leagueForUnit', 'nation', 'nationInfo', 'degreeOfEducation', 'highestEducation', 'residence', 'mobile']; // 参数列表(全局变量)

    // 民族名称
    var nationName = {
        '1': '汉族',
        '2': '壮族',
        '3': '满族',
        '4': '回族',
        '5': '苗族',
        '6': '维吾尔族',
        '7': '土家族',
        '8': '彝族',
        '9': '蒙古族',
        '10': '藏族',
        '11': '布依族',
        '12': '侗族',
        '13': '瑶族',
        '14': '朝鲜族',
        '15': '白族',
        '16': '哈呢族',
        '17': '哈萨克族',
        '18': '黎族',
        '19': '傣族',
        '20': '畲族',
        '21': '僳僳族',
        '22': '仡佬族',
        '23': '东乡族',
        '24': '拉祜族',
        '25': '水族',
        '26': '佤族',
        '27': '纳西族',
        '28': '羌族',
        '29': '土族',
        '30': '仫佬族',
        '31': '锡伯族',
        '32': '柯尔克孜族',
        '33': '达斡尔族',
        '34': '景颇族',
        '35': '毛南族',
        '36': '撒拉族',
        '37': '布朗族',
        '38': '塔吉克族',
        '39': '阿昌族',
        '40': '普米族',
        '41': '鄂温克族',
        '42': '怒族',
        '43': '京族',
        '44': '基诺族',
        '45': '德昂族',
        '46': '保安族',
        '47': '俄罗斯族',
        '48': '裕固族',
        '49': '乌孜别克族',
        '50': '门巴族',
        '51': '鄂伦春族',
        '52': '独龙族',
        '53': '塔塔尔族',
        '54': '赫哲族',
        '55': '高山族',
        '56': '珞巴族',
        '57': '其他'
    };

    // // 政治面貌名称
    // var politicalOutlookName ={
    //     "1": "团员",
    //     "2": "党员",
    //     "3": "中共预备党员"
    // };

    // 全日制学历名称/最高学历
    var degreeOfEducationName = {
        "1": "初中",
        "2": "高中",
        "3": "大专",
        "4": "本科",
        "5": "硕士",
        "6": "博士",
        "7": "中职",
        "8": "中职中专在读",
        "9": "初中在读",
        "10": "高中在读",
        "11": "大专在读",
        "12": "本科在读",
        "13": "硕士在读",
        "14": "博士在读",
        "15": "小学"
    };

    // 我的认证资料
    InformationApi.MyProfile({}).then(function (data) {
        var myData = data.rows;
        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];

            if(myData[option] == null) { // 防止资料出现null --> ''
                myData[option] = '';
            }

            if(option == 'mobile') { // 手机号码
                $('#' + option).find('.right_txt').text(myData[option]); // 设置 手机号码
                continue;
            }
            if(option == 'nation') { // 民族
                $('#' + option).find('.arrow').text(nationName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                if(myData[option] == 57) { // 其他(民族)
                    $('#nationInfo').show(); // 显示 民族名称
                }else { // 非其他(民族)
                    $('#nationInfo').hide(); // 隐藏 民族名称
                }
                continue;
            }
            // if(option == 'politicalOutlook') { // 政治面貌
            //     $('#' + option).find('.arrow').text(politicalOutlookName[myData[option]]);
            //     $('#' + option).find('.arrow').data('id', myData[option]);
            //     continue;
            // }
            if(option == 'degreeOfEducation') { // 全日制学历
                $('#' + option).find('.arrow').text(degreeOfEducationName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                continue;
            }
            if(option == 'highestEducation') { // 最高学历
                $('#' + option).find('.arrow').text(degreeOfEducationName[myData[option]]);
                $('#' + option).find('.arrow').data('id', myData[option]);
                continue;
            }
            if(option == 'residence') { // 户籍所在地
                // $('#' + option).find('.arrow').text(myData['provinceName'] + myData['cityName']);
                $('#' + option).find('.arrow').text(Utils.returnValidString(myData['provinceName']) + Utils.returnValidString(myData['cityName']) + Utils.returnValidString(myData['countyName'])); // 设置户籍所在地名称

                $('#' + option).find('.arrow').data('provinceDid', myData['provinceDid']); // 省份ID
                $('#' + option).find('.arrow').data('cityDid', myData['cityDid']); // 市级ID
                $('#' + option).find('.arrow').data('countyDid', myData['countyDid']); // 县级/区级ID
                continue;
            }
            if(option == 'leagueForUnit') {
                $('#' + option).find('input').val(myData[option]); // 入团时所在单位
                continue;
            }
        }
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

    // 点击'可选择项'(可弹出框) -- 民族/全日制学历/最高学历/户籍所在地(县级或区级)
    $('#nation, #degreeOfEducation, #highestEducation').click(function () {
        var list = undefined;
        var text = $(this).attr('id');
        if(!text) { // 空
            return;
        }
        currentSelectName_global = text; // 当前选择框名称(全局变量，nation：民族，degreeOfEducation：全日制学历，highestEducation：最高学历)
        if(text == 'nation') { // 民族
            list = list_nation;
        }else if(text == 'degreeOfEducation'){ // 全日制学历
            list = list_degreeOfEducation;
        }else if(text == 'highestEducation'){ // 最高学历
            list = list_highestEducation;
        }
        initialSelect($('.select_popup .select_list'), list); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });

    // 点击选中项(单排)
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        if(currentSelectName_global == 'residence') { // 户籍所在地(县级或区级)
            $('#' + currentSelectName_global).find('.arrow').text($(this).text());
            $('#' + currentSelectName_global).find('.arrow').data('provinceDid', provinceDid_global); // 省份ID
            $('#' + currentSelectName_global).find('.arrow').data('cityDid', cityDid_global); // 市级ID
            $('#' + currentSelectName_global).find('.arrow').data('countyDid', $(this).data('id')); // 县级/区级ID
        }if(currentSelectName_global == 'nation') { // 民族
            var nationID = $(this).data('id');
            $('#' + currentSelectName_global).find('.arrow').text($(this).text());
            $('#' + currentSelectName_global).find('.arrow').data('id', nationID);
            if(nationID == 57) { // 其他(民族)
                $('#nationInfo').show(); // 显示 民族名称
            }else { // 非其他(民族)
                $('#nationInfo').hide(); // 隐藏 民族名称
            }
        }else {
            $('#' + currentSelectName_global).find('.arrow').text($(this).text());
            $('#' + currentSelectName_global).find('.arrow').data('id', $(this).data('id'));
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
    InformationApi.getDistrictByLevel({}).then(function (data) {
        console.log('InformationApi.getDistrictByLevel data', data);
        var list = data.rows;
        initialSelectPair($('.select_popup_pair .select_list_pair.select_list_pair_left'), list); //渲染页面(选择弹出框 - 两边) - 左边
        $('.select_popup_pair .select_list_pair.select_list_pair_left').children(":first").addClass('active'); // 默认选中第一个子节点
        if(list && list.length > 0) {
            var item = list[0];
            // 根据省级ID查询市级
            InformationApi.getDistrictByPid({did: item.did}).then(function (data) {
                var list_right = data.rows;
                initialSelectPair($('.select_popup_pair .select_list_pair.select_list_pair_right'), list_right); //渲染页面(选择弹出框 - 两边) - 右边
            });
        }
    });

    // 点击'可选择项'(可弹出框) -- 户籍
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
            $(this).siblings().removeClass('active'); // 去除上一次选中样式
            $(this).addClass('active'); // 高亮当前选中项
            var did = $(this).data('did'); // 当前省份ID
            if(!did) {
                $.alert('当前省份参数为空');
                return;
            }
            provinceDid_global = did; // 省级ID(全局变量)
            $('.select_popup_pair .select_list_pair.select_list_pair_right').empty(); // 清空右边地市数据
            // 根据省级ID查询市级 -- 加载市级
            InformationApi.getDistrictByPid({did: did}).then(function (data) {
                var list_right = data.rows;
                initialSelectPair($('.select_popup_pair .select_list_pair.select_list_pair_right'), list_right); //渲染页面(选择弹出框 - 两边) - 右边
            });
        }else{ // 右边(市级)
            var cityDid = $(this).data('did');
            cityDid_global = cityDid; // 市级ID(全局变量)

            // 根据省级ID查询市级 -- 加载县级(区级)
            InformationApi.getDistrictByPid({did: cityDid}).then(function (data) {
                var list = data.rows;
                currentSelectName_global = 'residence'; // 当前选择框名称(全局变量，nation：民族，degreeOfEducation：全日制学历，highestEducation：最高学历)
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

    // 跳转青年之声修改手机号码页面
    $('#edit_phone').click(function () {
        window.location.href = League.url_qnzs + '/wechat/view/person_center/edit_phone.html?url=' + window.location.href; // 跳转 '青年之声-个人资料编辑' 页面
    });


    // 点击'下一步'
    $('.bot_big_btn').click(function () {
        var params_info = {
            type: 1, // 类型(1：必填，2：附加信息)
            // mobile: $('#mobile').find('.right_txt').text(), // 手机号码
            nation: $('#nation').find('.arrow').data('id'), // 民族
            nationInfo: $('#nationInfo').find('input').val(), // 民族名称
            degreeOfEducation: $('#degreeOfEducation').find('.arrow').data('id'), // 全日制学历
            highestEducation: $('#highestEducation').find('.arrow').data('id'), // 最高学历
            provinceDid: $('#residence').find('.arrow').data('provinceDid'), // 省份ID
            cityDid: $('#residence').find('.arrow').data('cityDid'), // 市级ID
            countyDid: $('#residence').find('.arrow').data('countyDid'), // 县级ID
            leagueForUnit: $('#leagueForUnit').find('input').val().trim() // 入团时所在单位
        };
        console.log('params_info', params_info);
        // if(!params_info.mobile) {
        //     $.alert('请输入手机号码');
        //     return;
        // }
        // if(!Utils.checkMobile(params_info.mobile)) {
        //     $.alert('请输入正确的手机号码');
        //     return;
        // }
        if(!params_info.nation || params_info.nation == '请选择') {
            $.alert('请选择民族');
            return;
        }
        if(params_info.nation != 57) { // 非其他
            params_info.nationInfo = ''; // 清空 民族名称
        }else if(!params_info.nationInfo) { // 其它(民族)/民族名称为空
            $.alert('请输入民族名称');
            return;
        }
        // if(!params_info.politicalOutlook || params_info.politicalOutlook == '请选择') {
        //     $.alert('请选择政治面貌');
        //     return;
        // }
        if(!params_info.degreeOfEducation || params_info.degreeOfEducation == '请选择') {
            $.alert('请选择全日制学历');
            return;
        }
        if(!params_info.highestEducation || params_info.highestEducation == '请选择') {
            $.alert('请选择最高学历');
            return;
        }
        if(!params_info.provinceDid || !params_info.cityDid || !params_info.countyDid) {
            $.alert('请选择户籍所在地');
            return;
        }
        if(!params_info.leagueForUnit) {
            $.alert('请输入入团时所在单位');
            return;
        }

        console.log('成功');

        // 团员不需要审核修改接口
        InformationApi.NotAuditEdit(params_info).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = 'authentication_data_edit.html'; // 返回'团员身份认证' 页面
                return;
            });
        });
    });

});