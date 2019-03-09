/**
 * Created by licong on 2017/12/13.
 */
// 推文管理接口对象
var TweetManagementApi = {};


/**
 * 推文管理列表
 * @param params {object} 属性如下
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 */
TweetManagementApi.listByOrg = function (params) {
    return League.ApiProxy('/article/introducedArticle/bg/listByOrg', params, '推文管理列表');
};
//
// /**
//  * 推文发布
//  * @param params {object} 属性如下
//  * type {string} 推文类型(1-精华，2-本地)
//  * title {string} 推文标题()
//  * linkUrl {string} 推文链接()
//  * image {string} 图片路径(可不传)
//  * @returns {*}
//  */
// TweetManagementApi.add = function (params) {
//     return League.ApiProxy('/article/introducedArticle/bg/add', params, '推文发布');
// };

/**
 * 推文移除
 * @param params {object} 属性如下
 * articleId {int} 推文ID
 * @returns {*}
 */
TweetManagementApi.remove = function (params) {
    return League.ApiProxy('/article/introducedArticle/bg/remove', params, '推文移除');
};


/**
 * 推文发布精华
 * @param params {object} 属性如下
 * title {string} 推文标题
 * linkUrl {string} 推文链接
 * image {string} 图片路径(可不传)
 * @returns {*}
 */
TweetManagementApi.addEssence = function (params) {
    return League.ApiProxy('/article/introducedArticle/bg/addEssence', params, '推文发布精华');
};

/**
 * 推文发布本地
 * @param params {object} 属性如下
 * title {string} 推文标题
 * linkUrl {string} 推文链接
 * image {string} 图片路径(可不传)
 * @returns {*}
 */
TweetManagementApi.addNative = function (params) {
    return League.ApiProxy('/article/introducedArticle/bg/addNative', params, '推文发布本地');
};
