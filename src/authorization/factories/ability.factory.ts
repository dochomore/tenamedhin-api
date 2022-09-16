import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entities/member.entity';
import { PermissionService } from 'src/permission/permission.service';
import { User } from 'src/user/entities/user.entity';
import { Action } from '../enums/action';

/**
 * this factory will create ability object
 */

type Subjects = InferSubjects<typeof User | typeof Member> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  constructor(private readonly permissionServie: PermissionService) {}

  create(user: any) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    const { sub } = user;

    this.permissionServie.findPermission(sub).then((permissions) => {
      permissions.forEach((permission) => {
        // create ability
        // define ability
        console.log(permission);
      });
    });

    can(Action.READ, Member);
    cannot(Action.DELETE, User);

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
