<template>
  <section class="app">
    <AppHeader :variant="headerVariant" />
    <main class="app__main" :class="{ 'app__main--home': isHome }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const headerVariant = computed(() => (isHome.value ? 'hero' : 'default'))
</script>

<style>
@import './styles/global.css';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1;
}

.app__main--home {
  margin-top: 0;
}
</style>
