<template>
  <article class="card-g" @click="goToProperty">
    <section class="card-g__media">
      <img
        :src="mainImage"
        :alt="`Объект: ${property.address}`"
        loading="lazy"
        decoding="async"
        width="400"
        height="260"
      />
      <span class="card-g__badge">{{ property.title }}</span>
    </section>

    <section class="card-g__thumbs">
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

    <h3 class="card-g__address">{{ property.address }}</h3>

    <section class="card-g__price-row">
      <section class="card-g__price">
        <span class="card-g__price-main">{{ formatPrice(property.price) }} ₽</span>
        <span class="card-g__price-sub">{{ formatPrice(pricePerM) }} ₽/м²</span>
      </section>
      <button
        type="button"
        class="card-g__fav"
        :class="{ 'card-g__fav--active': isFavorite }"
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

    <section class="card-g__tags">
      <span class="card-g__tag">{{ property.area }} кв.м²</span>
      <span v-if="property.view" class="card-g__tag">{{ property.view }}</span>
      <span class="card-g__tag">{{ property.floor }}/{{ property.totalFloors }} эт.</span>
      <span v-for="f in property.features" :key="f" class="card-g__tag">{{ f }}</span>
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
})

const router = useRouter()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()

const mainImage = computed(() => img(houseImages[props.property.id]) || '')
const thumbs = computed(() => [img('room'), img('room_1'), img('room_2'), img('room_3')].filter(Boolean))
const pricePerM = computed(() => Math.round(props.property.price / props.property.area))
const isFavorite = computed(() => favoritesStore.isFavorite(props.property.id))

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
.card-g {
  cursor: pointer;
}

.card-g__media {
  position: relative;
  height: 220px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 10px;
}

.card-g__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-g__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.card-g__thumbs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.card-g__thumbs img {
  width: 56px;
  height: 44px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.card-g__address {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 12px;
  line-height: 1.35;
}

.card-g__price-row {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.card-g__price {
  flex: 1;
  background: var(--color-primary);
  color: var(--color-text-white);
  padding: 10px 16px;
  border-radius: var(--radius-lg);
}

.card-g__price-main {
  display: block;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}

.card-g__price-sub {
  font-size: var(--font-size-xs);
  opacity: 0.75;
}

.card-g__fav {
  width: 48px;
  min-height: 48px;
  border-radius: 50%;
  background: var(--color-bg-muted);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-g__fav--active {
  color: #e11d48;
}

.card-g__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-g__tag {
  padding: 5px 10px;
  background: var(--color-bg-muted);
  border-radius: var(--radius-pill);
  font-size: 11px;
  color: var(--color-text-secondary);
}
</style>
