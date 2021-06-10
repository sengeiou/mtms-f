<template>
  <div class="container">
    <div class="search">
      <a-form ref="searchFormRef" 
        layout="inline" 
        :model="searchData" 
        :rules="rules"
      >
        <a-form-item label="状态" >
          <a-select v-model:value="searchData.state" style="width: 150px">
            <a-select-option value="0" >全部</a-select-option>
            <a-select-option value="1">待接单</a-select-option>
            <a-select-option value="2">已接单</a-select-option>
            <a-select-option value="3">已完成</a-select-option>
            <a-select-option value="4">已失效</a-select-option>
            <a-select-option value="5">已删除</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="关键字"  name="keyvalue">
          <a-input-group compact  style="width: 330px">
            <a-select v-model:value="searchData.keyword" style="width: 40%">
              <a-select-option value="shipperName">客户姓名</a-select-option>
              <a-select-option value="shipperCellphone">客户手机号</a-select-option>
              <a-select-option value="code">物流运输单号</a-select-option>
            </a-select>
            <a-input v-model:value="searchData.keyvalue" style="width: 60%" />
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
          <a-button style="margin-right: 10px" @click="resetSearchForm">清空</a-button>
          <a-button type="primary" @click="search">查询</a-button>
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
      >
      <template #state="{ record }">
        <span v-if="record.state==1">待接单</span>
        <span v-if="record.state==2">已接单</span>
        <span v-if="record.state==3">已完成</span>
        <span v-if="record.state==4">已失效</span>
        <span v-if="record.state==5">已删除</span>
        <span v-else></span>
      </template>
      <template #action="{ record }">
        <span>
          <a href="#" @click="openDetail(record)">查看</a>
        </span>
      </template>
      </a-table>
    </div>
    <DiliPagination
        :page="page"
        :rows="rows"
        :total="total"
        @change="change"
        @showSizeChange="showSizeChange"
    ></DiliPagination>
    <!-- 详情弹窗 -->
    <a-modal
      :visible="modalDetailVisible"
      title="用例详情"
      :width="1000"
      @cancel="handleDetailCancel"
      :maskClosable="false"
    >
      <a-form
        autoComplete="off"
        :model="modalDetailFormData"
        :label-col="{ style: 'width: 120px' }"
        :wrapperCol="{ style: 'width: calc(100% - 120px)' }"
        ref="modalDetailFormRef"
        class="modal_form"
      >
        <a-row :gutter="8">
          <a-col :span="8">
            <a-form-item label="物流运输单号">
              <a-input
                disabled
                v-model:value="modalDetailFormData.code"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="状态">
              <a-input
                disabled
                v-model:value="modalDetailFormData.state"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="客户">
              <a-input
                disabled
                v-model:value="modalDetailFormData.shipperName"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="下单时间">
              <a-input
                disabled
                v-model:value="modalDetailFormData.createTime"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="接单时间">
              <a-input
                disabled
                v-model:value="modalDetailFormData.takeTime"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="完成时间">
              <a-input
                disabled
                v-model:value="modalDetailFormData.completeTime"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="关闭时间">
              <a-input
                disabled
                v-model:value="modalDetailFormData.closeTime"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="取消时间">
              <a-input
                disabled
                v-model:value="modalDetailFormData.cancelTime"
              >
              </a-input> 
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-table 
              rowKey="goodsName"
              :dataSource="modalDetailFormData.transportItem" 
              :columns="modalTransportItemColumns"  
              :pagination="false"
              :loading="tableLoading"
              bordered 
            >
            </a-table>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item label="发货地址">
              <a-input-group compact>
                <a-input style="width: 50%;" disabled v-model:value="modalDetailFormData.shipperAddress" />
                <a-input style="width: 25%;" disabled v-model:value="modalDetailFormData.shipperName" />
                <a-input style="width: 25%;" disabled v-model:value="modalDetailFormData.shipperCellphone" />
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="收货地址">
              <a-input-group compact>
                <a-input style="width: 50%;" disabled v-model:value="modalDetailFormData.deliveryAddress" />
                <a-input style="width: 25%;" disabled v-model:value="modalDetailFormData.deliveryName" />
                <a-input style="width: 25%;" disabled v-model:value="modalDetailFormData.deliveryCellphone" />
              </a-input-group>
            </a-form-item>
          </a-col>
          
        </a-row>
        <a-row>
          <a-col :span="8">
            <!-- modalDetailFormData.vehicleNumber -->
            <a-form-item label="承运需求">
              <a-input
                disabled
                v-model:value="modalDetailFormData.vehicleType"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="用车时间">
              <a-input
                disabled
                v-model:value="modalDetailFormData.serviceTime"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="报价金额">
              <a-input
                disabled
                v-model:value="modalDetailFormData.offer"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="备注">
              <a-input
                disabled
                v-model:value="modalDetailFormData.notes"
              >
              </a-input> 
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <a-button @click="handleDetailCancel">关闭</a-button>
      </template>
    </a-modal>
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
  inject,
  } from "vue";

  import { getTransportList, TransportDetail } from "../../https/api";
  import DiliPagination from "../../components/DiliPagination.vue";
 
  interface contentData {
    // 搜索表单
    searchData: {
      state: string, 
      keyword: string, 
      keyvalue: string,
      orderTime:  Array<any>,
      serveTime: Array<any>,
      firmId: number,
    
    };
    // 列表
    tableData: Array<any>;
    tableColumns: Array<any>;
    
    // 分页
    page: number;
    rows:number;
    total: number;
    tableLoading: boolean;

    // 弹框
    modalDetailFormData: any;
    modalDetailVisible: boolean;
    modalTransportItemColumns: Array<any>;
  }
  export default defineComponent({
    name: "transport",
    setup() {
      const { proxy }: any = getCurrentInstance(); 
      const moment: any = inject('moment');
      const searchFormRef = ref();
      const data: contentData = reactive({
        // 搜索
        searchData: {
          state: '0', 
          keyword: 'shipperName',
          keyvalue: '',
          orderTime:  [], 
          serveTime: [], 
          firmId: 8,
        },
        
        // 列表
        tableData: [],
        tableColumns: [
          {
            title: '下单时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 120,
          },
          {
            title: '客户姓名',
            dataIndex: 'shipperName',
            key: 'shipperName',
            width: 120,
          },
          {
            title: '客户手机号',
            dataIndex: 'shipperCellphone',
            key: 'shipperCellphone',
            width: 120,
          },
          {
            title: '物流运输单编号',
            dataIndex: 'code',
            key: 'code',
            width: 120,
          },
          {
            title: '用车时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 120,
          },
          {
            title: '用车类型',
            dataIndex: 'vehicleType',
            key: 'vehicleType',
            width: 120,
          },
          {
            title: '用车数量',
            dataIndex: 'vehicleNumber',
            key: 'vehicleNumber',
            width: 120,
          },
          {
            title: '报价金额',
            dataIndex: 'offer',
            key: 'offer',
            width: 120,
          },
          {
            title: '发货地址',
            dataIndex: 'shipperAddress',
            key: 'shipperAddress',
            width: 120,
          },
          {
            title: '收货地址',
            dataIndex: 'deleveryAddress',
            key: 'deleveryAddress',
            width: 120,
          },
          {
            title: '状态',
            dataIndex: 'state',
            width: 120,
            slots: { customRender: 'state' },
          },
          {
            title: '操作',
            dataIndex: 'action',
            slots: { customRender: 'action' },
            width: 200,
          },
        ],

        //分页数据
        page: 1,
        rows: 10,
        total: 0,
        tableLoading: false,
        
        // 弹框详情
        modalDetailVisible: false,
        modalDetailFormData: {},
        modalTransportItemColumns:[
          {
            title: '货物',
            dataIndex: 'goodsName',
            key: 'goodsName',
            width: 120,
          },
          {
            title: '件数',
            dataIndex: 'number',
            key: 'number',
            width: 120,
          },
          {
            title: '件重（KG）',
            dataIndex: 'unitWeight',
            key: 'unitWeight',
            width: 120,
          },
          {
            title: '总重（KG）',
            dataIndex: 'totalWeight',
            key: 'totalWeight',
            width: 120,
          },
        ],
        

      });
      
      // 关键字自定义校验
      const validateKeyvalue = async (rule: any, value: any) => {
        switch(data.searchData.keyword) {
          case 'shipperName':
            if (value.length > 5){
              return Promise.reject('限50个字符');
            }
            break;
          case 'shipperCellphone':
            if (value.length > 11){
              return Promise.reject('限11个数字');
            }
            break;
          case 'code':
            if (value.length > 20){
              return Promise.reject('限20个字符');
            }
            break;
          default:
            return Promise.resolve();
        }

      };

      // 搜索&重置
      const resetSearchForm = () => {
        searchFormRef.value.resetFields();
      };
      const search = () => {
        searchFormRef.value.validate()
        .then(() => {
          console.log('values');
          getTransportTable();
        })
        .catch((error: any) => {
          console.log('error', error);
        });
      };
      const rules = {
        keyvalue: [{ validator: validateKeyvalue, trigger: 'change' }],
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
       //当前显示条数变化
      onMounted(() => {
        getTransportTable();
      });

      // 查看详情
      const openDetail = (record: any) => {
        const params = {
          id: record.id,
        };
        TransportDetail(params).then((res: any) => {
          if (res.success) {
            data.modalDetailVisible = true;
            data.modalDetailFormData = res.data;
          } else {
            proxy.$message.error(res.message);
          }
        });
      };
      const handleDetailCancel = () => {
        data.modalDetailVisible = false;
      };


      return {
        ...toRefs(data),
        rules,
        search,
        resetSearchForm,
        searchFormRef,
        moment,
        proxy,
        change,
        showSizeChange,
        openDetail,
        handleDetailCancel,
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
    padding: 10px 20px;
    .ant-form-inline .ant-form-item {
      margin-right: 26px;
    }
  }

}
</style>

