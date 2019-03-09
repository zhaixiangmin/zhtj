/**
 * Created by licong on 2017/10/9.
 */
// 团干管理接口对象
var LeagueMemberApi = {};

/**
 * 团员列表
 * @param params {object} 属性如下
 * page {int} 当前页(可不传，为空=1)
 * rows {int} 每页显示条数(可不传，为空=10)
 * degreeOfEducation {int} 全日制学历(可不传，1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
 * auditStatus {int} 审核状态(可不传，1:报到待审核2:报到被退回,3:审核通过4:修改资料待审核,5:修改资料被退回)
 * mobile {string} 手机号码
 * oid {int} 所在团支部(组织ID)(可不传，调接口)
 * name {string} 团员姓名
 */
LeagueMemberApi.list = function (params) {
    return League.ApiProxy('/members/bg/list', params, '团员列表');
};

/**
 * 获取省级数据
 * @param params 属性如下
 * 无参数
 * @returns {*}
 */
LeagueMemberApi.getDistrictByLevel = function (params) {
    return League.ApiProxy('/district/getDistrictByLevel', params, '获取省级数据');
};

/**
 * 根据省级ID查询市级
 * @param params {object} 属性如下
 * did {string} 地市id
 * @returns {*}
 */
LeagueMemberApi.getDistrictByPid = function (params) {
    return League.ApiProxy('/district/getDistrictByPid', params, '根据省级ID查询市级');
};

/**
 * 团员修改
 * @param params {object} 属性如下
 * mid {int} 团员id
 * name {string} 姓名
 * idCard {string} 身份证
 * rtny {string} 入团年月
 * income {int} 收入(1=2000 元以下，２：2000元至5000 元，３：5000元至8000 元，４：8000元至10000 元，５：10000 元以上)
 * isCadres {int} 是否为团干部(1: 是，2：否)
 * nation {int} 民族((1++)汉族,壮族,满族,回族,苗族,维吾尔族,土家族,彝族,蒙古族,藏族,布依族,侗族,瑶族,朝鲜族,白族,哈呢 族,哈萨克族,黎族,傣族,畲族,僳僳族,仡佬族,东乡族,拉祜族,水族,佤族,纳西族,羌族,土族,仫佬族,锡伯族, 柯尔克孜族,达斡尔族,景颇族,毛南族,撒拉族,布朗族,塔吉克族,阿昌族,普米族,鄂温克族,怒族,京族,基诺 族,德昂族,保安族,俄罗斯族,裕固族,乌孜别克族,门巴族,鄂伦春族,独龙族,塔塔尔族,赫哲族,高山族,珞巴族)
 * politicalOutlook {int} 政治面貌(1:团员,2:党员)
 * degreeOfEducation {int} 全日制学历(1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
 * highestEducation {int} 最高学历(1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
 * provinceDid {string} 地市省份ID(调接口)
 * cityDid {string} 地市市级ID(调接口)
 * mobile {string} 手机号码
 * occupation {int} 职业(可不传，(1++)国有企业职工、非公企业职工、机关事业单位职工、社会组织员工、农民、学生、自由职业者、公办高校教职工、公办中学教职工、公办中职教职工、民办高校教职工、民办中学教职工、民办中职教职工、其他)
 * learningUnit {string} 学习工作单位(可不传)
 * email {string} 电子邮件(可不传)
 * qqNum {int} Qq号码(可不传)
 * wechatId {string} 微信ID(可不传)
 * weibo {string} 微博(可不传)
 * developmentMemberNumber {string} 团员编号(可不传)
 * incumbent {string} 团内现任职务）(可不传)
 * xzzny {string} 任现职年月(可不传)
 * tuanganProperties {string} 团干部性质(可不传)
 * isPartyCommitteeMember {int} 是否同级党委（支部）成员(可不传)
 * rdny {string} 入党年月(可不传)
 * zczyzsj {string} 注册志愿者时间(可不传)
 * oid {int} 所在团支部ID(调接口)
 * qnzsId {string} 青年之声userName(前端获取当前登录青年之声的userName)
 * photoUrl {string} 青年之声头像(前端获取当前登录青年之声的头像)
 * @returns {*}
 */
