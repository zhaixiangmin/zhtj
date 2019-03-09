/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 团干信息
var CadreApi = {};

/**
 * 搜索通讯录
 * @param params {object} 属性如下
 * type {int} 搜索类型(0：组织；1：团干)
 * keyword {string} 关键字
 * @returns {*}
 */
CadreApi.search = function (params) {
    return Contact.ApiProxy('/contact/search', params, '搜索通讯录');
};


/**
 * 获取团干详情
 * @param params {object} 属性如下
 * id {int} 团干ID
 * @returns {*}
 */
CadreApi.getTuanganInfo = function (params) {
    return Contact.ApiProxy('/contact/getTuanganInfo', params, '获取团干详情');
};