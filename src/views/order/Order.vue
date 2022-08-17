<template>
  <div class="container-order">
    <div class="card" v-for="order in orders" :key="order.bakerId">
      <div class="image">
        <div class="circle"></div>
      </div>
      <div class="description">
        <div v-for="cake in order.cakes" :key="cake.id" class="cake">
          <div class="type">{{ cake.typeCake.name }}</div>
          <div class="desc p">
            Deliciosa torta sabor sabor
            <span>{{ cake.tasteCake.name }}</span> con cobertura de
            <span>{{ cake.coverCake.name }}</span> de tamaño
            <span>{{ cake.sizeCake.name }}</span> precio unitario
            <span>S/{{ cake.price }}</span> y con rellenos de
            <span v-for="filler in cake.fillerCakes" :key="filler.id">
              {{ filler.name }}</span
            >
          </div>
          <div class="quantify">
            <div class="button left">
              <button @click="quantify(cake, -1, order)">-</button>
            </div>
            <input
              style="background: white"
              v-model="cake.stock"
              type="number"
              disabled
            />
            <div class="button right">
              <button @click="quantify(cake, 1, order)">+</button>
            </div>
          </div>
          <div class="stock">
            <p>Stock: {{ cake.quantify }}</p>
          </div>
          <div class="remove" @click="remove(cake.id, order.bakerId)">
            <p>
              Eliminar
            </p>
          </div>

          <div class="subtotal">
            <p>
              S/
              <label>{{ cake.stock * cake.price }}</label>
            </p>
          </div>
        </div>
        <div class="delivery p">Delivery: {{ order.delivery }}</div>
        <div class="adm p">Costo Administrativo: {{ order.admCost }}</div>
      </div>
      <button class="buy" @click="buy(order)" v-if="order.avaible">
        S/{{ order.total }}
      </button>
      <button class="buy bad" @click="buy(order)" v-else>
        S/{{ order.total }}
      </button>
    </div>
    <payment ref="post" />
  </div>
</template>

<script>
import OrderService from "@/service/order/OrderService";
import jwtDecode from "jwt-decode";
import CakeService from "@/service/cake/CakeService";
import Payment from "./Payment.vue";

