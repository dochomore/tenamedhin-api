import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Hospital } from './entities/hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>,
  ) {}
  async create(createHospitalDto: CreateHospitalDto) {
    try {
      const { name, code } = createHospitalDto;
      const hospital = await this.hospitalRepository.create({
        name: name,
        code: code,
      });
      return await this.hospitalRepository.save(hospital);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    try {
      return this.hospitalRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.hospitalRepository.findOneBy({
        hospitalId: id,
      });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(id: string, updateHospitalDto: UpdateHospitalDto) {
    try {
      const result: UpdateResult = await this.hospitalRepository.update(id, {
        ...updateHospitalDto,
      });
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} hospital`;
  }
}
