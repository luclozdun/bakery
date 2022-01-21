import CustomerService from '@/service/security/CustomerService'

const customer = JSON.parse(localStorage.getItem('customer'))

const initialState = customer ? { status: { loggedIn: true }, customer } : { status: { loggedIn: false }, customer: null }

export const AuthCustomer = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, customer) {
            return CustomerService.authenticate(customer).then(response => {
                commit('loginSuccess', response)
                return Promise.resolve(response)
            }, error => {
                commit('loginFailure')
                return Promise.reject(error)
            })
        },
        logout({ commit }) {
            CustomerService.logout()
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
        loginSuccess(state, customer) {
            state.status.loggedIn = true
            state.customer = customer
        },
        loginFailure(state) {
            state.status.loggedIn = false
            state.customer = null
        },
        logout(state) {
            state.status.loggedIn = false
            state.customer = null
        },
        registerSuccess(state) {
            state.status.loggedIn = false
        },
        registerFailure(state) {
            state.status.loggedIn = false
        }
    }
}