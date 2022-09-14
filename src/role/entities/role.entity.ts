import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
/**
 * User Role
 */

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  roleId: string;

  @Column()
  roleName: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.roles, { onDelete: 'NO ACTION' })
  userId: User;

  @ManyToMany(() => Permission, (permission) => permission.roleId, {
    onDelete: 'NO ACTION',
  })
  @JoinTable({ name: 'role_with_permission' })
  permissions: Relation<Permission[]>;
}
