<template>
  <div>
    <form enctype="multipart/form-data">
      <input accept="image/*" type="file" @change="addImage($event)" />
      <input @click="subir()" type="submit" value="Subir Imagen" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
    };
  },
  methods: {
    addImage(e) {
      this.image = e.target.files[0];
      console.log(this.image);
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
