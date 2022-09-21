import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { CreditModule } from './credit/credit.module';
import { Credit } from './credit/entities/credit.entity';
import { Healthcare } from './healthcare/entities/healthcare.entity';
import { HealthcareModule } from './healthcare/healthcare.module';
import { Hospital } from './hospital/entities/hospital.entity';
import { HospitalModule } from './hospital/hospital.module';
import { Job } from './job/entities/job.entity';
import { JobModule } from './job/job.module';
import { KebeleOffice } from './kebele/entities/kebele.entity';
import { KebeleModule } from './kebele/kebele.module';
import { Member } from './member/entities/member.entity';
import { Familymember } from './member/familymember/entities/familymember.entity';
import { MemberModule } from './member/member.module';
import { Organization } from './organization/entities/organization.entity';
import { OrganizationModule } from './organization/organization.module';
import { Permission } from './permission/entities/permission.entity';
import { PermissionModule } from './permission/permission.module';
import { Relationship } from './relationship/entities/relationship.entity';
import { RelationshipModule } from './relationship/relationship.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { WoredaOffice } from './woreda/entities/woreda.entity';
import { WoredaModule } from './woreda/woreda.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { ResourceModule } from './resource/resource.module';
import { Resource } from './resource/entities/resource.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
        KebeleOffice,
        Hospital,
        Healthcare,
        Credit,
        Member,
        Job,
        Organization,
        Familymember,
        Relationship,
        User,
        WoredaOffice,
        Permission,
        Role,
        Resource
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
    AuthorizationModule,
    PermissionModule,
    RoleModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
