/**
 * Created by licong on 2018/02/12.
 */
$(function () {
    var gytpid = Utils.getQueryString('gytpid'); // 南粤人才ID
    if(!gytpid) {
        $.alert('参数不能为空');
        return;
    }

    var optionList_global = ['name', 'sex', 'idCard', 'nation', 'nationInfo', 'politicalOutlook', 'degreeOfEducation', 'occupation', 'tuanganProperties', 'oid', 'isPartyCommitteeMember', 'learningUnit', 'professionalTechnicalQualification'
        , 'mobile', 'email', 'qqNum', 'wechatId', 'weibo', 'incumbent', 'incumbentDesc', 'xzzny', 'dutyStyle']; // 参数列表(全局变量)

    // 是否
    var yesOrNoName = {
        '1': '是',
        '2': '否'
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

    // 在本支部担任团干职务名称
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

    // 团干部性质名称
    var tuanganPropertiesName = {
        '1': '专职',
        '2': '兼职',
        '3': '挂职'
    };

    // 性别名称
    var sexName = {
        '1': '男',
        '2': '女'
    };

    var params_reward_global =  { // 奖励参数(全局变量)
        talentPoolId: gytpid, // 南粤人才ID
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: 2 // 每页记录数(可不传，默认为10)
    };
    var params_workResume_global =  { // 工作履历参数(全局变量)
        talentPoolId: gytpid, // 南粤人才ID
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: 2 // 每页记录数(可不传，默认为10)
    };


    // 根据南粤青年人才ID获取详情
    TalentApi.getGdYouthTalentPoolsById({gytpid: gytpid}).then(function (data) {
        var info = data.rows; // 基本信息
        var text = '';
        // 基本信息显示列表(全局变量)
        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];
            if(!info[option] && option != 'xzzny') { // 信息为空时，隐藏该字段(任现职年月 除外)
                $('#' + option).parents('.info_item').hide(); // 隐藏 字段
                continue;
            }

            if(option == 'sex') { // 性别
                text = sexName[info[option]];
            }else if(option == 'nation') { // 民族
                text = nationName[info[option]];
            } else if (option == 'nationInfo') { // 民族信息
                text = info[option];
                if(info['nation'] != 57) { // 民族不为其他(隐藏民族信息)
                    continue;
                }
            }else if(option == 'politicalOutlook') { // 政治面貌
                text = politicalOutlookName[info[option]];
            }else if(option == 'degreeOfEducation') { // 全日制学历
                text = degreeOfEducationName[info[option]];
            }else if(option == 'occupation') { // 职业
                text = occupationName[info[option]];
            }else if(option == 'tuanganProperties') { // 团干部性质
                text = tuanganPropertiesName[info[option]];
            }else if(option == 'isPartyCommitteeMember') { // 是否同级党委（支部）成员
                text = yesOrNoName[info[option]];
            }else if (option == 'oid') { // 所在团支部
                text = info['fullName'];
            }else if (option == 'xzzny') { // 任现职年月
                text = info['dateOfDuty'];
                if(!text) {
                    $('#' + option).parents('.info_item').hide(); // 隐藏 字段
                    continue;
                }
            }else if(option == 'incumbent') { // 团内现任职务
                text = incumbentName[info[option]];
            }
            else if (option == 'incumbentDesc') { // 职务名称
                text = info[option];
                if(info['incumbent'] != 9) { // 团内现任职务不为其他(隐藏职务名称)
                    continue;
                }
            }
            else{
                // 姓名/身份证号/学习工作单位/专业技术资格/手机号码/电子邮箱/QQ/微信号/微博号/任现职方式
                text = info[option];
            }

            $('#' + option).text(text); // 渲染字段值
        }
    });

    // 切换标签页 -- 'TA的报到资料/TA的奖惩信息'
    $('.tab_box .tab_item').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.big_block').eq($(this).index()).show().siblings('.big_block').hide();
    });


    /**
     * 渲染奖励列表
     * @param operateApi {function} 接口函数
     * @param operateParams {object} 参数
     * @param $selector {jquery对象} 选择器
     */
    function renderAwardsList(operateApi, operateParams, $selector) {
        if ($selector.find('.table_list_block').find('.load-more').length > 0) { // 存在'加载更多'(这位置)
            $selector.find('.table_list_block').find('.load-more').remove(); // 删除'加载更多'
        }
        operateApi(operateParams).then(function (data) {
            var list = data.dataList;
            if (!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                var html_none = '';
                html_none += '<ul class="info_list">';
                html_none += '    <li class="info_item on_info clearfix">';
                html_none += '        <span class="info_item_title">暂无奖励信息</span>';
                html_none += '    </li>';
                html_none += '</ul>';
                $selector.html(html_none);
                return;
            }
    
            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                var levelName = item.levelName ? item.levelName : '无'; // 奖励名次/等次(空：无等次)
                html += '<ul class="table_list" data-id="' + item.id + '">';
                html += '   <li class="table_box content" data-hasLevel="' + item.hasLevel + '">';
                html += '       <span class="left">奖励名称</span><span class="right">' + item.content + '</span>';
                html += '   </li>';
                html += '   <li class="table_box levelName">';
                html += '       <span class="left">获奖名次</span><span class="right">' + levelName + '</span>';
                html += '   </li>';
                html += '   <li class="table_box">';
                if(item.hasAttachFile) { // 有附件
                    html += '        <span class="left">证明附件</span><span class="right attachment c_blue">查看</span>';
                }else { // 无附件
                    html += '        <span class="left">证明附件</span><span class="right">无</span>';
                }
                html += '    </li>';
                html += '    <li class="table_box">';
                html += '        <span class="left">获奖时间</span><span class="right">' + item.rewardTime + '</span>';
                html += '    </li>';
                // if(item.status == 2) { // 被退回 -- 奖励状态(0-待审核，1-审核通过，2-被退回，3-暂无奖励(已删除))
                //     html += '    <li class="table_box">';
                //     html += '        <span class="left">退回原因</span><span class="right">' + item.returnReason + '</span>';
                //     html += '    </li>';
                //     html += '    <li class="button_box">';
                //     html += '        <div class="button_block clearfix">';
                //     html += '            <span class="left button">修改</span><span class="right button">删除</span>';
                //     html += '        </div>';
                //     html += '    </li>';
                // }
                html += '</ul>';
            }
    
            if (operateParams.pageIndex == 1) {
                $selector.find('.table_list_block').html(html);
            } else {
                $selector.find('.table_list_block').append(html);
            }
    
            if (list.length >= operateParams.pageSize) { // 也许有下一页
                $selector.find('.table_list_block').append('<li class="load-more" style="text-align: center;font-size: 0.24rem;">加载更多</li>');
            } else { // 加载完毕
                if (operateParams.pageIndex > 1) { // 不是第一页
                    $selector.find('.table_list_block').append('<li class="load-more" style="text-align: center;font-size: 0.24rem;">全部加载完成</li>');
                }
            }
            operateParams.pageIndex++;
        });
    }
    
    /**
     * 渲染工作履历列表
     * @param operateApi {function} 接口函数
     * @param operateParams {object} 参数
     * @param $selector {jquery对象} 选择器
     */
    function renderWorkResumeList(operateApi, operateParams, $selector) {
        if ($selector.find('.table_list_block').find('.load-more').length > 0) { // 存在'加载更多'(这位置)
            $selector.find('.table_list_block').find('.load-more').remove(); // 删除'加载更多'
        }
        operateApi(operateParams).then(function (data) {
            var list = data.dataList;
            if (!list || (list.length <= 0 && operateParams.pageIndex == 1)) { // 返回不正确/第一页无数据
                var html_none = '';
                html_none += '<ul class="info_list">';
                html_none += '    <li class="info_item on_info clearfix">';
                html_none += '        <span class="info_item_title">暂无工作履历信息</span>';
                html_none += '    </li>';
                html_none += '</ul>';
                $selector.html(html_none);
                return;
            }
    
            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                html += '   <ul class="table_list">';
                html += '       <li class="table_box">';
                html += '           <span class="left">工作单位</span><span class="right">' + item.workUnit + '</span>';
                html += '       </li>';
                html += '       <li class="table_box">';
                html += '           <span class="left">单位职务</span><span class="right">' + item.unitDuty + '</span>';
                html += '       </li>';
                html += '       <li class="table_box">';
                html += '           <span class="left">任职时间</span><span class="right">' + item.tenureTime + '</span>';
                html += '       </li>';
                html += '   </ul>';
            }
    
            if (operateParams.pageIndex == 1) {
                $selector.find('.table_list_block').html(html);
            } else {
                $selector.find('.table_list_block').append(html);
            }
    
            if (list.length >= operateParams.pageSize) { // 也许有下一页
                $selector.find('.table_list_block').append('<li class="load-more" style="text-align: center;font-size: 0.24rem;">加载更多</li>');
            } else { // 加载完毕
                if (operateParams.pageIndex > 1) { // 不是第一页
                    $selector.find('.table_list_block').append('<li class="load-more" style="text-align: center;font-size: 0.24rem;">全部加载完成</li>');
                }
            }
            operateParams.pageIndex++;
        });
    }
    
    // 点击'加载更多'
    $('.info_box').on('click', '.load-more', function () {
        var idName = $(this).parents('.info_box').attr('id');
        var text = $(this).text(); // 文字
        if(text == '加载更多') {
            if(idName == 'reward') { // 奖励
                // 获取单个南粤青年的奖励信息列表
                renderAwardsList(TalentApi.rewardListByTalent, params_reward_global, $('#reward')); // 渲染奖励列表
            }
            else { // 工作履历
                // 获取单个南粤青年的工作履历列表
                renderWorkResumeList(TalentApi.workResumeListByTalent, params_workResume_global, $('#workResume')); // 渲染工作履历列表
            }
        }
    });

    // 获取单个南粤青年的奖励信息列表
    renderAwardsList(TalentApi.rewardListByTalent, params_reward_global, $('#reward')); // 渲染奖励列表

    // 获取单个南粤青年的工作履历列表
    renderWorkResumeList(TalentApi.workResumeListByTalent, params_workResume_global, $('#workResume')); // 渲染工作履历列表
    
    
    
    // 点击 '查看'(附件)
    $('.info_box').on('click', '.attachment', function () {
        var id = $(this).parents('.table_list').data('id'); // 奖励ID

        var params = {
            objectId: id, // 附件所属对象ID（奖励ID/惩罚ID等）
            module: 4 // 所属模块 -- 附件所属模块(1-团员奖励附件，2-团员惩罚附件，3-公告附件，4-南粤青年人才奖励附件)
        };
        // 奖惩证明附件列表查看
        TalentApi.attachFileList(params).then(function (data) {
           var imgUrlArr = data.rows;
            var autoPlay = imgUrlArr.length > 1 ? true : false;
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
            TouchSlide({ slideCell:"#bannerBox", effect: "leftLoop", delayTime: 300, interTime: 3000 });
        });
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
    
});