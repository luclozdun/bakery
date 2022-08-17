import http from '../http-common';

class BakerService {
    register(data){
        return http.post("/signups/baker", data)
    }
    authenticate(data) {
        return http.post("/authentications/baker", data).then(response => {
            localStorage.setItem('token', response.data)
            return response.data
        })
    }
}

export default new BakerService()