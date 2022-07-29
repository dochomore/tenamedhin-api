import { Module } from '@nestjs/common';
import { KebeleService } from './kebele.service';
import { KebeleController } from './kebele.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KebeleOffice } from './entities/kebele.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KebeleOffice])],
  controllers: [KebeleController],
  providers: [KebeleService],
})
export class KebeleModule {}
