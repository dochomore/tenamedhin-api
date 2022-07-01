import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      const {
        dateOfRegistration,
        firstName,
        fatherName,
        gfName,
        gender,
        age,
        dateOfBirth,
      } = createFamilymemberDto;
      const member = await this.memberRepository.create({
        dateOfRegistration: dateOfRegistration,
        firstName: firstName,
        fatherName: fatherName,
        gfName: gfName,
        gender: gender,
        age: age,
        dateOfBirth: dateOfBirth,
      });

      return await this.memberRepository.save(member);
    } catch (error) {
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

  findOne(id: number) {
    return `This action returns a #${id} familymember`;
  }

  update(id: number, updateFamilymemberDto: UpdateFamilymemberDto) {
    return `This action updates a #${id} familymember`;
  }

  remove(id: number) {
    return `This action removes a #${id} familymember`;
  }
}