LeagueMemberApi.edit = function (params) {
    return League.ApiProxy('/members/bg/edit', params, '团员修改');
};

/**
 * 根据当前登录获取团员列表所在组织
 * @param params {object} 属性如下
 * type {int} 类型(1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部 -- 空查全部)
 * @returns {*}
 */
LeagueMemberApi.orgList = function (params) {
    return League.ApiProxy('/bg/org/orgList', params, '根据当前登录获取团员列表所在团支部');
};

/**
 * 团员审核
 * @param params {object} 属性如下
 * mid {int} 团员id
 * auditStatus {int} 审核状态(1:报到待审核2:报到被退回,3:审核通过4:修改资料待审核,5:修改资料被退回)
 * returnReason {string} 退回原因(2:报到被退回,5:修改资料被退回时传)
 * @returns {*}
 */
LeagueMemberApi.audit = function (params) {
    return League.ApiProxy('/members/bg/audit', params, '团员审核');
};

/**
 * 获取收入列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
LeagueMemberApi.income = function (params) {
    return League.ApiProxyJson('../../public/json/income.json', params, '获取收入列表');
};

// 获取是否列表(1：是，2：否)
LeagueMemberApi.yesOrNo = function (params) {
    return League.ApiProxyJson('../../public/json/yesOrNo.json', params, '获取是否列表');
};

/**
 * 获取团内现任职务列表
 * @param params {object} 属性如下
 * 无参数
 */
LeagueMemberApi.getIncumbentList= function (params) {
    return League.ApiProxyJson('../../public/json/incumbent.json', params, '获取团内现任职务列表');
};

/**
 * 获取民族列表
 * @param params {object} 属性如下
 * 无参数
 */
LeagueMemberApi.getNationList= function (params) {
    return League.ApiProxyJson('../../public/json/nation.json', params, '获取民族列表');
};

/**
 * 获取政治面貌列表
 * @param params {object} 属性如下
 * 无参数
 */
LeagueMemberApi.getPoliticalOutlookList = function (params) {
    return League.ApiProxyJson('../../public/json/politicalOutlook.json', params, '获取政治面貌列表');
};

/**
 * 获取政治面貌列表(团员)
 * @param params {object} 属性如下
 * 无参数
 */
LeagueMemberApi.getMemberPoliticalOutlookList = function (params) {
    return League.ApiProxyJson('../../public/json/MemberPoliticalOutlook.json', params, '获取政治面貌列表');
};

/**
 * 获取全日制学历/最高学历列表
 * @param params {object} 属性如下
 * 无参数
 */
LeagueMemberApi.getHighestEducationList = function (params) {
    return League.ApiProxyJson('../../public/json/highestEducation.json', params, '获取全日制学历/最高学历列表');
};

/**
 * 获取职业列表
 * @param params {object} 属性如下
 * 无参数
 */
LeagueMemberApi.getOccupationList = function (params) {
    return League.ApiProxyJson('../../public/json/occupation.json', params, '获取职业列表');
};

/**
 * 获取审核状态列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
LeagueMemberApi.auditStatus = function (params) {
    return League.ApiProxyJson('../../public/json/auditStatus.json', params, '获取审核状态列表');
};

/**
 * 获取是否通过列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
LeagueMemberApi.passOrNot = function (params) {
    return League.ApiProxyJson('../../public/json/passOrNot.json', params, '获取是否通过列表');
};

/**
 * 获取团干部性质列表
 * @param params {object} 属性如下
 * 无参数
 */
LeagueMemberApi.getTuanganProperties = function (params) {
    return League.ApiProxyJson('../../public/json/tuanganProperties.json', params, '获取团干部性质列表');
};

/**
 * 交费档位查询
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
LeagueMemberApi.getAllIncomeBracket = function (params) {
    return League.ApiProxy('/payment/getAllIncomeBracket', params, '交费档位查询');
};

/**
 * 获取单个审核组织需要审核的奖励记录列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * pageIndex {int} 当前页码
 * pageSize {int} 每页记录数(可不传，默认为1)
 * @returns {*}
 */
LeagueMemberApi.listByOrg = function (params) {
    return League.ApiProxy('/rewardpunish/reward/bg/listByOrg', params, '获取单个审核组织需要审核的奖励记录列表');
};

