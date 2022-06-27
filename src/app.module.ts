import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KebeleModule } from './kebele/kebele.module';
import { HealthcareModule } from './healthcare/healthcare.module';
import { HospitalModule } from './hospital/hospital.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditModule } from './credit/credit.module';
import { Kebele } from './kebele/entities/kebele.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KebeleModule,
    HealthcareModule,
    HospitalModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Kebele],
      synchronize: true,
    }),
    CreditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
