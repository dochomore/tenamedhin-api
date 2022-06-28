import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHealthcareDto } from './dto/create-healthcare.dto';
import { UpdateHealthcareDto } from './dto/update-healthcare.dto';
import { Healthcare } from './entities/healthcare.entity';

@Injectable()
export class HealthcareService {
  constructor(
    @InjectRepository(Healthcare)
    private readonly healthcareRepo: Repository<Healthcare>,
  ) {}
  async create(createHealthcareDto: CreateHealthcareDto) {
    const { name, code } = createHealthcareDto;
    try {
      const healthcare = await this.healthcareRepo.create({
        name: name,
        code: code,
      });
      return await this.healthcareRepo.save(healthcare);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all healthcare`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthcare`;
  }

  update(id: number, updateHealthcareDto: UpdateHealthcareDto) {
    return `This action updates a #${id} healthcare`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthcare`;
  }
}
