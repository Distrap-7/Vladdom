<template>
  <section v-if="property" class="property page">
    <section class="container">
      <h1 class="property__page-title">{{ property.title }}, {{ property.address }}</h1>
      <section class="property__top">
        <section class="property__gallery">
          <img
            class="property__main-img"
            :src="activeImage"
            :alt="`Фото объекта: ${property.address}`"
            width="900"
            height="420"
            fetchpriority="high"
            decoding="async"
          />
          <section class="property__thumbs">
            <button
              v-for="(img, i) in images"
              :key="i"
              type="button"
              :class="{ 'property__thumb--active': activeIndex === i }"
              @click="activeIndex = i"
            >
              <img
                :src="img"
                :alt="`Миниатюра ${i + 1}: ${property.address}`"
                width="80"
                height="60"
                loading="lazy"
                decoding="async"
              />
            </button>
          </section>
        </section>

        <aside class="property__sidebar">
          <section class="price-card">
            <section class="price-card__head">
              <span class="price-card__price">{{ formatPrice(property.price) }} ₽</span>
              <button
                type="button"
                class="price-card__fav"
                :class="{ 'price-card__fav--on': isFavorite }"
                @click="toggleFavorite"
              >
                ♥
              </button>
            </section>
            <select class="price-card__select">
              <option>Стандартная ипотека</option>
              <option>Семейная ипотека</option>
            </select>
            <ul class="price-card__meta">
              <li>
                <span>Цена за м²</span>
                <strong>{{ formatPrice(pricePerM) }} ₽</strong>
              </li>
              <li>
                <span>Этаж</span>
                <strong>{{ property.floor }} из {{ property.totalFloors }}</strong>
              </li>
              <li>
                <span>Тип дома</span>
                <strong>Монолитный</strong>
              </li>
            </ul>
            <button type="button" class="btn-primary btn-primary--wide">Купить</button>
            <section class="price-card__agent">
              <img :src="agentPhoto" alt="Риелтор Дмитрий — VladDom" width="48" height="48" loading="lazy" />
              <section>
                <strong>Дмитрий</strong>
                <a href="tel:+79644360300">Связаться</a>
              </section>
            </section>
          </section>
        </aside>
      </section>

      <section class="property__stats">
        <article v-for="s in quickStats" :key="s.label">
          <span class="property__stat-icon">◆</span>
          <section>
            <span>{{ s.label }}</span>
            <strong>{{ s.value }}</strong>
          </section>
        </article>
      </section>

      <section class="property__block">
        <h2>Юридические аспекты</h2>
        <ul>
          <li>Собственность оформлена, обременений нет</li>
          <li>Один собственник, сделка возможна в ипотеку</li>
          <li>Полный пакет документов для банка и Росреестра</li>
        </ul>
      </section>

      <section class="property__block property__details">
        <h2>О квартире</h2>
        <section class="property__cols">
          <section>
            <h3>О квартире</h3>
            <dl>
              <dt>Площадь</dt>
              <dd>{{ property.area }} м²</dd>
              <dt>Комнат</dt>
              <dd>{{ property.rooms }}</dd>
              <dt>Площадь кухни</dt>
              <dd>{{ property.kitchenArea }} м²</dd>
              <dt>Ремонт</dt>
              <dd>Евро</dd>
            </dl>
          </section>
          <section>
            <h3>О доме</h3>
            <dl>
              <dt>Год постройки</dt>
              <dd>{{ property.yearBuilt }}</dd>
              <dt>Этажность</dt>
              <dd>{{ property.totalFloors }}</dd>
              <dt>Парковка</dt>
              <dd>Подземная</dd>
              <dt>Лифты</dt>
              <dd>2 пассажирских</dd>
            </dl>
          </section>
        </section>
      </section>

      <section class="property__map">
        <iframe
          title="Расположение"
          src="https://www.openstreetmap.org/export/embed.html?bbox=131.88%2C43.10%2C131.95%2C43.14&layer=mapnik&marker=43.115%2C131.911"
          loading="lazy"
        />
      </section>

      <section class="property__mortgage">
        <h2>Ипотечный калькулятор</h2>
        <section class="mortgage__form">
          <label>
            <span>Стоимость недвижимости</span>
            <input v-model="mortgage.price" type="text" />
          </label>
          <label>
            <span>Первый взнос</span>
            <input v-model="mortgage.down" type="text" />
            <section class="mortgage__chips">
              <button
                v-for="p in [10, 15, 20, 30]"
                :key="p"
                type="button"
                @click="setDownPercent(p)"
              >
                {{ p }}%
              </button>
            </section>
          </label>
          <label>
            <span>Срок кредита (лет)</span>
            <section class="mortgage__term">
              <input
                v-model.number="mortgage.years"
                type="range"
                min="5"
                max="30"
                step="1"
              />
              <span class="mortgage__years">{{ mortgageYears }}</span>
            </section>
          </label>
        </section>
        <section class="mortgage__banks">
          <article v-for="bank in banks" :key="bank.name" class="bank-row">
            <span class="bank-row__logo">
              <img v-if="bank.logo" :src="bank.logo" :alt="bank.name" />
              <span v-else>{{ bank.short }}</span>
            </span>
            <span>{{ bank.name }}</span>
            <strong>{{ bank.rate }}%</strong>
            <span>{{ formatPrice(bank.payment) }} ₽/мес</span>
          </article>
        </section>
        <router-link to="/request" class="btn-primary btn-primary--wide mortgage__cta">
          Оставить заявку
        </router-link>
      </section>

      <section class="property__similar">
        <section class="similar__tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            :class="{ 'similar__tab--active': activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </section>
        <section class="similar__grid">
          <PropertyCardGrid
            v-for="p in similarProperties"
            :key="p.id"
            :property="p"
          />
        </section>
        <router-link to="/catalog" class="btn-primary similar__more">Показать еще</router-link>
      </section>
    </section>
  </section>

  <section v-else class="property-not-found container">
    <h1>Объект не найден</h1>
    <router-link to="/catalog">Вернуться в каталог</router-link>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePropertiesStore } from '../stores/properties'
