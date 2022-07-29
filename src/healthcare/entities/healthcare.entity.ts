import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Healthcare {
  @PrimaryGeneratedColumn('uuid')
  healthcareId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  woredaId: string;

  @Column()
  createdBy: string;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
