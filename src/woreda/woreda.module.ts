import { Module } from '@nestjs/common';
import { WoredaService } from './woreda.service';
import { WoredaController } from './woreda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Woreda } from './entities/woreda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Woreda])],
  controllers: [WoredaController],
  providers: [WoredaService],
})
export class WoredaModule {}
