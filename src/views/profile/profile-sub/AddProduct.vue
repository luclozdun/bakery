<template>
  <div class="container-myproducts">
    <Title text="Mis Productos"/>
    <div class="configureX">
      <button class="accept" @click="createCake">Agregar</button>
    </div>
    <product :bakerId="bakerId" ref="listProducts" @updateCake="update" :crud="true" :sidebar="false" :adm="true" />
    <form-cake v-if="create" :bakerId="bakerId" ref="formCake" @closeCake="close" @refrestList="refresh" />
  </div>
</template>

<script>
import Title from "../../../components/Title.vue";
import FormCake from "../../foods/cake/FormCake.vue";
import Product from "../../foods/cake/Product.vue";
import jwt_decode from "jwt-decode";

export default {
  components: { Product, FormCake, Title },
  data() {
    return {
      create: false,
    };
  },
  computed: {
    bakerId() {
      var token = this.$store.state.Authenticate.token;
      var data = jwt_decode(token);
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
      var isLoggedIn = this.$store.state.Authenticate.status.loggedIn;
      
      if(!isLoggedIn) {
        return
      } 

      var token = this.$store.state.Authenticate.token;
      var data = jwt_decode(token);
      var role = data.role;

      if(role !== 'BAKER'){
        this.$router.push({ name: 'Home' });
        return
      }
    },
  },
  mounted() {
    this.baid();
  },
};
</script>

<style scoped>
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
