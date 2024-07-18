import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import StudentListView from '@/views/StudentListView.vue'
import PassengerDetailView from '@/views/event/PassengerDetailView.vue'
import PassengerEditView from '@/views/event/PassengerEditView.vue'
import PassengerRegister from '@/views/event/PassengerRegisterView.vue'
import PassengerLayoutView from '@/views/event/PassengerLayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import PassengerListView from '@/views/PassengerListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger-list-view',
      component: PassengerListView,
      props: (route) => ({
        page: parseInt(route.query?.page as string || '1'), limit: 2})
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentListView
    },
    {
      path: '/event/:id',
      name: 'passenger-layout',
      props: true,
      component: PassengerLayoutView,
        children: [
          {
            path: '',
            name: 'passenger-detail',
            props: true,
            component: PassengerDetailView
          },
          {
            path: 'edit',
            name: 'passenger-edit',
            props: true,
            component: PassengerEditView
          },
          {
            path: 'register',
            name: 'passenger-register',
            props: true,
            component: PassengerRegister
          }
        ] 
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
    
  ]
})

export default router
