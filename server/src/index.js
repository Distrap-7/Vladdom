import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import applicationRoutes from './routes/applications.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use(express.static(path.join(__dirname, '../../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
