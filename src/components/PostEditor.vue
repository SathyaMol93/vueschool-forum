<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_content">Post:</label>
      <textarea
        v-model="text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-blue" name="Publish">Publish</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    save() {
      const post = {
        text: this.text,
      };

      this.$emit("save", { post });
      this.text = "";
    },
  },
};
</script>

<style scoped></style>
