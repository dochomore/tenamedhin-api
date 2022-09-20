import { Action } from 'src/authorization/enums/action';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation
} from 'typeorm';
/**
 * Represents user ability to do things in the system.
 */
@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, enum: Action })
  action: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ type: 'json', default: {} })
  conditions: string;

  @ManyToMany(() => Role, (role) => role.permissions, { onDelete: 'CASCADE' })
  role: Relation<Role[]>;
}
