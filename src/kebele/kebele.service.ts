import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateKebeleDto } from './dto/create-kebele.dto';
import { UpdateKebeleDto } from './dto/update-kebele.dto';
import { KebeleOffice } from './entities/kebele.entity';

@Injectable()
export class KebeleService {
  constructor(
    @InjectRepository(KebeleOffice)
    private readonly kebeleRepository: Repository<KebeleOffice>,
  ) {}
  async create(createKebeleDto: CreateKebeleDto) {
    const { name, code } = createKebeleDto;
    try {
      const keble = this.kebeleRepository.create({ name: name, code: code });
      return await this.kebeleRepository.save(keble);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.kebeleRepository.find();
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.kebeleRepository.findOneBy({ kebeleId: id });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (err) {
      return new NotFoundException();
    }
  }

  async update(id: number, updateKebeleDto: UpdateKebeleDto) {
    try {
      const result: UpdateResult = await this.kebeleRepository.update(id, {
        ...updateKebeleDto,
      });
      if (result.affected === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      return new NotFoundException();
    }
  }

  async remove(id: string) {
    try {
      const result: DeleteResult = await this.kebeleRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      return new NotFoundException();
    }
  }
}
