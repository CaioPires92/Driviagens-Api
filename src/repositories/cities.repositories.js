import { db } from '../database/db.connection.js'

async function create(name) {
  await db.query(`INSERT INTO cities (name) VALUES ($1)`, [name])
}

export const citiesRepositories = { create }
