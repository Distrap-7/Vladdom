const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function getToken() {
  return localStorage.getItem('vladdom_token')
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('vladdom_token', token)
  } else {
    localStorage.removeItem('vladdom_token')
  }
}

export async function api(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}
