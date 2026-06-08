<template>
  <section class="favorites page">
    <section class="container">
      <h1 class="page-title">Избранные</h1>

      <section v-if="favorites.length" class="favorites__grid">
        <PropertyCardGrid
          v-for="property in paginatedFavorites"
          :key="property.id"
          :property="property"
        />
      </section>

      <section v-else class="favorites__empty">
        <p class="favorites__empty-icon">♡</p>
        <h2>У вас пока нет избранных объектов</h2>
        <p>Добавляйте объекты в избранное, чтобы не потерять их</p>
        <router-link to="/catalog" class="btn-primary">Перейти в каталог</router-link>
      </section>

      <Pagination
        v-if="favorites.length > perPage"
        v-model="currentPage"
        :total-pages="totalPages"
        :last-page-label="134"
      />
    </section>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFavoritesStore } from '../stores/favorites'
import PropertyCardGrid from '../components/property/PropertyCardGrid.vue'
import Pagination from '../components/common/Pagination.vue'

const favoritesStore = useFavoritesStore()
const currentPage = ref(1)
const perPage = 9

const favorites = computed(() => favoritesStore.favorites)
const totalPages = computed(() => Math.max(1, Math.ceil(favorites.value.length / perPage)))

const paginatedFavorites = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return favorites.value.slice(start, start + perPage)
})
</script>

<style scoped>
.page {
  padding: 40px 0 var(--spacing-5xl);
}

.favorites__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.favorites__empty {
  text-align: center;
  padding: 80px 20px;
}

.favorites__empty-icon {
  font-size: 72px;
  color: var(--color-border);
  margin-bottom: 20px;
}

.favorites__empty h2 {
  margin-bottom: 12px;
}

.favorites__empty p {
  color: var(--color-text-muted);
  margin-bottom: 28px;
}

@media (max-width: 1100px) {
  .favorites__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .favorites__grid {
    grid-template-columns: 1fr;
  }
}
</style>
