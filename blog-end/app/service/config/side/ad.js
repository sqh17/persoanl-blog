const Service = require('egg').Service;

class SideAdService extends Service {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Config.Side.Ad.findOne();
    return {
      msg: '广告设置配置信息获取成功',
      data,
    };
  }
  async create(params) {
    const { ctx } = this;
    const totalCount = await ctx.model.Config.Side.Ad.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment(),
      };
      const res = await ctx.model.Config.Side.Ad.create(data);
      return {
        msg: '广告设置配置信息添加成功',
        data: res,
      };
    }
    return {
      msg: '广告设置配置信息已存在',
    };

  }

  async update(params) {
    const { ctx } = this;

    const oldData = await ctx.model.Config.Side.Ad.findOne({
      _id: params.id,
    });

    if (oldData) {
      const updateData = {
        ...params,
        createTime: oldData.createTime,
        updateTime: ctx.helper.moment(),
      };
      const res = await ctx.model.Config.Side.Ad.findByIdAndUpdate(
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
        msg: '广告设置配置信息修改成功',
        data: res,
      };
    }
    return {
      msg: '广告设置配置信息不存在',
    };

  }
}

module.exports = SideAdService;
