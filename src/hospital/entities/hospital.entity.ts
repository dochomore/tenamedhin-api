import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn('uuid')
  hospitalId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  /**
   * level of health facility
   *
   */
  @Column()
  level: number;

  @Column()
  woredaId: string;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
