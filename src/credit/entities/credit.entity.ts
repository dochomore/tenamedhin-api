import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn('uuid')
  creditId: string;

  @Column()
  card: number;

  @Column()
  laboratory: number;

  @Column()
  imaging: number;

  @Column()
  procedure: number;

  @Column()
  medicine: number;

  @Column()
  bed: number;

  @Column()
  others: number;

  @Column()
  comment: string;
}
