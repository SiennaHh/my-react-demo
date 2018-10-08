/**
 * Created by Chrise on 2018/06/23.
 * axios配置
 */
// 设置axios,process.env值是根据用户是测试还是生产来读取config中的dev.env和pro.env中的配置
import axios from 'axios'
import qs from 'qs';

import router from "../router/Routers";
// import { Loading } from 'element-ui';
let baseURL = '/api';
// let loadingInstance; //loading
if (process.env.NODE_ENV === 'development') { // 开发环境api接口
    baseURL = 'http://192.168.20.200:7070/'
} else if (process.env.NODE_ENV === 'test') { // 测试环境api接口
    baseURL = 'http://apitest.ca-b2b.cn:7070'
} else { // 线上环境api接口
    baseURL = 'http://api.ca-b2b.cn'
}
axios.defaults.baseURL = baseURL;
// axios.defaults.headers.common['Authorization'] = 'q-sign-algorithm=sha1&q-ak=AKIDxobFiz14uY4Paa42TkqxvjMo9LMDMOis&q-sign-time=1531115043;1531115223&q-key-time=1531115043;1531115223&q-header-list=host&q-url-param-list=&q-signature=04e5f6ff7af424b120f889a05cd3cb13b5dcb8a1' //process.env.API_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.get['X-AUTH-USERID'] = 9
axios.defaults.withCredentials = true;
// 测试

axios.interceptors.request.use(function(request) {
    // 判断本地是否有token值，有则从新设置token，没有使用token默认配置
    /**
     * 在这里做loading ...
     * @type {string}
     */

    // 获取token
    //   config.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get("web-token");
    // loadingInstance = Loading.service({ fullscreen: true });

    let moveToken = sessionStorage.getItem('token')
    if (moveToken) {
        request.headers.Authorization = `bearer ${moveToken}`
    };
    return request
}, function(error) {
    // 请求错误时做些事
    return Promise.reject(error)
})
// 添加一个响应拦截器
axios.interceptors.response.use(function(response) {

    // if (response.data) {
    //     console.log(response.data.rst)
    //     if (response.data.rst== false) {
    //         //未登录
    //     location.replace(`/usercenter`)
    //     }
    // }

    /**
     * 在这里做loading 关闭
     */
    // 如果后端有新的token则重新缓存
    // loadingInstance.close();
    let newToken = response.headers['new-token'];

    // if (newToken) {
    //     Vue.ls.set("web-token", newToken);
    // }

    return response;
}, function(error) {
    // Do something with response error
    let response = error.response;

    if (response.status == 401) {
        // 处理401错误
        if (response.config.url.indexOf('/getCurrentUser') === -1 &&
            response.config.url.indexOf('/ca-goods-provider/checkGoodsCollect') === -1 &&
            response.config.url.indexOf('/ca-user-provider/checkStoreCollect') === -1 &&
            response.config.url.indexOf('/ca-goods-provider/getBrowseHistoryByPage') === -1 &&
            response.config.url.indexOf('/ca-goods-provider/getAllCountByUserId') === -1 &&
            response.config.url.indexOf('/ca-goods-provider/checkMoreCollect') === -1 &&
            response.config.url.indexOf('/ca-user-provider/caStore/getStoreInfoByStoreId') === -1) {
            window.location.href = `/Login?backUrl=${router.currentRoute.fullPath}`;
        }
    } else if (response.status == 403) {
        // 处理403错误

    } else if (response.status == 412) {
        // 处理412错误

    } else if (response.status == 413) {
        // 处理413权限不足

    } else if (response.status == 500) {
        // 处理500服务器错误
        // Message({
        //     message: "System Error",
        //     type: "error"
        // });
    }
    return Promise.reject(response)
});

// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
// 获取参数
function getUrlParam(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    console.log(url.substr(1));
    var r = url.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
//isFormdata判断是否为Formdata
function apiAxios(method, url, params, isFormdata, headers, timeout) {
    if (params) {
        params = filterNull(params)
    }
    // let language = JSON.parse(window.localStorage.getItem('defaultLanguage')).value;
    return new Promise((resolve, reject) => {
        axios({
                method: method,
                url: method === 'GET' ? (url.indexOf('?') > -1 ? url + '&time=' + new Date().getTime() : url + '?time=' + new Date().getTime()) : url,
                data: method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH' ? isFormdata ? qs.stringify(params) : params : null,
                params: method === 'GET' || method === 'DELETE' ? isFormdata ? params : params : null,
                baseURL: baseURL,
                timeout: timeout&&timeout.timeout?timeout.timeout:6000,
                // headers: Object.assign({'Accept-Language':language},headers)
            }).then(response => {
                resolve(response.data);
                // if (response.data.code ==0) {
                //     resolve(response.data.data);
                // } else {
                //     resolve(response);
                //     // window.alert('error: ' + JSON.stringify(response.data.msg))
                // }
            })
            .catch(err => {
                if (err) {
                    reject(err.data)
                }

            })
    })
}

/**
 * 全局行为记录统一方法 ...
 *
 */


/**
 *  get post put delete请求方法
 * @param url
 * @param params
 * @param data
 * @returns {Promise}
 */
export default {
    get: function(url, params = {}, isFormdata, headers,timeout) {
        return apiAxios('GET', url, params, isFormdata, headers,timeout)
    },
    post: function(url, data = {}, isFormdata, headers = {},timeout) {
        return apiAxios('POST', url, data, isFormdata, headers,timeout)
    },
    put: function(url, data = {}, isFormdata,timeout) {
        return apiAxios('PUT', url, data, isFormdata, {},timeout)
    },
    delete: function(url, data = {}, isFormdata, headers = {},timeout) {
        return apiAxios('DELETE', url, data, isFormdata, headers,timeout)
    },
    patch: function(url, data = {}, isFormdata, headers = {},timeout) {
        return apiAxios('PATCH', url, data, isFormdata, headers,timeout)
    }
}
