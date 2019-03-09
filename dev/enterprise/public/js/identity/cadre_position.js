/**
 * Created by licong on 2017/12/18.
 */
$(function () {
    var taiid = Utils.getQueryString('taiid');
    if(!taiid) {
        $.alert('团干参数不能为空');
        return;
    }

    var type_global = undefined; // 组织类型(全局变量)
    var list_duty = {}; // 团干职务(pc端的团干自行录入的职务)

    // 当前登录信息
    Enterprise.getSessionAccount({}).then(function (data) {
        if(data.status == 'ALERT') { // 用户未登录
            $.alert(data.msg);
            return;
        }

        var account = data.account;
        type_global = account.type; // 组织类型(全局变量)

        // 1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部，6：超管
        if(type_global == 1) { // 领导机关团组织
            list_duty = [
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
                    "name": "常委"
                },
                {
                    "id": "4",
                    "name": "委员"
                },
                {
                    "id": "5",
                    "name": "工作人员"
                },
                {
                    "id": "6",
                    "name": "候补委员"
                }
            ];
        }else { // 非领导机关团组织
            list_duty = [
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
        }
    });

    // // 政治面貌
    // var list_duty = [
    //     {
    //         "id": "1",
    //         "name": "书记"
    //     },
    //     {
    //         "id": "2",
    //         "name": "副书记"
    //     },
    //     {
    //         "id": "3",
    //         "name": "常委"
    //     },
    //     {
    //         "id": "4",
    //         "name": "委员"
    //     },
    //     {
    //         "id": "5",
    //         "name": "候补委员"
    //     },
    //     {
    //         "id": "6",
    //         "name": "工作人员"
    //     }
    // ];

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

    // 点击'可选择项'(可弹出框) -- 团干职务
    $('#duty_code').click(function () {
        if(!type_global) {
            $.alert('正在加载，请稍候...');
            return;
        }

        initialSelect($('.select_popup .select_list'), list_duty); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });

    // 点击选中项(单排)
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        if(!type_global) {
            $.alert('正在加载，请稍候...');
            return;
        }

        $('.select_popup').fadeOut(150);
        var id =$(this).data('id');
        $('#duty_code').find('.arrow').text($(this).text());
        $('#duty_code').find('.arrow').data('id', $(this).data('id'));

        // 1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部，6：超管
        if(type_global == 1) { // 领导机关团组织
            if(id == 1 || id == 2) { // 书记/副书记
                $('#duty_desc').fadeOut(150); // 隐藏
            }else {
                $('#duty_desc').fadeIn(150); // 显示
            }
        }else { // 非领导机关团组织
            if(id == 9) { // 其他
                $('#duty_desc').fadeIn(150); // 显示
            }else { // 非其他
                $('#duty_desc').fadeOut(150); // 隐藏
            }
        }
    });

    // 点击遮罩层(弹出框)
    $('.select_popup').click(function () {
        $('.select_popup').fadeOut(150); // 关闭弹出框
    });

    // 点击 ‘确定’ 按钮
    $('#confirm').click(function () {
        var params = {
            taiid: taiid, // 团干附加信息ID
            duty_code: $('#duty_code').find('.arrow').data('id'), // 团干职务
            duty_desc: $('#duty_desc').find('input').val() // 职务名称
        };
        console.log('params', params);
        if(!params.duty_code || params.duty_code == '请选择') {
            $.alert('请选择团干职务');
            return;
        }
        // if(!params.duty_desc && (params.duty_code != 1 && params.duty_code != 2)) { // 团干职务代码 不是 书记/副书记
        if(!params.duty_desc && type_global != 1 && params.duty_code == 9) { // 团干职务代码 且 非领导机关团组织/其他
            $.alert('请输入职务名称');
            return;
        }

        var isClick = false; // 是否点击(false：未点击，true：已点击)
        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});
        // 团干职称保存
        IdentityApi.saveDuty(params).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = Enterprise.path + '/enterprise/afterDutyLogin'; // 保存团干职务转跳接口
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });

});