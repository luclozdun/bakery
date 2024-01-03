<template>
  <div class="container-orders">
    <div class="profile-title">
      <Title name="Mis Ordenes"/>
    </div>
    <div class="container-card-order" v-for="order in orders" :key="order.id">
      <div class="card-order">
        <div class="number-order">{{ order.code }}</div>
        <div class="card-title">
          <p>{{ order.bakerName }}</p>
        </div>
        <div class="card-desc">
          <div class="card-img">
            <div class="card-img-bakery"></div>
            <p>{{ order.createdDate }}</p>
          </div>
          <div class="card-info">
            <div class="card-info-title">
              <p>Mi Pedido</p>
            </div>
            <div class="grid" v-for="(info, index) in order.info" :key="index">
              <div class="card-grid">
                <div class="quantify">
                  <p>{{ info.quantity }}u</p>
                </div>
                <div class="desc">
                  <p>{{ info.productName }}</p>
                </div>
                <div class="cost">
                  <p>S/{{ info.subTotal }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-total">
          <div class="total">S/{{ order.total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "@/service/order/OrderService";
import jwtDecode from "jwt-decode";
import Title from "../../../components/Title.vue";

export default {
    name: "Order",
    data() {
        return {
            orders: [],
            customer: 0,
        };
    },
    methods: {
        initialize() {
            var isLoggedIn = this.$store.state.Authenticate.status.loggedIn;
            if (!isLoggedIn) {
                return;
            }
            var token = this.$store.state.Authenticate.token;
            var data = jwtDecode(token);
            this.customer = data.id;
            this.role = data.role;
            if (this.role !== 'CUSTOMER') {
                this.$router.push({ name: 'Home' });
                return;
            }
            this.customer = OrderService.getByCustomerId(this.customer).then((res) => {
                this.orders = res.data;
                console.log(this.orders);
            }, (e) => {
                console.log(e);
            });
        },
    },
    mounted() {
        this.initialize();
    },
    components: { Title }
};
</script>

<style scoped>
div.container-orders {
  width: 100%;
}

div.container-card-order {
  margin: 3em 0em;
  width: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
}

div.container-card-order div.card-order {
  position: relative;
  width: 80%;
  box-shadow: 0px 0px 3px var(--box1);
  border-radius: 0.8em;
  overflow: hidden;
  background: var(--default);
}

div.card-order div.number-order {
  display: inline-block;
  position: absolute;
  right: 0;
  padding: 0.5em 1em;
  box-shadow: 0px 0px 3px var(--box1);
  color: var(--text);
}

div.card-order div.card-title {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 1.4em 0em;
}

div.card-order div.card-title p {
  width: 75%;
  text-align: center;
  font-size: 1.8rem;
  display: inline;
  color: var(--title);
}

div.card-order div.card-desc {
  display: flex;
  flex-direction: row;
  margin: 1.2em 0em;
}

div.card-order div.card-desc div.card-img {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

div.card-order div.card-desc div.card-img p {
  margin-top: 0.5em;
}

div.card-order div.card-desc div.card-img div.card-img-bakery {
  width: 160px;
  height: 160px;
  background: var(--special2-btn);
  border-radius: 50%;
}

div.card-order div.card-desc div.card-info {
  flex: 3;
  display: flex;
  flex-direction: column;
}

div.card-order div.card-desc div.card-info div.card-info-title {
  font-size: 1.4rem;
  color: var(--subtitle);
}

div.card-info div.grid {
  margin: 1rem;
  display: grid;
  row-gap: 5px;
  grid-auto-rows: 40px;
  grid-template-columns: repeat(auto-fill, minmax(95%, 1fr));
  color: var(--title);
}

div.card-info div.card-grid {
  background: var(--background-opacity);
  display: grid;
  grid-template:
    "quantify desc cost" auto/
    60px auto 110px;
}

div.card-info div.card-grid div {}

div.card-info div.card-grid div.quantify {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: quantify;
}

div.card-info div.card-grid div.desc {
  display: flex;
  align-items: center;
  grid-area: desc;
}

div.card-info div.card-grid div.cost {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: cost;
}

div.card-order div.card-total {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1.2em;
}

div.card-order div.card-total div.total {
  display: inline-block;
  background: var(--background1);
  font-size: 1.2rem;
  padding: 0.4em 0.8em;
  border-radius: 5px;
  color: var(--default);
  margin-right: 50px;
}

@media (max-width: 900px) {
  div.card-order {
    width: 95% !important;
    border-radius: 0px !important;
  }

  div.card-order div.card-title {
    margin-top: 45px;
  }

  div.card-order div.card-desc {
    flex-direction: column;
  }

  div.card-order div.card-desc div.card-img div.card-img-bakery {
    width: 120px;
    height: 120px;
  }

  div.card-order div.card-desc div.card-info div.card-info-title {
    margin-top: 20px;
    text-align: center;
  }

  div.card-info div.grid {
    margin: 0px 15px;
    gap: 5px;
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 40%), 1fr));
  }

  div.card-info div.card-grid {
    grid-template:
      "quantify" auto
      "desc" auto
      "cost" auto/
      auto;
  }

  div.card-info div.card-grid div {
    justify-content: flex-start !important;
  }

  div.card-info div.card-grid div p {
    margin-left: 8px;
  }
}

@media (max-width: 650px) {
  div.card-info div.grid {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 100%), 1fr));
  }

  div.card-info div.card-grid {
    grid-template:
      "quantify desc" auto
      "cost cost" auto/
      30px auto;
  }

  div.card-info div.card-grid div p {
    padding: 0.2em 0em;
    font-size: 0.85rem;
  }

  div.card-info div.card-grid div.cost {
    justify-content: flex-end !important;
  }

  div.card-info div.card-grid div.cost p {
    margin-right: 0.5em;
  }
}
</style>
