/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 团干信息
var CadreApi = {};

/**
 * 获取团干列表
 * @param params {object} 属性如下
 * page {int} 当前页
 * rows {int} 每页显示条数
 * disabled {int} 是否禁用(0-正常，1-禁用)
 * name {string} 姓名
 * idCard {string} 身份证
 */
CadreApi.getCadreList = function (params) {
    return Enterprise.ApiProxy('/bg/tuangan/list', params, '获取团干列表');
};

/**
 * 根据团干ID获取团干当前登录账号附加信息
 * @param params {object} 属性如下
 * tid {int} 团干id
 * @returns {*}
 */
CadreApi.getTuanganInfoById = function (params) {
    return Enterprise.ApiProxy('/bg/tuangan/getTuanganInfoById', params, '获取团干列表');
    // return Enterprise.ApiProxy('/tuangan/app/getTuanganInfoById', params, '获取团干列表');
};