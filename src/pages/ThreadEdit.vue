<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>
    <thread-editor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ThreadEditor from "@/components/ThreadEditor.vue";
export default {
  components: { ThreadEditor },
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState(["posts", "threads"]),
    thread() {
      return this.threads.find((thread) => thread.id === this.id);
    },
    text() {
      return this.posts.find((post) => post.id === this.thread.posts[0]).text;
    },
  },
  methods: {
    ...mapActions(["updateThread"]),
    async save(event) {
      const newThread = await this.updateThread({
        ...event.thread,
        id: this.thread.id,
      });
      this.$router.push({ name: "ThreadShow", params: { id: newThread.id } });
    },
    cancel() {
      this.$router.push({ name: "ThreadShow", params: { id: this.id } });
    },
  },
};
</script>

<style scoped></style>
