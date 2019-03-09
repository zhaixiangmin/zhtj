/**
 * Created by licong on 2017/9/18.
 */

$(function () {
    var mid_global = undefined; // 团员ID(全局变量)

    if(parent.window.zhtj && parent.window.zhtj.mid) {
        mid_global = parent.window.zhtj.mid;
        delete parent.window.zhtj; // 删除对象
        console.log('parent.window.zhtj', parent.window.zhtj);

        var params_rewardIn_global =  { // 奖励参数(团内，全局变量)
            type: 1, // 奖励类型(1-团内奖励，2-团外奖励)
            pageIndex: 1, // 当前页码(可不传，默认为1)
            pageSize: 2 // 每页记录数(可不传，默认为10)
        };
        var params_rewardOut_global =  { // 奖励参数(团外，全局变量)
            type: 2, // 奖励类型(1-团内奖励，2-团外奖励)
            pageIndex: 1, // 当前页码(可不传，默认为1)
            pageSize: 2 // 每页记录数(可不传，默认为10)
        };
        var params_punishment_global =  { // 惩罚参数(团外，全局变量)
            pageIndex: 1, // 当前页码(可不传，默认为1)
            pageSize: 2 // 每页记录数(可不传，默认为10)
        };

        // 基本信息 列表(全局变量)
        var baseList_global = ['name', 'idCardType', 'idCard', 'isRealName', 'leagueForYears', 'fullName', 'income', 'isCadres', 'incumbent', 'dateOfDuty', 'tuanganProperties', 'isPartyCommitteeMember', 'nation', 'politicalOutlook', 'degreeOfEducation', 'highestEducation', 'residence', 'mobile', 'leagueForUnit'];

        // 附加信息 列表(全局变量)
        var additionList_global = ['occupation', 'learningUnit', 'email', 'qqNum', 'wechatId', 'weibo', 'developmentMemberNumber', 'thePartyYears', 'signUpForVolunteerTime'];

        var paramsName = {
            'name': '姓名',
            'idCardType': '证件类型',
            'idCard': '身份证号',
            'isRealName': '实名认证状态',
            'leagueForYears': '入团年月',
            'fullName': '所在团支部',
            'income': '收入',
            'isCadres': '是否团干部',
            'incumbent': '团内现任职务',
            'dateOfDuty': '任现职年月',
            'tuanganProperties': '团干部性质',
            'isPartyCommitteeMember': '是否同级党委（支部）成员',
            'nation': '民族',
            'politicalOutlook': '政治面貌',
            'degreeOfEducation': '全日制学历',
            'highestEducation': '最高学历',
            'residence': '户籍所在地',
            'mobile': '手机号码',
            'leagueForUnit': '团员编号',
            'occupation': '职业',
            'learningUnit': '学习工作单位',
            'email': '电子邮箱',
            'qqNum': 'QQ',
            'wechatId': '微信号',
            'weibo': '微博号',
            'developmentMemberNumber': '团员编号',
            'thePartyYears': '入党年月',
            'signUpForVolunteerTime': '注册志愿者时间',

            'type': '奖励类型',
            'content': '奖励名称',
            'levelName': '获奖名次',
            'rewardTime': '获奖时间',
            'awardOrg': '授奖组织',
            'recorderName': '录入者',
            'hasAttachFile': '证明附件'
        };

        // 是否
        var yesOrNoName = {
            '1': '是',
            '2': '否'
        };

        // 团内现任职务名称
        var incumbentName = {
            '1': '书记',
            '2': '副书记',
            '3': '组织委员',
            '4': '宣传委员',
            '5': '文体委员',
            '6': '生产委员',
            '7': '权益委员',
            '8': '志愿委员',
            '9': '其他'
        };

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

        // 民族名称
        var nationName = {
            '1': '汉族',
            '2': '壮族',
            '3': '满族',
            '4': '回族',
            '5': '苗族',
            '6': '维吾尔族',
            '7': '土家族',
            '8': '彝族',
            '9': '蒙古族',
            '10': '藏族',
            '11': '布依族',
            '12': '侗族',
            '13': '瑶族',
            '14': '朝鲜族',
            '15': '白族',
            '16': '哈呢族',
            '17': '哈萨克族',
            '18': '黎族',
            '19': '傣族',
            '20': '畲族',
            '21': '僳僳族',
            '22': '仡佬族',
            '23': '东乡族',
            '24': '拉祜族',
            '25': '水族',
            '26': '佤族',
            '27': '纳西族',
            '28': '羌族',
            '29': '土族',
            '30': '仫佬族',
            '31': '锡伯族',
            '32': '柯尔克孜族',
            '33': '达斡尔族',
            '34': '景颇族',
            '35': '毛南族',
            '36': '撒拉族',
            '37': '布朗族',
            '38': '塔吉克族',
            '39': '阿昌族',
            '40': '普米族',
            '41': '鄂温克族',
            '42': '怒族',
            '43': '京族',
            '44': '基诺族',
            '45': '德昂族',
            '46': '保安族',
            '47': '俄罗斯族',
            '48': '裕固族',
            '49': '乌孜别克族',
            '50': '门巴族',
            '51': '鄂伦春族',
            '52': '独龙族',
            '53': '塔塔尔族',
            '54': '赫哲族',
            '55': '高山族',
            '56': '珞巴族',
            '57': '其他'
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

        // 政治面貌名称
        var politicalOutlookName ={
            "1": "团员",
            "2": "党员",
            "3": "中共预备党员"
        };

        // 团干部性质名称
        var tuanganPropertiesName = {
            '1': '专职',
            '2': '兼职',
            '3': '挂职'
        };

        // 实名认证名称
        var isRealName = {
            '10': '通过', // 通过
            '1': '校验中', // 银行未通过
            '2': '校验失败', // 阿里云未通过
            '3': '线下验证通过', // 线下验证通过
            '4': '校验中' // 银行定时未通过
        };

        // 证件类型名称
        var idCardTypeName = {
            '1': '普通居民身份证',
            '2': '境外身份证'
        };

        /**
         * 渲染奖励列表
         * @param operateApi {function} 接口函数
         * @param operateParams {object} 参数
         * @param $selector {jquery对象} 选择器
         * @param isOperate {boolean} 是否可操作 -- 编辑/删除(true：可操作，false：不可操作)
         */
        function renderAwardsList_operation(operateApi, operateParams, $selector, isOperate) {
            operateParams.memberId = mid_global; // 团员ID(全局变量)
            operateApi(operateParams).then(function (data) {
                // html += '<div class="table_list_block">';
                var list = data.dataList;
                if(!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                    $selector.hide(); // 隐藏 奖惩
                    return;
                }

                $selector.show(); // 显示奖惩
                var html = '';
                for(var i=0; i<list.length; i++) {
                    var item = list[i];
                    var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
                    html += '   <ul class="item_list" data-id="' + item.id + '">';
                    // html += '       <div class="item">';
                    // html += '           <span class="title">奖励类型</span><span class="describe">团外奖励</span>';
                    // html += '       </div>';
                    html += '       <div class="item" data-hasLevel="' + item.hasLevel + '">';
                    html += '           <span class="title">奖励名称</span><span class="describe">' + item.content + '</span>';
                    html += '       </div>';
                    html += '       <div class="item levelName">';
                    html += '           <span class="title">获奖名次</span><span class="describe">' + levelName + '</span>';
                    html += '       </div>';
                    html += '       <div class="item">';
                    if(item.hasAttachFile) { // 有附件
                        html += '           <span class="title">证明附件</span><span class="describe attachment c_blue">查看</span>';
                    }else { // 无附件
                        html += '           <span class="title">证明附件</span><span class="describe">无</span>';
                    }
                    html += '       </div>';
                    html += '       <div class="item">';
                    html += '           <span class="title">获奖时间</span><span class="describe">' + item.rewardTime + '</span>';
                    html += '       </div>';
                    if(item.type == 1) { // 团内奖励
                        html += '       <div class="item">';
                        html += '           <span class="title">录入者</span><span class="describe">' + item.recorderName + '</span>';
                        html += '       </div>';
                    }
                    html += '       <div class="item">';
                    html += '           <span class="title">授奖组织</span><span class="describe">' + item.awardOrg + '</span>';
                    html += '       </div>';
                    html += '       <div class="item">';
                    html += '           <span class="title">审核组织</span><span class="describe">' + item.auditOrgName + '</span>';
                    html += '       </div>';
                    html += '       <div class="item">';
                    html += '           <span class="title">奖励状态</span><span class="describe c_red">' + item.statusStr + '</span>';
                    html += '       </div>';
                    if(isOperate) { // 可操作
                        html += '       <div class="item clearfix" style="text-align: center;">';
                        html += '           <span class="button left">修改</span>';
                        html += '           <span class="button right" >删除</span>';
                        html += '       </div>';
                    }

                    html += '   </ul>';
                }
                // html += '</div>';
                if(operateParams.pageIndex == 1) {
                    $selector.find('.content').html(html);
                }else {
                    $selector.find('.content').append(html);
                }

                if(list.length >= operateParams.pageSize) { // 也许有下一页
                    if($selector.find('.load-more').length <= 0) { // 不存在'加载更多'
                        $selector.append('<div class="load-more" style="text-align: center;cursor: pointer;">加载更多</div>');
                    }
                }else { // 加载完毕
                    if(operateParams.pageIndex > 1) { // 不是第一页
                        $selector.find('.load-more').text('全部加载完成');
                    }
                }
                operateParams.pageIndex++;
            });
        }

        /**
         * 渲染惩罚列表
         * @param operateApi {function} 接口函数
         * @param operateParams {object} 参数
         * @param $selector {jquery对象} 选择器
         * @param isOperate {boolean} 是否可操作 -- 编辑/删除(true：可操作，false：不可操作)
         */
        function renderPunishmentList_operation(operateApi, operateParams, $selector, isOperate) {

            operateParams.memberId = mid_global; // 团员ID(全局变量)
            operateApi(operateParams).then(function (data) {
                var list = data.rows;
                if (!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                    $selector.hide(); // 隐藏 奖惩
                    return;
                }


                $selector.show(); // 显示奖惩
                var html = '';
                for(var i=0; i<list.length; i++) {
                    var item = list[i];
                    var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
                    html += '   <ul class="item_list" data-id="' + item.id + '">';
                    html += '       <div class="item">';
                    html += '           <span class="title">处罚记录</span><span class="describe">' + item.content + '</span>';
                    html += '       </div>';
                    html += '       <div class="item">';
                    if(item.hasAttachFile) { // 有附件
                        html += '           <span class="title">附件</span><span class="describe attachment c_blue">查看</span>';
                    }else { // 无附件
                        html += '           <span class="title">附件</span><span class="describe">无</span>';
                    }
                    html += '       </div>';
                    html += '       <div class="item">';
                    html += '           <span class="title">处罚时间</span><span class="describe">' + item.punishTime + '</span>';
                    html += '       </div>';
                    html += '       <div class="item">';
                    html += '           <span class="title">录入组织</span><span class="describe">' + item.recorderName + '</span>';
                    html += '       </div>';
                    if(isOperate) { // 可操作
                        html += '       <div class="item clearfix" style="text-align: center;">';
                        html += '           <span class="button left">修改</span>';
                        html += '           <span class="button right" >删除</span>';
                        html += '       </div>';
                    }
                    html += '   </ul>';
                }

                if(operateParams.pageIndex == 1) {
                    $selector.find('.content').html(html);
                }else {
                    $selector.find('.content').append(html);
                }

                if(list.length >= operateParams.pageSize) { // 也许有下一页
                    if($selector.find('.load-more').length <= 0) { // 不存在'加载更多'
                        $selector.append('<div class="load-more" style="text-align: center;cursor: pointer;">加载更多</div>');
                    }
                }else { // 加载完毕
                    if(operateParams.pageIndex > 1) { // 不是第一页
                        $selector.find('.load-more').text('全部加载完成');
                    }
                }
                operateParams.pageIndex++;
            });

        }

        /**
         * 渲染团员详情
         */
        function renderMemberDetail() {
            // 根据ID获取团员
            LeagueMemberApi.getMembersById({mid: mid_global}).then(function (data) {
                console.log('MemberApi.getMembersById data', data);
                var myData = data.rows;
                if (!myData) { // 数据为空
                    return;
                }

                var html = '';
                // 基本信息
                for(var i=0; i<baseList_global.length; i++) {
                    var option = baseList_global[i];
                    if(!myData[option] && option != 'residence') { // null，直接返回(避免出现null)
                        continue;
                    }
                    // (团内现任职务/任现职年月/团干部性质/是否同级党委（支部）成员)
                    if(myData['isCadres'] == 2 && (option == 'incumbent' || option == 'dateOfDuty' || option == 'tuanganProperties' || option == 'isPartyCommitteeMember')) { // 否 -- 是否团干部名称(1: 是，2：否)
                        continue;
                    }

                    var text = '';
                    var style = '';
                    if(option == 'idCardType') { // 证件类型
                        if(myData[option]) {
                            text = idCardTypeName[myData[option]];
                        }else { // 无返回值
                            text = idCardTypeName[1]; // 证件类型(默认 普通居民身份证)
                        }
                    }else if (option == 'idCard') { // 身份证
                        if(myData['isRealName'] == 1 || myData['isRealName'] == 2) { // 银行未通过、阿里云未通过
                            text = myData['notHideIdCard']; // 不带星号身份证号
                        }else {
                            text = myData[option]; // 带星号身份证号
                        }
                    }else if (option == 'income') { // 收入
                        text = myData[option + 'Str']; // 设置收入名称
                    }else if (option == 'isRealName') { // 实名认证状态
                        text = isRealName[myData[option]]; // 设置实名认证状态
                        var value = myData[option];
                        if (value == 1 || value == 2 || value == 4){ // 银行未通过、阿里云未通过、银行定时未通过
                            style = 'warning'; // 添加文字样式
                        }
                    }else if (option == 'isCadres') { // 是否团干部
                        text = yesOrNoName[myData[option]]; // 设置是否团干部名称
                    }else if (option == 'incumbent') {
                        text = incumbentName[myData[option]]; // 设置团内现任职务
                        if(myData[option] == 9){ // 其他(团内现任职务)
                            text = incumbentName[myData[option]] + ' ' + myData['incumbentDesc'];
                        }
                    }else if (option == 'tuanganProperties') { // 团干部性质
                        text = tuanganPropertiesName[myData[option]]; // 设置团干部性质名称
                    }else if (option == 'isPartyCommitteeMember') { // 是否同级党委(支部)成员
                        text = yesOrNoName[myData[option]]; // 设置是否同级党委(支部)成员名称
                    }else if (option == 'nation') { // 民族
                        // text = nationName[myData[option]]; // 设置民族名称
                        text = nationName[myData[option]];
                        if(myData[option] == 57) { // 其他(民族)
                            text = nationName[myData[option]] + ' ' + myData['nationInfo']; // 民族 + 民族名称
                        }
                    }else if (option == 'politicalOutlook') { // 政治面貌
                        text = politicalOutlookName[myData[option]]; // 设置政治面貌名称
                    }else if (option == 'degreeOfEducation') { // 全日制学历
                        text = degreeOfEducationName[myData[option]]; // 设置全日制学历名称
                    }else if (option == 'highestEducation') { // 最高学历
                        text = degreeOfEducationName[myData[option]]; // 设置最高学历名称
                    }else if (option == 'residence') { // 户籍所在地
                        text = Utils.returnValidString(myData['provinceName']) + Utils.returnValidString(myData['cityName']) + Utils.returnValidString(myData['countyName']); // 设置户籍所在地名称
                    }else {
                        text = myData[option]; // 姓名/入团年月/所在团支部/任现职年月/手机号码
                    }

                    html += '<div class="item">';
                    html += '    <span class="title">' + paramsName[option] + '：</span><span class="describe ' + style + '">' + text + '</span>';
                    html += '</div>';
                }
                if(!html) {
                    // html = '<div>暂无信息</div>';
                    html += '<div class="item">';
                    html += '    <span class="title">暂无信息</span>';
                    html += '</div>';
                }
                $('#member_detail_box .list_box .list.base .content').html(html);

                var html_addition = '';
                // 附加信息
                for(var i=0; i<additionList_global.length; i++) {
                    var option = additionList_global[i];
                    if (!myData[option]) { // null，直接返回(避免出现null)
                        continue;
                    }

                    var text = '';
                    if(option == 'occupation') { // 职业
                        text = occupationName[myData[option]]; // 设置职业名称
                    }else {
                        text = myData[option]; // 学习工作单位/电子邮箱/QQ/微信号/微博号/团员编号/入党年月/注册志愿者时间
                    }

                    html_addition += '<div class="item">';
                    html_addition += '    <span class="title">' + paramsName[option] + '：</span><span class="describe">' + text + '</span>';
                    html_addition += '</div>';
                }
                if(!html_addition) {
                    // html_addition = '<div>暂无信息</div>';
                    html_addition += '<div class="item">';
                    html_addition += '    <span class="title">暂无信息</span>';
                    html_addition += '</div>';
                }
                $('#member_detail_box .list_box .list.addition .content').html(html_addition);

                var html_img = '';
                // 附件
                var realNameFileUrl = myData.realNameFileUrl;
                if(realNameFileUrl) {
                    var realNameFileUrlList = realNameFileUrl.split(',');
                    for(var i=0; i<realNameFileUrlList.length; i++) {
                        var imgUrl = realNameFileUrlList[i];
                        html_img += '<div class="img_box">';
                        html_img += '    <img src="' + imgUrl + '" title="点击查看大图">';
                        html_img += '</div>';
                    }
                    html_img += '<div class="item" style="clear: both;">';
                    html_img += '    <span class="title">线下实名认证通过理由：</span><span class="describe">' + myData.realNameReason + '</span>';
                    html_img += '</div>';
                    $('#member_detail_box .list_box .list.attachment .content').html(html_img);
                    $('#member_detail_box .list_box .list.attachment').show(); // 显示 附件项
                }else {
                    $('#member_detail_box .list_box .list.attachment').hide(); // 隐藏 附件项
                }

                // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardIn_global, $('#member_detail_box .rewardIn')); // 团内奖励

                // 团组织查看单个团员的奖励信息列表 -- 奖励类型(1-团内奖励，2-团外奖励)
                renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardOut_global, $('#member_detail_box .rewardOut')); // 团外奖励

                // 团组织查看单个团员的惩罚信息列表
                renderPunishmentList_operation(LeagueMemberApi.punishmentList, params_punishment_global, $('#member_detail_box .punishment')); // 惩罚
            });
        }
        renderMemberDetail();

        // 点击'加载更多'
        $('.list_box .list').on('click', '.load-more', function () {
            var text = $(this).text();
            var $list = $(this).parents('.list');
            var isOperation = false; // 是否奖惩修改(true：是，false：不是)
            if($list.hasClass('operation')) {
                isOperation = true;
            }
            if(text == '加载更多') {
                if($list.hasClass('rewardIn')) { // 团内
                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardIn_global, $list, isOperation);
                }else if($list.hasClass('rewardOut')) { // 团外
                    renderAwardsList_operation(LeagueMemberApi.rewardList, params_rewardOut_global, $list, isOperation);
                }else if($list.hasClass('punishment')) { // 惩罚
                    renderPunishmentList_operation(LeagueMemberApi.punishmentList, params_punishment_global, $list, isOperation);
                }
            }
        });

        // 点击'查看'(奖惩附件)
        $('.list').on('click', '.c_blue', function () {
            var id = $(this).parents('.item_list').data('id'); // 奖励ID
            var module = 1; // 团员奖励 -- 附件所属模块(1-团员奖励，2-团员惩罚，3-公告附件，4-南粤青年人才奖励附件)
            if($(this).parents('.list').hasClass('punishment')) { // 惩罚
                module = 2; // 团员惩罚 -- 附件所属模块(1-团员奖励，2-团员惩罚，3-公告附件，4-南粤青年人才奖励附件)
            }
            console.log('id', id);

            var params = {
                objectId: id, // 附件所属对象ID（奖励ID/惩罚ID等）
                module: module // 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚，3-公告附件，4-南粤青年人才奖励附件)
            };
            // 奖惩证明附件列表查看
            LeagueMemberApi.attachFileList(params).then(function (data) {
                var imgUrlArr = data.rows;
                var html_img = '';
                for(var i=0; i<imgUrlArr.length; i++) {
                    var imgUrl = imgUrlArr[i].filePath;
                    html_img += '<div class="img_box"><img src="' + imgUrl + '"></div>';
                }
                $('#dialog_picture .list_box .list').html(html_img);
                $('#dialog_picture').dialog('open'); // 显示弹出框(查看图片)
            });
        });

        // 点击 '附件'(图片)，查看大图
        $('.list.attachment').on('click', '.img_box img', function () {
            var imgUrl = $(this).attr('src');
            if(!imgUrl) {
                $.alert('图片为空');
                return;
            }

            $('.maskBox img').attr('src', imgUrl); // 设置 图片
            $('.maskBox').show(); // 显示 大图
        });

        // 点击大图，关闭图片
        $('.maskBox').click(function () {
            $(this).hide(); // 隐藏 大图
        });
    }

});