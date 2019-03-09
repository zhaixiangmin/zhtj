/**
 * Created by licong on 2017/10/9.
 */
// 帮助管理接口对象
var HelpApi = {};

/**
 * 新增吐槽
 * @param params {object} 属性如下
 * content {string} 吐槽内容
 * type {int} 账号类型(0：组织；1：团员)
 * @returns {*}
 */
HelpApi.tsukkomiAdd = function (params) {
    return League.ApiProxy('/tsukkomi/add', params, '新增吐槽');
};