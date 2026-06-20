<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const router = useRouter()

const { isAuthenticated, user } = storeToRefs(authStore)

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  await authStore.logout()
  isMenuOpen.value = false
  router.replace('/')
}
</script>

<template>
  <nav class="navbar">
    <div class="brand">
      <router-link
        to="/"
        class="logo"
        @click="isMenuOpen = false"
      >
        📖 ReadingMood
      </router-link>
    </div>

    <button
      class="menu-btn"
      @click="toggleMenu"
      :class="{ active: isMenuOpen }"
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <div
      class="menu"
      :class="{ open: isMenuOpen }"
    >
      <div class="links">
        <router-link to="/" class="link" @click="isMenuOpen = false">
          Home
        </router-link>

        <router-link to="/explore" class="link" @click="isMenuOpen = false">
          Explore
        </router-link>

       

        <template v-if="isAuthenticated && user?.role !== 'admin'">
          <router-link to="/notebook" class="link" @click="isMenuOpen = false">
            Notebook
          </router-link>

          <router-link to="/profile" class="link" @click="isMenuOpen = false">
            Profile
          </router-link>
           <router-link to="/favorites" class="link" @click="isMenuOpen = false">
            Library
          </router-link>
        </template>
         <router-link to="/about" class="link" @click="isMenuOpen = false">
          About
        </router-link>
      </div>

      <div class="auth">
        <router-link
          v-if="isAuthenticated && user?.role === 'admin'"
          to="/admin"
          class="admin-link"
          @click="isMenuOpen = false"
        >
          Admin
        </router-link>

        <template v-if="!isAuthenticated">
          <router-link
            to="/login"
            class="btn login"
            @click="isMenuOpen = false"
          >
            Sign In
          </router-link>

          <router-link
            to="/register"
            class="btn register"
            @click="isMenuOpen = false"
          >
            Sign Up
          </router-link>
        </template>

        <template v-else>
          <div class="profile">
            <span class="welcome">
              Hi, {{ user?.name }}
            </span>

            <button
              @click="handleLogout"
              class="btn logout"
            >
              Logout 🚪
            </button>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem;
  background-color: var(--bg-card, #ebe5d8);
  border-bottom: 1px solid var(--border, rgba(50, 31, 24, 0.06));
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-main, #3c2a21);
  text-decoration: none;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 3rem;
}

.links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.link {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-muted, #7f6e62);
  text-decoration: none;
  transition: color 0.25s ease;
}

.link:hover,
.router-link-active {
  color: var(--text-main, #321f18);
  font-weight: 600;
}

.auth {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}

.admin-link {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted, #7f6e62);
  border: 1px solid var(--border, rgba(127, 110, 98, 0.3));
  padding: 0.4rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.admin-link:hover {
  color: var(--text-main, #321f18);
  border-color: var(--text-main, #321f18);
  background-color: rgba(50, 31, 24, 0.03);
}

.btn {
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.login {
  color: var(--text-main, #321f18);
  background: transparent;
}

.register {
  background-color: var(--text-main, #321f18);
  color: var(--bg-main, #f7f4eb);
  border: 1px solid var(--text-main, #321f18);
}

.logout {
  background: transparent;
  border: 1px solid var(--border, rgba(50, 31, 24, 0.2));
  color: var(--text-main, #321f18);
}

.logout:hover {
  background-color: var(--text-main, #321f18);
  color: var(--bg-main, #f7f4eb);
}

.profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main, #3c2a21);
}

.menu-btn {
  display: none;
}

/* Mobile */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
  }

  .menu-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .menu-btn .bar {
    width: 100%;
    height: 2px;
    background-color: var(--text-main, #321f18);
  }

  .menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--bg-card, #ebe5d8);
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem 0;
    margin-left: 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  }

  .menu.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .links,
  .auth,
  .profile {
    flex-direction: column;
  }
}
</style>