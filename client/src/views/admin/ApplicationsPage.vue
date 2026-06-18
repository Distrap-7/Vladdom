<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-title">Заявки</h1>
    </header>

    <section v-if="loading" class="admin-loading">Загрузка...</section>

    <section v-else-if="error" class="admin-error">
      <p>{{ error }}</p>
      <p class="admin-error__hint">Возможно, нужно добавить RLS политику в Supabase — SQL в файле <code>supabase-schema.sql</code></p>
    </section>

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
import { fetchApplications, updateApplicationStatus, deleteApplication } from '../../stores/admin'

const items = ref([])
const loading = ref(true)
const error = ref('')

const typeLabels = { consultation: 'Консультация', purchase: 'Покупка', sale: 'Продажа', mortgage: 'Ипотечный брокер', legal: 'Юридическая проверка' }
function typeLabel(t) { return typeLabels[t] || t }
function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

async function fetchItems() {
  loading.value = true; error.value = ''
  try { items.value = await fetchApplications() }
  catch (e) { error.value = e.message }
  loading.value = false
}

async function changeStatus(item, status) {
  try { await updateApplicationStatus(item.id, status); item.status = status }
  catch (e) { alert(e.message) }
}

async function confirmDelete(item) {
  if (!confirm(`Удалить заявку #${item.id}?`)) return
  try { await deleteApplication(item.id); await fetchItems() }
  catch (e) { alert(e.message) }
}

onMounted(fetchItems)
</script>

<style>
@import '../../styles/admin-shared.css';
.admin-status-select { padding: 4px 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 12px; }
.admin-cell-truncate { max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.admin-error { background: #ffebee; color: #c62828; padding: 20px 24px; border-radius: 12px; font-size: 14px; }
.admin-error__hint { font-size: 12px; opacity: 0.7; margin-top: 8px; }
.admin-error__hint code { background: rgba(0,0,0,0.06); padding: 2px 6px; border-radius: 3px; }
</style>
