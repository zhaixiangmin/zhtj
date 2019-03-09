/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 组织信息
var OrganizationApi = {};

/**
 * 获取组织列表
 * @param params {object} 属性如下
 * page {int} 当前页(当前页（为空=1）)
 * rows {int} 每页显示条数(每页显示条数（为空=10）)
 * type {int} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
 * fullName {string} 组织名称(组织名称)
 */
OrganizationApi.getOrganizations = function (params) {
    return Enterprise.ApiProxy('/bg/org/list', params, '获取组织列表');
};

/**
 * 根据组织ID获取组织
 * @param params 属性如下
 * oid {int} 组织id
 * @returns {*}
 */
OrganizationApi.getOrgByOid = function (params) {
    return Enterprise.ApiProxy('/bg/org/getOrgByOid', params, '根据组织ID获取组织');
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
OrganizationApi.orgList = function (params) {
    return Enterprise.ApiProxy('/bg/org/orgList', params, '根据当前登录获取团员列表所在团支部');
};