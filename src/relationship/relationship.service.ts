import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: number) {
    return `This action returns a #${id} relationship`;
  }

  update(id: number, updateRelationshipDto: UpdateRelationshipDto) {
    return `This action updates a #${id} relationship`;
  }

  remove(id: number) {
    return `This action removes a #${id} relationship`;
  }
}
