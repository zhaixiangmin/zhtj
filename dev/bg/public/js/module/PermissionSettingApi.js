/**
 *
 * Created by licong on 2017/9/21.
 */

// 权限设置接口对象
var PermissionSettingApi = {};

/**
 * 菜单树型列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
PermissionSettingApi.getAllMenuTree = function (params) {
    return League.ApiProxy('/bg/menuManager/getAllMenuTree', params, '获取菜单树型列表');
};

/**
 * 菜单修改
 * @param params {object} 属性如下
 * parentId {string} 父节点
 * title {string} 标题
 * href {string} 链接URL地址
 * isLeaf {string} 是否是叶子节点(0：不是，1：是)
 * sortBy {string} 排序(升序，越小越排前面)
 * @returns {*}
 */
PermissionSettingApi.updateMenu = function (params) {
    return League.ApiProxy('/bg/menuManager/updateMenu', params, '菜单修改', true);
};

/**
 * 菜单新增
 * @param params {object} 属性如下
 * parentId {string} 父节点
 * mid {int} 菜单id
 * title {string} 标题
 * href {string} 链接URL地址
 * isLeaf {string} 是否是叶子节点(0：不是，1：是)
 * sortBy {string} 排序(升序，越小越排前面)
 * @returns {*}
 */
PermissionSettingApi.addMenu = function (params) {
    return League.ApiProxy('/bg/menuManager/addMenu', params, '菜单新增');
};

/**
 * 菜单按钮列表
 * @param params {object} 属性如下
 * mid {int} 菜单ID
 * @returns {*}
 */
PermissionSettingApi.findButtonsByPpid = function (params) {
    return League.ApiProxy('/bg/menuManager/findButtonsByPpid', params, '菜单按钮列表');
};

/**
 * 菜单按钮新增
 * @param params {object} 属性如下
 * mid {int} 菜单ID
 * permissionName {string} 按钮名称
 * permissionCode {string} 按钮编码
 * description {string} 描述
 * @returns {*}
 */
PermissionSettingApi.addButtonMenu = function (params) {
    return League.ApiProxy('/bg/menuManager/addButtonMenu', params, '菜单按钮新增');
};


/**
 * 菜单按钮修改
 * @param params {object} 属性如下
 * pid {int} 按钮ID
 * permissionName {string} 按钮名称
 * permissionCode {string} 按钮编码
 * description {string} 描述
 * @returns {*}
 */
PermissionSettingApi.updateButton = function (params) {
    return League.ApiProxy('/bg/menuManager/updateButton', params, '菜单按钮修改');
};

/**
 * 角色列表
 * @param params {object} 属性如下
 * keyword {string} 角色名字(可不传)
 * @returns {*}
 */
PermissionSettingApi.findAllRole = function (params) {
    return League.ApiProxy('/bg/role/findAllRole', params, '角色列表');
};


/**
 * 获取组织类型
 * @param params {object} 属性如下
 * 无参数
 */
PermissionSettingApi.getType = function (params) {
    return League.ApiProxyJson('../../public/json/types.json', params, '获取组织类型');
};

/**
 * 获取组织级别
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
PermissionSettingApi.getOrgLevel = function (params) {
    return League.ApiProxyJson('../../public/json/orgLevel.json', params, '获取组织级别');
};

/**
 * 角色新增
 * @param params {object} 属性如下
 * roleName {int} 角色名称
 * description {string} 描述(可不传)
 * isSystem {int} 是否是默认的(默认1)
 * orgType {int} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
 * orgLevel {int} 组织级别(1-10级)
 * @returns {*}
 */
PermissionSettingApi.addRole = function (params) {
    return League.ApiProxy('/bg/role/addRole', params, '角色新增');
};

/**
 * 角色修改
 * @param params {object} 属性如下
 * roleName {int} 角色名称
 * description {string} 描述(可不传)
 * isSystem {int} 是否是默认的(默认1)
 * orgType {int} 组织类型(类型，1领导机关团组织、2团委、3团工委、4团总支、5团支部)
 * orgLevel {int} 组织级别(1-10级)
 * rid {int} 角色ID
 * @returns {*}
 */
PermissionSettingApi.updateRole = function (params) {
    return League.ApiProxy('/bg/role/updateRole', params, '角色修改');
};

/**
 * 查看权限
 * @param params {object} 属性如下
 * rid {int} 角色id
 * @returns {*}
 */
PermissionSettingApi.distrPermission = function (params) {
    return League.ApiProxy('/bg/role/distrPermission', params, '查看权限');
};

/**
 * 角色分配权限
 * @param params {object} 属性如下
 * rid {int} 角色id
 * changePermissions {string} 权限ID(多个用#拼接传过来)
 * @returns {*}
 */
PermissionSettingApi.updateRolePermission = function (params) {
    return League.ApiProxy('/bg/role/updateRolePermission', params, '角色分配权限');
};