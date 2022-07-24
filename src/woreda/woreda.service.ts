import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWoredaDto } from './dto/create-woreda.dto';
import { UpdateWoredaDto } from './dto/update-woreda.dto';
import { Woreda } from './entities/woreda.entity';

@Injectable()
export class WoredaService {
  constructor(
    @InjectRepository(Woreda)
    private readonly woredaRepository: Repository<Woreda>,
  ) {}

  async create(createWoredaDto: CreateWoredaDto) {
    try {
      const woreda = await this.woredaRepository.create({ ...createWoredaDto });
      const result = await this.woredaRepository.save(woreda);
      if (!result) {
        throw new BadRequestException();
      }
      return result;
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      const results = await this.woredaRepository.find();
      if (!results) {
        throw new NotFoundException();
      }
      return results;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.woredaRepository.findOneBy({ woredaId: id });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new BadRequestException();
    }
  }

  async update(id: string, updateWoredaDto: UpdateWoredaDto) {
    try {
      const result = await this.woredaRepository.update(id, updateWoredaDto);
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
      const result = await this.woredaRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }
}
