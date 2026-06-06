import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!'
  }

  async checkDatabaseConnection(): Promise<{
    isConnected: boolean
    result: number
  }> {
    const result =
      await this.dataSource.query<{ result: number }[]>('SELECT 1 as result')

    return {
      isConnected: this.dataSource.isInitialized,
      result: Number(result[0].result),
    }
  }
}
