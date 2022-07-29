import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateWoredaDto } from './dto/create-woreda.dto';
import { UpdateWoredaDto } from './dto/update-woreda.dto';
import { WoredaOffice } from './entities/woreda.entity';

@Injectable()
export class WoredaService {
  constructor(
    @InjectRepository(WoredaOffice)
    private readonly woredaRepository: Repository<WoredaOffice>,
  ) {}

  async create(
    createWoredaDto: CreateWoredaDto,
  ): Promise<WoredaOffice | BadRequestException> {
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

  async findAll(): Promise<NotFoundException | WoredaOffice[]> {
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

  async findOne(id: string): Promise<NotFoundException | WoredaOffice> {
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

  async update(
    id: string,
    updateWoredaDto: UpdateWoredaDto,
  ): Promise<UpdateResult | NotFoundException> {
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

  async remove(id: string): Promise<DeleteResult | NotFoundException> {
    try {
      const result: DeleteResult = await this.woredaRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }
}
