import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import { Death } from './mockbin.types'

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
})

export class MockbinFacade {
  private readonly client = axios.create({
    baseURL: 'https://mockbin.org/bin/',
    timeout: 5000,
    adapter: cache.adapter,
  })

  async getDeaths(): Promise<Death[]> {
    const {
      data: { data },
    } = await this.client.get<{ data: Death[] }>(
      '1af3e980-6970-4da6-a70d-98737dbc1571'
    )

    return data
  }
}
