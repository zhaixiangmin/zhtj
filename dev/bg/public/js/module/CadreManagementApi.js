/**
 * Created by licong on 2017/10/9.
 */
// 团干管理接口对象
var CadreManagementApi = {};


/**
 * 获取民族列表
 * @param params {object} 属性如下
 * 无参数
 */
CadreManagementApi.getNationList= function (params) {
    return League.ApiProxyJson('../../public/json/nation.json', params, '获取民族列表');
};

/**
 * 获取政治面貌列表
 * @param params {object} 属性如下
 * 无参数
 */
CadreManagementApi.getPoliticalOutlookList = function (params) {
    return League.ApiProxyJson('../../public/json/politicalOutlook.json', params, '获取政治面貌列表');
};

/**
 * 获取文化程度列表
 * @param params {object} 属性如下
 * 无参数
 */
CadreManagementApi.getDegreeOfEducationList = function (params) {
    return League.ApiProxyJson('../../public/json/degreeOfEducation.json', params, '获取文化程度列表');
};

/**
 * 团内现任职务
 * @param params {object} 属性如下
 * 无参数
 */
CadreManagementApi.getIncumbentList = function (params) {
    return League.ApiProxyJson('../../public/json/incumbent.json', params, '团内现任职务');
};

/**
 * 获取是否列表
 * @param params {object} 属性如下
 * 无参数
 */
CadreManagementApi.getYesOrNo = function (params) {
    return League.ApiProxyJson('../../public/json/yesOrNo.json', params, '获取是否列表');
};

/**
 * 获取团干部性质列表
 * @param params {object} 属性如下
 * 无参数
 */
CadreManagementApi.getTuanganProperties = function (params) {
    return League.ApiProxyJson('../../public/json/tuanganProperties.json', params, '获取团干部性质列表');
};

/**
 * 获取团干自行录入的职务列表(领导机关团组织)
 * @param params {object} 属性如下
 * 无参数
 */
CadreManagementApi.getDutyList = function (params) {
    return League.ApiProxyJson('../../public/json/duty.json', params, '获取自行录入的职务列表');
};
/**
 * 获取团干自行录入的职务列表(非领导机关团组织)
 * @param params {object} 属性如下
 * 无参数
 */
CadreManagementApi.getDutyOtherList = function (params) {
    return League.ApiProxyJson('../../public/json/dutyOther.json', params, '获取自行录入的职务列表');
};

/**
 * 获取团干列表
 * @param params {object} 属性如下
 * page {int} 当前页
 * rows {int} 每页显示条数
 * disabled {int} 是否禁用(0-正常,1-禁用)
 * name {string} 姓名
 * idCard {string} 身份证
 * mobile {string} 手机号码
 */
CadreManagementApi.getCadreList = function (params) {
    return League.ApiProxy('/bg/tuangan/list', params, '获取团干列表');
};


/**
 * 团干新增接口
 * @param params {object} 属性如下
 * name {string} 姓名()
 * idCard {string} 身份证()
 * oid {int} 组织ID
 * nation {int} 民族(民族(1++)汉族,壮族,满族,回族,苗族,维吾尔族,土家族,彝族,蒙古族,藏族,布依族,侗族,瑶族,朝鲜族,白族,哈呢 族,哈萨克族,黎族,傣族,畲族,僳僳族,仡佬族,东乡族,拉祜族,水族,佤族,纳西族,羌族,土族,仫佬族,锡伯族, 柯尔克孜族,达斡尔族,景颇族,毛南族,撒拉族,布朗族,塔吉克族,阿昌族,普米族,鄂温克族,怒族,京族,基诺 族,德昂族,保安族,俄罗斯族,裕固族,乌孜别克族,门巴族,鄂伦春族,独龙族,塔塔尔族,赫哲族,高山族,珞巴族 )
 * politicalOutlook {int} 政治面貌(1:共青团员,2:中共党员,3:中共预备党员)
 * degreeOfEducation {int} 文化程度(1++,博士,博士在读,硕士,硕士在读,普通本科,普通本科在读,普通专科,普通专科在读,普通高中,普 通高中在读,中等职业教育,中等职业教育在读,初中,初中在读,小学)
 * rdny {string} 入团年月
 * isCadres {int} 是否为团干部(1: 是，2：否)
 * mobile {string} 手机号码
 * incumbent {string} 团内现任职务）(可不传)
 * xzzny {string} 任现职年月(可不传)
 * tuanganProperties {string} 团干部性质(可不传)
 * isPartyCommitteeMember {int} 是否同级党委（支部）成员(可不传，1: 是，2：否)
 * learningUnit {string} 学习工作单位(可不传)
 * email {string} 电子邮件(可不传)
 * qqNum {int} Qq号码(可不传)
 * wechatId {string} 微信ID(可不传)
 * weibo {string} 微博(可不传)
 * developmentMemberNumber {string} 团员编号(可不传)
 * rdny {string} 入党年月(可不传)
 * zczyzsj {string} 注册志愿者时间(可不传)
 * username {string} 账号(可不传)
 * password {string} 密码(可不传)
 * missionBranch {string} 所在团支部
 * tuanganProperties {string} 团干部性质
 * jbxxId {string} 基本信息ID(团干ID)
 * nationInfo {string} 民族企业号输入
 */
