import createApi from './createApi'

/**
 * @desc 项目中单独配置
 */
export default createApi({
  setHeaders() {
    const headers = {
      "wt": 'yes',
      "Content-Type": "application/json",
    };
    return headers
  }
})