// 获取表格高度ts
import { ref } from "vue";

export default function (): any {
    const Height = ref(1) //这个高度就是表格的滚动高度
    const getTableHeight = () => {
        const contentTable: any = document.getElementById("table"); //获取表格父容器
        const contentHeader: any = document.getElementsByClassName(
            "ant-table-thead"
        ); //获取表格头部
        const contentBody: any = document.getElementsByClassName(
            "ant-table-body"
        );
        const isEmpty: any = contentTable.getElementsByClassName(
            "ant-table-placeholder"
        );//判断是否有数据
        if (contentTable && contentHeader) {
            const tableHeight: number = contentTable.offsetHeight; //获取容器高度
            const tableHeaderHeight: number = contentHeader[0].offsetHeight; //获取表头高度
            const tableBodyHeight: number = tableHeight - tableHeaderHeight; //计算表格body高度
            if (isEmpty[0]) {
                Height.value = 1
                contentBody[0].style.height = "1px";
            } else {
                Height.value = tableBodyHeight;
                contentBody[0].style.height = tableBodyHeight + "px";
            }
        }
    }
    return {
        Height,
        getTableHeight
    }
}
