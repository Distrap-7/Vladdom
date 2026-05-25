import { Router } from 'express'
import { supabase } from '../supabase.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, phone, consultation_type, message } = req.body
  const { data, error } = await supabase
    .from('applications')
    .insert([{ name, phone, consultation_type, message: message || null }])
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

router.get('/', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' })

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('phone', user.user_metadata?.phone)
    .order('created_at', { ascending: false })

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

export default router
