import { Injectable } from '@nestjs/common';
import { CreateKebeleDto } from './dto/create-kebele.dto';
import { UpdateKebeleDto } from './dto/update-kebele.dto';

@Injectable()
export class KebeleService {
  create(createKebeleDto: CreateKebeleDto) {
    return 'This action adds a new kebele';
  }

  findAll() {
    return `This action returns all kebele`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kebele`;
  }

  update(id: number, updateKebeleDto: UpdateKebeleDto) {
    return `This action updates a #${id} kebele`;
  }

  remove(id: number) {
    return `This action removes a #${id} kebele`;
  }
}
