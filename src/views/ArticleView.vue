<template>
  <div class="container mx-auto px-4 py-8">
    <article v-if="article" class="max-w-4xl mx-auto">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full h-64 object-cover rounded-lg mb-8"
      />
      
      <h1 class="text-4xl font-bold mb-4">{{ article.title }}</h1>
      
      <div class="flex items-center text-nord-6 mb-6">
        <span>{{ article.author }}</span>
        <span class="mx-2">•</span>
        <span>{{ formatDate(article.date) }}</span>
      </div>
      
      <div class="prose max-w-none mb-8">
        {{ article.content }}
      </div>
      
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in article.tags"
          :key="tag"
          @click="handleTagClick(tag)"
          class="px-3 py-1 bg-nord-1 rounded-full text-sm text-nord-6 hover:bg-nord-3 cursor-pointer"
        >
          {{ tag }}
        </span>
      </div>
    </article>
    
    <div v-else class="text-center py-12">
      <p class="text-xl text-nord-6">Статья не найдена</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArticlesStore } from '../stores/articles';
import { format } from 'date-fns';

const route = useRoute();
const router = useRouter();
const store = useArticlesStore();

const article = computed(() => 
  store.articles.find(a => a.id === route.params.id)
);

const formatDate = (date: string) => {
  return format(new Date(date), 'dd.MM.yyyy');
};

const handleTagClick = (tag: string) => {
  store.selectedTag = tag;
  router.push(`/${article.value?.type === 'news' ? 'news' : 'guides'}`);
};
</script>