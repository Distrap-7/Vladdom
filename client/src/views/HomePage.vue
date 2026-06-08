<template>
  <section class="home">
    <section class="hero">
      <img
        class="hero__bg"
        :src="HERO_IMAGE"
        alt="Панорама Владивостока — недвижимость VladDom"
        fetchpriority="high"
        decoding="async"
        width="1920"
        height="1080"
      />
      <section class="hero__overlay" />
      <section class="hero__fade" />
      <section class="hero__content container">
        <h1 class="hero__title">Недвижимость Владивостока №1</h1>
        <p class="hero__subtitle">
          Подберём квартиру, апартаменты или дом под ваши цели — для жизни, инвестиций и отдыха
        </p>
        <router-link to="/catalog" class="hero__btn">Подобрать жильё</router-link>
      </section>
    </section>

    <section class="listings section">
      <section class="container">
        <h2 class="section__title">Жильё для жизни, инвестиций и отдыха</h2>
        <section class="listings__layout">
          <PropertyFilters :show-mode="true" />
          <section class="listings__results">
            <PropertyCardHorizontal
              v-for="property in previewProperties"
              :key="property.id"
              :property="property"
              show-stats
            />
            <router-link to="/catalog" class="listings__more btn-primary">
              Показать еще
            </router-link>
          </section>
        </section>
      </section>
    </section>

    <section class="why section">
      <img
        class="why__bg"
        :src="BUILDING_IMAGE"
        alt="Жилые комплексы Владивостока"
        loading="lazy"
        decoding="async"
      />
      <section class="why__overlay" />
      <section class="container why__inner">
        <h2 class="why__title">Надёжный сервис<br />для поиска жилья</h2>
        <section class="why__cards">
          <article v-for="item in whyItems" :key="item.title" class="why__card">
            <span class="why__icon">
              <img :src="item.icon" :alt="item.title" />
            </span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </section>
      </section>
    </section>

    <section class="process section">
      <section class="container">
        <h2 class="section__title section__title--narrow">
          Узнайте, как проходит процесс подбора недвижимости — от первого запроса до получения ключей без лишних сложностей
        </h2>
        <section class="process__grid">
          <article v-for="step in processSteps" :key="step.title" class="process__item">
            <img
              class="process__bg"
              :src="step.image"
              :alt="`Этап подбора недвижимости: ${step.title}`"
              loading="lazy"
              decoding="async"
            />
            <section class="process__card">
              <span class="process__icon" aria-hidden="true">
                <component :is="step.icon" />
              </span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </section>
          </article>
        </section>
      </section>
    </section>

    <section class="team section">
      <section class="container team__layout">
        <section class="team__quote">
          <transition name="fade" mode="out-in">
            <p :key="currentIndex" class="team__text">
              {{ agents[currentIndex].quote }}
            </p>
          </transition>
          <transition name="fade" mode="out-in">
            <section :key="currentIndex" class="team__author">
              <img
                :src="agents[currentIndex].avatar"
                :alt="`Фото специалиста ${agents[currentIndex].name}`"
                class="team__avatar"
                loading="lazy"
                width="56"
                height="56"
              />
              <section>
                <strong>{{ agents[currentIndex].name }}</strong>
                <span>{{ agents[currentIndex].role }}</span>
              </section>
            </section>
          </transition>
          <section class="team__nav">
            <button type="button" aria-label="Назад" @click="prevAgent">←</button>
            <button type="button" aria-label="Вперёд" @click="nextAgent">→</button>
          </section>
        </section>
        <img
          class="team__photo"
          :src="INTERIOR_IMAGE"
          alt="Интерьер квартиры во Владивостоке"
          loading="lazy"
          decoding="async"
          width="800"
          height="420"
        />
      </section>
    </section>

    <section class="home-news section">
      <section class="container">
        <p class="home-news__label">Новости и статьи</p>
        <h2 class="home-news__title">Актуальная информация о рынке недвижимости</h2>
        <section class="home-news__grid">
          <article v-for="item in newsPreview" :key="item.id" class="home-news__card">
            <section class="home-news__media">
              <img
                :src="item.image"
                :alt="`Иллюстрация: ${item.title}`"
                loading="lazy"
                decoding="async"
                width="400"
                height="220"
              />
              <span class="home-news__tag">{{ item.tag }}</span>
            </section>
            <section class="home-news__body">
              <section class="home-news__headline">
                <h3>{{ item.title }}</h3>
                <span class="home-news__read">{{ item.readTime }}</span>
              </section>
              <p>{{ item.excerpt }}</p>
              <section class="home-news__meta">
                <img :src="item.authorAvatar" :alt="`Автор: ${item.author}`" loading="lazy" width="40" height="40" />
                <section>
                  <span>{{ item.author }}</span>
                  <time>{{ item.date }}</time>
                </section>
              </section>
            </section>
          </article>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePropertiesStore } from '../stores/properties'