import { useFavoritesStore } from '../stores/favorites'
import { useAuthStore } from '../stores/auth'
import { getPropertyImages, img, imgAny } from '../utils/images'
import { applyRouteSeo, buildPropertySeo } from '../utils/seo'

const agentPhoto = imgAny('nodirbek', 'dmitry', 'team', 'avatar') || ''
import PropertyCardGrid from '../components/property/PropertyCardGrid.vue'

const route = useRoute()
const router = useRouter()
const propertiesStore = usePropertiesStore()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()

const activeIndex = ref(0)
const activeTab = ref('Рекомендации')
const tabs = ['Рекомендации', 'Новостройки', 'Вторичка']

const mortgage = ref({
  price: '18500000',
  down: '3700000',
  years: 20,
})

const property = computed(() => propertiesStore.getPropertyById(route.params.id))
const images = computed(() => (property.value ? getPropertyImages(property.value) : []))
const activeImage = computed(() => images.value[activeIndex.value] || images.value[0])
const pricePerM = computed(() =>
  property.value ? Math.round(property.value.price / property.value.area) : 0
)
const isFavorite = computed(() =>
  property.value ? favoritesStore.isFavorite(property.value.id) : false
)

const quickStats = computed(() => {
  if (!property.value) return []
  return [
    { label: 'Общая площадь', value: `${property.value.area} м²` },
    { label: 'Площадь кухни', value: `${property.value.kitchenArea} м²` },
    {
      label: 'Этаж',
      value: `${property.value.floor} из ${property.value.totalFloors}`,
    },
    { label: 'Год постройки', value: String(property.value.yearBuilt) },
  ]
})

const similarProperties = computed(() =>
  propertiesStore.properties.filter((p) => p.id !== property.value?.id).slice(0, 3)
)

const mortgageYears = computed(() => {
  const years = Number(mortgage.value.years)
  const value = Number.isFinite(years) ? Math.min(30, Math.max(5, Math.round(years))) : 20
  return `${value} лет`
})

const banks = computed(() => {
  const loan = parseInt(mortgage.value.price, 10) - parseInt(mortgage.value.down || 0, 10)
  const base = Math.max(loan, 0)
  const years = Number(mortgage.value.years) || 20

  return [
    {
      name: 'Совкомбанк',
      short: 'СК',
      logo: img('sovkom'),
      rate: 12.9,
      payment: calcMonthlyPayment(base, 12.9, years),
    },
    {
      name: 'Альфа-Банк',
      short: 'АБ',
      logo: img('alfa'),
      rate: 13.2,
      payment: calcMonthlyPayment(base, 13.2, years),
    },
    {
      name: 'ВТБ',
      short: 'ВТБ',
      logo: img('vtb'),
      rate: 12.5,
      payment: calcMonthlyPayment(base, 12.5, years),
    },
  ]
})

watch(
  () => route.params.id,
  () => {
    activeIndex.value = 0
    if (property.value) {
      applyRouteSeo(route, buildPropertySeo(property.value))
    }
  }
)

