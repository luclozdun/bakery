<template>
  <div>
    <product :bakerId="bakerId" :crud="false" :sidebar="true"></product>
  </div>
</template>

<script>
import Product from "../foods/cake/Product.vue";
export default {
  components: { Product },
  data() {
    return {};
  },
  computed: {
    bakerId() {
      return Number(this.$route.params.id);
    },
  },
  methods: {
    hi() {
      console.log("Hola");
    },
  },
  mounted() {
    this.hi();
  },
};
</script>

<style></style>
