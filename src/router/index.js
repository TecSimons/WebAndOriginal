import Vue from 'vue'
import Router from 'vue-router'
import AccountManager from '@/components/AccountManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AccountManager',
      component: AccountManager
    },
    {
			path: '/ModifyNickName',
      component: resolve => require(['../components/ModifyNickName.vue'], resolve)

		}, {
			path: '/ModifyPSD',
			component: resolve => require(['../components/ModifyPSD.vue'], resolve)
	
		}
  ]
})
