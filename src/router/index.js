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
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
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
      name: 'MainView',
      component: MainView,
      meta: {
        requiresAuth: true
      },
      props: (route) => ({ query: { team: route.query.team, place: route.query.place } })
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (to.path === '/logout') {
    if (currentUser !== null) firebase.auth.signOut().then(() => next('login'))
    else next('login')
  } else if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
