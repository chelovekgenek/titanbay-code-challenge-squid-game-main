import { Optional } from 'sequelize'

import { Death } from '../src/models/death'

import { createDeath } from './factories/deaths'

class DeathMock {
  public createObjectByConstructor(opts: Optional<any, string>) {
    new Death(opts)
  }
}

jest.mock('../src/models/death')

beforeEach(async () => {
  jest.resetAllMocks()
})

describe('Test Deaths', () => {
  it('should return the exact given properties for the model', () => {
    const death: any = createDeath(true)
    new DeathMock().createObjectByConstructor(death)
    expect(Death).toBeCalledWith(expect.objectContaining(death))

    expect(typeof death.uid).toBe('string')
    expect(death.createdAt instanceof Date).toBe(true)
    expect(death.updatedAt instanceof Date).toBe(true)

    const deathSnakeCase: any = createDeath(false)
    expect(deathSnakeCase.created_at instanceof Date).toBe(true)
    expect(deathSnakeCase.updated_at instanceof Date).toBe(true)
  })
})
