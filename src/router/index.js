import Vue from 'vue'
import Router from 'vue-router'
import InputResult from '@/components/InputResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InputResult',
      component: InputResult
    }
  ]
})
