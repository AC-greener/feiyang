import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/components/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/SearchBar.vue')
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('../views/Edit.vue')
    }
  ]
})
