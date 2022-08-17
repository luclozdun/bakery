import Vue from 'vue'
import Vuex from 'vuex'
import { Authenticate } from '@/store/Authenticate'
import { OrderProduct } from '@/store/OrderProduct'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Authenticate,
    OrderProduct
  }
})
