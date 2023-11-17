const { Controller } = require('egg');

class TagsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      name: {
        type: 'string',
        min: 2,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
    };
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
      name: {
        type: 'string',
        required: false,
        min: 2,
        max: 20,
        allowEmpty: true,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
    };
  }
  // 列表
  async index() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.validate(this.queryListParamsRules, body);
    const res = await service.tags.index(body);
    ctx.helper.success({ ctx, res });
  }
  // 创建
  async create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.validate(this.createRule, body);
    const res = await service.tags.create(body);
    ctx.helper.success({ ctx, res });
  }
  // 更新
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const params = ctx.request.body;
    ctx.validate(this.createRule, params);
    const res = await service.tags.update({ id, ...params });
    ctx.helper.success({ ctx, res });
  }
  // 删除
  async destroy() {
    const { ctx, service } = this;
    const params = ctx.params;
    const res = await service.tags.destroy(params);
    ctx.helper.success({ ctx, res });
  }
  // 标签状态
  async statusUpdate() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const params = ctx.request.body;
    const res = await service.tags.statusUpdate({ id, ...params });
    ctx.helper.success({ ctx, res });
  }
}

module.exports = TagsController;
