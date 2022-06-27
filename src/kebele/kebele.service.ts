import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKebeleDto } from './dto/create-kebele.dto';
import { UpdateKebeleDto } from './dto/update-kebele.dto';
import { Kebele } from './entities/kebele.entity';

@Injectable()
export class KebeleService {
  constructor(
    @InjectRepository(Kebele)
    private readonly kebeleRepository: Repository<Kebele>,
  ) {}
  async create(createKebeleDto: CreateKebeleDto) {
    const { name, code } = createKebeleDto;
    const keble = this.kebeleRepository.create({ name: name, code: code });
    return await this.kebeleRepository.save(keble);
  }

  findAll() {
    return `This action returns all kebele`;
  }

  findOne(id: string) {
    return this.kebeleRepository.findOneBy({ kebeleId: id });
  }

  update(id: number, updateKebeleDto: UpdateKebeleDto) {
    return this.kebeleRepository.update(id, { ...updateKebeleDto });
  }

  async remove(id: number) {
    return await this.kebeleRepository.delete(id);
  }
}
