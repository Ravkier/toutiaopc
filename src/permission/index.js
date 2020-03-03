/**
 *
 * 处理路由权限问题
 *
 */
import router from '@/router'
// 注册全局前置守卫
// 回调函数会在路由发生改变之前执行
router.beforeEach(function (to, from, next) {
  //   next() // 表示放过
  // 首先应该判断 你需要拦截哪些页面 如果页面的地址以 /home为开头, 就需要进行token的判断
  // 判断你要去的页面是不是以 /home为开头
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      // 回登录页拿钥匙
      next('/login')
    }
  } else {
    // 放过
    next()
  }
})
