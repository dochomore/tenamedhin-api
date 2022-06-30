import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
