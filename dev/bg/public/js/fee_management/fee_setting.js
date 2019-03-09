/**
 * Created by licong on 2017/12/13.
 */
$(function () {

    var len_global = undefined; // 收入项的数量(全局变量)

    // 交费档位查询
    FeeManagementApi.getAllIncomeBracket({}).then(function (data) {
        console.log('FeeManagementApi.getAllIncomeBracket data', data);
        var list = data.dataList;
        len_global = list.length; // 收入项的数量(全局变量)
        var $item_box = $('.list .item_box'); // 列表项jquery对象
        var html = '';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            if(i < 3) {
                if($item_box.eq(i) && $item_box.eq(i).length > 0) {
                    $item_box.eq(i).find('.name').data('id', item.id); // 交费档位ID
                    $item_box.eq(i).find('.describe input').val(item.describe); // 团员收入情况
                    $item_box.eq(i).find('.amount input').val(item.amount); // 每月应交金额
                }
            }else { // i >= 3
                html += '<div class="item_box"><div class="item name" data-id="' + item.id + '">收入档<span>' + (i-1) + '</span>：</div><div class="item describe"><input type="text" value="' + item.describe + '"></div><div class="item amount"><input type="number" value="' + item.amount + '"></div></div>';
            }
        }

        if(html) {
            $('.list').append(html);
        }
    });

    // 点击 '添加' 按钮
    $('.add').click(function () {
        var index = parseInt($('.list .item_box:last-child .item.name span').text());
        var html = '<div class="item_box"><div class="item name">收入档<span>' + (index+1) + '</span>：</div><div class="item describe"><input type="text"></div><div class="item amount"><input type="number"></div></div>';
        $('.list').append(html);
    });

    // 点击 '删除' 按钮
    $('.delete').click(function () {
        var len = $('.list .item_box').length; // 当前收入项长度
        if(len <= len_global) { // 当前收入项长度 < 收入项的数量(全局变量) -- 不能删除原有的数据，只能修改
            // $.alert('档位至少' + len_global + '项');
            $.alert('不能删除原有信息');
            return;
        }

        var describe = $('.list .item_box:last-child .item.describe input').val().trim(); // 团员收入情况
        var amount = $('.list .item_box:last-child .item.amount input').val(); // 每月应交金额
        // 团员收入情况、每月应交金额 都为空
        if(!describe && !amount) {
            $('.list .item_box:last-child').remove();
        }else {
            $.alert('新增项内容不为空，不能删除');
            return;
        }
    });

    // // 监听 '每月应交金额' 输入框(0<value<=20)
    // $('.list .item_box .item.amount input').bind('input propertychange', function(event) {
    //     //进行相关操作
    //     var value = $(this).val();
    //     console.log('value', value);
    //     if(!value) {
    //         $(this).val(value); // 去除字符串首部的小数点 -- '.' -> ''
    //         return;
    //     }
    //
    //     if(value < 0) { // 小于 0
    //         $(this).val(0); // 设置为 0
    //     }else if(value > 20) {
    //         $(this).val(20); // 设置为 20
    //     }else { // value => 0 && value <= 20
    //         if(value.indexOf('.') != -1) { // 有小数点
    //             var len = value.split('.').length;
    //             if(len == 2) { // 一位小数点
    //                 var point = value.split('.')[1];
    //                 if(point.length > 2) { // 小数点后的字符长度大于2(小于等于2，忽略) --> 19.123
    //                     value = parseFloat(value); // 字符串 -> 数字
    //                     value = value.toFixed(2);
    //                     $(this).val(value);
    //                 }
    //             }else { // 大于等于两位小数点 -- .123 -> .12    12.34.3 -> ''
    //                 $(this).val(value);
    //             }
    //
    //         }else { // 无小数点 -- 01 -> 1
    //             $(this).val(parseInt(value));
    //         }
    //     }
    // });

    // 点击 '确定' 按钮
    $('.button').click(function () {
        var $item_box = $('.list .item_box');
        var arr = [];

        for(var i=0; i<$item_box.length; i++) {
            var $item = $item_box.eq(i);
            var id = Utils.returnValidString($item.find('.item.name').data('id')); // 交费档位ID
            var name = $item.find('.item.name').text().replace('：', '').trim(); // 交费档位名称
            var describe = $item.find('.item.describe input').val().trim(); // 团员收入情况
            var amount = $item.find('.item.amount input').val().trim(); // 每月应交金额
            var item = id + ',' + name + ',' + describe + ',' + amount;
            arr.push(item);

            if(!describe) {
                $.alert('团员的收入情况不能为空');
                return;
            }
            if(!amount) {
                $.alert('每月应交金额不能为空');
                return;
            }
            if(amount >= 1000) { // 数据库最大值
                $.alert('每月应交金额不能大于999');
                return;
            }
        }
        var incomeBracketStr = arr.join(',');

        // 交费档位保存
        FeeManagementApi.saveIncomeBracket({incomeBracketStr: incomeBracketStr}).then(function (data) {
            $.alert(data.msg).then(function () {
               window.location.reload(); // 刷新当前页面
            });
        });
    });

});