const { Service } = require('egg');

class AdminService extends Service {
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    const status = params.status * 1;
    const publishStatus = params.publishStatus * 1;
    params = ctx.helper.filterEmptyField(params);
    const mustCon = {};
    if (params.categories) {
      mustCon.categories = params.categories;
    }
    if (params.tags) {
      // vue,react
      mustCon.tags = {
        $all: params.tags.split(','), // [vue,react]
      };
    }
    if (status !== 0) {
      mustCon.status = status;
    }

    if (publishStatus !== 0) {
      mustCon.publishStatus = publishStatus;
    }

    const timeQuery = ctx.helper.getTimeQueryCon(params);
    // $and 是一个逻辑运算符，用于将多个查询条件组合为一个逻辑与（AND）的关系
    const queryCon = {
      $and: [
        mustCon,
        timeQuery,
        {
          title: {
            $regex: params.title ? new RegExp(params.title, 'i') : '',
          },
        },
      ],
    };
    const totalCount = await ctx.model.Articles.find().count();
    const data = await ctx.model.Articles.find(queryCon)
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

    const oldData = await ctx.model.Articles.findOne({ title: params.title });
    if (oldData) {
      return {
        msg: '该文章已存在',
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment(),
    };
    const res = await ctx.model.Articles.create(data);
    // 更新标签和分类里面的文章数量
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: '文章添加成功',
      data: res,
    };

  }
  async update(params) {
    const { ctx } = this;
    const id = params.id;
    const oldData = await ctx.model.Articles.findOne({ _id: id });
    if (!oldData) {
      return {
        msg: '文章不存在',
      };
    }
    const data = {
      ...params,
      updateTime: ctx.helper.moment(),
    };
    const res = await ctx.model.Articles.findByIdAndUpdate({ _id: params.id }, data, {
      new: true, // 返回修改的信息
      runValidators: true, // 执行Validaton验证
    });
    // 更新标签和分类里面的文章数量
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: '修改文章成功',
      data: res,
    };
  }
  async destroy(params) {
    const { ctx } = this;
    const { id } = params;
    const oldArticles = await ctx.model.Articles.findOne({ _id: id });
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }
    await ctx.model.Articles.deleteOne({ _id: id });
    // 更新标签和分类里面的文章数量
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: '文章删除成功',
    };
  }
  async changeStatus(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }

    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      {
        status: params.status,
      }
    );
    // 更新标签和分类里面的文章数量
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: `文章${params.status === 1 ? '启用' : '停用'}成功`,
    };
  }
  async changePublishStatus(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }

    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      {
        publishStatus: params.publishStatus,
      }
    );
    // 更新标签和分类里面的文章数量
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: `文章${params.publishStatus === 1 ? '发布' : '下线'}成功`,
    };
  }

  async changeCollectStatus(params) {
    const { ctx } = this;

    await ctx.model.Articles.updateMany(
      {},
      {
        isCollect: params.isCollect,
      }
    );
    return {
      msg: `文章${params.isCollect ? '一键开启' : '一键取消'}成功`,
    };
  }
  async edit(id) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: id });
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }
    return {
      data: oldArticles,
      msg: '文章详情获取成功',
    };
  }
  async updateCategoriesActicleNum() {
    const { ctx } = this;
    const categories = await ctx.model.Categories.find();
    if (categories && categories.length > 0) {
      categories.forEach(async item => {
        const articleNum = await ctx.model.Articles.find({
          categories: item.name,
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Categories.updateOne(
          {
            name: item.name,
          },
          {
            articleNum,
          }
        );
      });
    }
  }

  async updateTagsActicleNum() {
    const { ctx } = this;
    const tags = await ctx.model.Tags.find();
    if (tags && tags.length > 0) {
      tags.forEach(async item => {
        const articleNum = await ctx.model.Articles.find({
          tags: { $elemMatch: { $eq: item.name } },
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Tags.updateOne(
          {
            name: item.name,
          },
          {
            articleNum,
          }
        );
      });
    }
  }
}

module.exports = AdminService;
