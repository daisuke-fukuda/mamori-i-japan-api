import { Moment } from 'moment-timezone'
import { ApiProperty } from '@nestjs/swagger'

export class User {
  userId: string
  created?: Moment
}

export class UserProfile {
  @ApiProperty({ example: 14 })
  prefecture: number

  @ApiProperty({ example: 'A12B34' })
  organizationCode?: string
}
