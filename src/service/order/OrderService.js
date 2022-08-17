import http from '../http-common';

class OrderService{
    valid(data) {
        return http.post("/orders/valid",data)
    }
    create(data) {
        return http.post("/orders/create",data)
    }
    getByCustomerId(id) {
        return http.get(`/orders/${id}`)
    }
}

export default new OrderService();