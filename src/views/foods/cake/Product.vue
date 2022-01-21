<template>
  <div class="container-product">
    <div class="sidebar" v-if="sidebar"></div>
    <div class="product-grid">
      <div class="header"></div>
      <div class="main">
        <div class="food">
          <div class="title">Tortas</div>
          <div class="products">
            <div class="card" v-for="cake in cakes" :key="cake.id">
              <button @click="asd(cake)">asd{{ cake.id }}</button>
              <div class="img"></div>
              <div class="cook">
                <div class="c-title">
                  <p>{{ cake.typeCake.name }}</p>
                </div>
                <div class="c-cook crud" v-if="crud">
                  <div class="update active" @click="update(cake.id, cake)">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </div>
                  <div class="delete active" @click="deleteCake(cake.id)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
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
                      <div class="cook-img"></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CakeService from "@/service/cake/CakeService";

export default {
  name: "Product",
  data() {
    return {
      pies: [],
      cakes: [],
    };
  },
  props: {
    bakerId: Number,
    crud: Boolean,
    sidebar: Boolean,
  },
  methods: {
    asd(item) {
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

      this.$store.dispatch("OrderProduct/add", addCake).then(
        () => {
          console.log("Se agrego");
        },
        (error) => console.log(error)
      );
    },
    getAllCakes() {
      CakeService.getAllByBakerId(this.bakerId).then(
        (response) => {
          this.cakes = response.data;
          console.log(response.data);
        },
        (error) => console.log(error)
      );
    },
    refreshCakes() {
      this.getAllCakes();
    },
    deleteCake(id) {
      CakeService.deleteCake(id).then(
        () => {
          this.refreshCakes();
        },
        (error) => console.log(error)
      );
    },
    update(id, item) {
      this.$emit("updateCake", id, item);
    },
  },
  mounted() {
    this.getAllCakes();
  },
};
</script>

<style>
div.container-product {
  margin: 0 auto;
  width: 90%;
  display: flex;
}

div.container-product div.product-grid {
  width: 100%;
}

div.container-product div.sidebar {
  height: 500px;
  width: 250px;
  background: red;
  margin-right: 25px;
}

div.product-grid div.main div.food div.title {
  font-size: 2em;
  font-family: Poppins-Bold;
  color: var(--second);
}

div.product-grid div.main div.products {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
}

div.product-grid div.main div.card {
  padding: 0.5rem 0;
  grid-column: span 2;
  font-family: Poppins-Regular;
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
  font-family: Poppins-Bold;
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
  font-family: Poppins-Regular;
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
