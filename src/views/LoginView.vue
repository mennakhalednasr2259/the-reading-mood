<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (!username.value || !password.value) return

  authStore.login(username.value, password.value)

  if (authStore.user?.role === 'admin') {
    router.push('/admin')
  } else {
    router.push('/profile')
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">

      <div class="auth-header">
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-subtitle">
          Sign in to continue your reading journey.
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">

        <div class="input-group">
          <label class="auth-label">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="luxury-input"
            required
          />
        </div>

        <div class="input-group">
          <label class="auth-label">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="luxury-input"
            required
          />
        </div>

        <button type="submit" class="auth-submit-btn">
          Sign in
        </button>

      </form>

      <p class="auth-footer">
        New here?
        <router-link to="/register" class="auth-link">
          Create account
        </router-link>
      </p>

    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: calc(100vh - 75px); 
  margin-top: -75px; 
  padding-top: 75px; 
  
  background-color: #f7f4eb !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  box-sizing: border-box;
}

.auth-card {
  background-color: #ebe5d8;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 40px rgba(50, 31, 24, 0.03);
  text-align: center;
}

.auth-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: #3c2a21;
  margin-bottom: 0.4rem;
}

.auth-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #7f6e62;
  margin-bottom: 2.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
}

.auth-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #5c4d43;
  padding-left: 0.2rem;
}

.luxury-input {
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  background-color: #f7f4eb;
  border: 1px solid rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #3c2a21;
  outline: none;
  transition: border-color 0.3s ease;
}

.luxury-input:focus {
  border-color: #321f18;
}

.auth-submit-btn {
  background-color: #321f18;
  color: #f7f4eb;
  border: none;
  padding: 1rem;
  border-radius: 30px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.auth-submit-btn:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

.auth-footer {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #7f6e62;
  margin-top: 2rem;
}

.auth-link {
  color: #321f18;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid rgba(50, 31, 24, 0.3);
}
</style>