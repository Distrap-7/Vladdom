<template>
  <section class="my-applications page">
    <section class="container">
      <h1 class="page-title">Мои заявки</h1>

      <section v-if="error" class="my-applications__error">{{ error }}</section>

      <section v-if="loading" class="my-applications__loading">Загрузка...</section>

      <section v-else-if="applications.length" class="my-applications__list">
        <section
          v-for="app in applications"
          :key="app.id"
          class="my-applications__card"
        >
          <section class="my-applications__card-head">
            <span class="my-applications__type">{{ typeLabel(app.consultation_type) }}</span>
            <span class="my-applications__date">{{ formatDate(app.created_at) }}</span>
          </section>
          <section class="my-applications__card-body">
            <section class="my-applications__info">
              <span class="my-applications__label">Имя</span>
              <span>{{ app.name }}</span>
            </section>
            <section class="my-applications__info">
              <span class="my-applications__label">Телефон</span>
              <span>{{ '+7 ' + app.phone }}</span>
            </section>
            <section v-if="app.message" class="my-applications__info">
              <span class="my-applications__label">Сообщение</span>
              <span>{{ app.message }}</span>
            </section>
          </section>
          <section class="my-applications__card-foot">
            <span class="my-applications__status" :class="'my-applications__status--' + (app.status || 'new')">
              {{ statusLabel(app.status || 'new') }}
            </span>
          </section>
        </section>
      </section>

      <section v-else class="my-applications__empty">
        <p class="my-applications__empty-icon">📋</p>
        <h2>У вас пока нет заявок</h2>
        <p>Оставьте заявку, и мы свяжемся с вами</p>
        <router-link to="/request" class="btn-primary">Оставить заявку</router-link>
      </section>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useApplicationsStore } from '../stores/applications'

const authStore = useAuthStore()
const applicationsStore = useApplicationsStore()

const applications = ref([])
const loading = ref(true)
const error = ref('')

const typeLabels = {
  consultation: 'Консультация',
  purchase: 'Покупка',
  sale: 'Продажа',
  mortgage: 'Ипотечный брокер',
  legal: 'Юридическая проверка',
}

function typeLabel(type) {
  return typeLabels[type] || type
}

const statusLabels = {
  new: 'Новая',
  in_progress: 'В обработке',
  completed: 'Завершена',
  cancelled: 'Отменена',
}

function statusLabel(status) {
  return statusLabels[status] || status
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(async () => {
  if (!authStore.userPhone) {
    loading.value = false
    return
  }
  try {
    applications.value = await applicationsStore.fetchUserApplications(authStore.userPhone)
  } catch (e) {
    error.value = 'Не удалось загрузить заявки'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page {
  padding: 40px 0 var(--spacing-5xl);
}

.my-applications__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 640px;
}

.my-applications__card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.my-applications__card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.my-applications__type {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.my-applications__date {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.my-applications__card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.my-applications__info {
  display: flex;
  gap: 8px;
  font-size: var(--font-size-sm);
}

.my-applications__label {
  color: var(--color-text-muted);
  min-width: 80px;
  flex-shrink: 0;
}

.my-applications__card-foot {
  display: flex;
  justify-content: flex-end;
}

.my-applications__status {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
}

.my-applications__status--new {
  background: #e3f2fd;
  color: #1565c0;
}

.my-applications__status--in_progress {
  background: #fff3e0;
  color: #e65100;
}

.my-applications__status--completed {
  background: #e8f5e9;
  color: #2e7d32;
}

.my-applications__status--cancelled {
  background: #ffebee;
  color: #c62828;
}

.my-applications__empty {
  text-align: center;
  padding: 80px 20px;
}

.my-applications__empty-icon {
  font-size: 72px;
  margin-bottom: 20px;
}

.my-applications__empty h2 {
  margin-bottom: 12px;
}

.my-applications__empty p {
  color: var(--color-text-muted);
  margin-bottom: 28px;
}

.my-applications__error {
  padding: 12px 16px;
  background: #ffebee;
  color: #c62828;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  max-width: 640px;
  margin-bottom: 20px;
}

.my-applications__loading {
  text-align: center;
  padding: 40px;
  color: var(--color-text-muted);
}
</style>