<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useReadingListStore } from '../stores/readingListStore'
import { useMoodStore } from '../stores/moodStore'
import { useRouter } from 'vue-router'
import BookCard from '../components/BookCard.vue'

const favoritesStore = useFavoritesStore()
const readingListStore = useReadingListStore()
const moodStore = useMoodStore()
const router = useRouter()

const activeTab = ref('favorites')

onMounted(() => {
  document.body.removeAttribute('data-theme')
})

onUnmounted(() => {
  const savedTheme = localStorage.getItem('user-mood')
  if (savedTheme) document.body.setAttribute('data-theme', savedTheme)
})

/* Helpers */
const findBookById = (id) =>
  moodStore.books?.find(b => b.id === id) ||
  moodStore.allBooks?.find(b => b.id === id)

/* Normalized lists */
const favoriteBooks = computed(() => favoritesStore.favorites || [])

const wantToReadList = computed(() =>
  readingListStore.wantToRead ||
  readingListStore.want ||
  []
)

const readList = computed(() =>
  readingListStore.readBooks ||
  readingListStore.read ||
  readingListStore.completedBooks ||
  []
)

/* Main display */
const currentBooks = computed(() => {
  if (activeTab.value === 'want') {
    return wantToReadList.value
      .map(item => typeof item === 'object' ? item : findBookById(item))
      .filter(Boolean)
  }

  if (activeTab.value === 'read') {
    return readList.value
      .map(item => typeof item === 'object' ? item : findBookById(item))
      .filter(Boolean)
  }

  return favoriteBooks.value
})

/* UI meta */
const tabInfo = computed(() => {
  const favCount = favoriteBooks.value.length
  const wantCount = wantToReadList.value.length
  const readCount = readList.value.length

  const data = {
    favorites: {
      title: favCount ? 'Your Library' : 'No Favorites Yet',
      main: favCount ? 'Saved Books ❤️' : 'Start building your collection',
      sub: favCount
        ? `You have ${favCount} saved books`
        : 'Save books you love to see them here',
      icon: '❤️'
    },
    want: {
      title: wantCount ? 'Reading Plan' : 'Empty Wishlist',
      main: wantCount ? 'Up Next 📚' : 'Nothing planned yet',
      sub: wantCount
        ? `${wantCount} books waiting`
        : 'Add books you want to read',
      icon: '🔖'
    },
    read: {
      title: readCount ? 'Completed Journey' : 'No Progress Yet',
      main: readCount ? 'Finished Books 🎓' : 'Start reading something',
      sub: readCount
        ? `You finished ${readCount} books`
        : 'Mark books as read to track progress',
      icon: '✅'
    }
  }

  return data[activeTab.value]
})
</script>

<template>
  <div class="favorites-page-container">
    <div class="favorites-wrapper-flex">

      <!-- LEFT SIDE -->
      <div class="fav-books-section">

        <div class="library-tabs-row">
          <button
            class="tab-pill"
            :class="{ active: activeTab === 'favorites' }"
            @click="activeTab = 'favorites'"
          >
            Favorites ❤️ ({{ favoriteBooks.length }})
          </button>

          <button
            class="tab-pill"
            :class="{ active: activeTab === 'want' }"
            @click="activeTab = 'want'"
          >
            Want to Read 🔖 ({{ wantToReadList.length }})
          </button>

          <button
            class="tab-pill"
            :class="{ active: activeTab === 'read' }"
            @click="activeTab = 'read'"
          >
            Read ✅ ({{ readList.length }})
          </button>
        </div>

        <h2 class="section-main-title">
          {{
            activeTab === 'favorites'
              ? 'Books'
              : activeTab === 'want'
              ? 'Plan to Read'
              : 'Finished Books'
          }}
        </h2>

        <div v-if="currentBooks.length" class="books-grid">
          <BookCard
            v-for="book in currentBooks"
            :key="book.id"
            :book="book"
            :in-library="true"
            :active-tab="activeTab"
          />
        </div>

        <div v-else class="no-books-text">
          No books here yet.
        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="fav-empty-state-section">

        <h2 class="section-main-title">
          {{ tabInfo.title }}
        </h2>

        <div class="empty-state-luxury-box">

          <div class="bookshelf-icon-wrapper">
            <div class="mini-bookshelf">
              <div class="shelf-books">
                <span class="b1"></span>
                <span class="b2">{{ tabInfo.icon }}</span>
                <span class="b3"></span>
              </div>
              <div class="shelf-line"></div>
            </div>
          </div>

          <p class="empty-state-main-text">
            {{ tabInfo.main }}
          </p>

          <p class="empty-state-sub-text">
            {{ tabInfo.sub }}
          </p>

          <button class="explore-btn" @click="router.push('/')">
            Explore Books
          </button>

        </div>
      </div>

    </div>
  </div>
</template>



<style scoped>
.favorites-page-container {
  min-height: 100vh;
  background-color: #f7f4eb !important; 
  margin-top: -75px; 
  padding: 8.5rem 2rem 4rem 2rem; 
  box-sizing: border-box;
  font-family: 'Playfair Display', serif;
}

.favorites-wrapper-flex {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 4rem;
  align-items: flex-start;
}

.fav-books-section {
  flex: 1.6;
}

.fav-empty-state-section {
  flex: 1;
  position: sticky;
  top: 4rem;
}

.library-tabs-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.tab-pill {
  background-color: #ebe5d8;
  border: 1px solid rgba(0, 0, 0, 0.03);
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.88rem;
  font-weight: 500;
  color: #5c4d43;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'Inter', sans-serif;
}

.tab-pill:hover, .tab-pill.active {
  background-color: #321f18;
  color: #f7f4eb;
}

.section-main-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #3c2a21;
  margin-bottom: 2rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2.5rem;
}

.empty-state-luxury-box {
  background-color: #ebe5d8;
  border-radius: 24px;
  padding: 3.5rem 2rem;
  text-align: center;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.01);
}

.bookshelf-icon-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.mini-bookshelf {
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shelf-books {
  display: flex;
  align-items: flex-end;
  gap: 4px;
}

.shelf-books .b1 { width: 10px; height: 35px; background-color: #a0b2a6; border-radius: 3px 3px 0 0; }
.shelf-books .b2 { width: 14px; height: 42px; background-color: #d98880; border-radius: 3px 3px 0 0; display: flex; align-items: center; justify-content: center; font-size: 8px; color: white; }
.shelf-books .b3 { width: 12px; height: 38px; background-color: #e5c387; border-radius: 3px 3px 0 0; transform: rotate(5deg); transform-origin: bottom right; }

.shelf-line {
  width: 100%;
  height: 4px;
  background-color: #8e7a6b;
  border-radius: 2px;
  margin-top: -1px;
}

.empty-state-main-text {
  font-size: 1.35rem;
  font-weight: 600;
  color: #3c2a21;
  margin: 0 0 0.5rem 0;
}

.empty-state-sub-text {
  font-size: 0.95rem;
  color: #7f6e62;
  margin: 0 0 2rem 0;
}

.explore-btn {
  background-color: #321f18;
  color: #f7f4eb;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.explore-btn:hover {
  transform: scale(1.05);
}

.no-books-text {
  padding: 3rem;
  color: #7f6e62;
  font-style: italic;
  font-size: 1.1rem;
}

@media (max-width: 992px) {
  .favorites-wrapper-flex { flex-direction: column; gap: 3rem; }
  .fav-empty-state-section { position: static; width: 100%; }
}
</style>