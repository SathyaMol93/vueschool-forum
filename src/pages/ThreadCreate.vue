<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <thread-editor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ThreadEditor from "@/components/ThreadEditor.vue";
export default {
  components: { ThreadEditor },
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState(["forums"]),
    forum() {
      return this.forums.find((forum) => forum.id === this.forumId);
    },
  },
  methods: {
    ...mapActions(["createThread"]),
    async save(event) {
      const thread = await this.createThread({
        ...event.thread,
        forumId: this.forum.id,
      });
      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "Forum", params: { id: this.forum.id } });
    },
  },
};
</script>

<style scoped></style>
