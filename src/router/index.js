import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: "Cases" }
  },
  {
    path: '/case/:phoneId',
    name: 'Case',
    component: () => import('../views/Case.vue')
  },
  {
    path: '/case',
    name: 'Cases',
    component: () => import('../views/Case.vue')
  },
  {
    path: '/case-details/:caseId/:phoneId',
    name: 'CaseDetails',
    component: () => import('../views/CaseDetails.vue')
  },
  {
    path: '/case-details/:caseId',
    name: 'CaseDetailsByCaseId',
    component: () => import('../views/CaseDetails.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
