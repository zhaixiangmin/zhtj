/**
 * Created by licong on 2017/12/11.
 */
// 组织关系转接
var RelationApi = {};

/**
 * 组织转接发起转接列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，为空=1)
 * rows {int} 每页显示条数(可不传，为空=10)
 * name {string} 团员姓名
 */
RelationApi.draftsmanshipList = function (params) {
    return League.ApiProxy('/orgTransfer/all/membersList', params, '组织转接发起转接列表');
};

/**
 * 组织转接发起转接
 * @param params {object} 属性如下
 * newOid {int} 新组织
 * headfor {int} 转往（１：省内，２：非共青团广东省委所辖的团组织）
 * cause {int} 接转原因（1:就业/工作调动，２：升学/转学，３：其他原因）
 * causeOthers {int} 其他原因(cause=3填写其他原因)
 * applicantType {int} 申请人类型(1:组织，２团员)
 * mid {int} 团员id
 * @returns {*}
 * @constructor
 */
RelationApi.applyAdd = function (params) {
    return League.ApiProxy('/orgTransfer/all/applyAdd', params, '组织转接发起转接');
};

/**
 * 根据组织名称获取团支部组织
 * @param params {object} 属性如下
 * page {int} 当前页
 * rows {int} 每页显示条数
 * fullName {string} 组织全称
 * name {string} 组织简称
 * @returns {*}
 */
RelationApi.getOrgByName = function (params) {
    return League.ApiProxy('/bg/org/getOrgByName', params, '根据组织名称获取团支部组织');
};

/**
 * 我的发起列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，当前页（为空=1）)
 * rows {int} 每页显示条数(可不传，每页显示条数（为空=10）)
 * auditStatus {int} 状态(可不传，接转状态（1:转出团支部待审核,2:转出团支部的上级待审核,3:转入团支部待审核,4:转入团支部的上级待审核,5:接转成功,6:转出团支部退回,7:转出团支部的上级退回,8:转入团支部退回,9:转入团支部的上级退回,10:转出团支部同意,11:转出团支部的上级同意,12:转入团支部同意,12:转入团支部的上级同意）)
 * mName {string} 团员姓名(可不传)
 * mobile {string} 团员手机号码(可不传)
 * primalOid {int} 原组织(可不传)
 * newOid {int} 新组织(可不传)
 * applicantType {int} 申请人类型(1:组织，２团员) -- 后台和团员移动端=1，团员移动端=2
 * @returns {*}
 */
RelationApi.applyList = function (params) {
    return League.ApiProxy('/orgTransfer/all/applyList', params, '我的发起列表');
};

/**
 * 待办列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，当前页（为空=1）)
 * rows {int} 每页显示条数(可不传，每页显示条数（为空=10）)
 * mName {string} 团员姓名(可不传)
 * primalOid {int} 原组织(可不传)
 * newOid {int} 新组织(可不传)
 * @returns {*}
 */
RelationApi.todoList = function (params) {
    return League.ApiProxy('/orgTransfer/all/todoList', params, '待办列表');
};

/**
 * 我的发起详细
 * @param params {object} 属性如下
 * otid {int} 组织转移申请ID
 * @returns {*}
 */
RelationApi.auditList = function (params) {
    return League.ApiProxy('/orgTransfer/all/auditList', params, '我的发起详细');
};

/**
 * 组织转接审核
 * @param params
 * mid {int} 团员id
 * otid {int} 组织转接申请id
 * otaid {int} 组织转接审核记录id
 * auditStatus {int} 审核状态(1:同意，2：退回)
 * returnReason {int} 退回原因(auditStatus=2传入)
 * @returns {*}
 */
RelationApi.audit = function (params) {
    return League.ApiProxy('/orgTransfer/all/audit', params, '组织转接审核');
};

/**
 * 根据ID获取团员
 * @param params {object} 属性如下
 * mid {int} 团员ID
 * @returns {*}
 */
RelationApi.getMembersById = function (params) {
    return League.ApiProxy('/members/app/getMembersById', params, '根据ID获取团员');
};

/**
 * 已办列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，当前页（为空=1）)
 * rows {int} 每页显示条数(可不传，每页显示条数（为空=10）)
 * auditStatus {int} 状态(可不传，接转状态（1:转出团支部待审核,2:转出团支部的上级待审核,3:转入团支部待审核,4:转入团支部的上级待审核,5:接转成功,6:转出团支部退回,7:转出团支部的上级退回,8:转入团支部退回,9:转入团支部的上级退回,10:转出团支部同意,11:转出团支部的上级同意,12:转入团支部同意,12:转入团支部的上级同意）)
 * mName {string} 团员姓名(可不传)
 * primalOid {int} 原组织(可不传)
 * newOid {int} 新组织(可不传)
 * @returns {*}
 */
RelationApi.haveTodoList = function (params) {
    return League.ApiProxy('/orgTransfer/all/haveTodoList', params, '已办列表');
};

/**
 * 组织转接发起转接验证
 * @param params {object} 属性如下
 * mid {int} 团员id(type=1 必传)
 * type {int} 类型(1：组织，2：团员)
 * @returns {*}
 */
