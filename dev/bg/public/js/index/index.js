/**
 * Created by licong on 2017/9/15.
 */

/******  获取图形验证码 ********/
function changeModel() {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    var ms = new Date().getTime();
    xmlhttp.open("GET", League.path + "/login/loginValidCode?t=" + ms, true);
    xmlhttp.setRequestHeader("POWERED-BY-MENGXIANHUI", "Approve");
    xmlhttp.setRequestHeader("Content-Type", "application/xml");
    xmlhttp.withCredentials = true;
    xmlhttp.responseType = "blob";
    xmlhttp.onload = function(){
        console.log(this);
        if (this.status == 200) {
            var blob = this.response;
            var img = document.getElementById("validCode");
            img.onload = function(e) {
                window.URL.revokeObjectURL(img.src);
            };
            img.src = window.URL.createObjectURL(blob);
        }
    };
    xmlhttp.send();
}
/******  获取图形验证码  end ********/

$(function () {
    // var html = '';
    // html += '<p>尊敬的用户：</p>';
    // html += '<p>为更好地准备团费在线交纳工作，广东智慧团建系统在本周日进行升级，暂停服务。我们将尽快完成升级，并于明天（9月10日，周一）重新开放系统。届时第一时间通过本系统公告通知到您。如有不便，敬请谅解。</p>';
    // html += '<p style="text-align: right;">2018年9月9号</p>';
    // $.alert(html, '【系统公告】');

    // $('#validCode').click(); // 手动点击'图形验证码'
    var isShowValidCode = false; // 是否显示验证码(false：不显示，true：显示)
    var isClick = false; // 是否点击(false：未点击，true：已点击)
    // 点击'登录'
    $('#login').click(function () {
        var params = {
            userName: $('#userName').val().trim(), // 账号
            password: $('#password').val().trim(), // 密码
            loginValidCode: $('#loginValidCode').val().trim() // 图形验证码
        };
        
        if(!params.userName) {
            $.alert('请输入用户名');
            return;
        }
        if(!params.password) {
            $.alert('请输入密码');
            return;
        }
        if(isShowValidCode) {
            if(!params.loginValidCode) {
                $.alert('请输入图形验证码');
                return;
            }
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#login').css({opacity: 0.5});
        // 用户登录
        League.Login(params).then(function (data) {
            window.location.href = 'index_main.html'; // 跳转到主页
        }, function () {
            isShowValidCode = true; // 设置显示验证码
            $('.code_box').show(); // 显示验证码
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#login').css({opacity: 1});
            $('#validCode').click(); // 手动点击'图形验证码'
        });
    });

    // 点击'忘记密码'
    $('#forgetPass').click(function () {
        $.alert('请联系直接上级组织，重置登录密码，系统默认密码为a00000');
    });

    // 监听回车事件
    $(document).keyup(function(event){
        if(event.keyCode == 13){
            $("#login").click(); // 触发 点击'登录'
        }
    });
});