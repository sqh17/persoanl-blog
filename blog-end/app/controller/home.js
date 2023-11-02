'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async search() {
    const { ctx } = this;
    ctx.body = JSON.stringify(ctx.query);
  }
  async p() {
    const { ctx } = this;
    ctx.body = JSON.stringify(ctx.params);
  }
}

module.exports = HomeController;
