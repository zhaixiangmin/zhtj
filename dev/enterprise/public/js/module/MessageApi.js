/**
 * Created by licong on 2017/11/14.
 */


// 接口对象 -- 团员信息
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
    return Enterprise.ApiProxy('/message/findAllMessage', params, '获取用户的站内信');
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
    return Enterprise.ApiProxy('/message/changeStatus', params, '改变私信的状态');
};