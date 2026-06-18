<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-title">Заявки</h1>
    </header>

    <section v-if="loading" class="admin-loading">Загрузка...</section>

    <section v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Тип</th>
            <th>Сообщение</th>
            <th>Статус</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ '+7 ' + item.phone }}</td>
            <td>{{ typeLabel(item.consultation_type) }}</td>
            <td class="admin-cell-truncate">{{ item.message || '—' }}</td>
            <td>
              <select :value="item.status || 'new'" @change="changeStatus(item, $event.target.value)" class="admin-status-select">
                <option value="new">Новая</option>
                <option value="in_progress">В обработке</option>
                <option value="completed">Завершена</option>
                <option value="cancelled">Отменена</option>
              </select>
            </td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td class="admin-actions">
              <button class="admin-btn admin-btn--sm admin-btn--danger" @click="confirmDelete(item)">🗑️</button>
            </td>
          </tr>
          <tr v-if="!items.length">
            <td colspan="8" class="admin-empty">Нет заявок</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../utils/supabase'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const headers = async () => {
  const { data } = await supabase.auth.getSession()
  return { Authorization: `Bearer ${data.session?.access_token}` }
}

const items = ref([])
const loading = ref(true)

const typeLabels = {
  consultation: 'Консультация',
  purchase: 'Покупка',
  sale: 'Продажа',
  mortgage: 'Ипотечный брокер',
  legal: 'Юридическая проверка',
}
function typeLabel(t) { return typeLabels[t] || t }

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

async function fetchItems() {
  loading.value = true
  try {
    const res = await fetch(`${API}/api/admin/applications`, { headers: await headers() })
    items.value = await res.json()
  } catch (e) { console.error(e) }
  loading.value = false
}

async function changeStatus(item, status) {
  try {
    await fetch(`${API}/api/admin/applications/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(await headers()) },
      body: JSON.stringify({ status }),
    })
    item.status = status
  } catch (e) { console.error(e) }
}

async function confirmDelete(item) {
  if (!confirm(`Удалить заявку #${item.id}?`)) return
  try {
    await fetch(`${API}/api/admin/applications/${item.id}`, {
      method: 'DELETE',
      headers: await headers(),
    })
    await fetchItems()
  } catch (e) { console.error(e) }
}

onMounted(fetchItems)
</script>

<style>
@import '../../styles/admin-shared.css';

.admin-status-select {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 12px;
}

.admin-cell-truncate {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
