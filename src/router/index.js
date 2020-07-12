import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/loginRegist',
      name: 'loginRegist',
      component: (resolve) => require(['../components/mainpage/loginRegist.vue'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: (resolve) => require(['../components/mainpage/home.vue'], resolve)
    },
    {
      path: '/detailsmv',
      name: 'detailsmv',
      component: (resolve) => require(['../components/mainpage/movieDetails.vue'],resolve)
    },
    {
      path: '/buyMovie',
      name: 'buyMovie',
      component: (resolve) => require(['../components/mainpage/buyMovie.vue'], resolve)
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: (resolve) => require(['../components/mainpage/userCenter.vue'], resolve)
    },
    {
      path: '*',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
