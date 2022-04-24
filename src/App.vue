<template>
  <div class="w-full">
    <the-nav-bar />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheNavBar from "./components/TheNavBar.vue";
export default {
  name: "App",
  components: { TheNavBar },
};
</script>

<style>
@import "assets/style.css";
</style>
