/**
 * Created by licong on 2017/10/25.
 */
// 接口对象 -- 奖惩
var AwardsApi = {};

/**
 * 获取审核组织列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * keywords {string} 组织名称
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
AwardsApi.getAuditOrgTree = function (params) {
    return League.ApiProxy('/org/getAuditOrgTree', params, '获取审核组织列表');
};

/**
 * 添加奖励信息
 * @param params {object} 属性如下
 * type {string} 奖励类型(1-团内奖励，2-团外奖励(同一批提交的多份奖励信息，奖励类型相同)  )
 * content {string} 多份奖励名称/内容(多份(可单份)奖励信息中的  奖励名称/内容  拼接字符串，以@@分隔)
 * hasLevels {string} 多份有无奖励等次(多份(可单份)奖励信息中的  有无奖励等次  拼接字符串，以@@分隔)
 * levelName {string} 多份奖励等次名称(多份(可单份)奖励信息中的  奖励等次名称  拼接字符串，以@@分隔)
 * rewardTimes {string} 多份获奖时间(多份(可单份)奖励信息中的  获奖时间  拼接字符串，以@@分隔)
 * awardOrgs {string} 多份授奖组织(多份(可单份)奖励信息中的 授奖组织  拼接字符串，以@@分隔)
 * filesPaths {string} 多份证明附件上传路径(多份(可单份)奖励信息中的 证明附件上传路径  拼接字符串，以@@分隔(单份多图间用逗号分隔))
 * auditOrgIds {string} 多份审核组织ID(type为2团外时必传)
 * @returns {*}
 */
AwardsApi.add = function (params) {
    return League.ApiProxy('/rewardpunish/reward/add', params, '添加奖励信息');
};


/**
 * 我的认证资料
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
AwardsApi.MyProfile = function (params) {
    return League.ApiProxy('/members/app/MyProfile', params, '获取我的认证资料');
};

/**
 * 获取奖励详情
 * @param params {object} 属性如下
 * rewardId {int} 奖励ID
 * @returns {*}
 */
AwardsApi.detail = function (params) {
    return League.ApiProxy('/rewardpunish/reward/detail', params, '获取奖励详情');
};

/**
 * 团员编辑修改奖励信息
 * @param params {object} 属性如下
 * rewardId {string} 奖励ID -- 要修改的奖励ID
 * type  {string} 奖励类型 -- 1-团内奖励，2-团外奖励
 * content {string} 奖励名称/内容
 * hasLevel {string} 有无奖励等次 -- true-有，false-无
 * levelName {string} 奖励等次名称 -- hasLevel为false时，默认传“无等次”
 * rewardTime {string} 获奖时间 -- yyyy-MM-dd格式
 * awardOrg  {string} 授奖组织
 * filesPath  {string} 证明附件上传路径
 * auditOrgId  {string} 审核组织ID
 * @returns {*}
 */
AwardsApi.edit = function (params) {
    return League.ApiProxy('/rewardpunish/reward/edit', params, '获取奖励详情');
};

/**
 * 奖惩证明附件列表查看
 * @param params {object} 属性如下
 * objectId {int} 所属对象ID -- 附件所属对象ID（奖励ID/惩罚ID等）
 * module {int} 所属模块 -- 附件所属模块(1-团员奖励，2-团员惩罚)
 * pageIndex {int} 当前页码(可不传) -- 默认为1
 * pageSize {int} 每页记录数(可不传) -- 默认为8
 * @returns {*}
 */
AwardsApi.list = function (params) {
    return League.ApiProxy('/rewardpunish/attachFile/list', params, '奖惩证明附件列表查看');
};
