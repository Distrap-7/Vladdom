const API_BASE = import.meta.env.VITE_API_URL || ''

async function authHeaders() {
  const { supabase } = await import('./supabase.js')
  const { data } = await supabase.auth.getSession()
  return { Authorization: `Bearer ${data.session?.access_token}` }
}

export async function api(path, options = {}) {
  const headers = { ...options.headers, ...(await authHeaders()) }
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(options.body)
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || res.statusText)
  }
  return res.json()
}
