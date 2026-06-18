import { supabase } from '../utils/supabase'

function handleError(error) {
  if (error) throw new Error(error.message)
}

export async function fetchProperties() {
  const { data, error } = await supabase.from('properties').select('*').order('id', { ascending: false })
  handleError(error)
  return data || []
}

export async function createProperty(data) {
  const { error } = await supabase.from('properties').insert([{ ...data, createdBy: (await supabase.auth.getUser()).data.user?.email }])
  handleError(error)
}

export async function updateProperty(id, data) {
  const { error } = await supabase.from('properties').update(data).eq('id', id)
  handleError(error)
}

export async function deleteProperty(id) {
  const { error } = await supabase.from('properties').delete().eq('id', id)
  handleError(error)
}

export async function fetchNews() {
  const { data, error } = await supabase.from('news').select('*').order('id', { ascending: false })
  handleError(error)
  return data || []
}

export async function createNews(data) {
  const { error } = await supabase.from('news').insert([data])
  handleError(error)
}

export async function updateNews(id, data) {
  const { error } = await supabase.from('news').update(data).eq('id', id)
  handleError(error)
}

export async function deleteNews(id) {
  const { error } = await supabase.from('news').delete().eq('id', id)
  handleError(error)
}

export async function fetchApplications() {
  const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false })
  handleError(error)
  return data || []
}

export async function updateApplicationStatus(id, status) {
  const { error } = await supabase.from('applications').update({ status }).eq('id', id)
  handleError(error)
}

export async function deleteApplication(id) {
  const { error } = await supabase.from('applications').delete().eq('id', id)
  handleError(error)
}
