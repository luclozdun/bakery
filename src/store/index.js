import Vue from 'vue'
import Vuex from 'vuex'
import { AuthCustomer } from '@/store/AuthCustomer'
import { AuthBaker } from '@/store/AuthBaker'
import { OrderProduct } from '@/store/OrderProduct'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AuthCustomer,
    AuthBaker,
    OrderProduct
  }
})
