import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/LogIn.vue'
import Home from '../views/Home.vue'
import salaryInfo from "../views/salaryInfo";
import checkOutUser from "../views/checkOutUser";
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
   path:'/salaryInfo',
   name: 'salaryInfo',
   component: salaryInfo
  },
  {
    path: '/checkOutUser',
    name: 'checkOutUser',
    component: checkOutUser
  },
  {
    path:'/Home',
    name:'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
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
