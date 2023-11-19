const Service = require('egg').Service;

class SideRecommendService extends Service {
  async select(id) {
    const { ctx } = this;
    const res = await ctx.model.Config.Side.Recommend.findOne({ _id: id });
    return res;
  }
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params);
    // project 是模糊匹配
    const queryCon = params.project ? { project: params.project } : {};
    // 查询总量
    const totalCount = await ctx.model.Config.Side.Recommend.find(queryCon).count();
    const data = await ctx.model.Config.Side.Recommend.find(queryCon)
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
    const totalCount = await ctx.model.Config.Side.Recommend.find({ name: params.name }).countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment(),
      };
      const res = await ctx.model.Config.Side.Recommend.create(data);
      return {
        msg: '推荐设置配置信息添加成功',
        data: res,
      };
    }
    return {
      msg: '推荐设置配置信息已存在',
    };

  }

  async update(params) {
    const { ctx } = this;

    const oldData = await ctx.model.Config.Side.Recommend.findOne({
      _id: params.id,
    });

    if (oldData) {
      const updateData = {
        ...params,
        createTime: oldData.createTime,
        updateTime: ctx.helper.moment(),
      };
      const res = await ctx.model.Config.Side.Recommend.findByIdAndUpdate(
        {
          _id: params.id,
        },
        updateData,
        {
          new: true, // 返回修改后的数据
          runValidators: true, // 执行Validaton验证
        }
      );
      return {
        msg: '推荐设置配置信息修改成功',
        data: res,
      };
    }
    return {
      msg: '推荐设置配置信息不存在',
    };

  }
  async destroy(params) {
    const { ctx } = this;
    const oldData = await this.select(params.id);
    if (!oldData) {
      return {
        msg: '该推荐配置不存在',
      };
    }
    await ctx.model.Config.Side.Recommend.deleteOne({ _id: params.id });
    return {
      msg: '推荐配置删除成功',
    };
  }
}

module.exports = SideRecommendService;
