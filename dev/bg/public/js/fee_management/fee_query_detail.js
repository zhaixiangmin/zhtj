/**
 * Created by licong on 2018/8/2.
 */

$(function () {
    var oid_global = undefined; // 组织id(全局变量)
    var nameList = ['name', 'realTotal', 'total', 'paidIn', 'unpaid', 'paidInAmount']; // 组织名称、组织团员总数、团员总数、已交纳、未交纳、交纳总额

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#datagrid_fee_detail').datagrid({
            title: '团费详情',  //表格名称
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'memberName', title :'团员姓名', sortable: false},
                {field: 'politicalOutlookStr', title :'政治面貌', sortable: false},
                {field: 'memberMobile', title :'手机号码', sortable: false},
                {field: 'orgName', title :'所在团支部', sortable: false},
                {field: 'nowOrgName', title :'团员当前所属支部', sortable: false},
                // {field: 'nowOrgName', title :'团员当前组织名称', sortable: false},
                {field: 'fees', title:'当月应交金额（元）', sortable: false},
                {field: 'donateAmount', title:'自愿交费金额（元）', sortable: false},
                {field: 'payStr', title:'当月交纳状态', sortable: false},
                {field: 'unpaidAmount', title:'累计未交团费总数', sortable: false}
            ]],
            loader: function (param, success, error) {
                if(parent.window.zhtj && parent.window.zhtj.oid) {
                    oid_global = parent.window.zhtj.oid; // 组织id(全局变量)
                    param.month = parent.window.zhtj.month; // 月份(全局变量)
                    $('#month_filter').datebox('setValue', param.month);

                    delete parent.window.zhtj; // 删除对象
                    console.log('parent.window.zhtj', parent.window.zhtj);
                }


                // 获取团费统计
                FeeManagementApi.getPaymentStatistics({
                    month: param.month, // 月份
                    oid: oid_global, // 组织ID
                    sub: 0 // 本级-- 下级标记(0：本级；1：下级)
                }).then(function (data) {
                    if(data.dataList && data.dataList.length > 0) {
                        var item = data.dataList[0];
                        // 绑定值(组织名称、团员总数、已交纳、未交纳、交纳总额)
                        for(var i=0; i<nameList.length; i++) {
                            var name = nameList[i];
                            $('#' + name).text(item[name]);
                        }
                    }
                });

                // 分页获取组织交费详情
                FeeManagementApi.getPaymentStatisticsDetails({
                    pageNo: param.page, // 当前页码
                    pageSize: param.rows, // 每页记录数
                    oid: oid_global, // 组织ID(全局变量)
                    month: param.month, // 月份
                    status: param.status, // 交纳状态(0未交；1已交)
                    mobile: param.mobile // 手机号码
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#datagrid_fee_detail').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#datagrid_fee_detail').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
            // frozenColumns: [[  //固定在表格左侧的栏
            //     {field: 'check', checkbox: true}
            // ]],
            // toolbar: [{
            //     iconCls: 'icon-my-view',
            //     text: '查看',
            //     id: 'members_list',
            //     handler: function(){
            //         var selectedData = $('#datagrid_fee_detail').datagrid('getSelected');
            //         if(!selectedData) {
            //             $.alert('请选择需要操作的记录');
            //             return;
            //         }
            //
            //
            //         // 查询已发凭证的公示轨迹
            //         FeeManagementApi.getSendCredentialsTrack({cid: selectedData.id}).then(function (data) {
            //             var data = data.dataList;
            //             if(data) {
            //                 var $table = $('.myTable');
            //                 $table.find('.months').text(data.months); // 月份
            //                 $table.find('.fromOrg').text(data.fromOrg); // 发送凭证组织全称
            //                 $table.find('.amount').text(data.amount); // 返还金额
            //                 $table.find('.createTime').text(data.createTime); // 公示凭证时间
            //                 var trackList = data.track;
            //                 var html = '<div class="state_title">返还轨迹详情：</div>';
            //                 for(var i=0; i<trackList.length; i++) {
            //                     var item = trackList[i];
            //                     if(item.confirm == 1) { // 已确认
            //                         html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">【' + item.fromOrg + '】</em>返还<em class="color1">' + item.amount + '元</em>到<em class="color1">【' + item.toOrg + '】</em><em>' + item.toOrg + '已确认</em></p>';
            //                     }else { // 未确认
            //                         html += '<p class="state_item"><em class="time">' + item.createTime + '</em><em class="color1">【' + item.fromOrg + '】</em>返还<em class="color1">' + item.amount + '元</em>到<em class="color1">【' + item.toOrg + '】</em><em>待确认</em></p>';
            //                     }
            //                 }
            //                 $('.state_box').html(html);
            //
            //                 $('#dialog_view').dialog('open'); // 显示弹出框(团费返还详情)
            //             }
            //         });
            //
            //     }
            // }
            // ]
        });


      //  鼠标悬浮事件 -- 数据表格工具栏按钮
      $('#ask_icon').on('mouseover mouseout', function (event) {
        if(event.type == 'mouseover') {
          var idName = $(this).attr('id');
          var top = $(this).offset().top + $(this).outerHeight() + 8;
          var left = $(this).offset().left;
          console.log('idName', idName);
          var text = '统计数据每天凌晨更新，以下列表为实时更新';
          // var text = declarationName[idName];
          if(text) {
            var html = '';
            html += '<div class="tips_tool" style="pointer-events: none; position: fixed; left: ' + left + 'px; top: ' + top + 'px; z-index: 1; width: 140px; padding: 0 10px; font-size: 12px; line-height: 22px; background: #fff; color: #db4254; border: 1px solid #c8c8c8;">';
            html += ' <div class="my-red">' + text + '</div>';
            html += ' <div class="triangle_c8c8c8" style="position: absolute;left: 8px;top: -20px;z-index: 1;border: 10px solid;border-color: transparent transparent #c8c8c8 transparent;"></div>'; // 实三角(#c8c8c8)
            html += ' <div class="triangle_fff" style="position: absolute;left: 8px;top: -18px;z-index: 1;border: 10px solid;border-color: transparent transparent #fff transparent;"></div>'; // 白三角(#fff)
            html += '</div>';
            $(this).append(html);
          }
        } else if(event.type == 'mouseout') {
          $(this).find('.tips_tool').remove();
        }
      });
    }
    
    // 数据筛选
    function init_datafilter() {
        
        // 交纳状态
        $('#status_filter').combobox({
            width: 173,
            valueField: 'key',
            textField: 'value',
            data: [
                {key: '', value: '全部'},
                {key: '0', value: '未交'},
                {key: '1', value: '已交'}
            ]
        });
        
        // 点击 '搜索'
        $('#filter').click(function () {
            var params = {
                month: $('#month_filter').datebox('getValue'), // 月份
                mobile: $('#mobile_filter').val().trim(), // 手机号码
                status: $('#status_filter').datebox('getValue') // 交纳状态(0未交；1已交)
            };

            $('#datagrid_fee_detail').datagrid('load', params); // 加载并显示第一页的行
        });

        /****************** 日期插件年月开始 ********************/
        Utils.setDateBoxYearMonth($('#month_filter')); // 设置日期插件为年月日期插件
        /****************** 日期插件年月结束 ********************/

        // 点击 '导出本页数据'
        $('#download').click(function () {
            var paginationOptions = $('#datagrid_fee_detail').datagrid('getPager').data("pagination" ).options;
            var queryParams = $('#datagrid_fee_detail').datagrid('options').queryParams;
            console.log('queryParams', queryParams);
            console.log('paginationOptions', paginationOptions);
            var queryParamsStr = '?pageNo=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize + '&oid=' + oid_global; // 请求参数字符串
            $.each(queryParams, function (key, value) {
                if(!value) { // 不能出现undefined
                    value = '';
                }
                queryParamsStr += '&' + key + '=' + value;
            });
            console.log('queryParamsStr', queryParamsStr);
            window.location.href = League.path + '/bg/exportPaymentStatisticsDetailsForExcel' + queryParamsStr; // 分页导出组织交费详情
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
    }

    init(); // 初始化函数 
    
});