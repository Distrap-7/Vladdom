import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../utils/supabase'

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
      const { data: { user: u } } = await supabase.auth.getUser()
      user.value = u
    } catch {
      user.value = null
    }
    loading.value = false
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    user.value = data.user
    return data
  }

  async function register(name, phone, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } },
    })
    if (error) throw new Error(error.message)
    if (data.user) {
      user.value = data.user
    }
    return data
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, loading, userName, userPhone, userEmail, userInitial, isAuthenticated, initialize, login, register, logout }
})
