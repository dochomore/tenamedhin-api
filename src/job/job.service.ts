import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}
  async create(createJobDto: CreateJobDto) {
    try {
      const { dateOfCreation, jobName } = createJobDto;
      const job = this.jobRepository.create({
        dateOfCreation: dateOfCreation,
        jobName: jobName,
      });
      return await this.jobRepository.save(job);
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.jobRepository.find();
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.jobRepository.findOneBy({ jobUUID: id });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    try {
      const { dateOfCreation, jobName } = updateJobDto;
      const result: UpdateResult = await this.jobRepository.update(id, {
        dateOfCreation: dateOfCreation,
        jobName: jobName,
      });
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const result: DeleteResult = await this.jobRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      return new NotFoundException();
    }
  }
}
