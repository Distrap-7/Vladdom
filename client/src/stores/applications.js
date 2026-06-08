import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../utils/supabase'

export const useApplicationsStore = defineStore('applications', () => {
  const loading = ref(false)

  async function createApplication({ name, phone, consultation_type, message }) {
    const data = await api('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ name, phone, consultation_type, message }),
    })
    return data
  }

  async function fetchUserApplications() {
    loading.value = true
    const data = await api('/api/applications')
    loading.value = false
    return data
  }

  return { createApplication, fetchUserApplications, loading }
})
