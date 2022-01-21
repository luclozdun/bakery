import http from '../http-common';

class BakeryService {
    getAll(){
        return http.get("/profilereviews/bakers")
    }
}

export default new BakeryService