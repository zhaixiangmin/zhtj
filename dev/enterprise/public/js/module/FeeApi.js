/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 团费信息
var FeeApi = {};

/**
 * 获取可查询团费交纳情况的月份
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeApi.getPaymentTime = function (params) {
    return Enterprise.ApiProxy('/bg/getPaymentTime', params, '获取可查询团费交纳情况的月份');
};

/**
 * 获得所在组织及下一级组织列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeApi.orgListCurrNextLv = function (params) {
    return Enterprise.ApiProxy('/bg/org/orgListCurrNextLv', params, '获得所在组织及下一级组织列表');
};


/**
 * 团费查询
 * @param params {object} 属性如下
 * months {string} 月份
 * oid {int} 组织ID
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
FeeApi.getPaymentStatistics = function (params) {
    return Enterprise.ApiProxy('/bg/getPaymentStatistics', params, '团费查询');
};

/**
 * 获取本组织收到的凭证
 * @param params {object} 属性如下
 * months {string} 月份
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
FeeApi.getReceiveCredentials = function (params) {
    return Enterprise.ApiProxy('/bg/getReceiveCredentials', params, '获取本组织收到的凭证');
};

/**
 * 核实凭证
 * @param params {object} 属性如下
 * cid {int} 凭证ID
 * @returns {*}
 */
FeeApi.proveCredentials = function (params) {
    return Enterprise.ApiProxy('/bg/proveCredentials', params, '核实凭证');
};

/**
 * 查询已收凭证的公示轨迹
 * @param params {object} 属性如下
 * cid {int} 凭证ID
 * @returns {*}
 */
FeeApi.getReceiveCredentialsTrack = function (params) {
    return Enterprise.ApiProxy('/bg/getReceiveCredentialsTrack', params, '查询已收凭证的公示轨迹');
};