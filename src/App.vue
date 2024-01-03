<template>
  <div id="app" class="font-sans">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <div class="h-screen flex flex-col">
      <div>
        <NavBar />
      </div>
      <div class="h-full">
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
</style>
