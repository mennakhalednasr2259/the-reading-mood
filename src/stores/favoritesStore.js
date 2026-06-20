import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])
  const quotes = ref([]) 

  onMounted(() => {
    const savedFavorites = localStorage.getItem('reading-mood-favorites')
    if (savedFavorites) {
      favorites.value = JSON.parse(savedFavorites)
    }

    const savedQuotes = localStorage.getItem('reading-mood-quotes') 
    if (savedQuotes) {
      quotes.value = JSON.parse(savedQuotes)
    }
  })

  const saveToLocalStorage = () => {
    localStorage.setItem('reading-mood-favorites', JSON.stringify(favorites.value))
  }

  const saveQuotesToLocalStorage = () => {
    localStorage.setItem('reading-mood-quotes', JSON.stringify(quotes.value))
  }

  function addToFavorites(book) {
    if (!favorites.value.some(b => b.id === book.id)) {
      favorites.value.push(book)
      saveToLocalStorage()
    }
  }

  function removeFromFavorites(bookId) {
    favorites.value = favorites.value.filter(book => book.id !== bookId)
    saveToLocalStorage()
  }

  function addQuote(bookTitle, quoteText) {
    if (!quoteText.trim()) return
    
    quotes.value.unshift({
      id: Date.now(),
      bookTitle: bookTitle,
      text: quoteText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })
    saveQuotesToLocalStorage()
  }

  function isFavorite(bookId) {
    return favorites.value.some(book => book.id === bookId)
  }

  return { 
    favorites, 
    quotes, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite, 
    addQuote 
  }
})