import { createRouter, createWebHistory } from 'vue-router'
import PassengerDetailView from '@/views/event/PassengerDetailView.vue'
import PassengerEditView from '@/views/event/PassengerEditView.vue'
import PassengerRegisterView from '@/views/event/PassengerRegisterView.vue'
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
      props: route => ({
        page: parseInt(route.query.page as string || '1', 10),
        limit: 3
      })
    },
    {
      path: '/passenger/:id',
      name: 'passenger-layout',
      component: PassengerLayoutView,
      props: true,
      children: [
        {
          path: '',
          name: 'passenger-detail',
          component: PassengerDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'passenger-edit',
          component: PassengerEditView,
          props: true
        },
        {
          path: 'register',
          name: 'passenger-register',
          component: PassengerRegisterView,
          props: true
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
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
  ]
})

export default router
