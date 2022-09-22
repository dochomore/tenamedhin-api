import { Action } from 'src/authorization/enums/action';
import { Resource } from 'src/resource/entities/resource.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
/**
 * Represents user ability to do things in the system.
 */
@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, enum: Action })
  action: Action;

  @Column({ type: 'json', default: {} })
  conditions: string;

  @ManyToMany(() => Role, (role) => role.permissions, { onDelete: 'CASCADE' })
  role: Relation<Role[]>;

  @ManyToOne(() => Resource, (resource) => resource.permission, {
    onDelete: 'NO ACTION',
  })
  resource: Relation<Resource>;
}
