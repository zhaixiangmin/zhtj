/**
 * Created by licong on 2017/11/21.
 */
$(function () {

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#message').datagrid({
            title: '消息管理',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'status', title :'消息状态', sortable: false, hidden: true},
                {field: 'receiveId', title :'站内信ID', sortable: false, hidden: true},
                {field: 'title', title :'站内信标题', sortable: false, align: 'left'},
                {field: 'content', title :'站内信内容', sortable: false, align: 'left'},
                {field: 'statusStr', title :'状态', sortable: false},
                {field: 'receiveTime', title :'接收时间', sortable: false}
            ]],
            loader: function (param, success, error) {
                // 跨页面传参
                if(parent.window.zhtj && parent.window.zhtj.referer) {
                    if(parent.window.zhtj.referer == 'index') { // 来源(首页)
                        $('#message').datagrid('options').queryParams.status = parent.window.zhtj.status; // 设置datagrid参数值，以便之后能获取datagrid参数值
                        param.status = parent.window.zhtj.status; // 未读 - 审核状态
                        $('#status_filter').combobox('setValue', parent.window.zhtj.status); // 默认选中筛选(未读 - 审核状态)
                    }
                    delete parent.window.zhtj; // 删除对象
                }
                
                // 获取用户的站内信
                MessageApi.findAllMessage({
                    pageNo: param.page, // 当前页码
                    pageSize: param.rows, // 每页记录数
                    status: param.status, // 消息状态(0未读，1已读，2已删)
                    type: 0 // 账号类型(0组织，1团干)
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#message').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        $('#message').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
            // singleSelect:true, // 设置为 true，则只允许选中一行
            frozenColumns: [[  //固定在表格左侧的栏
                {field: 'check', checkbox: true}
            ]]
            // ,
            // toolbar: [{
            //     iconCls: 'icon-my-view',
            //     text: '查看',
            //     id: 'league_view',
            //     handler: function(){
            //         // // var selectedData = $('#message').datagrid('getSelected');
            //         // // console.log('selectedData', selectedData);
            //         // // if(!selectedData) {
            //         // //     $.alert('请选择需要操作的记录');
            //         // //     return;
            //         // // }
            //         // console.log('parent', parent);
            //         // parent.$('#nav li>a[href="view/organization_management/person_infomation.html"]').click(); // 自调用 点击'组织资料'(左侧菜单)
            //         //
            //         // // parent.window.createTab("我的消息", 'view/message/message.html');
            //         //
            //         //
            //         // // // 弹窗位置居中
            //         // // $("#dialog_view").panel("move",{ top: $(document).scrollTop() + ($(window).height()-$('#dialog_view').parents('.window').outerHeight())*0.5 });
            //         // // $('#dialog_view').dialog('open'); // 弹出对话框
            //     }
            // }]
        });

        // 点击 '点击查看'
        $('.datagrid-body').on('click', '.jump-to-detail', function () {
            var path = $(this).data('path');
            var content = $(this).parents('div.datagrid-cell').text();
            var $status = $(this).parents('tr').find('td[field="statusStr"] div');
            var text = $(this).parents('tr').find('td[field="statusStr"] div').text();

            path = path.replace('/view', 'view'); // 避免以/view开头的，该页面不存在

            if(path.indexOf('view/league_menber/league_menber.html') != -1) { // 跳转到"团员管理-我的团员"
                parent.window.zhtj = {
                    referer: 'message' // 来源(消息管理-我的消息)
                    // rewardStatus: '0' // 待审核
                };

                if(content.indexOf('团员报到申请') != -1) {
                    parent.window.zhtj.auditStatus = '1'; // 报到待审核 - 报到资料状态
                } else if(content.indexOf('奖励认证申请') != -1) {
                    parent.window.zhtj.rewardStatus =  '2'; // 待本组织审核 -- 奖励状态
                } else if(content.indexOf('修改申请') != -1) {
                    parent.window.zhtj.auditStatus =  '4'; // 修改资料待审核 -- 报到资料状态
                } else if(content.indexOf('恢复团籍通知') != -1) { // 恢复团籍 -- 团籍状态
                    parent.window.zhtj.disabled = '0';
                }  else if(content.indexOf('离团审核通知') != -1) { // 离团审核 -- 团籍状态
                    parent.window.zhtj.disabled = '3';
                } else if(content.indexOf('脱团审核通知') != -1) { // 脱团审核 -- 团籍状态
                    parent.window.zhtj.disabled = '5';
                } else if(content.indexOf('退团审核通知') != -1) { // 退团审核 -- 团籍状态
                    parent.window.zhtj.disabled = '7';
                } else if(content.indexOf('开除团籍审核通知') != -1) { // 开除团籍审核 -- 团籍状态
                    parent.window.zhtj.disabled = '9';
                }
            }

            if(path.indexOf('view/relation/appeal_management.html') != -1) { // 跳转到"组织关系接转-申诉处理"
                parent.window.zhtj = {
                    referer: 'message' // 来源(消息管理-我的消息)
                    // rewardStatus: '0' // 待审核
                };

                if(content.indexOf('组织关系接转申诉') != -1) { // 组织关系接转-申诉处理
                    parent.window.zhtj.appealStatus =  '0'; // 申诉待审核 -- 申诉状态
                }
            }

            if(text == '未读') {
                console.log('未读');

                var params_detail = {
                    receiveId: $(this).parents('tr').find('td[field="receiveId"] div').text(), // 站内信ID
                    type: 0, // 账号类型(0组织，1团干)
                    status: 1 // 消息状态(0未读，1已读，2已删)
                };

                // 改变私信的状态
                MessageApi.changeStatus(params_detail).then(function (data) {

                    $status.text('已读'); // 修改 状态列

                    Utils.toggleNav(path, true); // 关闭/打开指定导航页面(左侧导航栏) -- 用处：需要权限页面

                    // 获取用户的站内信
                    MessageApi.getUnread({
                        type: 0 // 账号类型(0组织，1团干)
                    }).then(function (data) {
                        var num_msg = data.data;
                        if(num_msg && num_msg > 0) {
                            parent.$('.header-box .header .content .right-side .message .message_tips_box .message_tips .message_num').text(num_msg);
                            parent.$('.header-box .header .content .right-side .message .message_tips_box').show(); // 显示 消息提醒
                        }else {
                            parent.$('.header-box .header .content .right-side .message .message_tips_box').hide(); // 隐藏 消息提醒
                        }
                    });

                });
            } else { // 已读/删除
                console.log('已读/删除');
                Utils.toggleNav(path, true); // 关闭/打开指定导航页面(左侧导航栏) -- 用处：需要权限页面
            }
        });
    }


    // 数据筛选（需要初始化的事件）
    function init_datafilter() {
        // 获取审核状态列表
        $('#status_filter').combobox({
            width: 173,
            valueField: 'value',
            textField: 'name',
            data: [{
                value: '',
                name: '全部'
            },{
                value: '0',
                name: '未读'
            },{
                value: '1',
                name: '已读'
            }
            // ,{
            //     value: '2',
            //     name: '已删'
            // }
            ]
        });

        // 点击查询按钮 -- 数据筛选
        $('#filter').click(function () {
            var params = {
                // pageNo: param.page, // 当前页码
                // pageSize: param.rows, // 每页记录数
                status: $('#status_filter').combobox('getValue') // 消息状态(0未读，1已读，2已删)
            };
            console.log('#filter params', params);

            // 分页插件自动传递 page页码和rows页大小
            $('#message').datagrid('load', params);
        });


        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 点击'标识为已读' -- 数据筛选
        $('#read_flag').click(function () {
            var checkedList = $('#message').datagrid('getChecked'); // 返回复选框选中的所有行
            console.log('checkedList', checkedList);
            if(!checkedList || checkedList.length <= 0) {
                $.alert('请选择需要操作的记录');
                return;
            }

            var unReadList = [];
            // 遍历选中项
            for(var i=0; i<checkedList.length; i++) {
                var item = checkedList[i];
                if(item.statusStr == '未读') {
                    unReadList.push(item.receiveId);
                    console.log('未读');
                }
            }
            console.log('unReadList', unReadList);
            unReadList = unReadList.join(',');
            if(!unReadList) {
                $.alert('暂无未读消息');
                return;
            }

            var params = {
                receiveIds: unReadList, // 站内信ID
                type: 0 // 账号类型(0组织，1团干)
            };
            
            if(isClick) { // 已点击
                return;
            }
            isClick = true; // 设置为 已点击
            $('#read_flag').css({opacity: 0.5});

            // 批量设置站内信为已读状态
            MessageApi.setReaded(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    // var queryParams = $('#message').datagrid('options').queryParams;
                    // console.log('queryParams', queryParams);
                    // // 分页插件自动传递 page页码和rows页大小
                    // $('#message').datagrid('load', queryParams); // 保留筛选条件
                    Utils.updateDataGrid($('#message')); // 更新表格数据(消息数据网格)
                });

                // 获取用户的站内信
                MessageApi.getUnread({
                    type: 0 // 账号类型(0组织，1团干)
                }).then(function (data) {
                    var num_msg = data.data;
                    if(num_msg && num_msg > 0) {
                        parent.$('.header-box .header .content .right-side .message .message_tips_box .message_tips .message_num').text(num_msg);
                        parent.$('.header-box .header .content .right-side .message .message_tips_box').show(); // 显示 消息提醒
                    }else {
                        parent.$('.header-box .header .content .right-side .message .message_tips_box').hide(); // 隐藏 消息提醒
                    }
                });

            }).always(function () {
                isClick = false; // 设置为 未点击
                $('#read_flag').css({opacity: 1});
            });

            console.log('完成操作');
        });
    }


    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
    }

    init(); // 初始化函数 
    
});