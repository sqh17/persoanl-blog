const Service = require('egg').Service;

class AboutService extends Service {
  async select(id) {
    const { ctx } = this;
    const res = await ctx.model.About.findOne({ _id: id });
    return res;
  }
  async index() {
    const { ctx } = this;
    const data = await ctx.model.About.findOne();
    return {
      msg: '关于信息获取成功',
      data,
    };
  }
  async create(params) {
    const { ctx } = this;

    const totalCount = await ctx.model.About.find().count();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment(),
      };
      const res = await ctx.model.About.create(data);
      return {
        msg: '关于信息添加成功',
        data: res,
      };
    }
    return {
      msg: '关于信息已存在',
    };

  }
  async update(params) {
    const { ctx } = this;
    const oldData = await this.select(params.id);
    if (!oldData) {
      return {
        msg: '关于信息不存在',
      };
    }
    const data = {
      ...params,
      updateTime: ctx.helper.moment(),
    };
    const res = await ctx.model.About.findByIdAndUpdate({ _id: params.id }, data, {
      new: true, // 返回修改的信息
      runValidators: true, // 执行Validaton验证
    });
    return {
      msg: '关于信息修改成功',
      data: res,
    };
  }
}

module.exports = AboutService;
