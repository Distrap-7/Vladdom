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
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchProperties, fetchNews, fetchApplications } from '../../stores/admin'

const stats = ref({ properties: 0, news: 0, applications: 0 })

onMounted(async () => {
  try {
    const [props, news, apps] = await Promise.all([
      fetchProperties(),
      fetchNews(),
      fetchApplications(),
    ])
    stats.value = {
      properties: props.length,
      news: news.length,
      applications: apps.length,
    }
  } catch (e) { console.error(e) }
})
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
.dashboard-card__icon { font-size: 36px; }
.dashboard-card__value { display: block; font-size: 28px; font-weight: 700; color: #1e293b; }
.dashboard-card__label { font-size: 13px; color: #64748b; }
</style>
