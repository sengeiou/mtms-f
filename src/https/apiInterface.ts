namespace apiInterface {

  
  export interface getTokenParams {
    systemCode: string,
  }

  //运输单列表接口
  export interface TransportListParams {
    firmId: number;
    /**
     * 下单时间
     */
    orderTime?: string;
    /**
     * 用车时间
     */
    serveTime?: string;
    /**
     * 订单状态1已创建、2已接单、3已完成、4已失效、5已取消、6已关闭
     */
    state?: string;
    /**
     * 关键字key
     */
    keyword?: string;
    /**
     * 关键字value
     */
    keyvalue?: string;
    /**
     * 页码
     */
    page: number;
    /**
     * 条数
     */
    rows: number;
  }

  //运输单详情接口
  export interface TransportDetailParams {
    id: number;
  }

  //装卸单列表接口
  export interface LoadingListParams {
    firmId: number;
    /**
     * 下单时间
     */
    orderTime?: string;
    /**
     * 用车时间
     */
    serveTime?: string;
    /**
     * 订单状态1已创建、2已接单、3已完成、4已失效、5已取消、6已关闭
     */
    state?: string;
    /**
     * 关键字key
     */
    keyword?: string;
    /**
     * 关键字value
     */
    keyvalue?: string;
    /**
     * 页码
     */
    page: number;
    /**
     * 条数
     */
    rows: number;
  }

  //装卸单详情接口
  export interface LoadingDetailParams {
    id: number;
}