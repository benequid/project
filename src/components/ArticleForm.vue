<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 max-w-2xl mx-auto">
    <div>
      <label class="block text-sm font-medium text-nord-6 mb-2">Заголовок</label>
      <input
        v-model="form.title"
        type="text"
        required
        class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-nord-6 mb-2">Краткое описание</label>
      <textarea
        v-model="form.description"
        required
        rows="3"
        class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
      ></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium text-nord-6 mb-2">Имя автора</label>
      <input
        v-model="form.author"
        type="text"
        required
        class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-nord-6 mb-2">Содержание</label>
      <textarea
        v-model="form.content"
        required
        rows="10"
        class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
      ></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium text-nord-6 mb-2">URL картинки</label>
      <input
        v-model="form.image"
        type="url"
        required
        class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-nord-6 mb-2">Тэги (через запятую)</label>
      <input
        v-model="tagsInput"
        type="text"
        required
        class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-nord-3 text-white px-6 py-2 rounded-lg hover:bg-nord-8"
    >
      Опубликовать
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useArticlesStore } from '../stores/articles';
import { useRouter } from 'vue-router';
import type { Article } from '../types';

const props = defineProps<{
  type: 'news' | 'guide';
}>();

const store = useArticlesStore();
const router = useRouter();

const form = ref({
  title: '',
  description: '',
  author: '',
  content: '',
  image: '',
  type: props.type
});

const tagsInput = ref('');

const handleSubmit = () => {
  const article: Article = {
    ...form.value,
    id: '',
    date: '',
    tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
  };

  store.addArticle(article);
  router.push(`/${props.type}`);
};
</script>