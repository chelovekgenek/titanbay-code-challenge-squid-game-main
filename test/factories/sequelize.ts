export const sequelizeFactory = () => ({
  sequelize: {
    query: jest.fn(),
  },
  Player: {
    findOne: jest.fn(),
  },
  Game: {
    findOne: jest.fn(),
  },
  Death: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
})
