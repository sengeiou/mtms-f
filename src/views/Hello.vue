<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item href="">
            Application Center
          </a-breadcrumb-item>
          <a-breadcrumb-item href="">
            Application List
          </a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
      <a-col :span="24">


        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="Activity name">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="Activity zone">
            <a-select v-model:value="formState.region" placeholder="please select your zone">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Activity time">
            <a-date-picker
                    v-model:value="formState.date1"
                    show-time
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Instant delivery">
            <a-switch v-model:checked="formState.delivery" />
          </a-form-item>
          <a-form-item label="Activity type">
            <a-checkbox-group v-model:value="formState.type">
              <a-checkbox value="1" name="type">Online</a-checkbox>
              <a-checkbox value="2" name="type">Promotion</a-checkbox>
              <a-checkbox value="3" name="type">Offline</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item label="Resources">
            <a-radio-group v-model:value="formState.resource">
              <a-radio value="1">Sponsor</a-radio>
              <a-radio value="2">Venue</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Activity form">
            <a-input v-model:value="formState.desc" type="textarea" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">Create</a-button>
            <a-button style="margin-left: 10px">Cancel</a-button>
          </a-form-item>
        </a-form>


      </a-col>

    </a-row>
    <a-row>
      <a-col :span="24">

        <a-table
                :columns="columns"
                :row-key="record => record.id"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
        >
          <template #userName="{ text }">{{ text}}</template>
        </a-table>

      </a-col>
    </a-row>
  </div>
</template>

<script >
  import { watch,ref, toRefs, defineComponent, computed, reactive, toRaw} from 'vue';
  import { usePagination } from 'vue-request';
  import axios from 'axios';
  //让ajax携带cookie
  axios.defaults.withCredentials=true;
  //全局axios配置
  const axiosInst = axios.create({
    baseURL: process.env.VUE_APP_GW_SERVER_PATH,
    timeout: 1000
  });
  // 添加响应拦截器
  // axiosInst.interceptors.response.use(function (response) {
  //   if(response.status != "200" || response.data.code != "200"){
  //     return Promise.reject(response.data.message);
  //   }
  //   // console.log("header:"+response.headers["UAP_accessToken"]);
  //   // console.log("header:"+JSON.stringify(response.headers));
  //   // 对响应数据做点什么
  //   return response.data.data;
  // }, function (error) {
  //   // 对响应错误做点什么
  //   return Promise.reject(error);
  // });

  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      sorter: true,
      width: '20%',
      slots: {
        customRender: 'userName',
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        {
          text: 'Male',
          value: 0,
        },
        {
          text: 'Female',
          value: 1,
        },
      ],
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const queryData = params => {
    return {
      url:`${process.env.VUE_APP_GW_SERVER_PATH}/dili-uap/userApi/listPage.api?sort=id&order=asc&${new URLSearchParams(params)}`,
      credentials:'include'
    };
  }

  export default defineComponent( {
    setup() {
      const formState = reactive({
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      });
      const onSubmit = () => {
        console.log('submit!', toRaw(formState));
      };

      // --------------- 表格属性 ---------------
      let totalRef = ref(0);
      const { data, run, loading, current, pageSize } = usePagination(queryData, {
        formatResult: res => {{
          totalRef.value = res.total;
          return res.rows;
        }},
        pagination: {
          currentKey: 'page',
          pageSizeKey: 'rows',
          totalKey:'total'
        },
      });
      // console.log("total:"+total.value+",data:"+JSON.stringify(data));

      const pagination = computed(() => ({
        total: totalRef.value,
        current: current.value,
        defaultPageSize:10,
        showSizeChanger:true,
        showTotal: total => `共 ${total} 条数据`,
        pageSizeOptions: ['10', '20', '50', '100'],
        pageSize: pageSize.value,
      }));

      const handleTableChange = (pag, filters, sorter) => {
        run({
          rows: pag.pageSize,
          page: pag?.current,
          sort: sorter.field,
          order: sorter.order,
          ...filters,
        });
      };
      // setTimeout(()=>{
      //   console.log("_rawValue:"+JSON.stringify(data.value.result));
      //   }, 2000)
      // const val = [{"cardNumber":"123456789000","cellphone":"13888888888","created":"2018-05-21 09:44:29","departmentId":9,"description":"超级管理员","email":"uap@diligrp.com","firmCode":"group","gender":0,"id":1,"lastLoginTime":"2021-05-25 14:34:59","locked":"2021-05-17 11:08:02","metadata":{},"modified":"2021-05-17 11:09:11","oldPassword":"123456","password":"3949BA59ABBE56E057","position":"职位","positionId":14,"realName":"超级管理员","serialNumber":"","state":1,"userName":"admin","userRoles":"集团管理员,哈哈哈,消息中心管理员,进门收费角色,商户审批员,供应链管理员,哈达系统管理员,进门收费管理员,沈阳管理员,克兰测试角色,杭州水产智能档位管理员,杭州水产溯源管理员"}];


      return {
        data: data,
        pagination,
        loading,
        columns,
        handleTableChange,
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
        formState,
        onSubmit,
      };
    },
    mounted() {
      //console.log(process.env.VUE_APP_UAP_SERVER_PATH);
    }
  });


</script>
