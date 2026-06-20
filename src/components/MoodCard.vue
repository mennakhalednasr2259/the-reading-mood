<script setup>
defineProps({
  mood: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="mood-card" :style="{ '--hover-color': mood.color }">
    <div class="icon">{{ mood.icon }}</div>
    <h3 class="title">{{ mood.name }}</h3>
    <p class="quote">"{{ mood.quote }}"</p>
  </div>
</template>

<style scoped>
.mood-card {
  background-color: #ffffff;
  border: 1px solid #eef0f2;
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.quote {
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.5;
  font-style: italic;
}

.mood-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06),
              0 0 15px var(--hover-color);
  border-color: transparent;
}

.mood-card:hover .icon {
  transform: scale(1.15);
}
</style>