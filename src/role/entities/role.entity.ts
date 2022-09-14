import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/**
 * User Role
 */

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  role_id: string;

  @Column()
  role_name: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
