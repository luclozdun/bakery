import CustomerService from '@/service/security/CustomerService'
import BakerService from '@/service/security/BakerService'
import UserService from '@/service/security/UserService'

const token = localStorage.getItem('token')

const initialState = token ? { status: { loggedIn: true }, token } : { status: { loggedIn: false }, token: null }

export const Authenticate = {
    namespaced: true,
    state: initialState,
    actions: {
        loginCustomer({ commit }, customer) {
            return CustomerService.authenticate(customer).then(token => {
                commit('loginSuccess', token)
                return Promise.resolve(token)
            }, error => {
                commit('loginFailure')
                return Promise.reject(error)
            })
        },
        loginBaker({ commit }, baker) {
            return BakerService.authenticate(baker).then(token => {
                commit('loginSuccess', token)
                return Promise.resolve(token)
            }, error => {
                commit('loginFailure')
                return Promise.reject(error)
            })
        },
        logout({ commit }) {
            UserService.logout()
            commit('logout')
        },
        register({ commit }, customer) {
            return CustomerService.register(customer).then(response => {
                commit('registerSuccess')
                return Promise.resolve(response.data)
            }, error => {
                commit('registerFailure')
                return Promise.reject(error)
            })
        }
    },
    mutations: {
        loginSuccess(state, token) {
            state.status.loggedIn = true
            state.token = token
        },
        loginFailure(state) {
            state.status.loggedIn = false
            state.token = null
        },
        logout(state) {
            state.status.loggedIn = false
            state.token = null
        },
        registerSuccess(state) {
            state.status.loggedIn = false
        },
        registerFailure(state) {
            state.status.loggedIn = false
        }
    }
}