import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
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

  findOne(id: number) {
    return `This action returns a #${id} woreda`;
  }

  update(id: number, updateWoredaDto: UpdateWoredaDto) {
    return `This action updates a #${id} woreda`;
  }

  remove(id: number) {
    return `This action removes a #${id} woreda`;
  }
}
