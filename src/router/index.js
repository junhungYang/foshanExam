import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/pages/SignUp.vue'
import DetailInfo from '@/pages/DetailInfo.vue'
import RecordSearch from '@/pages/RecordSearch'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/DetailInfo',
      name: 'DetailInfo',
      component: DetailInfo
    },
    {
      path: '/RecordSearch',
      name: 'RecordSearch',
      component: RecordSearch
    },
    {
      path: '*',
      redirect(to) {
        return '/signUp'
      }
    }
  ]
})
