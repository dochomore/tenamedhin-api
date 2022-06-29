import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { Credit } from './entities/credit.entity';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
  ) {}

  async create(createCreditDto: CreateCreditDto) {
    try {
      const result = await this.creditRepository.create({ ...createCreditDto });
      return await this.creditRepository.save(result);
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.creditRepository.find();
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const credit = await this.creditRepository.findOneBy({ creditId: id });
      if (!credit) {
        throw new NotFoundException();
      }
      return credit;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(id: string, updateCreditDto: UpdateCreditDto) {
    try {
      const result: UpdateResult = await this.creditRepository.update(id, {
        ...updateCreditDto,
      });

      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async remove(id: string) {
    try {
      const result: DeleteResult = await this.creditRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }
}
