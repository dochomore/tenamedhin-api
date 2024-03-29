import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permisionRepo: Repository<Permission>,
  ) {}

  create(createPermissionDto: CreatePermissionDto) {
    const permission = this.permisionRepo.create(createPermissionDto);
    return this.permisionRepo.save(permission);
  }

  async findPermission(userId: string) {
    return this.permisionRepo
      .createQueryBuilder('permission')
      .innerJoinAndSelect('permission.role', 'role')
      .innerJoinAndSelect('permission.resource', 'resource')
      .innerJoinAndSelect('role.user', 'user')
      .where('user.userId =:userId', { userId })
      .getMany();
  }

  async findAll() {
    return await this.permisionRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
