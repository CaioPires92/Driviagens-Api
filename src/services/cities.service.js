import { db } from '../database/db.connection.js'
import { errors } from '../errors/errors.js'
import { citiesRepositories } from '../repositories/cities.repositories.js'

async function create(name) {
  const city = await db.query(`SELECT * FROM cities WHERE name=$1;`, [name])

  if (city.rowCount !== 0) throw errors.conflict()

  await citiesRepositories.create(name)

  // return res.status(409).send({ message: 'Cidade já existe!' })
}

export const citiesServices = { create }
