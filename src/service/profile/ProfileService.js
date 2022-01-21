import http from '../http-common'

class ProfileService{
    create(data) {
        return http.post("/profilereviews", data)
    }
    getByCustomer(id) {
        return http.get(`/profilereviews/${id}`)
    }
    deleteByCustomer(id) {
        return http.delete(`/profilereviews/${id}`)
    }
    getAll() {
        return http.get("/profilereviews")
    }
    editProfile(id, data) {
        return http.put(`/profilereviews/action/${id}`, data)
    }
}

export default new ProfileService()