<template>
  <section class="auth">
    <div class="auth__container">
      <div class="auth__card">
        <h1 class="auth__title">Вход и регистрация</h1>
        <div class="auth__tabs">
          <button 
            class="auth__tab" 
            :class="{ 'auth__tab--active': mode === 'login' }"
            @click="mode = 'login'"
          >
            Вход
          </button>
          <button 
            class="auth__tab" 
            :class="{ 'auth__tab--active': mode === 'register' }"
            @click="mode = 'register'"
          >
            Регистрация
          </button>
        </div>

        <form v-if="mode === 'login'" class="auth__form" @submit.prevent="handleLogin">
          <div v-if="error" class="auth__global-error">{{ error }}</div>
          <div class="auth__field">
            <label class="auth__label">Email</label>
            <input 
              v-model="loginForm.email" 
              type="email" 
              class="auth__input"
              placeholder="example@mail.ru"
              required
            />
          </div>
          <div class="auth__field">
            <label class="auth__label">Пароль</label>
            <input 
              v-model="loginForm.password" 
              type="password" 
              class="auth__input"
              placeholder="Введите пароль"
              required
            />
          </div>
          <button type="submit" class="auth__submit btn-primary btn-primary--wide" :disabled="loading">
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <form v-else class="auth__form" @submit.prevent="handleRegister">
          <div v-if="error" class="auth__global-error">{{ error }}</div>
          <div class="auth__field">
            <label class="auth__label">Имя</label>
            <input 
              v-model="registerForm.name" 
              type="text" 
              class="auth__input"
              placeholder="Ваше имя"
              required
            />
          </div>
          <div class="auth__field">
            <label class="auth__label">Телефон</label>
            <div class="auth__phone-wrapper">
              <span class="auth__phone-prefix">+7</span>
              <input 
                v-model="registerForm.phone" 
                type="tel" 
                class="auth__input auth__input--phone"
                :class="{ 'auth__input--error': phoneError }"
                placeholder="(999) 000-00-00"
                maxlength="10"
                @input="filterPhone"
                required
              />
            </div>
            <span v-if="phoneError" class="auth__error">Введите 10 цифр</span>
          </div>
          <div class="auth__field">
            <label class="auth__label">Email</label>
            <input 
              v-model="registerForm.email" 
              type="email" 
              class="auth__input"
              placeholder="example@mail.ru"
              required
            />
          </div>
          <div class="auth__field">
            <label class="auth__label">Пароль</label>
            <input 
              v-model="registerForm.password" 
              type="password" 
              class="auth__input"
              placeholder="Придумайте пароль"
              required
            />
          </div>
          <button type="submit" class="auth__submit btn-primary btn-primary--wide">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import bgImage from '../assets/images/vhod.webp'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => authStore.initialize())

const mode = ref('login')

const loginForm = reactive({
  email: '',
  password: '',
})

const registerForm = reactive({
  name: '',
  phone: '',
  email: '',
  password: '',
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(loginForm.email, loginForm.password)
    router.push('/')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  error.value = ''
  loading.value = true
  try {
    await authStore.register(registerForm.name, registerForm.phone, registerForm.email, registerForm.password)
    alert('Регистрация прошла успешно! Проверьте email для подтверждения.')
    mode.value = 'login'
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const filterPhone = (e) => {
  const value = e.target.value.replace(/\D/g, '').slice(0, 10)
  registerForm.phone = value
}

const phoneError = computed(() => {
  return registerForm.phone.length > 0 && registerForm.phone.length < 10
})
</script>

<style scoped>
.auth {
  padding: var(--spacing-3xl) 0;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/images/vhod.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.auth__container {
  width: 100%;
  max-width: 520px;
}

.auth__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  text-align: center;
  margin-bottom: 20px;
}

.auth__card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
}

.auth__tabs {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-2xl);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-md);
}

.auth__tab {
  flex: 1;
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.auth__tab:hover {
  color: var(--color-text-primary);
}

.auth__tab--active {
  color: var(--color-text-primary);
  background: var(--color-bg-muted);
}

.auth__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.auth__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.auth__label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.auth__input {
  padding: 16px 18px;
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast);
}

.auth__input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.auth__input--error {
  border-color: #e53935;
}

.auth__error {
  font-size: var(--font-size-xs);
  color: #e53935;
  margin-top: 4px;
}

.auth__phone-wrapper {
  display: flex;
  align-items: center;
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.auth__phone-wrapper:focus-within {
  border-color: var(--color-accent);
}

.auth__phone-prefix {
  padding: 16px 10px 16px 16px;
  background: #e0e0e0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

.auth__input--phone {
  flex: 1;
  border: none;
  background: transparent;
  padding: 16px 16px 16px 10px;
}

.auth__input--phone:focus {
  outline: none;
  border: none;
}

.auth__input::placeholder {
  color: var(--color-text-muted);
}

.auth__submit {
  margin-top: var(--spacing-lg);
  padding: 18px 28px;
}

.auth__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth__global-error {
  padding: 12px 16px;
  background: #ffebee;
  color: #c62828;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}
</style>