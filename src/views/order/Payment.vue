<template>
  <div>
    <div class="container-payment" v-if="visible">
      <div class="card-payment">
        <p class="payment-title" @click="hide()">Realizar Pago</p>
        <hr />
        <div class="p-payment">
          <p class="cp-title">Mis Productos</p>
          <div class="pay-description">
            <div class="grid-detail" v-for="cake in order.cakes" :key="cake.id">
              <div class="p-img"></div>
              <div class="p-text">
                <p class="stxt">
                  {{ cake.typeCake.name }} {{ cake.tasteCake.name }} con
                  {{ cake.coverCake.name }}
                </p>
                <p class="stxt">{{ cake.sizeCake.name }}</p>
                <p class="qtxt">{{ cake.stock }} unid</p>
              </div>
              <div class="p-price">
                <p>
                  S/
                  <label>{{ cake.stock * cake.price }}</label>
                </p>
              </div>
            </div>
            <div class="grid-detail">
              <div class="p-img"></div>
              <div class="p-text">
                <p class="stxt">
                  Gasto Administrativo
                </p>
                <p class="qtxt">1 unid</p>
              </div>
              <div class="p-price">
                <p>
                  S/
                  <label>{{ order.admCost }}</label>
                </p>
              </div>
            </div>
            <div class="grid-detail">
              <div class="p-img"></div>
              <div class="p-text">
                <p class="stxt">
                  Delivery
                </p>
                <p class="qtxt">1 unid</p>
              </div>
              <div class="p-price">
                <p>
                  S/
                  <label>{{ order.delivery }}</label>
                </p>
              </div>
            </div>
          </div>
          <div class="grid-detail">
            <div class="p-imga"></div>
            <div class="p-text">
              <p>Total:</p>
            </div>
            <div class="p-price">
              <p>
                S/
                <label>{{ order.total }}</label>
              </p>
            </div>
          </div>
          <div class="paypal">
            <paypal :order="orderpaypal"></paypal>
          </div>
        </div>
      </div>
    </div>
    <div class="payment-finish" v-if="finish">
      <div class="pay-card" v-if="!error">
        <div class="logo"></div>
        <div class="pay-description">
          <div class="text">
            <p>Numero de orden</p>
            <p class="s">{{ finishData.id }}</p>
          </div>
          <div class="text">
            <p>Fecha de compra</p>
            <p class="s">{{ finishData.create_time }}</p>
          </div>
          <div class="text">
            <p>Estado de compra</p>
            <p class="s">{{ finishData.status }}</p>
          </div>
          <div class="text">
            <p>Total</p>
            <p class="s">{{ finishData.purchase_units[0].amount.value }}</p>
          </div>
        </div>
        <div class="pay-button" @click="redirec()">
          Inicio
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paypal from "../../components/Paypal.vue";

export default {
  components: { Paypal },
  data() {
    return {
      visible: false,
      order: {},
      finish: false,
      finishData: {},
      orderpaypal: {},
      error: false,
    };
  },
  methods: {
    hide() {
      this.visible = !this.visible;
    },
    finishPayment(data) {
      this.visible = false;
      this.finish = true;
      this.error = false;
      this.finishData = data;
    },
    finishPaymentError() {
      this.visible = false;
      this.finish = true;
      this.error = true;
    },
    data(order, orderpaypal) {
      this.order = order;
      this.orderpaypal = orderpaypal;
    },
    redirec() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
.container-payment {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.658);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-payment .card-payment {
  display: block;
  position: relative;
  width: 450px;
  height: 650px;
  background: white;
}

.container-payment .payment-title {
  font-size: 1.2rem;
  color: black;
  padding: 0.8em 0;
  text-align: center;
}

.container-payment .p-payment {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.container-payment .cp-title {
  font-size: 1.5rem;
  text-decoration: underline;
  font-weight: bold;
  margin-bottom: 0.9em;
}

.container-payment .grid-detail {
  align-items: center;
  display: grid;
  grid-template-areas: "img text price";
  grid-template-columns: 45px 250px 80px;
  padding: 0.5em 0.4em;
  margin-bottom: 0.3em;
  background: rgb(241, 241, 241);
}

.container-payment .p-img {
  grid-template: img;
  width: 45px;
  height: 45px;
  background: palegreen;
}

.container-payment .p-text {
  grid-template: text;
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 45px;
  font-weight: bold;
  padding: 0 0.35em;
}

.container-payment .qtxt {
  color: var(--second);
}

.container-payment .p-price {
  grid-template: price;
  font-size: 0.9rem;
}

.container-payment .p-payment {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container-payment .pay-description {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.5em;
  height: 300px;
  overflow-y: auto;
}

.payment-finish {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(128, 128, 128, 0.322);
  position: absolute;
  right: 0;
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: 1;
}

.payment-finish .pay-card {
  width: 350px;
  background: white;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 0.7em;
}

.payment-finish .logo {
  margin: 30px 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgb(145, 145, 145);
}

.payment-finish .text {
  margin-bottom: 1.5rem;
  text-align: center;
}

.payment-finish .s {
  font-weight: bold;
  line-height: 1.3em;
}

.payment-finish .pay-button {
  font-size: 1rem;
  background: var(--primary);
  margin: 1.5rem 0;
  padding: 0.5em 0.8em;
  color: var(--default);
  border-radius: 0.2em;
  font-weight: bold;
  cursor: pointer;
}
</style>
