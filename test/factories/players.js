const Faker = require('faker')
const { v4: uuidv4 } = require('uuid')

const { camelToSnakeCase } = require('./utils')

// Factories aren't in Typescript so that they can be used in seeders via Sequelize CLI (within docker container)

const toDigitStr = (num, length = 3) => {
  let numstr = String(num)
  while (numstr.length < length) {
    numstr = '0' + numstr
  }
  return numstr
}

const createPlayer = (testCase = false) => {
  let player = {
    uid: uuidv4(),
    number: toDigitStr(
      Faker.datatype.number({
        min: 1,
        max: 999,
      })
    ),
    name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
    debt: Faker.datatype.number(10000),
    dob: Faker.datatype.string(16),
    address: Faker.address.streetAddress(true),
    city: Faker.address.city(),
    phone: Faker.phone.phoneNumber('+### ### ### ###'),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return !testCase ? camelToSnakeCase(player) : player
}

const createPlayers = (amount, testCase = false) => {
  const players = [...Array(amount)].map(() => createPlayer(testCase))

  return players
}

module.exports = {
  createPlayer,
  createPlayers,
}