/**
 * 团组织批量审核团员的多份奖励信息
 * @param params {object} 属性如下
 * rewardIds {string} 奖励ID -- 多份(可单份)奖励信息中的  编号ID 拼接字符串，以特殊符号@@分隔
 * results {string} 多份审核结果(1-通过/同意，2-退回/拒绝)) -- 多份(可单份)奖励信息中的 审核结果 拼接字符串，以特殊符号@@分隔
 * returnReasons {string} 多份退回原因 -- 多份(可单份)奖励信息中的 退回原因  拼接字符串，以特殊符号@@分隔
 * @returns {*}
 */
LeagueMemberApi.rewardAudit = function (params) {
    return League.ApiProxy('/rewardpunish/reward/bg/audit', params, '团组织批量审核团员的多份奖励信息');
};

/**
 * 批量奖励录入(团组织为批量团员录入奖励信息提交)
 * @param params {object} 属性如下
 * memberIds {string} 多个团员ID字符串 -- 要批量或单个录入的团员ID字符串,以@@分隔
 * content {string} 奖励名称/内容 -- 奖励名称/内容
 * hasLevel {string} 有无奖励等次 -- 有无奖励等次
 * levelName {string} 奖励等次名称 -- (true-有，false-无)
 * rewardTime {string} 获奖时间 -- 奖励等次名称
 * awardOrg {string} 授奖组织 -- (hasLevel为false时，默认传“无等次”)
 * filesPath {string} 证明附件 -- 获奖时间(yyyy-MM-dd格式)
 * @returns {*}
 */
LeagueMemberApi.addBatch = function (params) {
    return League.ApiProxy('/rewardpunish/reward/bg/addBatch', params, '批量奖励录入');
};

/**
 * 批量惩罚录入(团组织为批量团员录入惩罚信息提交)
 * @param params {object} 属性如下
 * memberIds {string} 多个团员ID字符串 -- 要批量或单个录入的团员ID字符串,以@@分隔
 * content {string} 处罚名称/内容 -- 处罚名称/内容
 * punishTime {string} 处罚时间 -- yyyy-MM-dd格式
 * relieveTime {string} 解除时间 -- yyyy-MM-dd格式
 * filesPath {string} 证明附件 -- 证明附件上传路径 (多附件间用逗号分隔)
 * @returns {*}
 */
LeagueMemberApi.addBatchPunishment = function (params) {
    return League.ApiProxy('/rewardpunish/punishment/bg/addBatch', params, '批量惩罚录入');
};

/**
 * 从团员Excel模板文件导入团员身份证匹配身份证获取团员列表
 * @param params {object} 属性如下
 * uploadExcelPath {int} 上传Excel文件路径(上传Excel文件路径)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为20)
 * @returns {*}
 */
LeagueMemberApi.listByExcelImport = function (params) {
    return League.ApiProxy('/members/bg/listByExcelImport', params, '从团员Excel模板文件导入团员身份证匹配身份证获取团员列表');
};

/**
 * 团组织查看单个团员的奖励信息列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * type {int} 奖励类型(1-团内奖励，2-团外奖励)
 * status {int} 奖励状态(0：待审核，1：同意，2：退回)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
LeagueMemberApi.rewardList = function (params) {
    return League.ApiProxy('/rewardpunish/reward/bg/listByMember', params, '团组织查看单个团员的奖励信息列表');
};

/**
 * 团组织查看单个团员的惩罚信息列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
LeagueMemberApi.punishmentList = function (params) {
    return League.ApiProxy('/rewardpunish/punishment/bg/listByOrg', params, '团组织查看单个团员的惩罚信息列表');
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
LeagueMemberApi.attachFileList = function (params) {
    return League.ApiProxy('/rewardpunish/attachFile/list', params, '奖惩证明附件列表查看');
};

/**
 * 团组织(批量)移除(删除)团员的奖励信息
 * @param params {object} 属性如下
 * rewardIds {string} 奖励ID字符串(要删除的多个奖励ID字符串，以逗号分隔)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
LeagueMemberApi.rewardRemoveBatch = function (params) {
    return League.ApiProxy('/rewardpunish/reward/bg/removeBatch', params, '团组织(批量)移除(删除)团员的奖励信息');
};

/**
 * 获取奖励详情
 * @param params {object} 属性如下
 * rewardId {int} 奖励ID
 * @returns {*}
 */
