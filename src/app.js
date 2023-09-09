import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/teste', (req, res) => {
  res.send('funcionooooouuuuuu')
})

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Runing server on port ${PORT}`)
})
