<template>
  <section class="admin-dashboard">
    <h1 class="admin-title">Дашборд</h1>
    <section class="dashboard-cards">
      <article class="dashboard-card">
        <span class="dashboard-card__icon">🏠</span>
        <section>
          <strong class="dashboard-card__value">{{ stats.properties }}</strong>
          <span class="dashboard-card__label">Объектов</span>
        </section>
      </article>
      <article class="dashboard-card">
        <span class="dashboard-card__icon">📰</span>
        <section>
          <strong class="dashboard-card__value">{{ stats.news }}</strong>
          <span class="dashboard-card__label">Новостей</span>
        </section>
      </article>
      <article class="dashboard-card">
        <span class="dashboard-card__icon">📋</span>
        <section>
          <strong class="dashboard-card__value">{{ stats.applications }}</strong>
          <span class="dashboard-card__label">Заявок</span>
        </section>
      </article>
      <article class="dashboard-card">
        <span class="dashboard-card__icon">👥</span>
        <section>
          <strong class="dashboard-card__value">{{ stats.users }}</strong>
          <span class="dashboard-card__label">Пользователей</span>
        </section>
      </article>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../utils/supabase'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const token = () => supabase.auth.getSession().then(({ data }) => data.session?.access_token)

const stats = ref({ properties: 0, news: 0, applications: 0, users: 0 })

async function fetchAll() {
  try {
    const t = await token()
    const headers = t ? { Authorization: `Bearer ${t}` } : {}

    const [props, news, apps, users] = await Promise.all([
      fetch(`${API}/api/admin/properties`, { headers }).then(r => r.json()),
      fetch(`${API}/api/admin/news`, { headers }).then(r => r.json()),
      fetch(`${API}/api/admin/applications`, { headers }).then(r => r.json()),
      fetch(`${API}/api/admin/users`, { headers }).then(r => r.json()),
    ])

    stats.value = {
      properties: Array.isArray(props) ? props.length : 0,
      news: Array.isArray(news) ? news.length : 0,
      applications: Array.isArray(apps) ? apps.length : 0,
      users: Array.isArray(users) ? users.length : 0,
    }
  } catch (e) {
    console.error('Dashboard fetch error', e)
  }
}

onMounted(fetchAll)
</script>

<style scoped>
.admin-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 28px;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.dashboard-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.dashboard-card__icon {
  font-size: 36px;
}

.dashboard-card__value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
}

.dashboard-card__label {
  font-size: 13px;
  color: #64748b;
}
</style>
