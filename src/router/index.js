import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import sort from '../views/sort.vue'
import dispose from '../views/dispose.vue'
import code from '../views/code.vue'
import main from '../views/main.vue'
import objVerify from '../views/objVerify.vue'
import aa from '../views/aa.vue'
import routerBuilder from '../views/router.vue'
import theimport from '../views/theimport.vue'
Vue.use(VueRouter)

const routes = [{
  path: '',
  name: 'main',
  component: main,
  children: [{
    path: '',
    name: 'index',
    component: index
  },
  {
    path: 'sort',
    name: 'sort',
    component: sort
  },
  {
    path: 'dispose',
    name: 'dispose',
    component: dispose
  },
  {
    path: 'code',
    name: 'code',
    component: code
  },
  {
    path: 'objVerify',
    name: 'objVerify',
    component: objVerify

  },
  {
    path: 'aa',
    name: 'aa',
    component: aa

  },
  {
    path: 'router',
    name: 'router',
    component: routerBuilder
  }, {
    path: 'theimport',
    name: 'theimport',
    component: theimport
  }
  ]
},]
const router = new VueRouter({
  routes
})

export default router