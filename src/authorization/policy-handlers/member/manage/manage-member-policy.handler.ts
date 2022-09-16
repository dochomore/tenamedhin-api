import { Action } from 'src/authorization/enums/action';
import { AppAbility } from 'src/authorization/factories/ability.factory';
import { IPolicyHandler } from 'src/authorization/interfaces/policy-handler.interface';
import { Member } from 'src/member/entities/member.entity';

export class ManageMemberPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.MANAGE, Member);
  }
}
