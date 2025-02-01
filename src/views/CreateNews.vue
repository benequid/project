<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Опубликовать новость</h1>
    <ArticleForm type="news" />
  </div>
</template>

<script setup lang="ts">
import ArticleForm from '../components/ArticleForm.vue';
</script>