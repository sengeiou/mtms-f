import { createApp } from "vue";
import App from "./App.vue";
import Login from "./views/Login.vue";
import { setupRouter } from "./router/index";

import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(Login);
app.use(Antd);
app.use(store);
// 挂载路由
setupRouter(app);
const vm = app.mount("#app");
export default vm;