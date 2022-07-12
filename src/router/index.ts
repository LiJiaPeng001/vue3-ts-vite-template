import { createRouter, createWebHistory } from "vue-router";
import pages from '~pages' // vite-plugin-pages

const router = createRouter({
  history: createWebHistory(),
  routes: pages,
});

router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})

export default router;
