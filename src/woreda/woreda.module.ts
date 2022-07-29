import { Module } from '@nestjs/common';
import { WoredaService } from './woreda.service';
import { WoredaController } from './woreda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WoredaOffice } from './entities/woreda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WoredaOffice])],
  controllers: [WoredaController],
  providers: [WoredaService],
})
export class WoredaModule {}
