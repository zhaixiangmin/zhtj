/**
 * Created by licong on 2017/11/21.
 */
// 消息管理接口对象
var MessageApi = {};

/**
 * 获取用户的站内信
 * @param params {object} 属性如下
 * type {int} 账号类型(0组织，1团干)
 * title {string} 站内信标题(可不传)
 * msgType {int} 站内信类型(可不传，0系统级，1组织级，2用户级)
 * status {int} 消息状态(可不传，0未读，1已读，2已删)
 * pageNo {int} 当前页码(可不传，默认值为1)
 * pageSize {int} 每页记录数(可不传，默认值为10)
 * @returns {*}
 */
MessageApi.findAllMessage = function (params) {
    return League.ApiProxy('/message/findAllMessage', params, '获取用户的站内信');
};

/**
 * 改变私信的状态
 * @param params {object} 属性如下
 * receiveId {int} 站内信ID
 * type {int} 账号类型(0组织，1团干)
 * status {int} 消息状态(0未读，1已读，2已删)
 * @returns {*}
 */
MessageApi.changeStatus = function (params) {
    return League.ApiProxy('/message/changeStatus', params, '改变私信的状态');
};

/**
 * 批量设置站内信为已读状态
 * @param params {object} 属性如下
 * receiveIds {int} 站内信ID
 * type {int} 账号类型(0组织，1团干)
 * @returns {*}
 */
MessageApi.setReaded = function (params) {
    return League.ApiProxy('/message/setReaded', params, '批量设置站内信为已读状态');
};

/**
 * 获取用户未读站内信数量
 * @param params {object} 属性如下
 * type {int} 账号类型(0组织，1团干)
 * @returns {*}
 */
MessageApi.getUnread = function (params) {
    return League.ApiProxy('/message/getUnread', params, '获取用户未读站内信数量');
};