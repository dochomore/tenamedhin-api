import { Module } from '@nestjs/common';
import { HealthcareService } from './healthcare.service';
import { HealthcareController } from './healthcare.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Healthcare } from './entities/healthcare.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Healthcare])],
  controllers: [HealthcareController],
  providers: [HealthcareService],
})
export class HealthcareModule {}
