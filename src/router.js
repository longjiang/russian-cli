import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/cases/nouns/'
    },
    {
      path: '/cases/nouns/:args?',
      name: 'noun-cases',
      props: true,
      component: () => import('./views/NounCases.vue'),
      meta: {
        title: 'Learn Russian Noun Cases | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Learn how to decline Russian nouns.'
          }
        ]
      }
    },
    {
      path: '/endings',
      name: 'endings',
      props: true,
      component: () => import('./views/Endings.vue'),
      meta: {
        title: 'Lookup Case Endings | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Figure out the dictionary form and case by looking up the ending.'
          }
        ]
      }
    }
  ]
})
