'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const baseRouter = app.config.baseRouter;
  // router.post('/admin/login', controller.admin.login);
  // router.get('/admin/a', controller.admin.a);
  router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
  router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);
  // router.get('/admin/list', controller.admin.list);
  // router.delete('/admin/remove/:id', controller.admin.remove);
  // router.delete('/admin/removeAll', controller.admin.removeAll);

  router.resources('tags', baseRouter + '/tags', controller.tags);
  router.put(baseRouter + '/tags/status/:id', controller.tags.statusUpdate);
};
