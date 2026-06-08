<template>
  <header class="header" :class="{ 'header--hero': variant === 'hero' }">
    <section class="header__inner container">
      <router-link to="/" class="header__logo">VladDom</router-link>

      <nav class="header__nav">
        <router-link to="/" class="header__link" active-class="header__link--active">Главная</router-link>
        <router-link to="/catalog" class="header__link" active-class="header__link--active">Каталог</router-link>
        <router-link to="/contacts" class="header__link" active-class="header__link--active">Контакты</router-link>
        <router-link to="/news" class="header__link" active-class="header__link--active">Новости</router-link>
      </nav>

      <section class="header__actions">
        <router-link to="/request" class="header__cta" active-class="header__cta--active">
          Оставить заявку
        </router-link>
        <router-link
          to="/favorites"
          class="header__fav"
          aria-label="Избранное"
          active-class="header__fav--active"
        >
          <img :src="heartIcon" alt="Избранное" />
          <span v-if="favoritesCount > 0" class="header__badge">{{ favoritesCount }}</span>
        </router-link>

        <section v-if="authStore.isAuthenticated" class="header__profile">
          <button
            type="button"
            class="header__avatar"
            :class="{ 'header__avatar--hero': variant === 'hero' }"
            @click.stop="dropdownOpen = !dropdownOpen"
          >
            <span class="header__avatar-letter">{{ authStore.userInitial }}</span>
          </button>

          <Transition name="dropdown">
            <section v-if="dropdownOpen" class="header__dropdown" @click.stop>
              <section class="header__dropdown-head">
                <span class="header__dropdown-avatar">{{ authStore.userInitial }}</span>
                <section>
                  <strong class="header__dropdown-name">{{ authStore.userName }}</strong>
                  <span class="header__dropdown-email">{{ authStore.userEmail }}</span>
                </section>
              </section>

              <section v-if="authStore.userPhone" class="header__dropdown-phone">
                <img :src="phoneIcon" alt="Телефон" class="header__dropdown-icon" />
                <span>{{ authStore.userPhone }}</span>
              </section>

              <hr class="header__dropdown-divider" />

              <router-link to="/favorites" class="header__dropdown-item" @click="dropdownOpen = false">
                <img :src="heartIcon" alt="Избранное" class="header__dropdown-icon" />
                Избранное
                <span v-if="favoritesCount > 0" class="header__dropdown-badge">{{ favoritesCount }}</span>
              </router-link>

              <router-link to="/my-applications" class="header__dropdown-item" @click="dropdownOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="header__dropdown-icon">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                  <polyline points="12 12 9 15 12 18" />
                </svg>
                Мои заявки
              </router-link>

              <hr class="header__dropdown-divider" />

              <button type="button" class="header__dropdown-item header__dropdown-item--danger" @click="handleLogout">
                <img :src="logoutIcon" alt="Выйти" class="header__dropdown-icon" />
                Выйти
              </button>
            </section>
          </Transition>
        </section>

        <router-link
          v-else
          to="/auth"
          class="header__user"
          aria-label="Вход / Регистрация"
          active-class="header__user--active"
        >
          <img :src="userIcon" alt="Вход в личный кабинет" />
        </router-link>
      </section>

      <button
        type="button"
        class="header__burger"
        :class="{ 'header__burger--hero': variant === 'hero' }"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Открыть меню"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </section>

    <Transition name="mobile-menu">
      <section v-if="mobileMenuOpen" class="header__mobile" @click.self="mobileMenuOpen = false">
        <section class="header__mobile-panel">
          <button
            type="button"
            class="header__mobile-close"
            @click="mobileMenuOpen = false"
            aria-label="Закрыть меню"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <router-link to="/" class="header__mobile-logo" @click="mobileMenuOpen = false">VladDom</router-link>

          <nav class="header__mobile-nav">
            <router-link to="/" class="header__mobile-link" active-class="header__mobile-link--active" @click="mobileMenuOpen = false">Главная</router-link>
            <router-link to="/catalog" class="header__mobile-link" active-class="header__mobile-link--active" @click="mobileMenuOpen = false">Каталог</router-link>
            <router-link to="/contacts" class="header__mobile-link" active-class="header__mobile-link--active" @click="mobileMenuOpen = false">Контакты</router-link>
            <router-link to="/news" class="header__mobile-link" active-class="header__mobile-link--active" @click="mobileMenuOpen = false">Новости</router-link>
          </nav>

          <router-link to="/request" class="header__mobile-cta" @click="mobileMenuOpen = false">
            Оставить заявку
          </router-link>

          <section class="header__mobile-actions">
            <router-link to="/favorites" class="header__mobile-action" @click="mobileMenuOpen = false">
              <img :src="heartIcon" alt="Избранное" class="header__mobile-action-icon" />
              <span>Избранное</span>
              <span v-if="favoritesCount > 0" class="header__mobile-action-badge">{{ favoritesCount }}</span>
            </router-link>

            <router-link
              v-if="!authStore.isAuthenticated"
              to="/auth"
              class="header__mobile-action"
              @click="mobileMenuOpen = false"
            >
              <img :src="userIcon" alt="Войти" class="header__mobile-action-icon" />
              <span>Войти</span>
            </router-link>

            <section v-else class="header__mobile-profile">
              <section class="header__mobile-profile-head">
                <span class="header__mobile-profile-avatar">{{ authStore.userInitial }}</span>
                <section>
                  <strong>{{ authStore.userName }}</strong>
                  <span>{{ authStore.userEmail }}</span>
                </section>
              </section>
              <router-link to="/my-applications" class="header__mobile-action" @click="mobileMenuOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="header__mobile-action-icon">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                  <polyline points="12 12 9 15 12 18" />
                </svg>
                Мои заявки
              </router-link>
              <button type="button" class="header__mobile-action header__mobile-action--danger" @click="handleMobileLogout">
                <img :src="logoutIcon" alt="Выйти" class="header__mobile-action-icon" />
                Выйти
              </button>
            </section>
          </section>
        </section>
      </section>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useFavoritesStore } from '../../stores/favorites'