LeagueMemberApi.rewardDetail = function (params) {
    return League.ApiProxy('/rewardpunish/reward/detail', params, '获取奖励详情');
};

/**
 * 获取审核组织列表
 * @param params {object} 属性如下
 * memberId {int} 团员ID
 * keywords {string} 组织名称
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
LeagueMemberApi.getAuditOrgTree = function (params) {
    return League.ApiProxy('/org/getAuditOrgTree', params, '获取审核组织列表');
};

/**
 * 团组织编辑修改团员的奖励信息
 * @param params {object} 属性如下
 * rewardId {int} 奖励ID(要修改的奖励ID)
 * content {string} 奖励名称/内容(奖励名称/内容)
 * hasLevel {boolean} 有无奖励等次(有无奖励等次)
 * levelName {string} 奖励等次名称(true-有，false-无)
 * rewardTime  {string} 获奖时间(奖励等次名称)
 * awardOrg  {string} 授奖组织(hasLevel为false时，默认传“无等次”)
 * filesPath  {string} 证明附件上传路径(获奖时间(yyyy-MM-dd格式))
 * @returns {*}
 */
LeagueMemberApi.rewardEdit = function (params) {
    return League.ApiProxy('/rewardpunish/reward/bg/edit', params, '团组织编辑修改团员的奖励信息');
};

/**
 * 团组织(批量)移除(删除)团员的惩罚信息
 * @param params {object} 属性如下
 * punishIds {string} 处罚ID字符串(要删除的多个处罚ID字符串，以逗号分隔)
 * @returns {*}
 */
LeagueMemberApi.punishmentRemoveBatch = function (params) {
    return League.ApiProxy('/rewardpunish/punishment/bg/removeBatch', params, '团组织(批量)移除(删除)团员的惩罚信息');
};

/**
 * 获取处罚详细信息
 * @param params {object} 属性如下
 * punishId {int} 处罚ID
 * @returns {*}
 */
LeagueMemberApi.punishmentDetail = function (params) {
    return League.ApiProxy('/rewardpunish/punishment/detail', params, '获取处罚详细信息');
};

/**
 * 团组织编辑修改团员的惩罚信息
 * @param params {object} 属性如下
 * punishId {string} 处罚ID(要修改的处罚ID)
 * content {string} 处罚名称/内容(处罚名称/内容)
 * punishTime {string} 处罚时间(处罚时间)
 * relieveTime {string} 解除时间(解除时间)
 * filesPath {string} 证明附件(证明附件上传路径 (多附件间用逗号分隔))
 * @returns {*}
 */
LeagueMemberApi.punishmentEdit = function (params) {
    return League.ApiProxy('/rewardpunish/punishment/bg/edit', params, '团组织编辑修改团员的惩罚信息');
};

/**
 * 团员删除申请
 * @param params {object} 属性如下
 * mid {int} 团员id
 * @returns {*}
 */
LeagueMemberApi.applyForDeletion = function (params) {
    return League.ApiProxy('/members/bg/applyForDeletion', params, '团员删除申请');
};

/**
 * 团员确认删除
 * @param params {object} 属性如下
 * mid {int} 团员id
 * state {int} 状态(1：同意：2：退回)
 * @returns {*}
 */
LeagueMemberApi.confirmDeletion = function (params) {
    return League.ApiProxy('/members/bg/confirmDeletion', params, '团员确认删除');
};



/**
 * 根据ID获取团员
 * @param params {object} 属性如下
 * mid {int} 团员ID
 * @returns {*}
 */
LeagueMemberApi.getMembersById = function (params) {
    return League.ApiProxy('/members/app/getMembersById', params, '根据ID获取团员');
};

