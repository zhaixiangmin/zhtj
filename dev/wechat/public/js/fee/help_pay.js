/**
 * Created by licong on 2018/1/11.
 */
$(function () {
    // 组织未交团费查询
    FeeApi.getOrgBill({}).then(function (data) {
        var list = data.dataList;
        if(list && list.length > 0) {
            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                if(i == 0) {
                    $('#orgName').text(item.orgName); // 团员所在组织名称
                }
                html += '<li class="list_item" data-id="' + item.mid + '">';
                html += '    <div class="item_inner clearfix">';
                html += '        <div class="item_text">';
                html += '            <p class="p1">' + item.name + '</p>';
                html += '            <p class="p2"><span>' + item.feePayable + '</span>元</p>';
                html += '        </div>';
                html += '    </div>';
                html += '</li>';
            }
            $('.list_box').html(html);
            $('.main_container').show(); // 显示 数据
        }else {
            // 我的认证资料
            League.MyProfile({}).then(function (data) {
                if(data.status == 'ALERT') {
                    $.alert(data.msg);
                    return;
                }

                var account = data.rows;
                if(account) {
                    $('.noneToPay .te1').text(account.fullName); // 团员所在组织名称
                }
            });
            $('.noneToPay').show(); // 显示 无数据页面
        }
    });

    // 点击'确定'按钮(弹出框)
    $('.bot_big_btn').click(function () {
        $('.popup_box').hide(); // 隐藏弹出框
    });

    // 单选框(选中与取消)
    $('.list_box').on('click', '.list_item', function(event) {
        $(this).toggleClass('chosen');
    });
    // 单选框(全选与取消)
    $('.all').click(function(event) {
        $(this).toggleClass('chosen');
        if ($(this).hasClass('chosen')) {
            $('.list_box .list_item').addClass('chosen');
        } else {
            $('.list_box .list_item').removeClass('chosen');
        }
    });

    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击'选好了' 按钮
    $('#confirm').click(function () {
        var infos = [];
        $('.list_box .list_item.chosen').each(function () {
            var text = $(this).data('id') + ',' + $(this).find('.p1').text() + ',' +  $(this).find('.p2 span').text();
            infos.push(text);
        });
        infos = infos.join('@@'); // 转成字符串
        if(!infos) {
            $.alert('请选中团员');
            return;
        }

        window.location.href = 'help_pay_now.html?infos=' + infos; // 立即交费(帮TA交费) 页面
    });
});