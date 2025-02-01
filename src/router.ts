import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import News from './views/News.vue';
import Guides from './views/Guides.vue';
import CreateNews from './views/CreateNews.vue';
import CreateGuide from './views/CreateGuide.vue';
import ArticleView from './views/ArticleView.vue';
import { useAuthStore } from './stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/guides',
      component: Guides
    },
    {
      path: '/news/create',
      component: CreateNews,
      beforeEnter: (_to, _from, next) => {
        if (!useAuthStore().currentUser) {
          next('/news');
        } else {
          next();
        }
      }
    },
    {
      path: '/guides/create',
      component: CreateGuide,
      beforeEnter: (_to, _from, next) => {
        if (!useAuthStore().currentUser) {
          next('/guides');
        } else {
          next();
        }
      }
    },
    {
      path: '/news/:id',
      component: ArticleView
    },
    {
      path: '/guides/:id',
      component: ArticleView
    }
  ]
});

export default router;