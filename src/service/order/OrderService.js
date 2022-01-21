import http from '../http-common';

class OrderService{
    finishOrder(data) {
        return http.post("/orders/asd",data)
    }
}

export default new OrderService();