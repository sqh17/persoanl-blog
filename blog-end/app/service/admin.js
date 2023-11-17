const Service = require('egg').Service;

class AdminService extends Service {
  async adminLogin(params) {
    const { ctx, app } = this;
    const oldUser = await ctx.model.Admin.findOne({ userName: params.userName });
    // const res = await ctx.model.Admin.create(params);
    // console.log('res----',res)
    if (!oldUser) {
      return {
        msg: '用户不存在',
      };
    }
    const isMatch = await ctx.helper.comparePassword(
      params.password,
      oldUser.password
    );
    if (!isMatch) {
      return {
        msg: '用户名或密码错误',
      };
    }
    const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, {
      expiresIn: '1h',
    });
    ctx.cookies.set('token', token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      overwrite: false,
    });
    console.log('oldUser', oldUser);
    return {
      data: {
        userName: oldUser.userName,
        token,
      },
      msg: '登录成功',
    };
  }
  async adminLogout() {
    const { ctx } = this;
    ctx.cookies.set('token', '', {
      maxAge: 0,
    });

    return {
      msg: '退出成功',
    };
  }
  async list() {
    const { ctx } = this;
    const res = await ctx.model.Admin.find();

    console.log('list', res);
    return res;
  }
  async remove(id) {
    const { ctx } = this;
    let res = void 0;
    console.log(id, 'id');
    if (id) {
      res = await ctx.model.Admin.deleteOne({ _id: id });
    } else {
      res = await ctx.model.Admin.deleteMany({});
    }
    return res;
  }
}

module.exports = AdminService;
