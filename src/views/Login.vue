<template>
  <router-view fullPath="/Login" />
</template>
<script>
  import {defineComponent} from "vue";
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
          sessionStorage.setItem("UAP_accessToken", dataJson.accessToken);
          sessionStorage.setItem("UAP_refreshToken", dataJson.refreshToken);
          sessionStorage.setItem("menuUrls", dataJson.menuUrls);
          sessionStorage.setItem("resourceCodes", dataJson.resourceCodes);
          //登录成功，跳转到Index
          routerPush("/Index");
          //判断是否有权限的代码如下:
          // let menuUrls = sessionStorage.getItem("menuUrls");
          // console.log(JSON.parse(menuUrls).indexOf("/hello")>0);
          //接收UAP菜单点击的路由跳转消息
        }else if(cmd == "routerPush"){
          routerPush(dataJson.url);
        }
      },false);
      //向UAP发送消息，获取token
      window.parent.postMessage('{"cmd":"getToken", "systemCode":"MTMS"}',process.env.VUE_APP_UAP_SERVER_PATH);
    }
  })
</script>

