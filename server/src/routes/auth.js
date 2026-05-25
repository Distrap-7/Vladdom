import { Router } from 'express'
import { supabase } from '../supabase.js'

const router = Router()

router.post('/register', async (req, res) => {
  const { name, phone, email, password } = req.body
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, phone } }
  })
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return res.status(401).json({ error: error.message })
  res.json(data)
})

router.post('/logout', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) {
    await supabase.auth.admin.signOut(token)
  }
  res.json({ success: true })
})

router.get('/session', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.json({ user: null })

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return res.json({ user: null })
  res.json({ user })
})

export default router
