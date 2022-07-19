/**
 * @param {Function} - toLoadMore 底部触发事件
 * @param {Function} - actionFn   滚动触发事件
 * @param {Number} - time 节流时间间隔
 * @param {Element} ele 滚动Element 默认body
 */
let noop = () => { }

interface PropsOptions {
  toLoadMore?: Function,
  actionFn?: Function,
  time?: number
  ele?: Element
}

interface RectOptions {
  clientHeight: number,
  scrollTop: number,
  scrollHeight: number
}

class MoreMain {
  public loadMoreFn: EventListener
  public moreOptions: PropsOptions
  constructor(props: PropsOptions) {
    this.moreOptions = props
    if (!this.moreOptions.ele) this.moreOptions.ele = document.body || document.documentElement
    this.loadMoreFn = noop
  }
  // 获取三围
  getElementClientRect(): RectOptions {
    let ele = this.moreOptions.ele as Element
    return {
      clientHeight: ele.clientHeight,
      scrollTop: ele.scrollTop,
      scrollHeight: ele.scrollHeight
    }
  }
  // 开启监听
  mounted() {
    let ele = this.moreOptions.ele as Element
    ele.addEventListener("scroll", this.loadMoreFn, { passive: false });
  }
  // 取消监听
  destroy() {
    let ele = this.moreOptions.ele as Element
    if (this.loadMoreFn) {
      ele.removeEventListener("scroll", this.loadMoreFn);
      this.loadMoreFn = noop;
    }
  }
}

class LoadMore extends MoreMain {
  constructor(props: PropsOptions) {
    super(props)
    let { time = 100, toLoadMore = noop, actionFn = noop } = props
    this.loadMoreFn = useThrottleFn(() => {
      let { scrollTop, clientHeight, scrollHeight } = this.getElementClientRect()
      actionFn(scrollTop);
      if (scrollTop + clientHeight >= scrollHeight - 80) {
        toLoadMore();
      }
    }, time)
  }
}

export default function useLoadMore(props: PropsOptions) {
  let loadmore = new LoadMore(props)
  loadmore.mounted()
  onUnmounted(() => {
    loadmore.destroy()
  })
}
