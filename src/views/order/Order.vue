<template>
  <div class="container-order">
    asd
    <div class="card" v-for="order in orders" :key="order.id">
      <div class="image">
        <div class="circle"></div>
      </div>
      <div class="description">
        <p>{{ order.baker }}</p>
        <div v-for="cakes in order.cakes" :key="cakes.id">
          <p>{{ cakes.cake.type }}</p>
          <p>{{ cakes.cake.taste }}</p>
          <p>{{ cakes.cake.cover }}</p>
          <p>{{ cakes.cake.size }}</p>
          <div class="cook">
            <p>Hola</p>
          </div>
          <div class="quantify">
            <div class="button left">
              <button @click="quantify(cakes, -1, order)">-</button>
            </div>
            <input
              style="background: white"
              v-model="cakes.quantify"
              type="number"
              disabled
            />
            <div class="button right">
              <button @click="quantify(cakes, 1, order)">+</button>
            </div>
          </div>

          <p>
            SubTotal:
            <label>{{ Number(cakes.quantify) * cakes.cake.price }}</label>
          </p>
        </div>
        <p>Delivery: {{ delivery }}</p>
        <p>Costo Administrativo: {{ admCost }}</p>
      </div>
      <button style="background: orange" @click="operationOrder(order, true)">
        {{ order.priceTotal }}
      </button>
    </div>
  </div>
</template>

<script>
import OrderService from "@/service/order/OrderService";

export default {
  data() {
    return {
      orders: [],
      order: {
        admCost: 0,
        bakerId: 0,
        cakeId: [{ id: 0, quantify: 0 }],
        customerId: 0,
        delivery: 0,
        piesId: [{ id: 0, quantify: 0 }],
        total: 0,
      },
      admCost: 0,
      delivery: 0,
      total: 0,
      customerId: 0,
    };
  },
  computed: {
    getBakerId() {
      return this.$store.state.AuthCustomer.customer.id;
    },
  },
  methods: {
    initialState() {
      this.delivery = 5;
      this.admCost = 0.45;
      this.orders = this.$store.state.OrderProduct.order;
      this.orders.forEach((order) => {
        var total = 0;
        order.cakes.forEach((cakes) => {
          total = cakes.quantify * cakes.cake.price + total;
        });
        order.priceTotal = total + this.delivery + this.admCost;
      });
    },
    operationOrder(order, finish) {
      var orders = JSON.parse(JSON.stringify(order));
      var total = 0;
      var cakeId = [];
      var pieId = [];
      orders.cakes.forEach((cakes) => {
        total = total + cakes.cake.price * cakes.quantify;
        if (finish == true)
          cakeId.push({
            id: cakes.cake.id,
            quantify: cakes.quantify,
          });
      });
      order.priceTotal = total + this.admCost + this.delivery;
      if (finish == true) {
        this.order.admCost = this.admCost;
        this.order.delivery = this.delivery;
        this.order.cakeId = cakeId;
        this.order.piesId = pieId;
        this.order.total = order.priceTotal;
        this.order.bakerId = order.baker;
        this.order.customerId = this.getBakerId;
        OrderService.finishOrder(this.order).then(
          (response) => {
            console.log(response);
            alert("Compra Exitosa");
          },
          (error) => console.log(error)
        );
      }
    },
    quantify(cakes, operation, order) {
      var quantify = Number(cakes.quantify);
      if (quantify + operation <= 1) {
        quantify = 1;
      } else {
        quantify = quantify + operation;
      }
      cakes.quantify = quantify;
      this.total = this.operationOrder(order, false);
    },
  },
  mounted() {
    this.initialState();
  },
};
</script>

<style>
div.container-order {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

div.container-order div.card {
  margin-top: 50px;
  max-width: 650px;
  width: 650px;
  display: flex;
  padding: 15px;
  background: rgb(200, 209, 255);
}

div.container-order div.card div.image {
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
}

div.container-order div.card div.image div.circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgb(19, 90, 148);
}

div.container-order div.card div.description {
  flex: 1;
}

div.container-order div.card div.description div.cook {
  display: inline-block;
  border-radius: 1em;
  background: var(--second);
  font-weight: bold;
  color: var(--default);
  font-size: 0.75rem;
  padding: 0.3em 0.7em;
}

div.container-order div.card div.description div.quantify {
  display: flex;
  flex-direction: row;
  align-items: center;
}

div.container-order div.card div.description div.quantify input {
  width: 50px;
  padding: 0.2em 0.1em;
  text-align: center;
}

div.container-order div.card div.description div.quantify div.button.left {
  margin-right: 0.2em;
}

div.container-order div.card div.description div.quantify button {
  background: rgb(18, 71, 88);
  padding: 0.1em 0.4em;
  color: white;
}

div.container-order div.card div.description div.quantify div.button.right {
  margin-left: 0.2em;
}
</style>
