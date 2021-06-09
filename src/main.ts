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
  Pagination,
  Modal,
  Row,
  Col,

} from "ant-design-vue";

import "@/assets/css/common.css";
import "@/assets/fonts/iconfont.css";
import { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

/* import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn');  */

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
  Pagination,
  Modal,
  Row,
  Col,
 
];
const useAnt = (AntArr: Array<any>) => {
  AntArr.forEach(item => {
    app.use(item);
  })
};

app.use(store).use(router);
useAnt(AntArr);
app.config.globalProperties.$message = message;
// app.config.globalProperties.$moment = moment;
app.mount("#app");

