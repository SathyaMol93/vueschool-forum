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
        id: "",
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        userId: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
      };

      this.$emit("save", { post });
    },
  },
};
</script>

<style scoped></style>
