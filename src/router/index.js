import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '@/views/Admin'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Admin
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('Authorization')
  if (
    to.matched.some(record => record.meta.requireAuth || record.meta.homePages)
  ) {
    // 路由元信息requireAuth:true，或者homePages:true，则不做登录校验
    next()
  } else {
    if (token) {
      // 判断用户是否登录
      if (Object.keys(from.query).length === 0) {
        // 判断路由来源是否有query，处理不是目的跳转的情况
        next()
      } else {
        const redirect = from.query.redirect // 如果来源路由有query
        if (to.path === redirect) {
          // 这行是解决next无限循环的问题
          next()
        } else {
          next({ path: redirect }) // 跳转到目的路由
        }
      }
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath } // 将目的路由地址存入login的query中
        })
      }
    }
  }
})

export default router
