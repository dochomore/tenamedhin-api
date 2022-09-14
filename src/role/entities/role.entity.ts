import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.roles, { onDelete: 'NO ACTION' })
  userId: User;
}
