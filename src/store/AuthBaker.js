import BakerService from '@/service/security/BakerService'

const baker = JSON.parse(localStorage.getItem('baker'))

const initialState = baker ? { status: { loggedIn: true }, baker } : { status: { loggedIn: false }, baker: null }

export const AuthBaker = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, baker) {
            return BakerService.authenticate(baker).then(response => {
                commit('loginSuccess', response)
                return Promise.resolve(response)
            }, error => {
                commit('loginFailure')
                return Promise.reject(error)
            })
        },
        logout({ commit }) {
            BakerService.logout()
            commit('logout')
        },
        register({ commit }, baker) {
            return BakerService.register(baker).then(response => {
                commit('registerSuccess')
                return Promise.resolve(response.data)
            }, error => {
                commit('registerFailure')
                return Promise.reject(error)
            })
        }
    },
     mutations: {
        loginSuccess(state, baker) {
            state.status.loggedIn = true
            state.baker = baker
        },
        loginFailure(state) {
            state.status.loggedIn = false
            state.baker = null
        },
        logout(state) {
            state.status.loggedIn = false
            state.baker = null
        },
        registerSuccess(state) {
            state.status.loggedIn = false
        },
        registerFailure(state) {
            state.status.loggedIn = false
        }
    }
}