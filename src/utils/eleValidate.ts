// ? Element 常用表单校验规则

/**
 *  @rule 手机号
 */
export function checkPhoneNumber(rule: any, value: any, callback: any) {
  const regexp = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
  if (value === "") callback("请输入手机号码");
  if (!regexp.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    return callback();
  }
}

/**
 * @rule 密码强度校验
 */
export function checkPasswordStrength(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("请输入密码"));
    return;
  }
  if (value.length < 6) {
    callback(new Error("密码长度不能少于6位"));
    return;
  }
  if (value.length > 20) {
    callback(new Error("密码长度不能超过20位"));
    return;
  }
  // 密码必须包含字母和数字
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  if (!hasLetter || !hasNumber) {
    callback(new Error("密码必须包含字母和数字"));
    return;
  }
  callback();
}
