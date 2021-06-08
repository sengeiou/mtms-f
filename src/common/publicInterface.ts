//公有ts接口

//分页数据接口
export interface pageData {
    page: number,
    rows: number,
    total: number,
    showSizeChanger: boolean,
    change?: (page: number, rows?: number) => void,
    showSizeChange?: (page: number, size: number) => void
}
