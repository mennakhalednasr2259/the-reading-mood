<script setup>
import { ref, computed } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'

const favoritesStore = useFavoritesStore()
const copiedId = ref(null)

const defaultQuotes = [
  {
    id: 1,
    bookTitle: 'The Great Gatsby',
    text: '“So we beat on, boats against the current, borne back ceaselessly into the past.”',
    date: 'Jun 15'
  },
  {
    id: 2,
    bookTitle: 'Pride and Prejudice',
    text: '“I must learn to be content with being happier than I deserve.”',
    date: 'May 28'
  }
]

const quotesList = computed(() => {
  return favoritesStore?.quotes?.length
    ? favoritesStore.quotes
    : defaultQuotes
})

const copyQuote = async (text, id) => {
  try {
    await navigator.clipboard.writeText(text)

    copiedId.value = id

    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}
</script>

<template>
  <div class="quotes-page-container">
    <div class="quotes-wrapper-max">

      <div class="quotes-header">
        <h1 class="quotes-title">The Reader's Notebook</h1>
        <p class="quotes-subtitle">
          A curated sanctuary for lines that left a mark on your soul.
        </p>
      </div>

      <div class="quotes-luxury-grid">
        <div
          v-for="quote in quotesList"
          :key="quote.id"
          class="quote-aesthetic-card"
        >
          <span class="quote-mark">“</span>

          <p class="quote-text">
            {{ quote.text.replace(/[“”]/g, '') }}
          </p>

          <span class="quote-mark-end">”</span>

          <div class="quote-footer-row">
            <div class="book-info">
              <h4 class="quote-book-title">
                {{ quote.bookTitle }}
              </h4>
              <span class="quote-date">
                {{ quote.date }}
              </span>
            </div>

            <button
              @click="copyQuote(quote.text, quote.id)"
              class="copy-minimal-btn"
            >
              <span>
                {{ copiedId === quote.id ? 'Copied! ✓' : 'Copy' }}
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.quotes-page-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-color: #f7f4eb !important;
  padding: 8.5rem 2rem 4rem 2rem;
  font-family: 'Playfair Display', serif;
  z-index: 10;
}

.quotes-wrapper-max {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.quotes-header {
  text-align: center;
}

.quotes-title {
  font-size: 2.6rem;
  font-weight: 700;
  color: #3c2a21;
  margin-bottom: 0.4rem;
}

.quotes-subtitle {
  font-size: 1rem;
  color: #7f6e62;
  font-style: italic;
  font-family: 'Inter', sans-serif;
}

.quotes-luxury-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.quote-aesthetic-card {
  background-color: #ebe5d8;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.quote-aesthetic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(50, 31, 24, 0.04);
}

.quote-mark {
  font-size: 4rem;
  color: #321f18;
  opacity: 0.15;
  position: absolute;
  top: 0.5rem;
  left: 1.5rem;
  font-family: 'Playfair Display', serif;
}

.quote-text {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #321f18;
  font-style: italic;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.quote-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid rgba(50, 31, 24, 0.08);
  padding-top: 1rem;
}

.book-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.quote-book-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #3c2a21;
}

.quote-date {
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  color: #7f6e62;
}

.copy-minimal-btn {
  background: transparent;
  border: 1px solid rgba(50, 31, 24, 0.2);
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #321f18;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-minimal-btn:hover {
  background-color: #321f18;
  color: #f7f4eb;
  border-color: #321f18;
}

@media (max-width: 768px) {
  .quotes-luxury-grid {
    grid-template-columns: 1fr;
  }
}
</style>