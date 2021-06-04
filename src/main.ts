import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

import {
  Menu,
  Form,
  Input,
  Button,
  Checkbox,
  Table,
  DatePicker,
  ConfigProvider,
  Breadcrumb,
  Select,

} from "ant-design-vue";

import "@/assets/css/common.css";
import "@/assets/fonts/iconfont.css";
import { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const app = createApp(App);

const AntArr = [ Menu,
  Form,
  Input,
  Button,
  Checkbox,
  Table,
  DatePicker,
  ConfigProvider,
  Breadcrumb,
  Select,
  
];
const useAnt = (AntArr: Array<any>) => {
  AntArr.forEach(item => {
    app.use(item);
  })
};

app.use(store).use(router);
useAnt(AntArr);
app.config.globalProperties.$message = message;
app.mount("#app");

