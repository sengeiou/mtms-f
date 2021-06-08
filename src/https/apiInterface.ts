namespace apiInterface {

  
  export interface getTokenParams {
    systemCode: string,
  }

  //运输单列表接口
  export interface TransportListParams {
    page: number,   //页码
    rows:number,    //条数
    state: string,    //
    keyword: string,  //
    keyvalue: string   //
    orderTime:  string,  //
    serveTime: string,  //
    firmId: number,  //
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