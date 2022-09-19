import { IsDefined } from 'class-validator';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

/**
 * Tena medhin system user
 */

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  @IsDefined()
  username: string;

  @Column()
  @IsDefined()
  firstName: string;

  @Column()
  @IsDefined()
  fatherName: string;

  @Column()
  @IsDefined()
  createdAt: string;

  @Column()
  @IsDefined()
  updatedAt: string;

  @Column()
  @IsDefined()
  password: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Role, (role) => role.user)
  role: Role;

  @ManyToMany(() => Permission, (permission) => permission.user, {
    onDelete: 'NO ACTION',
  })
  @JoinTable({ name: 'user_with_permission' })
  permissions: Relation<Permission[]>;
}
