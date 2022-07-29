import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Tena medhin member profession
 */
@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  jobUId: string;

  @Column({ type: 'timestamptz', default: new Date() })
  createdAt: Date;

  @Column({ unique: true })
  jobName: string;

  @Column({ unique: true })
  jobCode: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
