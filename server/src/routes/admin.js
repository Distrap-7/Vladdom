import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { supabase } from '../supabase.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '../../data')

const router = Router()

function readJSON(file) {
  const path = join(DATA_DIR, file)
  if (!existsSync(path)) return []
  return JSON.parse(readFileSync(path, 'utf-8'))
}

function writeJSON(file, data) {
  writeFileSync(join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8')
}

function getNextId(items) {
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
}

async function isAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return res.status(401).json({ error: 'Unauthorized' })
  req.user = user
  next()
}

router.use(isAdmin)

router.get('/properties', (req, res) => {
  const properties = readJSON('properties.json')
  res.json(properties)
})

router.post('/properties', (req, res) => {
  const properties = readJSON('properties.json')
  const id = getNextId(properties)
  const property = { id, ...req.body, createdAt: new Date().toISOString(), createdBy: req.user.email }
  properties.push(property)
  writeJSON('properties.json', properties)
  res.status(201).json(property)
})

router.put('/properties/:id', (req, res) => {
  const properties = readJSON('properties.json')
  const index = properties.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Not found' })
  properties[index] = { ...properties[index], ...req.body, id: properties[index].id }
  writeJSON('properties.json', properties)
  res.json(properties[index])
})

router.delete('/properties/:id', (req, res) => {
  let properties = readJSON('properties.json')
  const index = properties.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Not found' })
  properties.splice(index, 1)
  writeJSON('properties.json', properties)
  res.json({ success: true })
})

router.get('/news', (req, res) => {
  const news = readJSON('news.json')
  res.json(news)
})

router.post('/news', (req, res) => {
  const news = readJSON('news.json')
  const id = getNextId(news)
  const item = { id, ...req.body, createdAt: new Date().toISOString(), createdBy: req.user.email }
  news.push(item)
  writeJSON('news.json', news)
  res.status(201).json(item)
})

router.put('/news/:id', (req, res) => {
  const news = readJSON('news.json')
  const index = news.findIndex(n => n.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Not found' })
  news[index] = { ...news[index], ...req.body, id: news[index].id }
  writeJSON('news.json', news)
  res.json(news[index])
})

router.delete('/news/:id', (req, res) => {
  let news = readJSON('news.json')
  const index = news.findIndex(n => n.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Not found' })
  news.splice(index, 1)
  writeJSON('news.json', news)
  res.json({ success: true })
})

router.get('/applications', async (req, res) => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

router.put('/applications/:id', async (req, res) => {
  const { status } = req.body
  const { data, error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

router.delete('/applications/:id', async (req, res) => {
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', req.params.id)
  if (error) return res.status(400).json({ error: error.message })
  res.json({ success: true })
})

router.get('/users', async (req, res) => {
  const { data, error } = await supabase.auth.admin.listUsers()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data.users || [])
})

router.delete('/users/:id', async (req, res) => {
  const { error } = await supabase.auth.admin.deleteUser(req.params.id)
  if (error) return res.status(400).json({ error: error.message })
  res.json({ success: true })
})

export default router
