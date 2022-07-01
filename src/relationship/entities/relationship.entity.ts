import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Family relationship
 */
@Entity()
export class Relationship {
  @PrimaryGeneratedColumn('uuid')
  relationUid: string;

  @Column()
  relationName: string;
}
