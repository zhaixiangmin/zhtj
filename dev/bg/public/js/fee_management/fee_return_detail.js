/**
 * Created by licong on 2018/8/3.
 */

$(function () {
    var id_global = undefined; // 团费返还记录ID(全局变量)

    if(parent.window.zhtj && parent.window.zhtj.id) {
        id_global = parent.window.zhtj.id; // 团费返还记录ID(全局变量)

        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);
    }

    // // 获取当前组织账户余额
    // FeeManagementApi.getBalance({}).then(function (data) {
    //     console.log('FeeManagementApi.getVirtualAmount data', data);
    //     $('#virtualAmount').text(data.data); // 虚拟账户金额
    // });

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#fee_return_detail_datagrid').datagrid({
            title: '返还分配详情',  //表格名称
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'orgLevel', title :'组织树层级', sortable: false},
                {field: 'orgName', title :'组织简称', sortable: false, formatter: function(value, row, index){
                    if(row.flag == 1) { // 本组织
                        return value + '<span class="my-red">（本组织）</span>';
                    }

                    return value;
                }},
                {field: 'appropriateTime', title :'团费收交时段', sortable: false},
                {field: 'totalAmount', title:'团费收交总额', sortable: false},
                {field: 'retentionAmount', title:'上级返还/（持有）金额', sortable: false},
                {field: 'retention', title:'返还比例', sortable: false, formatter: function(value, row, index){
                    return value + '%';
                }},
                {field: 'createTimeStr', title:'返还日期', sortable: false}
            ]],
            loader: function (param, success, error) {
                // 团费划拨轨迹
                FeeManagementApi.getAppropriateTrack({
                    id: id_global, // 团费返还记录ID
                    level: param.level // 组织树层级
                }).then(function (data) {
                    $('#appropriateTime').text(data.dataList.appropriateTime); // 团费收交月份
                    $('#retentionAmount').text(data.dataList.retentionAmount); // 该月团费返还金额
                    success(data.dataList.details);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                });
            },
            onLoadSuccess: function () {
                $(this).datagrid("fixRownumber"); // 行号宽度自适应
            },
            fit: true, // 固定表头
            // pagination: true,//如果表格需要支持分页，必须设置该选项为true
            // pageNumber: 1, // 初始化页码
            // pageSize: 20,   //表格中每页显示的行数
            // pageList: [20, 50, 100, 200, 500], // 初始化页面尺寸的选择列表
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
            //         var selectedData = $('#fee_return_detail_datagrid').datagrid('getSelected');
            //         if(!selectedData) {
            //             $.alert('请选择需要操作的记录');
            //             return;
            //         }
            //
            //         // 查询已收凭证的公示轨迹
            //         FeeManagementApi.getReceiveCredentialsTrack({cid: selectedData.id}).then(function (data) {
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
            //     }
            // }
            // ]
        });
    }
    
    // 数据筛选
    function init_datafilter() {

        // 组织树层级
        $('#level_filter').combobox({
            width: 173,
            valueField: 'key',
            textField: 'value',
            data: [
                {key: '', value: '全部组织树层级'},
                {key: '3', value: '组织树第三层'},
                {key: '4', value: '组织树第四层'},
                {key: '5', value: '组织树第五层'}
            ]
        });

        // 点击 '搜索'
        $('#filter').click(function () {
            var params = {
                level: $('#level_filter').combobox('getValue') // 组织树层级
            };


            $('#fee_return_detail_datagrid').datagrid('load', params); // 加载并显示第一页的行
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        // init_publish(); // 公示凭证(需要初始化的事件)
    }

    init(); // 初始化函数 
    
});