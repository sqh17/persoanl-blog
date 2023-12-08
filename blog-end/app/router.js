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

  router.resources('articles', baseRouter + '/articles', jwt, controller.articles); // 文章
  router.put(baseRouter + '/articles/status/:id', jwt, controller.articles.changeStatus); // 启用，停用
  router.put(baseRouter + '/articles/publishStatus/:id', jwt, controller.articles.changePublishStatus); // 修改发布状态
  router.post(baseRouter + '/articles/collectStatus', jwt, controller.articles.changeCollectStatus); // 一键开启或关闭收藏

  router.resources('comment', baseRouter + '/comment', jwt, controller.comment); // 评论管理
  router.post(baseRouter + '/comment/commentStatus', jwt, controller.comment.changeCommentStatus); // 一键审核评论

  router.resources('categories', baseRouter + '/categories', jwt, controller.categories); // 分类

  router.resources('about', baseRouter + '/about', jwt, controller.about); // 关于

  router.resources('user', baseRouter + '/user', jwt, controller.user); // 用户

  router.resources('home', baseRouter + '/config/home', jwt, controller.config.home); // 配置管理-首页
  router.resources('hf', baseRouter + '/config/hf', jwt, controller.config.hf); // 配置管理-头部/尾部

  router.resources('side_introduction', baseRouter + '/config/side/introduction', jwt, controller.config.side.introduction); // 配置管理-侧栏配置-个人简介
  router.resources('side_ad', baseRouter + '/config/side/ad', jwt, controller.config.side.ad); // 配置管理-侧栏配置-广告
  router.resources('side_recommend', baseRouter + '/config/side/recommend', jwt, controller.config.side.recommend); // 配置管理-侧栏配置-推荐

  router.post(
    baseRouter + '/upload',
    jwt,
    controller.utils.uploadFiles
  ); // 上传文件到七牛云

};
