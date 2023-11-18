const Service = require('egg').Service;

class UserService extends Service {
  async select(id) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({ _id: id });
    return res;
  }
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params);
    // nickName 是模糊匹配
    const queryCon = params.nickName
      ? {
        nickName: {
          $regex: new RegExp(params.nickName, 'i'),
        },
      }
      : {};
    // 查询总量
    const totalCount = await ctx.model.User.find(queryCon).count();
    const data = await ctx.model.User.find(queryCon)
      .sort({
        loginTime: -1,
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
  async destroy(params) {
    const { ctx } = this;
    const oldData = await this.select(params.id);
    if (!oldData) {
      return {
        msg: '该用户不存在',
      };
    }
    await ctx.model.User.deleteOne({ _id: params.id });
    return {
      msg: '用户删除成功',
    };
  }
}

module.exports = UserService;
