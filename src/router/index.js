import Home from "@/pages/Home";
import ThreadShow from "@/pages/ThreadShow";
import ThreadCreate from "@/pages/ThreadCreate";
import ThreadEdit from "@/pages/ThreadEdit";
import NotFound from "@/pages/NotFound";
import Forum from "@/pages/Forum";
import Category from "@/pages/Category";
import Profile from "@/pages/Profile";
import { createRouter, createWebHistory } from "vue-router";
import sourceData from "@/data.json";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/me",
    name: "Profile",
    component: Profile,
    meta: {
      toTop: true,
      smoothScroll: true,
    },
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: Profile,
    props: {
      edit: true,
    },
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: Forum,
    props: true,
    beforeEnter(to, from, next) {
      //check if forum exists
      const forumExists = sourceData.forums.find(
        (forum) => forum.id === to.params.id
      );

      if (forumExists) {
        // if exists constinue
        return next();
      } else {
        // if does nt exists redirect to not found
        return next({
          name: "NotFound",
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split("/") },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true,
    beforeEnter(to, from, next) {
      //check if category exists
      const categoryExists = sourceData.categories.find(
        (category) => category.id === to.params.id
      );

      if (categoryExists) {
        // if exists constinue
        return next();
      } else {
        // if does nt exists redirect to not found
        return next({
          name: "NotFound",
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split("/") },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      //check if thread exists
      const threadExists = sourceData.threads.find(
        (thread) => thread.id === to.params.id
      );

      if (threadExists) {
        // if exists constinue
        return next();
      } else {
        // if does nt exists redirect to not found
        return next({
          name: "NotFound",
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split("/") },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: ThreadEdit,
    props: true,
  },
  {
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreate",
    component: ThreadCreate,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",

    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = "smooth";
    return scroll;
  },
});

export default router;