import heartIcon from '../../assets/icons/heart.svg'
import userIcon from '../../assets/icons/user.svg'
import phoneIcon from '../../assets/icons/phone.svg'
import logoutIcon from '../../assets/icons/user.svg'

defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'hero'].includes(v),
  },
})

const router = useRouter()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()
const favoritesCount = computed(() => favoritesStore.favorites.length)

const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)

function handleLogout() {
  dropdownOpen.value = false
  authStore.logout()
  router.push('/')
}

function handleMobileLogout() {
  mobileMenuOpen.value = false
  authStore.logout()
  router.push('/')
}

function closeDropdown(e) {
  if (dropdownOpen.value) {
    dropdownOpen.value = false
  }
}

function handleEscape(e) {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border);
  padding: 20px 0;
}

.header--hero {
  position: absolute;
  left: 0;
  right: 0;
  background: transparent;
  border-bottom: none;
  padding: 28px 0;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.header__logo {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  flex-shrink: 0;
}

.header--hero .header__logo,
.header--hero .header__link {
  color: var(--color-text-white);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
  justify-content: center;
}

.header__link {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  transition: opacity var(--transition-fast);
}

.header__link:hover {
  opacity: 0.7;
}

.header__link--active {
  font-weight: var(--font-weight-semibold);
  text-decoration: underline;
  text-underline-offset: 6px;
}

.header--hero .header__link--active {
  text-decoration: none;
  font-weight: var(--font-weight-bold);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__cta {
  padding: 14px 28px;
  background: var(--color-primary);
  color: var(--color-text-white);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.header__fav {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--radius-lg);
  background: var(--color-bg-muted);
  transition: all var(--transition-fast);
}

.header__fav:hover {
  background: #e8e8e8;
}

.header__fav img {
  width: 26px;
  height: 26px;
}

.header--hero .header__fav {
  background: rgba(255, 255, 255, 0.15);
}

.header--hero .header__fav:hover {
  background: rgba(255, 255, 255, 0.25);
}

.header__user {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--radius-lg);
  background: var(--color-bg-muted);
  transition: all var(--transition-fast);
}

.header__user:hover {
  background: #e8e8e8;
}

.header__user img {
  width: 26px;
  height: 26px;
}

.header--hero .header__user {
  background: rgba(255, 255, 255, 0.15);
}

.header--hero .header__user:hover {
  background: rgba(255, 255, 255, 0.25);
}

.header__cta--active {
  box-shadow: 0 0 0 2px var(--color-accent);
}

.header__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: var(--color-accent);
  color: white;
  font-size: 10px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__profile {
  position: relative;
}

.header__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--transition-fast);
}

