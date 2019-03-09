/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 组织信息
var MemberApi = {};

/**
 * 获取组织列表
 * @param params {object} 属性如下
 * page {int} 当前页(当前页（为空=1）)
 * rows {int} 每页显示条数(每页显示条数（为空=10）)
 * type {int} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
 * fullName {string} 组织名称(组织名称)
 */
MemberApi.getOrganizations = function (params) {
    return Enterprise.ApiProxy('/bg/org/list', params, '获取组织列表');
};


/**
 * 根据当前登录获取团员列表所在组织
 * @param params {object} 属性如下
 * type {int} 类型(1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部 -- 空查全部)
 * fullName {string} 组织全称
 * page {int} 当前页（为空=1）
 * rows {int} 每页显示条数（为空=10）
 * @returns {*}
 */
MemberApi.orgList = function (params) {
    return Enterprise.ApiProxy('/bg/org/orgList', params, '根据当前登录获取团员列表所在团支部');
};

/**
 * 根据组织ID获取组织
 * @param params 属性如下
 * oid {int} 组织id
 * @returns {*}
 */
MemberApi.getOrgByOid = function (params) {
    return Enterprise.ApiProxy('/bg/org/getOrgByOid', params, '根据组织ID获取组织');
};


/**
 * 团员列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，为空=1)
 * rows {int} 每页显示条数(可不传，为空=10)
 * degreeOfEducation {int} 全日制学历(可不传，1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
 * auditStatus {int} 审核状态(可不传，1:报到待审核2:报到被退回,3:审核通过4:修改资料待审核,5:修改资料被退回)
 * oid {int} 所在团支部(组织ID)(可不传，调接口)
 * name {string} 团员姓名
 */
MemberApi.list = function (params) {
    return Enterprise.ApiProxy('/members/bg/list', params, '团员列表');
};

/**
 * 根据ID获取团员
 * @param params {object} 属性如下
 * mid {int} 团员ID
 * @returns {*}
 */
MemberApi.getMembersById = function (params) {
    return Enterprise.ApiProxy('/members/app/getMembersById', params, '根据ID获取团员');
};

/**
 * 团员待审核列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
MemberApi.getMembersTobeAudited = function (params) {
    return Enterprise.ApiProxy('/members/app/getMembersTobeAudited', params, '团员待审核列表');
};

/**
 * 团员审核
 * @param params {object} 属性如下
 * mid {int} 团员id
 * auditStatus {int} 审核状态(1:报到待审核2:报到被退回,3:审核通过4:修改资料待审核,5:修改资料被退回)
 * returnReason {string} 退回原因(2:报到被退回,5:修改资料被退回时传)
 * @returns {*}
 */
MemberApi.audit = function (params) {
    return Enterprise.ApiProxy('/members/bg/audit', params, '团员审核');
};

/**
 * 获取单个审核组织需要审核的奖励记录列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * pageIndex {int} 当前页码()
 * pageSize {int} 每页记录数(可不传，默认为1)
 * @returns {*}
 */
MemberApi.listByOrg = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/reward/bg/listByOrg', params, '获取单个审核组织需要审核的奖励记录列表');
};

/**
 * 团组织查看单个团员的奖励信息列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * type {int} 奖励类型(1-团内奖励，2-团外奖励)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
MemberApi.rewardList = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/reward/bg/listByMember', params, '团组织查看单个团员的奖励信息列表');
};

/**
 * 团组织查看单个团员的惩罚信息列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
MemberApi.punishmentList = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/punishment/bg/listByOrg', params, '团组织查看单个团员的惩罚信息列表');
};

/**
 * 奖惩证明附件列表查看
 * @param params {object} 属性如下
 * objectId {int} 所属对象ID -- 附件所属对象ID（奖励ID/惩罚ID等）
 * module {int} 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为8)
 * @returns {*}
 */
MemberApi.attachFileList = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/attachFile/list', params, '奖惩证明附件列表查看');
};

/**
 * 新增吐槽
 * @param params {object} 属性如下
 * content {string} 吐槽内容
 * type {int} 账号类型(0：组织；1：团员)
 * @returns {*}
 */
MemberApi.tsukkomiAdd = function (params) {
    return Enterprise.ApiProxy('/tsukkomi/add', params, '新增吐槽');
};