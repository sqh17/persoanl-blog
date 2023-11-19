'use strict';

const Controller = require('egg').Controller;

class SideRecommendController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      project: {
        type: 'string',
      },
      name: {
        type: 'string',
        min: 1,
        max: 50,
      },
      cover: {
        type: 'string',
      },
      link: {
        type: 'string',
      },
      platform: {
        type: 'string',
        min: 1,
        max: 20,
      },
      isVip: {
        type: 'boolean',
        default: false,
      },
      showPosition: {
        type: 'array',
        itemType: 'string',
        min: 1,
        max: 10,
      },
    };
    this.queryCreateRule = {
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
      project: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const params = ctx.request.query;
    ctx.validate(this.queryCreateRule, params);
    const res = await service.config.side.recommend.index(params);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.config.side.recommend.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.config.side.recommend.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 删除
  async destroy() {
    const { ctx, service } = this;
    const params = ctx.params;
    const res = await service.config.side.recommend.destroy(params);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = SideRecommendController;
