const { Controller } = require('egg');

class AboutController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      imgs: {
        type: 'array',
        itemType: 'object',
        min: 1,
        max: 3,
        rule: {
          imgUrl: {
            type: 'url',
            required: false,
          },
          link: {
            type: 'string',
            required: false,
          },
        },
      },
      desc: {
        type: 'string',
        min: 1,
        max: 800,
      },
      tags: {
        type: 'array',
        itemType: 'string',
        min: 1,
        max: 20,
      },
      showResume: {
        type: 'boolean',
        default: false,
        required: false,
      },
    };
  }
  // 列表
  async index() {
    const { ctx, service } = this;
    const res = await service.about.index();
    ctx.helper.success({ ctx, res });
  }
  // 创建
  async create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.validate(this.createRule, body);
    const res = await service.about.create(body);
    ctx.helper.success({ ctx, res });
  }
  // 更新
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const params = ctx.request.body;
    ctx.validate(this.createRule, params);
    const res = await service.about.update({ id, ...params });
    ctx.helper.success({ ctx, res });
  }
}

module.exports = AboutController;
