/**
 * Created by Administrator on 2017/7/29.
 */
// 字符串两边去空格
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

/**
 * 获得字符串实际长度，中文2，英文1
 * @returns {number} 长度
 */
String.prototype.getRealLen = function() {
    var realLength = 0, len = this.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = this.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};

//日期格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

var Utils = {};

Utils.getQueryString = function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r) {
        // return  unescape(r[2]); // 中文会乱码，已废弃
        return  decodeURI(r[2]);
    }
    return null;
};


/**
 * 验证ID，正确返回“true”，错误则返回错误信息
 * @param {Object} idCard
 */
Utils.checkIdCard = function(idCard) {
    //错误信息
    var status = ["true", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!"];

    //去掉首尾空格
    // idCard = trim(idCard.replace(/ /g, ""));
    idCard = trim(idCard);
    if(!idCard) {
        return '请输入身份证';
    }

    if (idCard.length == 15 || idCard.length == 18) {
        if (!checkArea(idCard)) {
            return status[4];
        } else if (!checkBrith(idCard)) {
            return status[2];
        } else if (idCard.length == 18 && !check18Code(idCard)) {
            return status[3];
        } else {
            return status[0];
        }
    } else {
        //不是15或者18，位数不对
        return status[1];
    }
};


/**
 * 验证身份证的地区码
 * @param {Object} idCard 身份证字符串
 */
function checkArea(idCard) {
    // 区域ID
    var areaMap = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };

    if (areaMap[parseInt(idCard.substr(0, 2))] == null) {
        return false;
    } else {
        return true;
    }
}


/**
 * 验证身份证号码中的生日是否是有效生日
 * @param idCard 身份证字符串
 * @return
 */
function checkBrith(idCard) {
    var result = true;

    if (15 == idCard.length) {
        var year = idCard.substring(6, 8);
        var month = idCard.substring(8, 10);
        var day = idCard.substring(10, 12);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
        if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
            result = false;
        }
    } else if (18 == idCard.length) {
        var year = idCard.substring(6, 10);
        var month = idCard.substring(10, 12);
        var day = idCard.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

        // 这里用getFullYear()获取年份，避免千年虫问题
        if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
            result = false;
        }
    } else {
        result = false;
    }

    return result;
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param idCardArr 身份证号码数组
 * @return
 */
