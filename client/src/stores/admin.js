import { supabase } from '../utils/supabase'

async function safeQuery(fn) {
  try { return await fn() }
  catch (e) {
    console.warn('[Admin] Supabase error:', e.message)
    throw e
  }
}

export async function fetchProperties() {
  return safeQuery(async () => {
    const { data, error } = await supabase.from('properties').select('*').order('id', { ascending: false })
    if (error) throw new Error(error.message)
    return data || []
  })
}

export async function createProperty(data) {
  const { error } = await supabase.from('properties').insert([data])
  if (error) throw new Error(error.message)
}

export async function updateProperty(id, data) {
  const { error } = await supabase.from('properties').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteProperty(id) {
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function fetchNews() {
  return safeQuery(async () => {
    const { data, error } = await supabase.from('news').select('*').order('id', { ascending: false })
    if (error) throw new Error(error.message)
    return data || []
  })
}

export async function createNews(data) {
  const { error } = await supabase.from('news').insert([data])
  if (error) throw new Error(error.message)
}

export async function updateNews(id, data) {
  const { error } = await supabase.from('news').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteNews(id) {
  const { error } = await supabase.from('news').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function fetchApplications() {
  return safeQuery(async () => {
    const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data || []
  })
}

export async function updateApplicationStatus(id, status) {
  const { error } = await supabase.from('applications').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteApplication(id) {
  const { error } = await supabase.from('applications').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
