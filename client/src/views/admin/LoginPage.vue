<template>
  <section class="admin-login">
    <section class="admin-login__card">
      <h1>Вход в админ-панель</h1>
      <form @submit.prevent="handleLogin">
        <label>
          Email
          <input v-model="email" type="email" required placeholder="admin@example.com" />
        </label>
        <label>
          Пароль
          <input v-model="password" type="password" required />
        </label>
        <p v-if="error" class="admin-login__error">{{ error }}</p>
        <button type="submit" class="admin-btn admin-btn--primary admin-login__btn" :disabled="loading">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/admin')
  } catch (e) {
    error.value = e.message || 'Ошибка входа'
  }
  loading.value = false
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}

.admin-login__card {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

.admin-login__card h1 {
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
}

.admin-login__card label {
  display: block;
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.admin-login__card input {
  display: block;
  width: 100%;
  margin-top: 4px;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
}

.admin-login__btn {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  margin-top: 8px;
}

.admin-login__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-login__error {
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 12px;
}
</style>
