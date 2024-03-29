import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateFamilymemberDto } from './dto/create-familymember.dto';
import { UpdateFamilymemberDto } from './dto/update-familymember.dto';
import { Familymember } from './entities/familymember.entity';

@Injectable()
export class FamilymemberService {
  constructor(
    @InjectRepository(Familymember)
    private readonly memberRepository: Repository<Familymember>,
  ) {}

  async create(createFamilymemberDto: CreateFamilymemberDto) {
    try {
      const member = await this.memberRepository.create(createFamilymemberDto);

      return await this.memberRepository.save(member);
    } catch {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.memberRepository.find();
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.memberRepository.findOneBy({ memberUID: id });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(id: string, updateFamilymemberDto: UpdateFamilymemberDto) {
    try {
      const result: UpdateResult = await this.memberRepository.update(id, {
        ...updateFamilymemberDto,
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
      const result: DeleteResult = await this.memberRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }
}
