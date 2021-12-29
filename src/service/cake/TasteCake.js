import http from '../http-common'

class TasteCakeService{
    getAll(){
        return http.get('/tastecakes');
    }
}

export default new TasteCakeService();