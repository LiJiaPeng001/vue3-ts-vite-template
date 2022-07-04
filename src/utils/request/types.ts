export interface OptionsConfig {
  shouldLogin?: boolean,
  shouldToast?: boolean,
  shouldLoading?: boolean,
}

export interface CreateApiOptions {
  maxCount?: number,  // 最大请求数量
  createOptions?: Object, // axios默认配置
  handleError?: Function, // 自定义错误处理
  loginForce?: Function, // 返回401登录后再次尝试
  setHeaders?: Function, // 动态设置headers
  toast?: Function, // 提示方法
  loading?: Function, // loading方法
}