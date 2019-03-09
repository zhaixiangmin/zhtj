/**
 * Created by licong on 2017/1/14.
 */
// 公告管理接口对象
var NoticeManagementApi = {};


/**
 * 公告发布
 * @param params {object} 属性如下
 * title {string} 公告标题
 * content {string} 公告内容
 * files {string} 附件路径(可不传,多附件间以逗号分隔)
 */
NoticeManagementApi.add = function (params) {
    return League.ApiProxy('/article/noticeArticle/bg/add', params, '公告发布', true);
};

/**
 * 公告管理列表
 * @param params {object} 属性如下
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
NoticeManagementApi.list = function (params) {
    return League.ApiProxy('/article/noticeArticle/bg/list', params, '公告管理列表');
};

/**
 * 公告删除
 * @param params {object} 属性如下
 * noticeIds {string} 多个公告ID字符串(必传，要批量删除的多个以逗号分隔的公告ID字符串)
 * @returns {*}
 */
NoticeManagementApi.removeBatch = function (params) {
    return League.ApiProxy('/article/noticeArticle/bg/removeBatch', params, '公告删除');
};

/**
 * 公告详情
 * @param params {object} 属性如下
 * id {int} 公告ID
 * @returns {*}
 */
NoticeManagementApi.detail = function (params) {
    return League.ApiProxy('/article/noticeArticle/bg/detail', params, '公告详情');
};

/**
 * 公告编辑
 * @param params {object} 属性如下
 * noticeId {int} 公告ID
 * title {string} 公告标题
 * content {string} 公告内容
 * files {string} 附件路径(可不传,多附件间以逗号分隔)
 * @returns {*}
 */
NoticeManagementApi.edit = function (params) {
    return League.ApiProxy('/article/noticeArticle/bg/edit', params, '公告编辑', true);
};


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
NoticeManagementApi.findAllMessage = function (params) {
    return League.ApiProxy('/message/findAllMessage', params, '获取用户的站内信');
};