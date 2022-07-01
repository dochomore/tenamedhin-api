import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { Relationship } from './entities/relationship.entity';

@Injectable()
export class RelationshipService {
  constructor(
    @InjectRepository(Relationship)
    private readonly realtionRepo: Repository<Relationship>,
  ) {}

  async create(createRelationshipDto: CreateRelationshipDto) {
    try {
      const { relationName } = createRelationshipDto;
      const result = await this.realtionRepo.create({
        relationName: relationName,
      });
      return await this.realtionRepo.save(result);
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.realtionRepo.find();
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.realtionRepo.findOneBy({ relationUid: id });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(id: string, updateRelationshipDto: UpdateRelationshipDto) {
    try {
      const result: UpdateResult = await this.realtionRepo.update(id, {
        ...updateRelationshipDto,
      });
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
      const result = await this.realtionRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }
}
