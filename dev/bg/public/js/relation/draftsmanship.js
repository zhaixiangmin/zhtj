/**
 * Created by licong on 2017/9/18.
 */

$(function () {
    var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)
    // 类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部
    if(account_global.type != 5) {
        $.alert('按照系统业务规则，只有团支部才可主动发起团员的组织关系转接业务。您登陆的账号不是团支部账号，不能发起该业务。如有需要，您可联系相关的团支部发起。');
        return;
    }
    var missionBranch_global = undefined; // 所在团支部(全局变量)
    var mids_global = undefined; // 团员id(全局变量)

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

    // 职业名称
    var occupationName = {
        "1": "国有企业职工",
        "2": "非公企业职工",
        "3": "机关事业单位职工",
        "4": "社会组织员工",
        "5": "农民",
        "6": "学生",
        "7": "自由职业者",
        "8": "公办高校教职工",
        "9": "公办中学教职工",
        "10": "公办中职教职工",
        "11": "民办高校教职工",
        "12": "民办中学教职工",
        "13": "民办中职教职工",
        "14": "其他"
    };

    // 审核状态名称
    var auditStatusName = {
        "1": "报到待审核",
        "2": "报到被退回",
        "3": "审核通过",
        "4": "修改资料待审核",
        "5": "修改资料被退回"
    };


    /**
     * 团员禁用提示语
     * @param idCard {string} 身份证号码
     * @returns {string}
     */
    function tipsDisabled(idCard) {
        return '团员<身份证号：' + idCard + '>已被组织设置为离团状态，不能再对其进行该项操作。您可以查看团员资料，或者对团员进行“恢复团籍”后操作。';
    }

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#league_menber').datagrid({
            title: '团员管理',  //表格名称           iconCls: 'icon-edit',  //图标
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'name', title :'姓名', sortable: false},
                {field: 'mobile', title :'手机号码', sortable: false},
                {field: 'degreeOfEducation', title:'全日制学历', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return degreeOfEducationName[value];
                    }
                }},
                {field: 'occupation', title:'职业', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return occupationName[value];
                    }
                }},
                {field: 'auditStatus', title:'报到资料状态', sortable: false, formatter: function(value, row, index){
                    if (value){
                        return auditStatusName[value];
                    }
                }, styler: function(value,row,index){
                    if (value && (value == 1 || value == 4)){ // 报到待审核、修改资料待审核
                        return {class: 'warning'};
                    }
                }},
                // {field: 'politicalOutlook', title:'政治面貌', sortable: false, formatter: function(value, row, index){
                //     if (value){
                //         return politicalOutlookName[value];
                //     }
                // }},
                {field: 'fullName', title:'所在团支部', sortable: false}
            ]],
            loader: function (param, success, error) {
                // 组织转接发起转接列表
                RelationApi.draftsmanshipList({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    name: param.name // 团员姓名
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#league_menber').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        console.log('curr', curr);
                        $('#league_menber').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
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
            ]],
            toolbar: [{
                iconCls: 'icon-my-draftsmanship',
                text: '申请转出团员',
                id: 'league_view',
                handler: function(){
                    // var selectedData = $('#league_menber').datagrid('getSelected');
                    var checkedList = $('#league_menber').datagrid('getChecked'); // 返回复选框选中的所有行
                    console.log('checkedList', checkedList);
                    if(!checkedList || checkedList.length <= 0) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    var midList = [];
                    var html = '';
                    for(var i=0; i<checkedList.length; i++) {
                        midList.push(checkedList[i].mid);
                        // // 不是 审核通过/修改资料被退回
                        // if(checkedList[i].auditStatus != 3 && checkedList[i].auditStatus != 5) {
                        //     $.alert(checkedList[i].name + '团员处于' + auditStatusName[checkedList[i].auditStatus] + '状态，不能申请转出团员');
                        //     return;
                        // }
                        // 团员禁用 不能再进行任何涉及数据修改的操作
                        if(checkedList[i].disabled == 1) { // 是否禁用 -- 0:正常,1:禁用
                            $.alert(tipsDisabled(checkedList[i].idCard));
                            return;
                        }
                        if(i == checkedList.length - 1) { // 最后一条记录
                            html += '<a data-mid="' + checkedList[i].mid + '">' + checkedList[i].name + '</a> ' + checkedList.length;
                        }else {
                            html += '<a data-mid="' + checkedList[i].mid + '">' + checkedList[i].name + '</a>、';
                        }
                    }
                    mids_global = midList.join(','); // 团员id(全局变量)
                    console.log('mids_global', mids_global);
                    $('#dialog .member_list_box .member_list').html(html);

                    // 批量检查团员是否满足转接要求
                    RelationApi.batchCheckMembers({mids: mids_global, type: 1}).then(function (data) {
                        console.log('data', data);
                        $('#dialog').dialog('open'); // 弹出对话框
                    });

                }
            }]
        });
    }

    // 点击'团员姓名'(跳转到团员详情页面)
    $('.member_list_box .member_list').on('click', 'a', function () {
        var mid = $(this).data('mid');
        parent.window.zhtj = {
            mid: mid // 团员id
        };
        Utils.toggleTab('团员详情', 'view/league_menber/league_menber_detail.html'); // 创建(打开)新面板(团员详情)
    });

    // 点击单选框
    $('.checkbox').click(function () {
        var name = $(this).data('name');
        var id = $(this).data('id');
        $('.checkbox[data-name=' + name + ']').removeClass('active');
        $(this).addClass('active');
        if(name == 'address') { // 地址(省内/非共青团广东省委所辖的团组织)
            if(id == 1) { // 省内
                $('.province_outside').hide(); // 隐藏 学习/工作单位地点
                $('#oid').show();
                $('.studyWorkUnitTips').parents('tr').hide(); // 隐藏 学习/工作单位 提示语
            }else if(id == 2) { // 非共青团广东省委所辖的团组织
                $.alert('转出至非共青团广东省委所辖的团组织的团员将不能再进入智慧团建系统，请谨慎操作，团省委会定期核查。');
                $('#oid').hide();
                $('.province_outside').show(); // 显示 学习/工作单位地点
                $('.studyWorkUnitTips').parents('tr').hide(); // 隐藏 学习/工作单位 提示语
            }else if(id == 3) { // 退回原籍
                $.alert('请确保谨慎操作。请同时注明团员户籍所在地详细地址，具体到村/社区，否则将被退回！');
                $('#oid').hide();
                $('.province_outside').hide(); // 隐藏 学习/工作单位地点
                $('.studyWorkUnitTips').parents('tr').show(); // 显示 学习/工作单位 提示语
            }
        }
        if(name == 'reason') { // 理由
            if(id == 3) { // 其他原因
                $('#reason').show();
                window.location.href = "#reason"; // 跳到指定锚点(理由)
            }else {
                $('#reason').hide();
            }
        }
    });

    // 数据筛选(需要初始化的事件)
    function init_datafilter() {
        // 点击查询按钮 -- 数据筛选
        $('#filter').click(function () {
            var params = {
                name: $('#name_filter').val().trim() // 团员姓名
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#league_menber').datagrid('load', params);
        });
    }

    // 申请转出团员(需要初始化的事件)
    function init_transfer() {
        var isClick = false; // 是否点击(false：未点击，true：已点击)
        // 审核 -- 对话框
        // 申请转出团员 -- 对话框
        $('#dialog').dialog({
            // modal: true,
            // closed: true,
            // closable: false,
            cache: false,
            onClose: function () {
                $('#fm').form('clear'); // 对话框关闭前，清除表单数据
                $('.checkbox').removeClass('active'); // 取消勾选单选框
                missionBranch_global = undefined; // 初始化所在团支部 -- 所在团支部(全局变量)

                $('#studyWorkUnit').val(''); // 初始化 学习/工作单位
                $('#provinceDid').combobox('setValue', ''); // 省份ID
                $('#cityDid').combobox('setValue', ''); // 市级ID
                $('#countyDid').combobox('setValue', ''); // 县级ID
                $('.province_outside').hide(); // 隐藏 学习/工作单位地点
                $('.studyWorkUnitTips').parents('tr').hide(); // 隐藏 学习/工作单位 提示语

                $('#reason').val('').hide(); // 初始化 原因
            },
            buttons: [{
                text:'取消',
                // iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                // iconCls:'icon-ok',
                handler:function(){

                    var params = {
                        newOid: missionBranch_global, // 新组织
                        headfor: $('label[data-name="address"].active').data('id'), // 转往（１：省内，２：非共青团广东省委所辖的团组织, 3：退回原籍）
                        cause: $('label[data-name="reason"].active').data('id'), // 接转原因（1:就业/工作调动，２：升学/转学，３：其他原因）
                        causeOthers: $('#reason').val(), // 其他原因(cause=3填写其他原因)
                        applicantType: 1, // 申请人类型(1:组织，２团员)
                        mids: mids_global, // 团员id
                        studyWorkUnit: $('#studyWorkUnit').val().trim(), // 学习/工作单位
                        provinceDid: $('#provinceDid').combobox('getValue'), // 省份ID
                        cityDid: $('#cityDid').combobox('getValue'), // 市级ID
                        countyDid: $('#countyDid').combobox('getValue') // 县级ID
                    };
                    console.log('RelationApi.applyAdd params', params);

                    if(!params.headfor) {
                        window.location.href = '#organization_anchor'; // 滚动到转出组织 位置
                        $.alert('请选择转出组织');
                        return;
                    }
                    if(params.headfor == 1 && !params.newOid) { // 省内
                        window.location.href = '#oid'; // 滚动到团支部 位置
                        $.alert('请选择团支部');
                        return;
                    }
                    if(params.headfor == 2) { // 非共青团广东省委所辖的团组织
                        // params.newOid = undefined; // 非共青团广东省委所辖的团组织 不用选择组织
                        if(!params.provinceDid || !params.cityDid || !params.countyDid) {
                            window.location.href = '#provinceDid'; // 滚动到学习/工作单位 位置
                            $.alert('请选择学习/工作单位地点');
                            return;
                        }
                    }
                    if(!params.studyWorkUnit) {
                        window.location.href = '#studyWorkUnit'; // 滚动到学习/工作单位 位置
                        $.alert('请输入学习/工作单位');
                        return;
                    }
                    if(!params.cause) {
                        window.location.href = '#reason_anchor'; // 滚动到转出原因 位置
                        $.alert('请选择转出原因');
                        return;
                    }
                    if(params.cause == 3) { // 其他原因
                        if(!params.causeOthers) {
                            window.location.href = '#reason'; // 滚动到原因 位置
                            $.alert('请填写原因');
                            return;
                        }else if(params.causeOthers.getRealLen() < 10) {
                            window.location.href = '#reason'; // 滚动到原因 位置
                            $.alert('原因至少10个字符');
                            return;
                        }
                    }else { // 1:就业/工作调动，２：升学/转学
                        params.causeOthers = undefined; // 不用填写原因
                    }

                    console.log('提交成功', params);

                    if(isClick) { // 已点击
                        return;
                    }
                    isClick = true; // 设置为 已点击
                    $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 0.5});

                    // 批量检查团员是否满足转接要求
                    RelationApi.batchCheckMembers({mids: mids_global, type: 1}).then(function (data) {

                        // 批量申请团员转接
                        RelationApi.batchApply(params).then(function (data) {
                            $('#dialog').dialog('close'); // 关闭对话框
                            // $.alert(data.msg).then(function () {
                            var alert_img = '团支部发起后，需要团员本人在“广东青年之声”公众号中点击确认，方可流转到上级团委审核。信息如下图所示：<div style="text-align: center;" class="alert_img_box"><img style="display: inline;width: 90%;cursor: pointer;" src="../../public/img/transation_tips.png" class="alert_img" /></div>';
                            $.alert(data.msg + alert_img).then(function () {
                                Utils.updateDataGrid($('#league_menber')); // 更新表格数据(组织管理)
                            });
                        }).always(function () {
                            isClick = false; // 设置为 未点击
                            $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                        });
                        
                    }, function () {
                        isClick = false; // 设置为 未点击
                        $('#dialog .dialog-button .l-btn:last-child .l-btn-left .l-btn-text').css({opacity: 1});
                    });

                }
            }]
        });

        // 获取省份列表
        $('#provinceDid').combobox({
            valueField: 'did',
            textField: 'districtName',
            width: 300,
            loader: function (param,success, error) {
                // 获取省级数据
                RelationApi.getDistrictByLevel({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取省份列表');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            },
            onSelect: function (record) {
                // 根据省级ID查询市级/市级ID查询县级 -- 加载市级
                RelationApi.getDistrictByPid({did: record.did}).then(function (data) {
                    $('#cityDid').combobox('loadData', data.rows); // 加载城市列表数据
                    if(data.rows[0]) {
                        var cityId = data.rows[0].did; // 市级ID
                        $('#cityDid').combobox('setValue', cityId); // 默认选中列表的第一个

                        // 根据省级ID查询市级/市级ID查询县级 -- 加载县级(区级)
                        RelationApi.getDistrictByPid({did: cityId}).then(function (data) {
                            $('#countyDid').combobox('loadData', data.rows); // 加载县级/区级列表数据
                            if(data.rows[0]) {
                                $('#countyDid').combobox('setValue', data.rows[0].did); // 默认选中列表的第一个
                            }
                        });

                    }
                });

            }
        });

        // 根据省级ID查询市级/市级ID查询县级
        $('#cityDid').combobox({
            valueField: 'did',
            textField: 'districtName',
            width: 300,
            onSelect: function (record) {
                // 根据省级ID查询市级/市级ID查询县级 -- 加载县级(区级)
                RelationApi.getDistrictByPid({did: record.did}).then(function (data) {
                    $('#countyDid').combobox('loadData', data.rows); // 加载县级/区级列表数据
                    if(data.rows[0]) {
                        $('#countyDid').combobox('setValue', data.rows[0].did); // 默认选中列表的第一个
                    }
                });
            }
        });

        // 根据省级ID查询市级/市级ID查询县级 -- 加载县级(区级)
        $('#countyDid').combobox({
            valueField: 'did',
            textField: 'districtName',
            width: 300,
        });

        // 警告框图片 -- 点击事件
        $('body').on('click', '.alert_img_box img', function () {
            var imgUrl = $(this).attr('src');
            if(!imgUrl) {
                $.alert('图片为空');
                return;
            }

            $('.maskBox img').attr('src', imgUrl); // 设置 图片
            $('.maskBox').show(); // 显示 大图
        });
    }


    // 选择团支部(需要初始化的事件)
    function init_missionBranch() {
        // 初始化数据网格
        $('#datagrid_missionBranch').datagrid({
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'fullName', title: '团支部', sortable: false}
            ]],
            loader: function (param, success, error) {
                if(!param || !('fullName' in param)) {
                    return;
                }

                // 根据组织名称获取团支部组织
                RelationApi.getOrgByName({
                    page: param.page, // 当前页码
                    rows: param.rows, // 每页记录数
                    fullName: param.fullName // 组织名称
                }).then(function (data) {
                    if(data.rows && data.rows.length <= 0) {
                        var options = $('#datagrid_missionBranch').datagrid('getPager').data("pagination").options;
                        var curr = options.pageNumber; // 获取当前页
                        if(curr == 1) { // 页数为第一页，不用弹出框('当前页是最后一页')
                            success(data);
                            error();
                            return false;
                        }
                        $.alert('当前页是最后一页');
                        console.log('curr', curr);
                        $('#datagrid_missionBranch').datagrid({pageNumber: curr-1}); // 返回上一页(最后一页)
                        error();
                        return false;
                    }
                    success(data);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败时，加载信息会一直显示在页面上
                }).always(function () {
                    $('#dialog_missionBranch').dialog('open'); // 弹出对话框
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
            onClickRow: function (rowIndex, rowData) {
                console.log('rowData', rowData);
                if(rowData.fullName.indexOf('退回原籍团支部') != -1) {
                    $.alert('您好，若要退回原籍团支部，请退出，重新选择转接类型为“退回原籍”，谢谢。');
                    return;
                }

                if(rowData.fullName.indexOf('非共青团广东省委所辖的团组织') != -1) {
                    $.alert('您好，暂不支持转去广东省外单位等非团广东省委所辖组织，谢谢。');
                    return;
                }

                missionBranch_global = rowData.oid; // 所在团支部(全局变量)
                $('#oid').find('input').val(rowData.fullName); // 渲染所在团支部(新增/编辑团干弹出框)
                $('#dialog_missionBranch').dialog('close'); // 关闭对话框(所在团支部)
            }
        });

        // 点击 搜索(所在团支部)
        $('#filter_missionBranch').click(function () {
            var params = {
                fullName: $('#fullName_filter_missionBranch').val() // 所在团支部
            };

            // 分页插件自动传递 page页码和rows页大小
            $('#datagrid_missionBranch').datagrid('load', params);
        });


        // 点击 '所在团支部'
        $('#oid').click(function () {
            // 加载'所在团支部' 数据网格
            $('#datagrid_missionBranch').datagrid('load', {
                fullName: ''
            });
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选(需要初始化的事件)
        init_transfer(); // 申请转出团员(需要初始化的事件)
        init_missionBranch(); // 选择团支部(需要初始化的事件)
    }

    init(); // 初始化函数 
});