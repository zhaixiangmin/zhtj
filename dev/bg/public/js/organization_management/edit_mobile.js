/**
 * Created by licong on 2019/2/27.
 */
$(function () {
  var account_global = parent.window.zhtj_session; // 当前登录用户信息(全局变量)
  // account_global.mobile = '13360713698'; // 测试数据
  $('#oldMobile').val(account_global.mobile);

  var isClick = false; // 是否点击(false：未点击，true：已点击)
  // 点击'确定'
  $('#submit').click(function () {
    var validateFlag = $('#fm').validate({
      rules: {
        'newMobile': {
          required: true,
          checkMobileOrTel: true
        },
        'newMobileConfirm': {
          required: true,
          checkMobileOrTel: true
        }
      },
      messages: {
        'newMobile': {
          required: '请输入新团组织联系电话'
        },
        'newMobileConfirm': {
          required: '请输入确认新团组织联系电话'
        }
      },
      errorPlacement:function(error,element) { // 自定义错误放到哪里
        error.appendTo(element.parents("tr"));
      }
    }).form(); // 验证表单，填写信息是否完整
    if (!validateFlag) { // 表单填写未完成
      return;
    }

    var newMobileConfirm = $('#newMobileConfirm').val().trim(); // 确认新团组织联系电话
    var params = {
      mobile: $('#newMobile').val().trim() // 新团组织联系电话
    };

    if(newMobileConfirm != params.mobile) {
      $.alert('新团组织联系电话与确认新团组织联系电话不一致');
      return;
    }

    console.log('成功提交 params', params);

    if(isClick) { // 已点击
      return;
    }
    isClick = true; // 设置为 已点击
    $('#submit').css({opacity: 0.5});

    // 编辑修改组织联系电话接口
    OrganizationManagementApi.editOrgMobile(params).then(function (data) {
      $.alert(data.msg).then(function () {
        // parent.window.location.href = '../../index.html'; // 跳转到登录页面(没有更新session，所以还是以前的数据)

        // 当前登录信息
        League.getSessionAccount({}).then(function (data) {
          parent.window.zhtj_session = data.account;
          Utils.toggleNav('view/organization_management/person_information.html', true); // 关闭/打开指定导航页面(组织资料)
          Utils.toggleTab(Utils.returnTabTitle()); // 关闭当前页面
        });

      });
    }).always(function () {
      isClick = false; // 设置为 未点击
      $('#submit').css({opacity: 1});
    });

  })
});