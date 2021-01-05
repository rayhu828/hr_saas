// 不需要导出，因为在main.js中已经整体引入了permission.js
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
// 前置守卫
// next是前置守卫必须执行的钩子函数
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if(store.getters.token) {
        if(to.path === '/login') {
            // 跳转到主页
            next('/')
        } else {
            // 如果vuex中有用户资料的id，表示已经有用户资料，不需要再获取
            if(!store.getters.userId) {
                await store.dispatch('user/getUserInfo')
            }
            // 直接放行
            next()
        }
    } else {
        if(whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            // 跳转到登录页
            next('/login')
        }
    }
    NProgress.done()
})
// 后置守卫
router.afterEach(() => {
    NProgress.done()
})