/**
 * 根据团员ID查询转接记录
 * @param params {object} 属性如下
 * mid {int} 团员ID
 * auditStatus {int} 接转状态（1:转出团支部待审核,2:转出团支部的上级待审核,3:转入团支部待审核,4:转入团支部的上级待审核,5:接转成功,6:转出团支部退回,7:转出团支部的上级退回,8:转入团支部退回,9:转入团支部的上级退回,10:转出团支部同意,11:转出团支部的上级同意,12:转入团支部同意,13:转入团支部的上级同意）
 * @returns {*}
 */
LeagueMemberApi.applyListByMid = function (params) {
    return League.ApiProxy('/orgTransfer/all/applyListByMid', params, '根据团员ID查询转接记录');
};

/**
 * 生成电子团员证获取信息
 * @param params {object} 属性如下
 * memberId {int} 团员ID -- 要查看的团员ID
 * showMemberAdditionNames {string} 多个团员附加信息名称-- 要显示的多个团员附加信息名称，以逗号分隔(此参数必传，值可为空)
 * showMemberRewardIds {string} 多个团员奖励记录ID -- 要显示的多个团员奖励记录ID，以逗号分隔(此参数必传，值可为空)
 * @returns {*}
 */
LeagueMemberApi.leagueCardPreview = function (params) {
    return League.ApiProxy('/pdfCertificate/leagueCard/preview', params, '生成电子团员证获取信息');
};

/**
 * 团员离脱退团及开除团籍申请
 * @param params {object} 属性如下
 * mid {int} 团员id
 * disabled {int} 团籍状态(0-正常,1-禁用.2:满28周岁已离团,3:满28周岁离团待审核,4:已自行脱团,5:自行脱团待审核,6:已自愿退团,7:自愿退团待审核,8:已开除团籍,9:开除团籍待审核)
 * retreatReasonForApplication {int} 申请理由(Disabled=4必填)
 * retreatApplicationDescription {int} 申请说明
 * retreatAttachmentUrl {string} 上传证明材料(多个)
 * @returns {*}
 */
LeagueMemberApi.retreatApply = function (params) {
    return League.ApiProxy('/members/bg/retreatApply', params, '团员离脱退团及开除团籍申请');
};

/**
 * 团员离脱退团及开除团籍审核
 * @param params {object} 属性如下
 * mid {int} 团员id
 * auditStatus {int} 团籍状态 -- 1：通过，2不通过
 * @returns {*}
 */
LeagueMemberApi.retreatAudit = function (params) {
    return League.ApiProxy('/members/bg/retreatAudit', params, '团员离脱退团及开除团籍审核');
};

/**
 * 已脱/退团及开除团籍列表
 * @param params {object} 属性如下
 * page {int} 当前页（为空=1）
 * rows {int} 每页显示条数（为空=10）
 * @returns {*}
 */
LeagueMemberApi.retiredGroupAndDismissedGroupList = function (params) {
    return League.ApiProxy('/members/bg/retiredGroupAndDismissedGroupList', params, '已脱/退团及开除团籍列表');
};

/**
 * 满28岁已离团列表
 * @param params {object} 属性如下
 * page {int} 当前页（为空=1）
 * rows {int} 每页显示条数（为空=10）
 * @returns {*}
 */
LeagueMemberApi.leftAt28YearsOldList = function (params) {
    return League.ApiProxy('/members/bg/leftAt28YearsOldList', params, '满28岁已离团列表');
};

/**
 * 
 * @param params {object} 属性如下
 * mid {int} 团员id
 * oid {int} 组织id
 * @returns {*}
 */
LeagueMemberApi.restorationOfGroupMembership = function (params) {
    return League.ApiProxy('/members/bg/restorationOfGroupMembership', params, '恢复团籍');
};



/**
 * 根据组织名称获取团支部组织
 * @param params 属性如下
 * page {int} 当前页
 * rows {int} 每页显示条数
 * fullName {string} 组织全称
 * name {string} 组织简称
 * @returns {*}
 */
LeagueMemberApi.getOrgByName = function (params) {
    return League.ApiProxy('/bg/org/getOrgByName', params, '根据组织名称获取团支部组织');
};

/**
 * 团员离脱退团校验接口
 * @param params 属性如下
 * mid {int} 团员id
 * @returns {*}
 */
LeagueMemberApi.retiredCheck = function (params) {
    return League.ApiProxy('/members/bg/retiredCheck', params, '团员离脱退团校验接口');
};