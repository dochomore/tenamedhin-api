import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Member may works for organization
 */
@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  organizationUUID: string;

  @Column({ unique: true })
  organizationName: string;

  @Column({ unique: true })
  organizationCode: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
