/**
 * 截流函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
export function throttle(fn: Function, time = 300) {
  let firstInvoke = true
  let timer: any
  return throttled

  function throttled(payload: any) {
    if (firstInvoke) {
      firstInvoke = false
      return fn(payload)
    }
    if (timer) return
    timer = setTimeout(() => {
      fn(payload)
      timer = null
    }, time)
  }
}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
export function debounce(fn: Function, time = 300) {
  let timer: any
  return debounced
  function debounced(payload: any) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn(payload)
      timer = null
    }, time)
  }
}