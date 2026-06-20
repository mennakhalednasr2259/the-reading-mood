<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useReadingListStore } from '../stores/readingListStore'
import allBooks from '../data/books.json'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const readingListStore = useReadingListStore()

const newQuote = ref('')
const isSaved = ref(false)

const book = computed(() => {
  return allBooks.find(b => b.id === parseInt(route.params.id))
})

const toggleFavorite = () => {
  if (book.value && favoritesStore.isFavorite(book.value.id)) {
    favoritesStore.removeFromFavorites(book.value.id)
  } else if (book.value) {
    favoritesStore.addToFavorites(book.value)
  }
}

const saveQuote = () => {
  if (newQuote.value.trim() !== '' && book.value) {
    favoritesStore.addQuote(book.value.title, newQuote.value)
    newQuote.value = ''

    isSaved.value = true
    setTimeout(() => {
      isSaved.value = false
    }, 2000)
  }
}

const isWantToRead = computed(() =>
  readingListStore.wantToRead.includes(book.value?.id)
)

const isRead = computed(() =>
  readingListStore.readBooks.includes(book.value?.id)
)
</script>

<template>
  <div v-if="book" class="book-details">
    <button class="back" @click="router.back()">← Back</button>

    <div class="layout">
      <div class="cover">
        <img :src="book?.cover" :alt="book?.title" />
      </div>

      <div class="info">
        <h1 class="title">{{ book?.title }}</h1>
        <p class="author">By {{ book?.author }}</p>

        <div class="meta">
          <span class="badge">⭐ {{ book?.rating }} Rating</span>
          <span class="badge">📖 {{ book?.pages }} Pages</span>
          <span class="badge mood">✨ Mood: {{ book?.mood }}</span>
        </div>

        <p class="description">{{ book?.description }}</p>

        <blockquote class="quote">
          <p>"{{ book?.quote }}"</p>
        </blockquote>

        <div class="actions">
          <button
            class="btn fav"
            :class="{ active: favoritesStore.isFavorite(book?.id) }"
            @click="toggleFavorite"
          >
            {{ favoritesStore.isFavorite(book?.id) ? '❤️ Remove' : '🤍 Favorite' }}
          </button>

          <button
            class="btn list"
            :class="{ active: isWantToRead }"
            @click="readingListStore.toggleWantToRead(book?.id)"
          >
            {{ isWantToRead ? '🔖 Want to Read' : '➕ Want to Read' }}
          </button>

          <button
            class="btn list"
            :class="{ active: isRead }"
            @click="readingListStore.toggleRead(book?.id)"
          >
            {{ isRead ? '✅ Read' : '📖 Mark as Read' }}
          </button>
        </div>

        <div class="quote-section">
          <h3>Write a Quote</h3>
          <p>Save a note from your reading</p>

          <div class="quote-form">
            <textarea
              v-model="newQuote"
              placeholder="Write something..."
              class="textarea"
            ></textarea>

            <button
              @click="saveQuote"
              class="btn-submit"
              :class="{ saved: isSaved }"
              :disabled="isSaved"
            >
              {{ isSaved ? 'Saved ✓' : 'Save Quote 📜' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Book not found 😢</p>
    <button @click="router.push('/')">Go Home</button>
  </div>
</template>

<style scoped>
.book-details {
  max-width: 950px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.back {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  margin-bottom: 2rem;
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 1fr 1.5fr;
  }
}

.cover img {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.author {
  font-size: 1.2rem;
  color: var(--text-muted);
}

.meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.badge {
  background: var(--bg-card);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.description {
  font-size: 1.05rem;
  line-height: 1.6;
}

.quote {
  background: var(--bg-card);
  border-left: 4px solid var(--accent-color);
  padding: 1.5rem;
  border-radius: 0 12px 12px 0;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  border: 1px solid rgba(0,0,0,0.1);
  background: var(--bg-card);
  cursor: pointer;
  transition: 0.25s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn.active {
  border-color: var(--accent-color);
}

.btn.fav.active {
  border-color: var(--accent-color);
}

.btn.list.active {
  background: #d1fae5;
  border-color: #10b981;
}

.quote-section {
  margin-top: 2.5rem;
}

.quote-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.textarea {
  width: 100%;
  height: 100px;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.08);
  resize: none;
}

.btn-submit {
  align-self: flex-end;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  background: #321f18;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-submit.saved {
  background: #065f46;
  color: #d1fae5;
}

.not-found {
  text-align: center;
  padding: 4rem;
}
</style>