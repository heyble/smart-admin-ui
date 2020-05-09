import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '@/views/admin/Film'
import Anime from '@/views/admin/Anime'
import Tvplay from '@/views/admin/Tvplay'
import Admin from '@/views/Admin'
import Login from '@/views/Login'
import UserInfo from '@/views/UserInfo'
import VideoPreview from '@/views/VideoPreview'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '/admin/film',
        component: Film
      },
      {
        path: '/admin/anime',
        component: Anime
      },
      {
        path: '/admin/tvplay',
        component: Tvplay
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    component: UserInfo
  },
  {
    path: '/videopreview/:id',
    component: VideoPreview
  },
  {
    path: '/',
    redirect: '/admin/film'
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
  const user = sessionStorage.getItem('currentUser')
  if (
    to.matched.some(record => record.meta.requireAuth || record.meta.homePages)
  ) {
    // 路由元信息requireAuth:true，或者homePages:true，则不做登录校验
    next()
  } else {
    if (token && user) {
      // 判断用户是否登录
      if (Object.keys(from.query).length === 0) {
        // 判断路由来源是否有query，处理不是目的跳转的情况
        console.log('Object.keys(from.query).length:' + Object.keys(from.query).length)
        next()
      } else {
        const redirect = from.query.redirect // 如果来源路由有query
        console.log(to.path + ':' + redirect)
        if (to.path === redirect) {
          // 这行是解决next无限循环的问题
          next()
        } else {
          next({ path: redirect }) // 跳转到目的路由
        }
      }
    } else {
      console.log('to.path:' + to.path)
      if (to.path === '/login') {
        next()
      } else {
        console.log('to.fullPath:' + to.fullPath)
        next({
          path: '/login',
          query: { redirect: to.fullPath } // 将目的路由地址存入login的query中
        })
      }
    }
  }
})

export default router
