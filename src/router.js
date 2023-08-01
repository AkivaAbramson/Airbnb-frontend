import { createRouter, createWebHashHistory } from 'vue-router'

import Explore from './views/Explore.vue'
import Chat from './views/Chat.vue'
import StayIndex from './views/StayIndex.vue'
import LoginSignup from './views/LoginSignup.vue'
import UserDetails from './views/UserDetails.vue'
import StayDetails from './views/StayDetails.vue'
import StayEdit from './views/StayEdit.vue'
import StayBook from './views/StayBook.vue'
import Wishlist from './views/Wishlist.vue'

const routes = [
  {
    path: '/',
    name: 'StayIndex',
    component: StayIndex,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/stay/:stayId',
    name: 'Stay',
    component: StayDetails
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails
  },
  {
    path: '/stay/edit/:stayId?',
    name: 'StayEdit',
    component: StayEdit
  },
  {
    path: '/book/stays/:stayId?',
    name: 'StayBook',
    component: StayBook
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

