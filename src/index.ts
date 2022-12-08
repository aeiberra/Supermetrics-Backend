import express from 'express' // ESModules
import dotenv from 'dotenv'
import socialPlatform from './routes/socialPlatform'

/** Declare Variables */
dotenv.config()
export const VERSION = process.env.VERSION ?? 'v1' // Server Version
export const BASE_URL = process.env.URL ?? 'api.supermetrics.com'
const PORT = process.env.PORT ?? '3001' // Server Port

const app = express()
app.use(express.json()) // middleware that transforms the req.body to JSON

// Add headers before the routes are defined
app.use(function (_req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // Pass to next layer of middleware
  next()
})

app.use(`/api/${VERSION}/social`, socialPlatform)

/** Launch Server */
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default server
