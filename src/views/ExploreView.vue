<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMoodStore } from '../stores/moodStore'
import BookCard from '../components/BookCard.vue'

const moodStore = useMoodStore()

const searchQuery = ref('')
const selectedMood = ref('all')
const lengthFilter = ref('all')
const sortMode = ref('default')

onMounted(() => {
  document.body.removeAttribute('data-theme')
})

/* Base list */
const baseBooks = computed(() => {
  return moodStore?.books || moodStore?.allBooks || []
})

/* Available moods dynamically */
const availableMoods = computed(() => {
  const set = new Set()

  baseBooks.value.forEach(book => {
    if (book.mood) set.add(book.mood)
  })

  return Array.from(set)
})

/* Final filtered books */
const filteredBooks = computed(() => {
  let books = [...baseBooks.value]

  const query = searchQuery.value.trim().toLowerCase()

  if (query) {
    books = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    )
  }

  if (selectedMood.value !== 'all') {
    books = books.filter(book => book.mood === selectedMood.value)
  }

  if (lengthFilter.value !== 'all') {
    books = books.filter(book => {
      if (lengthFilter.value === 'short') return book.pages <= 200
      if (lengthFilter.value === 'medium') return book.pages > 200 && book.pages <= 400
      if (lengthFilter.value === 'long') return book.pages > 400
      return true
    })
  }

  if (sortMode.value === 'rating') {
    books.sort((a, b) => b.rating - a.rating)
  } else if (sortMode.value === 'pages') {
    books.sort((a, b) => b.pages - a.pages)
  }

  return books
})
</script>

<template>
  <div class="explore-page-container">
    <div class="explore-wrapper-max">

      <div class="explore-header">
        <h1 class="explore-title">The Grand Library</h1>
        <p class="explore-subtitle">
          Search, filter, and discover your next reading mood.
        </p>
      </div>

      <div class="filter-dashboard-card">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by title, author..."
            class="luxury-search-input"
          />
        </div>

        <div class="filters-options-grid">

          <div class="filter-group">
            <label class="filter-label">Filter by Mood</label>
            <select v-model="selectedMood" class="luxury-select">
              <option value="all">All Moods</option>
              <option
                v-for="mood in availableMoods"
                :key="mood"
                :value="mood"
              >
                {{ mood }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Book Length</label>
            <select v-model="lengthFilter" class="luxury-select">
              <option value="all">Any Length</option>
              <option value="short">Short Reads (≤ 200p)</option>
              <option value="medium">Medium Reads (200–400p)</option>
              <option value="long">Deep Reads (> 400p)</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Sort By</label>
            <select v-model="sortMode" class="luxury-select">
              <option value="default">Default</option>
              <option value="rating">Highest Rating ⭐</option>
              <option value="pages">Most Pages 📖</option>
            </select>
          </div>

        </div>
      </div>

      <div v-if="filteredBooks.length" class="books-luxury-grid">
        <BookCard
          v-for="book in filteredBooks"
          :key="book.id"
          :book="book"
        />
      </div>

      <div v-else class="explore-empty-state">
        <span class="empty-icon">📜</span>
        <h3>No books match your curation</h3>
        <p>Try adjusting your search or filters.</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.explore-page-container {
  min-height: 100vh;
  background-color: #f7f4eb !important;
  margin-top: -75px;
  padding: 8.5rem 2rem 4rem;
  font-family: 'Playfair Display', serif;
}

.explore-wrapper-max {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.explore-header {
  text-align: center;
}

.explore-title {
  font-size: 2.6rem;
  font-weight: 700;
  color: #3c2a21;
}

.explore-subtitle {
  font-size: 1rem;
  color: #7f6e62;
  font-style: italic;
  font-family: 'Inter', sans-serif;
}

.filter-dashboard-card {
  background-color: #ebe5d8;
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.6;
}

.luxury-search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 30px;
  border: 1px solid rgba(0,0,0,0.05);
  background-color: #f7f4eb;
  font-size: 1rem;
  color: #3c2a21;
  outline: none;
}

.filters-options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #5c4d43;
}

.luxury-select {
  padding: 0.8rem;
  border-radius: 12px;
  background-color: #f7f4eb;
  border: 1px solid rgba(0,0,0,0.05);
}

.books-luxury-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
}

.explore-empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #ebe5d8;
  border-radius: 20px;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}
</style>