import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, setToken } from '../utils/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  const userName = computed(() => user.value?.user_metadata?.name ?? '')
  const userPhone = computed(() => user.value?.user_metadata?.phone ?? '')
  const userEmail = computed(() => user.value?.email ?? '')
  const userInitial = computed(() => {
    const name = userName.value
    return name ? name.charAt(0).toUpperCase() : (userEmail.value ? userEmail.value.charAt(0).toUpperCase() : '?')
  })
  const isAuthenticated = computed(() => !!user.value)

  async function initialize() {
    loading.value = true
    try {
      const data = await api('/api/auth/session')
      user.value = data.user
    } catch {
      user.value = null
    }
    loading.value = false
  }

  async function login(email, password) {
    const data = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setToken(data.session?.access_token)
    user.value = data.user
    return data
  }

  async function register(name, phone, email, password) {
    const data = await api('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, phone, email, password }),
    })
    if (data.session?.access_token) {
      setToken(data.session.access_token)
      user.value = data.user
    }
    return data
  }

  async function logout() {
    try {
      await api('/api/auth/logout', { method: 'POST' })
    } catch {}
    setToken(null)
    user.value = null
  }

  return { user, loading, userName, userPhone, userEmail, userInitial, isAuthenticated, initialize, login, register, logout }
})
