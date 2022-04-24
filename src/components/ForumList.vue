<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <router-link
          v-if="categoryId"
          :to="{ name: 'Category', params: { id: categoryId } }"
        >
          {{ title }}
        </router-link>
        <span v-else>{{ title }}</span>
      </h2>

      <div v-for="forum in forums" :key="forum.id" class="forum-listing">
        <div class="forum-details">
          <router-link
            class="text-xlarge"
            :to="{ name: 'Forum', params: { id: forum.id } }"
          >
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forumThreadWord(forum) }}
          </p>
        </div>

        <div class="last-thread"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: "Forums",
    },
    categoryId: {
      type: String,
      required: false,
    },
  },
  methods: {
    forumThreadWord(forum) {
      return forum.threads?.length
        ? forum.threads?.length > 1
          ? "threads"
          : "thread"
        : "no threads";
    },
  },
};
</script>

<style scoped></style>
