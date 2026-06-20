<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import './styles/themes.css'

import { useAuthStore } from './stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <div class="app-container">
    <Navbar :key="authStore.isAuthenticated" />
    
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-page" mode="out-in">
          <component :is="Component" :key="route.fullPath + authStore.isAuthenticated" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #fdfbf7;
  color: #1a1a1a;
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>