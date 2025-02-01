<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold">Игровые новости</h1>
      <router-link
        to="/news/create"
        v-if="authStore.currentUser"
        class="bg-nord-3 text-nord-6 px-6 py-2 rounded-lg hover:bg-nord-9"
      >
        Опубликовать новость
      </router-link>
    </div>

    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="tag in uniqueTags"
        :key="tag"
        @click="store.selectedTag = store.selectedTag === tag ? '' : tag"
        :class="[
          'px-4 py-2 rounded-full text-sm',
          store.selectedTag === tag
            ? 'bg-nord-3 text-nord-6'
            : 'bg-nord-1 text-nord-6 hover:bg-nord-3'
        ]"
      >
        {{ tag }}
      </button>
    </div>

    <div class="space-y-6">
      <ArticleCard
        v-for="article in filteredNews"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useArticlesStore } from '../stores/articles';
import { useAuthStore } from '../stores/auth';
import ArticleCard from '../components/ArticleCard.vue';

const store = useArticlesStore();
const authStore = useAuthStore();

const filteredNews = computed(() => 
  store.filteredArticles.filter(article => article.type === 'news')
);

const uniqueTags = computed(() => {
  const tags = new Set<string>();
  store.news.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
});
</script>