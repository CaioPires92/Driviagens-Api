import { passengerRepository } from "../repositories/passengers.repositories.js"

async function createPassenger(firstName, lastName) {
  await passengerRepository.createPassenger(firstName, lastName)
}

async function findPassengersByName(name, maxResults) {
  return passengerRepository.findPassengersByName(name, maxResults)
}

export const passengerService = { createPassenger, findPassengersByName }
