/**
 * Created by licong on 2017/10/9.
 */
// 团干管理接口对象
var TalentApi = {};


/**
 * 获取收入列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
TalentApi.income = function (params) {
    return League.ApiProxyJson('../../public/json/income.json', params, '获取收入列表');
};

// 获取是否列表(1：是，2：否)
TalentApi.yesOrNo = function (params) {
    return League.ApiProxyJson('../../public/json/yesOrNo.json', params, '获取是否列表');
};

/**
 * 获取团内现任职务列表
 * @param params {object} 属性如下
 * 无参数
 */
TalentApi.getIncumbentList= function (params) {
    return League.ApiProxyJson('../../public/json/incumbent.json', params, '获取团内现任职务列表');
};

/**
 * 获取民族列表
 * @param params {object} 属性如下
 * 无参数
 */
TalentApi.getNationList= function (params) {
    return League.ApiProxyJson('../../public/json/nation.json', params, '获取民族列表');
};

/**
 * 获取政治面貌列表
 * @param params {object} 属性如下
 * 无参数
 */
TalentApi.getPoliticalOutlookList = function (params) {
    return League.ApiProxyJson('../../public/json/politicalOutlook.json', params, '获取政治面貌列表');
};

/**
 * 获取政治面貌列表(团员)
 * @param params {object} 属性如下
 * 无参数
 */
TalentApi.getMemberPoliticalOutlookList = function (params) {
    return League.ApiProxyJson('../../public/json/MemberPoliticalOutlook.json', params, '获取政治面貌列表');
};

/**
 * 获取全日制学历/最高学历列表
 * @param params {object} 属性如下
 * 无参数
 */
TalentApi.getHighestEducationList = function (params) {
    return League.ApiProxyJson('../../public/json/highestEducation.json', params, '获取全日制学历/最高学历列表');
};

/**
 * 获取职业列表
 * @param params {object} 属性如下
 * 无参数
 */
TalentApi.getOccupationList = function (params) {
    return League.ApiProxyJson('../../public/json/occupation.json', params, '获取职业列表');
};

/**
 * 获取审核状态列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
TalentApi.auditStatus = function (params) {
    return League.ApiProxyJson('../../public/json/auditStatus.json', params, '获取审核状态列表');
};

/**
 * 获取是否通过列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
TalentApi.passOrNot = function (params) {
    return League.ApiProxyJson('../../public/json/passOrNot.json', params, '获取是否通过列表');
};

/**
 * 获取团干部性质列表
 * @param params {object} 属性如下
 * 无参数
 */
TalentApi.getTuanganProperties = function (params) {
    return League.ApiProxyJson('../../public/json/tuanganProperties.json', params, '获取团干部性质列表');
};


/**
 * 南粤青年人才列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，为空=1)
 * rows {int} 每页显示条数(可不传，为空=10)
 * name {string} 团员姓名
 * mobile {string} 手机号码
 * degreeOfEducation {int} 全日制学历(可不传，1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
 */
TalentApi.talentList = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/bg/list', params, '南粤青年人才列表');
};

/**
 * 根据组织名称获取团支部组织
 * @param params {object} 属性如下
 * page {int} 当前页
 * rows {int} 每页显示条数
 * fullName {string} 组织全称
 * name {string} 组织简称
 * @returns {*}
 */
TalentApi.getOrgByName = function (params) {
    return League.ApiProxy('/bg/org/getOrgByName', params, '根据组织名称获取团支部组织');
};

/**
 * 南粤青年人才新增
 * @param params {object} 属性如下
 * name {string} 姓名
 * sex {string} 性别
 * idCard {string} 身份证
 * nation {string} 民族
 * nationInfo {string} 民族输入框
 * politicalOutlook {string} 政治面貌
 * degreeOfEducation {string} 全日制学历
 * occupation {string} 职业
 * tuanganProperties {string} 团干部性质
 * oid {string} 所在团组织
 * isPartyCommitteeMember {string} 是否为同级党委委员
 * learningUnit {string} 学习工作单位
 * professionalTechnicalQualification {string} 专业技术资格
 * mobile {string} 手机号码
 * email {string} 邮箱
 * qqNum {string} QQ号
 * wechatId {string} 微信id
 * weibo {string} 微博
 * incumbent {string} 团内现任职务
 * incumbentDesc {string} 职务名称/描述
 * dateOfDuty {string} 任现职年月
 * dutyStyle {string} 任现职方式
 * workUnit {string} 工作单位(多个用@@隔开)
 * unitDuty {string} 单位职务(多个用@@隔开)
 * rzsj {string} 任职时间(多个用@@隔开)
 * @returns {*}
 */
