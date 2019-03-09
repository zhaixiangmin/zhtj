/**
 * Created by licong on 2017/10/31.
 */

// 接口对象 -- 团员信息
var OrganizationApi = {};

/**
 * 我的组织
 * @param params 属性如下
 * 无参数
 * @returns {*}
 */
OrganizationApi.MyOrganization = function (params) {
    return League.ApiProxy('/members/app/MyOrganization', params, '获取我的组织信息');
};