import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Hello from "@/views/Hello.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/Hello",
    name: "Hello",
    component: Hello
  },
  /* {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from) => {
      //过滤登录页面
      if(from.fullPath == '/'){
        return true;
      }
      // 从localstorage中获取token
      const token = sessionStorage.getItem("UAP_accessToken");
      const rToken = sessionStorage.getItem("UAP_refreshToken");
      if (!token || !rToken) {
        //向UAP发送消息，跳转到登录页面
        window.parent.postMessage('toLogin', uap_url);
      }
    }
  }, */
  {
    path: "/transport",
    name: "Transport",
    meta: {
      title: "运输单列表",//路由名称。
    },
    component: () => import('../views/transport/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  //过滤登录页面
  if(from.fullPath == '/'){
    return true;
  }
  // 从sessionStorage中获取token,权限菜单url，
  const token = sessionStorage.getItem("UAP_accessToken");
  const rToken = sessionStorage.getItem("UAP_refreshToken");
  const menuUrls = sessionStorage.getItem("menuUrls")?.split(',');
 if (!token || !rToken || !menuUrls?.includes(to.fullPath)) {
   //向UAP发送消息，跳转到登录页面
   window.parent.postMessage('toLogin', process.env.VUE_APP_UAP_SERVER_PATH);
  }
  
})

router.onError((error) => {
  console.log(error, "路由错误");
});



export default router