export default {
  components: { Payment },
  data() {
    return {
      order: {
        admCost: 0,
        bakerId: 0,
        cakeId: [{ id: 0, quantify: 0 }],
        customerId: 0,
        delivery: 0,
        piesId: [{ id: 0, quantify: 0 }],
        total: 0,
      },
      total: 0,
      customerId: 0,
      orders: [],
      visible: false,
      dremove: {
        bakerId: 0,
        productId: 0,
      },
    };
  },
  computed: {
    getBakerId() {
      var token = this.$store.state.Authenticate.token;
      var data = jwtDecode(token);
      return data.id;
    },
  },
  methods: {
    initialState() {
      var cakesIds = [];
      var orderStore = this.$store.state.OrderProduct.orders;
      orderStore.forEach((o) => {
        cakesIds = cakesIds.concat(o.products.listcakes);
      });
      CakeService.getAllByIds(cakesIds).then((response) => {
        var cakeDictionary = this.setDictionary(response);
        this.orders = this.setOrderDetail(orderStore, cakeDictionary);
      });
    },
    setDictionary(response) {
      var cakedictionary = [];
      response.data.forEach((c) => {
        cakedictionary[c.id] = c;
        cakedictionary[c.id].stock = 1;
      });
      return cakedictionary;
    },
    setOrderDetail(orderStore, cakedictionary) {
      var orders = [];
      orderStore.forEach((o) => {
        var delivery = 5;
        var admCost = 0.85;
        var cakes = [];
        var total = 0;
        var avaible = true;
        o.products.listcakes.forEach((lc) => {
          total = total + cakedictionary[lc].price;
          if (cakedictionary[lc].quantify == 0) {
            avaible = false;
          }
          cakes.push(cakedictionary[lc]);
        });
        total = total + delivery + admCost;

        var detail = {
          avaible: avaible,
          bakerId: o.baker,
          cakes: cakes,
          total: total,
          delivery: delivery,
          admCost: admCost,
        };
        orders.push(detail);
      });
      return orders;
    },
    quantify(cake, operation, order) {
      var quantify = cake.stock;
      var change = false;
      if (quantify + operation <= 1) {
        quantify = 1;
      } else if (quantify + operation > cake.quantify) {
        quantify = cake.quantify;
      } else {
        quantify = quantify + operation;
        change = true;
      }
      cake.stock = quantify;
      if (change) {
        this.updateTotal(order);
      }
    },
    updateTotal(order) {
      var total = 0;
      order.cakes.forEach((cake) => {
        total = total + cake.stock * cake.price;
      });
      order.total = total + order.admCost + order.delivery;
    },
    buy(order) {
      var token = this.$store.state.Authenticate.token;
      var user = jwtDecode(token);
      var userId = user.id;

      var cakes = [];
      order.cakes.forEach((cake) => {
        var item = {
          id: cake.id,
          quantify: cake.stock,
        };
        cakes.push(item);
      });

      this.order.admCost = order.admCost;
      this.order.bakerId = order.bakerId;
      this.order.cakeId = cakes;
      this.order.customerId = userId;
      this.order.delivery = order.delivery;
      this.order.piesId = [];
      this.order.total = order.total;

      OrderService.valid(this.order).then(
        (response) => {
          let data = response.data;
          console.log(data);
          if (data === true) {
            this.$refs.post.hide();
            this.$refs.post.data(order, this.order);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    remove(cakeId, bakerId) {
      this.dremove.bakerId = Number(bakerId);
      this.dremove.productId = Number(cakeId);
      this.$store.dispatch("OrderProduct/remove", this.dremove).then(
        () => {
          this.initialState();
        },
        (error) => console.log(error)
      );
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
  max-width: 650px;
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0.5em 0 0.5em;
  padding: 15px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.507);
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
  background: rgb(19, 90, 148);
}

div.container-order div.card div.description div.quantify {
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-area: quantify;
}

div.container-order div.card div.description div.quantify input {
  width: 50px;
  padding: 0.2em 0.1em;
  text-align: center;
}

div.container-order div.card div.description div.quantify div.button.left {
  margin-right: 0.2em;
}

div.container-order p.delete {
  cursor: pointer;
}

div.container-order div.card div.description div.quantify button {
  background: rgb(18, 71, 88);
  padding: 0.1em 0.4em;
  color: white;
}

div.container-order div.card div.description div.quantify div.button.right {
  margin-left: 0.2em;
}

div.container-order div.description {
  flex: 1;
  margin: 0 0.5em;
}

div.container-order div.stock {
  grid-area: stock;
  font-size: 1rem;
  color: var(--primary);
  font-weight: bold;
  text-align: center;
}

div.container-order div.remove {
  cursor: pointer;
  grid-area: remove;
  font-size: 0.7rem;
  color: var(--second);
  text-align: center;
}

div.container-order div.remove:hover {
  color: red;
}

div.container-order div.cake {
  display: grid;
  grid-template-areas:
    "type type type quantify"
    "desc desc . quantify"
    "desc desc . stock"
    "subtotal . . remove";
  grid-template-columns: auto auto 20px auto;
}

div.container-order div.type {
  grid-area: type;
  font-size: 1.2rem;
  text-decoration: underline;
  font-weight: bold;
  padding: 0.3em 0;
}

div.container-order .p {
  font-size: 0.9rem;
}

div.container-order div.cake .p {
  font-size: 0.9rem;
}

div.container-order div.desc {
  grid-area: desc;
}

div.container-order div.desc span {
  font-weight: bold;
}

div.container-order div.subtotal {
  grid-area: subtotal;
  color: rgb(255, 82, 82);
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  padding: 0.2em 0;
}

div.container-order div.delivery {
  grid-area: delivery;
}

div.container-order div.adm {
  grid-area: adm;
}

div.container-order p.cook {
  display: inline;
  border-radius: 1em;
  background: var(--second);
  font-weight: bold;
  color: var(--default);
  font-size: 0.75rem;
  padding: 0.3em 0.7em;
}

div.container-order .buy {
  background: rgb(22, 201, 22);
  color: white;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  font-weight: bold;
}

div.container-order .buy.bad {
  background: gray;
  cursor: not-allowed;
}

@media (max-width: 700px) {
  div.container-order {
    width: 100%;
    box-sizing: border-box;
  }

  div.container-order div.card {
    width: 100%;
  }
}
</style>
