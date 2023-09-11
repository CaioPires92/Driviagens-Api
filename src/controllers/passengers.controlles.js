import { db } from '../database/db.connection.js'

export async function createPassengers(req, res) {
  const { firstName, lastName } = req.body

  try {
    await db.query(
      `INSERT INTO passengers (firstName, lastName) VALUES ($1, $2)`,
      [firstName, lastName]
    )

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getPessengersTravels(req, res) {
  const { name } = req.query

  try {
    const maxResults = 10
    if (maxResults < 1) {
      return res.status(500).json({ message: 'Too many results' })
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
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}
