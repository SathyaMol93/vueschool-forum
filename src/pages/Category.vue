<template>
  <div class="col-full">
    <forum-list
      :forums="forumList"
      :title="category.name"
      :category-id="category.id"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ForumList from "../components/ForumList.vue";
export default {
  components: { ForumList },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["categories", "forums"]),
    category() {
      return this.categories.find((category) => category.id === this.id);
    },
    forumList() {
      return this.forums.filter((forum) => forum.categoryId === this.id);
    },
  },
};
</script>

<style scoped></style>
