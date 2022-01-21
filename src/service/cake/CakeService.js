import http from '../http-common'

class CakeService{
    getAllByBakerId(id) {
        return http.get(`/cakes/${id}`)
    }
    getAllTastes() {
        return http.get('/tastecakes')
    }
    getAllSizes() {
        return http.get('/sizecakes')
    }
    getAllTypes() {
        return http.get('/typecakes')
    }
    getAllCovers() {
        return http.get('/covercakes')
    }
    getAllFillers() {
        return http.get('/fillercakes')
    }
    createCake(data) {
        return http.post('/cakes', data)
    }
    deleteCake(id) {
        return http.delete(`/cakes/${id}`)
    }
    updateCake(id, data) {
        return http.put(`/cakes/${id}`, data)
    }
}

export default new CakeService()