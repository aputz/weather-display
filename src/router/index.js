import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchForm from '../components/Search/SearchForm.vue'
import Results from '../components/Results/Results.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
