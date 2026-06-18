<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-title">Объекты недвижимости</h1>
      <button class="admin-btn admin-btn--primary" @click="openCreate">+ Добавить</button>
    </header>

    <section v-if="loading" class="admin-loading">Загрузка...</section>

    <section v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Район</th>
            <th>Тип</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ formatPrice(item.price) }}</td>
            <td>{{ item.district }}</td>
            <td>{{ typeLabel(item.type) }}</td>
            <td class="admin-actions">
              <button class="admin-btn admin-btn--sm" @click="openEdit(item)">✏️</button>
              <button class="admin-btn admin-btn--sm admin-btn--danger" @click="confirmDelete(item)">🗑️</button>
            </td>
          </tr>
          <tr v-if="!items.length">
            <td colspan="6" class="admin-empty">Нет объектов</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-if="showForm" class="admin-modal" @click.self="showForm = false">
      <section class="admin-modal__body">
        <h2>{{ editing ? 'Редактировать' : 'Добавить' }} объект</h2>
        <form @submit.prevent="save">
          <label>Название *<input v-model="form.title" required /></label>
          <label>ЖК<input v-model="form.buildingName" /></label>
          <label>Адрес *<input v-model="form.address" required /></label>
          <label>Цена *<input v-model.number="form.price" type="number" required /></label>
          <label>Площадь (м²) *<input v-model.number="form.area" type="number" required /></label>
          <label>Комнат<input v-model.number="form.rooms" type="number" /></label>
          <label>Этаж<input v-model.number="form.floor" type="number" /></label>
          <label>Этажность<input v-model.number="form.totalFloors" type="number" /></label>
          <label>Район *<input v-model="form.district" required /></label>
          <label>Микрорайон<input v-model="form.microdistrict" /></label>
          <label>
            Тип
            <select v-model="form.type">
              <option value="apartment">Квартира</option>
              <option value="townhouse">Таунхаус</option>
              <option value="house">Дом</option>
            </select>
          </label>
          <label>Ключ фото (imageKey)<input v-model="form.imageKey" placeholder="house, room, ..." /></label>
          <label>
            Описание
            <textarea v-model="form.description" rows="3"></textarea>
          </label>
          <section class="admin-modal__actions">
            <button type="button" class="admin-btn" @click="showForm = false">Отмена</button>
            <button type="submit" class="admin-btn admin-btn--primary">Сохранить</button>
          </section>
        </form>
      </section>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../utils/api'

const items = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)

const defaultForm = {
  title: '', buildingName: '', address: '', price: 0, area: 0,
  rooms: 1, floor: 1, totalFloors: 1, district: '', microdistrict: '',
  type: 'apartment', imageKey: '', description: '',
}

const form = ref({ ...defaultForm })

const typeLabels = { apartment: 'Квартира', townhouse: 'Таунхаус', house: 'Дом' }
function typeLabel(t) { return typeLabels[t] || t }

function formatPrice(p) {
  return new Intl.NumberFormat('ru-RU').format(p) + ' ₽'
}

async function fetchItems() {
  loading.value = true
  try {
    items.value = await api('/api/admin/properties')
  } catch (e) { console.error(e) }
  loading.value = false
}

function openCreate() {
  editing.value = null
  form.value = { ...defaultForm }
  showForm.value = true
}

function openEdit(item) {
  editing.value = item
  form.value = { ...item }
  showForm.value = true
}

async function save() {
  try {
    if (editing.value) {
      await api(`/api/admin/properties/${editing.value.id}`, {
        method: 'PUT',
        body: form.value,
      })
    } else {
      await api('/api/admin/properties', {
        method: 'POST',
        body: form.value,
      })
    }
    showForm.value = false
    await fetchItems()
  } catch (e) { console.error(e) }
}

async function confirmDelete(item) {
  if (!confirm(`Удалить "${item.title}"?`)) return
  try {
    await api(`/api/admin/properties/${item.id}`, { method: 'DELETE' })
    await fetchItems()
  } catch (e) { console.error(e) }
}

onMounted(fetchItems)
</script>

<style>
@import '../../styles/admin-shared.css';
</style>
