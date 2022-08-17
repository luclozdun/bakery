import http from '../http-common'

class PaymentService{
    create(order) {
        return http.post("/payments/create", order)
    }
}

export default new PaymentService()