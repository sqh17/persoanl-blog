const moment = require('moment');
const bcrypt = require('bcrypt');
const relativeTime = time => moment(new Date(time * 1000)).fromNow();

module.exports = {
  moment,
  relativeTime,
  // 加密
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (!err) {
            resolve(hash);
          } else {
            reject(err);
          }
        });
      });
    });
  },
  // 解密
  /**
   *
   * @param {未加密的密码} _password
   * @param {数据库保存的已经加密的密码} password
   * @return boolean 是否匹配
   */
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  },
  // 成功返回提示
  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0, // 0代表成功，其他代表失败
      msg: res.msg ? res.msg : '请求成功',
    };
  },
};