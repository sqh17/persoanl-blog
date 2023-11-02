'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/index', controller.home.index);
  router.get('/api/search', controller.home.search);
  router.get('/news', controller.news.list);
  router.resources('posts', '/api/posts', controller.posts);
  router.get('/api/index/:id/:name', controller.home.p);
};
