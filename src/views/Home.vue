<template>
  <div class="container mx-auto px-4 py-8">
    <section class="mb-12">
      <h1 class="text-4xl font-bold mb-4">GamePortal - Игровой портал</h1>
      <p class="text-xl text-nord-6">
        Игровой портал, где вы можете увидеть последние новости в мире игр, узнать как пройти сложное место в игре и пообщаться на разные темы
      </p>
    </section>

    <section>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold">Новости</h2>
        <router-link
          to="/news"
          class="bg-nord-3 text-nord-6 px-6 py-2 rounded-lg hover:bg-nord-9"
        >
          Все новости
        </router-link>
      </div>

      <div class="space-y-6">
        <ArticleCard
          v-for="article in store.latestNews"
          :key="article.id"
          :article="article"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useArticlesStore } from '../stores/articles';
import ArticleCard from '../components/ArticleCard.vue';

const store = useArticlesStore();
</script>