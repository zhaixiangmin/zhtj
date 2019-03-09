/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 组织信息
var AwardsApi = {};

/**
 * 获取单个审核组织有待审核的奖励记录的团员列
 * @param params {object} 属性如下
 * pageIndex {int} 当前页码 -- 可不传，默认为1
 * pageSize {int} 每页记录数 -- 可不传，默认为10
 */
AwardsApi.memberList = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/reward/bg/memberList', params, '获取单个审核组织有待审核的奖励记录的团员列');
};


/**
 * 获取单个审核组织需要审核的奖励记录列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * pageIndex {int} 当前页码()
 * pageSize {int} 每页记录数(可不传，默认为1)
 * @returns {*}
 */
AwardsApi.listByOrg = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/reward/bg/listByOrg', params, '获取单个审核组织需要审核的奖励记录列表');
};

/**
 * 团组织批量审核团员的多份奖励信息
 * @param params {object} 属性如下
 * rewardIds {string} 奖励ID -- 多份(可单份)奖励信息中的  编号ID 拼接字符串，以特殊符号@@分隔
 * results {string} 多份审核结果(1-通过/同意，2-退回/拒绝)) -- 多份(可单份)奖励信息中的 审核结果 拼接字符串，以特殊符号@@分隔
 * returnReasons {string} 多份退回原因 -- 多份(可单份)奖励信息中的 退回原因  拼接字符串，以特殊符号@@分隔
 * @returns {*}
 */
AwardsApi.rewardAudit = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/reward/bg/audit', params, '团组织批量审核团员的多份奖励信息');
};

/**
 * 奖惩证明附件列表查看
 * @param params {object} 属性如下
 * objectId {int} 所属对象ID -- 附件所属对象ID（奖励ID/惩罚ID等）
 * module {int} 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚)
 * pageIndex {int} 当前页码(可不传) -- 默认为1
 * pageSize {int} 每页记录数(可不传) -- 默认为8
 * @returns {*}
 */
AwardsApi.attachFileList = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/attachFile/list', params, '奖惩证明附件列表查看');
};