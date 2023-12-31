import Mock from 'mockjs';

import './user';
import './message-box';
import '../pages/search-table/mock';
import '../pages/categories/mock';
import '../pages/articles/mock';
import '../pages/tags/mock';
import '../pages/about/mock';
import '../pages/user/mock';
import '../pages/comment/mock';
import '../pages/site/home/mock';
import '../pages/site/headerFooter/mock';
import '../pages/site/side/mock';

console.log('process', process.env.NODE_ENV);
Mock.setup({
  timeout: '200-600',
});
