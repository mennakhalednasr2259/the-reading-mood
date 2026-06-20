import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const savedUser = localStorage.getItem('reading-mood-user')
  
  const isAuthenticated = ref(!!savedUser)
  const user = ref(savedUser ? JSON.parse(savedUser) : null)

  function login(username, password) {
    const checkRole = username.toLowerCase().includes('admin') ? 'admin' : 'user'

    const userData = { 
      name: username,
      role: checkRole 
    }
    
    localStorage.setItem('reading-mood-user', JSON.stringify(userData))
    user.value = userData
    isAuthenticated.value = true
  }

  function register(username, email, password) {
    const checkRole = (email.toLowerCase().includes('admin') || username.toLowerCase().includes('admin')) ? 'admin' : 'user'

    const userData = { 
      name: username, 
      email: email,
      role: checkRole 
    }
    
    localStorage.setItem('reading-mood-user', JSON.stringify(userData))
    user.value = userData
    isAuthenticated.value = true
  }

  function logout() {
    localStorage.removeItem('reading-mood-user')
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, login, register, logout }
})