<template>
  <div class="pagination flex-ed">
    <a-pagination
      :show-total="(total) => `共${total}条`"
      :current="current"
      :total="total"
      :pageSize="pageSize"
      :showSizeChanger="showSizeChanger"
      @change="change"
      @showSizeChange="showSizeChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { pageData } from "../common/publicInterface";

export default defineComponent({
  name: "DiliPagination",
  props: {
    current: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const { current, pageSize,total } = toRefs(props);
    const data: pageData = reactive({
      current: current,
      pageSize: pageSize,
      total: total,
      showSizeChanger: true,
      change: (page: number) => {
        context.emit("change", page);
      },
      showSizeChange: (current: number, size: number) => {
        context.emit("showSizeChange", current,size);
      },
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style lang="less" scoped>
.pagination {
  height: 40px;
}
</style>
