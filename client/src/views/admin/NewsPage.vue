<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-title">Новости</h1>
      <button class="admin-btn admin-btn--primary" @click="openCreate">+ Добавить</button>
    </header>

    <section v-if="loading" class="admin-loading">Загрузка...</section>
    <section v-else-if="dbError" class="admin-error">{{ dbError }}</section>

    <section v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Тег</th>
            <th>Автор</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.tag }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.date }}</td>
            <td class="admin-actions">
              <button class="admin-btn admin-btn--sm" @click="openEdit(item)">✏️</button>
              <button class="admin-btn admin-btn--sm admin-btn--danger" @click="confirmDelete(item)">🗑️</button>
            </td>
          </tr>
          <tr v-if="!items.length">
            <td colspan="6" class="admin-empty">Нет новостей</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-if="showForm" class="admin-modal" @click.self="showForm = false">
      <section class="admin-modal__body">
        <h2>{{ editing ? 'Редактировать' : 'Добавить' }} новость</h2>
        <form @submit.prevent="save">
          <label>Заголовок *<input v-model="form.title" required /></label>
          <label>Тег<input v-model="form.tag" placeholder="Новости, Аналитика, Гид" /></label>
          <label>Время чтения<input v-model="form.readTime" placeholder="5 min read" /></label>
          <label>Краткое описание<textarea v-model="form.excerpt" rows="2"></textarea></label>
          <label>Дата *<input v-model="form.date" type="date" required /></label>
          <label>Автор *<input v-model="form.author" required /></label>
          <label>Ключ фото (image)<input v-model="form.image" placeholder="news1, news2, ..." /></label>
          <label>Ключ аватара автора (authorAvatar)<input v-model="form.authorAvatar" placeholder="мужик, nodirbek, vladimir, ..." /></label>
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
import { fetchNews, createNews, updateNews, deleteNews } from '../../stores/admin'

const items = ref([])
const loading = ref(true)
const dbError = ref('')
const showForm = ref(false)
const editing = ref(null)

const defaultForm = {
  title: '', tag: 'Новости', readTime: '5 min read',
  excerpt: '', date: '', author: '', image: '', authorAvatar: '',
}
const form = ref({ ...defaultForm })

async function fetchItems() {
  loading.value = true; dbError.value = ''
  try { items.value = await fetchNews() }
  catch (e) { dbError.value = e.message }
  loading.value = false
}

function openCreate() { editing.value = null; form.value = { ...defaultForm }; showForm.value = true }
function openEdit(item) { editing.value = item; form.value = { ...item }; showForm.value = true }

async function save() {
  try {
    const body = { ...form.value, tag: form.value.tag || 'Новости', readTime: form.value.readTime || '5 min read' }
    if (editing.value) await updateNews(editing.value.id, body)
    else await createNews(body)
    showForm.value = false
    await fetchItems()
  } catch (e) { alert(e.message) }
}

async function confirmDelete(item) {
  if (!confirm(`Удалить новость "${item.title}"?`)) return
  try { await deleteNews(item.id); await fetchItems() }
  catch (e) { alert(e.message) }
}

onMounted(fetchItems)
</script>

<style>
@import '../../styles/admin-shared.css';
.admin-error { background: #ffebee; color: #c62828; padding: 16px 20px; border-radius: 8px; }
</style>
