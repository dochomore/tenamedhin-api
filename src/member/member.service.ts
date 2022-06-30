import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberService: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    try {
      const {
        dateOfRegistration,
        memberId,
        firstName,
        fatherName,
        gfName,
        gender,
        age,
        willPay,
        idCardIssued,
      } = createMemberDto;
      const member = await this.memberService.create({
        dateOfRegistration: dateOfRegistration,
        memberId: memberId,
        firstName: firstName,
        fatherName: fatherName,
        gfName: gfName,
        gender: gender,
        age: age,
        willPay: willPay,
        idCardIssued: idCardIssued,
      });
      return await this.memberService.save(member);
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.memberService.find();
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.memberService.findOneBy({ memberUid: id });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    try {
      const result: UpdateResult = await this.memberService.update(id, {
        ...updateMemberDto,
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
      const result: DeleteResult = await this.memberService.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      return new NotFoundException();
    }
  }
}
