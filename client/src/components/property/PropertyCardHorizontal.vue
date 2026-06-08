<template>
  <article class="card-h" @click="goToProperty">
    <section class="card-h__media">
      <img
        v-if="mainImage"
        :src="mainImage"
        :alt="`Объект: ${property.address}`"
        loading="lazy"
        decoding="async"
        width="340"
        height="220"
      />
      <span v-else class="card-h__placeholder">Фото</span>
      <span class="card-h__badge">{{ property.title }}</span>
    </section>

    <section class="card-h__body">
      <h3 class="card-h__title">
        <template v-if="property.buildingName">{{ buildingPrefix }}«{{ property.buildingName }}» </template>
        {{ property.address }}
      </h3>

      <section class="card-h__price-row">
        <section class="card-h__price">
          <span class="card-h__price-main">{{ formatPrice(property.price) }} ₽</span>
          <span class="card-h__price-sub">{{ formatPrice(pricePerM) }} ₽/м²</span>
        </section>
        <button
          type="button"
          class="card-h__fav"
          :class="{ 'card-h__fav--active': isFavorite }"
          @click.stop="toggleFavorite"
          aria-label="В избранное"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              :fill="isFavorite ? 'currentColor' : 'none'"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
        </button>
      </section>

      <section v-if="showStats" class="card-h__stats">
        <span>Этаж {{ property.floor }}/{{ property.totalFloors }}</span>
        <span>Общая площадь {{ property.area }} м²</span>
        <span v-if="property.completionDate">Срок сдачи {{ property.completionDate }}</span>
      </section>

      <section class="card-h__tags">
        <span class="card-h__tag">{{ property.area }} кв.м²</span>
        <span v-if="property.view" class="card-h__tag">{{ property.view }}</span>
        <span class="card-h__tag">{{ property.floor }}/{{ property.totalFloors }} эт.</span>
        <span v-for="f in property.features" :key="f" class="card-h__tag">{{ f }}</span>
      </section>

      <section class="card-h__thumbs">
        <img
          v-for="(thumb, i) in thumbs"
          :key="i"
          :src="thumb"
          :alt="`Фото ${i + 1} — ${property.address}`"
          loading="lazy"
          width="64"
          height="48"
        />
      </section>
    </section>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '../../stores/favorites'
import { useAuthStore } from '../../stores/auth'
import { img } from '../../utils/images'
import { houseImages } from '../../stores/properties'

const props = defineProps({
  property: { type: Object, required: true },
  showStats: { type: Boolean, default: false },
})

const router = useRouter()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()

const mainImage = computed(() => img(houseImages[props.property.id]) || '')
const thumbs = computed(() => [img('room'), img('room_1'), img('room_2'), img('room_3')].filter(Boolean))
const pricePerM = computed(() => Math.round(props.property.price / props.property.area))
const isFavorite = computed(() => favoritesStore.isFavorite(props.property.id))

const buildingPrefix = computed(() => {
  if (props.property.type === 'house') return 'Коттедж '
  if (props.property.type === 'townhouse') return 'Таунхаус '
  return 'ЖК '
})

function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price)
}

function goToProperty() {
  router.push(`/property/${props.property.id}`)
}

function toggleFavorite() {
  if (!authStore.user) {
    router.push('/auth')
    return
  }
  favoritesStore.toggleFavorite(props.property)
}
</script>

<style scoped>
.card-h {
  display: flex;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.card-h:hover {
  opacity: 0.92;
}

.card-h__media {
  position: relative;
  width: 340px;
  min-width: 280px;
  height: 220px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  flex-shrink: 0;
}

.card-h__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-h__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-muted);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.card-h__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.card-h__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-h__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: 1.3;
}

.card-h__price-row {
  display: flex;
  align-items: stretch;
  gap: 12px;
}

.card-h__price {
  flex: 1;
  background: var(--color-primary);
  color: var(--color-text-white);
  padding: 12px 20px;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-h__price-main {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.card-h__price-sub {
  font-size: var(--font-size-xs);
  opacity: 0.75;
  margin-top: 2px;
}

.card-h__fav {
  width: 52px;
  height: auto;
  min-height: 52px;
  border-radius: 50%;
  background: var(--color-bg-muted);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-h__fav--active {
  color: #e11d48;
}

.card-h__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.card-h__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-h__tag {
  padding: 6px 12px;
  background: var(--color-bg-muted);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.card-h__thumbs {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.card-h__thumbs img {
  width: 64px;
  height: 48px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

@media (max-width: 900px) {
  .card-h {
    flex-direction: column;
  }

  .card-h__media {
    width: 100%;
    height: 200px;
  }
}
</style>
