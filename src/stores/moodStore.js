import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import booksData from '../data/books.json' 

export const useMoodStore = defineStore('mood', () => {
  const selectedMood = ref(localStorage.getItem('user-mood') || '')
  const loading = ref(false)

  const books = ref(booksData)

  const filteredBooks = computed(() => {
    if (!selectedMood.value) {
      return books.value
    }
    return books.value.filter(book => book.mood.toLowerCase() === selectedMood.value.toLowerCase())
  })

  const setMood = (moodId) => {
    selectedMood.value = moodId
  }

  const clearMood = () => {
    selectedMood.value = ''
  }

  watch(selectedMood, (newMood) => {
    if (newMood) {
      localStorage.setItem('user-mood', newMood)
      document.body.setAttribute('data-theme', newMood)
    } else {
      localStorage.removeItem('user-mood')
      document.body.removeAttribute('data-theme')
    }
  }, { immediate: true })

  const toggleFavorite = (bookId) => {
  }
  const isFavorite = (bookId) => {
    return false
  }

  return {
    selectedMood,
    loading,
    books,
    filteredBooks,
    setMood,
    clearMood,
    toggleFavorite,
    isFavorite
  }
})