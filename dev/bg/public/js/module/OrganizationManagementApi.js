/**
 * Created by licong on 2017/9/18.
 */
// 组织管理接口对象
var OrganizationManagementApi = {};

/**
 * 获取组织类型
 * @param params {object} 属性如下
 * 无参数
 */
OrganizationManagementApi.getType = function (params) {
    return League.ApiProxyJson('../../public/json/types.json', params, '获取组织类型');
};

/**
 * 获取单位所属行业类别
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
OrganizationManagementApi.getIndustryCategory = function (params) {
    return League.ApiProxyJson('../../public/json/industryCategory.json', params, '获取单位所属行业类别');
};

/**
 * 获取组织列表
 * @param params {object} 属性如下
 * page {int} 当前页(当前页（为空=1）)
 * rows {int} 每页显示条数(每页显示条数（为空=10）)
 * type {int} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
 * fullName {string} 组织名称(组织名称)
 */
OrganizationManagementApi.getOrganizations = function (params) {
    return League.ApiProxy('/bg/org/list', params, '获取组织列表');
};

/**
 * 下级组织新增接口
 * @param params {object} 属性如下
 * fullName {string} 团组织全称
 * name {string} 团组织简称
 * type {int} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
 * createTime {Date} 创建时间(可不传)
 * totalMsg {int} 组织账号允许给本地用户群发站内信的总条数(可不传)
 * countMsgSend {int} 组织账号当月已经给本地用户群发站内信的条数(可不传)
 * timeMsgSend {Date} 组织账号给本地用户群发站内信的时间(可不传)
 * is_system {int} 1系统内置(不可删除，默认具有系统所有的权限，相对于系统的超级管理员，由它来给其他的组织账号分配系统权限)- 0用户创建(可以删除)(可不传)
 * photoUrl {string} 头像url地址（放在阿里云）(可不传)
 * email {string} 电子邮箱
 * mobile {string} 电话号码
 * administrativeOmpilation {int} 本级团组织行政编制数
 * administrativeNumber {int} 行政编制实际配备数
 * careerFormation {int} 本级团组织事业编制数
 * serviceNumber {int} 事业编制实际配备数
 * username {string} 用户名
 * password {string} 密码
 * secretaryName {string} 团组织书记姓名(可不传)
 * groupOrganizationCode {string} 团组织机构代码(可不传)
 * groupOrganizationWechatid {string} 团组织微信号(可不传)
 * groupOrganizationWeibo {string} 团组织微博号(可不传)
 * lastSigninTime {Date} 最近登录时间(可不传)
 * industry_category {int} 单位所属行业类别:1:党政机关,2:事业单位（不含公立学校）,3:普通高等院校,4:职业教育学校.5:普通高中,6:初中,7:小学,8:国有企业9:集体企业,10:非公企业,11:新社会组织（不含民办学校）,12:军队,13:武警,14:城市社区,15:农村,16:其他(可不传)
 * aged_number {int} 14-28周岁青年数(可不传)
 * The_annual_Tuiyou_party_members_num {int} 年度经推优入党团员数(可不传)
 * @returns {*}
 */
OrganizationManagementApi.add = function (params) {
    return League.ApiProxy('/bg/org/add', params, '下级组织新增');
};

/**
 * 组织修改接口
 * @param params {object} 属性如下
 * @returns {*}
 */
OrganizationManagementApi.edit = function (params) {
    return League.ApiProxy('/bg/org/edit', params, '下级组织修改');
};

/**
 * 组织批量删除接口
 * @param params {object} 属性如下
 * oid {int} 组织ID(多个,隔开)
 // * idsStr {int} 组织ID(多个,隔开)
 * @returns {*}
 */
OrganizationManagementApi.delete = function (params) {
    return League.ApiProxy('/bg/org/delete', params, '组织批量删除');
};

/**
 * 根据登录账号获取组织树
 * @param params {object} 属性如下
 * oid {int} 组织id(0为超管)
 * flag {int} 展开的下级(0：本组织，非0：下级组织)
 * @returns {*}
 */
OrganizationManagementApi.getOrgTree = function (params) {
    return League.ApiProxy('/bg/org/getOrgTree', params, '根据登录账号获取组织树');
};

/**
 * 组织重置密码
 * @param params {object} 属性如下
 * userName {string} 用户名
 * type {int} 类型(1：组织账号，2：运营者账号)
 * @returns {*}
 */
OrganizationManagementApi.resetBatchOrgPW = function (params) {
    return League.ApiProxy('/login/resetBatchOrgPW', params, '组织重置密码');
};

/**
 * 获取组织类型
 * @param params {object} 属性如下
 * @returns {*}
 */
OrganizationManagementApi.getOrgType = function (params) {
    return League.ApiProxy('/bg/role/getOrgType', params, '获取组织类型');
};

