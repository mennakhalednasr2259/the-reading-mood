import { defineStore } from 'pinia'
import { ref } from 'vue'
import initialBooks from '../data/books.json'

export const useReadingListStore = defineStore('readingList', () => {
  
  const books = ref(initialBooks)

  const readBooks = ref(JSON.parse(localStorage.getItem('user-read-books')) || [])
  const wantToRead = ref(JSON.parse(localStorage.getItem('user-want-to-read')) || [])

  const addBook = (newBook) => {
    books.value.push(newBook)
  }

  const removeBook = (bookId) => {
    books.value = books.value.filter(book => book.id !== bookId)
  }

  const toggleWantToRead = (bookId) => {
    const index = wantToRead.value.indexOf(bookId)
    if (index > -1) {
      wantToRead.value.splice(index, 1)
    } else {
      wantToRead.value.push(bookId)
      removeFromRead(bookId)
    }
    localStorage.setItem('user-want-to-read', JSON.stringify(wantToRead.value))
  }

  const toggleRead = (bookId) => {
    const index = readBooks.value.indexOf(bookId)
    if (index > -1) {
      readBooks.value.splice(index, 1)
    } else {
      readBooks.value.push(bookId)
      removeFromWantToRead(bookId)
    }
    localStorage.setItem('user-read-books', JSON.stringify(readBooks.value))
  }

  const removeFromWantToRead = (bookId) => {
    const index = wantToRead.value.indexOf(bookId)
    if (index > -1) {
      wantToRead.value.splice(index, 1)
      localStorage.setItem('user-want-to-read', JSON.stringify(wantToRead.value))
    }
  }

  const removeFromRead = (bookId) => {
    const index = readBooks.value.indexOf(bookId)
    if (index > -1) {
      readBooks.value.splice(index, 1)
      localStorage.setItem('user-read-books', JSON.stringify(readBooks.value))
    }
  }

  return {
    books, 
    readBooks,
    wantToRead,
    addBook, 
    removeBook, 
    toggleWantToRead,
    toggleRead
  }
})