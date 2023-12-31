import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandler)

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Runing server on port ${PORT}`)
})
