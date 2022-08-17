<template>
  <div class="bakery-product-container">
    <div class="sidebar" v-if="sidebar === true">
      <div class="b-filter">
        <p>Torta</p>
        <div class="space"></div>
        <p>Torta</p>
        <div class="space"></div>
        <p>Torta</p>
      </div>
    </div>
    <div class="products">
      <product :bakerId="bakerId" :crud="false" :adm="false"></product>
    </div>
  </div>
</template>

<script>
import Product from "../foods/cake/Product.vue";
export default {
  components: { Product },
  data() {
    return {
      sidebar: Boolean,
    };
  },
  computed: {
    bakerId() {
      return Number(this.$route.params.id);
    },
  },
  methods: {
    hi() {
      this.sidebar = true;
    },
  },
  mounted() {
    this.hi();
  },
};
</script>

<style>
div.bakery-product-container {
  display: flex;
  max-width: 1450px;
  margin-top: 20px;
}

div.bakery-product-container div.sidebar {
  width: 230px;
  border: 1px solid rgb(202, 202, 202);
  margin: 0 25px;
}

div.bakery-product-container div.sidebar div.b-filter {
  width: 90%;
  margin: 0 auto;
}

div.bakery-product-container div.sidebar p {
  font-size: 1.2rem;
  padding: 0.4em 0;
  color: var(--primary);
  cursor: pointer;
  font-weight: bold;
}

div.bakery-product-container div.sidebar div.space {
  display: block;
  width: 100%;
  background: var(--second);
  height: 3px;
  margin: 0 auto;
  border-radius: 0.5em;
}

div.bakery-product-container div.products {
  flex: 1;
}
</style>