function check18Code(idCardArr) {

    /**
     * 身份证15位编码规则：dddddd yymmdd xx p
     * dddddd：地区码
     * yymmdd: 出生年月日
     * xx: 顺序类编码，无法确定
     * p: 性别，奇数为男，偶数为女
     * <p />
     * 身份证18位编码规则：dddddd yyyymmdd xxx y
     * dddddd：地区码
     * yyyymmdd: 出生年月日
     * xxx:顺序类编码，无法确定，奇数为男，偶数为女
     * y: 校验码，该位数值可通过前17位计算获得
     * <p />
     * 18位号码加权因子为(从右到左) wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
     * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
     * 校验位计算公式：Y_P = mod( ∑(Ai×wi),11 )
     * i为身份证号码从右往左数的 2...18 位; Y_P为校验码所在校验码数组位置
     *
     */
    // 加权因子
    var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

    // 身份证验证位值.10代表X
    var valideCodeArr = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0; // 声明加权求和变量

    var verificationCode = idCardArr[17]; // 验证码
    if (idCardArr[17].toLowerCase() == 'x') {
        verificationCode = 10;// 将最后位为x的验证码替换为10方便后续操作
    }

    for (var i = 0; i < 17; i++) {
        sum += wi[i] * idCardArr[i];// 加权求和
    }

    var valCodePosition = sum % 11;// 得到验证码所位置
    if (verificationCode == valideCodeArr[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}


//去掉字符串头尾空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 验证手机号码
 * @param mobile {string} 手机号码
 * @returns {boolean} 验证成功返回true，否则返回false
 */
Utils.checkMobile = function(mobile) {
    if(!mobile) {
        return false;
    }

    mobile = mobile.trim(); // 去空格

    var re = /^1\d{10}$/;
    return re.test(mobile);
};

/**
 * 验证手机号码
 * @param mobile {string} 手机号码
 * @returns {boolean} 验证成功返回true，否则返回false
 */
Utils.checkMobileOrTel = function(mobile) {
    if(!mobile) {
        return false;
    }

    var re = /^1\d{10}$/;
    var tel = /^0\d{2,3}-?\d{7,8}$/;
    return re.test(mobile) || tel.test(mobile);
};

/**
 * 身份证出生日期用*替换
 * @param IDCard {string} 身份证号码
 * @returns {*}
 * @constructor
 */
Utils.IDCardWithStars = function(IDCard) {
    if(!IDCard || (IDCard.length != 15 && IDCard.length != 18)) {
        return IDCard;
    }

    return IDCard.replace(/^(\d{6})(\d{8})(\d*)$/, "$1******$3"); // 440883199605233226 -> 440883********3226
};

/**
 * 验证电子邮箱
 * @param email {string} 电子邮箱
 * @returns {boolean}
 */
Utils.checkEMail = function(email) {
    if(!email) {
        return false;
    }
    var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return re.test(email);
};

/**
 * 检查特殊字符(企业代号)
 * @param param {string} 请求参数
 * @returns {boolean}
 */
Utils.checkSpecialSymbol = function(param) {
    if(!param) {
        return false;
    }
    var re = /^[^\\:\?”'<>\|\s]+$/; // 由数字或字母组成
    return re.test(param);
};

/**
 * 返回值(空值则返回undefined -- 直接废弃该参数，避免传参时出现 eg. name=)
 * @param value {string} 传入值
 * @returns {undefined}
 */
Utils.returnValidValue = function(value) {
    return value ? value : undefined;
};

/**
 * 返回值(null则返回空字符串，避免出现null)
 * @param value {string} 传入值
 * @returns {undefined}
 */
Utils.returnValidString = function(value) {
    return value ? value : '';
};

// /**
//  * 显示数据(有筛选条件，没数据就显示没数据)
//  * @param params {object} 参数对象
//  * @param list {array} 数据列表
//  */
// Utils.showDataWithFilter = function (params, list) {
//     var html_no_more = '';
//     html_no_more += '<div class="no-more" style="position: relative;height: 2rem;text-align: center;background-color: #f2f2f2;">';
//     html_no_more += '    <div class="line" style="position: absolute;height: 0.2rem;width: 100%;top: 50%;transform: translateY(-50%);background: #999;"></div>';
//     html_no_more += '    <div style="position: relative;display: inline-block;padding: 0 0.6rem;height: 2rem;line-height: 2rem;font-size: 0.48rem;text-align: center;color: #999;background: #f2f2f2;">没有更多内容了</div>';
//     html_no_more += '</div>';
//
//     $('.box.second').find('.no-more').remove(); // 删除'没有更多内容了'
//
//     var hasCheck = false; // 是否有查询条件(true：有，false：没有)
//     var pageIndex = undefined; // 当前页
//     var pageSize = undefined; // 每页显示条数
//
//     for(param in params) { //  遍历参数对象
//         if(param == 'page' || param == 'pageIndex' || param == 'pageNo') { // 页码参数检查
//             pageIndex = params[param];
//         }else if(param == 'pageSize' || param == 'rows') { // 页码参数检查
//             pageSize = params[param];
//         }else { // 筛选参数
//             if(params[param] || params[param] === 0) { // 不能用等于号，空字符串也等于0
//                 hasCheck = true; // 设置 有查询条件
//             }
//         }
//     }
//
//     if(pageIndex == 1) { // 第一页
//         if(hasCheck) { // 有查询条件
//             if(!list || list.length <= 0) { // 无数据
//                 $('.box.second').hide(); // 隐藏数据页面(数据列表)
//                 $('.no_data.second').show(); // 显示无数据页面(有查询)
//             }else { // 有数据
//                 $('.no_data.second').hide(); // 隐藏无数据页面(有查询)
//                 $('.box.first').show(); // 显示有数据页面(含查询)
//                 $('.box.second').show(); // 显示数据页面(数据列表)
//                 if(list.length < pageSize) { // 数据全部加载完毕
//                     $('.box.second').append(html_no_more);
//                 }
//             }
//         }else { // 无查询条件
//             if(!list || list.length <= 0) { // 无数据
//                 $('.no_data.first').show(); // 显示无数据页面(无查询)
//             }else { // 有数据
//                 $('.no_data.second').hide(); // 隐藏无数据页面(有查询)
//                 $('.box.first').show(); // 显示有数据页面(含查询)
//                 $('.box.second').show(); // 显示数据页面(数据列表)
//                 if(list.length < pageSize) { // 数据全部加载完毕
//                     $('.box.second').append(html_no_more);
//                 }
//             }
//         }
//     }else { // 非第一页(第二页或以上)
//         if(list.length < pageSize) { // 数据全部加载
//             $('.box.second').append(html_no_more);
//         }
//     }
// };

/**
 * 显示数据(有筛选条件，没数据就显示没数据)
 * @param params {object} 参数对象
 * @param list {array} 数据列表
 * @param isClear {boolean} 是否点击筛选的查询按钮(true：点击，false：未点击)
 */
Utils.showDataWithFilter = function (params, list, isClear) {
    var html_no_more = '';
    html_no_more += '<div class="no-more" style="position: relative;height: 2rem;text-align: center;background-color: #f2f2f2;">';
    html_no_more += '    <div class="line" style="position: absolute;height: 0.2rem;width: 100%;top: 50%;transform: translateY(-50%);background: #999;"></div>';
    html_no_more += '    <div style="position: relative;display: inline-block;padding: 0 0.6rem;height: 2rem;line-height: 2rem;font-size: 0.48rem;text-align: center;color: #999;background: #f2f2f2;">没有更多内容了</div>';
    html_no_more += '</div>';

    $('.box.second').find('.no-more').remove(); // 删除'没有更多内容了'

    var hasCheck = false; // 是否有查询条件(true：有，false：没有)
    var pageIndex = undefined; // 当前页
    var pageSize = undefined; // 每页显示条数

    for(param in params) { //  遍历参数对象
        if(param == 'page' || param == 'pageIndex' || param == 'pageNo') { // 页码参数检查
            pageIndex = params[param];
        }else if(param == 'pageSize' || param == 'rows') { // 页码参数检查
            pageSize = params[param];
        }
        // else { // 筛选参数
        //     if(params[param] || params[param] === 0) { // 不能用等于号，空字符串也等于0
        //         hasCheck = true; // 设置 有查询条件
        //     }
        // }
    }

    if(pageIndex == 1) { // 第一页
        if(isClear) { // 点击'条件查询'按钮
            if(!list || list.length <= 0) { // 无数据
                $('.box.second').hide(); // 隐藏数据页面(数据列表)
                $('.no_data.second').show(); // 显示无数据页面(有查询)
            }else { // 有数据
                $('.no_data.second').hide(); // 隐藏无数据页面(有查询)
                $('.box.first').show(); // 显示有数据页面(含查询)
                $('.box.second').show(); // 显示数据页面(数据列表)
                if(list.length < pageSize) { // 数据全部加载完毕
                    $('.box.second').append(html_no_more);
                }
            }
        }else { // 首次进入页面
            if(!list || list.length <= 0) { // 无数据
                $('.no_data.first').show(); // 显示无数据页面(无查询)
            }else { // 有数据
                $('.no_data.second').hide(); // 隐藏无数据页面(有查询)
                $('.box.first').show(); // 显示有数据页面(含查询)
                $('.box.second').show(); // 显示数据页面(数据列表)
                if(list.length < pageSize) { // 数据全部加载完毕
                    $('.box.second').append(html_no_more);
                }
            }
        }
    }else { // 非第一页(第二页或以上)
        if(list.length < pageSize) { // 数据全部加载
            $('.box.second').append(html_no_more);
        }
    }
};


/**
 * 显示数据(无筛选条件，没数据就显示没数据)
 * @param params {object} 参数对象
 * @param list {array} 数据列表
 */
Utils.showDataWithoutFilter = function (params, list) {
    var html_no_more = '';
    html_no_more += '<div class="no-more" style="position: relative;height: 2rem;text-align: center;background-color: #f2f2f2;">';
    html_no_more += '    <div class="line" style="position: absolute;height: 0.2rem;width: 100%;top: 50%;transform: translateY(-50%);background: #999;"></div>';
    html_no_more += '    <div style="position: relative;display: inline-block;padding: 0 0.6rem;height: 2rem;line-height: 2rem;font-size: 0.48rem;text-align: center;color: #999;background: #f2f2f2;">没有更多内容了</div>';
    html_no_more += '</div>';

    var pageIndex = undefined; // 当前页
    var pageSize = undefined; // 每页显示条数 
    for(param in params) { //  遍历参数对象
        if(param == 'page' || param == 'pageIndex' || param == 'pageNo') { // 页码参数才检查
            pageIndex = params[param];
        }else if(param == 'pageSize' || param == 'rows') {
            pageSize = params[param];
        }
    }

    $('.box').find('.no-more').remove(); // 删除'没有更多内容了'
    
    if(pageIndex == 1) { // 第一页
        if(!list || list.length <= 0) { // 无数据
            $('.no_data').show(); // 显示无数据页面
            $('.box').hide(); // 隐藏正常数据
        }else { // 有数据
            $('.box').show(); // 显示有数据页面
            if(list.length < pageSize) { // 数据全部加载完毕
                $('.box').append(html_no_more);
            }
        }
    }
    else { // 非第一页(第二页或以上)
        if(list.length < pageSize) { // 数据全部加载
            $('.box').append(html_no_more);
        }
    }
};

/**
 * 高亮指定字符串的关键词
 * @param text {string} 指定字符串
 * @param keywords {string} 关键词
 * @returns {string|XML|void|*}
 */
Utils.returnSearchHighlightText = function (text, keywords) {
    if(!keywords) {
        return text;
    }

    keywords = keywords.replace(/\s+/g, ' ');
    // console.log('keywords', keywords);
    var keywordList = keywords.split(' ');
    // console.log('keywordList', keywordList);
    var keywordReg = '';
    for(var i=0; i<keywordList.length; i++) {
        if(i != keywordList.length - 1) {
            keywordReg += keywordList[i] + '|';
        }else {
            keywordReg += keywordList[i];
        }
    }
    var reg = new RegExp(keywordReg, 'g');
    // console.log('keywordReg', keywordReg);
    text = text.replace(reg, '<a style="color: #D94453;">$&</a>');
    console.log('text', text);

    return text;
};

/**
 * 组织有效名称
 * @param name {string}  组织名称
 * @returns {string}
 */
Utils.validOrgName = function (name) {
    return name ? name : '该组织已被删除';
};