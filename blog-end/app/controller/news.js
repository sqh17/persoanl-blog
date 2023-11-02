const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const { ctx, service } = this;
    const page = ctx.query.page || 1;
    console.log('ctx.query', ctx.query);
    const newsList = await service.news.list(page);
    console.log('newsList', newsList);
    await ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = NewsController;
