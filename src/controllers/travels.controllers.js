import { db } from '../database/db.connection.js'

export async function createTravels(req, res) {
  const { passengerId, flightId } = req.body

  try {
    const passenger = await db.query(`SELECT * FROM passengers WHERE id=$1`, [
      passengerId
    ])
    const flight = await db.query(`SELECT * FROM flights WHERE id=$1`, [
      flightId
    ])

    if (passenger.rowCount === 0 || flight.rowCount === 0) {
      return res.status(404).send('passejeiro ou voo não encontrado!')
    }

    await db.query(
      `INSERT INTO travels (passengerId, flightId) VALUES ($1, $2)`,
      [passengerId, flightId]
    )

    return res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
