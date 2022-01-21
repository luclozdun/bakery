import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'


import SignIn from '../views/sign/SignIn.vue'
import SignUp from '../views/sign/SignUp.vue'
import SignInBaker from '../views/sign/SignInBaker.vue'

import Bakery from '../views/bakery/Bakery.vue'
import BakeryProducts from '../views/bakery/BakeryProducts.vue'

import Profile from '../views/profile/Profile.vue'
import AddBusiness from '../views/profile/profile-sub/AddBusiness.vue'
import AddCard from '../views/profile/profile-sub/AddCard.vue'
import AddLocation from '../views/profile/profile-sub/AddLocation.vue'
import MyOrders from '../views/profile/profile-sub/MyOrder.vue'
import MyPrivacy from '../views/profile/profile-sub/Privacy.vue'
import MySurprise from '../views/profile/profile-sub/Surprise.vue'
import CheckBaker from '../views/permissbaker/CheckBaker.vue'
import AddProduct from '../views/profile/profile-sub/AddProduct.vue'
import Order from '../views/order/Order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login/customer',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/login/baker',
    name: 'SignInBaker',
    component: SignInBaker
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/bakery',
    name: 'Bakery',
    component: Bakery
  },
  {
    path: '/bakery/:id',
    name: 'BakeryProducts',
    component: BakeryProducts,
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
      {
        path: '/addproduct',
        name: 'AddProduct',
        component: AddProduct
      }
    ]
  },
  {
    path: '/checkbaker',
    name: 'checkBaker',
    component: CheckBaker
  },
  {
    path: '/myorder',
    name: 'Order',
    component: Order
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
