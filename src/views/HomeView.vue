<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMoodStore } from '../stores/moodStore'
import MoodCard from '../components/MoodCard.vue'

const moodStore = useMoodStore()
const router = useRouter()

onMounted(() => {
  moodStore.selectedMood = null

  document.documentElement.removeAttribute('data-theme')
  document.body?.removeAttribute('data-theme')
})

const moods = [
  {
    id: 'romance',
    name: 'Romance',
    icon: '❤️',
    quote: 'Maybe the right love story finds you at the right time.',
    color: 'rgba(255, 77, 109, 0.15)'
  },
  {
    id: 'cry',
    name: 'Crying Mood',
    icon: '🌧️',
    quote: 'A good story lets you cry it all out.',
    color: 'rgba(59, 130, 246, 0.12)'
  },
  {
    id: 'fantasy',
    name: 'Fantasy Escape',
    icon: '✨',
    quote: 'Get lost in a world far from reality.',
    color: 'rgba(192, 132, 252, 0.15)'
  },
  {
    id: 'dark-academia',
    name: 'Dark Academia',
    icon: '🖤',
    quote: 'Knowledge, mystery, and old books.',
    color: 'rgba(212, 163, 115, 0.15)'
  },
  {
    id: 'comfort',
    name: 'Comfort Reads',
    icon: '🌿',
    quote: 'Sometimes a cozy book is all you need.',
    color: 'rgba(82, 183, 136, 0.15)'
  },
  {
    id: 'mystery',
    name: 'Mystery',
    icon: '🔍',
    quote: 'Unravel the truth hidden in the shadows.',
    color: 'rgba(111, 255, 233, 0.15)'
  }
]

const selectMood = (moodId) => {
  moodStore.setMood(moodId)
  router.push('/books')
}
</script>

<template>
  <div class="home-container">
    <header class="hero-section">
      <h1 class="main-heading">Reading Mood</h1>
      <p class="sub-heading">Pick your mood, and find your next read</p>
      <div class="elegant-divider"></div>
    </header>

    <div class="moods-grid">
      <MoodCard
        v-for="mood in moods"
        :key="mood.id"
        :mood="mood"
        @click="selectMood(mood.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  width: 100%;
  box-sizing: border-box;
}

.hero-section {
  text-align: center;
  margin-bottom: 5rem;
}

.main-heading {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.sub-heading {
  color: #666;
  font-weight: 400;
  letter-spacing: 0.02em;
  font-size: 0.9rem;
}

.elegant-divider {
  width: 40px;
  height: 1px;
  background-color: #d4af37;
  margin: 1.5rem auto 0 auto;
}

.moods-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .moods-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
}

@media (min-width: 1024px) {
  .moods-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 2.5rem 1.2rem;
  }

  .hero-section {
    margin-bottom: 2.5rem;
  }

  .main-heading {
    font-size: 2.2rem;
    line-height: 1.2;
  }

  .sub-heading {
    font-size: 0.8rem;
  }
}
</style>