import axios from 'axios'

const showStatus = (status: number) => {
    let message = '';
    switch (status) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '未授权，请重新登录(401)'
            break
        case 403:
            message = '拒绝访问(403)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 408:
            message = '请求超时(408)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        case 504:
            message = '网络超时(504)'
            break
        case 505:
            message = 'HTTP版本不受支持(505)'
            break
        default:
            message = `连接出错(${status})!`
    }
    return `${message}，请检查网络或联系管理员！`
}

//让ajax携带cookie
axios.defaults.withCredentials=true;
const service = axios.create({
    baseURL: process.env.VUE_APP_GW_SERVER_PATH,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    // 是否跨站点访问控制请求
    // withCredentials: true,
    timeout: 30000,
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    transformRequest: [(data) => {
        data = JSON.stringify(data)
        return data
    }],
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全返回resolve，在业务代码中处理异常。这里根据返回的true或者false执行promise。true，resolve；false，reject
        return true;
    },
})
// 请求拦截器
service.interceptors.request.use((config: any) => {
    if (localStorage.getItem('token')) { //判断token是否存在
        config.headers.token = localStorage.getItem('token'); //将token设置进请求头
    }
    return config
}, (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.message = '服务器异常，请联系管理员！'
    return Promise.reject(error)
})


// 响应拦截器
service.interceptors.response.use((response: any) => {
    const status = response.status
    //判断403跳转到登录页面
    if (response.status == 403) {
        //清除缓存中的数据
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('rToken');
        //向UAP发送消息，跳转到登录页面
        window.parent.postMessage('toLogin',process.env.VUE_APP_UAP_SERVER_PATH);
    }
    let message = ''
    if (status < 200 || status >= 300) {
        // 处理http错误，抛到业务代码
        message = showStatus(status)
        if (typeof response.data === 'string') {
            response.data = { message }
        } else {
            response.data.message = message
        }
    }
    return response.data
}, (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.message = '请求超时或服务器异常，请检查网络或联系管理员！'
    return Promise.reject(error)
})


// 封装get方法
export const serviceGet = (url: string, params: any | null): any => {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
//封装post方法   Jsonstr参数用来判断传参是否转json
export const servicePost = (url: string, params: any | null, Jsonstr: boolean): any => {
    if (Jsonstr) {
        params = JSON.stringify(params)
    }
    return new Promise((resolve, reject) => {
        service.post(url, params).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
//封装delete
export const serviceDel = (url: string, params: any | null): any => {
    return new Promise((resolve, reject) => {
        service.delete(url, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
//上传
export const serviceUp = (url: string, params: any | null): any => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return new Promise((resolve, reject) => {
        service.post(url, params, config).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}