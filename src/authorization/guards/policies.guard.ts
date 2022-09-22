import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorators';
import { AbilityFactory } from '../factories/ability.factory';
import { IPolicyHandler } from '../interfaces/policy-handler.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly abilityFactory: AbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<IPolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = await this.abilityFactory.create(user);
    return policyHandlers.every((handler) => {
      return handler.handle(ability);
    });
  }
}
