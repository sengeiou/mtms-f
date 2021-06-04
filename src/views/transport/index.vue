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
      <a-table :dataSource="tableData" bordered :columns="tableColumns" rowKey="uid"/>
    </div>
  </div>
</template>
<script lang="ts">
  import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  // onUnmounted,
  onUpdated,
  getCurrentInstance,
  ref,
} from "vue";
import moment, { Moment } from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn'); 
// import { moment } from "../../common/moment";
import { getTransportList } from "../../https/api";
interface contentData {
  searchData: {
    state: string, 
    keyword: string, 
    keyvalue: string,
    // shipperName: string; 
    // shipperCellphone: string; 
    // code: string; 
    orderTime:  Array<any>;
    serveTime: Array<any>;
    firmId: number;
  
  };
  // stateData: Array<any>;
  onSearch: () => void;

  tableData: Array<any>;
  tableColumns: Array<any>;

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
        // shipperName: "", 
        // shipperCellphone: "", 
        // code: "", 
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
          key: "state",
          width: 120,
        },
        
      ],

    });
     //获取状态列表
    /*  const getStateList = () => {
      getTransportState().then((res: any) => {
        if (res.code == "200") {
          data.stateList = res.result;
        } else {
          proxy.$message.error(res.message);
        }
      });
    }; */
    
    // 获取运输单列表
     const getTransportTable = () => {
      const params = {
        page: 1,
        rows: 10,
        state: data.searchData.state, 
        keyword: data.searchData.keyword, 
        keyvalue: data.searchData.keyvalue,
        orderTime:  data.searchData.orderTime.join('-'),
        serveTime: data.searchData.serveTime.join('-'),
        firmId: 8
      };
      getTransportList(params).then((res: any) => {
        if (res.success) {
          data.tableData = res.data.rows;
        } else {
          proxy.$message.error(res.message);
        }
      });
    };
    return {
      ...toRefs(data),
      moment,

    };
  }
})




</script>
