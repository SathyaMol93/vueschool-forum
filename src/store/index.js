import { createStore } from "vuex";
import sourceDate from "@/data.json";
import { findById, upsert } from "@/helpers";

export default createStore({
  state: {
    ...sourceDate,
    authId: "NnooaWj4KHVxbhKwO1pEdfaQDsD2",
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find((user) => user.id === state.authId);
      if (!user) return null;

      return {
        ...user,

        get posts() {
          return state.posts.filter((post) => post.userId === user.id);
        },
        get postcount() {
          return this.posts.length;
        },
        get threads() {
          return state.threads.filter((thread) => thread.userId === user.id);
        },
        get threadCount() {
          return this.threads.length;
        },
      };
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id);
        return {
          ...thread,
          get authur() {
            return findById(state.users, thread.userId);
          },
          get repliesCount() {
            return thread.posts.length - 1;
          },
          get contributorsCount() {
            return thread.contributors.length;
          },
        };
      };
    },
  },
  actions: {
    createPost({ commit, state }, post) {
      console.log(post);
      post.id = "post" + Math.random();
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      commit("SET_POST", post);
      commit("APPEND_POST_TO_THREAD", {
        childId: post.id,
        parentId: post.threadId,
      });
    },

    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const userId = state.authId;
      const id = "thread" + Math.random();
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = {
        forumId,
        publishedAt,
        title,
        userId,
        id,
      };
      commit("SET_THREAD", thread);
      commit("APPEND_THREAD_TO_FORUM", { childId: id, parentId: forumId });
      commit("APPEND_THREAD_TO_USER", { childId: id, parentId: userId });
      dispatch("createPost", { text, threadId: id });

      return state.threads.find((thread) => thread.id === id);
    },

    async updateThread({ commit, state }, { text, title, id }) {
      const thread = state.threads.find((thread) => thread.id === id);
      const post = findById(state.posts, thread.posts[0]);
      const newThread = { ...thread, title };
      commit("SET_THREAD", newThread);
      const newPost = { ...post, text };
      commit("SET_POST", newPost);

      return newThread;
    },
    updateUser({ commit }, user) {
      commit("SET_USER", { user });
    },
  },
  mutations: {
    SET_POST(state, post) {
      upsert(state.posts, post);
    },
    SET_THREAD(state, thread) {
      upsert(state.threads, thread);
    },
    SET_USER(state, { user }) {
      const userIndex = state.users.findIndex((u) => u.id === user.id);
      state.users[userIndex] = user;
    },
    APPEND_POST_TO_THREAD: makeAppendChildToParentMutation({
      parent: "threads",
      child: "posts",
    }),
    PPEND_THREAD_TO_FORUM: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads",
    }),
    APPEND_THREAD_TO_USER: makeAppendChildToParentMutation({
      parent: "users",
      child: "threads",
    }),
  },
});

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    resource[child].push(childId);
  };
}