import PropertyFilters from '../components/common/PropertyFilters.vue'
import PropertyCardHorizontal from '../components/property/PropertyCardHorizontal.vue'
import {
  HERO_IMAGE,
  BUILDING_IMAGE,
  INTERIOR_IMAGE,
  img,
  imgAny,
} from '../utils/images'
import IconRequest from '../components/icons/IconRequest.vue'
import IconSearch from '../components/icons/IconSearch.vue'
import IconViewing from '../components/icons/IconViewing.vue'
import IconDeal from '../components/icons/IconDeal.vue'
import shieldIcon from '../assets/icons/shield.svg'
import homeIcon from '../assets/icons/home.svg'
import mapIcon from '../assets/icons/map.svg'

const teamAvatarFirst = imgAny('nodirbek')

const teamAvatarSecond = imgAny('vladimir')

const propertiesStore = usePropertiesStore()

const previewProperties = computed(() => propertiesStore.filteredProperties.slice(0, 3))

const whyItems = [
  {
    title: 'Проверенные объекты',
    icon: shieldIcon,
    text: 'Юридическая проверка и актуальные данные по каждому объекту в каталоге.',
  },
  {
    title: 'Ипотека и сделка',
    icon: homeIcon,
    text: 'Поможем с одобрением ипотеки и сопровождением на всех этапах покупки.',
  },
  {
    title: 'Локальная экспертиза',
    icon: mapIcon,
    text: 'Знаем районы Владивостока и подберём жильё под ваш образ жизни.',
  },
]

const currentIndex = ref(0)

const agents = [
  {
    name: 'Дмитрий Соколов',
    role: 'Специалист',
    avatar: teamAvatarFirst,
    quote: '«Мы не просто показываем объявления — сопровождаем сделку от подбора до ключей, проверяем юридическую чистоту и помогаем с ипотекой.»',
  },
  {
    name: 'Владимир Иванов',
    role: 'Консультант',
    avatar: teamAvatarSecond,
    quote: '«Знаю рынок Владивостока более 10 лет. Помогу разобраться во всех нюансах и сделаю процесс покупки максимально комфортным.»',
  },
]

function prevAgent() {
  currentIndex.value = currentIndex.value === 0 ? agents.length - 1 : currentIndex.value - 1
}

function nextAgent() {
  currentIndex.value = currentIndex.value === agents.length - 1 ? 0 : currentIndex.value + 1
}

const processSteps = [
  {
    title: 'Заявка',
    text: 'Оставьте заявку или позвоните. Мы уточним пожелания по району, виду и бюджету',
    image: img('section4_1') || BUILDING_IMAGE,
    icon: IconRequest,
  },
  {
    title: 'Подбор',
    text: 'Аналитик подберёт варианты от проверенных застройщиков Владивостока с учётом ваших критериев.',
    image: img('section4_2') || BUILDING_IMAGE,
    icon: IconSearch,
  },
  {
    title: 'Просмотр',
    text: 'Организуем безопасный показ объектов. Вы смотрите только то, что реально подходит.',
    image: img('section4_3') || BUILDING_IMAGE,
    icon: IconViewing,
  },
  {
    title: 'Сделка',
    text: 'Юридическое сопровождение и выход на сделку. Ваша недвижимость зарегистрирована, вы — в безопасности.',
    image: img('section4_4') || BUILDING_IMAGE,
    icon: IconDeal,
  },
]

const newsImagePrimary = img('section5') || BUILDING_IMAGE
const newsImageSecondary = img('section5_1') || newsImagePrimary

const newsPreview = [
  {
    id: 1,
    tag: 'Аналитика',
    title: 'Как изменились цены на квартиры во Владивостоке в 2025 году',
    readTime: '5 min read',
    excerpt: 'Разбираем динамику цен и что влияет на рынок недвижимости сейчас.',
    date: 'April 30, 2025',
    author: 'Эксперт по недвижимости',
    image: newsImagePrimary,
    authorAvatar: newsImageSecondary,
  },
  {
    id: 2,
    tag: 'Новости',
    title: 'Новостройки Владивостока: на что обратить внимание при выборе',
    readTime: '5 min read',
    excerpt: 'Ключевые факторы, которые важно учитывать перед покупкой',
    date: 'April 30, 2025',
    author: 'Аналитик рынка',
    image: newsImagePrimary,
    authorAvatar: newsImageSecondary,
  },
  {
    id: 3,
    tag: 'Гид',
    title: 'Районы Владивостока: где лучше купить квартиру в 2025',
    readTime: '5 min read',
    excerpt: 'Сравниваем районы по цене, инфраструктуре и перспективам.',
    date: 'April 30, 2025',
    author: 'Команда проекта',
    image: newsImagePrimary,
    authorAvatar: newsImageSecondary,
  },
]
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

