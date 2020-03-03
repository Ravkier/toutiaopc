import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'

export default {
  install: function (Vue) {
    // 注册全局组件
    Vue.component('layout-aside', layoutAside) // 注册左侧导航组件
    Vue.component('layout-header', layoutHeader) // 注册头部组件
  }
}