RelationApi.checkMembers = function (params) {
    return League.ApiProxy('/orgTransfer/all/checkMembers', params, '组织转接发起转接验证');
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
RelationApi.rewardList = function (params) {
    return League.ApiProxy('/rewardpunish/reward/bg/listByMember', params, '团组织查看单个团员的奖励信息列表');
};

/**
 * 团组织查看单个团员的惩罚信息列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
RelationApi.punishmentList = function (params) {
    return League.ApiProxy('/rewardpunish/punishment/bg/listByOrg', params, '团组织查看单个团员的惩罚信息列表');
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
RelationApi.attachFileList = function (params) {
    return League.ApiProxy('/rewardpunish/attachFile/list', params, '奖惩证明附件列表查看');
};

/**
 * 批量检查团员是否满足转接要求
 * @param params {object} 属性如下
 * mids {int} 团员ID(多个ID之间用英文逗号分隔开，团员个人申请可以不传该参数)
 * type {int} 发起检查用户类型(1-组织用户；2-团员)
 * @returns {*}
 */
RelationApi.batchCheckMembers = function (params) {
    return League.ApiProxy('/orgTransfer/all/batchCheckMembers', params, '批量检查团员是否满足转接要求');
};

/**
 * 批量申请团员转接
 * @param params {object} 属性如下
 * mids {string} 团员id(多个ID之间用英文逗号分隔开，团员个人申请可以不传该参数)
 * headfor {int} 转接类型（１：省内，２：非共青团广东省委所辖的团组织）
 * newOid {int} 接收组织ID(当转接类型为2-非共青团广东省委所辖的团组织，可以不传该参数)
 * cause {int} 接转原因（1:就业/工作调动，２：升学/转学，３：其他原因）
 * causeOthers {string} 其他原因(cause=3填写其他原因)
 * applicantType {int} 申请人类型(1:组织，２团员)
 * studyWorkUnit {string} 学习工作单位
 * provinceDid {string} 省DID
 * cityDid {string} 市DID
 * countyDid {string} 县DID
 * @returns {*}
 * @constructor
 */
RelationApi.batchApply = function (params) {
    return League.ApiProxy('/orgTransfer/all/batchApply', params, '批量申请团员转接');
};


/**
 * 批量审核团员审核
 * @param params
 * otaids {string} 审核记录ID(多个ID之间用英文逗号分隔开)
 * auditStatus {int} 审核状态(1:同意，2：退回)
 * returnReason {string} 退回原因(auditStatus=2传入)
 * @returns {*}
 */
RelationApi.batchAudit = function (params) {
    return League.ApiProxy('/orgTransfer/all/batchAudit', params, '批量审核团员审核');
};

/**
 * 获取省级数据
 * @param params 属性如下
 * 无参数
 * @returns {*}
 */
RelationApi.getDistrictByLevel = function (params) {
    return League.ApiProxy('/district/getDistrictByLevel', params, '获取省级数据');
};

/**
 * 根据省级ID查询市级/市级ID查询县级
 * @param params {object} 属性如下
 * did {string} 地市id
 * @returns {*}
 */
RelationApi.getDistrictByPid = function (params) {
    return League.ApiProxy('/district/getDistrictByPid', params, '根据省级ID查询市级');
};

/**
 * 组织关系转接数据统计信息分页列表
 * @param params {object} 属性如下
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为100)
 * @returns {*}
 */
RelationApi.transferStatisticsList = function (params) {
    return League.ApiProxy('/bg/transferStatistics/list', params, '组织关系转接数据统计信息分页列表');
};

/**
 * 组织转接撤回
 * @param params {object} 属性如下
 * otid {int} 组织转接申请id
 * reasonForWithdrawal {string} 撤回原因
 * @returns {*}
 */
RelationApi.withdraw = function (params) {
    return League.ApiProxy('/orgTransfer/all/withdraw', params, '组织转接撤回');
};

/**
 * 获取组织关系转接申诉管理分页列表
 * @param params params {object} 属性如下
 * memberName {string} 团员姓名(筛选条件)
 * memberMobile {string} 团员手机号(筛选条件)
 * appealStatus {string} 申诉状态(0-申诉待审核，1-申诉成功，2-申诉失败，筛选条件)
 * appealMonth {string} 申诉筛选月份(yyyy-MM格式，筛选条件)
 * pageIndex {string} 当前页码(可不传，默认为1)
 * pageSize {string} 每页记录数(可不传，默认为20，展示全部)
 * @returns {*}
 */
RelationApi.appealList = function (params) {
    return League.ApiProxy('/orgTransfer/all/appealList', params, '组织转接撤回');
};


/**
 * 审核组织转接申诉
 * @param params {object} 属性如下
 * appealId {string} 申诉编号(要审核的申诉ID)
 * appealResult {string} 审核结果(1-通过,2-拒绝)
 * returnReason {string} 审核说明(审核说明/退回原因，appealResult=2时)
 * @returns {*}
 */
RelationApi.auditAppeal = function (params) {
    return League.ApiProxy('/orgTransfer/all/auditAppeal', params, '审核组织转接申诉');
};