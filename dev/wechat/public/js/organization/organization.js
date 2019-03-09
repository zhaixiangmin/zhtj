/**
 * Created by licong on 2017/10/31.
 */
$(function () {
    // 参数列表
    var optionList_global = ['fullName', 'name', 'enterpriseName',  'type', 'industryCategory', 'mobile', 'email','agedNumber', 'theAnnualTuiyouPartyMembersNum', 'parentName']; // 保留团籍的党员数

    // 组织类别名称
    var typeName = {
        '1': '领导机关团组织',
        '2': '基层团委',
        '3': '团工委',
        '4': '团总支',
        '5': '团支部'
    };

    // 单位所属行业类别名称
    var industryCategoryName = {
        "1": "党政机关",
        "2": "事业单位（不含公立学校）",
        "3": "普通高等院校",
        "4": "职业教育学校",
        "5": "普通高中",
        "6": "初中",
        "7": "小学",
        "8": "国有企业",
        "9": "集体企业",
        "10": "非公企业",
        "11": "新社会组织（不含民办学校）",
        "12": "军队",
        "13": "武警",
        "14": "城市社区",
        "15": "农村",
        "16": "其他"
    };

    // 我的组织
    OrganizationApi.MyOrganization({}).then(function (data) {
        var organization = data.rows;
        for(var i=0; i<optionList_global.length; i++) {
            var option = optionList_global[i];
            if(organization[option] == null) { // 避免显示null --> ''
                organization[option] = '';
            }

            if(option == 'type') {
                $('#' + option).text(typeName[organization[option]]); // 组织类别
                continue;
            }
            if(option == 'industryCategory') {
                $('#' + option).text(industryCategoryName[organization[option]]); // 单位所属行业类别
                continue;
            }
            $('#' + option).text(organization[option]);
        }

    });
});