TalentApi.talentAdd = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/bg/add', params, '南粤青年人才新增');
};

/**
 * 南粤青年人才删除
 * @param params {object} 属性如下
 * gytpid {int} 南粤人才id
 * @returns {*}
 */
TalentApi.talentDelete = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/bg/delete', params, '南粤青年人才删除');
};

/**
 * 根据南粤青年人才ID获取详情
 * @param params {object} 属性如下
 * gytpid {int} 南粤青年人才id
 * @returns {*}
 */
TalentApi.getGdYouthTalentPoolsById = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/all/getGdYouthTalentPoolsById', params, '根据南粤青年人才ID获取详情');
};

/**
 * 南粤青年人才修改
 * @param params {object} 属性如下
 * gytpid {int} 南粤青年人才id
 * name {string} 姓名
 * sex {string} 性别
 * idCard {string} 身份证
 * nation {string} 民族
 * nationInfo {string} 民族输入框
 * politicalOutlook {string} 政治面貌
 * degreeOfEducation {string} 全日制学历
 * occupation {string} 职业
 * tuanganProperties {string} 团干部性质
 * oid {string} 所在团组织
 * isPartyCommitteeMember {string} 是否为同级党委委员
 * learningUnit {string} 学习工作单位
 * professionalTechnicalQualification {string} 专业技术资格
 * mobile {string} 手机号码
 * email {string} 邮箱
 * qqNum {string} QQ号
 * wechatId {string} 微信id
 * weibo {string} 微博
 * incumbent {string} 团内现任职务
 * incumbentDesc {string} 职务名称/描述
 * dateOfDuty {string} 任现职年月
 * dutyStyle {string} 任现职方式
 * workUnit {string} 工作单位(多个用@@隔开)
 * unitDuty {string} 单位职务(多个用@@隔开)
 * rzsj {string} 任职时间(多个用@@隔开)
 * @returns {*}
 */
TalentApi.talentEdit = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/bg/edit', params, '南粤青年人才修改');
};

/**
 * 团组织批量录入南粤青年的奖励信息
 * @param params {object} 属性如下
 * talentPoolId {string} 南粤青年ID(要录入的青年人才ID)
 * contents {string} 多份奖励名称/内容(多份(可单份)奖励信息中的  奖励名称/内容  拼接字符串，以@@分隔)
 * hasLevels  {string} 多份有无奖励等次(多份(可单份)奖励信息中的  有无奖励等次  拼接字符串，以@@分隔)
 * levelNames {string} 多份奖励等次名称(多份(可单份)奖励信息中的  奖励等次名称  拼接字符串，以@@分隔)
 * rewardTimes  {string} 多份获奖时间(多份(可单份)奖励信息中的  获奖时间  拼接字符串，以@@分隔，yyyy-MM-dd格式)
 * filesPaths {string} 证明附件上传路径(多份(可单份)奖励信息中的 证明附件上传路径  拼接字符串，以@@分隔(单份多图间用逗号分隔))
 * @returns {*}
 */
TalentApi.talentRewardAdd = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/reward/bg/add', params, '团组织批量录入南粤青年的奖励信息');
};

/**
 * 获取单个南粤青年的奖励信息列表
 * @param params {object} 属性如下
 * talentPoolId {int} 南粤人才ID(必传)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
TalentApi.rewardListByTalent = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/reward/bg/listByTalent', params, '获取单个南粤青年的奖励信息列表');
};

/**
 * 团组织(批量)删除南粤青年的奖励信息
 * @param params {object} 属性如下
 * talentPoolRewardIds {string} 南粤青年人才奖励ID字符串(要删除的多个奖励ID字符串，以逗号分隔)
 * @returns {*}
 */
