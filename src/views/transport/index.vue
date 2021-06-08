<template>
  <div class="container">
    <div class="search">
      <a-form layout="inline" :model="searchData" >
        <a-form-item label="状态">
          <a-select v-model:value="searchData.state">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">已创建</a-select-option>
            <a-select-option value="2">已接单</a-select-option>
            <a-select-option value="3">已完成</a-select-option>
            <a-select-option value="4">已失效</a-select-option>
            <a-select-option value="5">已取消</a-select-option>
            <a-select-option value="6">已关闭</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="关键字">
          <a-input-group compact>
            <a-select v-model:value="searchData.keyword">
              <a-select-option value="shipperName">客户姓名</a-select-option>
              <a-select-option value="shipperCellphone">客户手机号</a-select-option>
              <a-select-option value="code">物流运输单号</a-select-option>
            </a-select>
            <a-input v-model:value="searchData.keyvalue" />
          </a-input-group>
        </a-form-item>
        <a-form-item label="下单时间">
          <a-range-picker
            v-model:value="searchData.orderTime"
            :show-time="{
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            }"
            valueFormat="YYYY-MM-DD hh:mm:ss"
          />
        </a-form-item>
        <a-form-item label="用车时间">
          <a-range-picker
            v-model:value="searchData.serveTime"
            :show-time="{
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            }"
            valueFormat="YYYY-MM-DD hh:mm:ss"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item >
          <a-button style="margin-right: 10px">清空</a-button>
          <a-button type="primary" @click="onSearch">查询</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="talbe">
      <a-table 
        rowKey="id"
        :dataSource="tableData" 
        :columns="tableColumns"  
        :pagination="false"
        :loading="tableLoading"
        bordered 
      ></a-table>
    </div>
    <DiliPagination
        :page="page"
        :rows="rows"
        :total="total"
        @change="change"
        @showSizeChange="showSizeChange"
      ></DiliPagination>
  </div>
</template>
<script lang="ts">
  import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  // onUnmounted,
  // onUpdated,
  computed,
  getCurrentInstance,
  ref,
  } from "vue";

  // import moment, { Moment } from 'moment';
  import moment from 'moment';
  import 'moment/dist/locale/zh-cn';
  moment.locale('zh-cn'); 
  // import { moment } from "../../common/moment";
  import { getTransportList } from "../../https/api";
  import DiliPagination from "../../components/DiliPagination.vue";
 

  interface contentData {
    searchData: {
      state: string, 
      keyword: string, 
      keyvalue: string,
      orderTime:  Array<any>;
      serveTime: Array<any>;
      firmId: number;
    
    };
    onSearch: () => void;

    tableData: Array<any>;
    tableColumns: Array<any>;
    page: number,
    rows:number,
    total: number;
    tableLoading: boolean;


  }
  export default defineComponent({
    name: "transport",
    setup() {
      const { proxy }: any = getCurrentInstance(); 
      const data: contentData = reactive({
        searchData: {
          state: "0", 
          keyword: "shipperName",
          keyvalue: "",
          orderTime:  [], 
          serveTime: [], 
          firmId: 8,
        },
        onSearch: () => {
          getTransportTable();
        },

        tableData: [],
        tableColumns: [
          {
            title: "下单时间",
            dataIndex: "createTime",
            key: "createTime",
            width: 120,
          },
          {
            title: "客户姓名",
            dataIndex: "shipperName",
            key: "shipperName",
            width: 120,
          },
          {
            title: "客户手机号",
            dataIndex: "shipperCellphone",
            key: "shipperCellphone",
            width: 120,
          },
          {
            title: "物流运输单编号",
            dataIndex: "code",
            key: "code",
            width: 120,
          },
          {
            title: "用车时间",
            dataIndex: "createTime",
            key: "createTime",
            width: 120,
          },
          {
            title: "用车类型",
            dataIndex: "vehicleType",
            key: "vehicleType",
            width: 120,
          },
          {
            title: "用车数量",
            dataIndex: "vehicleNumber",
            key: "vehicleNumber",
            width: 120,
          },
          {
            title: "报价金额",
            dataIndex: "offer",
            key: "offer",
            width: 120,
          },
          {
            title: "发货地址",
            dataIndex: "shipperAddress",
            key: "shipperAddress",
            width: 120,
          },
          {
            title: "收货地址",
            dataIndex: "deleveryAddress",
            key: "deleveryAddress",
            width: 120,
          },
          {
            title: "状态",
            dataIndex: "state",
            filters: [
              {
                text: '已创建',
                value: 1,
              },
              {
                text: '已接单',
                value: 2,
              },
            ],
            key: "state",
            width: 120,
          },
          
        ],
        //分页数据
        page: 1,
        rows: 10,
        total: 0,
        tableLoading: false,

      });
       //分页变化
      const change = (current: number) => {
        data.page = current;
        getTransportTable();
      };
      const showSizeChange = (current: number, size: number) => {
        data.page = current;
        data.rows = size;
        getTransportTable();
      };
  
       // 获取运输单列表
      const getTransportTable = (): any=> {
        data.tableLoading = true;
        const params = {
          page: data.page,
          rows: data.rows,
          state: data.searchData.state, 
          keyword: data.searchData.keyword, 
          keyvalue: data.searchData.keyvalue,
          orderTime:  data.searchData.orderTime.join('-'),
          serveTime: data.searchData.serveTime.join('-'),
          firmId: 8
        };
        getTransportList(params).then((res: any) => {
          data.tableLoading = false;
          if (res.success) {
            data.tableData = res.data.rows;
            data.total = res.data.total;
          } else {
            proxy.$message.error(res.message);
          }
        });
      };
       //当前显示条数变化
      onMounted(() => {
        getTransportTable();
        //添加监听窗口尺寸变化事件，实时更新窗口高度
        // window.addEventListener("resize", tableListener, false);
      });
      return {
        ...toRefs(data),
        moment,
        change,
        showSizeChange
      };
    },
    components: {
      DiliPagination,
    },
  })




</script>
<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  .search {
    padding-bottom: 4px;
    border-bottom: 1px solid #f5f5f5;
  }
  .btns {
    padding: 10px 0;
  }
  .table {
    height: calc(100% - 137px);
    :deep(.ant-table-body) {
      overflow: auto !important;
    }
  }
  .pagination {
    height: 40px;
  }
}
</style>

