import { Action } from 'src/authorization/enums/action';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToMany(() => Role, (role) => role.permissions, { onDelete: 'NO ACTION' })
  roleId: string;
}
