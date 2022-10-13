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
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PermissionCondition {}

interface CaslPermission {
  action: Action;
  subject: string;
  conditions?: PermissionCondition;
}

@Injectable()
export class AbilityFactory {
  constructor(private readonly permissionServie: PermissionService) {}

  async create(user: any) {
    const { userId } = user;

    const dbPermission: Permission[] =
      await this.permissionServie.findPermission(userId);
    const caslPermission: CaslPermission[] = dbPermission.map((permission) => {
      return {
        action: permission.action,
        subject: permission.resource.resourceName,
        conditions: this.parseCondition(permission.conditions, user),
      };
    });

    const ability = new Ability<[Action, Subjects]>(caslPermission);
    return ability;
  }

  private parseCondition(
    condition: PermissionCondition,
    variables: Record<string, any>,
  ): PermissionCondition {
    if (!condition) return null;
    const parsedCondition = {};
    for (const [key, rawValue] of Object.entries(condition)) {
      if (rawValue !== null && typeof rawValue === 'object') {
        const value = this.parseCondition(rawValue, variables);
        parsedCondition[key] = value;
        continue;
      }
      if (typeof rawValue !== 'string') {
        parsedCondition[key] = rawValue;
        continue;
      }
      // find placeholder "${}""
      const matches = /^\\${([a-zA-Z0-9]+)}$/.exec(rawValue);
      if (!matches) {
        parsedCondition[key] = rawValue;
        continue;
      }
      const value = variables[matches[1]];
      if (typeof value === 'undefined') {
        throw new ReferenceError(`Variable is not defined`);
      }
      parsedCondition[key] = value;
    }
    return parsedCondition;
  }
}
