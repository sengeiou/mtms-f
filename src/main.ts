import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import { Button, message } from 'ant-design-vue';

const app = createApp(App);
app.use(Antd);
app.use(store);
// 挂载路由
setupRouter(app);
app.mount("#app");
