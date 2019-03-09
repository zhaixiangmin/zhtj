/**
 * Created by licong on 2017/11/30.
 */
$(function () {
    var mid = Utils.getQueryString('mid');
    var name = Utils.getQueryString('name');
    if(!mid) {
        $.alert('团员参数不能为空');
        return;
    }
    if(!name) {
        $.alert('团员名称不能为空');
        return;
    }
    $('.item_title1 .p1').text(name); // 团员姓名

    var isLoading_global = false; // 加载标识(全局变量，true：正在加载，false：加载完成)
    var isAll_global = false; // 全部数据加载标识(全局变量，true：全部数据加载完毕，false：全部数据尚未加载完毕)
    var index_global = 0; // 序号(全局变量)

    var params = {
        memberId: mid, // 团员ID
        pageIndex: 1,
        pageSize: 5
    };

    var optionList = ['type', 'content', 'hasLevel', 'hasAttachFile', 'rewardTime', 'recorderName', 'awardOrg', 'auditOrgName', 'status'];
    var paramsName = {
        'type': '奖励类型',
        'content': '奖励名称',
        'hasLevel': '获奖名次',
        'hasAttachFile': '证明附件',
        'rewardTime': '获奖时间',
        'recorderName': '录入者',
        'awardOrg': '授奖组织',
        'auditOrgName': '审核组织',
        'status': '奖励状态'
    };

    /**
     * 渲染页面列表
     * @param isClear {boolean} 是否清除页面数据(true：是，false：否)
     */
    function renderList(isClear) {
        // 获取单个审核组织需要审核的奖励记录列表
        AwardsApi.listByOrg(params).then(function (data) {
            console.log('AwardsApi.listByMember data', data);
            var list = data.dataList;

            Utils.showDataWithoutFilter(params, list); // 显示数据(无筛选条件，没数据就显示没数据)
            if(list.length <= 0 && index_global <= 0) {
                $('.two_btns_box').hide(); // 隐藏按钮
            }

            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                index_global++; // 序号(全局变量)

                html += '<ul class="table_list" data-id="' + item.id + '">';
                html += '    <em class="checkbox"></em>';
                for(var j=0; j<optionList.length; j++) {
                    var option = optionList[j];
                    var text = item[option];
                    var style = ''; // 样式(class)
                    if(option == 'type') { // 奖励类型
                        text = item['typeStr'];
                    }else if (option == 'hasLevel') { // 获奖名次
                        text = item['levelName'];
                    }else if(option == 'hasAttachFile') {
                        if(!item[option]) {
                            continue;
                        }
                        text = '查看';
                        style = 'c_blue attachment';
                    }else if(option == 'status') { // 奖励状态
                        text = item['statusStr'];
                        style = 'c_red';
                    }
                    html += '   <li class="table_box" data-haslevel="true"><span class="left">' + paramsName[option] + '</span><span class="right ' + style + '">' + text + '</span></li>';
                }
                html += '</ul>';
            }

            if(isClear) {
                $('.info_box .table_list_block').html(html);
            }else {
                $('.info_box .table_list_block').append(html);
            }

            if(list.length < params.pageSize) {
                isAll_global = true; // 设置为 全部数据加载完毕
                return;
            }

            params.pageIndex++; // 页数自增
            var documentHeight = $(document).height(); // 文档高度(整个网页的高度)
            var windowHeight = $(window).height(); // 可视窗口高度
            if(windowHeight >= documentHeight) { // 可视窗口未达到滚动事件的高度
                renderList(); // 渲染页面列表(自调用)
            }

        }).always(function () {
            isLoading_global = false; // 设置为 加载完成
        });
    }

    renderList(); // 渲染页面列表(初始化页面)

    // 窗口滚动事件
    $(window).scroll(function () {
        if(isLoading_global || isAll_global) { // 正在加载，且全部数据尚未加载完毕
            return;
        }
        var documentHeight = $(document).height(); // 文档高度(整个网页的高度)
        var windowHeight = $(window).height(); // 可视窗口高度
        var scrollTop = $(window).scrollTop(); // 滚动高度(浏览器可视窗口顶端距离网页顶端的高度)
        if( (windowHeight + scrollTop) / documentHeight > 0.9) {
            // 加载完成
            isLoading_global = true; // 设置为 正在加载
            renderList(); // 渲染页面列表
        }
    });
    
    // 点击 '单选框'
    $('.info_box').on('click', '.table_list', function () {
        var $checkbox = $(this).find('.checkbox');
        if($checkbox.hasClass('active')) {
            $checkbox.removeClass('active');
        }else {
            $checkbox.addClass('active');
        }
    });

    // 点击 '查看'(附件)
    $('.info_box .table_list_block').on('click', '.attachment', function () {
        var id = $(this).parents('.table_list').data('id'); // 奖励ID

        var params = {
            objectId: id, // 附件所属对象ID（奖励ID/惩罚ID等）
            module: 1 // 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚)
        };
        // 奖惩证明附件列表查看
        AwardsApi.attachFileList(params).then(function (data) {
            var imgUrlArr = data.rows;
            // var autoPlay = imgUrlArr.length > 1 ? true : false;
            var pnLoop = imgUrlArr.length > 1 ? true : false; // 前/后按钮是否继续循环，若为false则当翻动到最前/后页时，前/后按钮点击无效，同时增加prevStop/nextStop类名控制样色
            var html_img = '';
            var html_index = '';
            for(var i=0; i<imgUrlArr.length; i++) {
                var imgUrl = imgUrlArr[i].filePath;
                html_img += '<ul><li><a><img src="' + imgUrl + '"/></a></li></ul>';
                html_index += '<li>' + (i+1) + '</li>';
            }
            $('#bannerBox .bd').html(html_img);
            $('#bannerBox .hd ul').html(html_index);
            $('.curtain').show();
            TouchSlide({ slideCell:"#bannerBox", effect: "leftLoop", delayTime: 300, interTime: 3000, pnLoop: pnLoop });
        });

        return false; // 阻止默认行为/阻止事件冒泡
    });

    // 点击 '幕布'
    $('.curtain').click(function () {
        $(this).hide();
    });

    // 点击 'banner' 内容(不隐藏幕布)
    $('#bannerBox').click(function () {
        return false;
    });


    // 点击图片放大事件
    $('#bannerBox').on('click', '.bd ul li', function () {
        console.log('点击图片');
        var imgUrl = $(this).find('img').attr('src');
        console.log('imgUrl', imgUrl);
        if(!imgUrl) {
            $.alert('图片链接为空');
            return;
        }

        window.location.href = '../img_scale/img_scale.html?imgUrl=' + imgUrl;
    });


    var isClick = false; // 是否已点击(true：已点击，false：未点击)
    // 点击 '同意'
    $('#confirm').click(function () {
        var rewardIdsArr = [];
        $('.info_box .table_list_block .checkbox.active').each(function () {
            var rewardId = $(this).parent().data('id');
            rewardIdsArr.push(rewardId);
        });
        if(rewardIdsArr.length <= 0) {
            $.alert('请选择奖励项');
            return;
        }

        var resultsArr = [];
        for(var i=0; i<rewardIdsArr.length; i++) {
            resultsArr.push(1); // 同意
        }

        var params = {
            rewardIds: rewardIdsArr.join('@@'), // 团员id
            results: resultsArr.join('@@'), // 多份审核结果(1-通过/同意，2-退回/拒绝))
            returnReasons: undefined // 多份退回原因(同意不需要)
        };

        if(isClick) { // 若已点击
            return;
        }
        // 团员身份证通过
        $.confirm('您确定同意该申请？').then(function () {
            isClick = true; // 设置已点击 -- 是否已点击(true：已点击，false：未点击)
            $('#confirm').addClass('clicked'); // 设置样式(半透明)

            // 团组织批量审核团员的多份奖励信息
            AwardsApi.rewardAudit(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    window.location.href = 'awards_audit.html'; // 资料审核 页面
                });
            }).always(function () {
                isClick = false; // 设置未点击 -- 是否已点击(true：已点击，false：未点击)
                $('#confirm').removeClass('clicked'); // 设置样式(半透明)
            });
        });
    });

    // 点击 '拒绝'
    $('#refuse').click(function () {
        var rewardIdsArr = [];
        $('.info_box .table_list_block .checkbox.active').each(function () {
            var rewardId = $(this).parent().data('id');
            rewardIdsArr.push(rewardId);
        });
        if(rewardIdsArr.length <= 0) {
            $.alert('请选择奖励项');
            return;
        }

        console.log('rewardIdsArr', rewardIdsArr);
        window.location.href = 'awards_audit_refuse.html?rewardIds=' + rewardIdsArr.join('@@');
    });
});