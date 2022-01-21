import http from '../http-common'

class CustomerService{
    register(data){
        return http.post("/signups/customer",data)
    }
    authenticate(data) {
        return http.post("/authentications/customer", data).then(response => {
            if (response.data.token) {
                console.log(`customer: ${response.data}`)
                localStorage.setItem('customer', JSON.stringify(response.data))
            }
            return response.data
        })
    }
    logout() {
        localStorage.removeItem('customer')
    }
}

export default new CustomerService()