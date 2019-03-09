/**
 * Created by licong on 2017/10/25.
 */
// 接口对象 -- 身份工作台
var IdentityApi = {};

/**
 * 获取团干身份
 * @param params {object} 属性如下
 * @returns {*}
 */
IdentityApi.chooseOrg = function (params) {
    return Enterprise.ApiProxy('/enterprise/chooseOrg', params, '获取团干身份');
};

/**
 * 组织简称全称查询
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
IdentityApi.getOrgName = function (params) {
    return Enterprise.ApiProxy('/bg/enterprise/getOrgName', params, '组织简称全称查询');
};

/**
 * 企业微信名称保存
 * @param params {object} 属性如下
 * enterpriseName {string} 企业微信名称
 * @returns {*}
 */
IdentityApi.saveEnterpriseName = function (params) {
    return Enterprise.ApiProxy('/bg/enterprise/saveEnterpriseName', params, '企业微信名称保存');
};

/**
 * 团干职称保存
 * @param params {object} 属性如下
 * taiid {int} 团干附加信息ID
 * duty_code {int} 团干职务代码（1书记；2副书记；3常委；4委员；5候补委员；6工作人员）
 * duty_desc {string} 职务名称/描述
 * @returns {*}
 */
IdentityApi.saveDuty = function (params) {
    return Enterprise.ApiProxy('/bg/enterprise/saveDuty', params, '团干职称保存');
};