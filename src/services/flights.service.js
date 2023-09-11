import dayjs from 'dayjs'
import { db } from '../database/db.connection.js'
import { flightsRepositories } from '../repositories/flights.repositories.js'
import { errors } from '../errors/errors.js'

async function create(origin, destination, date) {
  const cityOrigin = await db.query(`SELECT * FROM cities WHERE id=$1`, [
    origin
  ])

  const citydestination = await db.query(`SELECT * FROM cities WHERE id=$1`, [
    destination
  ])

  if (cityOrigin.rowCount === 0 || citydestination.rowCount === 0)
    throw errors.notFound()

  if (cityOrigin.rows[0].id === citydestination.rows[0].id)
    throw errors.conflict()

  await flightsRepositories.create(origin, destination, date)
}

async function find(origin, destination, smallerDate, biggerDate) {
  const flights = await flightsRepositories.find(
    origin,
    destination,
    smallerDate,
    biggerDate
  )

  const formattedFlights = flights.map(flight => ({
    id: flight.id,
    origin: flight.origin,
    destination: flight.destination,
    date: dayjs(flight.date).format('DD-MM-YYYY')
  }))

  return formattedFlights
}

export const flightsService = { create, find }
