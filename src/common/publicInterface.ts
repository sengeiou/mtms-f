//公有ts接口

//tags栏路由数据
export interface routeData {
    key: string,//菜单key
    subKey?: string,//菜单展开key
    title: any,//路由名称
    icon?: string,//图标
    permissionKey?: string,//权限
    children?: Array<routeData>//子级
}


//分页数据接口
export interface pageData {
    page: number,
    rows: number,
    total: number,
    showSizeChanger: boolean,
    change?: (page: number, pageSize?: number) => void,
    showSizeChange?: (current: number, size: number) => void
}