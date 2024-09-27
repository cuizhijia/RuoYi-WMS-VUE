import request from '@/utils/request'

// 查询房源信息列表
export function listInfo(query) {
  return request({
    url: '/house/info/list',
    method: 'get',
    params: query
  })
}

// 查询房源信息详细
export function getInfo(id) {
  return request({
    url: '/house/info/' + id,
    method: 'get'
  })
}

// 新增房源信息
export function addInfo(data) {
  return request({
    url: '/house/info',
    method: 'post',
    data: data
  })
}

// 修改房源信息
export function updateInfo(data) {
  return request({
    url: '/house/info',
    method: 'put',
    data: data
  })
}

// 删除房源信息
export function delInfo(id) {
  return request({
    url: '/house/info/' + id,
    method: 'delete'
  })
}
