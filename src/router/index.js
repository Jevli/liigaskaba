import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: MainView,
      props: (route) => ({ query: { team: route.query.team, place: route.query.place } })
    }
  ]
})
