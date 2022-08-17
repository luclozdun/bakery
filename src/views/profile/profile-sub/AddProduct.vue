<template>
  <div class="container-myproducts">
    <div class="configureX">
      <button class="accept" @click="createCake">Agregar</button>
    </div>
    <product
      :bakerId="bakerId"
      ref="listProducts"
      @updateCake="update"
      :crud="true"
      :sidebar="false"
      :adm="true"
    />
    <form-cake
      v-if="create"
      :bakerId="bakerId"
      ref="formCake"
      @closeCake="close"
      @refrestList="refresh"
    />
  </div>
</template>

<script>
import FormCake from "../../foods/cake/FormCake.vue";
import Product from "../../foods/cake/Product.vue";
import jwtDecode from "jwt-decode";

export default {
  components: { Product, FormCake },
  data() {
    return {
      create: false,
    };
  },
  computed: {
    bakerId() {
      var token = this.$store.state.Authenticate.token;
      var data = jwtDecode(token);
      return data.id;
    },
  },
  methods: {
    refresh() {
      this.$refs.listProducts.refreshCakes();
    },
    close() {
      this.create = false;
    },
    update(id, item) {
      console.log("Uodate parem");
      console.log(item);
      this.create = true;
      this.$nextTick(() => {
        this.$refs.formCake.btnUpdate(id, item);
      });
    },
    createCake() {
      this.create = true;
      this.$nextTick(() => {
        this.$refs.formCake.btnCreate();
      });
    },
    baid() {
      console.log(this.bakerId);
    },
  },
  mounted() {
    this.baid();
  },
};
</script>

<style>
.container-myproducts {
  padding-bottom: 20px;
}

.container-myproducts .configureX {
  display: flex;
  justify-content: right;
}

.container-myproducts button {
  padding: 0.6em 0.8em;
  border-radius: 0.3em;
  font-weight: bold;
  right: 0;
}
</style>
