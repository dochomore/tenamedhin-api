import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * represents government addminstrative Unit called woreda
 */

@Entity()
export class WoredaOffice {
  @PrimaryGeneratedColumn('uuid')
  woredaId: string;

  @Column()
  woredaName: string;

  @Column({ unique: true })
  woredaCode: string;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;
}
