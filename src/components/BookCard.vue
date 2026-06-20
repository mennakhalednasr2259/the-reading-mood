<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const stars = computed(() => {
  const count = Math.round(props.book.rating || 5)
  return '⭐'.repeat(count)
})

const goToDetails = () => {
  router.push(`/book/${props.book.id}`)
}
</script>

<template>
  <div class="book-card" @click="goToDetails">
    <div class="card-content">
      <div class="cover">
        <img :src="book.cover" :alt="book.title" class="book-cover" />
      </div>

      <div class="details">
        <h3 class="title">{{ book.title }}</h3>
        <p class="book-author">By {{ book.author }}</p>

        <div class="meta">
          <span class="stars">{{ stars }}</span>
          <span class="pages">{{ book.pages }} pages</span>
        </div>

        <p class="book-description">{{ book.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  background-color: var(--bg-card);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.03);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
}

.card-content {
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
}

.cover {
  width: 110px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.3;
}

.book-author {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  margin: 0.2rem 0;
}

.stars {
  letter-spacing: -2px;
}

.pages {
  color: var(--text-muted);
  opacity: 0.8;
}

.book-description {
  font-size: 0.85rem;
  color: var(--text-main);
  opacity: 0.75;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>