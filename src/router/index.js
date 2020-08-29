import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Article from '@/components/Article'
// import Admin from '@/views/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
    }
  ]
})
