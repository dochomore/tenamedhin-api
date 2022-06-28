import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
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
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.healthcareRepo.find();
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = this.healthcareRepo.findOneBy({ healthcareId: id });
      if (!result) {
        throw new NotFoundException();
      }
    } catch (error) {}
  }

  update(id: number, updateHealthcareDto: UpdateHealthcareDto) {
    return `This action updates a #${id} healthcare`;
  }

  async remove(id: string) {
    try {
      const result: DeleteResult = await this.healthcareRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }
}
