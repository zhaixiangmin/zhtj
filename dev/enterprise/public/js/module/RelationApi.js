/**
 * Created by licong on 2017/1/24.
 */
// 接口对象 -- 关系转接
var RelationApi = {};

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
    return Enterprise.ApiProxy('/orgTransfer/all/haveTodoList', params, '已办列表');
};

/**
 * 转接发起记录详细
 * @param params {object} 属性如下
 * otid {int} 组织转移申请ID
 * @returns {*}
 */
RelationApi.auditList = function (params) {
    return Enterprise.ApiProxy('/orgTransfer/all/auditList', params, '转接发起记录详细');
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
    return Enterprise.ApiProxy('/orgTransfer/all/todoList', params, '待办列表');
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
    return Enterprise.ApiProxy('/orgTransfer/all/audit', params, '组织转接审核');
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
RelationApi.list = function (params) {
    return Enterprise.ApiProxy('/members/bg/list', params, '团员列表');
};

/**
 * 组织转接发起转接验证
 * @param params {object} 属性如下
 * mid {int} 团员id(type=1 必传)
 * type {int} 类型(1：组织，2：团员)
 * @returns {*}
 */
RelationApi.checkMembers = function (params) {
    return Enterprise.ApiProxy('/orgTransfer/all/checkMembers', params, '组织转接发起转接验证');
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
    return Enterprise.ApiProxy('/orgTransfer/all/applyAdd', params, '组织转接发起转接');
};

/**
 * 根据组织名称获取团支部组织
 * @param params 属性如下
 * page {int} 当前页
 * rows {int} 每页显示条数
 * fullName {string} 组织全称
 * name {string} 组织简称
 * @returns {*}
 */
RelationApi.getOrgByName = function (params) {
    return Enterprise.ApiProxy('/bg/org/getOrgByName', params, '根据组织名称获取团支部组织');
};

/**
 * 转接发起记录列表
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
    return Enterprise.ApiProxy('/orgTransfer/all/applyList', params, '转接发起记录列表');
};


/**
 * 组织转接发起转接列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，为空=1)
 * rows {int} 每页显示条数(可不传，为空=10)
 * name {string} 团员姓名
 */
RelationApi.draftsmanshipList = function (params) {
    return Enterprise.ApiProxy('/orgTransfer/all/membersList', params, '组织转接发起转接列表');
};

/**
 * 获取省级数据
 * @param params 属性如下
 * 无参数
 * @returns {*}
 */
RelationApi.getDistrictByLevel = function (params) {
    return Enterprise.ApiProxy('/district/getDistrictByLevel', params, '获取省级数据');
};

/**
 * 根据省级ID查询市级
 * @param params 属性如下
 * did {string} 地市id
 * @returns {*}
 */
RelationApi.getDistrictByPid = function (params) {
    return Enterprise.ApiProxy('/district/getDistrictByPid', params, '根据省级ID查询市级');
};

/**
 * 组织转接撤回
 * @param params {object} 属性如下
 * otid {int} 组织转接申请id
 * reasonForWithdrawal {string} 撤回原因
 * @returns {*}
 */
RelationApi.withdraw = function (params) {
    return Enterprise.ApiProxy('/orgTransfer/all/withdraw', params, '组织转接撤回');
};