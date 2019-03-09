/**
 * Created by licong on 2017/10/25.
 */
// 接口对象 -- 团费交纳
var FeeApi = {};


/**
 * 团员未交团费查询
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeApi.getBill = function (params) {
    return League.ApiProxy('/bg/getBill', params, '团员未交团费查询');
};

/**
 * 创建订单
 * @param params {object} 属性如下
 * mids {string} 团员ID集合(帮TA交费创建订单必传参数。多个团员ID的字符串，以英文逗号分隔)
 * donation {string} 自愿多交金额(自愿多交创建订单必传参数。单位：元)
 * @returns {*}
 */
FeeApi.createOrder = function (params) {
    return League.ApiProxy('/bg/wechatPay/createOrder', params, '创建订单');
};

/**
 * 支付
 * @param params {object} 属性如下
 * orderNo {string} 订单号
 * @returns {*}
 * @constructor
 */
FeeApi.JsAPIPay = function (params) {
    return League.ApiProxy('/bg/wechatPay/JsAPIPay', params, '支付', true);
};

/**
 * 订单查询
 * @param params {object} 属性如下
 * orderNo {string} 订单号
 * @returns {*}
 * @constructor
 */
FeeApi.getOrderInfo = function (params) {
    return League.ApiProxy('/bg/getOrderInfo', params, '订单查询');
};

/**
 * 团员已交团费查询
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeApi.getPaymentRecords = function (params) {
    return League.ApiProxy('/bg/getPaymentRecords', params, '团员已交团费查询');
};

/**
 * 自愿多交历史记录查询
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeApi.getDonateRecords = function (params) {
    return League.ApiProxy('/bg/getDonateRecords', params, '自愿多交历史记录查询');
};

/**
 * 组织未交团费查询
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeApi.getOrgBill = function (params) {
    return League.ApiProxy('/bg/getOrgBill', params, '组织未交团费查询');
};

/**
 * 获取帮TA交费记录
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeApi.getOrgPaymentRecords = function (params) {
    return League.ApiProxy('/bg/getOrgPaymentRecords', params, '获取帮TA交费记录');
};

/**
 * 订单详情查询(查看帮TA交费记录)
 * @param params {object} 属性如下
 * orderNo {string} 订单号
 * @returns {*}
 */
FeeApi.getOrderInfoDetails = function (params) {
    return League.ApiProxy('/bg/getOrderInfoDetails', params, '订单详情查询');
};

/**
 * 当自费或帮TA交费取消支付、或者支付失败时调用
 * @param params {object} 属性如下
 * orderNo {string} 订单号
 * @returns {*}
 */
FeeApi.unlock = function (params) {
    return League.ApiProxy('/bg/wechatPay/unlock', params, '当自费或帮TA交费取消支付、或者支付失败时调用');
};
