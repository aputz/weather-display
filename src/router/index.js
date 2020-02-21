import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchForm from '../components/SearchForm.vue'
import Results from '../components/Results.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Weather display'
    },
    children: [
      {
        path: '/',
        redirect: '/search'
      },
      {
        path: '/search',
        name: 'Search Form',
        component: SearchForm
      },
      {
        path: '/result/:cityName',
        name: 'Results',
        component: Results
      }
    ]
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
