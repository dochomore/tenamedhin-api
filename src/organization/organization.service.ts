import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      const { dateOfCreation, organizationName } = createOrganizationDto;
      const result = this.orgRepository.create({
        dateOfCreation: dateOfCreation,
        organizationName: organizationName,
      });
      return await this.orgRepository.save(result);
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.orgRepository.find();
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.orgRepository.findOneBy({
        organizationUUID: id,
      });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    try {
      const result: UpdateResult = await this.orgRepository.update(id, {
        ...updateOrganizationDto,
      });
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
