/**
 * Created by licong on 2017/10/10.
 */
jQuery.validator.addMethod("checkIdCard", function(value, element, param) {
    var result = Utils.checkIdCard(value);
    return this.optional(element) || result == 'true';
}, "身份证号码不正确");

jQuery.validator.addMethod("checkMobile", function(value, element, param) {
    var result = Utils.checkMobile(value);
    return this.optional(element) || result;
}, "手机号码不正确");

jQuery.validator.addMethod("checkMobileOrTel", function(value, element, param) {
    var result = Utils.checkMobileOrTel(value);
    return this.optional(element) || result;
}, "联系电话不正确");

jQuery.validator.addMethod("checkEMail", function(value, element, param) {
    var result = Utils.checkEMail(value);
    return this.optional(element) || result;
}, "电子邮箱不正确");

jQuery.validator.addMethod("checkPassword", function(value, element, param) {
    var result = Utils.checkPassword(value);
    return this.optional(element) || result;
}, "六位数或以上数字、字母组合");

jQuery.validator.addMethod("checkDigitOrLetter", function(value, element, param) {
    var result = Utils.checkDigitOrLetter(value);
    return this.optional(element) || result;
}, "数字或者字母组合");

// 组织代号
jQuery.validator.addMethod("checkSpecialSymbol", function(value, element, param) {
    var result = Utils.checkSpecialSymbol(value);
    return this.optional(element) || result;
}, "不能含有特殊字符\\:?”'<>|和空格");

// 验证姓名(不能为纯数字)
jQuery.validator.addMethod("checkName", function(value, element, param) {
    var result = !Utils.checkName(value);
    return this.optional(element) || result;
}, "不能包含数字");

// 验证中文字长度
jQuery.validator.addMethod("checkChineseLen", function(value, element, param) {
    console.log('checkChineseLen param', param);
    var result = value.trim().getRealLen() >= 20;
    return this.optional(element) || result;
}, "不能少于10个汉字");

// jQuery.validator.addMethod("checkByteLength", function(value, element, param) {
//     console.log('checkByteLength param', param);
//     console.log('checkByteLength value', value);
//     var result = Utils.checkByteLength(value, param);
//     return this.optional(element) || result;
// }, "字符串长度太长");