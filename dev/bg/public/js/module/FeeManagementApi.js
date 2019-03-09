/**
 * Created by licong on 2017/12/13.
 */
// 团费管理接口对象
var FeeManagementApi = {};


/**
 * 交费档位查询
 * @param params {object} 属性如下
 * 无参数
 */
FeeManagementApi.getAllIncomeBracket = function (params) {
    return League.ApiProxy('/payment/getAllIncomeBracket', params, '交费档位查询');
};


/**
 * 交费档位保存
 * @param params {object} 属性如下
 * incomeBracketStr {string} 交费档位字符串(格式以英文逗号分隔，包括交费档位ID、交费档位名称、团员收入情况和每月应交金额4个项，例如新增两个交费档位：
 ,学生档位,无收入,2,,农民档位,不定收入,2)
 */
FeeManagementApi.saveIncomeBracket = function (params) {
    return League.ApiProxy('/bg/payment/saveIncomeBracket', params, '交费档位保存');
};

/**
 * 获取团费统计
 * @param params {object} 属性如下
 * month {string} 月份
 * oid {int} 组织ID
 * sub {int} 下级标记(0：本级；1：下级)
 * @returns {*}
 */
FeeManagementApi.getPaymentStatistics = function (params) {
    return League.ApiProxy('/bg/getPaymentStatistics', params, '获取团费统计');
};

/**
 * 获取可查询团费交纳情况的月份
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeManagementApi.getPaymentTime = function (params) {
    return League.ApiProxy('/bg/getPaymentTime', params, '获取可查询团费交纳情况的月份');
};

/**
 * 获得所在组织及下一级组织列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeManagementApi.orgListCurrNextLv = function (params) {
    return League.ApiProxy('/bg/org/orgListCurrNextLv', params, '获得所在组织及下一级组织列表');
};

/**
 * 获取本组织收到的凭证
 * @param params {object} 属性如下
 * months {string} 月份
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
FeeManagementApi.getReceiveCredentials = function (params) {
    return League.ApiProxy('/bg/getReceiveCredentials', params, '获取本组织收到的凭证');
};

/**
 * 已收/已发凭证 - 返还月份下拉框取值
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeManagementApi.publicCredentialsTimes = function (params) {
    return League.ApiProxy('/bg/publicCredentialsTimes', params, '返还月份下拉框取值');
};

/**
 * 获取本组织的虚拟账户金额
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeManagementApi.getVirtualAmount = function (params) {
    return League.ApiProxy('/bg/getVirtualAmount', params, '获取本组织的虚拟账户金额');
};

/**
 * 获得未公示凭证的下级组织
 * @param params {object} 属性如下
 * months {string} 月份
 * @returns {*}
 */
FeeManagementApi.unpublicizedNextLvOrgList = function (params) {
    return League.ApiProxy('/bg/org/unpublicizedNextLvOrgList', params, '获得未公示凭证的下级组织');
};

/**
 * 公示凭证
 * @param params {object} 属性如下
 * months {string} 月份(201706)
 * toOid {int} 接收凭证的下级组织ID
 * amount {string} 返回金额
 * @returns {*}
 */
FeeManagementApi.publicCredentials = function (params) {
    return League.ApiProxy('/bg/publicCredentials', params, '公示凭证');
};

/**
 * 核实凭证
 * @param params {object} 属性如下
 * cid {int} 凭证ID
 * @returns {*}
 */
FeeManagementApi.proveCredentials = function (params) {
    return League.ApiProxy('/bg/proveCredentials', params, '核实凭证');
};

/**
 * 获取本组织发送的凭证
 * @param params {object} 属性如下
 * months {string} 月份
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
FeeManagementApi.getSendCredentials = function (params) {
    return League.ApiProxy('/bg/getSendCredentials', params, '获取本组织发送的凭证');
};

/**
 * 撤销凭证
 * @param params {object} 属性如下
 * cid {int} 凭证ID
 * @returns {*}
 */
FeeManagementApi.annulCredentials = function (params) {
    return League.ApiProxy('/bg/annulCredentials', params, '撤销凭证');
};


