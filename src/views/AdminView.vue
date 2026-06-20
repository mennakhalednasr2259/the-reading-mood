<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReadingListStore } from '../stores/readingListStore'

const store = useReadingListStore()
const { books: collection } = storeToRefs(store)

const title = ref('')
const author = ref('')
const mood = ref('romance')
const cover = ref('')
const pages = ref(200)
const quote = ref('')

const addBook = () => {
  if (title.value && author.value) {
    store.addBook({
      id: Date.now(),
      title: title.value,
      author: author.value,
      mood: mood.value,
      pages: Number(pages.value),
      rating: 5.0,
      cover: cover.value || 'https://via.placeholder.com/150',
      description: 'Added via Admin Dashboard.',
      quote: quote.value || 'No quote available.'
    })

    title.value = ''
    author.value = ''
    cover.value = ''
    quote.value = ''
    pages.value = 200
  }
}

const removeBook = (id) => {
  store.removeBook(id)
}
</script>

<template>
  <div class="admin">
    <header class="header">
      <h1 class="title">Admin Dashboard</h1>
      <p class="subtitle">Manage books collection</p>
    </header>

    <div class="grid">
      <section class="card">
        <h2 class="section-title">Add New Book</h2>

        <form @submit.prevent="addBook" class="form">
          <div class="field">
            <label>Book Title</label>
            <input v-model="title" type="text" required />
          </div>

          <div class="field">
            <label>Author</label>
            <input v-model="author" type="text" required />
          </div>

          <div class="field">
            <label>Pages</label>
            <input v-model="pages" type="number" required />
          </div>

          <div class="field">
            <label>Cover URL</label>
            <input v-model="cover" type="text" />
          </div>

          <div class="field">
            <label>Quote</label>
            <input v-model="quote" type="text" />
          </div>

          <div class="field">
            <label>Mood</label>
            <select v-model="mood">
              <option value="romance">Romance</option>
              <option value="mystery">Mystery</option>
              <option value="dark-academia">Dark Academia</option>
              <option value="cry">Cry / Drama</option>
              <option value="fantasy">Fantasy</option>
              <option value="comfort">Comfort</option>
            </select>
          </div>

          <button type="submit" class="btn-primary">
            Add Book
          </button>
        </form>
      </section>

      <section class="card">
        <h2 class="section-title">
          Current Collection ({{ collection?.length || 0 }})
        </h2>

        <div class="table">
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Details</th>
                <th>Mood</th>
                <th class="right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="book in collection" :key="book.id">
                <td>
                  <img :src="book.cover" class="thumb" />
                </td>

                <td>
                  <div class="book-title">{{ book.title }}</div>
                  <div class="book-author">
                    {{ book.author }} ({{ book.pages }} p.)
                  </div>
                </td>

                <td>
                  <span class="badge">{{ book.mood }}</span>
                </td>

                <td class="right">
                  <button @click="removeBook(book.id)" class="btn-delete">
                    Remove
                  </button>
                </td>
              </tr>

              <tr v-if="!collection || collection.length === 0">
                <td colspan="4" class="empty">
                  No books in the collection yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.admin {
  background-color: #f7f4eb;
  min-height: calc(100vh - 75px);
  padding: 2.5rem;
}

.header {
  margin-bottom: 2.5rem;
}

.title {
  font-size: 2.6rem;
  color: #3c2a21;
  font-family: 'Playfair Display', serif;
}

.subtitle {
  font-size: 0.8rem;
  color: #7f6e62;
  letter-spacing: 2px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 2.5rem;
}

.card {
  background-color: #ebe5d8;
  padding: 2.5rem;
  border-radius: 16px;
}

.section-title {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: #3c2a21;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.75rem;
  color: #7f6e62;
  text-transform: uppercase;
}

.field input,
.field select {
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(50, 31, 24, 0.1);
  background: #f7f4eb;
}

.btn-primary {
  background: #321f18;
  color: white;
  padding: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  font-size: 0.75rem;
  color: #7f6e62;
  padding-bottom: 1rem;
}

td {
  padding: 1.2rem 0;
  border-bottom: 1px solid rgba(50, 31, 24, 0.06);
}

.thumb {
  width: 48px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
}

.book-title {
  font-weight: 600;
  color: #3c2a21;
}

.book-author {
  font-size: 0.8rem;
  color: #7f6e62;
}

.badge {
  font-size: 0.7rem;
  background: rgba(127, 110, 98, 0.12);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}

.btn-delete {
  border: 1px solid rgba(214, 40, 40, 0.2);
  color: #d62828;
  background: transparent;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
}

.btn-delete:hover {
  background: #d62828;
  color: white;
}

.right {
  text-align: right;
}

.empty {
  text-align: center;
  color: #7f6e62;
  padding: 2rem 0;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>