<template>
  <section class="catalog page">
    <section class="container">
      <h1 class="page-title">Каталог недвижимости Владивостока</h1>
      <section class="catalog__layout">
        <PropertyFilters extended @apply="applyFilters" />
        <section class="catalog__main">
          <PropertyCardHorizontal
            v-for="property in paginatedItems"
            :key="property.id"
            :property="property"
          />
          <p v-if="!paginatedItems.length" class="catalog__empty">
            По вашему запросу ничего не найдено. Измените фильтры.
          </p>
          <Pagination
            v-if="totalPages > 1"
            v-model="currentPage"
            :total-pages="totalPages"
            :last-page-label="134"
          />
        </section>
      </section>
    </section>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePropertiesStore } from '../stores/properties'
import PropertyFilters from '../components/common/PropertyFilters.vue'
import PropertyCardHorizontal from '../components/property/PropertyCardHorizontal.vue'
import Pagination from '../components/common/Pagination.vue'

const propertiesStore = usePropertiesStore()
const currentPage = ref(1)
const perPage = 6

const filtered = computed(() => propertiesStore.filteredProperties)
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

function applyFilters() {
  currentPage.value = 1
}
</script>

<style scoped>
.page {
  padding: 40px 0 var(--spacing-5xl);
}

.catalog__layout {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.catalog__main {
  flex: 1;
  min-width: 0;
}

.catalog__empty {
  text-align: center;
  padding: 48px 20px;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .catalog__layout {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .catalog.page {
    padding-top: 24px;
  }
}
</style>
