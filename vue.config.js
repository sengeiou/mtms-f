// vue.config.js for less-loader@6.0.0
module.exports = {
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
    devServer: {
        disableHostCheck: true,
        port: 8080
    },
    // devServer: {
    //     disableHostCheck: true,
    //     proxy:
    //         process.env.NODE_ENV === "development"
    //             ? {
    //                 "/api": {
    //                     target: process.env.VUE_APP_BASE_URL,
    //                     ws: true,
    //                     changeOrigin: true,
    //                     pathRewrite: {
    //                         "^/api": ""
    //                     }
    //                 }
    //             }
    //             : null
    // }
};