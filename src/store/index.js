import { createStore } from "vuex";
import sourceDate from "@/data.json";
export default createStore({
  state: {
    ...sourceDate,
    authId: "NnooaWj4KHVxbhKwO1pEdfaQDsD2",
  },
  getters: {
    authUser: (state) => state.users.find((user) => user.id === state.authId),
  },
  actions: {
    createPost({ commit }, post) {
      post.id = "qwert" + Math.random();
      commit("SET_POST", post);
      commit("APPEND_POST_TO_THREAD", {
        postId: post.id,
        threadId: post.threadId,
      });
    },
  },
  mutations: {
    SET_POST(state, post) {
      state.posts.push(post);
    },
    APPEND_POST_TO_THREAD(state, { threadId, postId }) {
      const thread = state.threads.find((thread) => thread.id === threadId);
      thread.posts.push(postId);
    },
  },
});