CadreManagementApi.add = function (params) {
    return League.ApiProxy('/bg/tuangan/add', params, '团干新增', true);
};

/**
 * 团干修改接口
 * @param params {object} 属性如下
 * name {string} 姓名
 * idCard {string} 身份证
 * oid {int} 组织ID
 * nation {int} 民族(民族(1++)汉族,壮族,满族,回族,苗族,维吾尔族,土家族,彝族,蒙古族,藏族,布依族,侗族,瑶族,朝鲜族,白族,哈呢 族,哈萨克族,黎族,傣族,畲族,僳僳族,仡佬族,东乡族,拉祜族,水族,佤族,纳西族,羌族,土族,仫佬族,锡伯族, 柯尔克孜族,达斡尔族,景颇族,毛南族,撒拉族,布朗族,塔吉克族,阿昌族,普米族,鄂温克族,怒族,京族,基诺 族,德昂族,保安族,俄罗斯族,裕固族,乌孜别克族,门巴族,鄂伦春族,独龙族,塔塔尔族,赫哲族,高山族,珞巴族 )
 * politicalOutlook {int} 政治面貌(1:共青团员,2:中共党员,3:中共预备党员)
 * degreeOfEducation {int} 文化程度(1++,博士,博士在读,硕士,硕士在读,普通本科,普通本科在读,普通专科,普通专科在读,普通高中,普 通高中在读,中等职业教育,中等职业教育在读,初中,初中在读,小学)
 * rdny {string} 入团年月
 * isCadres {int} 是否为团干部(1: 是，2：否)
 * mobile {string} 手机号码
 * incumbent {string} 团内现任职务）(可不传)
 * xzzny {string} 任现职年月(可不传)
 * tuanganProperties {string} 团干部性质(可不传)
 * isPartyCommitteeMember {int} 是否同级党委（支部）成员(可不传，1: 是，2：否)
 * learningUnit {string} 学习工作单位(可不传)
 * email {string} 电子邮件(可不传)
 * qqNum {int} Qq号码(可不传)
 * wechatId {string} 微信ID(可不传)
 * weibo {string} 微博(可不传)
 * developmentMemberNumber {string} 团员编号(可不传)
 * rdny {string} 入党年月(可不传)
 * zczyzsj {string} 注册志愿者时间(可不传)
 * username {string} 账号(可不传)
 * password {string} 密码(可不传)
 */
