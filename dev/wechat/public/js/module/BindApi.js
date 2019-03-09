/**
 * Created by licong on 2017/10/25.
 */
// 接口对象 -- 组织关系转移
var BindApi = {};


/**
 * 验证团员是否存在
 * @param params {object} 属性如下
 * name {string} 姓名
 * idCard {string} 身份证号码
 * oid {int} 所属组织ID
 * leagueForYears {string} 入团年月(格式为yyyy-MM)
 * @returns {*}
 */
BindApi.existMember = function (params) {
    return League.ApiProxy('/memberRebind/existMember', params, '验证团员是否存在');
};

/**
 * 获取10个随机团员
 * @param params {object} 属性如下
 * mid {int} 团员ID
 * @returns {*}
 */
BindApi.getRandomMember = function (params) {
    return League.ApiProxy('/memberRebind/getRandomMember', params, '获取10个随机团员');
};

/**
 * 支部团员校验
 * @param params {object} 属性如下
 * mid {int} 团员ID
 * chooseId {int} 选择的团员ID
 * @returns {*}
 */
BindApi.chooseRandomMember = function (params) {
    return League.ApiProxy('/memberRebind/chooseRandomMember', params, '支部团员校验');
};

/**
 * 修改团员映射
 * @param params {object} 属性如下
 * mid {int} 接口返回的团员ID
 * name {string} 用户填写的姓名
 * idCard {string} 用户填写的身份证号码
 * oid {int} 用户选择的所属组织ID
 * leagueForYears {string} 用户填写的入团年月(格式为yyyy-MM)
 * chooseId {int} 用户选择的团员ID
 * @returns {*}
 */
BindApi.memberInfoRebinding = function (params) {
    return League.ApiProxy('/memberRebind/memberInfoRebinding', params, '修改团员映射');
};
