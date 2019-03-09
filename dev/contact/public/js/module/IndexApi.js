/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 组织信息
var IndexApi = {};

/**
 * 获取下级组织列表
 * @param params {object} 属性如下
 * oid {int} 当前组织ID(默认值为组织树根节点ID)
 * @returns {*}
 */
IndexApi.getSubOrgList = function (params) {
    return Contact.ApiProxy('/contact/getSubOrgList', params, '获取下级组织列表');
};

/**
 * 获取组织的团干列表
 * @param params {object} 属性如下
 * oid {int} 当前组织ID
 * @returns {*}
 */
IndexApi.getTuanganList = function (params) {
    return Contact.ApiProxy('/contact/getTuanganList', params, '获取组织的团干列表');
};