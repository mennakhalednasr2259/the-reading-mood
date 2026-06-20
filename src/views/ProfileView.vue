<script setup>
import { computed, onMounted } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useReadingListStore } from '../stores/readingListStore'
import { useMoodStore } from '../stores/moodStore'
import { useRouter } from 'vue-router'

import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'

import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
)

const favoritesStore = useFavoritesStore()
const readingListStore = useReadingListStore()
const moodStore = useMoodStore()
const router = useRouter()

onMounted(() => {
  document.body.removeAttribute('data-theme')
})


const favCount = computed(() => favoritesStore?.favorites?.length || 0)

const wantCount = computed(() =>
  (readingListStore?.wantToRead || readingListStore?.want || []).length
)

const readCount = computed(() =>
  (readingListStore?.readBooks ||
    readingListStore?.read ||
    readingListStore?.completedBooks ||
    []).length
)

const totalBooksInLibrary = computed(
  () => favCount.value + wantCount.value + readCount.value
)


const userTitle = computed(() => {
  if (readCount.value >= 10) return 'Sovereign Scholar 🎓'
  if (readCount.value >= 5) return 'Elegant Reader 📚'
  if (readCount.value > 0) return 'Curious Mind ✨'
  return 'Aesthetic Wanderer ☕'
})


const statusChartData = computed(() => ({
  labels: ['Favorites', 'Want to Read', 'Read Completed'],
  datasets: [
    {
      data: [favCount.value, wantCount.value, readCount.value],
      backgroundColor: ['#a88c74', '#d9c4ba', '#8e9b8e'],
      borderColor: '#f7f4eb',
      borderWidth: 2,
      hoverOffset: 4
    }
  ]
}))


const moodChartData = computed(() => {
  const moodCounts = {}

  const favs = favoritesStore?.favorites || []

  favs.forEach(book => {
    const mood = book?.mood || 'General'
    moodCounts[mood] = (moodCounts[mood] || 0) + 1
  })

  const labels = Object.keys(moodCounts)
  const values = Object.values(moodCounts)

  return {
    labels: labels.length ? labels : ['Romance', 'Productivity', 'Calm'],
    datasets: [
      {
        label: 'Books by Mood',
        data: values.length ? values : [0, 0, 0],
        backgroundColor: '#321f18',
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  }
})


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: { family: "'Inter', sans-serif", size: 12 },
        color: '#5c4d43'
      }
    }
  }
}
</script>

<template>
  <div class="profile-page-container">
    <div class="profile-wrapper-max">

      <div class="user-hero-card">
        <div class="avatar-wrapper"></div>

        <div class="user-info-text">
          <span class="user-badge">{{ userTitle }}</span>

          <h1 class="profile-name">
            {{ authStore.user?.name || 'Mennatallah' }}
          </h1>

          <div class="luxury-avatar">
            {{
              authStore.user?.name
                ? authStore.user.name.charAt(0).toUpperCase()
                : 'M'
            }}
          </div>

          <p class="profile-bio">
            "Reading is a conversation. All books talk. But a good book listens as well."
          </p>
        </div>
      </div>

      <div class="stats-counter-row">
        <div class="stat-box">
          <span class="stat-num">{{ favCount }}</span>
          <span class="stat-label">Favorites ❤️</span>
        </div>

        <div class="stat-box">
          <span class="stat-num">{{ wantCount }}</span>
          <span class="stat-label">Plan to Read 🔖</span>
        </div>

        <div class="stat-box">
          <span class="stat-num">{{ readCount }}</span>
          <span class="stat-label">Finished ✅</span>
        </div>

        <div class="stat-box highlight-box">
          <span class="stat-num">{{ totalBooksInLibrary }}</span>
          <span class="stat-label">Total Collection 🏛️</span>
        </div>
      </div>

      <div class="charts-flex-grid">

        <div class="chart-luxury-card">
          <h3 class="chart-title">Library Distribution</h3>
          <p class="chart-subtitle">How your reading lists are balanced</p>

          <div class="chart-render-holder">
            <Doughnut :data="statusChartData" :options="chartOptions" />
          </div>
        </div>

        <div class="chart-luxury-card">
          <h3 class="chart-title">Reading Mood Analytics</h3>
          <p class="chart-subtitle">Your favorite genres & moods</p>

          <div class="chart-render-holder">
            <Bar :data="moodChartData" :options="chartOptions" />
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* نفس الاستايل بدون أي تغيير */
.profile-page-container {
  min-height: 100vh;
  background-color: #f7f4eb !important;
  margin-top: -75px;
  padding: 8.5rem 2rem 4rem 2rem;
  box-sizing: border-box;
  font-family: 'Playfair Display', serif;
}

.profile-wrapper-max {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.user-hero-card {
  background-color: #ebe5d8;
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  gap: 2.5rem;
  align-items: center;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.01);
}

.luxury-avatar {
  width: 100px;
  height: 100px;
  background-color: #321f18;
  color: #f7f4eb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 8px 20px rgba(50, 31, 24, 0.15);
}

.user-info-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.user-badge {
  background-color: #321f18;
  color: #f7f4eb;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3c2a21;
}

.profile-bio {
  font-size: 1rem;
  color: #7f6e62;
  font-style: italic;
  max-width: 600px;
  line-height: 1.5;
}

.stats-counter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-box {
  background-color: #ebe5d8;
  border-radius: 16px;
  padding: 1.8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: transform 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-4px);
}

.stat-box.highlight-box {
  background-color: #321f18;
}

.stat-box.highlight-box .stat-num,
.stat-box.highlight-box .stat-label {
  color: #f7f4eb;
}

.stat-num {
  font-size: 2.2rem;
  font-weight: 700;
  color: #3c2a21;
  font-family: 'Inter', sans-serif;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f6e62;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.charts-flex-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2.5rem;
}

.chart-luxury-card {
  background-color: #ebe5d8;
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
}

.chart-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #3c2a21;
  margin-bottom: 0.2rem;
}

.chart-subtitle {
  font-size: 0.88rem;
  color: #7f6e62;
  margin-bottom: 2rem;
  font-family: 'Inter', sans-serif;
}

.chart-render-holder {
  position: relative;
  height: 280px;
  width: 100%;
}

@media (max-width: 768px) {
  .user-hero-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .user-info-text {
    align-items: center;
  }

  .charts-flex-grid {
    grid-template-columns: 1fr;
  }
}
</style>