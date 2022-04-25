<template>
  <div class="flex-grid">
    <user-profile-card v-if="!edit" :user="user" />
    <user-profile-card-editor v-else :user="user" />
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> {{ user.name }}'s recent activity </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />

      <post-list :posts="user.posts" />
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserProfileCardEditor from "@/components/UserProfileCardEditor.vue";
import { mapGetters } from "vuex";
export default {
  components: { PostList, UserProfileCard, UserProfileCardEditor },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({ user: "authUser" }),
  },
};
</script>

<style scoped></style>
