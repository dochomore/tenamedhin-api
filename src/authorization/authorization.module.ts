import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { AbilityFactory } from './factories/ability.factory';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AbilityFactory],
  exports: [AbilityFactory],
})
export class AuthorizationModule {}
