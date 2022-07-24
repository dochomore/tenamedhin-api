import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Woreda {
  @PrimaryGeneratedColumn('uuid')
  woredaId: string;

  @Column()
  woredaName: string;

  @Column({ unique: true })
  woredaCode: string;
}