.header__avatar:hover {
  border-color: var(--color-accent);
}

.header__avatar--hero {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
}

.header__avatar-letter {
  font-size: 20px;
  font-weight: var(--font-weight-bold);
}

.header__dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 260px;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
  padding: 16px;
  z-index: var(--z-dropdown, 1000);
}

.header__dropdown-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.header__dropdown-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.header__dropdown-name {
  display: block;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: 1.3;
}

.header__dropdown-email {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.header__dropdown-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}

.header__dropdown-icon {
  width: 16px;
  height: 16px;
  opacity: 0.5;
  flex-shrink: 0;
}

.header__dropdown-divider {
  border: none;
  border-top: 1px solid var(--color-border-light);
  margin: 10px 0;
}

.header__dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  transition: background var(--transition-fast);
}

.header__dropdown-item:hover {
  background: var(--color-bg-muted);
}

.header__dropdown-item--danger {
  color: #e11d48;
}

.header__dropdown-badge {
  margin-left: auto;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: var(--color-accent);
  color: white;
  font-size: 10px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.header__burger {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: var(--color-bg-muted);
  color: var(--color-text-primary);
  flex-shrink: 0;
  transition: background var(--transition-fast);
}

.header__burger:hover {
  background: #e8e8e8;
}

.header__burger--hero {
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-text-white);
}

.header__burger--hero:hover {
  background: rgba(255, 255, 255, 0.25);
}

.header__mobile {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-header) + 100);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
}

.header__mobile-panel {
  width: 100%;
  max-width: 360px;
  height: 100%;
  background: var(--color-bg-page);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.header__mobile-close {
  align-self: flex-end;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: var(--color-bg-muted);
  color: var(--color-text-primary);
  margin-bottom: 8px;
  transition: background var(--transition-fast);
}

.header__mobile-close:hover {
  background: #e8e8e8;
}

.header__mobile-logo {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-3xl);
}

.header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: var(--spacing-3xl);
}

.header__mobile-link {
  padding: 14px 12px;
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.header__mobile-link:hover {
  background: var(--color-bg-muted);
}

.header__mobile-link--active {
  font-weight: var(--font-weight-semibold);
  background: var(--color-bg-muted);
}

.header__mobile-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  background: var(--color-primary);
  color: var(--color-text-white);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.header__mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--color-border-light);
  padding-top: var(--spacing-lg);
}

.header__mobile-action {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.header__mobile-action:hover {
  background: var(--color-bg-muted);
}

.header__mobile-action--danger {
  color: #e11d48;
}

.header__mobile-action-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.5;
}

.header__mobile-action-badge {
  margin-left: auto;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: var(--color-accent);
  color: white;
  font-size: 10px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__mobile-profile {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header__mobile-profile-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 4px;
}

.header__mobile-profile-head strong {
  display: block;
  font-size: var(--font-size-base);
  line-height: 1.3;
}

.header__mobile-profile-head span:last-child {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.header__mobile-profile-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .header__mobile-panel,
.mobile-menu-leave-to .header__mobile-panel {
  transform: translateX(100%);
}

.mobile-menu-enter-active .header__mobile-panel,
.mobile-menu-leave-active .header__mobile-panel {
  transition: transform 0.25s ease;
}

@media (max-width: 900px) {
  .header__nav {
    display: none;
  }

  .header__cta {
    display: none;
  }

  .header__burger {
    display: flex;
  }
}
</style>
