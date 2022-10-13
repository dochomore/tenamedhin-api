import { Action } from 'src/authorization/enums/action';
import { AppAbility } from 'src/authorization/factories/ability.factory';
import { IPolicyHandler } from 'src/authorization/interfaces/policy-handler.interface';
import { MemberType } from 'src/constants';

export class ManageMemberPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.MANAGE, MemberType);
  }
}
