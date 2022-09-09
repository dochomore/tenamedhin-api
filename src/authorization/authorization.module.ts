import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { AbilityFactory } from './factories/ability.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AbilityFactory],
  exports: [AbilityFactory],
})
export class AuthorizationModule {}
