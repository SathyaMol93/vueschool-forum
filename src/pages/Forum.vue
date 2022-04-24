<template>
  <div class="w-full">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>
        <a href="new-thread.html" class="btn-green btn-small">Start a thread</a>
      </div>
    </div>

    <div class="col-full push-top">
      <thread-list :threads="threadList" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ThreadList from "../components/ThreadList.vue";
export default {
  components: { ThreadList },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["forums", "threads"]),
    forum() {
      return this.forums.find((forum) => forum.id === this.id);
    },
    threadList() {
      return this.threads.filter((thread) => thread.forumId === this.id);
    },
  },
};
</script>

<style scoped></style>
