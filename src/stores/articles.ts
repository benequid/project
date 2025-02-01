import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Article } from '../types';

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([]);
  const searchQuery = ref('');
  const selectedTag = ref('');

  // Initialize from localStorage
  const initializeStore = () => {
    const stored = localStorage.getItem('articles');
    if (stored) {
      articles.value = JSON.parse(stored);
    }
  };

  // Save to localStorage
  const saveToStorage = () => {
    localStorage.setItem('articles', JSON.stringify(articles.value));
  };

  const addArticle = (article: Article) => {
    articles.value.push({
      ...article,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    });
    saveToStorage();
  };

  const filteredArticles = computed(() => {
    let filtered = articles.value;
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
      );
    }

    if (selectedTag.value) {
      filtered = filtered.filter(article => 
        article.tags.includes(selectedTag.value)
      );
    }

    return filtered;
  });

  const latestNews = computed(() => 
    articles.value
      .filter(article => article.type === 'news')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
  );

  const news = computed(() => 
    articles.value.filter(article => article.type === 'news')
  );

  const guides = computed(() => 
    articles.value.filter(article => article.type === 'guide')
  );

  // Initialize on store creation
  initializeStore();

  return {
    articles,
    searchQuery,
    selectedTag,
    addArticle,
    filteredArticles,
    latestNews,
    news,
    guides
  };
});