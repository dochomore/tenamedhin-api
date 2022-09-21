import { Permission } from 'src/permission/entities/permission.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  resourceId: string;

  @Column({ unique: true })
  resourceName: string;

  @OneToMany(() => Permission, (permission) => permission.resource, {
    onDelete: 'NO ACTION',
  })
  permission: Permission;
}
