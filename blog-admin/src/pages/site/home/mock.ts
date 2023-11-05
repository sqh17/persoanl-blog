import Mock from 'mockjs';

import setupMock from '../../../utils/setupMock';

const data = {
  effects: true,
  createTime: 1598256269,
  updateTime: 1619316645,
  _id: '5f43748d94c942f8bc6daa87',
  avatarRotate: false,
  introduction: 'There is a kind of call to eat together.',
  homeBgImg: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
  archiveBgImg: 'https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF',
  categoriesBgImg: 'https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF',
  categoriesDetailBgImg: 'https://t7.baidu.com/it/u=2529476510,3041785782&fm=193&f=GIF',
  tagsBgImg: 'https://t7.baidu.com/it/u=727460147,2222092211&fm=193&f=GIF',
  tagsDetailBgImg: 'https://t7.baidu.com/it/u=2511982910,2454873241&fm=193&f=GIF',
  aboutBgImg: 'https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF',
  avatar: 'https://t7.baidu.com/it/u=3435942975,1552946865&fm=193&f=GIF',
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/config/home'), (params) => {
      switch (params.type) {
        case 'PUT':
          const body = JSON.parse(params.body);
          return {
            msg: '首页配置修改成功',
            data: body,
            code: 0,
          };
        case 'POST':
          const postBody = JSON.parse(params.body);
          return {
            msg: '首页配置添加成功',
            code: 0,
            data: postBody,
          };
        case 'GET':
        default:
          return {
            msg: '首页配置获取成功',
            code: 0,
            data,
          };
      }
    });
  },
});
