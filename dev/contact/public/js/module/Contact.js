/**
 * Created by licong on 2017/11/28.
 */
// http://192.168.20.44:8085/zhtj/login/Login?userName=gdstw&password=000000
var Contact = new Object({
    env : {
        // 必须添加http://前缀，否则字符串拼接时浏览器辨认不出来是http请求
        dev_yang: 'http://169.168.200.20:8080/zhtj', // 杨积林
        dev_tjk: 'http://169.168.200.19:8080/zhtj', // 唐佳康
        dev_wyh:'http://172.16.120.133:8080/zhtj',// 文玉环
        dev_scy: 'http://169.168.200.6:8080/zhtj', // 石春燕
        dev_ymj8080: 'http://169.168.200.4:8080/zhtj', // 杨敏阶
        dev_zfh: 'http://169.168.200.25:8080/zhtj', // 方华
        dev_ymj_peanut: 'http://1678r246x6.imwork.net/zhtj', // 杨敏阶花生壳
        dev_myself: 'http://192.168.20.44:8085/zhtj', // 李聪
        dev_ymy: 'https://tuanapi2.12355.net', // 游美英
        publish: 'https://tuanapi.12355.net' // 正式环境
    },
    domain: window.location.host, // 域名
    // isGlobalPath: true // 是否全局统一接口IP地址(true：统一且局部API文件不能改变，false：不统一且局部API文件可以改变)
    isPublish: true // 是否发布环境(true：发布环境，false：开发环境)
});

// 接口IP地址(自动识别开发/生产环境)
if(Contact.domain) {
    var host = Contact.domain.split(':')[0]; // 主机
    if(host == 'localhost' || (host.split('.').length == 4 && host.split('.')[0] == '192')) { // 开发环境(localhost:63342 或者 192.168.20.44:8091)
        Contact.path = Contact.env.dev_myself;
        // League.path = League.env.dev_wyh; // 文玉环
    }else if(host.indexOf('1678r246x6.imwork.net') != -1) { // 杨敏阶花生壳
        Contact.path = League.env.dev_ymj_peanut;
    }else if(host.indexOf('tuan2.12355.net') != -1) { // 外网环境(游美英)
        Contact.path = League.env.dev_ymy;
    }else { // 生产环境
        Contact.path = Contact.env.publish;
    }
}


// 设置ajax全局默认参数
$.ajaxSetup({
    cache: false,
    dataType: 'json',
    xhrFields: {
        withCredentials: true
    }
});

Contact.statusExplain = function (status) {
    var text = '系统繁忙，请稍后再试！';
    switch (status) {
        case 400:
            text = '客户端错误';
            break;
        case 403:
            text = '服务器禁止访问';
            break;
        case 404:
            text = '服务器没找到该资源';
            break;
        case 500:
            text = '内部服务器错误';
            break;
        case 501:
            text = '在参数中有语法错误';
            break;
        case 504:
            text = '网关超时';
            break;
    }
    return text;
};

/**
 * 封装接口
 * @param urlSuffix {string} url后缀(eg. '/help/help/getPcHelpList')
 * @param data {object} 接口数据参数
 * @param text {string} 接口说明文本(eg. '获取帮助列表')
 * @param isPost {boolean} 是否post请求(true：post请求，false：get请求)
 * @returns {*}
 * @constructor
 */
Contact.ApiProxy = function (urlSuffix, data, text, isPost) {
    var url = Contact.path + urlSuffix;

    var option = {
        data: data
    };

    if(isPost) { // 是否post请求(true：post请求，false：get请求)
        option.type = 'POST';
    }

    var dfd = $.Deferred();
    $.ajax(url, option).then(function (result) {
        if (typeof result == 'string') {
            try {
                result = JSON.parse(result);

            } catch(e) {

            }
        }

        // 是否发布环境(true：发布环境，false：开发环境)
        if(Contact.isPublish) { // 发布环境
            if(!result || !result.status) {
                $.alert('系统繁忙，请稍后再试！');
                dfd.reject(-1);
            }

            if(result.status != 'OK' && result.status != 'ALERT') {
                $.alert(result.msg);
                dfd.reject(-1);
            }
        }else { // 开发环境
            if(!result) {
                $.alert('业务级错误(' + text + ')：调用正常，返回参数为空');
                dfd.reject(-1);
            }

            if(!result.status) {
                $.alert('业务级错误(' + text + ')：调用正常，status为空');
                dfd.reject(-1);
            }

            if(result.status != 'OK' && result.status != 'ALERT') {
                if(text) {
                    $.alert('业务级错误(' + text + ')：' + text + '，错误信息：' + result.msg);
                }else {
                    $.alert('业务级错误(' + text + ')：' + result.msg);
                }
                dfd.reject(-1);
            }
        }

        dfd.resolve(result);
    }, function (XMLHttpRequest, textStatus) {
        // 是否发布环境(true：发布环境，false：开发环境)
        if(Contact.isPublish) { // 发布环境
            $.alert('系统繁忙，请稍后再试！');
        }else { // 开发环境
            var errorText = Contact.statusExplain(XMLHttpRequest.status);
            if(errorText == '未知错误') {
                errorText = textStatus;
            }
            if(text) {
                $.alert('系统级错误：' + text + '，错误信息：' + errorText);
            }else {
                $.alert('系统级错误：' + errorText);
            }
        }


        dfd.reject(-2);
    });

    return dfd;
};