TalentApi.talentRewardDeleteBatch = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/reward/bg/deleteBatch', params, '团组织(批量)删除南粤青年的奖励信息');
};

/**
 * 奖惩证明附件列表查看
 * @param params {object} 属性如下
 * objectId {int} 所属对象ID -- 附件所属对象ID（奖励ID/惩罚ID等）
 * module {int} 所属模块 -- 附件所属模块(1-团员奖励附件，2-团员惩罚附件，3-公告附件，4-南粤青年人才奖励附件)
 * pageIndex {int} 当前页码(可不传) -- 默认为1
 * pageSize {int} 每页记录数(可不传) -- 默认为8
 * @returns {*}
 */
TalentApi.attachFileList = function (params) {
    return League.ApiProxy('/rewardpunish/attachFile/list', params, '奖惩证明附件列表查看');
};

/**
 * 团组织编辑修改南粤青年的奖励信息
 * @param params {object} 属性如下
 * talentPoolRewardId {int} 南粤青年人才奖励ID
 * content {string} 多份奖励名称/内容
 * hasLevel  {string} 多份有无奖励等次
 * levelName {string} 多份奖励等次名称
 * rewardTime  {string} 多份获奖时间
 * filesPath {string} 证明附件上传路径(多附件间用逗号分隔)
 * @returns {*}
 */
TalentApi.talentRewardEdit = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/reward/bg/edit', params, '团组织编辑修改南粤青年的奖励信息');
};

/**
 * 获取单个南粤青年奖励详细信息
 * @param params {object} 属性如下
 * talentPoolRewardId {int} 南粤青年人才奖励ID
 * @returns {*}
 */
TalentApi.talentRewardDetail = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/reward/bg/detail', params, '获取单个南粤青年奖励详细信息');
};

/**
 * 团组织批量录入南粤青年的工作履历
 * @param params {object} 属性如下
 * talentPoolId {int} 南粤青年ID(要录入的青年人才ID)
 * workUnits {string} 多份工作单位(多份(可单份)工作履历中的 工作单位 拼接字符串，以@@分隔)
 * unitDutys {string} 多份单位职务(多份(可单份)工作履历中的 单位职务 拼接字符串，以@@分隔)
 * tenureTimes  {string} 多份任职时间(多份(可单份)工作履历中的 任职时间 拼接字符串，以@@分隔，yyyy-MM格式)
 * @returns {*}
 */
TalentApi.talentWorkResumeAdd = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/workResume/bg/add', params, '团组织批量录入南粤青年的工作履历');
};

/**
 * 获取单个南粤青年的工作履历列表
 * @param params {object} 属性如下
 * talentPoolId {int} 南粤人才ID(必传)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
TalentApi.workResumeListByTalent = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/workResume/bg/listByTalent', params, '获取单个南粤青年的工作履历列表');
};

/**
 * 团组织(批量)删除南粤青年的工作履历
 * @param params {object} 属性如下
 * workResumeIds {int} 南粤青年工作履历ID字符串(要删除的多个工作履历ID字符串，以逗号分隔)
 * @returns {*}
 */
TalentApi.talentWorkResumedeleteBatch = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/workResume/bg/deleteBatch', params, '团组织(批量)删除南粤青年的工作履历');
};

/**
 * 获取单个南粤青年工作履历详细信息
 * @param params {object} 属性如下
 * workResumeId {int} 南粤青年人才工作履历ID
 * @returns {*}
 */
TalentApi.talentWorkResumeDetail = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/workResume/bg/detail', params, '获取单个南粤青年工作履历详细信息');
};

/**
 * 团组织编辑修改南粤青年的工作履历
 * @param params {object} 属性如下
 * workResumeId {int} 南粤青年人才工作履历ID(要修改的南粤青年工作履历ID)
 * workUnit {string} 工作单位
 * unitDuty {string} 单位职务
 * tenureTime  {string} 任职时间
 * @returns {*}
 */
TalentApi.talentWorkResumeEdit = function (params) {
    return League.ApiProxy('/gdYouthTalentPool/workResume/bg/edit', params, '团组织编辑修改南粤青年的工作履历');
};