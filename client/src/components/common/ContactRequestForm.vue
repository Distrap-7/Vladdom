<template>
  <form class="request-form" @submit.prevent="submitForm">
    <div v-if="error" class="request-form__error">{{ error }}</div>
    <div v-if="success" class="request-form__success">Заявка отправлена! Мы свяжемся с вами.</div>
    <label>
      <span>Имя</span>
      <input v-model="form.name" type="text" required placeholder="Иван" />
    </label>
    <label class="request-form__phone">
      <span>Телефон</span>
      <div class="auth__phone-wrapper">
        <span class="auth__phone-prefix">+7</span>
        <input 
          v-model="form.phone" 
          type="tel" 
          required 
          placeholder="(999) 000-00-00"
          maxlength="10"
          @input="filterPhone"
          class="auth__input--phone"
          :disabled="authStore.isAuthenticated"
        />
      </div>
    </label>
    <label>
      <span>Консультация</span>
      <select v-model="form.topic">
        <option v-for="opt in topicOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </label>
    <label>
      <span>Сообщение</span>
      <textarea v-model="form.message" rows="4" placeholder="Ваш вопрос" />
    </label>
    <button type="submit" class="request-form__submit" :disabled="loading">
      {{ loading ? 'Отправка...' : 'Отправить' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useApplicationsStore } from '../../stores/applications'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  initialTopic: {
    type: String,
    default: 'consultation',
  },
})

const applicationsStore = useApplicationsStore()
const authStore = useAuthStore()

const topicOptions = [
  { value: 'consultation', label: 'Консультация' },
  { value: 'purchase', label: 'Покупка' },
  { value: 'sale', label: 'Продажа' },
  { value: 'mortgage', label: 'Ипотечный брокер' },
  { value: 'legal', label: 'Юридическая проверка' },
]

const validTopics = topicOptions.map((o) => o.value)

const form = ref({
  name: '',
  phone: authStore.isAuthenticated ? authStore.userPhone : '',
  topic: validTopics.includes(props.initialTopic) ? props.initialTopic : 'consultation',
  message: '',
})

const loading = ref(false)
const success = ref(false)
const error = ref('')

watch(
  () => props.initialTopic,
  (topic) => {
    if (validTopics.includes(topic)) {
      form.value.topic = topic
    }
  }
)

async function submitForm() {
  error.value = ''
  loading.value = true
  try {
    const phone = authStore.isAuthenticated ? authStore.userPhone : form.value.phone
    await applicationsStore.createApplication({
      name: form.value.name,
      phone,
      consultation_type: form.value.topic,
      message: form.value.message,
    })
    success.value = true
    form.value = {
      name: '',
      phone: '',
      topic: validTopics.includes(props.initialTopic) ? props.initialTopic : 'consultation',
      message: '',
    }
    setTimeout(() => { success.value = false }, 3000)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const filterPhone = (e) => {
  const value = e.target.value.replace(/\D/g, '').slice(0, 10)
  form.value.phone = value
}
</script>

<style scoped>
.request-form {
  max-width: 520px;
  margin: 0 auto;
  background: white;
  padding: 32px;
  border-radius: var(--radius-xl);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.request-form label span {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 6px;
}

.request-form input,
.request-form select,
.request-form textarea {
  width: 100%;
  padding: 14px 16px;
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  outline: none;
}

.request-form input:focus,
.request-form select:focus,
.request-form textarea:focus {
  border-color: var(--color-accent);
}

.request-form textarea {
  resize: none;
  height: 120px;
}

.request-form__phone {
  display: flex;
  flex-direction: column;
}

.auth__phone-wrapper {
  display: flex;
  align-items: center;
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.auth__phone-prefix {
  padding: 14px 10px 14px 16px;
  background: #e0e0e0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.auth__input--phone {
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px 16px 14px 10px;
  font-size: var(--font-size-sm);
}

.auth__input--phone:focus {
  outline: none;
  border: none;
}

.request-form__submit {
  width: 100%;
  padding: 16px;
  background: var(--color-accent);
  color: white;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-lg);
  margin-top: 8px;
}

.request-form__submit:hover {
  background: var(--color-accent-hover);
}

.request-form__error {
  padding: 12px 16px;
  background: #ffebee;
  color: #c62828;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.request-form__success {
  padding: 12px 16px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.request-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
