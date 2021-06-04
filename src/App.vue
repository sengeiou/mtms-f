<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import zhCN from "ant-design-vue/es/locale/zh_CN"; //ant a-config-provide 国际化。

  export default defineComponent({
    setup() {
      const data = reactive({
        locale: zhCN,
      });
    
      return {
        ...toRefs(data),
      };
    },
  });
</script>
<style lang="less"></style>
