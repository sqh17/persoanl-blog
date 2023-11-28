const { Controller } = require('egg');

class CommentController extends Controller {
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
      articleTitle: {
        type: 'string',
        required: false,
      },
      auditStatus: {
        type: 'string',
        required: false,
        default: '0',
      },
    };
    this.updateAuditStatusRule = {
      auditStatus: {
        type: 'number',
      },
    };
  }
  // 列表
  async index() {
    const { ctx, service } = this;
    const body = ctx.request.query;
    ctx.validate(this.queryListParamsRules, body);
    const res = await service.comment.index(body);
    ctx.helper.success({ ctx, res });
  }
  // 创建
  async create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const res = await service.comment.create(body);
    ctx.helper.success({ ctx, res });
  }
  // 更新
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const params = ctx.request.body;
    console.log('==========');
    ctx.validate(this.updateAuditStatusRule, params);
    const res = await service.comment.update({ id, ...params });
    ctx.helper.success({ ctx, res });
  }
  // 一键审核
  async changeCommentStatus() {
    const { ctx, service } = this;
    const params = ctx.request.body;
    console.log('==========');
    ctx.validate(this.updateAuditStatusRule, params);
    const res = await service.comment.update({ id: 0, ...params });
    ctx.helper.success({ ctx, res });
  }
  // 删除
  async destroy() {
    const { ctx, service } = this;
    const params = ctx.params.id;
    const res = await service.comment.destroy(params);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = CommentController;