/**
 * 根据组织ID获取组织
 * @param params {object} 属性如下
 * oid {int} 组织id
 * @returns {*}
 */
OrganizationManagementApi.getOrgByOid = function (params) {
    return League.ApiProxy('/bg/org/getOrgByOid', params, '根据组织ID获取组织');
};

/**
 * 根据组织名称获取全部团支部组织(本级和所有下级，后台)
 * @param params {object} 属性如下
 * type {int} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
 * fullName {string} 团组织全称
 * page {int} 当前页码(默认为1)
 * rows {int} 每页记录数(默认为10)
 * @returns {*}
 */
OrganizationManagementApi.orgList = function (params) {
    return League.ApiProxy('/bg/org/orgList', params, '根据组织名称获取全部团支部组织');
};

/**
 * 组织树迁移
 * @param params {object} 属性如下
 * oid {string} 被移动的组织ID(多个用逗号分开)
 * parentId {int} 接收的组织ID
 * @returns {*}
 */
OrganizationManagementApi.moveOrganization = function (params) {
    return League.ApiProxy('/bg/org/moveOrganization', params, '组织树迁移');
};

/**
 * 直属下级数据统计信息分页列表
 * @param params {object} 属性如下
 * statisticMonth {string} 统计月份
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为100)
 * @returns {*}
 */
OrganizationManagementApi.directSubOrgList = function (params) {
    return League.ApiProxy('/bg/orgStatistics/directSubOrg/list', params, '直属下级数据统计信息分页列表');
};

/**
 * 单个组织数据详细统计信息列表
 * @param params {object} 属性如下
 * orgId {int} 团组织ID
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为16)
 * @returns {*}
 */
OrganizationManagementApi.singleOrgList = function (params) {
    return League.ApiProxy('/bg/orgStatistics/singleOrg/list', params, '单个组织数据详细统计信息列表');
};

/**
 * 单个组织的团组织行业类别统计信息
 * @param params {object} 属性如下
 * orgId {int} 团组织ID
 * @returns {*}
 */
OrganizationManagementApi.industryCategoryDetail = function (params) {
    return League.ApiProxy('/bg/orgStatistics/singleOrg/industryCategory/detail', params, '单个组织的团组织行业类别统计信息');
};

/**
 * 单个组织的团员最高学历统计信息
 * @param params {object} 属性如下
 * orgId {int} 团组织ID
 * @returns {*}
 */
OrganizationManagementApi.memberEducationDetail = function (params) {
    return League.ApiProxy('/bg/orgStatistics/singleOrg/memberEducation/detail', params, '单个组织的团员最高学历统计信息');
};

/**
 * 单个组织的团员收入档次统计信息
 * @param params {object} 属性如下
 * orgId {int} 团组织ID
 * @returns {*}
 */
OrganizationManagementApi.memberIncomeDetail = function (params) {
    return League.ApiProxy('/bg/orgStatistics/singleOrg/memberIncome/detail', params, '单个组织的团员收入档次统计信息');
};


/**
 * 单个组织的团干部性质统计信息
 * @param params {object} 属性如下
 * orgId {int} 团组织ID
 * @returns {*}
 */
OrganizationManagementApi.tuanganPropertyDetail = function (params) {
    return League.ApiProxy('/bg/orgStatistics/singleOrg/tuanganProperty/detail', params, '单个组织的团干部性质统计信息');
};

/**
 * 单个组织的空心组织明细分页列表
 * @param params {object} 属性如下
 * orgId {int} 团组织ID(要查看的组织ID，必传)
 * statEmptyOrgType {string} 要查看的统计空心组织类型(emptyLeagueCommittee-空心组织、emptyLeagueBranch-空心团支部、nullCadreLeagueBranch-无团干团支部)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为20，展示全部)
 * @returns {*}
 */
OrganizationManagementApi.emptyOrgList = function (params) {
    return League.ApiProxy('/bg/orgStatistics/singleOrg/emptyOrg/list', params, '单个组织的空心组织明细分页列表');
};

/**
 * 查看团组织明细
 * @param params {object} 属性如下
 * orgId {int} 要查看的组织ID
 * industryCategory {int} 行业类别
 * statIndustryOrgType {string} 要查看的组织类型(leagueCommittee-基层团委、leagueWorkCommittee-基层团工委、leagueGeneralBranch-团总支、leagueBranch-团支部)
 * @returns {*}
 */
OrganizationManagementApi.industryOrgDetailList = function (params) {
    return League.ApiProxy('/bg/orgStatistics/singleOrg/industryOrg/detailList', params, '查看团组织明细');
};

/**
 * 编辑修改组织联系电话接口
 * @param params {object} 属性如下
 * mobile {string} 联系电话
 * @returns {*}
 */
OrganizationManagementApi.editOrgMobile = function (params) {
  return League.ApiProxy('/bg/org/editOrgMobile', params, '编辑修改组织联系电话接口');
};