.section {
  padding: var(--spacing-5xl) 0;
}

.section__title {
  text-align: center;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-3xl);
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.3;
}

.section__title--left {
  text-align: left;
  margin-left: 0;
}

.section__title--narrow {
  max-width: 900px;
}

.hero {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.08) 0%,
    rgba(0, 0, 0, 0.22) 55%,
    rgba(0, 0, 0, 0.32) 100%
  );
}

.hero__fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(to bottom, transparent, #fff);
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-text-white);
  padding-top: 120px;
  padding-bottom: 80px;
}

.hero__title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: var(--font-weight-bold);
  margin-bottom: 20px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
}

.hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 560px;
  margin: 0 auto 36px;
  opacity: 0.95;
  font-weight: var(--font-weight-light);
}

.hero__btn {
  display: inline-flex;
  padding: 16px 36px;
  background: var(--color-accent-hero);
  color: white;
  border-radius: var(--radius-pill);
  font-weight: var(--font-weight-medium);
  backdrop-filter: blur(4px);
  transition: transform var(--transition-fast);
}

.hero__btn:hover {
  transform: translateY(-2px);
}

.listings {
  background: #fff;
  margin-top: -40px;
  position: relative;
  z-index: 3;
}

.listings__layout {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.listings__results {
  flex: 1;
  min-width: 0;
}

.listings__more {
  display: flex;
  width: 100%;
  max-width: 480px;
  margin: 32px auto 0;
  text-align: center;
}

.why {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 0;
}

.why__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.why__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 40, 80, 0.4) 0%, rgba(0, 20, 40, 0.75) 100%);
}

.why__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-bottom: 60px;
}

.why__title {
  color: white;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 48px;
  line-height: 1.2;
}

.why__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.why__card {
  background: white;
  padding: 28px;
  border-radius: var(--radius-lg);
}

.why__icon {
  display: block;
  width: 32px;
  height: 32px;
  background: var(--color-primary);
  border-radius: 4px;
  margin-bottom: 16px;
}

.why__card h3 {
  font-size: var(--font-size-lg);
  margin-bottom: 10px;
}

.why__card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.process__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.process__item {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  min-height: 320px;
}

.process__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.process__card {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 20px 22px 22px;
}

.process__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-accent);
  border-radius: 6px;
  margin-bottom: 14px;
  color: #fff;
}

.process__icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.process__card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 8px;
  line-height: 1.25;
}

.process__card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.55;
}

.team__layout {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 48px;
  align-items: center;
}

.team__text {
  font-size: var(--font-size-xl);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 32px;
  color: var(--color-text-primary);
}

.team__author {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.team__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.team__author strong {
  display: block;
  font-size: var(--font-size-base);
}

.team__author span {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.team__nav {
  display: flex;
  gap: 8px;
}

.team__nav button {
  width: 44px;
  height: 44px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  font-size: 18px;
}

.team__photo {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: var(--radius-xl);
}

.home-news {
  background: #f7f7f7;
}

.home-news__label {
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.home-news__title {
  font-size: clamp(28px, 3vw, 40px);
  font-weight: var(--font-weight-semibold);
  line-height: 1.2;
  margin-bottom: 40px;
  max-width: 640px;
}

.home-news__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.home-news__card {
  background: #fff;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}

.home-news__media {
  position: relative;
  margin: 12px 12px 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.home-news__media img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.home-news__tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fff;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.home-news__body {
  padding: 20px 22px 22px;
}

.home-news__headline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.home-news__headline h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: 1.35;
  flex: 1;
}

.home-news__read {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--color-text-muted);
  white-space: nowrap;
  padding-top: 2px;
}

.home-news__body p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 20px;
  line-height: 1.55;
}

.home-news__meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.home-news__meta img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.home-news__meta span {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.home-news__meta time {
  display: block;
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
}

@media (max-width: 1100px) {
  .listings__layout {
    flex-direction: column;
  }

  .why__cards {
    grid-template-columns: 1fr;
  }

  .process__grid,
  .home-news__grid {
    grid-template-columns: 1fr;
  }

  .team__layout {
    grid-template-columns: 1fr;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.why__icon {
  display: block;
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  border-radius: 4px;
  margin-bottom: 16px;
  position: relative;
}

.why__icon img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 6px;
  box-sizing: border-box;
  filter: brightness(0) invert(1);
}
</style>
