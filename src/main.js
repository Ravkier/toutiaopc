import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less'
import axios from 'axios' // 引入axios

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册element-ui

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn' // 配置基地址
Vue.prototype.$axios = axios // 全局注册axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
