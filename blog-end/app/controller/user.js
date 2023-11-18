const { Controller } = require('egg');

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.queryListParamsRules = {
      page: {
        type: 'string',
        required: false,
        allowEmpty: true,
        default: 1,
      },
      pageSize: {
        type: 'string',
        required: false,
        allowEmpty: true,
        default: 20,
      },
      nickName: {
        type: 'string',
        required: false,
        max: 20,
        allowEmpty: true,
      },
    };
  }
  // 列表
  async index() {
    const { ctx, service } = this;
    const body = ctx.request.query;
    console.log('body====', body);
    ctx.validate(this.queryListParamsRules, body);
    const res = await service.user.index(body);
    ctx.helper.success({ ctx, res });
  }
  // 删除
  async destroy() {
    const { ctx, service } = this;
    const params = ctx.params;
    const res = await service.user.destroy(params);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
