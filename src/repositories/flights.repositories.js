import { db } from '../database/db.connection.js'

async function create(origin, destination, date) {
  await db.query(
    `INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3);`,
    [origin, destination, date]
  )
}

async function find(origin, destination, smallerDate, biggerDate) {
  let query = `
      SELECT flights.id, cities_origin.name AS origin, cities_destination.name AS destination, flights.date
      FROM flights
      INNER JOIN cities AS cities_origin ON flights.origin = cities_origin.id
      INNER JOIN cities AS cities_destination ON flights.destination = cities_destination.id
      WHERE 1=1`

  const params = []

  if (origin && destination) {
    // Quando ambos origin e destination estão presentes
    query += ' AND cities_origin.name = $1 AND cities_destination.name = $2'
    params.push(origin, destination)
  } else if (origin) {
    // Quando apenas origin está presente
    query += ' AND cities_origin.name = $1'
    params.push(origin)
  } else if (destination) {
    // Quando apenas destination está presente
    query += ' AND cities_destination.name = $1'
    params.push(destination)
  }

  if (smallerDate && biggerDate) {
    query += ' AND flights.date BETWEEN $3 AND $4'
    params.push(smallerDate, biggerDate)
  }

  // Ordenar por data
  query += ' ORDER BY flights.date'

  // Executar a consulta no banco de dados
  const result = await db.query(query, params)

  return result.rows
}

export const flightsRepositories = { create, find }
