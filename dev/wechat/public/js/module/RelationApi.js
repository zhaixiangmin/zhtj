/**
 * Created by licong on 2017/10/25.
 */
// 接口对象 -- 组织关系转移
var RelationApi = {};

/**
 * 组织转接发起转接
 * @param params {object} 属性如下
 * headfor {int} 转往（１：省内，２：非共青团广东省委所辖的团组织）
 * newOid {int} 新组织
 * cause {int} 接转原因（1:就业/工作调动，２：升学/转学，３：其他原因）
 * causeOthers {int} 其他原因(cause=3填写其他原因)
 * applicantType {int} 申请人类型(1:组织，２团员)
 * mid {int} 团员id
 * mobile {string} 手机号码
 * phoneCode {string} 手机验证码
 * @returns {*}
 * @constructor
 */
RelationApi.applyAdd = function (params) {
    return League.ApiProxy('/orgTransfer/all/applyAdd', params, '组织转接发起转接');
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
 * applicantType {int} 申请人类型(1:组织，２团员) -- 后台=1，团员移动端=2
 * @returns {*}
 */
RelationApi.applyList = function (params) {
    return League.ApiProxy('/orgTransfer/all/applyList', params, '我的发起列表');
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
 * 我的发起详细
 * @param params {object} 属性如下
 * otid {int} 组织转移申请ID
 * @returns {*}
 */
RelationApi.auditList = function (params) {
    return League.ApiProxy('/orgTransfer/all/auditList', params, '我的发起详细');
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
 * 根据省级ID查询市级
 * @param params 属性如下
 * did {string} 地市id
 * @returns {*}
 */
RelationApi.getDistrictByPid = function (params) {
    return League.ApiProxy('/district/getDistrictByPid', params, '根据省级ID查询市级');
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
 * 组织转接手机号码验证
 * phone {string} 手机号码
 * @param params {object} 属性如下
 * @returns {*}
 */
RelationApi.createSecurityCodeSend = function (params) {
    return League.ApiProxy('/orgTransfer/all/createSecurityCodeSend', params, '组织转接手机号码验证');
};

/**
 * 组织转接号码验证
 * @param params {object} 属性如下
 * otid {int} 转接id
 * phone {string} 手机号码
 * phoneCode {string} 验证码
 * @returns {*}
 */
RelationApi.phoneValidateCode = function (params) {
    return League.ApiProxy('/orgTransfer/all/phoneValidateCode', params, '组织转接号码验证');
};

/**
 * 组织转接申诉检查
 * @param params {object} 属性如下
 * otid {int} 组织转接申请id
 * @returns {*}
 */
RelationApi.checkOrganizationTransferAppeal = function (params) {
    return League.ApiProxy('/orgTransfer/app/checkOrganizationTransferAppeal', params, '组织转接申诉检查');
};

/**
 * 组织转接申诉申请
 * @param params {object} 属性如下
 * otid {int} 组织转接申请id
 * reason {string} 申诉理由
 * attachmentUrl {string} 附件URL
 * @returns {*}
 * @constructor
 */
RelationApi.appealAdd = function (params) {
    return League.ApiProxy('/orgTransfer/app/appealAdd', params, '组织转接申诉申请');
};

/**
 * 查看组织转接申诉详情
 * @param params {object} 属性如下
 * otid	组织转接申请id
 * @returns {*}
 */
RelationApi.appealDetail = function (params) {
    return League.ApiProxy('/orgTransfer/app/appealDetail', params, '查看组织转接申诉详情');
};

/**
 * 根据组织ID显示组织相关信息接口
 * @param params {object} 属性如下
 * orgId {int} 团组织ID
 * @returns {*}
 */
RelationApi.showOrgInfo = function (params) {
  return League.ApiProxy('/org/showOrgInfo', params, '根据组织ID显示组织相关信息接口');
};