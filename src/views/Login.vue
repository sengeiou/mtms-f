<template>
  <router-view />
</template>
<script>
  import {defineComponent} from "vue";
  import axios from 'axios';
  //让ajax携带cookie
  axios.defaults.withCredentials=true;
  //全局axios配置
  const axiosInst = axios.create({
    baseURL: process.env.VUE_APP_GW_SERVER_PATH,
    timeout: 1000
  });
  // 添加响应拦截器
  axiosInst.interceptors.response.use(function (response) {
    if(response.status != "200" || response.data.code != "200"){
      return Promise.reject(response.data.message);
    }
    // 对响应数据做点什么
    return response.data.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  export default defineComponent({
    methods: {
      routerPush(url){
        this.$router.push(url);
      }
    },
    mounted() {
      let routerPush = this.routerPush;
      window.addEventListener('message',function(e){
        var data = e.data;
        var origin = e.origin;
        if(origin != process.env.VUE_APP_UAP_SERVER_PATH){
          return;
        }
        var dataJson = JSON.parse(data);
        var cmd = dataJson.cmd;
        //接收UAP发送的token数据
        if(cmd == "token_response"){
          // sessionStorage.setItem("UAP_accessToken", dataJson.accessToken);
          // sessionStorage.setItem("UAP_refreshToken", dataJson.refreshToken);
          // sessionStorage.setItem("menuUrls", dataJson.menuUrls);
          // sessionStorage.setItem("resourceCodes", dataJson.resourceCodes);
          // //登录成功，跳转到Index
          // routerPush("/Index");
          //判断是否有权限的代码如下:
          // let menuUrls = sessionStorage.getItem("menuUrls");
          // console.log(JSON.parse(menuUrls).indexOf("/hello")>0);
          //接收UAP菜单点击的路由跳转消息
        }else if(cmd == "routerPush"){
          routerPush(dataJson.url);
        }
      },false);
      //向UAP发送消息，设置origin
      window.parent.postMessage('{"cmd":"getToken", "systemCode":"MTMS"}',process.env.VUE_APP_UAP_SERVER_PATH);
      //从网关向UAP获取token和功能权限
      axiosInst.get("/dili-uap/login/getToken.action", {
                params: {
                  systemCode: "MTMS"
                }
              }
      ).then(function (response) {
        sessionStorage.setItem("UAP_accessToken", response.accessToken);
        sessionStorage.setItem("UAP_refreshToken", response.refreshToken);
        sessionStorage.setItem("menuUrls", response.menuUrls);
        sessionStorage.setItem("resourceCodes", response.resourceCodes);
        //登录成功，跳转到Index
        routerPush("/Index");
      })
      .catch(function (error) {
        console.log("error:"+error);
        //向UAP发送消息，跳转到登录页面
        window.parent.postMessage('toLogin',process.env.VUE_APP_UAP_SERVER_PATH);
      });
    }//end of mounted
  })
</script>

