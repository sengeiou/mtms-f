<template>
  <div class="pagination flex-ed">
    <a-pagination
      :show-total="(total) => `共${total}条`"
      :page="page"
      :total="total"
      :rows="rows"
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
    page: {
      type: Number,
      default: 1,
    },
    rows: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const { page, rows,total } = toRefs(props);
    const data: pageData = reactive({
      page: page,
      rows: rows,
      total: total,
      showSizeChanger: true,
      change: (page: number) => {
        context.emit("change", page);
      },
      showSizeChange: (page: number, size: number) => {
        context.emit("showSizeChange", page, size);
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
