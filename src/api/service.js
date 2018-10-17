import axios from "./api";
const CUP = 'ca-user-provider'; //供应商api
const CCP = 'ca-config-provider';

/**
 * 登录
 */

export const reactLogin = (params) => axios.post(`${CUP}/source-open/login`, params, false)

/**
 * 注册
 */

export const register = (params) => axios.post(`${CUP}/source-open/register`, params)

/**
 * 验证手机号是否被注册
 */

export const verifyPhoneNum = (params) => axios.get(`${CUP}/source-open/checkMobilePhone`, params)

/**
 * 发送手机验证码

 */
export const sendPhoneCaptcha = (params) => axios.post(`${CUP}/source-open/sendPhoneCaptcha`, params)
/**
 * 查询全部国家代码和手机区号
 */

export const getAreaAndCode = (params) => axios.get(`ca-config-provider/config/source-open/getAreaAndCode`, params)
/**
 * 获取登录用户

 */
export const getCurrentUser = (params) => axios.get(`${CUP}/getCurrentUser`, params)