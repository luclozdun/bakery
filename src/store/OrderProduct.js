const order = JSON.parse(localStorage.getItem("order"))

const initialState = order ? {order} : {order:null}

export const OrderProduct = {
    namespaced: true,
    state: initialState,
    actions: {
        add({ commit } ,order) {
            var I = {
                cakes: [
                    {
                        cake: order.cake,
                        quantify: 1
                    }
                ],
                baker: order.bakerId
            }
            if (localStorage.getItem("order") == null) {
                var orders = []
                orders.push(I)
                localStorage.setItem("order", JSON.stringify(orders))
            }
            else {
                var storeOrders = JSON.parse(localStorage.getItem("order"))
                var exist = "NEW"
                storeOrders.forEach(orders => {
                    if (orders.baker == order.bakerId) {
                        orders.cakes.forEach(cakes => {
                            if (cakes.cake.id == order.cake.id) {
                                exist = "EXISTCAKE"
                                return
                            }
                        })
                        var cake = {
                            cake: order.cake,
                            quantify: 1
                        }
                        orders.cakes.push(cake)
                        if(exist == "NEW")
                            exist = "BAKERY"
                        return
                    }
                });
                
                if (exist == "BAKERY")
                    localStorage.setItem("order", JSON.stringify(storeOrders))
                else if(exist == "NEW") {
                    storeOrders.push(I)
                    localStorage.setItem("order", JSON.stringify(storeOrders))
                }
            }
            var response = localStorage.getItem("order")
            commit('addSuccess', response)
            return Promise.resolve(response)
        }
    },
    mutations: {
        addSuccess(state, order) {
            state.order = order
        }
    }
}