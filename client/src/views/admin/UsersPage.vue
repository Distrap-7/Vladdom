<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-title">Пользователи</h1>
    </header>

    <section v-if="loading" class="admin-loading">Загрузка...</section>

    <section v-else-if="error" class="admin-error">
      {{ error }}<br/>
      <span class="admin-error__hint">Требуется SERVICE_ROLE_KEY в .env сервера</span>
    </section>

    <section v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Создан</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.email }}</td>
            <td>{{ user.user_metadata?.name || '—' }}</td>
            <td>{{ user.user_metadata?.phone || '—' }}</td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td class="admin-actions">
              <button class="admin-btn admin-btn--sm admin-btn--danger" @click="confirmDelete(user)">🗑️</button>
            </td>
          </tr>
          <tr v-if="!users.length">
            <td colspan="5" class="admin-empty">Нет пользователей</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../utils/api'

const users = ref([])
const loading = ref(true)
const error = ref('')

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

async function fetchUsers() {
  loading.value = true
  try {
    users.value = await api('/api/admin/users')
  } catch (e) {
    error.value = e.message || 'Не удалось загрузить пользователей'
  }
  loading.value = false
}

async function confirmDelete(user) {
  if (!confirm(`Удалить пользователя ${user.email}?`)) return
  try {
    await api(`/api/admin/users/${user.id}`, { method: 'DELETE' })
    await fetchUsers()
  } catch (e) {
    alert(e.message || 'Ошибка удаления')
  }
}

onMounted(fetchUsers)
</script>

<style>
@import '../../styles/admin-shared.css';

.admin-error {
  background: #ffebee;
  color: #c62828;
  padding: 20px 24px;
  border-radius: 12px;
  font-size: 14px;
}

.admin-error__hint {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 8px;
  display: block;
}
</style>
