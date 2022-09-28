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
/**
 * KB-USER -> kebele User
 * HO-USER -> Hospital User
 * HC-USER -> Healthcare user
 */
export enum RoleType {
  KEBELE_USER = 'KB-USER',
  HOSPITAL_USER = 'HO-USER',
  HEALTHCARE_USER = 'HC-USER',
  ADMIN = 'admin',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  roleId: string;

  @Column({
    enum: RoleType,
    type: 'enum',
  })
  roleName: string;

  @Column({ type: 'timestamptz', default: new Date() })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: new Date() })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role, { onDelete: 'NO ACTION' })
  user: User;

  @ManyToMany(() => Permission, (permission) => permission.role, {
    onDelete: 'NO ACTION',
  })
  @JoinTable({ name: 'role_with_permission' })
  permissions: Relation<Permission[]>;
}
