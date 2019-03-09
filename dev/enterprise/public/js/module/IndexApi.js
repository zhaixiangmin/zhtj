/**
 * Created by licong on 2017/11/28.
 */
// 接口对象 -- 组织信息
var IndexApi = {};

/**
 * 团员待审核列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
IndexApi.getMembersTobeAudited = function (params) {
    return Enterprise.ApiProxy('/members/app/getMembersTobeAudited', params, '团员待审核列表');
};

/**
 * 获取单个审核组织有待审核的奖励记录的团员列
 * @param params {object} 属性如下
 * pageIndex {int} 当前页码 -- 可不传，默认为1
 * pageSize {int} 每页记录数 -- 可不传，默认为10
 */
IndexApi.memberList = function (params) {
    return Enterprise.ApiProxy('/rewardpunish/reward/bg/memberList', params, '获取单个审核组织有待审核的奖励记录的团员列');
};