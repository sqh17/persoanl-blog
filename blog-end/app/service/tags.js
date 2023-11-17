const Service = require('egg').Service;

class TagsService extends Service {
  async select(id) {
    const { ctx } = this;
    const res = await ctx.model.Tags.findOne({ _id: id });
    return res;
  }
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params, [ 'page', 'pageSize' ]);
    // name 是模糊匹配
    const queryCon = params.name
      ? {
        name: {
          $regex: new RegExp(params.name, 'i'),
        },
      }
      : {};
    // 查询总量
    const totalCount = await ctx.model.Tags.find(queryCon).count();
    const data = await ctx.model.Tags.find(queryCon)
      .sort({
        createTime: -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
    };
  }
  async create(params) {
    const { ctx } = this;
    const oldData = await ctx.model.Tags.findOne({ name: params.name });
    if (oldData) {
      return {
        msg: '该标签已存在',
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Tags.create(data);
    return {
      data: res,
      msg: '标签添加成功',
    };
  }
  async update(params) {
    const { ctx } = this;
    const oldData = await this.select(params.id);
    if (!oldData) {
      return {
        msg: '该标签不存在',
      };
    }
    if (oldData.name === params.name) {
      return {
        msg: '该标签已存在,请重新修改',
      };
    }
    const data = {
      ...params,
      updateTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Tags.updateOne({ _id: params.id }, data);
    return {
      msg: '标签修改成功',
    };
  }
  async destroy(params) {
    const { ctx } = this;
    const oldData = await this.select(params.id);
    if (!oldData) {
      return {
        msg: '该标签不存在',
      };
    }
    await ctx.model.Tags.deleteOne({ _id: params.id });
    return {
      msg: '标签删除成功',
    };
  }
  async statusUpdate(params) {
    const { ctx } = this;
    const oldData = await this.select(params.id);
    if (!oldData) {
      return {
        msg: '该标签不存在',
      };
    }
    const data = {
      status: params.status,
      updateTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Tags.updateOne({ _id: params.id }, data);
    return {
      msg: `标签${params.status ? '启用' : '停用'}成功`,
    };
  }
}

module.exports = TagsService;
