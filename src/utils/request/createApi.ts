import axios from 'axios'
import { OptionsConfig, CreateApiOptions } from './types'
import type { AxiosRequestConfig, } from 'axios'
import { getErrStatus, getErrMsg } from './tools/index'

function noop() { }
function login() { }

export default (
  {
    loading = noop, // loading方法
    toast = noop, // 提示方法
    setHeaders = noop, // 动态设置headers
    handleError = noop, // 自定义错误处理
    loginForce = noop, // 返回401登录后再次尝试
    createOptions = {}, // axios默认设置
    maxCount = 1
  }: CreateApiOptions
) => {
  const instence = axios.create(createOptions)
  instence.interceptors.request.use((config: AxiosRequestConfig) => {
    const headers = setHeaders(config)
    Object.assign(config.headers || {}, headers);
    return config;
  })
  return async (requestOptions: AxiosRequestConfig,
    {
      shouldLoading = true,
      shouldToast = true,
      shouldLogin = false,
    }: OptionsConfig = {}) => {
    if (shouldLogin) await login();
    // 是否loadding
    if (shouldLoading) loading();
    for (let i = 0; i < maxCount + 1; i++) {
      try {
        const { data } = await instence(requestOptions);
        // 取消loading
        if (shouldLoading) loading();
        // success code
        if (data.code === "OK") return data.data;
        if (shouldToast) toast(data.msg, 4000);
        return Promise.reject(data.msg);
      } catch (e: any) {
        const status = getErrStatus(e);
        if (i < maxCount) {
          // 401重新登录
          if (status === 401 && loginForce) {
            await loginForce();
            continue;
          }
        }
        if (e.message.indexOf("timeout of") > -1) {
          toast("网络异常");
          continue;
        }
        if (shouldLoading) loading();
        // 自定义错误处理
        if (status) toast(getErrMsg(e) + status);
        handleError(e);
        return Promise.reject(e);
      }
    }
  }
}