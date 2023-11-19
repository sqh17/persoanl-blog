const Service = require('egg').Service;

class HfService extends Service {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Config.Hf.findOne();
    return {
      msg: 'Header/Footer配置信息获取成功',
      data,
    };
  }
  async create(params) {
    const { ctx } = this;
    const totalCount = await ctx.model.Config.Hf.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment(),
      };
      const res = await ctx.model.Config.Hf.create(data);
      return {
        msg: 'Header/Footer配置信息添加成功',
        data: res,
      };
    }
    return {
      msg: 'Header/Footer配置信息已存在',
    };

  }

  async update(params) {
    const { ctx } = this;

    const oldHf = await ctx.model.Config.Hf.findOne({ _id: params.id });

    if (oldHf) {
      const updateData = {
        ...params,
        createTime: oldHf.createTime,
        updateTime: ctx.helper.moment(),
      };
      const res = await ctx.model.Config.Hf.findByIdAndUpdate(
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
        msg: 'Header/Footer配置信息修改成功',
        data: res,
      };
    }
    return {
      msg: 'Header/Footer配置信息不存在',
    };

  }
}

module.exports = HfService;
