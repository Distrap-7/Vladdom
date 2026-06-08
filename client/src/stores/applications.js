import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../utils/supabase'

export const useApplicationsStore = defineStore('applications', () => {
  const loading = ref(false)

  async function createApplication({ name, phone, consultation_type, message }) {
    const { data, error } = await supabase
      .from('applications')
      .insert([{ name, phone, consultation_type, message: message || null }])
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async function fetchUserApplications(phone) {
    loading.value = true
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('phone', phone)
      .order('created_at', { ascending: false })

    loading.value = false
    if (error) throw new Error(error.message)
    return data
  }

  return { createApplication, fetchUserApplications, loading }
})