watch(property, (p) => {
  if (p) {
    mortgage.value.price = String(p.price)
    applyRouteSeo(route, buildPropertySeo(p))
  }
})

function calcMonthlyPayment(loan, annualRatePercent, years) {
  const months = Math.max(1, Math.round(Number(years) || 1) * 12)
  if (loan <= 0) return 0

  const monthlyRate = annualRatePercent / 100 / 12
  if (monthlyRate <= 0) return Math.round(loan / months)

  const factor = Math.pow(1 + monthlyRate, months)
  return Math.round((loan * monthlyRate * factor) / (factor - 1))
}

function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price)
}

function toggleFavorite() {
  if (!authStore.user) {
    router.push('/auth')
    return
  }
  if (property.value) favoritesStore.toggleFavorite(property.value)
}

function setDownPercent(p) {
  const price = parseInt(mortgage.value.price) || 0
  mortgage.value.down = String(Math.round((price * p) / 100))
}
</script>

<style scoped>
.page {
  padding: 32px 0 var(--spacing-5xl);
}

.property__page-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: 1.3;
  margin-bottom: 24px;
}

.property__top {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
  margin-bottom: 40px;
}

.property__main-img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: var(--radius-xl);
}

.property__thumbs {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.property__thumbs button {
  padding: 0;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  overflow: hidden;
  width: 72px;
  height: 56px;
}

.property__thumb--active {
  border-color: var(--color-primary) !important;
}

.property__thumbs img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 100px;
}

.price-card__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.price-card__price {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.price-card__fav {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-bg-muted);
  font-size: 20px;
  color: var(--color-text-muted);
}

.price-card__fav--on {
  color: #e11d48;
}

.price-card__select {
  width: 100%;
  padding: 12px;
  background: var(--color-bg-muted);
  border: none;
  border-radius: var(--radius-md);
  margin-bottom: 16px;
  font-size: var(--font-size-sm);
}

.price-card__meta {
  list-style: none;
  margin-bottom: 20px;
}

.price-card__meta li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: var(--font-size-sm);
}

.price-card__meta span {
  color: var(--color-text-muted);
}

.price-card__agent {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border-light);
}

.price-card__agent img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.price-card__agent a {
  font-size: var(--font-size-sm);
  color: var(--color-accent);
}

.property__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 48px;
  padding: 24px 0;
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
}

.property__stats article {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.property__stat-icon {
  color: var(--color-text-muted);
  font-size: 12px;
  margin-top: 4px;
}

.property__stats span {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.property__block {
  margin-bottom: 48px;
}

.property__block h2 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 20px;
}

.property__block ul {
  padding-left: 20px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.property__cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.property__cols h3 {
  font-size: var(--font-size-base);
  margin-bottom: 16px;
}

.property__cols dl {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px 24px;
  font-size: var(--font-size-sm);
}

.property__cols dt {
  color: var(--color-text-muted);
}

.property__map {
  height: 360px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 48px;
}

.property__map iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.property__mortgage {
  margin-bottom: 56px;
}

.property__mortgage h2 {
  margin-bottom: 24px;
}

.mortgage__form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.mortgage__form label span {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.mortgage__form input[type='text'] {
  width: 100%;
  padding: 12px;
  background: var(--color-bg-muted);
  border: none;
  border-radius: var(--radius-md);
}

.mortgage__chips {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.mortgage__chips button {
  padding: 6px 12px;
  background: var(--color-bg-muted);
  border-radius: var(--radius-pill);
  font-size: 12px;
}

.mortgage__term {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 44px;
}

.mortgage__term input[type='range'] {
  flex: 1;
  width: 100%;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.mortgage__years {
  flex-shrink: 0;
  min-width: 56px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-align: right;
}

.mortgage__banks {
  margin-bottom: 24px;
}

.bank-row {
  display: grid;
  grid-template-columns: 48px 1fr auto auto;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: var(--font-size-sm);
}

.bank-row__logo {
  width: 48px;
  height: 48px;
  background: var(--color-bg-muted);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: var(--font-weight-bold);
}

.bank-row__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.similar__tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.similar__tabs button {
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  background: var(--color-bg-muted);
  font-size: var(--font-size-sm);
}

.similar__tab--active {
  background: var(--color-primary) !important;
  color: white;
}

.similar__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.similar__more {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
}

.property-not-found {
  padding: 80px 20px;
  text-align: center;
}

@media (max-width: 1100px) {
  .property__top {
    grid-template-columns: 1fr;
  }

  .price-card {
    position: static;
  }

  .property__stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .mortgage__form {
    grid-template-columns: 1fr;
  }

  .similar__grid {
    grid-template-columns: 1fr;
  }
}
</style>
