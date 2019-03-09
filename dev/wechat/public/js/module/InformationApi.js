/**
 * Created by licong on 2017/10/25.
 */
// 接口对象 -- 团员信息
var InformationApi = {};

/**
 * 根据组织名称获取团支部组织
 * @param params 属性如下
 * page {int} 当前页
 * rows {int} 每页显示条数
 * fullName {string} 组织全称
 * name {string} 组织简称
 * @returns {*}
 */
InformationApi.getOrgByName = function (params) {
    return League.ApiProxy('/bg/org/getOrgByName', params, '根据组织名称获取团支部组织');
};

/**
 * 获取省级数据
 * @param params 属性如下
 * 无参数
 * @returns {*}
 */
InformationApi.getDistrictByLevel = function (params) {
    return League.ApiProxy('/district/getDistrictByLevel', params, '获取省级数据');
};

/**
 * 根据省级ID查询市级
 * @param params 属性如下
 * did {string} 地市id
 * @returns {*}
 */
InformationApi.getDistrictByPid = function (params) {
    return League.ApiProxy('/district/getDistrictByPid', params, '根据省级ID查询市级');
};

/**
 * 团员新增/修改接口
 * @param params {object} 属性如下
 * name {string} 姓名
 * idCard {string} 身份证
 * rtny {string} 入团年月
 * oid {string} 所在团支部ID(调接口)
 *
 * income {int} 收入(1=2000 元以下，２：2000元至5000 元，３：5000元至8000 元，４：8000元至10000 元，５：10000 元以上)
 * isCadres {int} 是否为团干部(1: 是，2：否)
 *
 * nation {int} 民族((1++)汉族,壮族,满族,回族,苗族,维吾尔族,土家族,彝族,蒙古族,藏族,布依族,侗族,瑶族,朝鲜族,白族,哈呢 族,哈萨克族,黎族,傣族,畲族,僳僳族,仡佬族,东乡族,拉祜族,水族,佤族,纳西族,羌族,土族,仫佬族,锡伯族, 柯尔克孜族,达斡尔族,景颇族,毛南族,撒拉族,布朗族,塔吉克族,阿昌族,普米族,鄂温克族,怒族,京族,基诺 族,德昂族,保安族,俄罗斯族,裕固族,乌孜别克族,门巴族,鄂伦春族,独龙族,塔塔尔族,赫哲族,高山族,珞巴族)
 * politicalOutlook {int} 政治面貌(1:团员,2:党员)
 * degreeOfEducation {int} 全日制学历(1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
 * highestEducation {int} 最高学历(1:初中，2:高中，3:大专，4:本科，5:硕士，6:博)
 * provinceDid {string} 地市省份ID(调接口)
 * cityDid {string} 地市市级ID(调接口)
 * mobile {string} 手机号码
 *
 * occupation {int} 职业(可不传，(1++)国有企业职工、非公企业职工、机关事业单位职工、社会组织员工、农民、学生、自由职业者、公办高校教职工、公办中学教职工、公办中职教职工、民办高校教职工、民办中学教职工、民办中职教职工、其他)
 * learningUnit {string} 学习工作单位(可不传)
 * email {string} 电子邮件(可不传)
 * qqNum {int} Qq号码(可不传)
 * wechatId {string} 微信ID(可不传)
 * weibo {string} 微博(可不传)
 * developmentMemberNumber {string} 团员编号(可不传)
 * rdny {string} 入党年月(可不传)
 * zczyzsj {string} 注册志愿者时间(可不传)
 * 
 * incumbent {string} 团内现任职务）(可不传)
 * xzzny {string} 任现职年月(可不传)
 * tuanganProperties {string} 团干部性质(可不传)
 * isPartyCommitteeMember {int} 是否同级党委（支部）成员(可不传，1：是，2否)
 * 
 * qnzsId {string} 青年之声userName(前端获取当前登录青年之声的userName)
 * @returns {*}
 */
InformationApi.addOrEdit = function (params) {
    return League.ApiProxy('/members/app/addOrEdit', params, '团员新增/修改');
};

/**
 * 验证团员是否重复
 * @param params {object} 属性如下
 * idCard {string} 身份证
 * type {string} 类型(新增：add，修改：edit)
 * mid {int} 团员id
 * @returns {*}
 */
InformationApi.getMembersIdCard = function (params) {
    return League.ApiProxy('/members/app/getMembersIdCard', params, '验证团员是否重复');
};

/**
 * 我的认证资料
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
InformationApi.MyProfile = function (params) {
    return League.ApiProxy('/members/app/MyProfile', params, '获取我的认证资料');
};

/**
 * 团员需要审核修改接口
 * @param params {object} 属性如下
 * @returns {*}
 * @constructor
 */
InformationApi.AuditEdit = function (params) {
    return League.ApiProxy('/members/app/AuditEdit', params, '团员需要审核修改');
};

