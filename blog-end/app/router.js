'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter;
  // router.post('/admin/login', controller.admin.login);
  // router.get('/admin/a', controller.admin.a);
  router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
  router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);
  // router.get('/admin/list', controller.admin.list);
  // router.delete('/admin/remove/:id', controller.admin.remove);
  // router.delete('/admin/removeAll', controller.admin.removeAll);

  router.resources('tags', baseRouter + '/tags', jwt, controller.tags); // 标签
  router.put(baseRouter + '/tags/status/:id', jwt, controller.tags.statusUpdate);

  router.resources('categories', baseRouter + '/categories', jwt, controller.categories); // 分类

  router.resources('about', baseRouter + '/about', jwt, controller.about); // 关于
};
