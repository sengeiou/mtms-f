module.exports = {
  runtimeCompiler: true, //确保运行，如果项目中使用了函数式组件，用了template就需要配置这个
  /* devServer: {
      proxy: {
          '/api': {
              target: "http://192.168.130.231:8080",
              changeOrigin: true,
              pathRewrite: { //重写路径
                  '^/api': ''
              }
          }
      }
  }, */
  devServer: {
    disableHostCheck: true,
    port: 8080
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  // 修改默认浏览器图标
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "装卸物流管理系统";
        return args;
      })
  },
}