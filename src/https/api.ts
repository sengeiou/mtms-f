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
export const getTransportDetail = (params: apiInterface.TransportDetailParams): any => {
  return servicePost('/mtms/api/transport/detail', params, false)
}

// 获取装卸单列表
export const getLoadingList = (params: apiInterface.LoadingListParams): any => {
  return servicePost('/mtms/api/loadingOrder/listPage', params, false)
}

// 获取装卸单列表详情
export const getLoadingDetail = (params: apiInterface.LoadingDetailParams): any => {
  return servicePost('/mtms/api/loading/detail', params, false)
}

