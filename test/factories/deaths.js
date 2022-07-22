const Faker = require('faker')
const { v4: uuidv4 } = require('uuid')

const { camelToSnakeCase } = require('./utils')

// Factories aren't in Typescript so that they can be used in seeders via Sequelize CLI (within docker container)

const createDeath = (testCase = false) => {
  let death = {
    uid: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return !testCase ? camelToSnakeCase(death) : death
}

const createDeaths = (amount, testCase = false) => {
  const deaths = [...Array(amount)].map(() => createDeath(testCase))

  return deaths
}

module.exports = {
  createDeath,
  createDeaths,
}
