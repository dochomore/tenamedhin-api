import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Member may works for organization
 */
@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  organizationUUID: string;

  @Column({ type: 'timestamptz' })
  dateOfCreation: Date;

  @Column()
  organizationName: string;
}
