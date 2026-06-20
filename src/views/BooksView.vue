<script setup>
import { computed, ref } from 'vue'
import { useMoodStore } from '../stores/moodStore'
import { useRouter } from 'vue-router'

const moodStore = useMoodStore()
const router = useRouter()

const search = ref('')
const filter = ref('rating')

const titles = {
  romance: 'Books for Your Romance',
  fantasy: 'Books for Your Fantasy Escape ✨',
  mystery: 'Unravel the Mystery.',
  comfort: 'Feel-Good Comfort Reads',
  cry: 'Books to Make You Cry',
  'dark-academia': 'Dark Academia Lore'
}

const currentTitle = computed(() => {
  return titles[moodStore.selectedMood] || 'Curated Books'
})

const books = computed(() => {
  let result = moodStore.filteredBooks ? [...moodStore.filteredBooks] : []

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    )
  }

  if (filter.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else if (filter.value === 'pages') {
    result.sort((a, b) => b.pages - a.pages)
  }

  return result
})

const openBook = (id) => {
  router.push(`/book/${id}`)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="books-page">
    <div class="container">

      <button @click="goHome" class="back">
        ← back
      </button>

      <h1 class="title">{{ currentTitle }}</h1>

      <div class="controls">

        <div class="search">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
          />
          <span>🔍</span>
        </div>

        <div class="filters">
          <span>Filter:</span>

          <button
            @click="filter = 'rating'"
            :class="{ active: filter === 'rating' }"
          >
            Rating
          </button>

          <button
            @click="filter = 'pages'"
            :class="{ active: filter === 'pages' }"
          >
            Pages
          </button>
        </div>

      </div>

      <div class="grid">

        <div
          v-for="book in books"
          :key="book.id"
          class="card"
          @click="openBook(book.id)"
        >
          <div class="inner">

            <img :src="book.cover" class="cover" />

            <div class="info">
              <span class="genre">{{ book.genre }}</span>

              <h3 class="book-title">{{ book.title }}</h3>
              <p class="author">By {{ book.author }}</p>

              <div class="meta">
                ★ {{ book.rating }}
                <span>{{ book.pages }} pages</span>
              </div>

              <p class="desc">{{ book.description }}</p>

            </div>

          </div>
        </div>

        <div v-if="moodStore.loading" class="card loading">
          <div class="inner">
            <div class="skeleton-cover"></div>

            <div class="info">
              <div class="line t"></div>
              <div class="line a"></div>
              <div class="line m"></div>
              <div class="line d"></div>
            </div>
          </div>

          <span class="loading-text">Loading...</span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.books-page {
  min-height: 100vh;
  padding: 3rem 2rem 6rem;
}

.container {
  max-width: 1200px;
  margin: auto;
}

.back {
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 2rem;
  color: var(--text-muted);
}

.title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
}

.search {
  position: relative;
  width: 320px;
}

.search input {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.1);
}

.filters {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.filters button {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.filters button.active {
  background: black;
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 16px;
  cursor: pointer;
}

.inner {
  display: flex;
  gap: 1rem;
}

.cover {
  width: 100px;
  height: 145px;
  object-fit: cover;
  border-radius: 8px;
}

.genre {
  font-size: 0.75rem;
  opacity: 0.6;
}

.book-title {
  font-size: 1.2rem;
  margin: 0.2rem 0;
}

.author {
  font-size: 0.85rem;
  opacity: 0.6;
}

.meta {
  font-size: 0.85rem;
  margin: 0.5rem 0;
}

.desc {
  font-size: 0.8rem;
  opacity: 0.7;
}

.loading-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

/* skeleton */
.loading .line {
  height: 10px;
  background: #eee;
  margin-bottom: 0.5rem;
}

.skeleton-cover {
  width: 100px;
  height: 145px;
  background: #eee;
  border-radius: 8px;
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
  .controls { flex-direction: column; }
}
</style>