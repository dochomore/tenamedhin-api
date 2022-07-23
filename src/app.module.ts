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
import { WoredaModule } from './woreda/woreda.module';
import { Hospital } from './hospital/entities/hospital.entity';
import { Healthcare } from './healthcare/entities/healthcare.entity';
import { Credit } from './credit/entities/credit.entity';
import { MemberModule } from './member/member.module';
import { Member } from './member/entities/member.entity';
import { JobModule } from './job/job.module';
import { Job } from './job/entities/job.entity';
import { OrganizationModule } from './organization/organization.module';
import { Organization } from './organization/entities/organization.entity';
import { Familymember } from './member/familymember/entities/familymember.entity';
import { RelationshipModule } from './relationship/relationship.module';
import { Relationship } from './relationship/entities/relationship.entity';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

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
      entities: [
        Kebele,
        Hospital,
        Healthcare,
        Credit,
        Member,
        Job,
        Organization,
        Familymember,
        Relationship,
      ],
      synchronize: true,
    }),
    CreditModule,
    WoredaModule,
    MemberModule,
    JobModule,
    OrganizationModule,
    RelationshipModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
