import { request } from '../request';

export async function queryIntroduction() {
  return request({
    url: '/config/side/introduction',
  });
}

export async function addIntroduction(data) {
  return request({
    url: '/config/side/introduction',
    method: 'post',
    data,
  });
}
export async function updateIntroduction(data) {
  return request({
    url: '/config/side/introduction',
    method: 'put',
    data,
  });
}

export async function queryAd() {
  return request({
    url: '/config/side/ad',
  });
}

export async function addAd(data) {
  return request({
    url: '/config/side/ad',
    method: 'post',
    data,
  });
}
export async function updateAd(data) {
  return request({
    url: '/config/side/ad',
    method: 'put',
    data,
  });
}

export async function getListRecommend(params) {
  return request({
    url: '/config/side/recommend',
    params,
  });
}
export async function createRecommend(data) {
  return request({
    url: '/config/side/recommend',
    method: 'post',
    data,
  });
}
export async function updateRecommend(data) {
  return request({
    url: '/config/side/recommend',
    method: 'put',
    data,
  });
}

export async function removeRecommend(data) {
  return request({
    url: '/config/side/recommend',
    method: 'delete',
    data,
  });
}
