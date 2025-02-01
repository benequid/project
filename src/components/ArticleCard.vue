<template>
  <router-link
    :to="`/${article.type}/${article.id}`"
    class="flex bg-nord-0 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
  >
    <img
      :src="article.image"
      :alt="article.title"
      class="w-48 h-48 object-cover"
    />
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-xl font-bold mb-2">{{ article.title }}</h3>
      <p class="text-nord-4 mb-4">{{ article.description }}</p>
      <div class="mt-auto">
        <div class="text-nord-9 mb-2">
          {{ formatDate(article.date) }}
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in article.tags"
            :key="tag"
            @click.prevent="handleTagClick(tag)"
            class="px-2 py-1 bg-nord-1 rounded-full text-sm text-nord-6 hover:bg-nord-3 cursor-pointer"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import type { Article } from '../types';
import { useArticlesStore } from '../stores/articles';
import { useRouter } from 'vue-router';

const props = defineProps<{
  article: Article;
}>();

const store = useArticlesStore();
const router = useRouter();

const formatDate = (date: string) => {
  return format(new Date(date), 'dd.MM.yyyy');
};

const handleTagClick = (tag: string) => {
  store.selectedTag = tag;
  router.push(`/${props.article.type === 'news' ? 'news' : 'guides'}`);
};
</script>