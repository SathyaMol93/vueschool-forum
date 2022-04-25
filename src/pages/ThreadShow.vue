<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}

      <router-link
        :to="{ name: 'ThreadEdit', params: { id: thread.id } }"
        class="btn-green btn-small"
        >Edit thread</router-link
      >
    </h1>
    <p>
      By <a href="#" class="link-unstyled">Robin</a>, 2 hours ago.
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        >3 replies by 3 contributors</span
      >
    </p>
    <post-list :posts="threadPosts" />
    <post-editor @save="add" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
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
    ...mapGetters(["thread"]),
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    },
  },
  methods: {
    ...mapActions(["createPost"]),
    add(event) {
      const post = {
        ...event.post,
        id: "",
        threadId: this.id,
        publishedAt: 0,
        userId: "",
      };
      this.createPost(post);
    },
  },
};
</script>

<style scoped></style>
