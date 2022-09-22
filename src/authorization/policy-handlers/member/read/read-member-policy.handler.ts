import { Action } from 'src/authorization/enums/action';
import { AppAbility } from 'src/authorization/factories/ability.factory';
import { IPolicyHandler } from 'src/authorization/interfaces/policy-handler.interface';

export class ReadMemberPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.READ, 'Member');
  }
}
