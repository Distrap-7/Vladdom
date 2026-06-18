<template>
  <section class="admin-layout">
    <aside class="admin-sidebar">
      <router-link to="/admin" class="admin-logo">VladDom</router-link>
      <nav class="admin-nav">
        <router-link to="/admin" class="admin-nav__link" exact-active-class="active">
          <span>📊</span> Дашборд
        </router-link>
        <router-link to="/admin/properties" class="admin-nav__link" active-class="active">
          <span>🏠</span> Объекты
        </router-link>
        <router-link to="/admin/news" class="admin-nav__link" active-class="active">
          <span>📰</span> Новости
        </router-link>
        <router-link to="/admin/applications" class="admin-nav__link" active-class="active">
          <span>📋</span> Заявки
        </router-link>
        <router-link to="/admin/users" class="admin-nav__link" active-class="active">
          <span>👥</span> Пользователи
        </router-link>
      </nav>
      <section class="admin-sidebar__footer">
        <router-link to="/" class="admin-nav__link">← На сайт</router-link>
        <button class="admin-nav__link admin-nav__link--danger" @click="handleLogout">Выйти</button>
      </section>
    </aside>
    <main class="admin-main">
      <router-view />
    </main>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
}

.admin-sidebar {
  width: 240px;
  background: #1e293b;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.admin-logo {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  padding: 0 20px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 16px;
}

.admin-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 8px;
}

.admin-nav__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.15s;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.admin-nav__link:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}

.admin-nav__link.active {
  background: rgba(255,255,255,0.12);
  color: #fff;
  font-weight: 600;
}

.admin-nav__link--danger {
  color: #f87171 !important;
}

.admin-nav__link--danger:hover {
  background: rgba(248,113,113,0.15) !important;
}

.admin-sidebar__footer {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 16px 8px 0;
  margin: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.admin-main {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 60px;
  }
  .admin-logo,
  .admin-nav__link span:first-child {
    display: none;
  }
  .admin-main {
    padding: 16px;
  }
}
</style>
