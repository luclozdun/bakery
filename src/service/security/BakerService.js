import http from '../http-common';

class BakerService {
    register(data){
        return http.post("/signups/baker", data)
    }
    authenticate(data) {
        return http.post("/authentications/baker", data).then(response => {
            if (response.data.token) {
                console.log(`baker: ${response.data}`)
                localStorage.setItem("baker", JSON.stringify(response.data))
            }
            return response.data
        })
    }
    logout() {
        localStorage.removeItem("baker")
    }
}

export default new BakerService()