import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'


import SignIn from '../views/sign/SignIn.vue'
import signUp from '../views/sign/SignUp.vue'

import Bakery from '../views/bakery/Bakery.vue'
import Product from '../views/bakery/Products.vue'
import Cake from '../views/foods/Cake.vue'

import Profile from '../views/profile/Profile.vue'
import AddBusiness from '../views/profile/profile-sub/AddBusiness.vue'
import AddCard from '../views/profile/profile-sub/AddCard.vue'
import AddLocation from '../views/profile/profile-sub/AddLocation.vue'
import MyOrders from '../views/profile/profile-sub/MyOrder.vue'
import MyPrivacy from '../views/profile/profile-sub/Privacy.vue'
import MySurprise from '../views/profile/profile-sub/Surprise.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/login',
    name: 'SignUp',
    component: signUp
  },
  {
    path: '/bakery',
    name: 'Bakery',
    component: Bakery
  },
  {
    path: '/bakery/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/bakery/:id/cake',
    name: 'Cake',
    component: Cake
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    children: [
      {
        path: 'business',
        name: 'AddBusiness',
        component: AddBusiness
      },
      {
        path: 'add-card',
        name: 'AddCard',
        component: AddCard
      },
      {
        path: 'locations',
        name: 'AddLocation',
        component: AddLocation
      },
      {
        path: 'orders',
        name: 'MyOrder',
        component: MyOrders
      },
      {
        path: 'privacy',
        name: 'Privacy',
        component: MyPrivacy
      },
      {
        path: 'surprise',
        name: 'Surprise',
        component: MySurprise
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
