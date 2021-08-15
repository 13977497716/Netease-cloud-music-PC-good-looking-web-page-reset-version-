import Vue from 'vue'
import VueRouter from 'vue-router'
import denlus from '../views/Denlus'
import wode from '../views/Wode'

import zhuche from '../views/Zhuche'
import shouye from '../views/Shouye'

import fa from '../views/Fa-mius'
import ge from '../views/Ge-mius'
import yi from '../views/Yi-mius'
import mv from '../views/Mv-mius'
import ss from '../views/Ss-mius'
import ges from '../views/Ges-mius'
import mvs from '../views/Mvs-mius'

Vue.use(VueRouter)

const routes = [
  //默认打开
  {
    path: '/',
    component: shouye
  },
  
  {
    path: '/wode',
    component: wode,
    children: [
      {
        path: 'denlus',
        component: denlus
      },
      {
        path: 'zhuche',
        component: zhuche
      },
      {
        path: '/',
        redirect: "/wode/denlus"
      },

    ]
  },

  {
    path: '/shouye',
    component: shouye
  },
  
  
  {
    path: '/fa',
    component: fa
  },

    {
      path: '/ge',
      component: ge
    },

    {
      path: '/yi',
      component: yi
    },

    {
      path: '/mv',
      component: mv
    },

    {
      path: '/ss/:name',
      component: ss
    },

    {
      path: '/ges/:id',
      component: ges
    },
    
    {
      path: '/mvs/:id',
      component: mvs
    }



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
