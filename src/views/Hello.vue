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
                :data-source="dataSource"
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

<script>
  import { defineComponent, computed, reactive, toRaw} from 'vue';
  import { usePagination } from 'vue-request';
  // import { routerPush } from "../router";

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
    return `http://gateway.diligrp.com:8285/dili-uap/userApi/list.api?${new URLSearchParams(params)}`;
  };

let app = {
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

      const { data: dataSource, run, loading, current, pageSize } = usePagination(queryData, {
        formatResult: res => {res.data},
        pagination: {
          currentKey: 'page',
          pageSizeKey: 'rows',
        },
      });
      const pagination = computed(() => ({
        total: 100,
        current: current.value,
        pageSize: pageSize.value,
      }));

      const handleTableChange = (pag, filters, sorter) => {
        run({
          results: pag.pageSize,
          page: pag?.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      };

      return {
        dataSource,
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
  };

  export default defineComponent(app);


</script>
