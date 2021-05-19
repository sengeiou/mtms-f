import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Index.vue";
import Hello from "../views/Hello.vue";
import { App } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
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
  router.beforeEach((to, from, next) => {
    // 从localstorage中获取token
    const token = null;
    if (token) {
      next();
    } else {
      // window.location.href = uap_url;
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
  // createRouterGuards(router);
}

export {setupRouter, routerPush};