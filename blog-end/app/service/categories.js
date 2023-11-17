const Service = require('egg').Service;

class CategoriesService extends Service {
  async select(id) {
    const { ctx } = this;
    const res = await ctx.model.Categories.findOne({ _id: id });
    return res;
  }
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params);
    // name 是模糊匹配
    const queryCon = params.name
      ? {
        name: {
          $regex: new RegExp(params.name, 'i'),
        },
      }
      : {};
    // 查询总量
    const totalCount = await ctx.model.Categories.find(queryCon).count();
    const data = await ctx.model.Categories.find(queryCon)
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
    const oldData = await ctx.model.Categories.findOne({ name: params.name });
    if (oldData) {
      return {
        msg: '该分类已存在',
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment(),
    };
    const res = await ctx.model.Categories.create(data);
    return {
      data: res,
      msg: '分类添加成功',
    };
  }
  async update(params) {
    const { ctx } = this;
    const oldData = await this.select(params.id);
    if (!oldData) {
      return {
        msg: '该分类不存在',
      };
    }
    if (oldData.name === params.name) {
      return {
        msg: '该分类已存在,请重新修改',
      };
    }
    const data = {
      ...params,
      updateTime: ctx.helper.moment(),
    };
    await ctx.model.Categories.updateOne({ _id: params.id }, data);
    return {
      msg: '分类修改成功',
    };
  }
  async destroy(params) {
    const { ctx } = this;
    const oldData = await this.select(params.id);
    if (!oldData) {
      return {
        msg: '该分类不存在',
      };
    }
    await ctx.model.Categories.deleteOne({ _id: params.id });
    return {
      msg: '分类删除成功',
    };
  }
}

module.exports = CategoriesService;
