<template>
  <div class="createcake">
    <div class="card">
      <div class="title" @click="close">
        <p>Nuevo Producto</p>
      </div>
      <div class="data">
        <div class="bakery">
          <div class="circle"></div>
        </div>
        <div class="select">
          <select required v-model="cake.typecakeId">
            <option value="" hidden></option>
            <option
              v-for="typeCake in typeCakes"
              :key="typeCake.id"
              :value="typeCake.id"
              >{{ typeCake.name }}</option
            >
          </select>
          <label>Tipo de torta</label>
          <div></div>
        </div>
        <div class="select">
          <select required v-model="cake.tastecakeId">
            <option value="" hidden></option>
            <option
              v-for="tasteCake in tasteCakes"
              :key="tasteCake.id"
              :value="tasteCake.id"
              >{{ tasteCake.name }}</option
            >
          </select>
          <label>Sabor del keke</label>
          <div></div>
        </div>
        <div class="select">
          <select required v-model="cake.sizecakeId">
            <option value="" hidden></option>
            <option
              v-for="sizeCake in sizeCakes"
              :key="sizeCake.id"
              :value="sizeCake.id"
              >{{ sizeCake.name }}</option
            >
          </select>
          <label>Tamaño del keke</label>
          <div></div>
        </div>
        <div class="select">
          <select required v-model="cake.covercakeId">
            <option value="" hidden></option>
            <option
              v-for="coverCake in coverCakes"
              :key="coverCake.id"
              :value="coverCake.id"
              >{{ coverCake.name }}</option
            >
          </select>
          <label>Tipo de crema</label>
          <div></div>
        </div>
        <div class="filled">Rellenos</div>
        <div class="checkbox" v-for="filler in fillerCakes" :key="filler.id">
          <label
            >{{ filler.name }}
            <input
              type="checkbox"
              :value="filler.id"
              v-model="cake.fillerCakeIds"
            />
            <span></span>
          </label>
        </div>
        <div class="input">
          <input v-model="cake.price" type="number" required />
          <label>Precio</label>
          <span></span>
        </div>
        <div class="input">
          <input v-model="cake.quantify" type="number" required />
          <label>Cantidad</label>
          <span></span>
        </div>
        <div>
          <button class="accept" v-if="createValid" @click="createCake">
            Create
          </button>
        </div>
        <div>
          <button class="update" v-if="updateValid" @click="updateCake">
            Actualizar
          </button>
        </div>

        <div class="pie"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CakeService from "@/service/cake/CakeService";

export default {
  name: "CreateCakes",
  data() {
    return {
      sizeCakes: [],
      coverCakes: [],
      tasteCakes: [],
      typeCakes: [],
      fillerCakes: [],
      cake: {
        bakerId: Number,
        covercakeId: Number,
        fillerCakeIds: [],
        price: 0,
        quantify: 0,
        sizecakeId: Number,
        tastecakeId: Number,
        typecakeId: Number,
      },
      createValid: false,
      updateValid: false,
      cakeId: Number,
    };
  },
  props: {
    bakerId: Number,
  },
  methods: {
    getAllPropCake() {
      CakeService.getAllTastes().then(
        (response) => {
          this.tasteCakes = response.data;
        },
        (error) => console.log(error)
      );

      CakeService.getAllSizes().then(
        (response) => {
          this.sizeCakes = response.data;
        },
        (error) => console.log(error)
      );

      CakeService.getAllTypes().then(
        (response) => {
          this.typeCakes = response.data;
        },
        (error) => console.log(error)
      );

      CakeService.getAllCovers().then(
        (response) => {
          this.coverCakes = response.data;
        },
        (error) => console.log(error)
      );

      CakeService.getAllFillers().then(
        (response) => {
          this.fillerCakes = response.data;
        },
        (error) => console.log(error)
      );
    },
    btnCreate() {
      this.createValid = true;
    },
    createCake() {
      this.cake.bakerId = this.bakerId;
      console.log(this.cake);
      CakeService.createCake(this.cake).then(
        () => {
          this.$emit("refrestList", "someText");
          this.close();
        },
        (error) => console.log(error)
      );
    },
    close() {
      this.createValid = false;
      this.updateValid = false;
      this.cake = Object.assign({
        bakerId: Number,
        covercakeId: Number,
        fillerCakeIds: [],
        price: 0,
        quantify: 0,
        sizecakeId: Number,
        tastecakeId: Number,
        typecakeId: Number,
      });
      this.$emit("closeCake", "someText");
    },
    btnUpdate(id, item) {
      this.updateValid = true;
      var fillers = [];
      item.fillerCakes.forEach((filler) => {
        fillers.push(filler.id);
      });
      this.cake = Object.assign({
        bakerId: this.bakerId,
        covercakeId: item.coverCake.id,
        fillerCakeIds: fillers,
        price: item.price,
        quantify: item.quantify,
        sizecakeId: item.sizeCake.id,
        tastecakeId: item.tasteCake.id,
        typecakeId: item.typeCake.id,
      });
      this.cakeId = id;
    },
    updateCake() {
      CakeService.updateCake(this.cakeId, this.cake).then(
        () => {
          this.$emit("refrestList", "someText");
          this.close();
        },
        (error) => console.log(error)
      );
    },
  },
  mounted() {
    this.getAllPropCake();
  },
};
</script>

<style>
.createcake {
  width: 100%;
  height: 100%;
  background: rgba(66, 66, 66, 0.452);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 15000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.createcake .card {
  width: 450px;
  height: 80%;
  background: var(--default);
  text-align: center;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.createcake .card .title {
  border-bottom: 2px solid var(--primary);
  padding: 15px 0;
  height: 50px;
  color: var(--primary);
}

.createcake .card .data {
  width: 100%;
  flex: 1;
}

.createcake .bakery {
  display: flex;
  justify-content: center;
}

.createcake .bakery .circle {
  background: red;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin: 35px 0;
}

.createcake .filled {
  margin: 1.1em auto;
  text-align: start;
  width: 80%;
  font-size: 1.5rem;
  text-decoration: underline;
  color: var(--text);
}

.createcake .select,
.createcake .checkbox,
.createcake .input {
  width: 80%;
  font-size: 1.1rem;
}

.createcake .select select,
.createcake .checkbox,
.createcake .input input {
  font-weight: 100;
  color: var(--text);
}

.createcake .select label,
.createcake .input label {
  color: var(--second);
}

.createcake .checkbox {
  margin: 0 auto;
}

.createcake button {
  margin: 0.8em 0;
  font-size: 1.2rem;
}
</style>
