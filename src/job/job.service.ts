import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
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
    } catch (error) {}
  }

  async findAll() {
    try {
      return await this.jobRepository.find();
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
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
