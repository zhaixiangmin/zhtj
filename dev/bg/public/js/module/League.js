/**
 * Created by Administrator on 2017/6/21.
 */

// http://192.168.20.44:8085/zhtj/login/Login?userName=gdstw&password=000000
var League = new Object({
    env : {
        // 必须添加http://前缀，否则字符串拼接时浏览器辨认不出来是http请求
        dev_yang: 'http://169.168.200.20:8080/zhtj', // 杨积林
        dev_tjk: 'http://169.168.200.17:8080/zhtj', // 唐佳康
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
if(League.domain) {
    var host = League.domain.split(':')[0]; // 主机
    if(host == 'localhost' || (host.split('.').length == 4 && host.split('.')[0] == '192')) { // 开发环境(localhost:63342 或者 192.168.20.44:8091)
        League.path = League.env.dev_myself;
    }else if(host.indexOf('1678r246x6.imwork.net') != -1) { // 杨敏阶花生壳
        League.path = League.env.dev_ymj_peanut;
    }else if(host.indexOf('tuan2.12355.net') != -1) { // 外网环境(游美英)
        League.path = League.env.dev_ymy;
    }else { // 生产环境
        League.path = League.env.publish;
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

League.statusExplain = function (status) {
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
League.ApiProxy = function (urlSuffix, data, text, isPost) {
    var url = League.path + urlSuffix;

    var option = {
        data: data
    };

    if(isPost) { // 是否post请求(true：post请求，false：get请求)
        option.type = 'POST';
        // option.data = JSON.stringify(option.data);
    }

    var dfd = $.Deferred();
    $.ajax(url, option).then(function (result) {
        if(!result) {
            $.alert('系统繁忙，请稍后再试！');
            return;
        }

        // 接口返回总记录数为0，自定义总记录数，避免翻页失效
        if(result.total == 0) {
            result.total = 999999999; // 10亿 - 1
        }

        // 角色列表/查看权限(暂时处理)
        if(urlSuffix == '/bg/role/distrPermission') {
            result.status = 'OK';
        }

        // 退出登录(若提示“您的登录已失效，请重新登录”，则正常返回)
        if(urlSuffix == '/login/exit' && result.msg.indexOf('您的登录已失效，请重新登录') != -1) {
            dfd.resolve(result);
            return;
        }

        // 是否发布环境(true：发布环境，false：开发环境)
        if(League.isPublish) { // 发布环境
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
        if(League.isPublish) { // 发布环境
            $.alert('系统繁忙，请稍后再试！');
        }else { // 开发环境
            var errorText = League.statusExplain(XMLHttpRequest.status);
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
 * 封装接口(本地数据)
 * @param url {string} url后缀(eg. '/help/help/getPcHelpList')
 * @param data {object} 接口数据参数
 * @param text {string} 接口说明文本(eg. '获取帮助列表')
 * @returns {*}
 * @constructor
 */
League.ApiProxyJson = function (url, data, text) {
    
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
        var errorText = League.statusExplain(XMLHttpRequest.status);
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
League.upLoadFile = function ($elemnt) {
    var url = League.path + '/file_upload';
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
        var errorText = League.statusExplain(XMLHttpRequest.status);
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
League.getSessionAccount = function (params) {
    return League.ApiProxy('/login/getSessionAccount', params, '获取当前登录信息');
};

/**
 * 用户登录
 * @param params {object} 属性如下
 * userName {string} 用户名
 * password {string} 密码
 * @returns {*}
 * @constructor
 */
League.Login = function (params) {
    return League.ApiProxy('/login/Login', params, '用户登录');
};

/**
 * 退出登录
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
League.exitAccount = function (params) {
    return League.ApiProxy('/login/exit', params, '退出登录');
};

/**
 * 获取导航菜单列表
 * @param params {object} 属性如下
 * 无参数
 * @returns {*}
 */
League.limit = function (params) {
    return League.ApiProxy('/bg/role/limit', params, '获取导航菜单列表');
};