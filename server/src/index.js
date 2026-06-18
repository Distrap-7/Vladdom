import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import applicationRoutes from './routes/applications.js'
import adminRoutes from './routes/admin.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }))
app.use(express.json({ limit: '10mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/admin', adminRoutes)

if (isProd) {
  const distPath = join(__dirname, '../../client/dist')
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' })
    res.sendFile(join(distPath, 'index.html'))
  })
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: isProd ? 'production' : 'development' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${isProd ? 'production' : 'development'}]`)
})
