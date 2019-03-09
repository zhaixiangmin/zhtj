/**
 * Created by licong on 2017/9/22.
 */


// 系统管理接口对象
var SystemManagementApi = {};

/**
 * 修改密码
 * @param params {object} 属性如下
 * oldPassword {string} 原密码
 * newPassword {string} 新密码
 * @returns {*}
 */
SystemManagementApi.modifyPassWord = function (params) {
    return League.ApiProxy('/login/modifyPassWord', params, '修改密码');
};

/**
 * 企业微信名称保存
 * @param params {object} 属性如下
 * enterpriseName {string} 企业微信名称
 * @returns {*}
 */
SystemManagementApi.saveEnterpriseName = function (params) {
    return League.ApiProxy('/bg/enterprise/saveEnterpriseName', params, '企业微信名称保存');
};

/**
 * 获取运营者操作日志列表
 * @param params {object} 属性如下
 * time {date} 日期
 * keyword {string} 关键字
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
SystemManagementApi.getPerateLogList = function (params) {
    return League.ApiProxy('/bg/perateLog/getPerateLogList', params, '获取运营者操作日志列表');
};


/**
 * 获取运营者操作日志详情
 * @param params {object} 属性如下
 * operateId {int} 操作日志ID
 * @returns {*}
 */
SystemManagementApi.getPerateLogDetails = function (params) {
    return League.ApiProxy('/bg/perateLog/getPerateLogDetails', params, '获取运营者操作日志详情');
};

/**
 * 分页获取吐槽列表
 * @param params {object} 属性如下
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
SystemManagementApi.getPageTsukkomiList = function (params) {
    return League.ApiProxy('/bg/tsukkomi/getPageTsukkomiList', params, '分页获取吐槽列表');
};

/**
 * 删除吐槽
 * @param params {object} 属性如下
 * ids {string} 记录ID(支持多选)
 * @returns {*}
 */
SystemManagementApi.tsukkomiDelete = function (params) {
    return League.ApiProxy('/bg/tsukkomi/delete', params, '删除吐槽');
};