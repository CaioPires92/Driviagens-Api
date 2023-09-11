import { travelRepository } from '../repositories/travels.repositories.js'

async function create(passengerId, flightId) {
  return travelRepository.create(passengerId, flightId)
}

export const travelService = { create }
