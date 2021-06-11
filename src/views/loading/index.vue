<template>
  <div class="container">
    <div class="search">
      <a-form ref="searchFormRef" 
        layout="inline" 
        :model="searchData" 
        :rules="rules"
      >
        <a-form-item label="状态" name="state">
          <a-select v-model:value="searchData.state" style="width: 150px">
            <a-select-option value="0" >全部</a-select-option>
            <a-select-option value="1">待接单</a-select-option>
            <a-select-option value="2">已接单</a-select-option>
            <a-select-option value="3">已完成</a-select-option>
            <a-select-option value="4">已失效</a-select-option>
            <a-select-option value="5">已删除</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="关键字" name="keyword">
          <a-input-group compact  style="width: 330px">
            <a-select v-model:value="searchData.keyword" style="width: 40%">
              <a-select-option value="shipperName">客户姓名</a-select-option>
              <a-select-option value="shipperCellphone">客户手机号</a-select-option>
              <a-select-option value="code">物流装卸单号</a-select-option>
            </a-select>
            <a-input v-model:value.trim="searchData.keyvalue" style="width: 60%" />
          </a-input-group>
        </a-form-item>
        <a-form-item label="下单时间" name="orderTime">
          <a-range-picker
            :placeholder="['开始时间', '结束时间']"
            v-model:value="searchData.orderTime"
            :show-time="{
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            }"
            valueFormat="YYYY-MM-DD hh:mm:ss"
          />
        </a-form-item>
        <a-form-item label="服务时间" name="serveTime">
          <a-range-picker
            :placeholder="['开始时间', '结束时间']"
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
        :page="searchData.page"
        :rows="searchData.rows"
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
            <a-form-item label="物流装卸单号">
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
              :dataSource="modalDetailFormData.loadingItem" 
              :columns="modalLoadingItemColumns"  
              :pagination="false"
              :loading="tableLoading"
              bordered 
              style="margin-bottom: 25px;"
            >
            </a-table>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item label="需求地址">
              <a-input-group compact>
                <a-input style="width: 50%;" disabled v-model:value="modalDetailFormData.shipperAddress" />
                <a-input style="width: 25%;" disabled v-model:value="modalDetailFormData.shipperName" />
                <a-input style="width: 25%;" disabled v-model:value="modalDetailFormData.shipperCellphone" />
              </a-input-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
         
          <a-col :span="8">
            <a-form-item label="服务时间">
              <a-input
                disabled
                v-model:value="modalDetailFormData.serviceTime"
              >
              </a-input> 
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="服务类型">
              <a-input
                disabled
                v-model:value="modalDetailFormData.serviceType"
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

  import { getLoadingList, getLoadingDetail } from "../../https/api";
  import DiliPagination from "../../components/DiliPagination.vue";
//引入ts接口

  interface contentData {
    // 列表
    tableData: Array<any>;
    tableColumns: Array<any>;
    
    // 分页
    total: number;
    tableLoading: boolean;

    // 弹框
    modalDetailFormData: any;
    modalDetailVisible: boolean;
    modalLoadingItemColumns: Array<any>;
  }
  export default defineComponent({
    name: "loading",
    setup() {
      const { proxy }: any = getCurrentInstance(); 
      const moment: any = inject('moment');
      const searchFormRef = ref();
        
      const searchForm = reactive({
        searchData:  {
          state: '0', 
          keyword: 'shipperName',
          keyvalue: '',
          orderTime: [], 
          serveTime: [], 
          firmId: 8,
          page: 1,
          rows: 10
        }
      })
      const data: contentData = reactive({
        // 搜索
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
            title: '物流装卸单编号',
            dataIndex: 'code',
            key: 'code',
            width: 120,
          },
          {
            title: '服务时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 120,
          },
          {
            title: '服务类型',
            dataIndex: 'vehicleType',
            key: 'vehicleType',
            width: 120,
          },
          {
            title: '报价金额',
            dataIndex: 'offer',
            key: 'offer',
            width: 120,
          },
          {
            title: '需求地址',
            dataIndex: 'shipperAddress',
            key: 'shipperAddress',
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
        total: 0,
        tableLoading: false,
        
        // 弹框详情
        modalDetailVisible: false,
        modalDetailFormData: {},
        modalLoadingItemColumns:[
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
      
      /* -----------------------搜索----------------------- */
      // 关键字自定义校验
      const validateKeyvalue = async (rule: any, value: any) => {
        switch(searchForm.searchData.keyword) {
          case 'shipperName':
            if (value.length > 50){
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
      const rules = {
        keyvalue: [{ validator: validateKeyvalue, trigger: 'change' }],
      };
      // 搜索&重置
      const resetSearchForm = () => {
        // 由于没有找到清空组合框的方法，暂时只能手动赋值为空
        searchForm.searchData.keyvalue = '';
        searchFormRef.value.resetFields();
      };
      const search = () => {
        searchFormRef.value.validate()
        .then(() => {
          console.log('values');
          getLoadingTable();
        })
        .catch((error: any) => {
          console.log('error', error);
        });
      };
      // 获取装卸单列表
      const getLoadingTable = (): any=> {
        data.tableLoading = true;
        const params = {
          page: searchForm.searchData.page,
          rows: searchForm.searchData.rows,
          state: searchForm.searchData.state, 
          keyword: searchForm.searchData.keyword, 
          keyvalue: searchForm.searchData.keyvalue,
          orderTime:  searchForm.searchData.orderTime?.join('-'),
          serveTime: searchForm.searchData.serveTime?.join('-'),
          firmId: 8
        };
        getLoadingList(params).then((res: any) => {
          data.tableLoading = false;
          if (res.success) {
            data.tableData = res.data.rows;
            data.total = res.data.total;
          } else {
            proxy.$message.error(res.message);
          }
        });
      };

      /* -----------------------分页----------------------- */
       //分页变化
      const change = (current: number) => {
        searchForm.searchData.page = current;
        getLoadingTable();
      };
      const showSizeChange = (current: number, size: number) => {
        searchForm.searchData.page = current;
        searchForm.searchData.rows = size;
        getLoadingTable();
      };
       //当前显示条数变化
      onMounted(() => {
        getLoadingTable();
      });

      /* -----------------------弹框----------------------- */
      // 查看详情
      const openDetail = (record: any) => {
        const params = {
          id: record.id,
        };
        getLoadingDetail(params).then((res: any) => {
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
        ...toRefs(searchForm),
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

