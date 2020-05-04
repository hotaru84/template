import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Data from '../views/Data'
import Gallery from '../views/Gallery'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/data',
    name: 'data',
    component: Data
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: Gallery
  },
]

const router = new VueRouter({
  routes
})

export default router
