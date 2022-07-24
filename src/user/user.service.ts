import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOneById(id: string) {
    return `This action returns a #${id} user`;
  }

  findOneByUsername(username: string) {
    return `This action returns a #${username} user`;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | NotFoundException> {
    try {
      const updateResult = await this.userRepository.update(id, {
        ...updateUserDto,
      });
      if (updateResult.affected === 0) {
        throw new NotFoundException();
      }
      return updateResult;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async remove(id: string): Promise<DeleteResult | NotFoundException> {
    try {
      const deleteResult = await this.userRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException();
      }
      return deleteResult;
    } catch (error) {
      return new NotFoundException();
    }
  }
}
