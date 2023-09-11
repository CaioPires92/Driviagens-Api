import { db } from '../database/db.connection.js'

async function create(req, res) {
  const { name } = req.body

  try {
    const city = await db.query(`SELECT * FROM cities WHERE name=$1;`, [name])

    if (city.rowCount !== 0)
      return res.status(409).send({ message: 'Cidade já existe!' })

    await db.query(`INSERT INTO cities (name) VALUES ($1)`, [name])

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const citiesController = { create }
