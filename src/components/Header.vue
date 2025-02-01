<template>
  <header class="bg-nord-bg text-nord-6">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <router-link to="/" class="text-2xl font-bold text-nord-8">GP</router-link>
        <nav class="space-x-6">
          <router-link to="/" class="hover:text-nord-8">Главная</router-link>
          <router-link to="/news" class="hover:text-nord-8">Новости</router-link>
          <router-link to="/guides" class="hover:text-nord-8">Гайды</router-link>
        </nav>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            type="text"
            v-model="store.searchQuery"
            placeholder="Поиск..."
            class="bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
          />
        </div>
        
        <div class="relative" v-if="!authStore.currentUser">
          <button
            @click="showAuthModal = true"
            class="bg-nord-3 hover:bg-nord-8 px-4 py-2 rounded-lg"
          >
            Войти
          </button>
        </div>
        <div v-else class="flex items-center space-x-2">
          <span>{{ authStore.currentUser.name }}</span>
          <button
            @click="authStore.logout()"
            class="bg-nord-11 hover:bg-nord-12 px-4 py-2 rounded-lg"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Auth Modal -->
  <div v-if="showAuthModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-nord-0 rounded-lg p-8 max-w-md w-full">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-nord-6">
          {{ isLogin ? 'Вход' : 'Регистрация' }}
        </h2>
        <button @click="showAuthModal = false" class="text-nord-5 hover:text-nord-8">
          ✕
        </button>
      </div>

      <form @submit.prevent="handleAuth" class="space-y-4">
        <div v-if="!isLogin">
          <label class="block text-nord-6">Имя</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full bg-nord-1 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
          />
        </div>
        
        <div>
          <label class="block text-nord-6">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full bg-nord-1 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
          />
        </div>
        
        <div>
          <label class="block text-nord-6">Пароль</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full bg-nord-1 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-nord-3 text-nord-6 py-2 rounded-lg hover:bg-nord-8"
        >
          {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
        </button>

        <p class="text-center text-nord-6">
          {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
          <button
            type="button"
            @click="isLogin = !isLogin"
            class="text-nord-8 hover:text-nord-9"
          >
            {{ isLogin ? 'Зарегистрироваться' : 'Войти' }}
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useArticlesStore } from '../stores/articles';
import { useAuthStore } from '../stores/auth';

const store = useArticlesStore();
const authStore = useAuthStore();

const showAuthModal = ref(false);
const isLogin = ref(true);
const email = ref('');
const password = ref('');
const name = ref('');

const handleAuth = () => {
  if (isLogin.value) {
    if (authStore.login(email.value, password.value)) {
      showAuthModal.value = false;
    } else {
      alert('Неверный email или пароль');
    }
  } else {
    authStore.register(email.value, password.value, name.value);
    showAuthModal.value = false;
  }
  
  email.value = '';
  password.value = '';
  name.value = '';
};
</script>