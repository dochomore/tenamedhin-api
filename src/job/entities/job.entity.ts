import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Tena medhin member profession
 */
@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  jobUUID: string;

  @Column({ type: 'timestamptz', default: new Date() })
  dateOfCreation: Date;

  @Column()
  jobName: string;
}
