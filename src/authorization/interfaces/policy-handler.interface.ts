import { AppAbility } from '../factories/ability.factory';

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}
