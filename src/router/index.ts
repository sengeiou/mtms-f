import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from "vue-router";
import Home from "@/views/Home.vue";
import Index from "@/views/Index.vue";
import Hello from "@/views/Hello.vue";
import Login from "@/views/Login.vue";
import { App } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login
  },{
    path: "/Index",
    name: "Index",
    component: Index
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }, {
    path: "/hello",
    name: "Hello",
    component: Hello
  }
];

const uap_url = process.env.UAP_URL;

function createRouterGuards(router: Router) {
  router.beforeEach((to, from) => {
    console.log("fullPath:"+from.fullPath);
    if(from.fullPath == '/'){
      return true;
    }
    // 从localstorage中获取token
    const token = sessionStorage.getItem("UAP_accessToken");
    if (token) {
      return true;
    } else {
      //向UAP发送消息，跳转到登录页面
      window.parent.postMessage('toLogin',process.env.VUE_APP_UAP_SERVER_PATH);
    }
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// export function setupRouter(app: App) {
//   app.use(router);
//   // 创建路由守卫
//   createRouterGuards(router);
// }

function routerPush(vm: any, routerPath:string){

  vm.$router.push({
    path: "/about"
  });
}
function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export {setupRouter, routerPush};
