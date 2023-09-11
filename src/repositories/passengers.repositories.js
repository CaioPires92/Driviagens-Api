import { db } from '../database/db.connection.js'

async function createPassenger(firstName, lastName) {
  await db.query(
    `INSERT INTO passengers (firstName, lastName) VALUES ($1, $2)`,
    [firstName, lastName]
  )
}

async function findPassengersByName(name, maxResults) {
  if (maxResults < 1) {
    throw new Error('Too many results')
  }

  let query = `
    SELECT CONCAT(passengers.firstname, ' ', passengers.lastname) AS passenger, COUNT(travels.id) AS travels
    FROM passengers
    LEFT JOIN travels ON passengers.id = travels.passengerid
    WHERE 1=1`

  const params = []

  if (name) {
    query +=
      " AND CONCAT(passengers.firstname, ' ', passengers.lastname) ILIKE $1"
    params.push(`%${name}%`)
  }

  query += " GROUP BY CONCAT(passengers.firstname, ' ', passengers.lastname)"
  query += ' ORDER BY travels DESC'
  query += ` LIMIT ${maxResults}`

  const result = await db.query(query, params)
  return result.rows
}

export const passengerRepository = { createPassenger, findPassengersByName }
