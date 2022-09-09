import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/**
 * Represents user ability to do things in the system.
 */
@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  action: string;

  @Column({ nullable: false })
  subject: string;
}
