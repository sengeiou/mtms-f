import {
  serviceGet,
  servicePost
} from "./https"  //引入请求方式
//引入ts接口
/// <reference path = "apiInterface.ts" />

//登录获取token
export const getToken = (params: apiInterface.getTokenParams): any => {
  return serviceGet(process.env.VUE_APP_GW_SERVER_PATH + '/dili-uap/login/getToken.action', params)
}

// 获取运输单列表
export const getTransportList = (params: apiInterface.TransportListParams): any => {
  return servicePost('/mtms/api/transportOrder/listPage', params, false)
}

// 获取运输单详情
export const TransportDetail = (params: apiInterface.TransportDetailParams): any => {
  return serviceGet('', params)
}

// 获取装卸单详情
export const LoadingList = (params: apiInterface.LoadingListParams): any => {
  return serviceGet('', params)
}

// 获取装卸单列表详情
export const LoadingDetail = (params: apiInterface.LoadingDetailParams): any => {
  return serviceGet('', params)
}


