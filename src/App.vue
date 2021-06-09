<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
  import { defineComponent, reactive, toRefs, provide, readonly  } from "vue";
  import zhCN from "ant-design-vue/es/locale/zh_CN"; //ant a-config-provide 国际化。

  import moment from 'moment';
  import 'moment/dist/locale/zh-cn';
  moment.locale('zh-cn'); 
  
  export default defineComponent({
    setup() {
      const data = reactive({
        locale: zhCN,
      });
      provide('moment', readonly(moment))
      return {
        ...toRefs(data),
        moment
      };
    },
  });
</script>
<style lang="less"></style>
