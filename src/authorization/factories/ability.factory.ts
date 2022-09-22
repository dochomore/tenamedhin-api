import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Permission } from 'src/permission/entities/permission.entity';
import { PermissionService } from 'src/permission/permission.service';
import { Action } from '../enums/action';

/**
 * this factory will create ability object
 */

// type Subjects = InferSubjects<typeof User | typeof Member> | 'all';
export type Subjects = any;
export type AppAbility = Ability<[Action, Subjects]>;

/**
 * 
1. User sends request to access some resources.
2. If it's not authenticated, sends back an error that he needs to login.
3. If it's authenticated, the app fetches it together with permissions from the database.
4. The app creates an Ability instance based on user's permissions
5. Using Ability instance, the app checks whether user can do a particular action on requested resource.
6. If not, it's sends error back that user has no permission to do what he attempted to do.
7. If user has permissions, then proceed with the actual action.
 */

interface CaslPermission {
  action: Action;
  subject: string;
}

@Injectable()
export class AbilityFactory {
  constructor(private readonly permissionServie: PermissionService) {}

  async create(user: any) {
    const { sub } = user;

    const dbPermission: Permission[] =
      await this.permissionServie.findPermission(sub);
    const caslPermission: CaslPermission[] = dbPermission.map((permission) => ({
      action: permission.action,
      subject: permission.resource.resourceName,
    }));

    const ability = new Ability<[Action, Subjects]>(caslPermission);
    console.log('🍇', ability.can(Action.READ, 'Member'));
    console.log('🍇', ability);
    return ability;
  }
}
