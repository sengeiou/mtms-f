<template>
<!--  <div id="nav">-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link> |-->
<!--    <a @click="click">dea</a>-->
<!--  </div>-->
  <router-view />
</template>
<script>
  import {defineComponent} from "vue";
  export default defineComponent({
    name: 'Hello',
    methods: {
      click() {
        this.$router.push({
          path: '/hello'
        })
      },
      routerPush(url){
        this.$router.push(url);
      }
    },
    mounted() {
      // let routerPush = this.routerPush;
      // window.addEventListener('message',function(e){
      //   var data = e.data;
      //   var origin = e.origin;
      //   if(origin != process.env.VUE_APP_UAP_SERVER_PATH){
      //     return;
      //   }
      //   var dataJson = JSON.parse(data);
      //   var cmd = dataJson.cmd;
      //   if(cmd == "token_response"){//接收UAP发送的token数据
      //     sessionStorage.setItem("UAP_accessToken", dataJson.accessToken);
      //     sessionStorage.setItem("UAP_refreshToken", dataJson.refreshToken);
      //     sessionStorage.setItem("menuUrls", dataJson.menuUrls);
      //     sessionStorage.setItem("resourceCodes", dataJson.resourceCodes);
      //     //判断是否有权限的代码如下:
      //     // let menuUrls = sessionStorage.getItem("menuUrls");
      //     // console.log(JSON.parse(menuUrls).indexOf("/hello")>0);
      //   }else if(cmd == "routerPush"){//接收UAP菜单点击的路由跳转消息
      //     routerPush(dataJson.url);
      //   }
      // },false);
      // //向UAP发送消息，获取token
      // window.parent.postMessage('{"cmd":"getToken", "systemCode":"MTMS"}',process.env.VUE_APP_UAP_SERVER_PATH);
    }
  })
</script>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
