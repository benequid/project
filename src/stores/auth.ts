import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null);
  const users = ref<User[]>([]);

  const initializeStore = () => {
    const stored = localStorage.getItem('users');
    if (stored) {
      users.value = JSON.parse(stored);
    }
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser);
    }
  };

  const saveToStorage = () => {
    localStorage.setItem('users', JSON.stringify(users.value));
    if (currentUser.value) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
    } else {
      localStorage.removeItem('currentUser');
    }
  };

  const register = (email: string, password: string, name: string) => {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      password,
      name
    };
    users.value.push(user);
    currentUser.value = user;
    saveToStorage();
  };

  const login = (email: string, password: string): boolean => {
    const user = users.value.find(u => u.email === email && u.password === password);
    if (user) {
      currentUser.value = user;
      saveToStorage();
      return true;
    }
    return false;
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('currentUser');
  };

  // Initialize on store creation
  initializeStore();

  return {
    currentUser,
    register,
    login,
    logout
  };
});