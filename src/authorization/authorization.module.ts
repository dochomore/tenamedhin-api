import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { PermissionModule } from 'src/permission/permission.module';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { AbilityFactory } from './factories/ability.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    PermissionModule,
    AuthorizationModule,
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AbilityFactory],
  exports: [AbilityFactory],
})
export class AuthorizationModule {}
