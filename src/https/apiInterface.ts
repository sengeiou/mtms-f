namespace apiInterface {

  
  export interface getTokenParams {
    systemCode: string,
  }

  //运输单列表接口
  export interface TransportListParams {
    currentPage: number,
    pageSize: number
  }

  //运输单详情接口
  export interface TransportDetailParams {

  }

  //装卸单列表接口
  export interface LoadingListParams {

  }

  //装卸单详情接口
  export interface LoadingDetailParams {

  }




}