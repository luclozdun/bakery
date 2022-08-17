let storage = JSON.parse(localStorage.getItem('order'))
const orders = storage != null ? storage : []

const initialState = orders ? {orders} : {orders:[]}

export const OrderProduct = {
    namespaced: true,
    state: initialState,
    actions: {
        addProduct({ commit } ,order) {
            var I = {
                products: {
                    listcakes: [
                        order.cake.id
                    ]
                },
                baker: order.bakerId
            }
            console.log("orders")
            console.log(orders)
            if (localStorage.getItem('order') == []) {                
                orders.push(I)
                localStorage.setItem('order', JSON.stringify(orders))
            }else{
                var existLC = false
                var existB = false
                orders.forEach((o) => {
                    if(o.baker == order.bakerId){
                        existB = true
                        o.products.listcakes.forEach((lc) => {
                            if(order.cake.id == lc){
                                existLC = true
                            }
                        })
                        if(existLC == false){
                            o.products.listcakes.push(order.cake.id)
                        }
                    }
                })

                if(existB == false && existLC == false){
                    orders.push(I)
                }

                localStorage.setItem('order', JSON.stringify(orders))
            }

            commit('addSuccess', orders)
            return Promise.resolve(orders)
        },
        remove({ commit }, data) {
            var i = 0
            orders.forEach((o) => {
                if (o.baker == data.bakerId) {
                    let newListCake = o.products.listcakes.filter((e) => 
                        e !== data.productId
                    )
                    o.products.listcakes = newListCake
                }
                if (o.products.listcakes.length <= 0) {
                    orders.splice(i,1)
                }
                i++;
            })
            localStorage.setItem('order', JSON.stringify(orders))
            commit('removeSuccess', orders)
            return Promise.resolve(orders)
        },
        buy({ commit }, bakerId) {
            var i = 0
            orders.forEach((o) => {
                if (o.baker == bakerId) {
                    orders.splice(i, 1);
                }
                i++
            })
            localStorage.setItem('order', JSON.stringify(orders))
            commit('buySuccess', orders)
            return Promise.resolve(orders)
        }
    },
    mutations: {
        addSuccess(state, orders) {
            state.orders = orders
        },
        removeSuccess(state, orders) {
            state.orders = orders
        },
        buySuccess(state, orders) {
            state.orders = orders
        }
    }
}