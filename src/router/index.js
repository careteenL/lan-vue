import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cascader',
    name: 'cascader',
    component: () => import(/* webpackChunkName: "cascader" */ '../views/Cascader.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "table" */ '../views/Table.vue')
  },
  {
    path: '/examples',
    name: 'examples',
    component: () => import(/* webpackChunkName: "examples" */ '../views/Examples.vue'),
    children: [
      {
        path: 'pagingCheck',
        name: '分页复选',
        component: () => import(/* webpackChunkName: "examples" */ '../../examples/Table/PagingCheck.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
