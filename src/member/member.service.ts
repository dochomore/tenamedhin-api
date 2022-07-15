import {
  BadRequestException,
  Injectable,
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
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(
    createMemberDto: CreateMemberDto,
  ): Promise<Member | BadRequestException> {
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

      const member = this.memberRepository.create({
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

      return this.memberRepository.save(member);
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      return this.memberRepository.find();
    } catch (error) {
      return new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.memberRepository.findOneBy({ memberUid: id });
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
      const result: UpdateResult = await this.memberRepository.update(id, {
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
