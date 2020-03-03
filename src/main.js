import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入限制模块
import ElementUI from 'element-ui' // 引入element-ui
import axios from 'axios' // 引入axios
import Components from '@/components' // 引入组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册element-ui
Vue.use(Components) // 注册组件

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn' // 配置基地址
Vue.prototype.$axios = axios // 全局注册axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
