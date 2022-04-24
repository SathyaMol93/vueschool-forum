<template>
  <div>
    <div class="col-full">
      <div class="thread-list">
        <h2 class="list-title">Threads</h2>

        <div v-for="thread in threads" :key="thread.id" class="thread">
          <div>
            <p>
              <router-link
                :to="{ name: 'ThreadShow', params: { id: thread.id } }"
              >
                {{ thread.title }}
              </router-link>
            </p>
            <p class="text-faded text-xsmall">
              By <a href="#">{{ userById(thread.userId).name }}</a
              >, <app-date :timestamp="thread.publishedAt" />.
            </p>
          </div>

          <div class="activity">
            <p class="replies-count">{{ thread.posts.length }}</p>

            <img
              class="avatar-medium"
              :src="userById(thread.userId).avatar"
              alt=""
            />

            <div>
              <p class="text-xsmall">
                <a href="profile.html">{{ userById(thread.userId).name }}</a>
              </p>
              <p class="text-xsmall text-faded">
                <app-date :timestamp="thread.publishedAt" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(["posts", "users"]),
  },
  methods: {
    postById(postId) {
      return this.posts.find((p) => p.id === postId);
    },

    userById(userId) {
      return this.users.find((u) => u.id === userId);
    },
  },
};
</script>

<style scoped></style>
