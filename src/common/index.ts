//防抖,节流函数入参函数接口
interface ActionType {
    (params: any): void
}
//防抖。如果fn需要传参。那么可以在防抖函数加bind绑定。例：debounce(fn,100).bind(null,arg1,arg2,arg3)。
//值得注意的是箭头函数自身没有this，所以第一个参数不管传什么都不会起作用，但是可以传其余参
export const debounce = (fn: ActionType, time: number): any => {
    let timer: any = null;
    return (...args: any) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, time)
    }
}

//节流
export const throttle = (fn: ActionType, time: number): any => {
    let timer: any = null;
    return (...args: any) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, time);
        }
    };
}

//时间转化方法
//转化时间方法使用方法:formatDate(date, 'yyyy-MM-dd hh:mm:ss')
export const formatDate = (date: Date, format: string): string => {
    const time: any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S+': date.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in time) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? time[k] : ('00' + time[k]).substr(('' + time[k]).length));
        }
    }
    return format;
}

//获取url地址栏参数
export const getQueryString = (name: string): string | null => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const l = decodeURI(window.location.search);
    const r = l.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


/* //登录跳转
export const toLogin = (lastRoute: string, currentUrl: string): void => {
    window.location.href = `https://as.diligrp.com/api/oauth-server/authorize?client_id=alm_new&state=${window.btoa(lastRoute)}&scope=uap&redirect_uri=${currentUrl}/busLogin&response_type=code`
} */

//截取字符串前某位。返回xxxx+"xxx".参数:value：目标值，start:开始位置，length:从开始位置截取的个数，suffix：后缀
//如果截取的部分大于了本身长度，会返回字符串本身，并且不会返回后缀
export const strSubStr = (value: string, start = 0, length = 0, suffix = ""): string => {
    const strLength = value.length;
    let strValue = ""
    if (strLength < start || strLength < start + length) {
        return value
    } else {
        strValue = value.substr(start, length) + suffix
    }
    return strValue
}












