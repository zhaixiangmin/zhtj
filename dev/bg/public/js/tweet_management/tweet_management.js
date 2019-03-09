/**
 * Created by licong on 2017/12/14.
 */
$(function () {
    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#tweet_magagement').datagrid({
            title: '首页文章管理',  // 表格名称
            border: true,  // 表格是否显示边框
            columns:[[
                {field: 'title', title: '标题', sortable: false},
                {field: 'createTime', title: '发布时间', sortable: false}
            ]],
            loader: function (param, success, error) {
                console.log('loader param============', param);
                // 推文管理列表
                TweetManagementApi.listByOrg({
                    pageIndex: param.page, // 当前页码
                    pageSize: param.rows // 每页记录数
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#tweet_magagement').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        console.log('curr', curr);
                        $('#tweet_magagement').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
                        error();
                        return false;
                    }
                    success(data);

                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                });
            },
            onBeforeLoad: function () {
                Utils.showLimitButtons(); // 显示权限按钮
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
                iconCls: 'icon-my-view',
                text: '查看',
                id: 'introducedArticle_detail',
                handler: function(){
                    var selectedData = $('#tweet_magagement').datagrid('getSelected');
                    console.log('selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    $('#dialog_view .iframe').attr('src', selectedData.linkUrl); // 设置预览正文的链接
                    $('#dialog_view').dialog('open'); // 弹出对话框
                }
            }, '-', {
                iconCls: 'icon-my-delete',
                text: '删除',
                id: 'introducedArticle_remove',
                handler: function(){
                    var selectedData = $('#tweet_magagement').datagrid('getSelected');
                    console.log('selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    $.confirm('确定删除该文章').then(function () {
                        TweetManagementApi.remove({articleId: selectedData.id}).then(function (data) {
                            Utils.updateDataGrid($('#tweet_magagement')); // 更新表格数据(组织管理)
                        });
                    });
                }
            }, '-', {
                iconCls: 'icon-my-essence',
                text: '发布精华',
                id: 'introducedArticle_addEssence',
                handler: function(){
                    // 推文类型(1-精华，2-本地)
                    parent.window.zhtj = {
                        type: 1 // 精华
                    };
                    Utils.toggleTab('推文发布', 'view/tweet_management/tweet_publish.html'); // 创建(打开)新面板(推文发布)
                }
            }, '-', {
                iconCls: 'icon-my-local',
                text: '发布本地',
                id: 'introducedArticle_addNative',
                handler: function(){
                    // 推文类型(1-精华，2-本地)
                    parent.window.zhtj = {
                        type: 2 // 本地
                    };
                    Utils.toggleTab('推文发布', 'view/tweet_management/tweet_publish.html'); // 创建(打开)新面板(推文发布)
                }
            }
            ]
        });

        // Utils.showLimitButtons(); // 显示权限按钮
    }

    // 查看对话框(需要初始化的事件)
    function init_dialog() {
        // 新增 -- 对话框
        $('#dialog_view').dialog({
            cache: false,
            onClose: function () {
                $('#fm_view').form('clear'); // 对话框关闭前，清除表单数据
            }
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_dialog(); // 查看对话框(需要初始化的事件)
    }

    init(); // 初始化函数
});