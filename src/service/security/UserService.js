import http from '../http-common'

class UserService{
    getUser(role, id) {
        if (role === "BAKER") {
            return http.get(`/bakers/${id}`)
        }
        else if(role === "CUSTOMER"){
            return http.get(`/customers/${id}`)
        }
    }
    logout() {
        localStorage.removeItem('token')
    }
}

export default new UserService()