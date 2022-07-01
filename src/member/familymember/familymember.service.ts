import { Injectable } from '@nestjs/common';
import { CreateFamilymemberDto } from './dto/create-familymember.dto';
import { UpdateFamilymemberDto } from './dto/update-familymember.dto';

@Injectable()
export class FamilymemberService {
  create(createFamilymemberDto: CreateFamilymemberDto) {
    return 'This action adds a new familymember';
  }

  findAll() {
    return `This action returns all familymember`;
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
