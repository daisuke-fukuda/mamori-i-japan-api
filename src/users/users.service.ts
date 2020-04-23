import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { CreateUserDto, CreateUserProfileDto } from './dto/create-user.dto'
import { User } from './classes/user.class'
import { TEMPID_BATCH_SIZE } from './constants'
import { CreateCloseContactsRequestDto } from './dto/create-close-contact.dto'

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  createOneUser(user: CreateUserDto, userProfile?: CreateUserProfileDto) {
    return this.usersRepository.createOne(user, userProfile)
  }

  async findOneUserById(userId: string): Promise<User | undefined> {
    return this.usersRepository.findOneById(userId)
  }

  async getTempIDs(userId: string): Promise<any[]> {
    const tempIDs = await Promise.all(
      [...Array(TEMPID_BATCH_SIZE).keys()].map(async (i) =>
        this.usersRepository.generateTempId(userId, i)
      )
    )

    return tempIDs
  }

  async uploadPositiveList(): Promise<void> {
    return this.usersRepository.uploadPositiveList()
  }

  async createCloseContacts(
    userId: string,
    createCloseContactsRequestDto: CreateCloseContactsRequestDto
  ): Promise<void> {
    await Promise.all(
      createCloseContactsRequestDto.closeContacts.map(async (closeContact) => {
        closeContact.selfUserId = userId
        return this.usersRepository.createOneCloseContact(userId, closeContact)
      })
    )
  }
}
