<template>
  <div class="w-full">
    <forum-list
      v-for="category in categories"
      :key="category.id"
      :forums="getForumsByCategoryId(category.id)"
      :title="category.name"
      :category-id="category.id"
    />
  </div>
</template>

<script>
import ForumList from "./ForumList.vue";
import { mapState } from "vuex";
export default {
  components: { ForumList },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(["forums"]),
  },
  methods: {
    getForumsByCategoryId(categoryId) {
      return this.forums.filter((forum) => forum.categoryId === categoryId);
    },
  },
};
</script>

<style scoped></style>
