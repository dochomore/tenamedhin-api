import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  encrypt = async (value: string) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(value, salt);
  };

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedValue = await this.encrypt(createUserDto.password);

      const user: User = await this.userRepository.create({
        ...createUserDto,
        password: hashedValue,
      });

      const saved: User = await this.userRepository.save(user);

      if (!saved) {
        throw new BadRequestException();
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...otherAttrs } = saved;

      return otherAttrs;
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      const result: User[] = await this.userRepository.find();

      if (!result) {
        throw new NotFoundException();
      }

      const users = result.map((user: User) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...others } = user;
        return others;
      });

      return users;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async findOneById(id: string) {
    try {
      const result: User = await this.userRepository.findOneBy({
        userId: id,
      });

      if (!result) {
        throw new NotFoundException();
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...others } = result;
      return others;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async findOneByUsername(username: string): Promise<User | NotFoundException> {
    try {
      const result: User = await this.userRepository.findOneBy({
        username: username,
      });

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | NotFoundException> {
    try {
      const updateResult: UpdateResult = await this.userRepository.update(id, {
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

  async updateRefreshToken(
    id: string,
    token: string,
  ): Promise<UpdateResult | NotFoundException> {
    try {
      const updateResult: UpdateResult = await this.userRepository.update(id, {
        refreshToken: token,
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
      const deleteResult: DeleteResult = await this.userRepository.delete(id);

      if (deleteResult.affected === 0) {
        throw new NotFoundException();
      }

      return deleteResult;
    } catch (error) {
      return new NotFoundException();
    }
  }
}
