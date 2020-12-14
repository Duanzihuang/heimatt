import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入子组件
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/layout',
    name: 'Layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "layout" */ '../views/layout'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () =>
          import(/* webpackChunkName: "layout" */ '../views/layout/home')
      },
      {
        path: 'question',
        component: () =>
          import(/* webpackChunkName: "layout" */ '../views/layout/question')
      },
      {
        path: 'video',
        component: () =>
          import(/* webpackChunkName: "layout" */ '../views/layout/video')
      },
      {
        path: 'my',
        component: () =>
          import(/* webpackChunkName: "layout" */ '../views/layout/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
