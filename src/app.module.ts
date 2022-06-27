import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KebeleModule } from './kebele/kebele.module';
import { HealthcareModule } from './healthcare/healthcare.module';
import { HospitalModule } from './hospital/hospital.module';

@Module({
  imports: [KebeleModule, HealthcareModule, HospitalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
