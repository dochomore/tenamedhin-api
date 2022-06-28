import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  update(id: number, updateHospitalDto: UpdateHospitalDto) {
    return `This action updates a #${id} hospital`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospital`;
  }
}
