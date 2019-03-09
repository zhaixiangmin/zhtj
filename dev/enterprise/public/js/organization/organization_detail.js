/**
 * Created by licong on 2017/11/28.
 */
$(function () {
  var oid = Utils.getQueryString('oid'); // 组织id
  if(!oid) {
    $.alert('参数不能为空');
    return;
  }

  console.log('oid', oid);
  var basicList = ['oid', 'name', 'fullName', 'enterpriseName', 'type', 'parentName', 'industryCategory', 'administrativeOmpilation', 'administrativeNumber', 'careerFormation', 'serviceNumber','email', 'mobile', 'username'];
  var additionList_leader = ['secretaryName', 'groupOrganizationCode', 'groupOrganizationWechatid', 'groupOrganizationWeibo']; // 附加信息(领导机关)
  var additionList_other = ['agedNumber', 'theAnnualTuiyouPartyMembersNum']; // 附加信息(其它)

  // 组织类型 名称
  var typeName = {
    '1':'领导机关团组织',
    '2': '团委',
    '3': '团工委',
    '4': '团总支',
    '5': '团支部'
  };

  // 单位所属行业类别 名称
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

  // 根据组织ID获取组织
  OrganizationApi.getOrgByOid({oid: oid}).then(function (data) {
    console.log('OrganizationApi.getOrgByOid data', data);
    var myData = data.rows;
    if(myData) {
      // 基本信息/账号信息
      for(var i=0; i<basicList.length; i++) {
        var option = basicList[i];

        if(!myData[option]) { // null 直接返回
          continue;
        }

        if(option == 'type') { // 组织类型
          $('#' + option).text(typeName[myData[option]]);
          // var additionList = additionList_leader; // 领导机关列表
          var additionList = undefined;
          if(myData[option] == 1) {  // 领导机关列表
            additionList = additionList_leader;
            $('.leader').show();
          }else {  // 其它组织类型列表
            additionList = additionList_other;
            $('.other').show();
          }

          // 附加信息
          for(var j=0; j<additionList.length; j++) {
            var addition = additionList[i];
            if(myData[addition] == null) { // null 直接返回
              continue;
            }

            $('#' + addition).text(myData[addition]);
          }

          continue;
        }

        if(option == 'industryCategory') { // 单位所属行业类别
          $('#' + option).text(industryCategoryName[myData[option]]);
          continue;
        }

        $('#' + option).text(myData[option]);
      }
    }
  })
});