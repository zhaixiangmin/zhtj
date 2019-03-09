/**
 * Created by licong on 2017/1/18.
 */

$(function () {
    var appealId_global = undefined; // 申诉编号(全局变量)
    // 状态名称
    var auditStatusName = {
        '1': '转出团支部待审核',
        '2': '转出团支部的上级待审核',
        '3': '转入团支部待审核',
        '4': '转入团支部的上级待审核',
        '5': '接转成功',
        '6': '转出团支部拒绝',
        '7': '转出团支部的上级拒绝',
        '8': '转入团支部拒绝',
        '9': '转入团支部的上级拒绝',
        '10': '转出团支部同意',
        '11': '转出团支部的上级同意',
        '12': '转入团支部同意',
        '13': '转入团支部的上级同意'
    };

    // 申诉状态名称
    var appealStatusName = {
        '0': '申诉待审核',
        '1': '申诉成功',
        '2': '申诉失败'
    };

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#dg_appeal').datagrid({
            title: '我的申诉处理',  //表格名称
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'memberName', title :'姓名', sortable: false},
                {field: 'memberMobile', title :'手机号码', sortable: false},
                {field: 'auditStatus', title :'状态', sortable: false, formatter: function(value, row, index){
                        if (value){
                            return auditStatusName[value];
                        }
                    }},
                {field: 'appealStatus', title :'申诉状态', sortable: false, formatter: function(value, row, index){
                        if (value != null){
                            return appealStatusName[value];
                        }
                    }},
                {field: 'primalOrgName', title :'转出团支部', sortable: false, formatter: function(value, row, index){
                        return Utils.validOrgName(value);
                    }}, // 原组织名称
                {field: 'primalParentOrgName', title :'转出团支部的上级', sortable: false, formatter: function(value, row, index){
                        return Utils.validOrgName(value);
                    }}, // 原组织上级名称
                {field: 'newOrgName', title :'转入团支部', sortable: false, formatter: function(value, row, index){
                        return Utils.validOrgName(value);
                    }}, // 新组织名称
                {field: 'newParentOrgName', title :'转入团支部的上级', sortable: false, formatter: function(value, row, index){
                        return Utils.validOrgName(value);
                    }}, // 新组织上级名称
                {field: 'appealTime', title :'申诉提交日期', sortable: false}
            ]],
            loader: function (param, success, error) {
                // 跨页面传参
                if(parent.window.zhtj && parent.window.zhtj.referer) {
                    if(parent.window.zhtj.referer == 'message') { // "消息管理-我的消息"
                        if('appealStatus' in parent.window.zhtj) { // 报到待审核
                            param.appealStatus =  parent.window.zhtj.appealStatus; // 申诉待审核 -- 申诉状态
                            $('#appeal_filter').combobox('setValue', parent.window.zhtj.appealStatus); // 默认选中筛选(申诉状态 - 申诉待审核)
                        }
                    }
                    var queryParams = {};
                    $.each(param, function (key, value) {
                        // 页码和页大小不用设置
                        if(key != 'page' && key != 'rows') {
                            queryParams[key] = value;
                        }
                    });
                    $('#dg_appeal').datagrid({queryParams: queryParams}); // 设置datagrid请求参数，否则下载页面没有这些参数
                    delete parent.window.zhtj; // 删除对象
                    return;
                }


                // 我的申诉处理
                RelationApi.appealList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    memberName: param.memberName, // 团员姓名
                    memberMobile: param.memberMobile, // 团员手机号
                    appealStatus: param.appealStatus, // 申诉状态(0-申诉待审核，1-申诉成功，2-申诉失败，筛选条件)
                    appealMonth: param.appealMonth // 申诉筛选月份(yyyy-MM格式，筛选条件)
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#dg_appeal').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        console.log('curr', curr);
                        $('#dg_appeal').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
                        error();
                        return false;
                    }
                    success(data);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                });
            },
            onLoadSuccess: function () {
                $(this).datagrid("fixRownumber"); // 行号宽度自适应
            },
            fit: true, // 固定表头
            pagination: true,//如果表格需要支持分页，必须设置该选项为true
            pageNumber: 1, // 初始化页码
            pageSize: 20,   //表格中每页显示的行数
            pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
            rownumbers: true,   //是否显示行号
            nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
            // striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
            // method:'get',   //表格数据获取方式,请求地址是上面定义的url
            // sortName: 'dealTime',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
            // sortOrder: 'desc',  //使用倒序排序
            // idField: 'ID', // 指示哪个字段是标识字段
            // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
            loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
            singleSelect:true, // 设置为 true，则只允许选中一行
            frozenColumns: [[  //固定在表格左侧的栏
                {field: 'check', checkbox: true}
            ]],
            toolbar: [{
                iconCls: 'icon-my-audit',
                text: '审核',
                id: 'appeal_audit',
                handler: function(){
                    var selectedData = $('#dg_appeal').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // appealStatus, // 申诉状态(0-申诉待审核，1-申诉成功，2-申诉失败，筛选条件)
                    if(selectedData.appealStatus != 0) {
                        $.alert('该记录处于' + appealStatusName[selectedData.appealStatus] + '状态，请勿重复操作');
                        return;
                    }

                    appealId_global = selectedData.id; // 申诉编号(全局变量)
                    // 转接详情
                    var html = '';
                    html += '<div class="item">';
                    html += '    <span class="title">转入团支部：</span><span class="describe">' + selectedData.primalOrgName + '</span>';
                    html += '</div>';
                    html += '<div class="item">';
                    html += '    <span class="title">接转状态：</span><span class="describe">' + auditStatusName[selectedData.auditStatus] + '</span>';
                    html += '</div>';
                    html += '<div data-mid="' + selectedData.mid + '" data-otid="' + selectedData.otid + '" class="item transfer_detail" style="font-size: 14px;color: #0d87ef;cursor: pointer;">更多转接详细信息</div>';
                    // 更多转接详细信息
                    $('#dialog_audit .list_box .list.detail .content').html(html);

                    // 申诉理由
                    html_reason = '<div class="item">' + selectedData.reason + '</div>';
                    $('#dialog_audit .list_box .list.reason .content').html(html_reason);

                    // 证明文件
                    var html_img = '';
                    var html_pdf = '';
                    var pdf_flag = false; // 标识是否有pdf(true：有，false：没有)
                    var attachmentUrlList = selectedData.attachmentUrl.split(',');
                    for(var i=0; i<attachmentUrlList.length; i++) {
                        var attachmentUrl = attachmentUrlList[i];
                        var photoStr = 'gif,jpg,jpeg,png,bmp';
                        var ext = attachmentUrl.substring(attachmentUrl.lastIndexOf('.')+1, attachmentUrl.length).toLowerCase(); // 文件扩展名
                        console.log('ext', ext);
                        if(photoStr.indexOf(ext) != -1) { // 图片
                            html_img += '<div class="img_box">';
                            html_img += '    <img src="' + attachmentUrl + '" title="点击查看大图">';
                            html_img += '</div>';
                        }else { // 非图片
                            if(!pdf_flag) { // 尚未没有标识有pdf
                                html_pdf += '<div class="files" style="clear: both;">';
                                pdf_flag = true;
                            }
                            html_pdf += '    <div class="file_item" style="margin: 10px 0;">';
                            html_pdf += '        <a style="display: inline-block;padding-left: 25px;font-size: 14px;text-decoration: none;color: #0d87ef;background: #fff url(../../public/img/clip.png) no-repeat left center;" href="' + attachmentUrl + '" title="点击下载">' + Utils.getUploaderSuffixName(attachmentUrl) + '</a>';
                            html_pdf += '    </div>';
                        }
                    }
                    if(pdf_flag) {
                        html_pdf += '</div>';
                    }
                    html_img += html_pdf; // 添加pdf文件展示
                    $('#dialog_audit .list_box .list.attachment .content').html(html_img);

                    $('#dialog_audit').dialog('open'); // 弹出对话框(审核)
                }
            }, '-', {
                iconCls: 'icon-my-view',
                text: '查看',
                id: 'appeal_view',
                handler: function(){
                    var selectedData = $('#dg_appeal').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 转接详情
                    var html = '';
                    html += '<div class="item">';
                    html += '    <span class="title">转入团支部：</span><span class="describe">' + selectedData.primalOrgName + '</span>';
                    html += '</div>';
                    html += '<div class="item">';
                    html += '    <span class="title">接转状态：</span><span class="describe">' + auditStatusName[selectedData.auditStatus] + '</span>';
                    html += '</div>';
                    html += '<div data-mid="' + selectedData.mid + '" data-otid="' + selectedData.otid + '" class="item transfer_detail" style="font-size: 14px;color: #0d87ef;cursor: pointer;">更多转接详细信息</div>';
                    $('#dialog_view .list_box .list.detail .content').html(html);

                    // 申诉理由
                    html_reason = '<div class="item">' + selectedData.reason + '</div>';
                    $('#dialog_view .list_box .list.reason .content').html(html_reason);

                    // 证明文件
                    var html_img = '';
                    var html_pdf = '';
                    var pdf_flag = false; // 标识是否有pdf(true：有，false：没有)
                    var attachmentUrlList = selectedData.attachmentUrl.split(',');
                    for(var i=0; i<attachmentUrlList.length; i++) {
                        var attachmentUrl = attachmentUrlList[i];
                        var photoStr = 'gif,jpg,jpeg,png,bmp';
                        var ext = attachmentUrl.substring(attachmentUrl.lastIndexOf('.')+1).toLowerCase(); // 文件扩展名
                        console.log('ext', ext);
                        if(photoStr.indexOf(ext) != -1) { // 图片
                            html_img += '<div class="img_box">';
                            html_img += '    <img src="' + attachmentUrl + '" title="点击查看大图">';
                            html_img += '</div>';
                        }else { // 非图片
                            if(!pdf_flag) { // 尚未没有标识有pdf
                                html_pdf += '<div class="files" style="clear: both;">';
                                pdf_flag = true;
                            }
                            html_pdf += '    <div class="file_item" style="margin: 10px 0;">';
                            html_pdf += '        <a style="display: inline-block;padding-left: 25px;font-size: 14px;text-decoration: none;color: #0d87ef;background: #fff url(../../public/img/clip.png) no-repeat left center;" href="' + attachmentUrl + '" title="点击下载">' + Utils.getUploaderSuffixName(attachmentUrl) + '</a>';
                            html_pdf += '    </div>';
                        }
                    }
                    if(pdf_flag) {
                        html_pdf += '</div>';
                    }
                    html_img += html_pdf; // 添加pdf文件展示
                    $('#dialog_view .list_box .list.attachment .content').html(html_img);


                    // 申诉结果
                    var html_result = '';
                    html_result += '<div class="item">审核' + appealStatusName[selectedData.appealStatus] + '</div>';
                    if(selectedData.returnReason) {
                        html_result += '<div class="item">';
                        html_result += '    <span class="title">审核说明：</span><span class="describe">' + selectedData.returnReason + '</span>';
                        html_result += '</div>';
                    }
                    html_result += '<div class="item">';
                    html_result += '    <span class="title">审核组织：</span><span class="describe">' + selectedData.auditOrgName + '</span>';
                    html_result += '</div>';
                    $('#dialog_view .list_box .list.result .content').html(html_result);

                    $('#dialog_view').dialog('open'); // 弹出对话框(查看)
                }
            }]
        });
    }

    // 数据筛选(需要初始化的事件)
    function init_datafilter() {

        /****************** 日期插件年月开始 ********************/
        Utils.setDateBoxYearMonth($('#month_filter')); // 设置日期插件为年月日期插件(日期)
        /****************** 日期插件年月结束 ********************/

        // 申诉状态
        $('#appeal_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            data: [
                {value: '', name: '全部'},
                {value: '0', name: '申诉待审核'},
                {value: '1', name: '申诉成功'},
                {value: '2', name: '申诉失败'}
            ]
        });

        // 点击查询按钮 -- 数据筛选
        $('#filter').click(function () {
            var params = {
                // pageNo: param.page, // 当前页码
                // pageSize: param.rows, // 每页记录数
                memberName: $('#name_filter').val().trim(), // 团员姓名
                memberMobile: $('#mobile_filter').val().trim(), // 手机号码
                appealStatus: $('#appeal_filter').combobox('getValue'), // 申诉状态(0-申诉待审核，1-申诉成功，2-申诉失败，筛选条件)
                appealMonth: $('#month_filter').datebox('getValue'), // 申诉筛选月份(yyyy-MM格式，筛选条件)
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#dg_appeal').datagrid('load', params);
        });
    }

    // 审核(需要初始化的事件)
    function init_audit() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 审核 -- 对话框
        $('#dialog_audit').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#dialog_audit .checkbox').removeClass('active'); // 取消勾选单选框
                $('#returnReason').val(''); // 清空输入框
            },
            buttons: [{
                text:'取消',
                // iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_audit').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                // iconCls:'icon-ok',
                handler:function(){
                    var params = {
                        appealId:  appealId_global, // 申诉编号(要审核的申诉ID)
                        appealResult: $('#dialog_audit .checkbox.active').data('id'), // 审核结果(1-通过,2-拒绝)
                        returnReason: $('#returnReason').val().trim() // 审核说明(审核说明/退回原因，appealResult=2时)
                    };
                    console.log('params', params);

                    if(!params.appealResult) {
                        window.location.href = '#appealResult_box'; // 跳到指定锚点(申诉结果)
                        $.alert('请选择申诉结果');
                        return;
                    }
                    // if(params.appealResult == 1) { // 同意
                    //     params.returnReason = undefined;
                    // }else
                    if (params.appealResult == 2 && !params.returnReason) { // 拒绝
                        window.location.href = '#returnReason'; // 跳到指定锚点(申诉原因)
                        $.alert('请输入原因');
                        return;
                    }

                    console.log('提交成功', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog_audit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 审核组织转接申诉
                    RelationApi.auditAppeal(params).then(function (data) {
                        $('#dialog_audit').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            Utils.updateDataGrid($('#dg_appeal')); // 更新表格数据(待审核)
                        });
                    }).always(function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog_audit .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });
                }
            }]
        });

        // 点击单选框事件
        $('#dialog_audit label').click(function () {
            if($(this).hasClass('active')) { // 已选中，返回
                return;
            }

            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            // var status = $(this).data('id'); // 1：通过，2：拒绝
            // // 1：通过，2：拒绝
            // if(status == 2) { // 拒绝
            //     $('#returnReason').parent().show(); // 显示
            //     window.location.href = '#returnReason'; // 跳转到指定锚点
            // }else { // 通过
            //     $('#returnReason').parent().hide(); // 隐藏
            // }
        });


        // 点击'更多转接详细信息'(跳转到业务详情页面)
        $('.list_box .list.detail .content').on('click', '.item.transfer_detail', function () {
            parent.window.zhtj = {
                mid: $(this).data('mid'), // 团员id
                otid: $(this).data('otid'), // 组织转移申请ID
            };
            Utils.toggleTab('业务详情', 'view/relation/flow_chat.html'); // 创建(打开)新面板(业务详情)
        });
    }


    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_audit(); // 审核(需要初始化的事件)
    }

    init(); // 初始化函数
});