/**
 * 根据当前登录获取团员列表所在组织
 * @param params {object} 属性如下
 * type {int} 类型(1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部 -- 空查全部)
 * fullName {string} 组织全称
 * @returns {*}
 */
FeeManagementApi.orgList = function (params) {
    return League.ApiProxy('/bg/org/orgList', params, '根据当前登录获取团员列表所在团支部');
};

/**
 * 查询已收凭证的公示轨迹
 * @param params {object} 属性如下
 * cid {int} 凭证ID
 * @returns {*}
 */
FeeManagementApi.getReceiveCredentialsTrack = function (params) {
    return League.ApiProxy('/bg/getReceiveCredentialsTrack', params, '查询已收凭证的公示轨迹');
};

/**
 * 查询已发凭证的公示轨迹
 * @param params {object} 属性如下
 * cid {int} 凭证ID
 * @returns {*}
 */
FeeManagementApi.getSendCredentialsTrack = function (params) {
    return League.ApiProxy('/bg/getSendCredentialsTrack', params, '查询已发凭证的公示轨迹');
};

/**
 * 分页获取组织团费留存比例记录
 * @param params {object} 属性如下
 * oid {int} 组织ID
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
FeeManagementApi.getAppropriateRetentionList = function (params) {
    return League.ApiProxy('/bg/getAppropriateRetentionList', params, '分页获取组织团费留存比例记录');
};

/**
 * 新增组织留存比例
 * @param params {object} 属性如下
 * oid {int} 组织ID
 * account {int} 银行账户
 * retention {int} 留存比例(0-100的整数)
 * @returns {*}
 */
FeeManagementApi.addAppropriateRetention = function (params) {
    return League.ApiProxy('/bg/addAppropriateRetention', params, '新增组织留存比例');
};

/**
 * 修改组织留存比例
 * @param params {object} 属性如下
 * id {int} 记录ID
 * retention {int} 留存比例(0-100的整数)
 * @returns {*}
 */
FeeManagementApi.editAppropriateRetention = function (params) {
    return League.ApiProxy('/bg/editAppropriateRetention', params, '修改组织留存比例');
};

/**
 * 删除组织留存比例
 * @param params {object} 属性如下
 * id {int} 记录ID
 * @returns {*}
 */
FeeManagementApi.delAppropriateRetention = function (params) {
    return League.ApiProxy('/bg/delAppropriateRetention', params, '删除组织留存比例');
};

/**
 * 导入组织留存比例
 * @param params {object} 属性如下
 * uploadExcelPath {string} 上传的文件路径
 * @returns {*}
 */
FeeManagementApi.importAppropriateRetention = function (params) {
    return League.ApiProxy('/bg/importAppropriateRetention', params, '导入组织留存比例');
};

/**
 * 分页获取组织交费详情
 * @param params {object} 属性如下
 * oid {int} 组织ID
 * month {string} 月份(默认月份为上个月)
 * status {int} 交纳状态(0未交；1已交)
 * mobile {string} 手机号码
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
FeeManagementApi.getPaymentStatisticsDetails = function (params) {
    return League.ApiProxy('/bg/getPaymentStatisticsDetails', params, '分页获取组织交费详情');
};

/**
 * 分页获取组织收到的团费划拨记录
 * @param params {object} 属性如下
 * startTime {string} 开始时间(单位：月份)
 * endTime {string} 结束时间(单位：月份)
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
FeeManagementApi.getAppropriateRecord = function (params) {
    return League.ApiProxy('/bg/getAppropriateRecord', params, '分页获取组织收到的团费划拨记录');
};

/**
 * 获取当前组织账户余额
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
FeeManagementApi.getBalance = function (params) {
    return League.ApiProxy('/bg/getBalance', params, '获取当前组织账户余额');
};

/**
 * 团费划拨轨迹
 * @param params {object} 属性如下
 * id {int} 划拨记录ID
 * level {int} 组织树层级
 * @returns {*}
 */
FeeManagementApi.getAppropriateTrack = function (params) {
    return League.ApiProxy('/bg/getAppropriateTrack', params, '团费划拨轨迹');
};