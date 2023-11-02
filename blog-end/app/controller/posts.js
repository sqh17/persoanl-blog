
const { Controller } = require('egg');
class PostsController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'index';
  }

  async news() {
    const { ctx } = this;
    ctx.body = 'index';
  }

  async create() {
    const { ctx } = this;
    ctx.body = 'create';
  }

  async show() {
    const { ctx } = this;
    ctx.body = 'show';
  }

  async edit() {
    const { ctx } = this;
    ctx.body = 'edit';
  }

  async update() {
    const { ctx } = this;
    ctx.body = 'update';
  }

  async destroy() {
    const { ctx } = this;
    ctx.body = 'destroy';
  }
}

module.exports = PostsController;
// exports.index = async ctx => {
//   ctx.body = `search: ${ctx.query.name}`;
// };
