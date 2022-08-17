<template>
  <div id="app">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <div>
      <NavBar />
      <div class="app-route">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "./components/Navigator.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
@import "./css/animation.css";
@import "./css/spansvg.css";
@import "./css/global.css";
@import "./font/FontType.css";
</style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif; /* this was it */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
