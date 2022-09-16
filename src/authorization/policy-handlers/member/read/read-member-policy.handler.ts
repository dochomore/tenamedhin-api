import { Action } from 'src/authorization/enums/action';
import { AppAbility } from 'src/authorization/factories/ability.factory';
import { Member } from 'src/member/entities/member.entity';

export class ReadMemberPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.READ, Member);
  }
}
