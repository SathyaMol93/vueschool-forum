<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <post-list :posts="threadPosts" />
    <post-editor @save="add" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PostList from "../components/PostList.vue";
import PostEditor from "../components/PostEditor.vue";
export default {
  components: { PostList, PostEditor },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["posts", "threads"]),
    thread() {
      return this.threads.find((t) => t.id === this.id);
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    },
  },
  methods: {
    ...mapActions(["createPost"]),
    add(event) {
      const post = {
        ...event.post,
        threadId: this.id,
      };
      this.createPost(post);
    },
  },
};
</script>

<style scoped></style>
