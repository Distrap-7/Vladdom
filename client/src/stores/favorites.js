import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

  // Load from localStorage on init
  const stored = localStorage.getItem('vladom-favorites')
  if (stored) {
    try {
      favorites.value = JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse favorites', e)
    }
  }

  // Watch and save to localStorage
  watch(favorites, (newVal) => {
    localStorage.setItem('vladom-favorites', JSON.stringify(newVal))
  }, { deep: true })

  function addFavorite(property) {
    if (!isFavorite(property.id)) {
      favorites.value.push(property)
    }
  }

  function removeFavorite(propertyId) {
    const index = favorites.value.findIndex(p => p.id === propertyId)
    if (index !== -1) {
      favorites.value.splice(index, 1)
    }
  }

  function isFavorite(propertyId) {
    return favorites.value.some(p => p.id === propertyId)
  }

  function toggleFavorite(property) {
    if (isFavorite(property.id)) {
      removeFavorite(property.id)
    } else {
      addFavorite(property)
    }
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  }
})