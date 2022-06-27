import { Injectable } from '@nestjs/common';
import { CreateWoredaDto } from './dto/create-woreda.dto';
import { UpdateWoredaDto } from './dto/update-woreda.dto';

@Injectable()
export class WoredaService {
  create(createWoredaDto: CreateWoredaDto) {
    return 'This action adds a new woreda';
  }

  findAll() {
    return `This action returns all woreda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} woreda`;
  }

  update(id: number, updateWoredaDto: UpdateWoredaDto) {
    return `This action updates a #${id} woreda`;
  }

  remove(id: number) {
    return `This action removes a #${id} woreda`;
  }
}
