import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/dataTable',
    name:'datatable',
    component: () => import('../views/DataTable.vue')
  },
  {
    path:'/gallery',
    name:'gallery',
    component: () => import('../views/Gallery.vue')
  },
  {
    path:'/devices',
    name:'devices',
    component: () => import('../views/Devices.vue')
  },
  {
    path:'/setup',
    name:'setup',
    component: () => import('../views/Setup.vue')
  },
  {
    path:'/settings',
    name:'settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
