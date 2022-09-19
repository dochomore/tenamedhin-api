import { Action } from 'src/authorization/enums/action';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
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
  action: string;

  @Column({ nullable: false })
  subject: string;

  @ManyToMany(() => User, (user) => user.permissions, { onDelete: 'CASCADE' })
  user: Relation<User[]>;
}
