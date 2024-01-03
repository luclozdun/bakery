<template>
  <div class="container-product">
    <div class="product-grid" v-if="reload">
      <div class="header"></div>
      <div class="main">
        <div class="food">
          <div class="mb-3 text-title font-bold text-4xl">Tortas</div>
          <div class="grid xl:grid-cols-8 xl:gap-8 md:grid-cols-4 md:gap-4 gap-4 grid-cols-4" v-if="cakes.length !== 0">
            <div class="card" v-for="cake in cakes" :key="cake.id">
              <div class="img"></div>
              <div class="cook">
                <div class="c-title">
                  <p>{{ cake.typeCake.name }}</p>
                </div>
                <div class="c-cook crud" v-if="crud">
                  <div class="update active" @click="update(cake.id, cake)">
                    <PencilIcon class="text-white"/>
                  </div>
                  <div class="delete active" @click="deleteCake(cake.id)">
                    <TrashIcon class="text-white"/>
                  </div>
                </div>
                <div class="c-cook">
                  <p>{{ cake.coverCake.name }}</p>
                </div>
                <div class="c-cook">
                  <p>{{ cake.sizeCake.name }}</p>
                </div>
                <div class="c-cook">
                  <p>{{ cake.tasteCake.name }}</p>
                </div>
                <div class="c-cook special">
                  <div class="c-cook-view">
                    <div
                      class="cook-carousel"
                      v-if="cake.fillerCakes.length === 0"
                    >
                      <div class="cook-img"></div>
                      <p>Sin relleno</p>
                    </div>
                    <div
                      class="cook-carousel"
                      v-else
                      v-for="filler in cake.fillerCakes"
                      :key="filler.id"
                    >
                      <div class="cook-img">
                        <img :src="filler.image"/>
                      </div>
                      <p>{{ filler.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="c-cook count update">
                  <p>{{ cake.quantify }} unid</p>
                </div>
                <div class="c-cook count accept">
                  <p>S/ {{ cake.price }}</p>
                </div>
                <template v-if="adm === false">
                  <div
                    class="c-cook count add"
                    @click="add(cake)"
                    v-if="cake.quantify !== 0 && cake.buy === false"
                  >
                    <p>Agregar</p>
                  </div>
                  <div
                    class="c-cook count delete"
                    @click="remove(cake)"
                    v-if="cake.buy === true"
                  >
                    <p>Eliminar</p>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="c-cook count admin"
                    v-if="adm === true && cake.quantify !== 0"
                  >
                    <p>Con Stock</p>
                  </div>
                </template>

                <div
                  class="c-cook count add no"
                  v-if="cake.quantify === 0 && cake.buy == false"
                >
                  <p>Agotado</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <Empty :show="true" message="No hay tortas disponibles por el momento." />
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <Loading/>
    </div>
  </div>
  
</template>

<script>
import CakeService from "@/service/cake/CakeService";
import Empty from "../../../components/Empty.vue";
import { TrashIcon, PencilIcon } from '@vue-hero-icons/solid'
import Loading from "../../../components/Loading.vue";

export default {
    name: "Product",
    data() {
        return {
            pies: [],
            cakes: [],
            dremove: {
                bakerId: 0,
                productId: 0,
            },
            dictionary: {},
            loading: false,
            reload: false
        };
    },
    props: {
        bakerId: Number,
        crud: Boolean,
        adm: Boolean,
    },
    methods: {
        add(item) {
            item.buy = true;
            var cake = {
                type: item.typeCake.name,
                id: item.id,
                cover: item.coverCake.name,
                size: item.sizeCake.name,
                taste: item.tasteCake.name,
                price: item.price,
            };
            var addCake = {
                cake: cake,
                bakerId: this.bakerId,
            };
            this.$store.dispatch("OrderProduct/addProduct", addCake).then(() => { }, (error) => console.log(error));
        },
        dictionaryCake() {
            var dictionary = {};
            var orders = this.$store.state.OrderProduct.orders;
            if (orders !== []) {
                orders.forEach((o) => {
                    o.products.listcakes.forEach((lc) => {
                        dictionary[lc] = lc;
                    });
                });
            }
            return dictionary;
        },
        initialize() {
          this.loading = true
            CakeService.getAllByBakerId(this.bakerId).then((response) => {
                this.dictionary = this.dictionaryCake();
                var cakes = response.data;
                cakes.forEach((cake) => {
                    if (cake.id in this.dictionary) {
                        cake.buy = true;
                        return;
                    }
                    cake.buy = false;
                });
                this.cakes = cakes;
                this.reload = true
            }, (error) => console.log(error)).then(() => this.loading = false);
        },
        refreshCakes() {
            this.initialize();
        },
        deleteCake(id) {
            CakeService.deleteCake(id).then(() => {
                this.refreshCakes();
            }, (error) => console.log(error));
        },
        update(id, item) {
            this.$emit("updateCake", id, item);
        },
        remove(cake) {
            cake.buy = false;
            this.dremove.bakerId = Number(this.bakerId);
            this.dremove.productId = Number(cake.id);
            this.$store.dispatch("OrderProduct/remove", this.dremove).then(() => { }, (error) => console.log(error));
        },
    },
    mounted() {
        this.initialize();
    },
    components: { Empty, TrashIcon, PencilIcon, Loading }
};
</script>

<style>
div.container-product {
  margin: 0 auto;
  width: 100%;
  display: flex;
}

div.container-product div.product-grid {
  width: 100%;
}

div.product-grid div.main div.food div.title {
  font-size: 2em;
  color: var(--second);
}


div.product-grid div.main div.card {
  padding: 0.5rem 0;
  grid-column: span 2;
  box-shadow: 0px 0px 2px 0px var(--primary);
  display: flex;
  flex-direction: row;
  position: relative;
  border-radius: 5px;
  background: white;
}

div.product-grid div.main div.card div.c-title {
  margin: 0 0 0.6em 0;
  font-size: 1.3rem;
  text-align: center;
}

div.product-grid div.main div.card div.cook {
  width: 100%;
  height: auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

div.product-grid div.main div.card div.c-cook.crud {
  background: white;
  display: flex;
  justify-content: space-evenly;
}

div.product-grid div.main div.card div.c-cook.crud div {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.product-grid div.main div.card div.c-cook {
  width: 80%;
  font-size: 0.8rem;
  border-radius: 0.5em;
  margin: 0.5em 0 0 0;
  padding: 0.5em 0.2em;
  text-align: center;
  margin: 10px auto 0 auto;
  position: relative;
  background: #f9f1ff;
}

div.product-grid div.main div.card div.c-cook.special {
  padding: 0;
  overflow: auto;
}

div.product-grid div.main div.card div.c-cook.special div.c-cook-view {
  white-space: nowrap;
  padding: 1.3em 0;
}

div.product-grid div.main div.card div.c-cook.special div.cook-carousel {
  display: inline-flex;
  flex-direction: column;
  width: 72px;
  font-size: 0.65rem;
  height: 75px;
}

div.product-grid
  div.main
  div.card
  div.c-cook.special
  div.cook-carousel
  div.cook-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  margin: 0 auto;
}

div.product-grid div.main div.card div.c-cook.special div.cook-carousel p {
  display: inline;
  white-space: normal;
}

div.product-grid div.main div.card div.c-cook.count {
  color: rgb(255, 255, 255);
  font-size: 0.9em;
  font-weight: bold;
}

/* width */
div.product-grid div.main div.card div.c-cook.special::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
div.product-grid div.main div.card div.c-cook.special::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
div.product-grid div.main div.card div.c-cook.special::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 10px;
}

/* Handle on hover */
div.product-grid
  div.main
  div.card
  div.c-cook.special::-webkit-scrollbar-thumb:hover {
  background: var(--second);
}

div.product-grid div.main div.card div.img {
  width: 40%;
  height: 100%;
  display: none;
  background: rgb(192, 171, 207);
}

div.filter-container div.filter {
  cursor: pointer;
  color: var(--title);
}

div.filter-container div.filter p {
  font-size: 1rem;
  padding: 0.8em 0;
}

div.filter-container div.filter:active {
  color: var(--primary);
}

div.filter-container div.filter::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: var(--background1);
}

div.filter-container div.filter:last-child::after {
  display: none;
}

div.add {
  background: rgb(210, 61, 255) !important;
  cursor: pointer;
}

div.add.no {
  background: rgb(102, 102, 102) !important;
}

div.admin {
  background: rgb(17, 182, 17) !important;
  cursor: pointer;
}

@media (max-width: 900px) {
  div.container-product div.sidebar {
    display: none;
  }

  div.product-grid div.main div.card div.img {
    width: 100%;
    position: absolute;
  }

  div.container-product {
    width: 100%;
    display: flex;
    padding: 0px 5px;
  }
}
</style>