CadreManagementApi.edit = function (params) {
    return League.ApiProxy('/bg/tuangan/edit', params, '团干修改');
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
CadreManagementApi.getOrgByName = function (params) {
    return League.ApiProxy('/bg/org/getOrgByName', params, '根据组织名称获取团支部组织');
};

/**
 * 团干启用接口
 * @param params 属性如下
 * taiid {int} 团干ID
 * @returns {*}
 */
CadreManagementApi.enable = function (params) {
    return League.ApiProxy('/bg/tuangan/enable', params, '团干启用');
};

/**
 * 团干禁用接口
 * @param params 属性如下
 * taiid {int} 团干ID
 * @returns {*}
 */
CadreManagementApi.disable = function (params) {
    return League.ApiProxy('/bg/tuangan/disable', params, '团干禁用');
};

/**
 * 新增运营者
 * @param params 属性如下
 * tid {int} 团干id
 * password {string} 团干密码
 * positionTheLabel {string} 职位标签
 * @returns {*}
 */
CadreManagementApi.addTuanganOrg = function (params) {
    return League.ApiProxy('/bg/org/addTuanganOrg', params, '新增运营者');
};

/**
 * 删除运营者
 * @param params 属性如下
 * tid {int} 团干id
 * @returns {*}
 */
CadreManagementApi.deleteTuanganOrg = function (params) {
    return League.ApiProxy('/bg/org/deleteTuanganOrg', params, '删除运营者');
};


/**
 * 组织重置密码
 * @param params {object} 属性如下
 * userName {string} 用户名
 * type {int} 类型(1：组织账号，2：运营者账号)
 * @returns {*}
 */
CadreManagementApi.resetBatchOrgPW = function (params) {
    return League.ApiProxy('/login/resetBatchOrgPW', params, '组织重置密码');
};

/**
 * 验证团干是否重复
 * @param params {object} 属性如下
 * name {string} 姓名(先判断系统是否存在，然后姓名身份证实名认证)
 * idCard {string} 身份证(2者必填一)
 * mobile {string} 手机号码(2者必填一)
 * @returns {*}
 */
CadreManagementApi.getTuanganByIdCardAndMobile = function (params) {
    return League.ApiProxy('/bg/tuangan/getTuanganByIdCardAndMobile', params, '验证团干是否重复');
};

/**
 * 检查团干附加信息
 * @param params {object} 属性如下
 * tid {int} 团干id
 * @returns {*}
 */
CadreManagementApi.checkTuangan = function (params) {
    return League.ApiProxy('/bg/tuangan/checkTuangan', params, '检查团干附加信息');
};

/**
 * 团干删除接口
 * @param params {object} 属性如下
 * tid {int} 团干id
 * taiid {int} 附加id
 * result {string} 检查结果(调用检查团干附加信息接口，拿result值)
 * @returns {*}
 */
CadreManagementApi.delete = function (params) {
    return League.ApiProxy('/bg/tuangan/delete', params, '团干删除');
};

/**
 * 所有下级组织团干列表
 * @param params {object} 属性如下
 * page {int} 当前页(当前页（为空=1）)
 * rows {int} 每页显示条数(每页显示条数（为空=10）)
 * disabled {int} 是否禁用(0-正常1-禁用)
 * name {int} 姓名
 * oid {int} 组织id(调用41接口)
 * @returns {*}
 */
CadreManagementApi.lowerList = function (params) {
    return League.ApiProxy('/bg/tuangan/lowerList', params, '所有下级组织团干列表');
};


/**
 * 根据当前登录获取团员列表所在组织
 * @param params {object} 属性如下
 * type {int} 类型(1：领导机关团组织，2：团委，3：团工委，4：团总支，5：团支部 -- 空查全部)
 * fullName {string} 组织全称
 * @returns {*}
 */
CadreManagementApi.orgList = function (params) {
    return League.ApiProxy('/bg/org/orgList', params, '根据当前登录获取团员列表所在团支部');
};

/**
 * 检查团干附加信息
 * @param params {object} 属性如下
 * tid {int} 团干id
 * @returns {*}
 */
CadreManagementApi.getTuanganInfoById = function (params) {
    return League.ApiProxy('/bg/tuangan/getTuanganInfoById', params, '获取团干列表');
};

/**
 * 从团干Excel模板文件导入团干信息批量添加
 * @param params {object} 属性如下
 * uploadExcelPath {int} 上传Excel文件路径(上传Excel文件路径)
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为20)
 * @returns {*}
 */
CadreManagementApi.addBatchByExcelImport = function (params) {
    return League.ApiProxy('/bg/tuangan/addBatchByExcelImport', params, '从团干Excel模板文件导入团干信息批量添加');
};

/**
 * 根据组织ID获取组织
 * @param params {object} 属性如下
 * oid {int} 组织id
 * @returns {*}
 */
CadreManagementApi.getOrgByOid = function (params) {
    return League.ApiProxy('/bg/org/getOrgByOid', params, '根据组织ID获取组织');
};