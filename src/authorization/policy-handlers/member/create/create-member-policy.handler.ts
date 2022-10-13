import { Action } from 'src/authorization/enums/action';
import { AppAbility } from 'src/authorization/factories/ability.factory';
import { IPolicyHandler } from 'src/authorization/interfaces/policy-handler.interface';
import { MemberType } from 'src/constants';

export class CreateMemberPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.CREATE, MemberType); // carachter casing matters M !== m
  }
}
