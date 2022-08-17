import http from '../http-common'

class CustomerService{
    register(data){
        return http.post("/signups/customer",data)
    }
    authenticate(data) {
        return http.post("/authentications/customer", data).then(response => {
            localStorage.setItem('token', response.data)
            return response.data
        })
    }
}

export default new CustomerService()