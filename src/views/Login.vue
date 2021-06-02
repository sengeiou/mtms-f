<template>
  <div>
    login
  </div>
</template>
<script>
  import {defineComponent} from "vue";
  import { getToken } from "../https/api";
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
          return false;
        }
        var dataJson = JSON.parse(data);
        var cmd = dataJson.cmd;
        //接收UAP发送的token数据
        if(cmd == "routerPush"){
          routerPush(dataJson.url);
        }
      },false);

      //从网关向UAP获取token和功能权限
      getToken({systemCode: "MTMS",}).then(function (response) {
        let res = JSON.parse(response.data);
        sessionStorage.setItem("UAP_accessToken", res.accessToken);
        sessionStorage.setItem("UAP_refreshToken", res.refreshToken);
        sessionStorage.setItem("menuUrls", JSON.parse(res.menuUrls));
        sessionStorage.setItem("resourceCodes", res.resourceCodes);
        //向UAP发送消息，设置origin
        window.parent.postMessage('{"cmd":"logined", "systemCode":"MTMS"}',process.env.VUE_APP_UAP_SERVER_PATH);
        //登录成功，跳转到Index
        routerPush("/Home");
      })
      .catch(function (error) {
        console.log("error:"+error);
        //向UAP发送消息，跳转到登录页面
        window.parent.postMessage('toLogin',process.env.VUE_APP_UAP_SERVER_PATH);
      });
    }
  })
</script>

