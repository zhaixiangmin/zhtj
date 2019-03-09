/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 南粤人才库
var TalentApi = {};


/**
 * 南粤青年人才列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，为空=1)
 * rows {int} 每页显示条数(可不传，为空=10)
 * name {string} 团员姓名
 * mobile {string} 手机号码
 * degreeOfEducation {int} 全日制学历(可不传，1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
 */
TalentApi.talentList = function (params) {
    return Enterprise.ApiProxy('/gdYouthTalentPool/bg/list', params, '南粤青年人才列表');
};

/**
 * 根据南粤青年人才ID获取详情
 * @param params {object} 属性如下
 * gytpid {int} 南粤青年人才id
 * @returns {*}
 */
TalentApi.getGdYouthTalentPoolsById = function (params) {
    return Enterprise.ApiProxy('/gdYouthTalentPool/all/getGdYouthTalentPoolsById', params, '根据南粤青年人才ID获取详情');
};

/**
 * 获取单个南粤青年的奖励信息列表
 * @param params {object} 属性如下
 * talentPoolId {int} 南粤人才ID(必传)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
TalentApi.rewardListByTalent = function (params) {
    return Enterprise.ApiProxy('/gdYouthTalentPool/reward/bg/listByTalent', params, '获取单个南粤青年的奖励信息列表');
};

/**
 * 奖惩证明附件列表查看
 * @param params {object} 属性如下
 * objectId {int} 所属对象ID -- 附件所属对象ID（奖励ID/惩罚ID等）
 * module {int} 所属模块 -- 附件所属模块(1-团员奖励附件，2-团员惩罚附件，3-公告附件，4-南粤青年人才奖励附件)
 * pageIndex {int} 当前页码(可不传) -- 默认为1
 * pageSize {int} 每页记录数(可不传) -- 默认为8
 * @returns {*}
 */
TalentApi.attachFileList = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/attachFile/list', params, '奖惩证明附件列表查看');
};

/**
 * 获取单个南粤青年的工作履历列表
 * @param params {object} 属性如下
 * talentPoolId {int} 南粤人才ID(必传)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
TalentApi.workResumeListByTalent = function (params) {
    return Enterprise.ApiProxy('/gdYouthTalentPool/workResume/bg/listByTalent', params, '获取单个南粤青年的工作履历列表');
};
