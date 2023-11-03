const { Controller } = require('egg');

class AdminController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      userName: {
        type: 'string',
        min: 5,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
      },
      password: {
        type: 'password',
        min: 6,
        max: 20,
        format: /^[A-Za-z0-9_]{6,20}$/,
      },
    };
  }
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    if (username === 'admin' && password === '123456') {
      const token = app.jwt.sign({
        username,
        password,
      }, app.config.jwt.secret);
      ctx.body = {
        code: 1,
        token,
      };
    } else {
      ctx.body = {
        code: 0,
        message: '用户名或密码错误',
      };
    }
  }
  async adminLogin() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.validate(this.createRule, body);
    const res = await service.admin.adminLogin(body);
    ctx.helper.success({ ctx, res });
  }
  async adminLogout() {
    const { ctx, service } = this;
    const res = await service.admin.adminLogout();
    ctx.helper.success({
      ctx,
      res,
    });
  }
  async list() {
    const { ctx, service } = this;
    const res = await service.admin.list();
    console.log('res---list', res);
    ctx.body = res;
  }
  async remove() {
    const { ctx, service } = this;
    const params = ctx.params;
    const res = await service.admin.remove(params.id);
    ctx.body = res;
  }
  async removeAll() {
    const { ctx, service } = this;
    console.log('------');
    const res = await service.admin.remove();
    ctx.body = res;
  }
}

module.exports = AdminController;