/**
 * 封装接口(列表专用)
 * @param urlSuffix {string} url后缀(eg. '/help/help/getPcHelpList')
 * @param data {object} 接口数据参数
 * @param text {string} 接口说明文本(eg. '获取帮助列表')
 * @returns {*}
 * @constructor
 */
Contact.ApiProxyList = function (urlSuffix, data, text) {
    var url = Contact.path + urlSuffix;

    var dfd = $.Deferred();
    $.ajax(url, { data: data }).then(function (result) {
        if(!result) {
            dfd.reject(-1);
        }

        dfd.resolve(result);
    }, function (XMLHttpRequest, textStatus) {
        dfd.reject(-2);
    });

    return dfd;
};


/**
 * 封装接口(本地数据)
 * @param url {string} url后缀(eg. '/help/help/getPcHelpList')
 * @param data {object} 接口数据参数
 * @param text {string} 接口说明文本(eg. '获取帮助列表')
 * @returns {*}
 * @constructor
 */
Contact.ApiProxyJson = function (url, data, text) {

    var dfd = $.Deferred();
    $.ajax(url, { data: data }).then(function (result) {
        if(!result) {
            dfd.reject(-1);
        }

        if(!result.status) {
            dfd.reject(-1);
        }

        if(result.status != 'OK') {
            if(text) {
                $.alert(result.msg);
            }else {
                $.alert(result.msg);
            }
            dfd.reject(-1);

        }

        dfd.resolve(result);
    }, function (XMLHttpRequest, textStatus) {
        var errorText = Contact.statusExplain(XMLHttpRequest.status);
        if(errorText == '系统繁忙，请稍后再试！') {
            errorText = textStatus;
        }
        if(text) {
            $.alert(errorText);
        }else {
            $.alert(errorText);
        }
        dfd.reject(-2);
    });

    return dfd;
};


/**
 * 上传图片
 * @param $elemnt 图片的jquery对象(eg. $('#img'))
 * @returns {*}
 */
Contact.upLoadFile = function ($elemnt) {
    var url = Contact.path + '/file_upload';
    var dfd = $.Deferred();

    if(!$elemnt) {
        $.alert('请上传图片');
        dfd.reject(-1);
        return dfd;
    }

    // 关闭选择图片 弹出框(没选择图片)
    if($elemnt[0].files.length < 1) {
        dfd.reject(-1);
        return dfd;
    }

    //创建FormData对象
    var data = new FormData();

    //为FormData对象添加数据
    $.each($elemnt[0].files, function (i, file) {
        data.append('upload_file', file);
    });

    $.ajax(url, {
        type: 'POST',
        data: data,
        contentType: false,    //不可缺，否则$_FILES值为空
        processData: false    //不可缺，否则FF控制台报错：“NS_ERROR_XPC_BAD_OP_ON_WN_PROTO: Illegal operation on WrappedNative prototype object”，直接不能运行
    }).then(function (result) {
        if(!result) {
            dfd.reject(-1);
        }

        if(result.error != 0) {
            $.alert(result.message);
            dfd.reject(-1);
        }

        if(!result.url) {
            dfd.reject(-1);
        }

        dfd.resolve(result);
    }, function (XMLHttpRequest, textStatus) {
        var errorText = Contact.statusExplain(XMLHttpRequest.status);
        if(errorText == '系统繁忙，请稍后再试！') {
            errorText = textStatus;
        }

        $.alert(errorText);
        dfd.reject(-2);
    });

    return dfd;
};

/**
 * 当前登录信息
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
Contact.getSessionAccount = function (params) {
    return Contact.ApiProxy('/login/getSessionAccount', params, '获取当前登录信息');
};

/**
 * 用户登录
 * @param params {object} 属性如下
 * userName {string} 用户名
 * password {string} 密码
 * @returns {*}
 * @constructor
 */
Contact.Login = function (params) {
    return Contact.ApiProxy('/login/Login', params, '用户登录');
};

/**
 * 退出登录
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
Contact.exitAccount = function (params) {
    return Contact.ApiProxy('/login/exit', params, '退出登录');
};

/**
 * 获取导航菜单列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
Contact.limit = function (params) {
    return Contact.ApiProxy('/bg/role/limit', params, '获取导航菜单列表');
};

/**
 * 当前登录信息
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
Contact.getSessionAccount = function (params) {
    return Contact.ApiProxy('/login/getSessionAccount', params, '获取当前登录信息');
};