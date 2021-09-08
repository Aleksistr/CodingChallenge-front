import Vue from 'vue'
import VueRouter from 'vue-router'

// Import different pages
import Search from '@/views/Search'
import Library from '@/views/Library'

Vue.use(VueRouter)

// Define routes
const routes = [
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/my-library',
    name: 'Library',
    component: Library
  }
]

const router = new VueRouter({
  routes
})

export default router
