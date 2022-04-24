<template>
  <div class="w-full push-top">
    <h1>Welcome to the forum</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryList from "@/components/CategoryList.vue";
export default {
  components: { CategoryList },
  computed: {
    ...mapState(["categories"]),
  },
};
</script>

<style scoped></style>
