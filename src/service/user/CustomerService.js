import http from '../http-common'

class CustomerService{
    getAll(){
        return http.get("/tastecakes")
    }
    postCustomer(data){
        return http.post("/signups/customer",data)
    }
    authenticate(data) {
        return http.post("/authentications/customer", data)
    }
}

export default new CustomerService()