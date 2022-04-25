<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <form @submit.prevent="save">
        <p class="text-center">
          <img
            :src="activeUser.avatar"
            alt=""
            class="avatar-xlarge img-update"
          />
        </p>
        <div class="form-group">
          <input
            v-model="activeUser.username"
            type="text"
            placeholder="Username"
            class="form-input text-lead text-bold"
          />
        </div>

        <div class="form-group">
          <input
            v-model="activeUser.name"
            type="text"
            placeholder="Full Name"
            class="form-input text-lead"
          />
        </div>

        <div class="form-group">
          <label for="user_bio">Bio</label>
          <textarea
            v-model="activeUser.bio"
            class="form-input"
            id="user_bio"
            placeholder="Write a few words about yourself."
          ></textarea>
        </div>

        <div class="stats">
          <span>{{ activeUser.postcount }} posts</span>
          <span>{{ activeUser.threadCount }} threads</span>
        </div>

        <hr />

        <div class="form-group">
          <label class="form-label" for="user_website">Website</label>
          <input
            autocomplete="off"
            class="form-input"
            id="user_website"
            v-model="activeUser.website"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="user_email">Email</label>
          <input
            autocomplete="off"
            class="form-input"
            id="user_email"
            v-model="activeUser.email"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="user_location">Location</label>
          <input
            autocomplete="off"
            class="form-input"
            id="user_location"
            v-model="activeUser.location"
          />
        </div>

        <div class="btn-group space-between">
          <button class="btn-ghost" @click="cancel()">Cancel</button>
          <button class="btn-blue">Save</button>
        </div>
      </form>
    </div>

    <p class="text-xsmall text-faded text-center">
      Member since june 2003, last visited 4 hours ago
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeUser: { ...this.user },
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["updateUser"]),
    save() {
      this.updateUser({ ...this.activeUser });
      this.$router.push({ name: "Profile" });
    },
    cancel() {
      this.$router.push({ name: "Profile" });
    },
  },
};
</script>

<style scoped></style>
