import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import MainView from '@/components/MainView'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/main'
    },
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout'
    },
    {
      path: '/main',
      name: 'Main',
      component: MainView,
      props: (route) => ({ query: { team: route.query.team, place: route.query.place } })
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser

  if (to.path === '/logout') {
    if (currentUser !== null) firebase.auth.signOut().then(() => next('main'))
    else next('main')
  } else {
    next()
  }
})

export default router
