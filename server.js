import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'src/data/db.json'))
const middlewares = jsonServer.defaults()

// Enable CORS for all origins (important for production)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

server.use(middlewares)
server.use(router)

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}`)
})
