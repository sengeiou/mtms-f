<template>
  <div class="container">
    <div class="search">
      <a-form layout="inline" :model="searchData" >
        <a-form-item label="客户姓名">
          <a-input v-model:value="searchData.name" />
        </a-form-item>
        <a-date-picker v-model:value="value1" />
        <a-range-picker v-model:value="value3" />
        <a-form-item label="下单时间">
          <a-range-picker
            style="width: 400px"
            v-model:value="value3"
            :show-time="{
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
            }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item >
          <a-button style="margin-right: 10px">清空</a-button>
          <a-button type="primary" @click="onSearch">查询</a-button>
        </a-form-item>
      </a-form>
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
  // onUpdated,
  getCurrentInstance,
  ref,
  // nextTick,
} from "vue";
import moment, { Moment } from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn'); 
// import DiliPagination from "../../components/DiliPagination.vue";
// import { debounce, formatDate, strSubStr } from "../../common/index";
import {
 
} from "../../https/api";
// import getScollTableHeight from "../../common/getScollTableHeight";
interface tempeData {
  searchData: {
    name: string; //产品名称
    createTime:  string | undefined; //下单时间
  
  };
  onSearch: () => void;
 
}
export default defineComponent({
  name: "transport",
  setup() {
    // const { proxy }: any = getCurrentInstance(); 
    const data: tempeData = reactive({
      searchData: {
        name: "", //产品名称
        createTime: undefined, //下单时间
      },
      onSearch: () => {
        getTableData();
      },
    })
    //获取表格数据
    const getTableData = () => {
      console.log('获取表格数据')
    };
    onMounted(()=>{
      console.log('data', data)
      console.log('searchData', data.searchData)
    })
    return {
      moment,
      ...toRefs(data),
      value1: ref<Moment>(),
      value3: ref<Moment[]>([])
    };
  }
})




</script>
