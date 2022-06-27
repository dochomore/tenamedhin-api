import { Module } from '@nestjs/common';
import { KebeleService } from './kebele.service';
import { KebeleController } from './kebele.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kebele } from './entities/kebele.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kebele])],
  controllers: [KebeleController],
  providers: [KebeleService],
})
export class KebeleModule {}