/**
 * 团员不需要审核修改接口
 * @param params {object} 属性如下
 * type {int} 类型(1：必填，2：附加信息)
 *
 * nation {int} 民族((1++)汉族,壮族,满族,回族,苗族,维吾尔族,土家族,彝族,蒙古族,藏族,布依族,侗族,瑶族,朝鲜族,白族,哈呢 族,哈萨克族,黎族,傣族,畲族,僳僳族,仡佬族,东乡族,拉祜族,水族,佤族,纳西族,羌族,土族,仫佬族,锡伯族, 柯尔克孜族,达斡尔族,景颇族,毛南族,撒拉族,布朗族,塔吉克族,阿昌族,普米族,鄂温克族,怒族,京族,基诺 族,德昂族,保安族,俄罗斯族,裕固族,乌孜别克族,门巴族,鄂伦春族,独龙族,塔塔尔族,赫哲族,高山族,珞巴族)
 * politicalOutlook {int} 政治面貌(1:团员,2:党员)
 * degreeOfEducation {int} 全日制学历(1:初中，2:高中，3:大专，4:本科，5:硕士，6:博士)
 * highestEducation {int} 最高学历(1:初中，2:高中，3:大专，4:本科，5:硕士，6:博)
 * provinceDid {string} 地市省份ID(调接口)
 * cityDid {string} 地市市级ID(调接口)
 * mobile {string} 手机号码
 *
 * occupation {int} 职业(可不传，(1++)国有企业职工、非公企业职工、机关事业单位职工、社会组织员工、农民、学生、自由职业者、公办高校教职工、公办中学教职工、公办中职教职工、民办高校教职工、民办中学教职工、民办中职教职工、其他)
 * learningUnit {string} 学习工作单位(可不传)
 * email {string} 电子邮件(可不传)
 * qqNum {int} Qq号码(可不传)
 * wechatId {string} 微信ID(可不传)
 * weibo {string} 微博(可不传)
 * developmentMemberNumber {string} 团员编号(可不传)
 * rdny {string} 入党年月(可不传)
 * zczyzsj {string} 注册志愿者时间(可不传)
 * @returns {*}
 * @constructor
 */
InformationApi.NotAuditEdit = function (params) {
    return League.ApiProxy('/members/app/NotAuditEdit', params, '团员不需要审核修改');
};

/**
 * 交费档位查询
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
InformationApi.getAllIncomeBracket = function (params) {
    return League.ApiProxy('/payment/getAllIncomeBracket', params, '交费档位查询');
};

/**
 * 取单个团员的奖励信息列表
 * @param params {object} 属性如下
 * type {int} 奖励类型(1-团内奖励，2-团外奖励)
 * status {int} 奖励状态(0：待审核，1：同意，2：退回)
 * pageIndex {int} 当前页码()
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
InformationApi.listByMember = function (params) {
    return League.ApiProxy('/rewardpunish/reward/listByMember', params, '取单个团员的奖励信息列表');
};

/**
 * 删除(移除)奖励信息
 * @param params {object} 属性如下
 * rewardId {int} 奖励ID(要删除的奖励ID)
 * @returns {*}
 */
InformationApi.remove = function (params) {
    return League.ApiProxy('/rewardpunish/reward/remove', params, '删除(移除)奖励信息');
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
InformationApi.list = function (params) {
    return League.ApiProxy('/rewardpunish/attachFile/list', params, '奖惩证明附件列表查看');
};

/**
 * 获取单个团员的惩罚信息列表
 * @param params {object} 属性如下
 * pageIndex {int} 当前页码(可不传) -- 默认为1
 * pageSize {int} 每页记录数(可不传) -- 默认为10
 * @returns {*}
 */
InformationApi.listByMemberPunishment = function (params) {
    return League.ApiProxy('/rewardpunish/punishment/listByMember', params, '奖惩证明附件列表查看');
};

/**
 * 团员未交团费查询
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
InformationApi.getBill = function (params) {
    return League.ApiProxy('/bg/getBill', params, '团员未交团费查询');
};

/**
 * 组织转接发起转接验证
 * @param params {object} 属性如下
 * mid {int} 团员id(type=1 必传)
 * type {int} 类型(1：组织，2：团员)
 * @returns {*}
 */
InformationApi.checkMembers = function (params) {
    return League.ApiProxy('/orgTransfer/all/checkMembers', params, '组织转接发起转接验证');
};

/**
 * 精华/本地推文列表
 * @param params {object} 属性如下
 * type {int} 推文类型(1-精华推文列表，2-本地推文列表)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
InformationApi.introducedArticleList = function (params) {
    return League.ApiProxy('/article/introducedArticle/listByMember', params, '精华/本地推文列表');
};

/**
 * 团员报道被撤回
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
InformationApi.withdraw = function (params) {
    return League.ApiProxy('/members/app/withdraw', params, '团员报道被撤回');
};

/**
 * 新增吐槽
 * @param params {object} 属性如下
 * content {string} 吐槽内容
 * type {int} 账号类型(0：组织；1：团员)
 * @returns {*}
 */
InformationApi.tsukkomiAdd = function (params) {
    return League.ApiProxy('/tsukkomi/add', params, '新增吐槽');
};


/**
 * 生成电子团员证获取信息
 * @param params {object} 属性如下
 * memberId {int} 团员ID -- 要查看的团员ID
 * showMemberAdditionNames {string} 多个团员附加信息名称-- 要显示的多个团员附加信息名称，以逗号分隔(此参数必传，值可为空)
 * showMemberRewardIds {string} 多个团员奖励记录ID -- 要显示的多个团员奖励记录ID，以逗号分隔(此参数必传，值可为空)
 * @returns {*}
 */
InformationApi.leagueCardPreview = function (params) {
    return League.ApiProxy('/pdfCertificate/leagueCard/preview', params, '生成电子团员证获取信息');
};

/**
 * 智慧团建一号通登录
 * @param params {object} 属性如下
 * accessToken {string} 登录凭证(由页面生成)
 * @returns {*}
 */
InformationApi.bigDataLogin = function (params) {
    return League.ApiProxy('/bigDataLogin', params, '智慧团建一号通登录');
};